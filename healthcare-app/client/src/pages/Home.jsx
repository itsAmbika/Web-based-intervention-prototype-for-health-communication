import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Healthcare Questionnaire
        </h1>
        <p className="text-gray-500 mb-12 text-lg">
          Please select your role to get started
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/patient"
            className="w-full py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            role="button"
          >
            I am a Patient
          </Link>

          <Link
            to="/caregiver"
            className="w-full py-5 px-8 bg-teal-600 hover:bg-teal-700 text-white text-xl font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-300"
            role="button"
          >
            I am a Caregiver
          </Link>
        </div>

        <div className="mt-16">
          <Link
            to="/admin"
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
