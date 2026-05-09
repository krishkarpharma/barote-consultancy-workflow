# Design Brief: Barote Consultancy Workflow Management

**Category:** Productivity / Internal Tool | **Mode:** Light (admin workspace) | **Aesthetic:** Professional, data-driven minimalism

## Visual Direction
Refined administrative interface prioritizing information density and quick scanning. Sky Blue conveys trust and agency; Red/Amber alerts cut through noise for critical deadlines and pending fees. Zero decoration — every pixel serves clarity and workflow efficiency.

## Palette
| Token | OKLCH | Purpose | Notes |
|-------|-------|---------|-------|
| Primary (Sky Blue) | 0.55 0.16 262 | Navigation, CTAs, active states | Confident, not corporate |
| Accent (Amber) | 0.65 0.19 47 | Pending fees, secondary actions | Warm, actionable |
| Destructive (Red) | 0.55 0.22 25 | Urgent deadlines, errors | High-priority visibility |
| Background | 0.985 0 0 | Page base | Off-white, warm |
| Card | 1.0 0 0 | Data containers, elevated zones | Pure white, crisp |

## Typography
Display: Bricolage Grotesque 700/600 (headings, section labels, metric values) | Body: DM Sans 400/500 (body text, descriptions, data) | Mono: Monospace (timestamps, IDs)

## Structural Zones
| Zone | Surface | Border | Purpose |
|------|---------|--------|---------|
| Header | Card (1.0 L) | Border-bottom subtle | App chrome, fixed height 60px |
| Sidebar | Background (0.985 L) | Sidebar-border subtle | Navigation, collapses < md breakpoint |
| Main Content | Background (0.985 L) | None | Primary workflow area, 24px padding |
| Cards | Card (1.0 L) | Border subtle | Data sections, metric boxes, alert boxes |

## Component Patterns
- **Metric cards:** 3-col grid desktop, 2-col tablet, 1-col mobile; label/value stacked; elevated shadow
- **Status badges:** 4 states (pending-amber, completed-green, in-progress-blue, on-hold-muted); inline-flex, 3px padding
- **Alert cards:** Left 4px border accent; tinted background (5% opacity); icon + text layout
- **Form inputs:** 32px height, border-input, focus:ring-2 primary, smooth transitions
- **Sidebar items:** Padding 8px vertical, hover:bg opacity increase, active:bg primary

## Spacing & Rhythm
Base: 4px | Cards: 16px internal | Section gap: 24px | Mobile gap: 12px | Sidebar width: 240px (closes < md)

## Motion
Smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive elements. No entry animations; reserved for user-triggered changes (collapse, filter, status transitions).

## Constraints
No decorative gradients, blur, or animations on page load. Consistent `rounded-lg` (12px). Red/Amber reserved for alerts only. Maximum 5 semantic colors; chart palette extends to 5 for reporting visualizations.
