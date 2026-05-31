export default function Loading() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32 space-y-4">
          <div className="h-3 w-40 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-12 w-64 bg-white/5 rounded-full mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-[3rem] bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
