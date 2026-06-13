import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientPage from './pages/PatientPage'
import CaregiverPage from './pages/CaregiverPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/caregiver" element={<CaregiverPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
