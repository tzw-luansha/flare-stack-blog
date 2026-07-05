import type { AuthLayoutProps } from "@/features/theme/contract/layouts";
import { BackgroundLayer } from "../components/background-layer";
import { m } from "@/paraglide/messages";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="glass-theme min-h-screen w-full flex flex-col">
      <BackgroundLayer />
      <header className="h-16 flex items-center px-6 md:px-12">
        <button
          onClick={onBack}
          type="button"
          className="glass-card px-4 py-2 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          [ ← {m.auth_layout_back_home()} ]
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-sm animate-in fade-in duration-500">
          <div className="glass-card p-8 md:p-10">
            {children}
          </div>
        </div>
      </main>

      <footer className="h-16" />
    </div>
  );
}
