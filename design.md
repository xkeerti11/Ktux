# KTUX Studio — Design System

Official source of truth for all UI/UX styling, typography, colors, component tokens, and motion standards across KTUX Studio.

---

## 1. Colors

| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| **`--page-bg`** | `#050507` | Core canvas background (Obsidian Dark) |
| **`--page-card`** | `#0C0C10` | Primary surface cards and container blocks |
| **`--page-raised`** | `#14141A` | Elevated inputs, badges, active hover states |
| **`--page-border`** | `rgba(255, 255, 255, 0.08)` | Hairline dividers and subtle container outlines |
| **`--page-border-strong`**| `rgba(255, 255, 255, 0.16)` | Interactive hover borders and focused inputs |
| **`--page-text`** | `#FFFFFF` | Primary headlines and high-emphasis labels |
| **`--page-body`** | `#E4E4E7` | Body paragraphs (high readability on dark) |
| **`--page-muted`** | `#8E8E93` | Secondary descriptions, timestamps, subheadings |
| **`--color-gold`** | `#C9A227` | Primary accent, key metric counters, active indicators |
| **`--color-success`** | `#22C55E` | Live status dots, verified checkmarks, positive metrics |
| **`--color-error`** | `#EF4444` | Form validation errors and alert indicators |

---

## 2. Typography

All typography is rendered using Google Fonts (`Geist` / `Manrope` for Headings & Body, `JetBrains Mono` for metadata).

| Level | Size (Fluid Clamp) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `clamp(52px, 7vw, 80px)` | 900 | 1.05 | `-0.04em` |
| **H1** | `clamp(38px, 5.5vw, 64px)` | 900 | 1.10 | `-0.03em` |
| **H2** | `clamp(30px, 4vw, 48px)` | 800 | 1.15 | `-0.03em` |
| **H3** | `clamp(20px, 2.5vw, 28px)` | 800 | 1.25 | `-0.02em` |
| **Body** | `clamp(15px, 1.6vw, 17px)` | 500 | 1.70 | `0` |
| **Caption / Small** | `13px – 14px` | 600 | 1.50 | `0` |
| **Micro / Mono** | `10px – 12px` | 700 | 1.40 | `0.06em` |

---

## 3. Spacing System (8-Point Grid)

Strict multiples of 8 (with 12px intermediate) are enforced for margins, paddings, and layout gaps:

- `8px` — Micro gaps (icon to text, inline badges)
- `12px` — Component internal padding, small list gaps
- `16px` — Standard card inner spacing, button horizontal padding
- `24px` — Card container padding, column gaps
- `32px` — Section element separation
- `48px` — Major section headings to grid separation
- `64px` — Medium section block spacing
- `96px` — Large section vertical breathing room
- `128px` — Page hero clearance and monumental breaks

---

## 4. Corner Radius

- `8px` — Badges, small pills, code blocks
- `12px` — Form inputs, dropdown menus, icon containers
- `16px` — Accordion cards, dialog modals, small cards
- `24px` — Standard bento cards, pricing cards, preview frames
- `999px` — Full pill buttons, filter pills, status badges

---

## 5. Components Standard

### 5.1 Buttons
- **Primary Action (`.button-white`)**: `#FFFFFF` background, `#050507` bold text, pill radius (`999px`), minimum height `44px` (touch-target compliant).
- **Secondary Action (`.button-glass-play`)**: Semi-transparent `#14141A` with `1px solid rgba(255,255,255,0.12)`, `#FFFFFF` text.

### 5.2 Section Headings
- Structured hierarchy: `.talos-pill` (small status indicator) $\rightarrow$ `H2` in crisp white $\rightarrow$ descriptive body in `#8E8E93`.
- Gold italic is used **only** for singular emphasis keywords or active metrics, never sprayed across entire sentences.

### 5.3 Surface Cards
- Background: `#0C0C10`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Hover: `border-color: rgba(255, 255, 255, 0.22); transform: translateY(-4px);`
- Radius: `24px`

---

## 6. Motion & Transitions

- **Fast (Hover / Tap Feedback)**: `0.18s cubic-bezier(0.16, 1, 0.3, 1)`
- **Medium (Accordion / Drawer Dropdown)**: `0.28s ease-in-out`
- **Slow (Scroll Reveal / Section Mount)**: `0.55s cubic-bezier(0.16, 1, 0.3, 1)`
