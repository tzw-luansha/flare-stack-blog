import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, Pencil, Share2, Sparkles } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRenderer } from "@/features/theme/themes/glass/components/content/content-renderer";
import { authClient } from "@/lib/auth/auth.client";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { RelatedPosts, RelatedPostsSkeleton } from "./components/related-posts";
import { TableOfContents } from "./components/table-of-contents";
import { CommentSection } from "../../components/comments/view/comment-section";

function ClientOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  return <>{isMounted ? children : fallback}</>;
}

export function PostPage({ post }: PostPageProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6 md:px-0">
      {/* Navigation */}
      <nav className="py-12 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/posts" })}
          className="glass-card px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft size={12} />
            {m.post_back_to_list()}
          </span>
        </button>
        {session?.user.role === "admin" && (
          <Link
            to="/admin/posts/edit/$id"
            params={{ id: String(post.id) }}
            className="glass-card px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
          >
            <span className="flex items-center gap-2">
              <Pencil size={12} />
              {m.post_edit()}
            </span>
          </Link>
        )}
      </nav>

      <article className="space-y-16">
        {/* Header */}
        <header className="glass-card p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground/60 tracking-wider">
              <span className="flex items-center gap-1.5">
                {m.post_published_at()}:{" "}
                <ClientOnly fallback={<span>-</span>}>
                  {formatDate(post.publishedAt)}
                </ClientOnly>
              </span>
              <span className="opacity-30">/</span>
              <span className="flex items-center gap-1.5">
                {m.post_last_updated()}:{" "}
                <ClientOnly fallback={<span>-</span>}>
                  {formatDate(post.updatedAt)}
                </ClientOnly>
              </span>
              <span className="opacity-30">/</span>
              <span>{m.read_time({ count: post.readTimeInMinutes })}</span>

              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="opacity-30">/</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        to="/posts"
                        search={{ tagName: tag.name }}
                        className="text-accent/70 hover:text-accent transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-foreground"
              style={{ viewTransitionName: `post-title-${post.slug}` }}
            >
              {post.title}
            </h1>
          </div>

          {post.summary && (
            <div className="bg-white/20 dark:bg-white/[0.03] rounded-xl p-6 space-y-3 border border-white/20 dark:border-white/5">
              <div className="flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>{m.post_summary_title()}</span>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground font-serif">
                {post.summary}
              </p>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="relative">
          {/* TOC for large screens */}
          <aside className="hidden xl:block absolute left-full ml-12 top-0 h-full">
            <div className="sticky top-32 w-60">
              <TableOfContents headers={post.toc} />
            </div>
          </aside>

          <main className="max-w-none text-foreground leading-relaxed font-serif">
            <div className="glass-card p-8 md:p-12">
              <ContentRenderer content={post.contentJson} />
            </div>

            {/* Share */}
            <footer className="mt-12 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      toast.success(m.post_share_success(), {
                        description: m.post_share_success_desc(),
                      });
                    })
                    .catch(() => {
                      toast.error(m.post_share_error(), {
                        description: m.post_share_error_desc(),
                      });
                    });
                }}
                className="glass-card px-6 py-3 h-auto rounded-xl text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground transition-all bg-transparent hover:bg-transparent"
              >
                <span className="flex items-center gap-3">
                  {m.post_share()}
                  <Share2 size={12} strokeWidth={1.5} />
                </span>
              </Button>
            </footer>
          </main>
        </div>

        {/* Related Posts */}
        <div>
          <Suspense fallback={<RelatedPostsSkeleton />}>
            <RelatedPosts slug={post.slug} />
          </Suspense>
        </div>

        {/* Comments */}
        <div>
          <CommentSection postId={post.id} />
        </div>
      </article>

      {/* Back to Top */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-700 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass-card w-12 h-12 flex items-center justify-center rounded-full"
        >
          <ArrowUp size={16} className="text-muted-foreground/60" />
        </button>
      </div>
    </div>
  );
}
