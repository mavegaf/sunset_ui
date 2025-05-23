# 🌇 Sunset UI

A React + Vite application that lets you search for a city and view the **sunrise**, **sunset**, and **golden hour** times for a selected date range.

> Built with **Vite**, **React**, **Tailwind CSS**, **shadcn/ui**, and **Recharts**.

---

## ✨ Features

- 🔍 Search for cities using [Nominatim (OpenStreetMap)](https://nominatim.org/)
- 📅 Select a date range with a custom Date Range Picker
- 📋 Display a list of possible city matches if multiple exist
- 📈 Line chart showing:
  - Sunrise time
  - Sunset time
  - Golden hour time

---

## 🚀 Getting Started

```bash
# Install dependencies (USE --legacy-peer-deps, see: https://ui.shadcn.com/docs/react-19#recharts)
npm install --legacy-peer-deps

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

> ⚠️ Requires a backend running on `http://localhost:3000`.

---

## 🔗 Backend

The frontend calls an API endpoint like:

```
GET /suntimes?lat=<lat>&lng=<lng>&date_start=<YYYY-MM-DD>&date_end=<YYYY-MM-DD>
```

It expects a JSON response with:

```json
[
  {
    "date": "2025-01-01",
    "sunrise": "07:28:04 AM",
    "sunset": "04:57:51 PM",
    "golden_hour": "04:16:06 PM"
  }
]
```

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── chart-sun-data.tsx        ← Chart for sunrise/sunset/golden hour
│   ├── date-picker-with-range.tsx
│   └── ui/                        ← shadcn/ui components
├── App.tsx
├── main.tsx
└── index.css                     ← Tailwind + design tokens
```

---

## 🧠 Decisions Made

- Since the backend relies on [`https://api.sunrisesunset.io`](https://api.sunrisesunset.io) and always requires a latitude and longitude, I decided to use **Nominatim** to convert user-entered locations into lat/lng coordinates.

- Since a location name (e.g., "Santiago") may return **multiple matches worldwide**, I added an **intermediate step** where the user selects the specific city from a list of matching results before fetching sun data.

---
