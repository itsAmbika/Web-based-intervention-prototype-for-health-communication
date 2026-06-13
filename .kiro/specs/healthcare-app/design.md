# Design

## Architecture

MERN stack with a simple client-server separation.

Browser (React + Tailwind)
|
| HTTP (Axios — REST)
|
Express.js Server (Node.js)
|
| Mongoose
|
MongoDB Atlas
---

## Folder Structure

### Backend

server/
├── config/
│ └── db.js
├── controllers/
│ ├── patientController.js
│ ├── caregiverController.js
│ └── adminController.js
├── models/
│ ├── Patient.js
│ ├── Caregiver.js
│ ├── Question.js
│ └── Counter.js
├── routes/
│ ├── patientRoutes.js
│ ├── caregiverRoutes.js
│ └── adminRoutes.js
├── utils/
│ └── generateId.js
├── .env
└── index.js


### Frontend

client/
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── PatientPage.jsx
│ │ ├── CaregiverPage.jsx
│ │ └── AdminPage.jsx
│ ├── components/
│ │ ├── PatientForm.jsx
│ │ ├── CaregiverForm.jsx
│ │ ├── QuestionSelector.jsx
│ │ └── AdminTable.jsx
│ ├── services/
│ │ └── api.js
│ ├── App.jsx
│ └── main.jsx
├── index.html
└── vite.config.js


---

## Database Design

### Patient Collection

```js
{
  patientId: { type: String, unique: true },   // PAT-00001
  demographics: {
    name: String,
    gender: String,
    age: Number,
    languageKnown: String,
    educationBackground: String,
    occupationBackground: String,
    primaryFamilyCaregiver: String,
    relationshipWithPrimaryCaregiver: String
  },
  medicalInfo: {
    awareOfDiagnosis: Boolean,
    timeSinceDiagnosis: String,
    timeSinceTreatmentStarted: String,
    treatmentType: String,
    consultationType: String
  },
  selectedQuestions: [String],
  customQuestion: String,
  createdAt: Date
}

{
  caregiverId: { type: String, unique: true },  // CAR-00001
  demographics: {
    name: String,
    gender: String,
    age: Number,
    languageKnown: String,
    educationBackground: String,
    occupationBackground: String,
    relationshipWithPatient: String
  },
  medicalInfo: {
    awareOfDiagnosis: Boolean,
    timeSinceDiagnosis: String,
    timeSinceTreatmentStarted: String,
    treatmentType: String,
    consultationType: String
  },
  selectedQuestions: [String],
  customQuestion: String,
  createdAt: Date
}

{
  questionText: String,
  category: String,
  targetAudience: { type: String, enum: ['patient', 'caregiver', 'both'] },
  isActive: { type: Boolean, default: true },
  createdAt: Date
}

{
  name: { type: String, unique: true },  // 'patient' or 'caregiver'
  value: { type: Number, default: 0 }
}

async function generateId(type) {
  const prefix = type === 'patient' ? 'PAT' : 'CAR';
  const counter = await Counter.findOneAndUpdate(
    { name: type },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  const padded = String(counter.value).padStart(5, '0');
  return `${prefix}-${padded}`;
}



