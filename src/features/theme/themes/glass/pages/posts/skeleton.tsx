export function PostsPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6 md:px-0">
      <div className="py-12 md:py-16 space-y-6">
        <div className="h-10 md:h-12 w-48 rounded-lg bg-foreground/5" />
        <div className="h-4 w-96 rounded bg-foreground/5" />
      </div>

      <div className="mb-12">
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-16 rounded-full bg-foreground/5" />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-skeleton p-6 md:p-8 space-y-4">
            <div className="flex gap-2">
              <div className="h-3 w-20 rounded bg-foreground/5" />
              <div className="h-3 w-16 rounded bg-foreground/5" />
            </div>
            <div className="h-7 w-3/4 rounded-lg bg-foreground/5" />
            <div className="h-4 w-full rounded bg-foreground/5" />
            <div className="h-4 w-1/2 rounded bg-foreground/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
