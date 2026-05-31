import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '../_components/DeleteButton';
import GalleryForm from './GalleryForm';

export default async function AdminGallery() {
  const supabase = await createClient();
  const { data: photos } = await supabase.from('gallery_photos').select('*').order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Gallery</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{photos?.length ?? 0} photos</p>
        </div>
      </div>

      {/* Add new */}
      <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Add Photo</p>
        <GalleryForm />
      </div>

      {/* List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos?.map((p) => (
          <div key={p.id} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
            <img src={p.url} alt={p.caption ?? ''} className="w-full h-full object-cover grayscale opacity-60" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
              <DeleteButton id={p.id} table="gallery_photos" />
            </div>
            {p.caption && <p className="absolute bottom-2 left-2 right-2 text-[8px] text-white font-bold truncate">{p.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

