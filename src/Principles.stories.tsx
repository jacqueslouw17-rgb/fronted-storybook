import type { Meta, StoryObj } from "@storybook/react";
import { PRINCIPLES, PrinciplePage } from "./principles";
import "./tokens.css";
import "./typography.css";

/**
 * Design Strategy › Principles — each principle in the shared anatomy
 * (Intent → Why → When it matters → Trade-offs → Measures → Default rules → Applied in),
 * plus its grounding (the law / heuristic) and its competitor edge.
 * Tier A (1–4) = how a screen behaves · Tier B (5–12) = what an EOR product must be.
 */
const meta: Meta = { title: "Design Strategy/Principles", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

const page = (i: number) => () => <PrinciplePage p={PRINCIPLES[i]} />;

export const P1: Story = { name: "P1 · Edit in Context", render: page(0) };
export const P2: Story = { name: "P2 · Single Focus", render: page(1) };
export const P3: Story = { name: "P3 · Focus Mode", render: page(2) };
export const P4: Story = { name: "P4 · One Primary Action", render: page(3) };
export const P5: Story = { name: "P5 · Absorb the Complexity", render: page(4) };
export const P6: Story = { name: "P6 · Total Cost, Always Clear", render: page(5) };
export const P7: Story = { name: "P7 · Status You Can Trust", render: page(6) };
export const P8: Story = { name: "P8 · Prevent Money Mistakes", render: page(7) };
export const P9: Story = { name: "P9 · Compliance in Context", render: page(8) };
export const P10: Story = { name: "P10 · Worker-Grade Mobile", render: page(9) };
export const P11: Story = { name: "P11 · Make the Money Moment Feel Good", render: page(10) };
export const P12: Story = { name: "P12 · One Product, Two Clean Tracks", render: page(11) };
