import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import frontedLogo from "../../fronted-logo.png";

/**
 * Auth — the logged-out screens, verbatim from pages/Auth.tsx (Zap icon removed from
 * Sign In). Shared by Patterns/Login and the flow pages.
 */

export const Wordmark = () => <img src={frontedLogo} alt="Fronted" className="h-10 object-contain" />;

/** Shared auth chrome — gradient backdrop, soft blobs, centred logo + glass card.
 *  `fullPage` fills the viewport the way /auth does in the app. */
export function AuthShell({ children, fullPage = false }: { children: React.ReactNode; fullPage?: boolean }) {
  return (
    <div className={cn(fullPage ? "min-h-screen" : "min-h-[520px]", "bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.06] relative overflow-hidden")}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-10" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.05))" }} />
        <div className="absolute -bottom-24 -right-28 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.08]" style={{ background: "linear-gradient(225deg, hsl(var(--accent) / 0.06), hsl(var(--primary) / 0.04))" }} />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-center mb-8"><Wordmark /></div>
        <div className="max-w-md mx-auto">
          <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sign in. `email` / `password` pre-fill the fields (a filled form); `loading` is the
 *  submitting state. */
export function SignInCard({ loading = false, email, password }: { loading?: boolean; email?: string; password?: string }) {
  return (
    <>
      <div className="p-6 pb-4 border-b border-border/30">
        <h2 className="text-lg font-semibold text-foreground mb-1">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">Sign in to continue managing your workforce and operations.</p>
      </div>
      <div className="p-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium text-foreground">Email Address</Label>
            <Input id="login-email" type="email" autoComplete="email" placeholder="you@company.com" defaultValue={email} className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-sm font-medium text-foreground">Password</Label>
              <Button type="button" variant="link" className="h-auto p-0 text-sm font-medium">Forgot password?</Button>
            </div>
            <Input id="login-password" type="password" placeholder="Enter your password" defaultValue={password} className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
          </div>
          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing In…</>) : "Sign In"}
          </Button>
        </form>
      </div>
    </>
  );
}

/** Reset your password — request a reset link. */
export function ResetCard({ loading = false }: { loading?: boolean }) {
  return (
    <>
      <div className="p-6 pb-4 border-b border-border/30">
        <h2 className="text-lg font-semibold text-foreground mb-1">Reset your password</h2>
        <p className="text-sm text-muted-foreground">Enter your email address and we'll send you a link to set a new password.</p>
      </div>
      <div className="p-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-sm font-medium text-foreground">Email Address</Label>
            <Input id="reset-email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
          </div>
          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>) : "Send reset link"}
          </Button>
          <div className="flex justify-center">
            <Button type="button" variant="ghost" className="h-auto py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Back to sign in</Button>
          </div>
        </form>
      </div>
    </>
  );
}

/** Check your email — confirmation after requesting a reset link. */
export function CheckEmailCard({ email = "you@company.com" }: { email?: string }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-1">Check your email</h2>
      <p className="text-sm text-muted-foreground">
        If an account exists for <span className="text-foreground font-medium">{email}</span>, a reset link is on its way.
        The link expires in 60 minutes.
      </p>
      <div className="mt-5 pt-5 border-t border-border/30">
        <p className="text-sm text-muted-foreground mb-3">Didn't get it? Check your spam folder, or send the link again.</p>
        <Button type="button" variant="outline" className="w-full h-11">Resend link</Button>
        <div className="flex justify-center mt-4">
          <Button type="button" variant="ghost" className="h-auto py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Back to sign in</Button>
        </div>
      </div>
    </div>
  );
}

/** Set a new password — the screen reached from the reset link in the email. */
export function SetPasswordCard() {
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const reqs = [
    { ok: pw.length >= 8, label: "At least 8 characters" },
    { ok: /[0-9]/.test(pw), label: "A number" },
    { ok: /[A-Z]/.test(pw), label: "An uppercase letter" },
  ];
  const mismatch = confirm.length > 0 && pw !== confirm;
  return (
    <>
      <div className="p-6 pb-4 border-b border-border/30">
        <h2 className="text-lg font-semibold text-foreground mb-1">Set a new password</h2>
        <p className="text-sm text-muted-foreground">Choose a strong password you haven't used before.</p>
      </div>
      <div className="p-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium text-foreground">New password</Label>
            <div className="relative">
              <Input id="new-password" type={show ? "text" : "password"} autoComplete="new-password" placeholder="Enter a new password"
                     value={pw} onChange={(e) => setPw(e.target.value)}
                     onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                     className="h-11 pr-10 bg-background/50 border-border/50 focus:border-primary/50" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className={cn("grid transition-all duration-200 ease-out", focused ? "grid-rows-[1fr] opacity-100 pt-1" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <ul className="space-y-1">
                  {reqs.map((r) => (
                    <li key={r.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={cn("flex h-3.5 w-3.5 items-center justify-center rounded-full", r.ok ? "bg-accent-blue-fill text-accent-blue-text" : "border border-border")}>
                        {r.ok ? <Check className="h-2.5 w-2.5" /> : <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />}
                      </span>
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm password</Label>
            <Input id="confirm-password" type={show ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter your new password"
                   value={confirm} onChange={(e) => setConfirm(e.target.value)}
                   className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
            {mismatch ? <p className="text-xs text-destructive">Passwords don't match.</p> : null}
          </div>
          <Button type="submit" className="w-full h-11 text-base font-medium">Reset password</Button>
          <div className="flex justify-center">
            <Button type="button" variant="ghost" className="h-auto py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Back to sign in</Button>
          </div>
        </form>
      </div>
    </>
  );
}

/** Password updated — success confirmation after the reset completes. */
export function PasswordUpdatedCard() {
  return (
    <div className="p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-green-fill/50">
        <Check className="h-6 w-6 text-accent-green-text" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-1">Password updated</h2>
      <p className="text-sm text-muted-foreground">Your password has been reset. You can now sign in with your new password.</p>
      <Button className="w-full h-11 text-base font-medium mt-5">Continue to sign in</Button>
    </div>
  );
}
