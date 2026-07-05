export function PostPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6 md:px-0">
      <div className="py-12">
        <div className="h-4 w-32 rounded bg-foreground/5" />
      </div>

      <div className="glass-skeleton p-8 md:p-12 space-y-8">
        <div className="flex gap-4">
          <div className="h-3 w-24 rounded bg-foreground/5" />
          <div className="h-3 w-20 rounded bg-foreground/5" />
          <div className="h-3 w-16 rounded bg-foreground/5" />
        </div>
        <div className="h-12 md:h-14 w-full rounded-lg bg-foreground/5" />
        <div className="h-12 md:h-14 w-3/4 rounded-lg bg-foreground/5" />
        <div className="h-20 w-full rounded-xl bg-foreground/5" />
      </div>

      <div className="glass-skeleton p-8 md:p-12 mt-8 space-y-4">
        <div className="h-4 w-full rounded bg-foreground/5" />
        <div className="h-4 w-full rounded bg-foreground/5" />
        <div className="h-4 w-4/5 rounded bg-foreground/5" />
        <div className="h-4 w-full rounded bg-foreground/5" />
        <div className="h-4 w-3/5 rounded bg-foreground/5" />
        <div className="h-4 w-full rounded bg-foreground/5" />
        <div className="h-4 w-2/3 rounded bg-foreground/5" />
      </div>
    </div>
  );
}
