# Work Productivity Dashboard (Full-Stack)

Production-quality full-stack dashboard to manage daily work logs and analyze productivity trends.

## Stack

- Frontend: React (Vite), TypeScript, Tailwind CSS, shadcn-style UI primitives, Recharts, Axios, React Router, Sonner toasts
- Backend: FastAPI, Motor (async MongoDB), Pydantic, python-dotenv
- Database: MongoDB

## Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── router.py
│   │   │   └── v1/work_logs.py
│   │   ├── config/settings.py
│   │   ├── database/mongodb.py
│   │   ├── models/work_log_model.py
│   │   ├── schemas/work_log.py
│   │   ├── services/work_log_service.py
│   │   ├── utils/{exceptions.py,serializers.py}
│   │   └── main.py
│   ├── .env.example
│   ├── requirements.txt
│   └── main.py
├── frontend
│   ├── src
│   │   ├── charts
│   │   ├── components
│   │   ├── constants
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
└── .env.example
```

## Features

- Daily work log form with dynamic add/remove/edit task entries
- Work log CRUD APIs with validation and proper status codes
- Dashboard analytics:
  - Bar chart (hours per day)
  - Clickable bars opening task-details modal
  - Modal table for day tasks
  - Pie chart for time spent per collaborator
- Statistics cards:
  - Total hours this week
  - Total completed tasks
  - Average daily productivity
  - Completion percentage
- Loading states, empty states, toasts, and responsive dark UI

## Setup Commands

### 0) From-Scratch Scaffold Commands

```bash
# Frontend
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init
npm install axios react-router-dom recharts sonner lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-dialog

# Backend
cd ..
mkdir -p backend && cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn[standard] motor pydantic pydantic-settings python-dotenv pymongo
```

### 1) Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env
```

Start MongoDB locally (example):

```bash
mongod --dbpath /path/to/mongodb-data
```

Run backend:

```bash
uvicorn main:app --reload --port 8000
```

Health check:

```bash
curl http://localhost:8000/health
```

### 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Deployment Checklist (Render + Vercel)

### Backend on Render

1. Create a Web Service from this repo with `Root Directory = backend` (or use `render.yaml` in repo root).
2. Build command:
   - `pip install -r requirements.txt`
3. Start command:
   - `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set Render environment variables:
   - `APP_ENV=production`
   - `API_V1_PREFIX=/api/v1`
   - `MONGO_URI=<your Atlas URI>`
   - `MONGO_DB_NAME=work_dashboard`
   - `FRONTEND_ORIGINS=https://<your-vercel-domain>`
   - Optional for Vercel previews: `FRONTEND_ORIGIN_REGEX=https://.*\\.vercel\\.app`
5. Health check path:
   - `/health`

### Frontend on Vercel

1. Set project root directory to `frontend`.
2. Add env variable:
   - `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api/v1`
3. Build command:
   - `npm run build`
4. Output directory:
   - `dist`
5. `frontend/vercel.json` is included for SPA route rewrite to `index.html`.

### Must-Do Security

1. Rotate MongoDB password if it has ever been shared in plain text.
2. Keep `.env` files out of git (already ignored).
3. In Atlas, configure database user permissions minimally and set network access intentionally.

## Environment Variables

### Backend (`backend/.env`)

```env
APP_NAME=Work Productivity Dashboard API
APP_ENV=development
API_V1_PREFIX=/api/v1
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=work_dashboard
FRONTEND_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## API Endpoints

Base: `http://localhost:8000/api/v1`

- `POST /work-logs` - Create work log
- `GET /work-logs` - Get all work logs
- `GET /work-logs/{log_id}` - Get one work log
- `PUT /work-logs/{log_id}` - Update work log
- `DELETE /work-logs/{log_id}` - Delete work log

## MongoDB Document Shape

```json
{
  "date": "2026-05-07",
  "totalOfficeHours": 9,
  "entries": [
    {
      "personWorkedWith": "Rahul",
      "taskDescription": "API Integration",
      "hoursSpent": 3,
      "completed": true
    }
  ]
}
```

## Architecture Decisions

- Clean backend layering:
  - `api` for transport layer
  - `schemas` for Pydantic validation contracts
  - `services` for business rules
  - `database` for infra concerns
  - `utils` for serialization and shared exceptions
- Frontend modularization:
  - `services` for API isolation
  - `hooks` for state/business logic
  - `charts` and `components` for reusable view blocks
  - `layouts/pages` for route composition
- API-first integration with a typed interface to keep UI decoupled from backend implementation details.

## Production Hardening Ideas (Next)

1. Add authentication/authorization (JWT or session + RBAC).
2. Add structured logging, tracing, and request IDs.
3. Add test suites:
   - Backend: `pytest` + `httpx` + async fixtures
   - Frontend: `vitest` + React Testing Library
4. Add caching and pagination for larger datasets.
5. Add CI/CD with lint, typecheck, tests, and deployment pipelines.
6. Add rate limiting and API security middleware.
7. Split service layer into domain/use-case modules as the app scales.
