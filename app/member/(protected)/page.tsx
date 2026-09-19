import { createClient } from '@/lib/supabase/server';

export default async function MemberDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('members')
    .select('name')
    .eq('id', user!.id)
    .single();

  const name = profile?.name || user!.user_metadata?.full_name || user!.email?.split('@')[0];

  return (
    <div className="max-w-3xl">
      <div className="bg-[#050505] border border-white/5 rounded-[2rem] px-8 py-14 md:px-12 md:py-16">
        <p className="text-red-700 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Dashboard</p>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-[0.95]">
          Welcome to the <span className="text-red-600">LCBN</span> Member Portal
        </h1>
        {name && (
          <p className="text-ink-muted text-sm mt-6">Hello, {name}.</p>
        )}
      </div>
    </div>
  );
}
