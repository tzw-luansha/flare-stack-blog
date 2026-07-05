import { Link } from "@tanstack/react-router";
import { LogOut, UserIcon } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import type { UserLayoutProps } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";
import { BackgroundLayer } from "../components/background-layer";

export function UserLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: UserLayoutProps) {
  return (
    <div className="glass-theme min-h-screen flex flex-col">
      <BackgroundLayer />
      {/* Minimal user nav */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto w-full px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="font-serif text-lg font-bold tracking-tighter text-foreground/90 hover:text-accent transition-colors"
            >
              {m.nav_home()}
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                /admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!isSessionLoading && user && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <UserIcon size={12} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut size={14} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-16" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
