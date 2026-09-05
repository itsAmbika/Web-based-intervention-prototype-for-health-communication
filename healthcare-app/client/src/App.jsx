import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientPage from './pages/PatientPage'
import CaregiverPage from './pages/CaregiverPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/caregiver" element={<CaregiverPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
