# Requirements Document

## Introduction

The About Us page is the public-facing landing page for the QPL (Question Prompt List) Digital Platform, a healthcare web application branded "Ask Your Doctor." It replaces the existing minimal role-selector at the `/` route with a full, multi-section marketing and onboarding page. Every visitor — patient, caregiver, or researcher — lands on this page first. The page must communicate the platform's purpose, guide users to the appropriate entry point, credit the academic team behind the resource, and provide persistent navigation and footer on every route via a shared Footer component.

## Glossary

- **AboutUsPage**: The React component at `src/pages/Home.jsx` that renders the full landing page at the `/` route.
- **Navbar**: The sticky top navigation bar component at `src/components/Navbar.jsx`.
- **Footer**: The shared footer component at `src/components/Footer.jsx`, rendered from `App.jsx` on every route.
- **HeroSection**: The prominent top content area of the AboutUsPage containing headline, value proposition, and CTA buttons.
- **HowItWorksSection**: The three-step visual walkthrough section.
- **RoleCardsSection**: The two side-by-side cards directing patients and caregivers to their respective sign-up flows.
- **CreditsSection**: The "Resource developed by" attribution block listing academic contributors.
- **LanguageSelector**: The UI-only language toggle showing EN / HI / MR options, present in the Navbar and Footer.
- **CTA**: Call-to-action button.
- **WCAG 2.1 AA**: Web Content Accessibility Guidelines version 2.1, Level AA — the target accessibility compliance standard.
- **Teal**: Primary accent colour; Tailwind classes `teal-600` / `teal-700`.
- **Navy**: Primary heading/dark background colour; Tailwind classes `slate-800` / `slate-900`.

---

## Requirements

### Requirement 1: Sticky Navigation Bar

**User Story:** As a visitor, I want a persistent navigation bar at the top of every page, so that I can quickly access key sections and actions regardless of scroll position.

#### Acceptance Criteria

1. THE Navbar SHALL render as a sticky element fixed to the top of the viewport on all screen sizes.
2. THE Navbar SHALL display the site name "Ask Your Doctor" as a text logo linked to the `/` route.
3. THE Navbar SHALL contain navigation links for "About Us" and "About QPL" as anchor elements (placeholder `#` hrefs are acceptable for this iteration).
4. THE Navbar SHALL contain a LanguageSelector displaying three options: "EN", "HI", and "MR".
5. THE Navbar SHALL contain a "Log In" button linking to `/login` (placeholder route).
6. THE Navbar SHALL contain a "Get Started" button styled as a filled teal CTA linking to `/select-role` (placeholder route).
7. WHEN the viewport width is below 768 px, THE Navbar SHALL collapse the navigation links and action buttons behind a hamburger menu icon.
8. WHEN the hamburger menu icon is activated, THE Navbar SHALL reveal the navigation links and action buttons in a dropdown or slide-down panel.
9. WHEN the hamburger menu is open and the user activates the hamburger icon again, THE Navbar SHALL close the menu panel.
10. THE Navbar SHALL apply a visible background (white or navy) so that page content scrolling beneath it remains readable.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to immediately understand what the platform does and how to get started, so that I can decide whether to sign up or log in.

#### Acceptance Criteria

1. THE HeroSection SHALL display the headline "Ask Your Doctor" in a prominent heading element.
2. THE HeroSection SHALL display a one-line value proposition: "Prepare better questions for your doctor's visit."
3. THE HeroSection SHALL contain a "Get Started" CTA button linking to `/select-role`.
4. THE HeroSection SHALL contain a "Log In" button linking to `/login`.
5. THE HeroSection SHALL contain a LanguageSelector as a secondary means of language switching.
6. THE HeroSection SHALL use a teal or navy colour scheme consistent with the platform palette.
7. WHEN the viewport width is between 320 px and 767 px, THE HeroSection SHALL stack all elements vertically and remain fully readable without horizontal scrolling.

---

### Requirement 3: Why This Matters Section

**User Story:** As a visitor, I want to understand the motivation behind this tool, so that I feel confident it addresses a real healthcare need.

#### Acceptance Criteria

1. THE AboutUsPage SHALL render a "Why This Matters" section below the HeroSection.
2. THE "Why This Matters" section SHALL include a short explanatory paragraph conveying that after receiving a diagnosis, patients often have unasked questions, and this tool helps them prepare those questions before their appointment.
3. THE "Why This Matters" section SHALL use a white or light-gray background to visually separate it from adjacent sections.

---

### Requirement 4: How It Works Section

**User Story:** As a prospective user, I want to see a simple walkthrough of the platform's process, so that I understand what to expect before signing up.

#### Acceptance Criteria

1. THE HowItWorksSection SHALL render exactly three steps in the following order: "Tell us about you", "Build your question list", "Take it to your doctor."
2. EACH step in the HowItWorksSection SHALL display a step number or icon alongside its label.
3. THE HowItWorksSection SHALL present the three steps in a horizontal row on viewports 768 px and above.
4. WHEN the viewport width is below 768 px, THE HowItWorksSection SHALL stack the three steps vertically.

---

### Requirement 5: For Patients and Caregivers Section

**User Story:** As a visitor who knows their role, I want clearly labelled entry points for patients and caregivers, so that I can navigate directly to the relevant sign-up flow.

#### Acceptance Criteria

1. THE RoleCardsSection SHALL render two cards side by side on viewports 768 px and above.
2. THE first card SHALL be labelled "I'm a Patient" and link to `/signup?role=patient`.
3. THE second card SHALL be labelled "I'm a Caregiver" and link to `/signup?role=caregiver`.
4. EACH card in the RoleCardsSection SHALL contain a short description of who should choose that role.
5. WHEN the viewport width is below 768 px, THE RoleCardsSection SHALL stack the two cards vertically.
6. EACH card SHALL have a visible hover state indicating it is interactive.

---

### Requirement 6: Resource Developed By (Credits) Section

**User Story:** As a visitor, I want to see who developed this resource, so that I can trust its academic credibility.

#### Acceptance Criteria

1. THE CreditsSection SHALL render a "Resource developed by" heading.
2. THE CreditsSection SHALL list the following contributors:
   - Dr Shweta Chawak — IIT Hyderabad / Jindal Global University
   - Dr Mahati Chittem — IIT Hyderabad
   - Prof Phyllis Butow — University of Sydney
   - Dr Haryana Dhillon — University of Sydney
3. THE CreditsSection SHALL display contributor names and affiliated institutions as plain text (no logos required).
4. THE CreditsSection SHALL appear above the Footer on the AboutUsPage.

---

### Requirement 7: Shared Footer Component

**User Story:** As a visitor on any page, I want a consistent footer with navigation and attribution, so that I always have access to key links and can see who built the platform.

#### Acceptance Criteria

1. THE Footer SHALL be a standalone React component located at `src/components/Footer.jsx`.
2. THE Footer SHALL be imported and rendered in `App.jsx` so that it appears on every route.
3. THE Footer SHALL contain navigation links for: "About Us", "About QPL", "Contact Us", "Privacy Policy", and "Terms of Use" (placeholder `#` hrefs are acceptable for this iteration).
4. THE Footer SHALL contain a CreditsSection listing the same four academic contributors as Requirement 6.
5. THE Footer SHALL contain a LanguageSelector mirroring the header selector (UI-only), styled to be legible against the dark footer background.
6. THE Footer SHALL display a copyright line: "© 2025 Ask Your Doctor. All rights reserved."
7. THE Footer SHALL use a dark background (navy / `slate-800` or `slate-900`) with white or light text for sufficient contrast.

---

### Requirement 8: Language Selector (UI-Only)

**User Story:** As a visitor, I want to see available language options in the navigation and footer, so that I know the platform intends to support multiple languages even if translation is not yet active.

#### Acceptance Criteria

1. THE LanguageSelector SHALL display three language option labels: "EN", "HI", and "MR".
2. WHEN a language option is activated by the user, THE LanguageSelector SHALL update the selected language state and visually highlight the newly selected option (e.g., underline, bold, or background change) based on that state.
3. THE LanguageSelector SHALL NOT trigger any page content translation in this iteration (UI state only).
4. THE LanguageSelector SHALL be keyboard-accessible: each option SHALL be reachable and activatable via keyboard.

---

### Requirement 9: Accessibility and Semantic HTML

**User Story:** As a user relying on assistive technology, I want the page to use correct semantic structure and sufficient colour contrast, so that I can navigate and understand all content without barriers.

#### Acceptance Criteria

1. THE AboutUsPage SHALL use semantic HTML5 landmark elements: `<header>` for the Navbar, `<main>` wrapping all page sections, `<section>` for each named section, and `<footer>` for the Footer.
2. EACH `<section>` on the AboutUsPage SHALL have an `aria-label` or `aria-labelledby` attribute identifying its purpose.
3. ALL interactive elements (buttons, links, LanguageSelector options) SHALL have visible focus indicators meeting WCAG 2.1 AA requirements.
4. THE colour contrast ratio between foreground text and background SHALL meet the WCAG 2.1 AA minimum of 4.5:1 for normal text and 3:1 for large text.
5. THE hamburger menu button SHALL include an `aria-label` describing its action and an `aria-expanded` attribute reflecting the current open/closed state.
6. ALL non-decorative images or icons SHALL have descriptive `alt` text or `aria-label` attributes.

---

### Requirement 10: Responsive Layout and Visual Design

**User Story:** As a visitor on any device, I want the page to display correctly on mobile, tablet, and desktop screens, so that I have an equivalent experience regardless of device.

#### Acceptance Criteria

1. THE AboutUsPage SHALL be fully responsive using a mobile-first approach with Tailwind CSS breakpoint utilities.
2. THE AboutUsPage SHALL use teal (`teal-600` / `teal-700`) for primary action buttons and accent elements.
3. THE AboutUsPage SHALL use navy (`slate-800` / `slate-900`) for headings and dark-background sections.
4. THE AboutUsPage SHALL use white backgrounds for primary content sections and `gray-50` for alternating sections.
5. WHEN rendered on a viewport width of 320 px or above, THE AboutUsPage SHALL display without horizontal scrolling or content overflow.
6. WHEN rendered on a viewport width below 768 px, THE Navbar SHALL maintain a minimum touch target size of 44 × 44 px for all interactive elements.
