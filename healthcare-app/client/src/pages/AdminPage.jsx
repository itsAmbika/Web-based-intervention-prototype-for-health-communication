import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAdminPatients, getAdminCaregivers, getAdminQuestions, addQuestion, updateQuestion, toggleQuestion } from '../services/api'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d)) return '—'
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function LoadingRow({ cols }) {
  return (
    <tr>
      <td colSpan={cols} className="text-center py-10 text-gray-400">
        Loading...
      </td>
    </tr>
  )
}

function ErrorRow({ cols, message }) {
  return (
    <tr>
      <td colSpan={cols} className="text-center py-10 text-red-500">
        {message}
      </td>
    </tr>
  )
}

function EmptyRow({ cols, label }) {
  return (
    <tr>
      <td colSpan={cols} className="text-center py-10 text-gray-400">
        No {label} records found.
      </td>
    </tr>
  )
}

// ─── Patients Tab ────────────────────────────────────────────────────────────

function PatientsTab() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminPatients()
      .then((res) => setPatients(res.data))
      .catch(() => setError('Failed to load patient records.'))
      .finally(() => setLoading(false))
  }, [])

  const COLS = 9

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
            <th className="px-4 py-3 whitespace-nowrap">Patient ID</th>
            <th className="px-4 py-3 whitespace-nowrap">Name</th>
            <th className="px-4 py-3 whitespace-nowrap">Age</th>
            <th className="px-4 py-3 whitespace-nowrap">Gender</th>
            <th className="px-4 py-3 whitespace-nowrap">Aware of Diagnosis</th>
            <th className="px-4 py-3 whitespace-nowrap">Treatment Type</th>
            <th className="px-4 py-3 whitespace-nowrap">Consultation</th>
            <th className="px-4 py-3 whitespace-nowrap">Selected Questions</th>
            <th className="px-4 py-3 whitespace-nowrap">Date Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading && <LoadingRow cols={COLS} />}
          {!loading && error && <ErrorRow cols={COLS} message={error} />}
          {!loading && !error && patients.length === 0 && <EmptyRow cols={COLS} label="patient" />}
          {!loading && !error && patients.map((p) => (
            <tr key={p.patientId} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-blue-700 whitespace-nowrap">
                {p.patientId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.demographics?.name || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.demographics?.age ?? '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.demographics?.gender || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.medicalInfo?.awareOfDiagnosis === true
                  ? 'Yes'
                  : p.medicalInfo?.awareOfDiagnosis === false
                  ? 'No'
                  : '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.medicalInfo?.treatmentType || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {p.medicalInfo?.consultationType || '—'}
              </td>
              <td className="px-4 py-3 max-w-xs">
                {p.selectedQuestions && p.selectedQuestions.length > 0
                  ? p.selectedQuestions.join(', ')
                  : '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {formatDate(p.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Caregivers Tab ───────────────────────────────────────────────────────────

function CaregiversTab() {
  const [caregivers, setCaregivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminCaregivers()
      .then((res) => setCaregivers(res.data))
      .catch(() => setError('Failed to load caregiver records.'))
      .finally(() => setLoading(false))
  }, [])

  const COLS = 9

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
            <th className="px-4 py-3 whitespace-nowrap">Caregiver ID</th>
            <th className="px-4 py-3 whitespace-nowrap">Name</th>
            <th className="px-4 py-3 whitespace-nowrap">Age</th>
            <th className="px-4 py-3 whitespace-nowrap">Gender</th>
            <th className="px-4 py-3 whitespace-nowrap">Aware of Diagnosis</th>
            <th className="px-4 py-3 whitespace-nowrap">Treatment Type</th>
            <th className="px-4 py-3 whitespace-nowrap">Consultation</th>
            <th className="px-4 py-3 whitespace-nowrap">Selected Questions</th>
            <th className="px-4 py-3 whitespace-nowrap">Date Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading && <LoadingRow cols={COLS} />}
          {!loading && error && <ErrorRow cols={COLS} message={error} />}
          {!loading && !error && caregivers.length === 0 && <EmptyRow cols={COLS} label="caregiver" />}
          {!loading && !error && caregivers.map((c) => (
            <tr key={c.caregiverId} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono font-medium text-teal-700 whitespace-nowrap">
                {c.caregiverId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.demographics?.name || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.demographics?.age ?? '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.demographics?.gender || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.medicalInfo?.awareOfDiagnosis === true
                  ? 'Yes'
                  : c.medicalInfo?.awareOfDiagnosis === false
                  ? 'No'
                  : '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.medicalInfo?.treatmentType || '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.medicalInfo?.consultationType || '—'}
              </td>
              <td className="px-4 py-3 max-w-xs">
                {c.selectedQuestions && c.selectedQuestions.length > 0
                  ? c.selectedQuestions.join(', ')
                  : '—'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {formatDate(c.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Questions Tab ───────────────────────────────────────────────────────────

const AUDIENCE_LABELS = { patient: 'Patient', caregiver: 'Caregiver', both: 'Both' }
const AUDIENCE_OPTIONS = [
  { value: 'patient', label: 'Patient' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'both', label: 'Both' },
]

const EMPTY_FORM = { questionText: '', category: '', targetAudience: 'patient' }

function QuestionsTab() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 'add' | { id, questionText, category, targetAudience } | null
  const [formMode, setFormMode] = useState(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  const fetchQuestions = () => {
    setLoading(true)
    setError('')
    getAdminQuestions()
      .then((res) => setQuestions(res.data))
      .catch(() => setError('Failed to load questions.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const openAddForm = () => {
    setFormData(EMPTY_FORM)
    setFormError('')
    setFormMode('add')
  }

  const openEditForm = (q) => {
    setFormData({ questionText: q.questionText, category: q.category || '', targetAudience: q.targetAudience })
    setFormError('')
    setFormMode({ id: q._id, questionText: q.questionText, category: q.category, targetAudience: q.targetAudience })
  }

  const closeForm = () => {
    setFormMode(null)
    setFormData(EMPTY_FORM)
    setFormError('')
  }

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    if (!formData.questionText.trim()) {
      setFormError('Question text is required.')
      return
    }
    setSaving(true)
    setFormError('')
    try {
      if (formMode === 'add') {
        await addQuestion(formData)
      } else {
        await updateQuestion(formMode.id, formData)
      }
      closeForm()
      fetchQuestions()
    } catch {
      setFormError('Failed to save question. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (id) => {
    setTogglingId(id)
    try {
      await toggleQuestion(id)
      fetchQuestions()
    } catch {
      // silently ignore — list will stay as-is
    } finally {
      setTogglingId(null)
    }
  }

  const isEditing = formMode && formMode !== 'add'

  return (
    <div className="p-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-700">Question Manager</h2>
        {formMode === null && (
          <button
            onClick={openAddForm}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Question
          </button>
        )}
      </div>

      {/* Inline form */}
      {formMode !== null && (
        <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            {formMode === 'add' ? 'New Question' : 'Edit Question'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Question Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="questionText"
                value={formData.questionText}
                onChange={handleFormChange}
                placeholder="Enter question text…"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                placeholder="e.g. Treatment, Support…"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Target Audience</label>
              <select
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formError && <p className="mt-3 text-xs text-red-500">{formError}</p>}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={closeForm}
              disabled={saving}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
              <th className="px-4 py-3">Question Text</th>
              <th className="px-4 py-3 whitespace-nowrap">Category</th>
              <th className="px-4 py-3 whitespace-nowrap">For</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">Loading…</td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-red-500">{error}</td>
              </tr>
            )}
            {!loading && !error && questions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">No questions found.</td>
              </tr>
            )}
            {!loading && !error && questions.map((q) => {
              const isEditingThis = isEditing && formMode.id === q._id
              return (
                <tr
                  key={q._id}
                  className={`hover:bg-gray-50 transition-colors ${isEditingThis ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3 max-w-sm">{q.questionText}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{q.category || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {AUDIENCE_LABELS[q.targetAudience] || q.targetAudience}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {q.isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditForm(q)}
                        disabled={formMode !== null || togglingId === q._id}
                        className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-40 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(q._id)}
                        disabled={formMode !== null || togglingId === q._id}
                        className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors disabled:opacity-40 ${
                          q.isActive
                            ? 'text-red-600 border-red-200 hover:bg-red-50'
                            : 'text-green-600 border-green-200 hover:bg-green-50'
                        }`}
                      >
                        {togglingId === q._id ? '…' : q.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── AdminPage ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('patients') // 'patients' | 'caregivers' | 'questions'

  const tabs = [
    { id: 'patients', label: 'Patients' },
    { id: 'caregivers', label: 'Caregivers' },
    { id: 'questions', label: 'Questions' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">View and manage all submitted records</p>
          </div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-white border border-b-white border-gray-200 text-blue-700 -mb-px'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === 'patients' && <PatientsTab />}
          {activeTab === 'caregivers' && <CaregiversTab />}
          {activeTab === 'questions' && <QuestionsTab />}
        </div>
      </div>
    </div>
  )
}
