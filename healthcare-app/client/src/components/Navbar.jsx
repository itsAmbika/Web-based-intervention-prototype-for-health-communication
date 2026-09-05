import { useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageSelector from './LanguageSelector'

/**
 * Navbar — Sticky top navigation bar.
 *
 * Renders the site name, desktop nav links, language selector,
 * Log In / Get Started CTAs, and a hamburger menu for mobile.
 *
 * Requirements: 1.1–1.10
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header role="banner" className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Site name / logo */}
          <Link
            to="/"
            className="text-xl font-bold text-slate-800 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Ask Your Doctor
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            <a
              href="#"
              className="text-sm text-slate-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-sm text-slate-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              About QPL
            </a>
          </nav>

          {/* Desktop right-side controls — hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector theme="light" />

            <Link
              to="/login"
              className="rounded border border-slate-800 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Log In
            </Link>

            <Link
              to="/select-role"
              className="rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger button — visible only on mobile */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded p-2 text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {menuOpen ? (
                /* X icon when menu is open */
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                /* Hamburger icon when menu is closed */
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — conditionally rendered */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            <a
              href="#"
              className="text-sm text-slate-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-sm text-slate-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              About QPL
            </a>
          </nav>

          <div className="flex items-center">
            <LanguageSelector theme="light" />
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="rounded border border-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Log In
            </Link>

            <Link
              to="/select-role"
              className="rounded bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
