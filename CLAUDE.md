# Fitness Website

A React.js application to help users track, improve, and stay consistent with their health and workouts.

## Tech Stack

- **Framework:** React.js
- **Styling:** CSS Modules / Tailwind CSS (with dark mode support)
- **State Management:** React Context or Zustand
- **Routing:** React Router
- **Build Tool:** Vite

## Design Principles

- **Modern & Minimal:** Clean interfaces with purposeful whitespace
- **Dark Mode First:** Full dark/light theme support with system preference detection
- **Mobile Responsive:** Mobile-first approach for on-the-go tracking
- **Accessible:** WCAG 2.1 AA compliance

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level page components
├── hooks/          # Custom React hooks
├── context/        # React Context providers
├── utils/          # Helper functions
├── styles/         # Global styles and theme config
└── assets/         # Images, icons, fonts
```

## Core Features

- **Workout Tracking:** Log exercises, sets, reps, and weights
- **Progress Dashboard:** Visualize fitness journey over time
- **Goal Setting:** Define and track health/fitness goals
- **Habit Streaks:** Encourage consistency with streak tracking
- **Exercise Library:** Browse and search exercises

## Coding Conventions

- Use functional components with hooks
- Prefer named exports
- Use camelCase for variables/functions, PascalCase for components
- Keep components small and focused (single responsibility)
- Colocate tests with components (`Component.test.jsx`)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Lint code
```

## Design System

### Color Palette

```css
:root {
  --bg: #0D0D0D;        /* Main background */
  --card: #1A1A1A;      /* Card/surface background */
  --primary: #FF6B00;   /* Primary accent (orange) */
  --text: #FFFFFF;      /* Primary text */
  --muted: #9CA3AF;     /* Secondary/muted text */

  /* Semantic colors */
  --success: #22C55E;
  --warning: #EAB308;
  --error: #EF4444;

  /* Primary variants */
  --primary-hover: #FF8533;
  --primary-muted: rgba(255, 107, 0, 0.15);
}
```

### Spacing Scale

Base unit: `8px`

| Token   | Value  | Use Case                     |
|---------|--------|------------------------------|
| `xs`    | 4px    | Tight gaps, icon padding     |
| `sm`    | 8px    | Inline spacing, small gaps   |
| `md`    | 16px   | Component padding            |
| `lg`    | 24px   | Section spacing              |
| `xl`    | 32px   | Card padding, major gaps     |
| `2xl`   | 48px   | Section margins              |
| `3xl`   | 64px   | Page-level spacing           |

### Typography Scale

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font sizes */
  --text-xs: 0.75rem;     /* 12px - labels, captions */
  --text-sm: 0.875rem;    /* 14px - secondary text */
  --text-base: 1rem;      /* 16px - body text */
  --text-lg: 1.125rem;    /* 18px - emphasized body */
  --text-xl: 1.25rem;     /* 20px - small headings */
  --text-2xl: 1.5rem;     /* 24px - section headings */
  --text-3xl: 2rem;       /* 32px - page titles */
  --text-4xl: 2.5rem;     /* 40px - hero text */

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Component Patterns

#### Buttons

```jsx
// Primary button
<button className="btn btn-primary">Start Workout</button>

// Ghost/outline variant
<button className="btn btn-ghost">Cancel</button>

// Icon button
<button className="btn btn-icon"><PlusIcon /></button>
```

```css
.btn {
  padding: var(--sm) var(--md);
  border-radius: 8px;
  font-weight: var(--font-medium);
  transition: all 150ms ease;
}

.btn-primary {
  background: var(--primary);
  color: var(--bg);
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--muted);
  color: var(--text);
}
```

#### Cards

```jsx
<div className="card">
  <div className="card-header">Today's Workout</div>
  <div className="card-body">{/* content */}</div>
</div>
```

```css
.card {
  background: var(--card);
  border-radius: 12px;
  padding: var(--xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

#### Input Fields

```jsx
<div className="input-group">
  <label className="input-label">Weight (kg)</label>
  <input type="number" className="input" />
</div>
```

```css
.input {
  background: var(--bg);
  border: 1px solid var(--muted);
  border-radius: 8px;
  padding: var(--sm) var(--md);
  color: var(--text);
}

.input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px var(--primary-muted);
}
```

#### Stat/Metric Display

```jsx
<div className="stat">
  <span className="stat-value">12</span>
  <span className="stat-label">Day Streak</span>
</div>
```

#### Progress Indicators

```jsx
<div className="progress">
  <div className="progress-bar" style={{ width: '75%' }} />
</div>
```

```css
.progress {
  height: 8px;
  background: var(--card);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary);
  transition: width 300ms ease;
}
```

## Current Goals

- [ ] Animated progress bars
- [ ] Smooth card transitions
- [ ] Counting numbers (animated stat displays)
- [ ] Responsive layout
- [ ] Dark / light mode toggle

## Notes

- Prioritize performance for smooth animations and transitions
- Use lazy loading for route-level code splitting
- Store user data locally (localStorage) initially; backend integration TBD
