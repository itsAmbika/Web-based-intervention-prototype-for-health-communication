import { render, screen } from '@testing-library/react'
import App from '../App'

/**
 * Smoke tests for App wiring — verifies Navbar and Footer
 * are rendered on every route via App.jsx.
 *
 * Validates: Requirements 1.1, 7.2
 */
describe('App wiring smoke tests', () => {
  it('renders the Navbar with the site name link', () => {
    render(<App />)
    // Navbar renders "Ask Your Doctor" as a link to "/"
    const siteNameLinks = screen.getAllByRole('link', { name: /ask your doctor/i })
    expect(siteNameLinks.length).toBeGreaterThan(0)
  })

  it('renders the Footer with copyright text', () => {
    render(<App />)
    expect(
      screen.getByText(/© 2025 Ask Your Doctor/i)
    ).toBeInTheDocument()
  })
})
