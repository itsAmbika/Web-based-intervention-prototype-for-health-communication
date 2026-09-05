import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'

/**
 * Unit tests for the Home (AboutUsPage) — Hero and Why This Matters sections.
 *
 * Validates: Requirements 2.1–2.5, 3.1, 3.2, 9.1
 */

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

describe('Home — HeroSection', () => {
  // Requirement 2.1 — headline
  it('renders <h1> with "Ask Your Doctor"', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: /ask your doctor/i })).toBeInTheDocument()
  })

  // Requirement 2.2 — value proposition
  it('renders the value proposition paragraph', () => {
    renderHome()
    expect(
      screen.getByText(/prepare better questions for your doctor's visit\./i)
    ).toBeInTheDocument()
  })

  // Requirement 2.3 — "Get Started" links to /select-role
  it('renders "Get Started" link pointing to /select-role', () => {
    renderHome()
    const links = screen.getAllByRole('link', { name: /get started/i })
    expect(links.length).toBeGreaterThan(0)
    const hasCorrectHref = links.some((link) => link.getAttribute('href') === '/select-role')
    expect(hasCorrectHref).toBe(true)
  })

  // Requirement 2.4 — "Log In" links to /login
  it('renders "Log In" link pointing to /login', () => {
    renderHome()
    const links = screen.getAllByRole('link', { name: /log in/i })
    expect(links.length).toBeGreaterThan(0)
    const hasCorrectHref = links.some((link) => link.getAttribute('href') === '/login')
    expect(hasCorrectHref).toBe(true)
  })

  // Requirement 2.5 — LanguageSelector secondary placement
  it('renders a LanguageSelector in the Hero section', () => {
    renderHome()
    // LanguageSelector renders buttons labelled "EN", "HI", "MR"
    expect(screen.getByRole('button', { name: /select language: EN/i })).toBeInTheDocument()
  })
})

describe('Home — WhyThisMattersSection', () => {
  // Requirement 3.1 — section is present
  it('renders <section aria-label="Why this matters">', () => {
    renderHome()
    const section = screen.getByRole('region', { name: /why this matters/i })
    expect(section).toBeInTheDocument()
  })

  // Requirement 3.2 — explanatory paragraph exists inside the section
  it('section contains explanatory text about unasked questions', () => {
    renderHome()
    const section = screen.getByRole('region', { name: /why this matters/i })
    expect(section.textContent).toMatch(/diagnosis/i)
    expect(section.textContent).toMatch(/questions/i)
  })
})

describe('Home — semantic structure', () => {
  // Requirement 9.1 — <main> wraps all content
  it('renders a <main> element as the root wrapper', () => {
    renderHome()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  // Requirement 9.2 — every <section> has an aria-label
  it('all <section> elements have a non-empty aria-label', () => {
    const { container } = renderHome()
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
    sections.forEach((section) => {
      const label = section.getAttribute('aria-label') || section.getAttribute('aria-labelledby')
      expect(label).toBeTruthy()
    })
  })
})

/**
 * Unit tests for the Home (AboutUsPage) — HowItWorks and RoleCards sections.
 *
 * Validates: Requirements 4.1, 4.2, 5.2, 5.3, 5.4, 9.2
 */

describe('Home — HowItWorksSection', () => {
  // Property 1: HowItWorksSection renders all steps in order (Req 4.1)
  it('renders the three step labels in correct DOM order', () => {
    const { container } = renderHome()

    const stepLabels = ['Tell us about you', 'Build your question list', 'Take it to your doctor']
    const allText = container.textContent

    let lastIndex = -1
    stepLabels.forEach((label) => {
      const idx = allText.indexOf(label)
      expect(idx).toBeGreaterThan(-1)
      expect(idx).toBeGreaterThan(lastIndex)
      lastIndex = idx
    })
  })

  // Property 1: each step has a numeric indicator (Req 4.2)
  it('renders numeric step indicators 1, 2, 3 in the DOM', () => {
    renderHome()

    const section = screen.getByRole('region', { name: /how it works/i })
    // Each step number badge is a <span> with the digit text
    ;[1, 2, 3].forEach((num) => {
      const badges = Array.from(section.querySelectorAll('span')).filter(
        (el) => el.textContent.trim() === String(num)
      )
      expect(badges.length).toBeGreaterThan(0)
    })
  })
})

describe('Home — RoleCardsSection', () => {
  // Requirement 5.2 — patient card links to /signup?role=patient
  it('renders "I\'m a Patient" card linking to /signup?role=patient', () => {
    renderHome()

    const patientLink = screen.getByRole('link', { name: /i'm a patient/i })
    expect(patientLink).toBeInTheDocument()
    expect(patientLink.getAttribute('href')).toBe('/signup?role=patient')
  })

  // Requirement 5.3 — caregiver card links to /signup?role=caregiver
  it('renders "I\'m a Caregiver" card linking to /signup?role=caregiver', () => {
    renderHome()

    const caregiverLink = screen.getByRole('link', { name: /i'm a caregiver/i })
    expect(caregiverLink).toBeInTheDocument()
    expect(caregiverLink.getAttribute('href')).toBe('/signup?role=caregiver')
  })

  // Property 2: each role card contains a non-empty description (Req 5.4)
  it('each role card contains a non-empty description', () => {
    renderHome()

    const section = screen.getByRole('region', { name: /for patients and caregivers/i })
    const cardLinks = section.querySelectorAll('a')

    expect(cardLinks.length).toBe(2)
    cardLinks.forEach((card) => {
      // Each card should contain a <p> with non-empty description text
      const paragraphs = card.querySelectorAll('p')
      const hasDescription = Array.from(paragraphs).some(
        (p) => p.textContent.trim().length > 0
      )
      expect(hasDescription).toBe(true)
    })
  })
})

describe('Home — HowItWorks and RoleCards aria-labels (Property 8)', () => {
  // Requirement 9.2 — both new sections have aria-label
  it('HowItWorksSection has a non-empty aria-label', () => {
    renderHome()

    const section = screen.getByRole('region', { name: /how it works/i })
    const label = section.getAttribute('aria-label') || section.getAttribute('aria-labelledby')
    expect(label).toBeTruthy()
  })

  it('RoleCardsSection has a non-empty aria-label', () => {
    renderHome()

    const section = screen.getByRole('region', { name: /for patients and caregivers/i })
    const label = section.getAttribute('aria-label') || section.getAttribute('aria-labelledby')
    expect(label).toBeTruthy()
  })
})

/**
 * Unit tests for the Home (AboutUsPage) — Credits section and accessibility.
 *
 * Validates: Requirements 6.1, 6.2, 9.2, 9.6
 */

describe('Home — CreditsSection (Property 3)', () => {
  // Property 3: CreditsSection lists all contributors (Req 6.2)
  it('renders all four contributor names', () => {
    renderHome()

    expect(screen.getByText(/Dr Shweta Chawak/)).toBeInTheDocument()
    expect(screen.getByText(/Dr Mahati Chittem/)).toBeInTheDocument()
    expect(screen.getByText(/Prof Phyllis Butow/)).toBeInTheDocument()
    expect(screen.getByText(/Dr Haryana Dhillon/)).toBeInTheDocument()
  })

  // Property 3: each contributor is paired with their institution
  it('renders all four institution names alongside their contributors', () => {
    const { container } = renderHome()

    const section = screen.getByRole('region', { name: /resource developed by/i })

    expect(section.textContent).toMatch(/IIT Hyderabad \/ Jindal Global University/)
    expect(section.textContent).toMatch(/IIT Hyderabad/)
    expect(section.textContent).toMatch(/University of Sydney/)

    // Verify exact pairings via list items
    const listItems = section.querySelectorAll('li')
    expect(listItems.length).toBe(4)

    const pairs = [
      { name: 'Dr Shweta Chawak', institution: 'IIT Hyderabad / Jindal Global University' },
      { name: 'Dr Mahati Chittem', institution: 'IIT Hyderabad' },
      { name: 'Prof Phyllis Butow', institution: 'University of Sydney' },
      { name: 'Dr Haryana Dhillon', institution: 'University of Sydney' },
    ]

    pairs.forEach(({ name, institution }) => {
      const match = Array.from(listItems).find(
        (li) => li.textContent.includes(name) && li.textContent.includes(institution)
      )
      expect(match).toBeTruthy()
    })
  })
})

describe('Home — section aria-labels (Property 8)', () => {
  // Property 8: All page sections carry accessible labels (Req 9.2)
  it('every <section> has a non-empty aria-label or aria-labelledby', () => {
    const { container } = renderHome()

    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)

    sections.forEach((section) => {
      const label = section.getAttribute('aria-label') || section.getAttribute('aria-labelledby')
      expect(label).toBeTruthy()
      expect(label.trim().length).toBeGreaterThan(0)
    })
  })
})

describe('Home — image alt attributes (Property 9)', () => {
  // Property 9: All non-decorative images carry accessible labels (Req 9.6)
  it('all rendered <img> elements have non-empty alt attributes, or there are none', () => {
    const { container } = renderHome()

    const images = container.querySelectorAll('img')

    if (images.length === 0) {
      // No images on this page — acceptable per spec (static text-only page)
      expect(images.length).toBe(0)
    } else {
      images.forEach((img) => {
        const alt = img.getAttribute('alt')
        expect(alt).not.toBeNull()
        expect(alt.trim().length).toBeGreaterThan(0)
      })
    }
  })
})
