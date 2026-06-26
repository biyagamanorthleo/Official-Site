import { createClient } from '@/lib/supabase/server';
import GalleryForm from './GalleryForm';
import GalleryReorder from './GalleryReorder';

export default async function AdminGallery() {
  const supabase = await createClient();
  const { data: photos } = await supabase
    .from('gallery_photos')
    .select('id, url, caption, sort_order, featured_in_carousel')
    .order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Gallery</h1>
          <p className="text-ink-muted text-xs uppercase tracking-widest font-bold mt-1">{photos?.length ?? 0} photos</p>
        </div>
      </div>

      {/* Add new */}
      <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-ink-muted mb-6">Add Photo</p>
        <GalleryForm />
      </div>

      {/* Reorder & delete */}
      <div className="bg-[#050505] border border-white/5 rounded-2xl p-8">
        <GalleryReorder initialPhotos={photos ?? []} />
      </div>
    </div>
  );
}
