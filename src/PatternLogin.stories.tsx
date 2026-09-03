import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import frontedLogo from "./fronted-logo.png";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import "./tokens.css";
import "./typography.css";

/**
 * Patterns — Login / Auth (verbatim from pages/Auth.tsx — the screens you get when logged out
 * of any demo flow). One glass card on a gradient backdrop, three states:
 * Sign in → Reset your password → Check your email. All composed from Input, Label and Button
 * and skinned by our tokens. NOTE: the AI-generated lightning (Zap) icon is removed from Sign In.
 */
const meta: Meta = { title: "Patterns/Login", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const Wordmark = () => <img src={frontedLogo} alt="Fronted" className="h-10 object-contain" />;

/** Shared auth chrome — gradient backdrop, soft blobs, centred logo + glass card. */
function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[520px] bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.06] relative overflow-hidden">
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

/** Sign in. */
function SignInCard({ loading = false }: { loading?: boolean }) {
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
            <Input id="login-email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-sm font-medium text-foreground">Password</Label>
              <Button type="button" variant="link" className="h-auto p-0 text-sm font-medium text-emphasis">Forgot password?</Button>
            </div>
            <Input id="login-password" type="password" placeholder="Enter your password" className="h-11 bg-background/50 border-border/50 focus:border-primary/50" />
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
function ResetCard({ loading = false }: { loading?: boolean }) {
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
function CheckEmailCard({ email = "you@company.com" }: { email?: string }) {
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
function SetPasswordCard() {
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
function PasswordUpdatedCard() {
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

const frame: React.CSSProperties = { border: "1px solid var(--ds-color-border)", borderRadius: 16, overflow: "hidden" };

export const Login: Story = {
  name: "Login",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Pattern"
        status="Stable"
        title="Login"
        lead={<>The logged-out auth flow shared by every demo flow — one glass card on a gradient backdrop across three states: <b>Sign in</b>, <b>Reset your password</b>, and <b>Check your email</b>. Composed from the Input, Label and Button components and skinned entirely by our tokens.</>}
        meta="Verbatim from pages/Auth.tsx · Zap icon removed from Sign In"
      />

      <h3 style={eyebrow}>Sign in</h3>
      <div style={frame}><AuthShell><SignInCard /></AuthShell></div>

      <h3 style={eyebrow}>Forgot password — request a link</h3>
      <div style={frame}><AuthShell><ResetCard /></AuthShell></div>

      <h3 style={eyebrow}>Forgot password — check your email</h3>
      <div style={frame}><AuthShell><CheckEmailCard email="joe@acme.com" /></AuthShell></div>

      <h3 style={eyebrow}>Forgot password — set a new password</h3>
      <p style={{ ...note, marginTop: -6, marginBottom: 12 }}>Reached from the reset link in the email. Type a password to see the live requirement checks and match validation.</p>
      <div style={frame}><AuthShell><SetPasswordCard /></AuthShell></div>

      <h3 style={eyebrow}>Forgot password — password updated</h3>
      <div style={frame}><AuthShell><PasswordUpdatedCard /></AuthShell></div>

      <h3 style={eyebrow}>Button states</h3>
      <DocTable head={["State", "Example", "Notes"]} w0={150} rows={[
        ["Sign In", <Button className="h-11 px-6 text-base font-medium">Sign In</Button>, "Full-width gradient primary · one action per view"],
        ["Sign In · loading", <Button disabled className="h-11 px-6 text-base font-medium"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing In…</Button>, "disabled + spinner while authenticating"],
        ["Send reset link", <Button className="h-11 px-6 text-base font-medium">Send reset link</Button>, "gradient primary on the reset screen"],
        ["Send reset link · loading", <Button disabled className="h-11 px-6 text-base font-medium"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</Button>, "disabled + spinner while sending"],
        ["Resend link", <Button variant="outline" className="h-11 px-6">Resend link</Button>, "outline — secondary action on the check-email screen"],
        ["Reset password", <Button className="h-11 px-6 text-base font-medium">Reset password</Button>, "gradient primary — commits the new password on the set-password screen"],
        ["Continue to sign in", <Button className="h-11 px-6 text-base font-medium">Continue to sign in</Button>, "gradient primary — from the success screen back to sign in"],
        ["Forgot password? / Back to sign in", <Button variant="link" className="h-auto p-0 text-sm font-medium text-emphasis">Forgot password?</Button>, "link · text-emphasis (never yellow-on-white)"],
      ]} />

      <h3 style={eyebrow}>Flow</h3>
      <p style={{ ...note, marginTop: 0 }}>
        Sign in ──(Forgot password?)──▶ Reset your password ──(Send reset link)──▶ Check your email
        ──(reset link in email)──▶ Set a new password ──(Reset password)──▶ Password updated ──▶ Sign in.
        Every screen has a Back to sign in return. The "check your email" copy is deliberately worded
        "if an account exists" so it never reveals whether an email is registered (account-enumeration safe);
        the set-password screen enforces live requirement checks + a confirm-match before it can submit.
      </p>
    </div>
  ),
};
