export default function Loading() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32 space-y-4">
          <div className="h-3 w-32 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-12 w-56 bg-white/5 rounded-full mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-[2rem] bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
