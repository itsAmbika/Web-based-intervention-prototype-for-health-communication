# QLP — Question List Preparation App
## Master Implementation Plan & Progress Tracker

> **HOW TO USE THIS FILE:**  
> At the start of every session, read this file first to know exactly where we left off.  
> Mark `[ ]` → `[/]` when starting a task, `[x]` when done.  
> Never skip ahead — each phase depends on the previous one being working.

---

## Tech Stack (Locked)

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| State (server) | TanStack React Query v5 |
| State (client) | Zustand v4 |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| Animations | Framer Motion |
| Toast | React Hot Toast |
| Icons | Lucide React |
| HTTP Client | Axios |
| Backend | Node.js 20 + Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (access) + httpOnly cookie (refresh) |
| OAuth | Passport.js + passport-google-oauth20 |
| PDF | Puppeteer |
| Validation | Zod (shared frontend + backend) |
| Logging | Pino |
| Security | Helmet, CORS, express-rate-limit |

---

## Project Layout (Final)

```
QLP/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── questionController.js
│   │   ├── consultationController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validateBody.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Category.js
│   │   ├── Disease.js
│   │   └── Consultation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── consultationRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── consultationService.js
│   │   └── pdfService.js
│   ├── scripts/
│   │   └── seed.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── logger.js
│   ├── .env.example
│   ├── .env               ← (gitignored, you create this)
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js           ← axios instance with interceptors
│   │   │   ├── useAuth.js
│   │   │   ├── useQuestions.js
│   │   │   ├── useConsultations.js
│   │   │   └── useAdmin.js
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── Card.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── PageWrapper.jsx
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── wizard/
│   │   │       ├── StepIndicator.jsx
│   │   │       ├── DiseaseSelector.jsx
│   │   │       ├── StageSelector.jsx
│   │   │       ├── CategoryTabs.jsx
│   │   │       ├── QuestionPicker.jsx
│   │   │       ├── TopQuestionsSelector.jsx
│   │   │       ├── CustomQuestionsForm.jsx
│   │   │       └── ReviewStep.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DemographicsPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── WizardPage.jsx
│   │   │   ├── ConsultationsPage.jsx
│   │   │   ├── ConsultationDetailPage.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboardPage.jsx
│   │   │   │   ├── AdminQuestionsPage.jsx
│   │   │   │   ├── AdminQuestionFormPage.jsx
│   │   │   │   └── AdminUsersPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   └── useWizardStore.js
│   │   ├── validation/
│   │   │   ├── authSchemas.js
│   │   │   ├── demographicsSchema.js
│   │   │   └── questionSchema.js
│   │   ├── utils/
│   │   │   ├── constants.js       ← STAGES, etc.
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── deep-research-report.md
├── implementation_plan.md    ← THIS FILE
└── README.md
```

---

## Phase 1 — Backend Foundation

### 1.1 — Init & Config
- [x] `cd backend && npm init -y`
- [x] Install all backend dependencies
- [x] Create `backend/.env.example`
- [x] Create `backend/.env` (user fills in MONGO_URI, JWT secrets, Google OAuth creds)
- [x] Create `backend/server.js` (express app, middleware, route mounting, listen)
- [x] Create `backend/config/db.js` (mongoose connect)
- [x] Create `backend/utils/logger.js` (pino logger)
- [x] Create `backend/utils/jwt.js` (sign/verify helpers)

### 1.2 — Mongoose Models
- [x] Create `backend/models/Disease.js`
- [x] Create `backend/models/Category.js`
- [x] Create `backend/models/User.js`
- [x] Create `backend/models/Question.js`
- [x] Create `backend/models/Consultation.js`

### 1.3 — Middleware
- [x] Create `backend/middleware/authMiddleware.js` (verify JWT Bearer token)
- [x] Create `backend/middleware/roleMiddleware.js` (require admin role)
- [x] Create `backend/middleware/validateBody.js` (Zod schema validation)
- [x] Create `backend/middleware/errorHandler.js` (global error handler)

### 1.4 — Auth Routes & Controllers
- [x] Create `backend/services/authService.js` (signup, login, google, refresh logic)
- [x] Create `backend/controllers/authController.js`
- [x] Create `backend/routes/authRoutes.js`
  - POST /api/auth/signup
  - POST /api/auth/login
  - GET  /api/auth/google
  - GET  /api/auth/google/callback
  - POST /api/auth/refresh
  - POST /api/auth/logout

### 1.5 — User Routes & Controllers
- [x] Create `backend/controllers/userController.js`
- [x] Create `backend/routes/userRoutes.js`
  - GET   /api/users/me
  - PATCH /api/users/me

### 1.6 — Question Routes & Controllers
- [x] Create `backend/controllers/questionController.js`
- [x] Create `backend/routes/questionRoutes.js`
  - GET /api/questions?disease=&stage=
  - GET /api/diseases
  - GET /api/categories

### 1.7 — Consultation Routes & Controllers
- [x] Create `backend/services/consultationService.js`
- [x] Create `backend/controllers/consultationController.js`
- [x] Create `backend/routes/consultationRoutes.js`
  - POST /api/consultations
  - GET  /api/consultations
  - GET  /api/consultations/:id
  - GET  /api/consultations/:id/pdf

### 1.8 — PDF Service
- [x] Create `backend/services/pdfService.js` (Puppeteer PDF generation)

### 1.9 — Admin Routes & Controllers
- [x] Create `backend/controllers/adminController.js`
- [x] Create `backend/routes/adminRoutes.js`
  - GET    /api/admin/questions
  - POST   /api/admin/questions
  - PUT    /api/admin/questions/:id
  - DELETE /api/admin/questions/:id
  - GET    /api/admin/users
  - PATCH  /api/admin/users/:id  (toggle active/role)

### 1.10 — Seed Script
- [x] Create `backend/scripts/seed.js`
  - Seeds: 8 diseases (Breast, Lung, Colorectal, Prostate, Leukemia, Lymphoma, Ovarian, Pancreatic)
  - Seeds: 6 categories (Diagnosis, Tests & Imaging, Treatment Options, Side Effects, Support & Lifestyle, Follow-up)
  - Seeds: 4 stages (Diagnosis, Treatment, Survivorship, Palliative)
  - Seeds: 608 questions distributed across diseases × stages × categories
- [x] Test: `node scripts/seed.js` → 608 questions, 8 diseases, 6 categories ✅

### 1.11 — Backend Verification
- [x] `npm run dev` starts server on port 5000 without errors ✅
- [x] GET /api/health returns 200 ✅
- [x] GET /api/diseases returns disease list ✅
- [ ] POST /api/auth/signup creates a user (verify via frontend)
- [ ] POST /api/auth/login returns JWT (verify via frontend)

---

## Phase 2 — Frontend Foundation

### 2.1 — Init & Config
- [ ] Scaffold Vite React app in `frontend/`
- [ ] Install all frontend dependencies
- [ ] Configure Tailwind CSS (tailwind.config.js, postcss.config.js, index.css)
- [ ] Configure Vite proxy to backend (vite.config.js → proxy /api to localhost:5000)
- [ ] Set up Axios instance with base URL + interceptors (src/api/axios.js)

### 2.2 — Auth Store & Token Management
- [ ] Create `src/store/useAuthStore.js` (Zustand: user, accessToken, setUser, logout)
- [ ] Wire Axios interceptor: attach Bearer token; on 401 → call /api/auth/refresh → retry

### 2.3 — Wizard Store
- [ ] Create `src/store/useWizardStore.js`
  - Fields: step, selectedDisease, selectedStage, selectedQuestions[], topQuestions[], customQuestions[]
  - Actions: setStep, setDisease, setStage, toggleQuestion, toggleTop, addCustom, removeCustom, reset

### 2.4 — Zod Validation Schemas
- [ ] Create `src/validation/authSchemas.js` (signup, login)
- [ ] Create `src/validation/demographicsSchema.js`
- [ ] Create `src/validation/questionSchema.js` (admin question form)

### 2.5 — UI Component Library
- [ ] Create `src/components/ui/Button.jsx`
- [ ] Create `src/components/ui/Input.jsx`
- [ ] Create `src/components/ui/Modal.jsx`
- [ ] Create `src/components/ui/Spinner.jsx`
- [ ] Create `src/components/ui/Badge.jsx`
- [ ] Create `src/components/ui/Card.jsx`

### 2.6 — Layout Components
- [ ] Create `src/components/layout/Navbar.jsx` (responsive, hamburger on mobile)
- [ ] Create `src/components/layout/PageWrapper.jsx` (padding, max-width container)

### 2.7 — React Query API Hooks
- [ ] Create `src/api/useAuth.js` (signup, login, logout, refresh, getMe, patchMe)
- [ ] Create `src/api/useQuestions.js` (getQuestions, getDiseases, getCategories)
- [ ] Create `src/api/useConsultations.js` (createConsultation, getConsultations, getConsultation, getPdf)
- [ ] Create `src/api/useAdmin.js` (admin questions CRUD, admin users)

### 2.8 — Auth & Protected Route
- [ ] Create `src/components/auth/ProtectedRoute.jsx`
- [ ] Create `src/App.jsx` with all routes defined

---

## Phase 3 — Pages (Auth & Onboarding)

### 3.1 — Landing Page
- [ ] Create `src/pages/LandingPage.jsx`
  - Hero section: app name "QLP", tagline, CTA buttons (Sign Up, Log In)
  - Features section: 3 cards (Guided Wizard, Track History, Download PDF)
  - Footer with privacy link
  - Premium design: dark gradient background, animated hero text, glassmorphism cards

### 3.2 — Sign Up Page
- [ ] Create `src/pages/SignupPage.jsx`
  - Form: Name, Email, Password, Confirm Password (RHF + Zod)
  - "Continue with Google" button
  - Inline validation errors
  - Link to Login

### 3.3 — Login Page
- [ ] Create `src/pages/LoginPage.jsx`
  - Form: Email, Password (RHF + Zod)
  - "Continue with Google" button
  - Link to Sign Up

### 3.4 — Demographics Page
- [ ] Create `src/pages/DemographicsPage.jsx`
  - Fields: Name, Date of Birth, Gender, Primary Language, Relation to Patient (Self/Caregiver)
  - Required on first login; redirect guard
  - Save → navigate to Dashboard

---

## Phase 4 — Core Pages

### 4.1 — Dashboard Page
- [ ] Create `src/pages/DashboardPage.jsx`
  - Personalized greeting with name
  - "Start New Consultation" large CTA card
  - "My Consultations" card with count
  - Recent consultations list (last 3)
  - Admin users see "Admin Panel" card too

### 4.2 — Wizard Page & Step Components
- [ ] Create `src/components/wizard/StepIndicator.jsx`
- [ ] Create `src/pages/WizardPage.jsx` (parent, manages step nav)
- [ ] Create `src/components/wizard/DiseaseSelector.jsx` (Step 1)
  - Grid of disease cards with icons/colors
  - Highlights selected disease
- [ ] Create `src/components/wizard/StageSelector.jsx` (Step 2)
  - 4 stage buttons with descriptions
- [ ] Create `src/components/wizard/CategoryTabs.jsx` + `QuestionPicker.jsx` (Step 3)
  - Tabs for each category; checkboxes for questions
  - Shows count of selected questions
- [ ] Create `src/components/wizard/TopQuestionsSelector.jsx` (Step 4)
  - Lists selected questions with star toggle
  - Enforces max 3 tops with animated feedback
- [ ] Create `src/components/wizard/CustomQuestionsForm.jsx` (Step 5)
  - Dynamic add/remove text inputs
- [ ] Create `src/components/wizard/ReviewStep.jsx` (Step 6)
  - Shows full list grouped by category
  - Top questions highlighted with star
  - "Download PDF" button
  - "Save Consultation" action

### 4.3 — Consultations History Page
- [ ] Create `src/pages/ConsultationsPage.jsx`
  - Vertical timeline list (newest first)
  - Each entry: Date, Disease, Stage, question count
  - Click navigates to detail

### 4.4 — Consultation Detail Page
- [ ] Create `src/pages/ConsultationDetailPage.jsx`
  - Header: Disease, Stage, Date
  - Questions grouped by category
  - Top questions starred
  - Custom questions section
  - Download PDF button

---

## Phase 5 — Admin Pages

### 5.1 — Admin Dashboard
- [ ] Create `src/pages/admin/AdminDashboardPage.jsx`
  - Stats cards: Total Users, Total Consultations, Total Questions
  - Quick links to Manage Questions / Manage Users

### 5.2 — Admin Questions Page
- [ ] Create `src/pages/admin/AdminQuestionsPage.jsx`
  - Filterable table: Disease, Stage, Category filters
  - Columns: Text, Disease, Stage, Category, Active, Edit, Delete
  - Pagination
  - "Create New Question" button

### 5.3 — Admin Question Form Page
- [ ] Create `src/pages/admin/AdminQuestionFormPage.jsx`
  - Form: Question Text (textarea), Disease (select), Stage (select), Category (select), Active (toggle)
  - Used for both Create and Edit
  - Zod validation

### 5.4 — Admin Users Page
- [ ] Create `src/pages/admin/AdminUsersPage.jsx`
  - Table: Name, Email, Role, Consultations, Joined Date, Toggle Active

---

## Phase 6 — Polish & Integration

- [ ] PDF download flow (frontend triggers /api/consultations/:id/pdf, blob download)
- [ ] Responsive testing (mobile layout for all pages)
- [ ] Loading states on all async actions (Spinner, skeleton loaders)
- [ ] Error boundaries and toast notifications for all errors
- [ ] 404 Not Found page
- [ ] Token refresh flow (Axios interceptor silently retries on 401)
- [ ] Google OAuth callback handling on frontend
- [ ] Empty states (no consultations yet, no questions in category)
- [ ] Accessibility: aria-labels, focus management in wizard

---

## Phase 7 — Final Verification

- [ ] Full user flow: Sign Up → Demographics → Wizard (all 6 steps) → PDF download → View in history
- [ ] Admin flow: Login as admin → Create question → Verify it appears in wizard
- [ ] Token refresh: let access token expire, verify silent refresh works
- [ ] Mobile: test wizard on narrow viewport
- [ ] Run `npm audit` on both backend and frontend

---

## Environment Variables Required

Create `backend/.env` with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/qlp
JWT_ACCESS_SECRET=<random 64 char string>
JWT_REFRESH_SECRET=<random 64 char string>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
GOOGLE_CLIENT_ID=<from Google Console>
GOOGLE_CLIENT_SECRET=<from Google Console>
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Session Resume Instructions

**If resuming in a new session:**
1. Open this file first
2. Find the first `[ ]` unchecked item — that's where we resume
3. Check current state: `ls backend/` and `ls frontend/src/` to verify what exists
4. Continue from that checkpoint

**Current Status:** 🏁 ALL PHASES COMPLETE (Phases 1–6) + Security Audits Passed
**Last completed:** Phase 6 — Error Boundary, Skeleton loaders, Auth fixes, surface-850 color, 0 npm vulnerabilities ✅
**Both servers:** Backend :5000, Frontend :5173 — run `npm run dev` in each to start
**Build:** `npm run build` in frontend passes clean (2411 modules, 0 errors, 0 vulnerabilities)
