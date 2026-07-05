export function HomePageSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-6 md:px-0 py-12 md:py-16 space-y-16">
      <div className="glass-skeleton p-8 md:p-12 space-y-8">
        <div className="space-y-4">
          <div className="h-10 md:h-12 w-3/4 rounded-lg bg-foreground/5" />
          <div className="h-4 w-full rounded bg-foreground/5 mt-4" />
          <div className="h-4 w-2/3 rounded bg-foreground/5" />
        </div>
        <div className="flex gap-4">
          <div className="h-5 w-5 rounded bg-foreground/5" />
          <div className="h-5 w-5 rounded bg-foreground/5" />
          <div className="h-5 w-5 rounded bg-foreground/5" />
        </div>
      </div>

      <div className="space-y-5">
        <div className="h-7 w-40 rounded bg-foreground/5" />
        {[1, 2, 3].map((i) => (
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
