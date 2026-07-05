import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ForgotPasswordFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface ForgotPasswordFormProps {
  form: ForgotPasswordFormData;
}

export function ForgotPasswordForm({ form }: ForgotPasswordFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstilePending } =
    form;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="text-sm text-muted-foreground/60 font-light leading-relaxed">
        {m.forgot_password_header_desc()}
      </p>

      <div className="space-y-6">
        <div className="space-y-2 group">
          <label
            htmlFor="email"
            className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 group-focus-within:text-foreground transition-colors"
          >
            {m.forgot_password_email_label()}
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="glass-input w-full"
            placeholder={m.login_email_placeholder()}
          />
          {errors.email && (
            <span className="text-[9px] font-mono text-destructive uppercase tracking-widest mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting || turnstilePending}
          className="glass-btn glass-btn-primary w-full justify-center tracking-[0.3em] text-[10px] font-mono uppercase disabled:opacity-30"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <span>{m.forgot_password_submit()}</span>
          )}
        </button>

        <Link
          to="/login"
          className="block w-full text-center text-[9px] font-mono text-muted-foreground/50 hover:text-accent transition-colors"
        >
          [ ← {m.register_back_to_login()} ]
        </Link>
      </div>
    </form>
  );
}
