import { ClientOnly, Link, useRouteContext } from "@tanstack/react-router";
import {
  resolveSocialHref,
  SOCIAL_PLATFORMS,
} from "@/features/config/utils/social-platforms";
import type { NavOption } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface FooterProps {
  navOptions: Array<NavOption>;
}

export function Footer({ navOptions }: FooterProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  return (
    <footer className="mt-32 py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="glass-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-serif text-lg font-bold tracking-tighter text-foreground">
                {siteConfig.theme.default.navBarName}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                <ClientOnly fallback="-">
                  {m.footer_copyright({
                    year: new Date().getFullYear().toString(),
                    author: siteConfig.author,
                  })}
                </ClientOnly>
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6 md:gap-8 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
              {navOptions.map((option) => (
                <Link
                  key={option.id}
                  to={option.to}
                  className="hover:text-foreground transition-colors"
                >
                  {option.label}
                </Link>
              ))}
            </nav>

            {/* Social */}
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
                        <Icon size={18} strokeWidth={1.5} />
                      ) : (
                        <img
                          src={link.icon}
                          alt={label}
                          className="w-4 h-4"
                        />
                      )}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
