import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

/**
 * Validates: Requirements 1.2, 1.5, 1.6, 1.8, 1.9, 9.5
 */

describe('Navbar', () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

  // Requirement 1.2 — site name renders with link to /
  it('renders the site name "Ask Your Doctor" linked to /', () => {
    renderNavbar()
    const siteNameLink = screen.getByRole('link', { name: /ask your doctor/i })
    expect(siteNameLink).toBeInTheDocument()
    expect(siteNameLink).toHaveAttribute('href', '/')
  })

  // Requirement 1.5 — "Log In" links to /login
  it('renders a "Log In" link pointing to /login', () => {
    renderNavbar()
    // There may be multiple "Log In" links (desktop + mobile hidden initially);
    // getAllByRole and check at least one with the correct href.
    const loginLinks = screen.getAllByRole('link', { name: /log in/i })
    expect(loginLinks.length).toBeGreaterThan(0)
    // At least one of them should point to /login
    const hasCorrectHref = loginLinks.some((link) => link.getAttribute('href') === '/login')
    expect(hasCorrectHref).toBe(true)
  })

  // Requirement 1.6 — "Get Started" links to /select-role
  it('renders a "Get Started" link pointing to /select-role', () => {
    renderNavbar()
    const getStartedLinks = screen.getAllByRole('link', { name: /get started/i })
    expect(getStartedLinks.length).toBeGreaterThan(0)
    const hasCorrectHref = getStartedLinks.some(
      (link) => link.getAttribute('href') === '/select-role'
    )
    expect(hasCorrectHref).toBe(true)
  })

  // Requirement 9.5 — hamburger button has aria-expanded="false" initially
  it('hamburger button has aria-expanded="false" initially', () => {
    renderNavbar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    expect(hamburger).toBeInTheDocument()
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  // Requirement 1.8, 1.9, 9.5 — clicking hamburger toggles aria-expanded
  it('clicking hamburger sets aria-expanded to true; clicking again sets it back to false', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const hamburger = screen.getByRole('button', { name: /open menu/i })

    // Initially closed
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')

    // First click — opens menu
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // Second click — closes menu
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  // Requirement 1.8 — mobile menu panel is revealed when hamburger is activated
  it('shows mobile nav links after hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderNavbar()

    // Mobile menu not visible initially
    expect(screen.queryByLabelText(/mobile navigation/i)).not.toBeInTheDocument()

    // Click hamburger
    await user.click(screen.getByRole('button', { name: /open menu/i }))

    // Mobile nav should now be visible
    expect(screen.getByLabelText(/mobile navigation/i)).toBeInTheDocument()
  })

  // Requirement 1.10 — Navbar has a header element with role="banner"
  it('renders a <header> with role="banner"', () => {
    renderNavbar()
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
