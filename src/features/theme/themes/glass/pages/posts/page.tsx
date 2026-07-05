import { useRouteContext } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { PostItem } from "@/features/theme/themes/glass/components/post-item";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export const INITIAL_TAG_COUNT = 8;

export function PostsPage({
  posts,
  tags,
  selectedTag,
  onTagClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostsPageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreTags = tags.length > INITIAL_TAG_COUNT;
  const visibleTags = isExpanded ? tags : tags.slice(0, INITIAL_TAG_COUNT);

  // Infinite scroll
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "0px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6 md:px-0">
      {/* Header */}
      <header className="py-12 md:py-16 space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
          {m.nav_posts()}
        </h1>
        <p className="max-w-xl text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          {siteConfig.description}
        </p>
      </header>

      {/* Tag Filters */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/50">
          <span>{m.posts_tags_filter()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onTagClick("")}
            className={cn(
              "glass-pill",
              !selectedTag
                ? "active"
                : "text-muted-foreground hover:text-accent",
            )}
          >
            {m.posts_all()}
          </button>

          {visibleTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className={cn(
                "glass-pill",
                selectedTag === tag.name
                  ? "active"
                  : "text-muted-foreground hover:text-accent",
              )}
            >
              {tag.name}
              <span className="ml-1.5 text-[10px] opacity-60">
                {tag.postCount}
              </span>
            </button>
          ))}

          {hasMoreTags && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass-pill text-xs text-muted-foreground/50 hover:text-foreground"
            >
              {isExpanded
                ? `[- ${m.tags_collapse()}]`
                : `[+ ${m.tags_expand()} ${tags.length - INITIAL_TAG_COUNT}]`}
            </button>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="font-serif text-xl text-muted-foreground/50">
              {m.posts_no_posts()}
            </p>
          </div>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>

      {/* Load More */}
      <div
        ref={observerRef}
        className="py-16 flex flex-col items-center justify-center gap-6"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500 fill-mode-both">
            <div
              className="w-6 h-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin"
            />
            <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">
              {m.posts_loading()}
            </span>
          </div>
        ) : hasNextPage ? (
          <div className="h-px w-24 bg-border/40" />
        ) : posts.length > 0 ? (
          <div className="flex items-center gap-4 text-muted-foreground/20">
            <span className="h-px w-12 bg-current" />
            <span className="text-lg font-serif italic">{m.posts_end()}</span>
            <span className="h-px w-12 bg-current" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
