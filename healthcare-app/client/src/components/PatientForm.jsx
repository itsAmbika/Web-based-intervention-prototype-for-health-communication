import { useState } from 'react'

const initialFormData = {
  name: '',
  gender: '',
  age: '',
  languageKnown: '',
  educationBackground: '',
  occupationBackground: '',
  primaryFamilyCaregiver: '',
  relationshipWithPrimaryCaregiver: '',
  awareOfDiagnosis: '',
  timeSinceDiagnosis: '',
  timeSinceTreatmentStarted: '',
  treatmentType: '',
  consultationType: '',
}

export default function PatientForm({ onReady }) {
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
        primaryFamilyCaregiver: formData.primaryFamilyCaregiver,
        relationshipWithPrimaryCaregiver: formData.relationshipWithPrimaryCaregiver,
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
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
              Name or Initials <span className="text-red-500">*</span>
            </label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="e.g. J. Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="age">Age</label>
            <input id="age" type="number" name="age" value={formData.age} onChange={handleChange}
              min="0" max="120" placeholder="e.g. 45"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="languageKnown">Language Known</label>
            <input id="languageKnown" type="text" name="languageKnown" value={formData.languageKnown} onChange={handleChange}
              placeholder="e.g. English, Hindi"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="educationBackground">Education Background</label>
            <input id="educationBackground" type="text" name="educationBackground" value={formData.educationBackground} onChange={handleChange}
              placeholder="e.g. Bachelor's degree"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="occupationBackground">Occupation Background</label>
            <input id="occupationBackground" type="text" name="occupationBackground" value={formData.occupationBackground} onChange={handleChange}
              placeholder="e.g. Teacher"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="primaryFamilyCaregiver">Primary Family Caregiver</label>
            <input id="primaryFamilyCaregiver" type="text" name="primaryFamilyCaregiver" value={formData.primaryFamilyCaregiver} onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="relationshipWithPrimaryCaregiver">Relationship with Primary Caregiver</label>
            <input id="relationshipWithPrimaryCaregiver" type="text" name="relationshipWithPrimaryCaregiver" value={formData.relationshipWithPrimaryCaregiver} onChange={handleChange}
              placeholder="e.g. Spouse, Parent"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
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
            <p className="text-sm font-medium text-gray-600 mb-2">Are you aware of your diagnosis?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="awareOfDiagnosis" value="yes"
                  checked={formData.awareOfDiagnosis === 'yes'} onChange={handleChange} className="accent-blue-500" />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="awareOfDiagnosis" value="no"
                  checked={formData.awareOfDiagnosis === 'no'} onChange={handleChange} className="accent-blue-500" />
                No
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="timeSinceDiagnosis">Time Since Diagnosis</label>
              <input id="timeSinceDiagnosis" type="text" name="timeSinceDiagnosis" value={formData.timeSinceDiagnosis} onChange={handleChange}
                placeholder="e.g. 6 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="timeSinceTreatmentStarted">Time Since Treatment Started</label>
              <input id="timeSinceTreatmentStarted" type="text" name="timeSinceTreatmentStarted" value={formData.timeSinceTreatmentStarted} onChange={handleChange}
                placeholder="e.g. 3 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="treatmentType">Type of Treatment</label>
              <input id="treatmentType" type="text" name="treatmentType" value={formData.treatmentType} onChange={handleChange}
                placeholder="e.g. Chemotherapy"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="consultationType">Type of Consultation</label>
              <input id="consultationType" type="text" name="consultationType" value={formData.consultationType} onChange={handleChange}
                placeholder="e.g. Oncology"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <div className="pt-2">
        <button type="submit"
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
          Continue to Questions
        </button>
      </div>
    </form>
  )
}
