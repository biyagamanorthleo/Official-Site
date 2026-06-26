'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Link } from 'lucide-react';

export default function ImageUpload({
  value,
  onChange,
  folder = 'general',
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value.startsWith('http') && !value.includes('supabase') ? value : '');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_SIZE) {
      alert('File is too large. Maximum size is 5 MB.');
      e.target.value = '';
      return;
    }
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Invalid file type. Please upload a JPEG, PNG, WEBP, or GIF image.');
      e.target.value = '';
      return;
    }

    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const filename = `${folder}/${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, file, { upsert: true });

    if (error) {
      alert(`Upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
    onChange(publicUrl);
    setUploading(false);
  }

  function handleUrlSubmit() {
    try {
      const parsed = new URL(urlInput);
      if (!['https:', 'http:'].includes(parsed.protocol)) {
        alert('Please enter a valid https:// URL.');
        return;
      }
    } catch {
      alert('Please enter a valid URL.');
      return;
    }
    onChange(urlInput);
  }

  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'upload' ? 'bg-red-900/40 text-red-400 border border-red-800/50' : 'bg-white/5 text-ink-muted border border-white/5 hover:text-white'}`}>
          Upload File
        </button>
        <button type="button" onClick={() => setMode('url')}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'url' ? 'bg-red-900/40 text-red-400 border border-red-800/50' : 'bg-white/5 text-ink-muted border border-white/5 hover:text-white'}`}>
          Paste URL
        </button>
      </div>

      {/* Current preview */}
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-white/10" />
          <button type="button" onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors">
            <X size={12} />
          </button>
        </div>
      )}

      {mode === 'upload' ? (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${uploading ? 'border-red-700/50 cursor-wait' : 'border-white/10 cursor-pointer hover:border-red-700/50'}`}
        >
          <Upload size={22} className="mx-auto mb-3 text-ink-muted" />
          <p className="text-ink-muted text-[10px] font-black uppercase tracking-widest">
            {uploading ? 'Uploading...' : 'Click to choose image'}
          </p>
          <p className="text-ink-muted text-[9px] mt-1">PNG, JPG, WEBP</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </div>
      ) : (
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="https://..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
          <button type="button" onClick={handleUrlSubmit}
            className="px-5 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
            style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
            Use
          </button>
        </div>
      )}
    </div>
  );
}
