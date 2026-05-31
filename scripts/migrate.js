// ============================================================
// LCBN Database Migration Runner
// Usage: npm run migrate
// ============================================================

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('\n❌  DATABASE_URL not set in .env.local');
  console.error('   Add it from: Supabase dashboard > Settings > Database > Connection string > URI\n');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });

const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

async function run() {
  const client = await pool.connect();

  try {
    // Create tracking table if it doesn't exist
    await client.query(`
      create table if not exists _migrations (
        id serial primary key,
        filename text not null unique,
        applied_at timestamptz default now()
      );
    `);

    // Get already-applied migrations
    const { rows: applied } = await client.query(
      'select filename from _migrations order by filename'
    );
    const appliedSet = new Set(applied.map(r => r.filename));

    // Read all migration files, sorted by name
    const files = fs.readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith('.sql'))
      .sort();

    const pending = files.filter(f => !appliedSet.has(f));

    if (pending.length === 0) {
      console.log('\n✅  All migrations are up to date.\n');
      return;
    }

    console.log(`\n🔄  Applying ${pending.length} pending migration(s)...\n`);

    for (const file of pending) {
      const filepath = path.join(MIGRATIONS_DIR, file);
      const sql = fs.readFileSync(filepath, 'utf8');

      process.stdout.write(`   → ${file} ... `);

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          'insert into _migrations (filename) values ($1)',
          [file]
        );
        await client.query('COMMIT');
        console.log('✅');
      } catch (err) {
        await client.query('ROLLBACK');
        console.log('❌');
        console.error(`\n   Error in ${file}:\n   ${err.message}\n`);
        process.exit(1);
      }
    }

    console.log('\n✅  All migrations applied.\n');

  } finally {
    client.release();
    await pool.end();
  }
}

// Show migration status without applying anything
async function status() {
  const client = await pool.connect();
  try {
    await client.query(`
      create table if not exists _migrations (
        id serial primary key,
        filename text not null unique,
        applied_at timestamptz default now()
      );
    `);

    const { rows: applied } = await client.query(
      'select filename, applied_at from _migrations order by filename'
    );
    const appliedMap = Object.fromEntries(applied.map(r => [r.filename, r.applied_at]));

    const files = fs.readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log('\n  Migration Status\n  ────────────────');
    for (const f of files) {
      if (appliedMap[f]) {
        const date = new Date(appliedMap[f]).toLocaleDateString();
        console.log(`  ✅  ${f}  (applied ${date})`);
      } else {
        console.log(`  ⏳  ${f}  (pending)`);
      }
    }
    console.log('');
  } finally {
    client.release();
    await pool.end();
  }
}

const cmd = process.argv[2];
if (cmd === 'status') {
  status().catch(console.error);
} else {
  run().catch(console.error);
}
