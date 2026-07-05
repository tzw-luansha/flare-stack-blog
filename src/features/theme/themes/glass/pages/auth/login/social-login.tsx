import { GithubIcon } from "@/components/common/brand-icon";
import { m } from "@/paraglide/messages";

interface SocialLoginProps {
  isLoading: boolean;
  handleGithubLogin: () => Promise<void>;
  showDivider?: boolean;
}

export function SocialLogin({
  isLoading,
  handleGithubLogin,
  showDivider,
}: SocialLoginProps) {
  return (
    <div className="space-y-6">
      {showDivider && (
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-border/40" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/40">
            {m.login_or()}
          </span>
          <span className="flex-1 h-px bg-border/40" />
        </div>
      )}

      <button
        type="button"
        onClick={handleGithubLogin}
        disabled={isLoading}
        className="glass-btn w-full justify-center gap-3 tracking-wider text-[11px] font-mono disabled:opacity-30"
      >
        <GithubIcon size={16} />
        <span>{m.login_github()}</span>
      </button>
    </div>
  );
}
