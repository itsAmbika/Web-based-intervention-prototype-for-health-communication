import { Link } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'
import { CONTRIBUTORS } from '../components/Footer'

// ---------------------------------------------------------------------------
// Static content — kept as top-level constants so Tasks 7 and 8 can append
// their own (HOW_IT_WORKS_STEPS, ROLE_CARDS, CONTRIBUTORS) without touching
// the section markup.
// ---------------------------------------------------------------------------

const HOW_IT_WORKS_STEPS = [
  { id: 1, label: 'Tell us about you' },
  { id: 2, label: 'Build your question list' },
  { id: 3, label: 'Take it to your doctor' },
]

const ROLE_CARDS = [
  {
    id: 'patient',
    label: "I'm a Patient",
    description: 'Get a personalised list of questions to ask your specialist.',
    href: '/signup?role=patient',
  },
  {
    id: 'caregiver',
    label: "I'm a Caregiver",
    description: 'Support your loved one by preparing questions on their behalf.',
    href: '/signup?role=caregiver',
  },
]

// CONTRIBUTORS is imported from Footer.jsx to avoid duplication (Task 8)

// ---------------------------------------------------------------------------
// AboutUsPage (exported as default from Home.jsx per spec requirements)
// ---------------------------------------------------------------------------

/**
 * AboutUsPage — full landing page at the '/' route.
 *
 * Sections rendered in order:
 *   1. HeroSection            ← Task 6
 *   2. WhyThisMattersSection  ← Task 6
 *   3. HowItWorksSection      ← Task 7 (placeholder comment below)
 *   4. RoleCardsSection       ← Task 7 (placeholder comment below)
 *   5. CreditsSection         ← Task 8 (placeholder comment below)
 *
 * Requirements: 2.1–2.7, 3.1–3.3, 9.1, 9.2, 10.1–10.5
 */
export default function Home() {
  return (
    <main id="main-content">

      {/* ================================================================
          SECTION 1 — HeroSection
          Requirements: 2.1–2.7, 9.2, 10.1–10.5
          ================================================================ */}
      <section
        aria-label="Hero"
        className="bg-gradient-to-br from-teal-600 to-slate-800 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Requirement 2.1 — headline */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ask Your Doctor
          </h1>

          {/* Requirement 2.2 — value proposition */}
          <p className="mt-4 text-lg text-teal-100 sm:text-xl">
            Prepare better questions for your doctor's visit.
          </p>

          {/* Requirements 2.3, 2.4 — CTA buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/select-role"
              className="w-full rounded bg-teal-600 border-2 border-white px-6 py-3 text-center text-base font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 sm:w-auto"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="w-full rounded border-2 border-white px-6 py-3 text-center text-base font-semibold text-white hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600 sm:w-auto"
            >
              Log In
            </Link>
          </div>

          {/* Requirement 2.5 — LanguageSelector secondary placement */}
          <div className="mt-6 flex justify-center">
            <LanguageSelector theme="light" />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — WhyThisMattersSection
          Requirements: 3.1–3.3, 9.2
          ================================================================ */}
      <section
        aria-label="Why this matters"
        className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Requirement 3.1 — section heading */}
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Why This Matters
          </h2>

          {/* Requirement 3.2 — explanatory paragraph */}
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            After receiving a diagnosis, patients often leave appointments with unasked
            questions. These questions can affect their understanding of their condition,
            treatment, and options. Ask Your Doctor helps you prepare those questions in
            advance, so you can make the most of every visit.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — HowItWorksSection
          Requirements: 4.1–4.4, 9.2
          ================================================================ */}
      <section
        aria-label="How it works"
        className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            How It Works
          </h2>

          {/* Requirements 4.1–4.3 — steps in order, horizontal on md+ */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                {/* Requirement 4.2 — step number badge */}
                <span
                  aria-label={`Step ${step.id}`}
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white"
                >
                  {step.id}
                </span>
                <p className="text-base font-medium text-slate-700">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — RoleCardsSection
          Requirements: 5.1–5.6, 9.2
          ================================================================ */}
      <section
        aria-label="For patients and caregivers"
        className="bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            Who Is This For?
          </h2>

          {/* Requirements 5.1, 5.5 — side-by-side on md+, stacked on mobile */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {ROLE_CARDS.map((card) => (
              <Link
                key={card.id}
                to={card.href}
                className="flex flex-col rounded-lg border-2 border-gray-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg hover:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 md:flex-1"
              >
                {/* Requirement 5.2 / 5.3 — card label */}
                <h3 className="text-xl font-bold text-slate-800">{card.label}</h3>

                {/* Requirement 5.4 — card description */}
                <p className="mt-3 text-base text-slate-600">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — CreditsSection
          Requirements: 6.1–6.4, 9.2
          ================================================================ */}
      <section
        aria-label="Resource developed by"
        className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Requirement 6.1 — section heading */}
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Resource developed by
          </h2>

          {/* Requirement 6.2 — contributor list */}
          <ul className="mt-6 space-y-2">
            {CONTRIBUTORS.map((contributor) => (
              <li key={contributor.name} className="text-base text-slate-600">
                <span className="font-medium text-slate-800">{contributor.name}</span>
                {' — '}
                {contributor.institution}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}
