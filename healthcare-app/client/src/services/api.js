import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

export const registerPatient = (data) => api.post('/api/patient/register', data)
export const getPatientQuestions = () => api.get('/api/questions/patient')
export const registerCaregiver = (data) => api.post('/api/caregiver/register', data)
export const getCaregiverQuestions = () => api.get('/api/questions/caregiver')
export const getAdminPatients = () => api.get('/api/admin/patients')
export const getAdminCaregivers = () => api.get('/api/admin/caregivers')
export const getAdminQuestions = () => api.get('/api/admin/questions')
export const addQuestion = (data) => api.post('/api/admin/questions', data)
export const updateQuestion = (id, data) => api.put(`/api/admin/questions/${id}`, data)
export const toggleQuestion = (id) => api.patch(`/api/admin/questions/${id}`)
