# QLP — Question List Preparation App

A web app that helps cancer patients and caregivers build personalised question lists before doctor consultations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MongoDB (local) |
| Auth | JWT + Google OAuth 2.0 |
| PDF | Puppeteer |

---

## Prerequisites — Install these first

1. **Node.js** (v18 or higher) → https://nodejs.org  
   After install, confirm: `node -v`

2. **MongoDB Community** → https://www.mongodb.com/try/download/community  
   After install, confirm it's running: `net start MongoDB` (Windows)

3. **Git** → https://git-scm.com

---

## Step-by-Step Setup

### Step 1 — Clone the repo

```bash
git clone https://github.com/garvagrawalhere/Web-based-intervention-prototype-for-health-communication.git
cd Web-based-intervention-prototype-for-health-communication
```

---

### Step 2 — Set up Google OAuth credentials

You need a Google account to do this.

1. Go to → https://console.cloud.google.com
2. Click **"Select a project"** → **"New Project"** → name it `QLP` → **Create**
3. In the left menu go to **APIs & Services → OAuth consent screen**
   - Choose **External** → **Create**
   - Fill **App name**: `QLP`, **User support email**: your email
   - Scroll down, click **Save and Continue** (skip all other sections)
   - On the last screen click **Back to Dashboard**
4. Go to **APIs & Services → Credentials**
5. Click **"+ Create Credentials"** → **"OAuth client ID"**
   - Application type: **Web application**
   - Name: `QLP Dev`
   - Under **Authorised JavaScript origins** click **+ Add URI**:
     ```
     http://localhost:5173
     ```
   - Under **Authorised redirect URIs** click **+ Add URI**:
     ```
     http://localhost:5000/api/auth/google/callback
     ```
   - Click **Create**
6. A popup appears with:
   ```
   Your Client ID:     123456789-xxxx.apps.googleusercontent.com
   Your Client Secret: GOCSPX-xxxxxxxxxxxxxxx
   ```
   **Copy both — you'll need them in Step 4.**

---

### Step 3 — Install backend dependencies

Open a terminal:

```bash
cd backend
npm install
```

---

### Step 4 — Create the backend `.env` file

Still in the `backend/` folder:

```bash
cp .env.example .env
```

Now open `backend/.env` in any text editor and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/qlp
JWT_ACCESS_SECRET=any_long_random_string_at_least_32_chars
JWT_REFRESH_SECRET=another_different_long_random_string
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
GOOGLE_CLIENT_ID=paste_your_client_id_from_step_2_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_from_step_2_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> For `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`, just type any long random string (e.g. `mysecretkey_abc123xyz_qwerty_9876`). These are used to sign login tokens — keep them secret.

---

### Step 5 — Seed the database with questions

Still in the `backend/` folder:

```bash
node scripts/seed.js
```

You should see output like:
```
Connected to MongoDB
Seeding diseases...  ✔ 8 diseases inserted
Seeding categories... ✔ 6 categories inserted
Seeding questions...  ✔ 608 questions inserted
Done!
```

---

### Step 6 — Start the backend server

Still in the `backend/` folder:

```bash
npm run dev
```

You should see:
```
QLP Backend running on http://localhost:5000
MongoDB Connected: localhost
```

**Leave this terminal open.**

---

### Step 7 — Install frontend dependencies

Open a **second terminal** (keep the first one running):

```bash
cd frontend
npm install
```

---

### Step 8 — Start the frontend

Still in the `frontend/` folder:

```bash
npm run dev
```

You should see:
```
VITE v8.x.x  ready in 1000 ms
➜  Local:   http://localhost:5173/
```

Open your browser and go to → **http://localhost:5173**

---

### Step 9 — Make yourself an admin (optional)

To access the admin panel at `/admin`, your account needs the `admin` role.

1. First, sign up at `http://localhost:5173/signup` with your email
2. Then run this in the `backend/` terminal (open a new one if needed):

```bash
node scripts/make-admin.js your@email.com
```

You should see:
```
Connected to MongoDB
SUCCESS: your@email.com is now an admin! Log out and log back in.
```

3. Log out and log back in on the website
4. Visit `http://localhost:5173/admin`

---

## Folder Structure

```
QLP/
├── backend/              # Express API server
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth, error handling
│   ├── scripts/          # seed.js, make-admin.js
│   ├── utils/            # JWT, logger
│   ├── .env.example      # Template — copy to .env
│   └── server.js         # Entry point
│
└── frontend/             # React + Vite app
    ├── src/
    │   ├── api/          # React Query hooks
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page components
    │   ├── store/        # Zustand state
    │   └── validation/   # Zod schemas
    └── index.html
```

---

## Daily Startup (after first setup)

Every time you come back to work on this:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open → **http://localhost:5173**

---

## Adding New Questions

**Option A — Admin panel (1–10 questions):**  
Log in as admin → go to `/admin/questions` → click "New Question"

**Option B — Bulk via seed script (many questions):**  
Edit `backend/scripts/seed.js` → add to the relevant array → run `node scripts/seed.js`

---

## License

MIT
