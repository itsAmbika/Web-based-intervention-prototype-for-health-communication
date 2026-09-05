# Implementation Plan: About Us Page

## Overview

Replace the existing minimal `Home.jsx` role-selector with the full "Ask Your Doctor" About Us landing page. Introduce a shared `Navbar` and `Footer` component wired into `App.jsx`. Add a `LanguageSelector` reusable component. Install and configure Vitest + Testing Library for component tests.

---

## Tasks

- [x] 1. Install and configure the test framework
  - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` as dev dependencies
  - Add a `vitest.config.js` (or extend `vite.config.js`) with `jsdom` environment and `setupFiles` pointing to a `src/test/setup.js` that imports `@testing-library/jest-dom`
  - Add a `test` script to `package.json`: `"test": "vitest --run"`
  - Create `src/test/setup.js`
  - _Requirements: prerequisite for all test sub-tasks_

- [x] 2. Create the `LanguageSelector` component
  - Create `src/components/LanguageSelector.jsx`
  - Accept a `theme` prop (`'light'` | `'dark'`); default to `'light'`
  - Maintain `selected` state (default `'EN'`) using `useState`
  - Render three `<button>` elements labelled `EN`, `HI`, `MR` with `type="button"`
  - Apply a highlight class (e.g. `font-bold underline` for light, `bg-teal-700 text-white` for dark) to the selected option
  - Each button must be keyboard-focusable (no `tabIndex="-1"`)
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x]* 2.1 Write unit tests for `LanguageSelector`
    - Verify all three options are rendered (Property 5: LanguageSelector displays all three language options)
    - Verify clicking `HI` makes it selected; clicking `EN` restores selection (Property 6: LanguageSelector selection state reflects last user activation)
    - Verify that activating a language option does not change any surrounding text content (Property 7: LanguageSelector activation does not alter page text content)
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 3. Create the `Navbar` component
  - Create `src/components/Navbar.jsx`
  - Add `position: sticky; top: 0; z-index: 50` via Tailwind (`sticky top-0 z-50`) and a white/navy background with shadow
  - Render site name "Ask Your Doctor" as a `<Link to="/">` with `slate-800` text, bold
  - Render desktop nav links "About Us" and "About QPL" (href `#`) using `<a>` or `<Link>` — hidden on mobile (`hidden md:flex`)
  - Render `<LanguageSelector theme="light" />` inline for desktop — hidden on mobile
  - Render "Log In" `<Link to="/login">` as an outlined button and "Get Started" `<Link to="/select-role">` as a filled teal button — hidden on mobile
  - Add a hamburger `<button>` visible only on mobile (`md:hidden`) with `aria-label="Open menu"` and `aria-expanded={menuOpen}`
  - Manage `menuOpen` with `useState`; toggle on hamburger click
  - Render a mobile menu panel (`<div>` or `<nav>`) conditionally on `menuOpen` containing: nav links, `<LanguageSelector>`, Log In, Get Started
  - Wrap all Navbar content inside `<header>` with `role="banner"`
  - _Requirements: 1.1–1.10_

  - [x]* 3.1 Write unit tests for `Navbar`
    - Verify site name renders with link to `/`
    - Verify "Log In" links to `/login` and "Get Started" links to `/select-role`
    - Verify `aria-expanded="false"` initially on hamburger button
    - Verify clicking hamburger toggles `aria-expanded` to `true`; clicking again sets it back to `false`
    - _Requirements: 1.2, 1.5, 1.6, 1.8, 1.9, 9.5_

- [x] 4. Create the `Footer` component
  - Create `src/components/Footer.jsx`
  - Use `<footer>` as the root element with `slate-800` or `slate-900` background and white text
  - Render nav links section: "About Us", "About QPL", "Contact Us", "Privacy Policy", "Terms of Use" — each an `<a href="#">`
  - Render a Credits block with heading "Resource developed by" and a list of the four contributors with institutions (iterate over the same `CONTRIBUTORS` array pattern used in `Home.jsx`)
  - Render `<LanguageSelector theme="dark" />`
  - Render copyright line `© 2025 Ask Your Doctor. All rights reserved.`
  - _Requirements: 7.1–7.7_

  - [x]* 4.1 Write unit tests for `Footer`
    - Verify all five nav link labels are present (Property 4: Footer contains all required navigation links)
    - Verify all four contributor names and their institutions are rendered (Property 3: CreditsSection lists all contributors — Footer instance)
    - Verify copyright text is rendered
    - Verify `<LanguageSelector>` is present inside Footer
    - _Requirements: 7.3, 7.4, 7.6_

- [x] 5. Wire `Navbar` and `Footer` into `App.jsx`
  - Import `Navbar` from `./components/Navbar` and `Footer` from `./components/Footer`
  - Render `<Navbar />` immediately before `<Routes>` and `<Footer />` immediately after `</Routes>`, both outside the route definitions but inside `<BrowserRouter>`
  - Remove any existing route-level layout wrappers that duplicate header/footer
  - _Requirements: 1.1, 7.2_

  - [x]* 5.1 Write a smoke test for `App` wiring
    - Render `<App />` and verify the Footer is present in the output (i.e. copyright text appears)
    - Verify the Navbar is present (site name "Ask Your Doctor" appears)
    - _Requirements: 7.2_

- [x] 6. Rewrite `Home.jsx` — Hero and Why This Matters sections
  - Rewrite `src/pages/Home.jsx` as the full AboutUsPage
  - Wrap all content in `<main id="main-content">`
  - **HeroSection:** `<section aria-label="Hero">` with teal/navy gradient or solid background; render:
    - `<h1>` with "Ask Your Doctor"
    - `<p>` with "Prepare better questions for your doctor's visit."
    - "Get Started" `<Link to="/select-role">` as a filled teal button
    - "Log In" `<Link to="/login">` as an outlined button
    - `<LanguageSelector theme="light" />` (secondary placement)
  - **WhyThisMattersSection:** `<section aria-label="Why this matters">` with a white or `gray-50` background; render a heading and 2–3 sentence paragraph explaining that patients have unasked questions after a diagnosis and this tool helps them prepare before their appointment
  - Apply mobile-first responsive classes throughout; ensure vertical stacking below `md:` breakpoint
  - _Requirements: 2.1–2.7, 3.1–3.3, 9.1, 9.2, 10.1–10.5_

  - [x]* 6.1 Write unit tests for Hero and Why sections
    - Verify `<h1>` renders "Ask Your Doctor"
    - Verify value proposition paragraph is present
    - Verify "Get Started" href is `/select-role` and "Log In" href is `/login`
    - Verify `<section aria-label="Why this matters">` is present and contains explanatory text
    - Verify `<main>` element exists as root wrapper
    - _Requirements: 2.1–2.5, 3.1, 3.2, 9.1_

- [x] 7. Rewrite `Home.jsx` — HowItWorks and RoleCards sections
  - **HowItWorksSection:** `<section aria-label="How it works">` with `gray-50` background
    - Define `HOW_IT_WORKS_STEPS` array: `[{id:1, label:'Tell us about you'}, {id:2, label:'Build your question list'}, {id:3, label:'Take it to your doctor'}]`
    - Map over the array rendering each step as a `<div>` containing a step number badge (`<span>{step.id}</span>`) and the step label
    - On `md:` and above: `flex flex-row justify-center gap-8`; below: `flex flex-col`
  - **RoleCardsSection:** `<section aria-label="For patients and caregivers">` with white background
    - Define `ROLE_CARDS` array with `id`, `label`, `description`, `href`
    - Map over array rendering each card as a `<Link to={card.href}>` styled card with label and description
    - `md:flex-row` layout; `flex-col` below
    - Cards must have a hover state (e.g. `hover:shadow-lg hover:border-teal-600`)
  - _Requirements: 4.1–4.4, 5.1–5.6, 9.2_

  - [x]* 7.1 Write unit tests for HowItWorks and RoleCards sections
    - Verify the three step labels appear in correct DOM order (Property 1: HowItWorksSection renders all steps in order)
    - Verify each step has a numeric indicator (`1`, `2`, `3`) present in the DOM (Property 1)
    - Verify "I'm a Patient" card links to `/signup?role=patient`
    - Verify "I'm a Caregiver" card links to `/signup?role=caregiver`
    - Verify each rendered role card contains a non-empty description (Property 2: Each role card contains required content)
    - Verify `aria-label` attributes are present on both section elements (Property 8)
    - _Requirements: 4.1, 4.2, 5.2, 5.3, 5.4, 9.2_

- [x] 8. Rewrite `Home.jsx` — Credits section and accessibility clean-up
  - **CreditsSection:** `<section aria-label="Resource developed by">` with `gray-50` background
    - Define `CONTRIBUTORS` array with `name` and `institution` fields for all four contributors
    - Render a `<h2>` heading "Resource developed by"
    - Map over `CONTRIBUTORS` rendering each as `<li>` or `<div>` showing `name` — `institution`
  - Audit all `<section>` elements in `Home.jsx` for `aria-label` / `aria-labelledby` attributes
  - Add `aria-label` to any step number icons or decorative elements that are non-decorative
  - Ensure all `<Link>` and `<button>` elements have explicit visible focus classes (`focus:outline-none focus:ring-2 focus:ring-teal-500` or similar)
  - _Requirements: 6.1–6.4, 9.1–9.6_

  - [x]* 8.1 Write unit tests for Credits section and accessibility
    - Verify all four contributor names render in the CreditsSection (Property 3: CreditsSection lists all contributors)
    - Verify all four institution names render alongside their contributors
    - Verify every `<section>` in the rendered AboutUsPage has a non-empty `aria-label` or `aria-labelledby` (Property 8: All page sections carry accessible labels)
    - Verify any rendered `<img>` elements have non-empty `alt` attributes (Property 9: All non-decorative icons and images carry accessible labels)
    - _Requirements: 6.1, 6.2, 9.2, 9.6_

- [x] 9. Final checkpoint — run all tests and verify integration
  - Run `npm test` (or `npx vitest --run`) and confirm all tests pass
  - Manually verify the dev server renders the landing page at `/` with all sections visible
  - Confirm Footer and Navbar appear on `/patient` and `/caregiver` routes
  - Fix any failing tests or rendering issues before considering this complete
  - Ensure all tests pass; ask the user if any questions arise.
  - _Requirements: all_

---

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1"] },
    { "wave": 2, "tasks": ["2"] },
    { "wave": 3, "tasks": ["3", "4"] },
    { "wave": 4, "tasks": ["5"] },
    { "wave": 5, "tasks": ["6"] },
    { "wave": 6, "tasks": ["7"] },
    { "wave": 7, "tasks": ["8"] },
    { "wave": 8, "tasks": ["9"] }
  ]
}
```

---

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP build — but are strongly recommended for the healthcare context.
- All placeholder routes (`/login`, `/select-role`, `/signup?role=patient`, `/signup?role=caregiver`) need no implementation in this spec; `<Link>` components pointing to them are sufficient.
- The `LanguageSelector` component maintains its own state. If two instances exist on the same page (Navbar + Hero), their states are independent — this is intentional for this iteration.
- Colour classes used: `teal-600`, `teal-700` (CTAs), `slate-800`, `slate-900` (headings/dark backgrounds), `gray-50` (alternating section backgrounds), `white` (primary content backgrounds).
- No TypeScript — all files are `.jsx`.
