# orangi CRM

Modern responsive CRM dashboard built with React, Vite, React Router, Recharts, and Lucide React.

## Included

- Responsive CRM dashboard with animated widgets
- Leads management with search, status filters, AI scores, and add-lead modal
- Companies, contacts, deals, tasks, reports, automation, AI insights, analytics, calendar, inbox, workspace, and settings routes
- Clickable records with detail dialogs
- Skippable login screen
- Responsive sidebar with collapse behavior
- Production-ready static build

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Validate and build

```bash
npm run lint
npm run build
```

The production output is generated in `dist/`.

## Import into Lovable

1. Push the contents of this `crm-react` folder to a GitHub repository.
2. In Lovable, choose **Import from GitHub**.
3. Select the repository and use the repository root as the project directory.
4. Use the following commands if Lovable asks for them:
   - Install: `npm install`
   - Development: `npm run dev -- --host 0.0.0.0`
   - Build: `npm run build`
   - Output directory: `dist`

This is a Vite single-page application. Configure the hosting provider to serve `index.html` as the fallback for client-side routes such as `/dashboard`, `/leads`, and `/settings`.

## Current data model

The current interface uses mock in-memory data so it can be imported and previewed immediately. Records created during a session are not persisted after a page refresh. Connect a database and authentication provider in Lovable when moving to production.
