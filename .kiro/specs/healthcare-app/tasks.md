# Implementation Plan

## Overview

Build a MERN stack healthcare questionnaire application with patient/caregiver registration flows, question selection, and an admin dashboard. Backend uses Express + Mongoose + MongoDB Atlas; frontend uses React + Vite + Tailwind CSS.

## Tasks

- [x] 1. Initialize project structure
  - Create root folder `healthcare-app` at the workspace root
  - Create subfolders: `healthcare-app/server/` and `healthcare-app/client/`
  - Create `healthcare-app/server/.env` with placeholder values: `MONGO_URI=your_mongodb_atlas_uri`, `PORT=5000`, `CLIENT_URL=http://localhost:5173`
  - **Output:** Root folder with `server/` and `client/` directories and `.env`

- [x] 2. Set up backend Express server
  - Inside `healthcare-app/server/`, run `npm init -y`
  - Install: `express mongoose cors dotenv nodemon`
  - Create `healthcare-app/server/index.js` with Express app, `cors()`, `express.json()`, import `connectDB`, start server on `process.env.PORT || 5000`
  - Add `"dev": "nodemon index.js"` and `"start": "node index.js"` to scripts
  - **Output:** `server/index.js` created with correct structure

- [x] 3. Connect MongoDB Atlas
  - Create `healthcare-app/server/config/db.js`
  - Use `mongoose.connect(process.env.MONGO_URI)` with success/error log
  - Call `connectDB()` in `index.js`
  - **Output:** `db.js` created and imported in `index.js`

- [x] 4. Create Counter model
  - Create `healthcare-app/server/models/Counter.js`
  - Schema: `{ name: String (unique), value: Number (default 0) }`
  - **Output:** `Counter.js` model file

- [x] 5. Create ID generator utility
  - Create `healthcare-app/server/utils/generateId.js`
  - Export async `generateId(type)` where type is `'patient'` or `'caregiver'`
  - Use `Counter.findOneAndUpdate` with `$inc: { value: 1 }` and `upsert: true`
  - Return `PAT-00001` or `CAR-00001` format using `padStart(5, '0')`
  - **Output:** `generateId.js` returning correct formatted IDs

- [x] 6. Create Question model
  - Create `healthcare-app/server/models/Question.js`
  - Schema fields: `questionText` (String, required), `category` (String), `targetAudience` (enum: patient/caregiver/both, required), `isActive` (Boolean, default true), `createdAt` (Date, default Date.now)
  - **Output:** `Question.js` model file

- [x] 7. Create Patient model
  - Create `healthcare-app/server/models/Patient.js`
  - Schema: `patientId` (String, unique), nested `demographics` object (name, gender, age, languageKnown, educationBackground, occupationBackground, primaryFamilyCaregiver, relationshipWithPrimaryCaregiver), nested `medicalInfo` object (awareOfDiagnosis Boolean, timeSinceDiagnosis, timeSinceTreatmentStarted, treatmentType, consultationType), `selectedQuestions` ([String]), `customQuestion` (String), `createdAt` (Date)
  - **Output:** `Patient.js` model file

- [x] 8. Create Caregiver model
  - Create `healthcare-app/server/models/Caregiver.js`
  - Same structure as Patient model but with `caregiverId` instead of `patientId`, and `relationshipWithPatient` in demographics instead of caregiver-specific fields
  - **Output:** `Caregiver.js` model file

- [x] 9. Create patient controller
  - Create `healthcare-app/server/controllers/patientController.js`
  - `registerPatient`: validate required fields (return 400 if missing), call `generateId('patient')`, save Patient doc, return `{ success: true, patientId }` with 201
  - `getPatientQuestions`: query Questions where `isActive: true` and `targetAudience` is `'patient'` or `'both'`, return `_id`, `questionText`, `category`
  - **Output:** `patientController.js` with both functions

- [x] 10. Create patient routes
  - Create `healthcare-app/server/routes/patientRoutes.js`
  - `POST /api/patient/register` → `registerPatient`
  - `GET /api/questions/patient` → `getPatientQuestions`
  - Mount in `index.js` with `app.use('/api', patientRouter)`
  - **Output:** Patient routes file created and mounted

- [x] 11. Create caregiver controller
  - Create `healthcare-app/server/controllers/caregiverController.js`
  - Mirror patientController using Caregiver model and `generateId('caregiver')`
  - `registerCaregiver` returns `{ success: true, caregiverId }`
  - `getCaregiverQuestions` filters for `'caregiver'` or `'both'`
  - **Output:** `caregiverController.js` with both functions

- [x] 12. Create caregiver routes
  - Create `healthcare-app/server/routes/caregiverRoutes.js`
  - `POST /api/caregiver/register` → `registerCaregiver`
  - `GET /api/questions/caregiver` → `getCaregiverQuestions`
  - Mount in `index.js`
  - **Output:** Caregiver routes file created and mounted

- [x] 13. Create admin controller
  - Create `healthcare-app/server/controllers/adminController.js`
  - `getAllPatients`: return all patients, exclude `_id` and `__v`
  - `getAllCaregivers`: same pattern for caregivers
  - `getAllQuestions`: return all questions regardless of `isActive`
  - `addQuestion`: create new Question document
  - `updateQuestion`: find by `_id`, update `questionText`, `category`, `targetAudience`
  - `toggleQuestion`: flip `isActive` boolean
  - **Output:** `adminController.js` with all 6 functions

- [x] 14. Create admin routes
  - Create `healthcare-app/server/routes/adminRoutes.js`
  - `GET /api/admin/patients` → `getAllPatients`
  - `GET /api/admin/caregivers` → `getAllCaregivers`
  - `GET /api/admin/questions` → `getAllQuestions`
  - `POST /api/admin/questions` → `addQuestion`
  - `PUT /api/admin/questions/:id` → `updateQuestion`
  - `PATCH /api/admin/questions/:id` → `toggleQuestion`
  - Mount in `index.js`
  - **Output:** Admin routes file created and mounted

- [x] 15. Seed default questions
  - Create `healthcare-app/server/utils/seedQuestions.js`
  - Insert 8-10 default questions — mix of `'patient'`, `'caregiver'`, `'both'` audiences
  - Include questions like: "What is your biggest concern about your treatment?" (patient), "What support do you need most right now?" (both), "How has caregiving affected your daily routine?" (caregiver)
  - **Output:** `seedQuestions.js` script ready to run with `node utils/seedQuestions.js`

- [x] 16. Set up React frontend with Vite
  - Inside `healthcare-app/client/`, initialize with `npm create vite@latest . -- --template react`
  - Install: `react-router-dom axios`
  - Install Tailwind: `npm install -D tailwindcss postcss autoprefixer` and init config
  - Configure `tailwind.config.js` content paths to include `./src/**/*.{js,jsx}`
  - Add Tailwind directives to `src/index.css`
  - **Output:** Vite + React + Tailwind project scaffolded in `client/`

- [x] 17. Create Axios service file
  - Create `healthcare-app/client/src/services/api.js`
  - Set `baseURL` using `import.meta.env.VITE_API_URL || 'http://localhost:5000'`
  - Export named functions: `registerPatient`, `getPatientQuestions`, `registerCaregiver`, `getCaregiverQuestions`, `getAdminPatients`, `getAdminCaregivers`, `getAdminQuestions`, `addQuestion`, `updateQuestion`, `toggleQuestion`
  - **Output:** `api.js` with all 10 exported functions

- [x] 18. Set up React Router
  - Update `healthcare-app/client/src/App.jsx` with `BrowserRouter` and routes: `/` → `Home.jsx`, `/patient` → `PatientPage.jsx`, `/caregiver` → `CaregiverPage.jsx`, `/admin` → `AdminPage.jsx`
  - **Output:** `App.jsx` with all four routes configured

- [x] 19. Build Home page
  - Create `healthcare-app/client/src/pages/Home.jsx`
  - App title: "Healthcare Questionnaire"
  - Two buttons: "I am a Patient" → `/patient` and "I am a Caregiver" → `/caregiver`
  - Small admin link at bottom
  - Tailwind only, no images
  - **Output:** `Home.jsx` with navigation links

- [x] 20. Build PatientForm component
  - Create `healthcare-app/client/src/components/PatientForm.jsx`
  - Controlled form with `useState` for all patient fields
  - Demographics and Medical Information as two labeled sections
  - Gender as `<select>` dropdown; "Are you aware of your diagnosis?" as radio buttons (Yes / No)
  - On submit: call `registerPatient(formData)` from api.js; on success call parent `onSuccess(patientId)` callback
  - Show inline error message if API call fails
  - **Output:** `PatientForm.jsx` component

- [x] 21. Build QuestionSelector component
  - Create `healthcare-app/client/src/components/QuestionSelector.jsx`
  - Accept `questions` array and `onComplete(data)` callback as props
  - Render each question as a checkbox; enforce max 3 selections — disable unchecked boxes once 3 are checked
  - Show selected count: "X of 3 selected"
  - Custom question text input below the list (optional)
  - "Submit Selections" button calls `onComplete({ selectedQuestions, customQuestion })`
  - **Output:** `QuestionSelector.jsx` component

- [x] 22. Build PatientPage
  - Create `healthcare-app/client/src/pages/PatientPage.jsx`
  - `step` state: `'form'` | `'questions'` | `'done'`
  - `'form'` step: render `<PatientForm onSuccess={handleFormSuccess} />`
  - On success: store `patientId`, fetch `getPatientQuestions()`, set step to `'questions'`
  - `'questions'` step: render `<QuestionSelector>`, on complete save selections and set step to `'done'`
  - `'done'` step: show success message with `patientId` displayed prominently
  - **Output:** `PatientPage.jsx` with full three-step flow

- [x] 23. Build CaregiverForm component
  - Create `healthcare-app/client/src/components/CaregiverForm.jsx`
  - Mirror PatientForm with caregiver fields: `relationshipWithPatient` instead of caregiver name/relationship fields; radio label: "Are you aware of your loved one's diagnosis?"
  - On success: call parent `onSuccess(caregiverId)` callback
  - **Output:** `CaregiverForm.jsx` component

- [x] 24. Build CaregiverPage
  - Create `healthcare-app/client/src/pages/CaregiverPage.jsx`
  - Identical step flow to PatientPage using caregiver API calls
  - Show success with generated CAR-XXXXX ID
  - **Output:** `CaregiverPage.jsx` with full three-step flow

- [x] 25. Build AdminPage — Patient and Caregiver tables
  - Create `healthcare-app/client/src/pages/AdminPage.jsx`
  - Tab state: `'patients'` | `'caregivers'` | `'questions'`
  - Patient tab: fetch `getAdminPatients()` on mount, display table with columns: Patient ID, Name, Age, Gender, Aware of Diagnosis, Treatment Type, Consultation, Selected Questions (comma-separated), Date Submitted
  - Caregiver tab: same pattern using `getAdminCaregivers()`
  - **Output:** `AdminPage.jsx` with patients and caregivers tabs

- [x] 26. Build AdminPage — Question Manager tab
  - Add questions tab to `AdminPage.jsx`
  - Fetch `getAdminQuestions()` on mount; display table: Question Text, Category, For (Audience), Status, Actions
  - "Add Question" button toggles an inline form with: question text input, category input, target audience select (Patient / Caregiver / Both), Save button
  - Edit button: populates inline edit form for that row
  - Deactivate/Activate button: calls `toggleQuestion(id)`, refreshes list
  - **Output:** Questions tab added to `AdminPage.jsx`

- [x] 27. Test all backend APIs
  - Verify all 10 endpoints work correctly by reviewing the code for correctness: `POST /api/patient/register`, `POST /api/caregiver/register`, `GET /api/questions/patient`, `GET /api/questions/caregiver`, `GET /api/admin/patients`, `GET /api/admin/caregivers`, `GET /api/admin/questions`, `POST /api/admin/questions`, `PUT /api/admin/questions/:id`, `PATCH /api/admin/questions/:id`
  - Fix any code issues found during review
  - **Output:** All backend files reviewed and corrected

- [x] 28. Test frontend end to end
  - Review all frontend components and pages for correctness: patient flow, caregiver flow, admin dashboard
  - Verify API service calls match backend routes
  - Fix any issues found
  - **Output:** All frontend files reviewed and corrected

- [x] 29. Prepare for deployment
  - Confirm `"start": "node index.js"` is in server `package.json` scripts
  - Create `healthcare-app/client/.env.example` with `VITE_API_URL=https://your-render-url.onrender.com`
  - Create a `README.md` in `healthcare-app/` with deployment instructions for Render (backend) and Vercel (frontend) and MongoDB Atlas setup
  - **Output:** `README.md` with deployment instructions and `.env.example` created

## Task Dependency Graph

```
1 → 2 → 3 → 4 → 5
                  ↓
              6, 7, 8
                  ↓
              9, 10, 11, 12, 13, 14, 15
                  ↓
              16 → 17 → 18 → 19
                              ↓
                    20, 21 → 22
                    23     → 24
                    25, 26
                              ↓
                          27 → 28 → 29
```

## Notes

- Tasks 1–15 are backend tasks; tasks 16–26 are frontend tasks; tasks 27–29 are verification and deployment prep.
- Tasks 4, 5, 6, 7, 8 can be done in parallel after task 3.
- Tasks 9–15 can be done in parallel after their model dependencies are met.
- Tasks 20, 21, 23 can be done in parallel after task 19.
- Tasks 25 and 26 build the same file sequentially.
- MongoDB Atlas connection requires a real URI in `.env` to fully test; the seed script and server will need a live connection.
