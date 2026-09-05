import LanguageSelector from './LanguageSelector'

/**
 * Static data for academic contributors.
 * Also exported so Home.jsx can reuse it in the CreditsSection.
 */
export const CONTRIBUTORS = [
  { name: 'Dr Shweta Chawak', institution: 'IIT Hyderabad / Jindal Global University' },
  { name: 'Dr Mahati Chittem', institution: 'IIT Hyderabad' },
  { name: 'Prof Phyllis Butow', institution: 'University of Sydney' },
  { name: 'Dr Haryana Dhillon', institution: 'University of Sydney' },
]

const NAV_LINKS = [
  'About Us',
  'About QPL',
  'Contact Us',
  'Privacy Policy',
  'Terms of Use',
]

/**
 * Footer — shared footer rendered from App.jsx on every route.
 *
 * Requirements: 7.1–7.7
 */
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-8">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Credits block */}
        <section aria-label="Resource developed by" className="mb-8 text-center">
          <h2 className="text-base font-semibold text-gray-200 mb-3">Resource developed by</h2>
          <ul className="space-y-1">
            {CONTRIBUTORS.map((contributor) => (
              <li key={contributor.name} className="text-sm text-gray-300">
                <span className="font-medium text-white">{contributor.name}</span>
                {' — '}
                {contributor.institution}
              </li>
            ))}
          </ul>
        </section>

        {/* Language selector */}
        <div className="flex justify-center mb-6">
          <LanguageSelector theme="dark" />
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400">
          © 2025 Ask Your Doctor. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
