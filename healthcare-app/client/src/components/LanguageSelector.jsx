import { useState } from 'react'

const LANGUAGES = ['EN', 'HI', 'MR']

/**
 * LanguageSelector — UI-only language toggle.
 *
 * Props:
 *   theme: 'light' | 'dark'  (default: 'light')
 *
 * Manages its own `selected` state (default 'EN'). No page content
 * translation is performed — this is a UI-only indicator.
 */
export default function LanguageSelector({ theme = 'light' }) {
  const [selected, setSelected] = useState('EN')

  return (
    <div className="flex items-center gap-1" aria-label="Language selector">
      {LANGUAGES.map((lang) => {
        const isSelected = selected === lang

        const highlightClass =
          isSelected
            ? theme === 'dark'
              ? 'bg-teal-700 text-white'
              : 'font-bold underline'
            : ''

        const baseClass =
          theme === 'dark'
            ? 'px-2 py-1 rounded text-sm text-gray-200 hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors'
            : 'px-2 py-1 rounded text-sm text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors'

        return (
          <button
            key={lang}
            type="button"
            onClick={() => setSelected(lang)}
            className={`${baseClass} ${highlightClass}`}
            aria-pressed={isSelected}
            aria-label={`Select language: ${lang}`}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}
