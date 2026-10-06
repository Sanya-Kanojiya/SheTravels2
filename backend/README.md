# SheTravels AI — Backend

Express + MongoDB API for the SheTravels AI frontend.

## Setup

1. Copy `.env.example` to `.env` if needed.
2. Put your MongoDB Atlas connection string in `MONGO_URI`.
3. Keep `JWT_SECRET` private. Leave `AI_API_KEY` empty to use built-in fallback itineraries.

```bash
cd backend
npm install
npm run dev
```

API base: `http://localhost:5000/api`

Health check: `GET http://localhost:5000/api/health`

## Admin account

Register with the email in `ADMIN_EMAIL` (default `admin@shetravels.ai`) to get the admin role.

## Notes

- SOS is simulated. It does not call emergency services.
- If `AI_API_KEY` is missing, trip and packing generation still return realistic mock plans.
