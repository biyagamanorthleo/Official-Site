export default function Loading() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32 space-y-4">
          <div className="h-3 w-32 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-12 w-64 bg-white/5 rounded-full mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
