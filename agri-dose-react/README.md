# AgriDose — React frontend

Fertilizer & Pesticide Dosage Calculator — login/register + dashboard, built with React + Vite + React Router.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build a production bundle:

```bash
npm run build
npm run preview
```

## What's inside

- `src/pages/Login.jsx`, `Register.jsx` — auth screens
- `src/pages/Dashboard.jsx` — sidebar app: Fertilizer dose, Pesticide dose, Leaf disease scan, History tabs
- `src/utils/auth.js` — accounts/session stored in `localStorage` (demo only — swap for real API calls when a backend exists)
- `src/data/reference.js` — reference dosage tables and history helpers
- `src/data/diseaseData.js` — leaf disease reference database (symptoms, linked fertilizer/pesticide, reference photo path)
- `src/utils/imageAnalysis.js` — demo colour-heuristic "detection" — replace with a real trained model when ready (see note below)
- `src/index.css` — shared design system (colors, type, components)

## Leaf disease scan (demo)

The Disease Scan tab lets you upload a leaf photo and get a suggested fertilizer/pesticide.
Right now the "detection" is a simple colour-based heuristic that runs entirely in the
browser (`src/utils/imageAnalysis.js`) — good enough to demo the full upload → detect →
suggest flow, but **not** a trained model, so don't rely on it for real diagnosis.

To make it real:
1. Collect/label real sample photos per disease and drop them into `public/disease-images/`
   using the filenames listed in that folder's README — the gallery picks them up automatically.
2. Train (or export from Google's Teachable Machine, the fastest path for a student project)
   an image-classification model, and swap the body of `classifyByColour()` for a call to it —
   either a client-side model (TensorFlow.js) or a POST to a backend API that returns a disease ID.
3. Everything downstream (the suggestion lookup, history logging) already works off a `diseaseId`,
   so no other code needs to change.

## Notes

- Accounts are per-browser (localStorage), so register once, then log in with the same email/password.
- Dosage reference values are approximate and for demo purposes — not a substitute for a soil test or agronomist advice.
