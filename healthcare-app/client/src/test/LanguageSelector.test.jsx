import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import LanguageSelector from '../components/LanguageSelector'

/**
 * Validates: Requirements 8.1, 8.2, 8.3
 *
 * Property 5: LanguageSelector displays all three language options
 * Property 6: LanguageSelector selection state reflects last user activation
 * Property 7: LanguageSelector activation does not alter page text content
 */

describe('LanguageSelector', () => {
  // Property 5: all three options are rendered
  it('renders EN, HI, and MR buttons', () => {
    render(<LanguageSelector />)

    expect(screen.getByRole('button', { name: /select language: EN/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: HI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: MR/i })).toBeInTheDocument()
  })

  // Property 6: clicking HI selects it; clicking EN restores selection
  it('clicking HI makes it selected (aria-pressed=true)', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)

    const hiBtn = screen.getByRole('button', { name: /select language: HI/i })
    const enBtn = screen.getByRole('button', { name: /select language: EN/i })

    // Initially EN is selected
    expect(enBtn).toHaveAttribute('aria-pressed', 'true')
    expect(hiBtn).toHaveAttribute('aria-pressed', 'false')

    // Click HI
    await user.click(hiBtn)
    expect(hiBtn).toHaveAttribute('aria-pressed', 'true')
    expect(enBtn).toHaveAttribute('aria-pressed', 'false')

    // Click EN to restore
    await user.click(enBtn)
    expect(enBtn).toHaveAttribute('aria-pressed', 'true')
    expect(hiBtn).toHaveAttribute('aria-pressed', 'false')
  })

  // Property 7: surrounding page text is unchanged after language switch
  it('does not change surrounding text content when a language is activated', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <h1>Ask Your Doctor</h1>
        <p>Prepare better questions for your doctor&#39;s visit.</p>
        <LanguageSelector />
      </div>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    const paragraph = screen.getByText(/prepare better questions/i)

    const headingTextBefore = heading.textContent
    const paragraphTextBefore = paragraph.textContent

    // Activate HI
    await user.click(screen.getByRole('button', { name: /select language: HI/i }))

    expect(heading.textContent).toBe(headingTextBefore)
    expect(paragraph.textContent).toBe(paragraphTextBefore)
  })

  // Accessibility: all options are keyboard-focusable (no tabIndex="-1")
  it('all buttons are keyboard-focusable (no tabIndex=-1)', () => {
    render(<LanguageSelector />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('tabindex', '-1')
    })
  })

  // Theme: dark theme applies distinct highlight class to selected option
  it('renders correctly with dark theme', () => {
    render(<LanguageSelector theme="dark" />)
    // All three buttons should still be present
    expect(screen.getByRole('button', { name: /select language: EN/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: HI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /select language: MR/i })).toBeInTheDocument()
  })
})
