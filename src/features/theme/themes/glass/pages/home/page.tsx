import { Link, useRouteContext } from "@tanstack/react-router";
import { ArrowRight, Rss } from "lucide-react";
import { useMemo } from "react";
import {
  resolveSocialHref,
  SOCIAL_PLATFORMS,
} from "@/features/config/utils/social-platforms";
import { useViewCounts } from "@/features/pageview/queries";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { PostItem } from "@/features/theme/themes/glass/components/post-item";
import { m } from "@/paraglide/messages";

export function HomePage({ posts, pinnedPosts }: HomePageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  const displayPosts = useMemo(() => {
    const pinned = (pinnedPosts ?? []).map((p) => ({ ...p, isPinned: true }));
    const regular = posts.map((p) => ({ ...p, isPinned: false }));
    const seen = new Set<number>();
    const merged = [];
    for (const p of [...pinned, ...regular]) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    return merged;
  }, [posts, pinnedPosts]);

  const allSlugs = useMemo(
    () => displayPosts.map((p) => p.slug),
    [displayPosts],
  );
  const { data: viewCounts, isPending: isPendingViewCounts } =
    useViewCounts(allSlugs);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-6 md:px-0 py-12 md:py-16 space-y-16">
      {/* Hero Section — Glass Card */}
      <section>
        <div className="glass-card p-8 md:p-12 space-y-8">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground flex items-center gap-4">
              {m.home_greeting()}{" "}
              <span className="animate-wave origin-[70%_70%]">👋</span>
            </h1>

            <div className="space-y-4 max-w-2xl text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                {m.home_intro_prefix()}{" "}
                <span className="text-foreground font-medium">
                  {siteConfig.author}
                </span>
                {m.home_intro_separator()}
                {siteConfig.description}
              </p>
            </div>
          </header>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-muted-foreground">
            {siteConfig.social
              .filter((link) => link.url)
              .map((link, i) => {
                const preset =
                  link.platform !== "custom"
                    ? SOCIAL_PLATFORMS[link.platform]
                    : null;
                const Icon = preset?.icon;
                const label = preset?.label ?? link.label ?? "";
                const href = resolveSocialHref(link.platform, link.url);

                return (
                  <a
                    key={`${link.platform}-${i}`}
                    href={href}
                    target={link.platform === "email" ? undefined : "_blank"}
                    rel={
                      link.platform === "email" ? undefined : "noreferrer"
                    }
                    className="hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    {Icon ? (
                      <Icon size={20} strokeWidth={1.5} />
                    ) : (
                      <img
                        src={link.icon}
                        alt={label}
                        className="w-5 h-5"
                      />
                    )}
                  </a>
                );
              })}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-medium text-foreground tracking-tight">
            {m.home_latest_posts()}
          </h2>
          <Link
            to="/posts"
            className="text-xs font-mono text-muted-foreground/60 hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Rss size={12} />
            {m.nav_posts()}
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-5">
          {displayPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              pinned={post.isPinned}
              views={viewCounts?.[post.slug]}
              isLoadingViews={isPendingViewCounts}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
