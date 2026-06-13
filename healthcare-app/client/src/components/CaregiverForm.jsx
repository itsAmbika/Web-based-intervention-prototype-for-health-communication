import { useState } from 'react'

const initialFormData = {
  name: '',
  gender: '',
  age: '',
  languageKnown: '',
  educationBackground: '',
  occupationBackground: '',
  relationshipWithPatient: '',
  awareOfDiagnosis: '',
  timeSinceDiagnosis: '',
  timeSinceTreatmentStarted: '',
  treatmentType: '',
  consultationType: '',
}

export default function CaregiverForm({ onReady }) {
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('Name is required.')
      return
    }

    const payload = {
      demographics: {
        name: formData.name,
        gender: formData.gender,
        age: formData.age ? Number(formData.age) : undefined,
        languageKnown: formData.languageKnown,
        educationBackground: formData.educationBackground,
        occupationBackground: formData.occupationBackground,
        relationshipWithPatient: formData.relationshipWithPatient,
      },
      medicalInfo: {
        awareOfDiagnosis: formData.awareOfDiagnosis === 'yes',
        timeSinceDiagnosis: formData.timeSinceDiagnosis,
        timeSinceTreatmentStarted: formData.timeSinceTreatmentStarted,
        treatmentType: formData.treatmentType,
        consultationType: formData.consultationType,
      },
    }

    onReady(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Demographics Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
          Demographics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-name">
              Name or Initials <span className="text-red-500">*</span>
            </label>
            <input id="cg-name" type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="e.g. J. Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-gender">Gender</label>
            <select id="cg-gender" name="gender" value={formData.gender} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-age">Age</label>
            <input id="cg-age" type="number" name="age" value={formData.age} onChange={handleChange}
              min="0" max="120" placeholder="e.g. 45"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-languageKnown">Language Known</label>
            <input id="cg-languageKnown" type="text" name="languageKnown" value={formData.languageKnown} onChange={handleChange}
              placeholder="e.g. English, Hindi"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-educationBackground">Education Background</label>
            <input id="cg-educationBackground" type="text" name="educationBackground" value={formData.educationBackground} onChange={handleChange}
              placeholder="e.g. Bachelor's degree"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-occupationBackground">Occupation Background</label>
            <input id="cg-occupationBackground" type="text" name="occupationBackground" value={formData.occupationBackground} onChange={handleChange}
              placeholder="e.g. Teacher"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-relationshipWithPatient">Relationship with Patient</label>
            <input id="cg-relationshipWithPatient" type="text" name="relationshipWithPatient" value={formData.relationshipWithPatient} onChange={handleChange}
              placeholder="e.g. Spouse, Child, Parent"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
        </div>
      </div>

      {/* Medical Information Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
          Medical Information
        </h2>
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Are you aware of your loved one's diagnosis?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="awareOfDiagnosis" value="yes"
                  checked={formData.awareOfDiagnosis === 'yes'} onChange={handleChange} className="accent-teal-500" />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="awareOfDiagnosis" value="no"
                  checked={formData.awareOfDiagnosis === 'no'} onChange={handleChange} className="accent-teal-500" />
                No
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-timeSinceDiagnosis">Time Since Diagnosis</label>
              <input id="cg-timeSinceDiagnosis" type="text" name="timeSinceDiagnosis" value={formData.timeSinceDiagnosis} onChange={handleChange}
                placeholder="e.g. 6 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-timeSinceTreatmentStarted">Time Since Treatment Started</label>
              <input id="cg-timeSinceTreatmentStarted" type="text" name="timeSinceTreatmentStarted" value={formData.timeSinceTreatmentStarted} onChange={handleChange}
                placeholder="e.g. 3 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-treatmentType">Type of Treatment</label>
              <input id="cg-treatmentType" type="text" name="treatmentType" value={formData.treatmentType} onChange={handleChange}
                placeholder="e.g. Chemotherapy"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="cg-consultationType">Type of Consultation</label>
              <input id="cg-consultationType" type="text" name="consultationType" value={formData.consultationType} onChange={handleChange}
                placeholder="e.g. Oncology"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <div className="pt-2">
        <button type="submit"
          className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700">
          Continue to Questions
        </button>
      </div>
    </form>
  )
}
