import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { relatedPostsQuery } from "@/features/posts/queries";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { config } from "../../../config";

interface RelatedPostsProps {
  slug: string;
}

export function RelatedPosts({ slug }: RelatedPostsProps) {
  const { data: posts } = useSuspenseQuery(
    relatedPostsQuery(slug, config.post.relatedPostsLimit),
  );

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8 animate-in fade-in duration-500 delay-300 fill-mode-both">
      <div className="flex items-center gap-2 text-muted-foreground/60 font-medium text-xs uppercase tracking-widest">
        <span className="opacity-50">///</span>
        <span>{m.post_related_posts()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="group"
          >
            <article className="glass-card p-5 h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 font-mono tracking-wider mb-3">
                <span>
                  <ClientOnly fallback="-">
                    {formatDate(post.publishedAt)}
                  </ClientOnly>
                </span>
                <span className="opacity-30">·</span>
                <span>{m.read_time({ count: post.readTimeInMinutes })}</span>
              </div>

              <h3 className="text-base font-serif leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-3">
                {post.title}
              </h3>

              <div className="pt-4 mt-auto flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 group-hover:text-accent transition-colors">
                <span>{m.post_read_more()}</span>
                <ArrowRight
                  size={12}
                  className="-ml-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedPostsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-3 w-24 rounded bg-foreground/5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-skeleton p-5 space-y-3">
            <div className="h-3 w-20 rounded bg-foreground/5" />
            <div className="h-5 w-full rounded bg-foreground/5" />
            <div className="h-5 w-2/3 rounded bg-foreground/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
