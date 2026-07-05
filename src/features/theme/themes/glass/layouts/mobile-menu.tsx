import { Link, useRouteContext } from "@tanstack/react-router";
import { LogOut, UserIcon, X } from "lucide-react";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface MobileMenuProps {
  navOptions: Array<NavOption>;
  isOpen: boolean;
  onClose: () => void;
  user?: UserInfo;
  logout: () => Promise<void>;
}

export function MobileMenu({
  navOptions,
  isOpen,
  onClose,
  user,
  logout,
}: MobileMenuProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  return (
    <div
      className={`fixed inset-0 z-100 transition-all duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Frosted backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: "var(--glass-bg)" }}
        onClick={onClose}
      />

      <div
        className={`relative h-full w-full flex flex-col p-8 md:p-16 transition-all duration-500 delay-75 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-serif text-2xl font-bold tracking-tighter text-foreground">
            {siteConfig.theme.default.navBarName}
          </span>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/20 dark:hover:bg-white/10 transition-all"
            aria-label={m.common_close_menu()}
            type="button"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8">
          {navOptions.map((item, idx) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={onClose}
              className={`group flex items-center gap-4 transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${50 + idx * 75}ms` : "0ms",
              }}
            >
              {({ isActive }) => (
                <span
                  className={`text-3xl md:text-5xl font-bold tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/50 group-hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={onClose}
              className={`group flex items-center gap-4 transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + navOptions.length * 75}ms`
                  : "0ms",
              }}
            >
              <span className="text-xl font-mono tracking-tight text-accent">
                ~/admin
              </span>
            </Link>
          )}
        </nav>

        {/* Footer: User info / Login */}
        <div
          className={`transition-all duration-500 pt-8 ${
            isOpen
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 translate-y-4"
          }`}
        >
          {user ? (
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <UserIcon size={16} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-foreground">
                    @{user.name}
                  </span>
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground text-left"
                  >
                    {m.profile_title()}
                  </Link>
                </div>
              </div>

              <button
                onClick={async () => {
                  await logout();
                  onClose();
                }}
                className="text-muted-foreground hover:text-destructive transition-colors p-2"
              >
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="glass-card p-4 flex items-center gap-2 font-mono text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              $ {m.nav_login()}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
