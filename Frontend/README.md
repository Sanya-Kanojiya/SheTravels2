# SheTravels AI

Frontend mini-project: an AI safety and travel companion for solo women.

**Stack:** React, Vite, Tailwind CSS, React Router, Lucide icons.

This is frontend-only. Login, AI itineraries, SOS, and admin actions use mock data.

## Run

```bash
npm install
npm run dev
```

## Demo accounts

- Any email + password signs in as a traveller.
- Email containing `admin` (for example `admin@shetravels.ai`) opens the admin desk.

## Routes

Public: `/` `/about` `/login` `/register`

App: `/dashboard` `/trips` `/trips/create` `/trips/:id` `/ai-planner` `/safety` `/emergency-contacts` `/packing` `/community` `/memories` `/profile` `/settings`

Admin: `/admin` `/admin/users` `/admin/reports`
