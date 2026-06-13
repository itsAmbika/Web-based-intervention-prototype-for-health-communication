import { useState } from 'react'

const MAX_SELECTIONS = 3

export default function QuestionSelector({ questions, onComplete, submitting = false }) {
  const [selected, setSelected] = useState([])
  const [customQuestion, setCustomQuestion] = useState('')

  const handleToggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((q) => q !== id)
      }
      if (prev.length >= MAX_SELECTIONS) return prev
      return [...prev, id]
    })
  }

  const handleSubmit = () => {
    onComplete({ selectedQuestions: selected, customQuestion: customQuestion.trim() })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Select Your Questions</h2>
        <span className="text-sm text-gray-500 font-medium">
          {selected.length} of {MAX_SELECTIONS} selected
        </span>
      </div>

      <p className="text-sm text-gray-500">
        Choose up to {MAX_SELECTIONS} questions you would like to discuss.
      </p>

      <div className="space-y-3">
        {questions.map((q) => {
          const isChecked = selected.includes(q._id)
          const isDisabled = !isChecked && selected.length >= MAX_SELECTIONS

          return (
            <label
              key={q._id}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                isChecked
                  ? 'border-blue-400 bg-blue-50'
                  : isDisabled
                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => handleToggle(q._id)}
                className="mt-0.5 accent-blue-500 w-4 h-4 flex-shrink-0"
                aria-label={q.questionText}
              />
              <div>
                <p className="text-sm text-gray-800">{q.questionText}</p>
                {q.category && (
                  <span className="text-xs text-gray-400 mt-0.5 inline-block">{q.category}</span>
                )}
              </div>
            </label>
          )
        })}
      </div>

      {/* Custom Question */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="customQuestion">
          Add your own question (optional)
        </label>
        <input
          id="customQuestion"
          type="text"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Submit Selections'}
      </button>
    </div>
  )
}
