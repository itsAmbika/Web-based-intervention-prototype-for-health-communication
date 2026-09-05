# Requirements

## Project Overview

Build a simple MERN stack web application for collecting healthcare questionnaire data from patients and caregivers, with an admin dashboard for data management.

---

## Functional Requirements

### FR-1 — Patient Route

**Route:** `/patient`

The patient flow has two steps:

**Step 1 — Demographics and Medical Form**

*Demographics*
- Name or Initials (text)
- Gender (select: Male / Female / Other / Prefer not to say)
- Age (number)
- Language Known (text — comma separated)
- Education Background (text)
- Occupation Background (text)
- Primary Family Caregiver (text)
- Relationship with Primary Caregiver (text)

*Medical Information*
- Are you aware of your diagnosis? (radio: Yes / No)
- Time Since Diagnosis (text)
- Time Since Treatment Started (text)
- Type of Treatment (text)
- Type of Consultation (text)

**Step 2 — Question Selection**

After submitting the form:
- Show a list of available questions fetched from the database (filtered for patients)
- Patient can select a maximum of 3 questions
- Patient can optionally add 1 custom question (free text)
- All selections are saved to the database along with the patient record

---

### FR-2 — Caregiver Route

**Route:** `/caregiver`

The caregiver flow has two steps:

**Step 1 — Demographics and Medical Form**

*Demographics*
- Name or Initials (text)
- Gender (select: Male / Female / Other / Prefer not to say)
- Age (number)
- Language Known (text — comma separated)
- Education Background (text)
- Occupation Background (text)
- Relationship with Patient (text)

*Medical Information*
- Are you aware of your loved one's diagnosis? (radio: Yes / No)
- Time Since Diagnosis (text)
- Time Since Treatment Started (text)
- Type of Treatment (text)
- Type of Consultation (text)

**Step 2 — Question Selection**

After submitting the form:
- Show list of available questions fetched from the database (filtered for caregivers)
- Caregiver can select a maximum of 3 questions
- Caregiver can optionally add 1 custom question (free text)
- All selections are saved to the database along with the caregiver record

---

### FR-3 — Admin Route

**Route:** `/admin`

Admin dashboard must support:
- View all patient records in a simple readable table
- View all caregiver records in a simple readable table
- View selected questions per patient and caregiver
- Add new questions
- Edit existing questions
- Deactivate (soft delete) questions — do not hard delete

Admin UI requirements:
- Non-technical friendly
- Table-based layout
- Plain readable labels (no technical jargon, no MongoDB IDs shown)
- Uses generated IDs (PAT-00001, CAR-00001)

---

### FR-4 — ID Generation

- Every patient gets a generated ID in format: `PAT-00001`, `PAT-00002`, etc.
- Every caregiver gets a generated ID in format: `CAR-00001`, `CAR-00002`, etc.
- IDs are auto-incremented using a Counter collection in MongoDB
- MongoDB internal `_id` must never be exposed to the frontend

---

## Non-Functional Requirements

### NFR-1 — Privacy
- No email addresses collected
- No phone numbers collected
- No OTP or authentication system
- Only generated IDs used as visible identifiers

### NFR-2 — Simplicity
- Minimal dependencies
- No Redux or complex state management
- No TypeScript
- No GraphQL
- No animations or transitions
- No microservices

### NFR-3 — Tech Stack
- Frontend: React, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB (MongoDB Atlas)
- Build tool: Vite

### NFR-4 — Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

### NFR-5 — Security Basics
- MongoDB credentials stored in `.env`
- `.env` never committed to version control
- MongoDB `_id` hidden from all API responses

---

## Constraints

- No authentication initially
- No patient-caregiver linking initially
- No real-time features
- REST APIs only
- Functional React components only
- Focus on a working MVP

---

## Out of Scope (for MVP)

- Login / authentication
- Patient-caregiver record linking
- Analytics dashboard
- AI features
- Role-based access control