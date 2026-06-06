import { Package } from 'lucide-react';

export default function StarterPackPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Starter Pack</h1>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Member Resources</p>
      </div>

      <div className="py-24 text-center border border-dashed border-white/5 rounded-3xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 mb-6">
          <Package size={20} className="text-red-600" />
        </div>
        <p className="text-gray-600 text-xs font-black uppercase tracking-widest">Content coming soon</p>
      </div>
    </div>
  );
}
