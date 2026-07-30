# VITHub Design System

This document outlines the core design tokens and conventions for the VITHub frontend application. Our goal is to maintain a Premium SaaS aesthetic inspired by Linear, Vercel, Stripe, and Notion.

## 1. Colors
We use CSS variables for theme switching (Dark mode by default). Only semantic colors required by shadcn/ui (e.g., destructive) are included. Do not expand this palette unnecessarily.

- **Primary**: `#6C63FF`
- **Secondary**: `#A78BFA`
- **Accent**: `#C4B5FD`
- **Background**: `#09090B`
- **Card**: `#18181B`
- **Border**: `#27272A`
- **Text**: `#FFFFFF`

## 2. Spacing Scale
A documented spacing scale for consistent margins, paddings, and gaps:
- `xs` : `0.25rem` (4px)
- `sm` : `0.5rem` (8px)
- `md` : `1rem` (16px)
- `lg` : `1.5rem` (24px)
- `xl` : `2rem` (32px)
- `2xl`: `3rem` (48px)

Usage in Tailwind: `p-xs`, `m-md`, `gap-lg`.

## 3. Typography
- **Font**: Inter (`var(--font-inter)`)
- **Tracking**: Use tighter tracking on headings (`tracking-tight`) and default tracking on body text.

## 4. Shadows & Depth
Premium dark themes rely on soft, multi-layered shadows and subtle borders instead of harsh drop-shadows.
- `shadow-sm`, `shadow-md`, `shadow-lg` for elevation.
- `shadow-glow` (`var(--shadow-glow)`) for active/primary states.
- `shadow-inner-border` for subtle card outlines.

## 5. Border Radius
- Base `--radius` is `0.5rem` (8px).
- `rounded-sm` (6px), `rounded-md` (8px), `rounded-lg` (12px).

## 6. Z-Index Tokens
Avoid z-index wars by strictly using these predefined tokens:
- `z-dropdown`: 1000
- `z-popover`: 1050
- `z-tooltip`: 1100
- `z-overlay`: 1200
- `z-modal`: 1300
- `z-toast`: 1400

## 7. Animations (Framer Motion)
Instead of redefining animations in components, use the reusable presets in `src/lib/motion.ts`.
- `pageTransition`: Standard opacity + y-axis slide.
- `cardHover`: Springy lift effect on hover.
- `fade`, `slideUp`, `modalTransition`, `staggerContainer`, `staggerItem`.

## 8. Focus States
Focus states utilize the `--ring` variable (mapped to the Primary/Secondary colors based on theme) with an `outline-ring/50` application globally for accessible, clean focus outlines.

## 9. Component Conventions
- Use `src/lib/utils.ts` (`cn` function wrapping `clsx` + `tailwind-merge`) for conditional class merging.
- Prefer Server Components by default; add `"use client"` only when interactivity or hooks (like Framer Motion) are required.
