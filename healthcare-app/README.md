# Healthcare App

A full-stack healthcare registration platform built with React + Vite (frontend) and Node.js + Express (backend), using MongoDB Atlas as the database.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A [Render](https://render.com/) account (backend deployment)
- A [Vercel](https://vercel.com/) account (frontend deployment)

---

## Project Structure

```
healthcare-app/
├── client/   # React + Vite frontend
└── server/   # Node.js + Express backend
```

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd healthcare-app
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/` (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account.
2. Create a new **Project** and then a new **Cluster** (the free M0 tier works fine).
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` to allow all IPs — required for Render).
5. Click **Connect** on your cluster, choose **Connect your application**, and copy the connection string.
6. Replace `<username>`, `<password>`, and `<dbname>` in the connection string with your values.
7. Use this connection string as the `MONGO_URI` environment variable.

---

## Deploying the Backend to Render

1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository and select the repo.
4. Configure the service:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Environment:** `Node`
5. Add the following **Environment Variables** in the Render dashboard:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `5000` (Render may override this automatically) |
   | `CLIENT_URL` | Your Vercel frontend URL (e.g. `https://your-app.vercel.app`) |
6. Click **Create Web Service**. Render will build and deploy the backend.
7. Note the service URL (e.g. `https://your-app.onrender.com`) — you'll need it for the frontend.

---

## Deploying the Frontend to Vercel

1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Import your GitHub repository.
3. Configure the project:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the following **Environment Variable** in the Vercel dashboard:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your Render backend URL (e.g. `https://your-app.onrender.com`) |
5. Click **Deploy**. Vercel will build and publish the frontend.

---

## Environment Variables Reference

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/healthcare` |
| `PORT` | Port the server listens on | `5000` |
| `CLIENT_URL` | Frontend origin for CORS | `https://your-app.vercel.app` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://your-app.onrender.com` |

---

## Notes

- The backend uses CORS configured to only allow requests from `CLIENT_URL`. Make sure this is set correctly in production.
- Render's free tier spins down after inactivity — the first request after idle may take ~30 seconds.
- All environment variables prefixed with `VITE_` are embedded at build time by Vite and exposed to the browser. Do not store secrets in `VITE_` variables.
