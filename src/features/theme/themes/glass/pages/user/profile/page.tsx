import { Link } from "@tanstack/react-router";
import { Loader2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfilePageProps } from "@/features/theme/contract/pages";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export function ProfilePage({
  user,
  profileForm,
  passwordForm,
  notification,
  logout,
}: ProfilePageProps) {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-6 md:px-0 py-12 md:py-20 space-y-20">
      {/* Header Section */}
      <header className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground flex items-center gap-4">
              {m.profile_settings()}
            </h1>
            <div className="space-y-4 max-w-2xl text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              <p>{m.profile_settings_desc()}</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
            >
              <Terminal size={14} />
              {m.profile_back_home()}
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full h-px bg-border/40" />

      {/* Identity Section */}
      <section className="glass-card p-8 md:p-10 flex items-center gap-8">
        <div
          className="w-24 h-24 rounded-2xl overflow-hidden border border-white/20 dark:border-white/5 bg-white/10 dark:bg-white/5 relative"
          style={{ viewTransitionName: "user-avatar" }}
        >
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-foreground tracking-tight">
            {user.name}
          </h2>
          <div className="flex flex-col gap-1 text-xs font-mono text-muted-foreground/60 tracking-widest">
            <span className="uppercase">
              {user.role === "admin"
                ? m.profile_role_admin()
                : m.profile_role_reader()}
            </span>
            <span>{user.email}</span>
          </div>
        </div>
      </section>

      {/* Settings Forms */}
      <div className="space-y-16">
        {/* Basic Info */}
        <section className="space-y-8">
          <h3 className="text-lg font-serif font-medium text-foreground">
            {m.profile_basic_info()}
          </h3>

          <div className="glass-card p-8 md:p-10">
            <form onSubmit={profileForm.handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-focus-within:text-foreground transition-colors">
                    {m.profile_name()}
                  </label>
                  <Input
                    {...profileForm.register("name")}
                    className="glass-input w-full"
                  />
                  {profileForm.errors.name && (
                    <span className="text-[10px] text-destructive font-mono">
                      {profileForm.errors.name.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-focus-within:text-foreground transition-colors">
                    {m.profile_avatar_url()}
                  </label>
                  <Input
                    {...profileForm.register("image")}
                    className="glass-input w-full"
                    placeholder="https://..."
                  />
                  {profileForm.errors.image && (
                    <span className="text-[10px] text-destructive font-mono">
                      {profileForm.errors.image.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-start">
                <Button
                  type="submit"
                  disabled={profileForm.isSubmitting}
                  variant="ghost"
                  className="glass-btn glass-btn-primary text-xs font-mono"
                >
                  {profileForm.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin" />{" "}
                      {m.profile_saving()}
                    </span>
                  ) : (
                    `[ ${m.profile_save_changes()} ]`
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>

        <div className="w-full h-px bg-border/40" />

        {notification.available && (
          <section className="space-y-8">
            <h3 className="text-lg font-serif font-medium text-foreground">
              {m.profile_preferences()}
            </h3>
            <div className="glass-card p-6 md:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-sans text-foreground">
                  {m.profile_email_notify()}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground block">
                  {m.profile_email_notify_desc()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={notification.isLoading || notification.isPending}
                onClick={notification.toggle}
                className={cn(
                  "glass-btn text-[10px] font-mono tracking-wider h-auto px-3 py-1",
                  notification.enabled
                    ? "glass-btn-primary"
                    : "border border-white/20 dark:border-white/5 text-muted-foreground hover:text-accent",
                )}
              >
                {notification.enabled
                  ? m.profile_notify_enabled()
                  : m.profile_notify_disabled()}
              </Button>
            </div>
          </section>
        )}

        {/* Security Section */}
        {passwordForm && (
          <>
            <div className="w-full h-px bg-border/40" />
            <section className="space-y-8">
              <h3 className="text-lg font-serif font-medium text-foreground">
                {m.profile_security_settings()}
              </h3>
              <div className="glass-card p-8 md:p-10">
                <form onSubmit={passwordForm.handleSubmit} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-focus-within:text-foreground transition-colors">
                      {m.profile_current_password()}
                    </label>
                    <Input
                      type="password"
                      {...passwordForm.register("currentPassword")}
                      className="glass-input w-full"
                    />
                    {passwordForm.errors.currentPassword && (
                      <span className="text-[10px] text-destructive font-mono">
                        {passwordForm.errors.currentPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-focus-within:text-foreground transition-colors">
                      {m.profile_new_password()}
                    </label>
                    <Input
                      type="password"
                      {...passwordForm.register("newPassword")}
                      className="glass-input w-full"
                    />
                    {passwordForm.errors.newPassword && (
                      <span className="text-[10px] text-destructive font-mono">
                        {passwordForm.errors.newPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider group-focus-within:text-foreground transition-colors">
                      {m.profile_confirm_password()}
                    </label>
                    <Input
                      type="password"
                      {...passwordForm.register("confirmPassword")}
                      className="glass-input w-full"
                    />
                    {passwordForm.errors.confirmPassword && (
                      <span className="text-[10px] text-destructive font-mono">
                        {passwordForm.errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-start pt-2">
                    <Button
                      type="submit"
                      disabled={passwordForm.isSubmitting}
                      variant="ghost"
                      className="glass-btn glass-btn-primary text-xs font-mono"
                    >
                      {passwordForm.isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={12} className="animate-spin" />{" "}
                          {m.profile_updating()}
                        </span>
                      ) : (
                        `[ ${m.profile_update_password()} ]`
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}

        <div className="w-full h-px bg-border/40" />

        {/* Action Links */}
        <section className="glass-card p-6 md:p-8 flex flex-col items-start gap-4">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="font-mono text-xs text-foreground/60 hover:text-accent transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <span>[ {m.profile_admin_dashboard()} ]</span>
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={logout}
            className="font-mono text-xs text-destructive/60 hover:text-destructive hover:bg-transparent p-0 h-auto transition-colors tracking-widest"
          >
            [ {m.profile_logout()} ]
          </Button>
        </section>
      </div>
    </div>
  );
}
