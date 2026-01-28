# Dashboard Assessment

Simple React + Vite dashboard used for the assessment exercise. This project demonstrates a small UI for visualizing call logs, appointments, and usage statistics.

**Quick Summary**
- **Purpose:** Front-end assessment dashboard for displaying metrics, charts, and recent activity.
- **Stack:** React, Vite, Recharts, simple state stores (hooks/stores), CSS for styling.

**Features**
- Interactive charts for call trends.
- Stat cards and recent activity feed.
- Pages for Appointments and Call Logs with local JSON data.

**Local Setup**
1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

**Project Structure (key files)**
- **Source:** [src/](src/)
  - **Pages:** [src/pages](src/pages) — Appointments, CallLogs, DashboardOverview, Settings.
  - **Layouts:** [src/layouts/DashboardLayout.jsx](src/layouts/DashboardLayout.jsx)
  - **Components:** [src/components](src/components) — Chart, StatCard, CallLogCard.
  - **Stores:** [src/stores](src/stores) — `useAppointmentStore.js`, `useCallLogStore.js`.
- **Public data:** [public/](public/) — `dashboardData.json`, `callLogsData.json`, `appointmentsData.json`.

**Notes**
- Charts are implemented using Recharts (installed as a dependency).
- The app uses local JSON under `public/` to simulate backend data for the assessment.

**Next steps / Suggestions**
- Add tests for key components.
- Replace local JSON with a mock API or real backend when available.
- Improve accessibility and add keyboard navigation for interactive elements.

**License**
This repository is provided for assessment purposes.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
