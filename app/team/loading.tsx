export default function Loading() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="h-3 w-40 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-12 w-72 bg-white/5 rounded-full mx-auto animate-pulse" />
        </div>
        {[5, 5, 4].map((count, s) => (
          <div key={s} className="mb-24">
            <div className="h-6 w-48 bg-white/5 rounded-full mx-auto mb-10 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
