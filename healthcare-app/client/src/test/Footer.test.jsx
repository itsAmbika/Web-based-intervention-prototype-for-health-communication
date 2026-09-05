import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../components/Footer'

/**
 * Validates: Requirements 7.3, 7.4, 7.6
 *
 * Property 3: CreditsSection lists all contributors — Footer instance
 * Property 4: Footer contains all required navigation links
 */

describe('Footer', () => {
  // Property 4: all five nav link labels are present
  it('renders all five navigation link labels', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About QPL' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument()
  })

  // Property 3: all four contributor names are rendered
  it('renders all four contributor names', () => {
    render(<Footer />)

    expect(screen.getByText('Dr Shweta Chawak')).toBeInTheDocument()
    expect(screen.getByText('Dr Mahati Chittem')).toBeInTheDocument()
    expect(screen.getByText('Prof Phyllis Butow')).toBeInTheDocument()
    expect(screen.getByText('Dr Haryana Dhillon')).toBeInTheDocument()
  })

  // Property 3: all four contributor institutions are rendered
  it('renders all four contributor institutions', () => {
    render(<Footer />)

    expect(screen.getByText(/IIT Hyderabad \/ Jindal Global University/)).toBeInTheDocument()
    // "IIT Hyderabad" alone appears in multiple entries; verify separately
    const iitEntries = screen.getAllByText(/IIT Hyderabad/)
    expect(iitEntries.length).toBeGreaterThanOrEqual(2)

    expect(screen.getAllByText(/University of Sydney/).length).toBeGreaterThanOrEqual(2)
  })

  // Requirement 7.6: copyright text is rendered
  it('renders the copyright line', () => {
    render(<Footer />)

    expect(
      screen.getByText(/© 2025 Ask Your Doctor\. All rights reserved\./i)
    ).toBeInTheDocument()
  })

  // Requirement 7.5: LanguageSelector is present (EN, HI, MR buttons)
  it('contains a LanguageSelector with EN, HI, and MR buttons', () => {
    render(<Footer />)

    expect(screen.getByRole('button', { name: /select language: EN/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: HI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: MR/i })).toBeInTheDocument()
  })

  // Structural: root element is a <footer>
  it('uses <footer> as the root element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
