import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DocTable, wrap, eyebrow, note, PageHeader } from "./_docTable";
import { Guidance } from "./guidance";
import "./tokens.css";
import "./typography.css";

/**
 * Components — Avatar (Radix, verbatim ui/avatar).
 * In the live F1 the avatar is used sparingly: a small grey initials circle in
 * payroll rows and the signed-in user (top-right). No photo avatars. A brand tint
 * (bg-primary/10) appears only in Team Members / Roles views.
 */
const meta: Meta = { title: "Components/Avatar", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const AvatarStory: Story = {
  name: "Avatar",
  render: () => (
    <div style={wrap}>
      <PageHeader
        category="Components"
        status="Stable"
        title="Avatar"
        lead={<>
        A circular initials marker. In F1 it's the small grey circle in payroll rows and the signed-in user —
        always initials, the flows carry no photo avatars. All classes verbatim from the source.
        </>}
      />

      <h3 style={eyebrow}>Sizes (where they differ)</h3>
      <DocTable head={["Size", "Example", "classes"]} rows={[
        ["Row (h-8)", <Avatar className="h-8 w-8"><AvatarFallback className="bg-muted text-[11px] font-medium text-muted-foreground">MS</AvatarFallback></Avatar>, "h-8 w-8 · fallback text-[11px]"],
        ["User (h-9)", <Avatar className="h-9 w-9"><AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">JU</AvatarFallback></Avatar>, "h-9 w-9 · fallback text-xs"],
      ]} />

      <h3 style={eyebrow}>Variants</h3>
      <DocTable head={["Variant", "Example", "classes"]} rows={[
        ["Grey initials (default)", <Avatar className="h-8 w-8"><AvatarFallback className="bg-muted text-[11px] font-medium text-muted-foreground">MS</AvatarFallback></Avatar>, "bg-muted text-muted-foreground font-medium · payroll rows + users"],
        ["Brand tint (team / roles)", <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-emphasis text-[11px] font-medium">AL</AvatarFallback></Avatar>, "bg-primary/10 text-emphasis · Team Members / Roles only"],
        ["Image → fallback", <Avatar className="h-8 w-8"><AvatarImage src="https://i.pravatar.cc/64?img=5" alt="" /><AvatarFallback className="bg-muted text-[11px] font-medium text-muted-foreground">AL</AvatarFallback></Avatar>, "AvatarImage falls back to initials if it fails to load"],
      ]} />

      <p style={{ ...note, marginTop: 14 }}>root rounded-full overflow-hidden · fallback centred flex · grey is canonical; tint only in team/roles</p>
      <Guidance k="avatar" />
    </div>
  ),
};
