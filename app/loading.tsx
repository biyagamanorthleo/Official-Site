export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-full border-2 border-red-900 border-t-red-600 animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-900">Loading</span>
      </div>
    </div>
  );
}
