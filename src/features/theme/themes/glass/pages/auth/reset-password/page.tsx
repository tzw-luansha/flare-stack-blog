import { Link } from "@tanstack/react-router";
import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { ResetPasswordForm } from "./form";

export function ResetPasswordPage({
  resetPasswordForm,
  token,
  error,
}: ResetPasswordPageProps) {
  if (!token && !error) {
    return (
      <div className="glass-card p-8 md:p-12 text-center space-y-6 animate-in fade-in duration-500">
        <p className="text-sm text-destructive/70 font-light">
          {m.reset_password_error_missing_token()}
        </p>
        <Link
          to="/login"
          className="glass-btn glass-btn-primary w-full justify-center text-[10px] font-mono uppercase tracking-[0.3em]"
        >
          {m.register_back_to_login()}
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 md:p-12 text-center space-y-6 animate-in fade-in duration-500">
        <p className="text-sm text-destructive/70 font-light">
          {m.reset_password_error_invalid_link({ error: error || "" })}
        </p>
        <Link
          to="/forgot-password"
          className="glass-btn glass-btn-primary w-full justify-center text-[10px] font-mono uppercase tracking-[0.3em]"
        >
          {m.reset_password_request_new_link()}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="text-center space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
          [ {m.reset_password_label()} ]
        </p>
        <h1 className="text-2xl font-serif font-medium tracking-tight">
          {m.reset_password_title()}
        </h1>
      </header>

      <div className="glass-card p-8 md:p-10">
        <ResetPasswordForm form={resetPasswordForm} />
      </div>
    </div>
  );
}
