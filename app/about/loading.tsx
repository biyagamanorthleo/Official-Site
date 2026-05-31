export default function Loading() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4 max-w-4xl mx-auto">
          <div className="h-3 w-32 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-16 w-48 bg-white/5 rounded-full mx-auto animate-pulse" />
          <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
        </div>
        <div className="space-y-32 mt-32">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-[2.5rem] bg-white/5 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-48 bg-white/5 rounded-full animate-pulse" />
                <div className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
                <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
