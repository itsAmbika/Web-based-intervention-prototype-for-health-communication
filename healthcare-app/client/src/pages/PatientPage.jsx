import { useState } from 'react'
import { Link } from 'react-router-dom'
import PatientForm from '../components/PatientForm'
import QuestionSelector from '../components/QuestionSelector'
import { getPatientQuestions, registerPatient } from '../services/api'

export default function PatientPage() {
  const [step, setStep] = useState('form') // 'form' | 'questions' | 'done'
  const [patientId, setPatientId] = useState('')
  const [questions, setQuestions] = useState([])
  const [pendingFormData, setPendingFormData] = useState(null)
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [questionError, setQuestionError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Step 1: form collected — fetch questions, hold form data for later
  const handleFormReady = async (formPayload) => {
    setPendingFormData(formPayload)
    setLoadingQuestions(true)
    setQuestionError('')
    try {
      const res = await getPatientQuestions()
      setQuestions(res.data)
      setStep('questions')
    } catch {
      setQuestionError('Failed to load questions. Please try again.')
    } finally {
      setLoadingQuestions(false)
    }
  }

  // Step 2: questions selected — submit everything together
  const handleQuestionsComplete = async ({ selectedQuestions, customQuestion }) => {
    setSubmitError('')
    setSubmitting(true)
    try {
      const payload = {
        ...pendingFormData,
        selectedQuestions,
        customQuestion: customQuestion || '',
      }
      const response = await registerPatient(payload)
      setPatientId(response.data.patientId)
      setStep('done')
    } catch (err) {
      setSubmitError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 'form' && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient Registration</h1>
              <PatientForm onReady={handleFormReady} />
            </>
          )}

          {step === 'questions' && loadingQuestions && (
            <p className="text-gray-500 text-center py-12">Loading questions...</p>
          )}

          {step === 'questions' && questionError && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{questionError}</p>
              <button
                onClick={() => handleFormReady(pendingFormData)}
                className="text-sm text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {step === 'questions' && !loadingQuestions && !questionError && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Your Questions</h1>
              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
                  {submitError}
                </p>
              )}
              <QuestionSelector
                questions={questions}
                onComplete={handleQuestionsComplete}
                submitting={submitting}
              />
            </>
          )}

          {step === 'done' && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✓</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You</h1>
              <p className="text-gray-500 mb-6">Your responses have been recorded.</p>
              <div className="inline-block bg-blue-50 border border-blue-200 rounded-xl px-8 py-4">
                <p className="text-sm text-gray-500 mb-1">Your Patient ID</p>
                <p className="text-3xl font-bold text-blue-700 tracking-wide">{patientId}</p>
              </div>
              <div className="mt-8">
                <Link to="/" className="text-sm text-blue-600 hover:underline">Return to Home</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
