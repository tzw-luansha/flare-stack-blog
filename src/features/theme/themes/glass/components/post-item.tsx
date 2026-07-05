import { ClientOnly, Link } from "@tanstack/react-router";
import { Eye, Pin } from "lucide-react";
import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostItem as PostItemType } from "@/features/posts/schema/posts.schema";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface PostItemProps {
  post: PostItemType;
  pinned?: boolean;
  views?: number;
  isLoadingViews?: boolean;
}

export const PostItem = memo(
  ({ post, pinned, views, isLoadingViews }: PostItemProps) => {
    return (
      <Link
        to="/post/$slug"
        params={{ slug: post.slug }}
        className="group block"
      >
        <article className="glass-card p-6 md:p-8 transition-all duration-300 hover:translate-y-[-3px]">
          <div className="flex flex-col gap-4">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-muted-foreground/60 tracking-wider">
              <time
                dateTime={post.publishedAt?.toISOString()}
                className="whitespace-nowrap"
              >
                <ClientOnly fallback="-">
                  {formatDate(post.publishedAt)}
                </ClientOnly>
              </time>

              {post.readTimeInMinutes && (
                <>
                  <span className="opacity-30">·</span>
                  <span>{m.read_time({ count: post.readTimeInMinutes })}</span>
                </>
              )}

              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="opacity-30">·</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-accent/70 whitespace-nowrap"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {isLoadingViews ? (
                <>
                  <span className="opacity-30">·</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Eye size={12} />
                    <Skeleton className="h-3 w-12 rounded bg-muted-foreground/20" />
                  </span>
                </>
              ) : views !== undefined ? (
                <>
                  <span className="opacity-30">·</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <Eye size={12} />
                    {m.post_views_count({ count: views })}
                  </span>
                </>
              ) : null}
            </div>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-serif font-medium text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-3"
              style={{ viewTransitionName: `post-title-${post.slug}` }}
            >
              {pinned && (
                <Pin
                  size={18}
                  className="text-accent/60"
                  strokeWidth={1.5}
                />
              )}
              <span className="line-clamp-2">{post.title}</span>
            </h2>

            {/* Summary */}
            {post.summary && (
              <p className="text-muted-foreground font-light leading-relaxed max-w-2xl line-clamp-2 text-sm md:text-base">
                {post.summary}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  },
);

PostItem.displayName = "PostItem";
