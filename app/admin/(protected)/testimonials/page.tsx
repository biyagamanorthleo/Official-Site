import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Star } from 'lucide-react';
import DeleteButton from '../_components/DeleteButton';

export default async function AdminTestimonials() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });

  const rows = testimonials ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Testimonials</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{rows.length} total</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
        >
          <Plus size={16} /> Add Testimonial
        </Link>
      </div>

      <div className="space-y-3">
        {rows.length === 0 && (
          <p className="text-gray-600 text-sm uppercase tracking-widest font-black text-center py-20">
            No testimonials yet
          </p>
        )}
        {rows.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-5 bg-[#050505] border border-white/5 rounded-2xl px-6 py-5 hover:border-white/10 transition-all"
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black text-white"
              style={{ background: 'linear-gradient(135deg, #980016, #3d0009)' }}
            >
              {t.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm uppercase tracking-tight">{t.name}</p>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest font-black mt-0.5 truncate">{t.role}</p>
              <p className="text-gray-500 text-[11px] mt-1.5 line-clamp-1">&ldquo;{t.quote}&rdquo;</p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < t.rating ? 'text-red-500' : 'text-white/10'}
                  fill={i < t.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="p-2 text-gray-600 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <Pencil size={15} />
              </Link>
              <DeleteButton id={t.id} table="testimonials" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
