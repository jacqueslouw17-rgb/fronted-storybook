import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthShell, SignInCard, ResetCard, CheckEmailCard, SetPasswordCard, PasswordUpdatedCard } from "@/components/flows/auth";
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
        ["Forgot password?", <Button variant="link" className="h-auto p-0 text-sm font-medium">Forgot password?</Button>, "link · text-foreground, hover:text-emphasis (as in the app; never yellow-on-white)"],
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
