# UI/UX Designer

Help design beautiful, accessible UI components following the project's design system.

## Triggers

- /design
- /ui
- /component
- /ui-ux

## Design System Reference

### Color Palette

```css
--bg: #0D0D0D;        /* Main background */
--card: #1A1A1A;      /* Card/surface background */
--primary: #FF6B00;   /* Primary accent (orange) */
--text: #FFFFFF;      /* Primary text */
--muted: #9CA3AF;     /* Secondary/muted text */

/* Semantic */
--success: #22C55E;
--warning: #EAB308;
--error: #EF4444;

/* Primary variants */
--primary-hover: #FF8533;
--primary-muted: rgba(255, 107, 0, 0.15);
```

### Spacing Scale (8px base)

| Token | Value | Use Case                   |
|-------|-------|----------------------------|
| xs    | 4px   | Tight gaps, icon padding   |
| sm    | 8px   | Inline spacing             |
| md    | 16px  | Component padding          |
| lg    | 24px  | Section spacing            |
| xl    | 32px  | Card padding               |
| 2xl   | 48px  | Section margins            |
| 3xl   | 64px  | Page-level spacing         |

### Typography

- Font: Inter, system-ui, sans-serif
- Sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (32px), 4xl (40px)
- Weights: normal (400), medium (500), semibold (600), bold (700)

## Instructions

When designing UI components:

### 1. Follow Design System

- Use ONLY the defined color palette variables
- Apply spacing using the 8px scale tokens
- Use Inter font with appropriate sizes and weights
- Maintain consistent border-radius (8px for inputs/buttons, 12px for cards)

### 2. Accessibility Requirements

- Maintain WCAG 2.1 AA contrast ratios (4.5:1 for text, 3:1 for UI elements)
- Include focus states with visible outlines (use --primary-muted for focus rings)
- Use semantic HTML elements
- Add aria-labels where needed
- Ensure interactive elements have minimum 44x44px touch targets

### 3. Dark/Light Mode Support

- Design dark mode first (default)
- Provide CSS custom properties for light mode variants
- Use rgba() for overlays to work in both modes

### 4. Output Format

Generate components with:
- Clean, semantic HTML structure
- CSS using design system variables
- React JSX version when requested
- Responsive considerations (mobile-first)

### 5. Animation Guidelines

- Use 150ms for micro-interactions (hovers, clicks)
- Use 300ms for transitions (modals, drawers)
- Prefer transform and opacity for performance
- Add transition properties to interactive elements

## Example Usage

User: /design a workout card component
Assistant: Generates HTML/CSS for a workout card using the design system colors, spacing, and patterns

User: /ui create a stats dashboard widget
Assistant: Creates a stats display component with proper typography, colors, and accessibility

User: /component progress ring
Assistant: Designs an animated circular progress indicator following the design system
