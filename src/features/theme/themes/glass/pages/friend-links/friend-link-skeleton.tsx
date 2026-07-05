export function FriendLinkSkeleton() {
  return (
    <div className="glass-card flex items-start gap-4 p-4 md:p-5 animate-pulse">
      {/* Logo Skeleton */}
      <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 dark:bg-white/5" />

      <div className="flex-1 space-y-2 py-0.5">
        {/* Title Skeleton */}
        <div className="flex justify-between gap-4">
          <div className="h-4 w-1/3 rounded bg-white/10 dark:bg-white/5" />
          <div className="h-3 w-1/4 rounded bg-white/5 dark:bg-white/[0.03] hidden sm:block" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full rounded bg-white/5 dark:bg-white/[0.03]" />
          <div className="h-3 w-4/5 rounded bg-white/5 dark:bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}
