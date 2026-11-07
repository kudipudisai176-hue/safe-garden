# SAFE – Soil & Water Testing Laboratory

The responsive laboratory website is built with React, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```powershell
npm install
npm install --prefix backend
npm run backend
```

In a second terminal:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal. The React app needs Vite; opening `index.html` directly with Live Server will not compile its JSX.

## Configure laboratory contact details

Set these frontend environment variables (for example, in a root `.env` file) before running Vite:

```env
VITE_CONTACT_PHONE=8497957002
VITE_CONTACT_EMAIL=info.safeagro@gmail.com
VITE_CONTACT_ADDRESS=
VITE_WHATSAPP_NUMBER=918497957002
```

`VITE_WHATSAPP_NUMBER` must contain digits only, including the country code. The testing request form validates the fields, saves the request through the backend contact endpoint, then opens WhatsApp with a prefilled message. The customer must tap **Send** in WhatsApp to message the laboratory.

For production, deploy the Express backend as a separate service, set the frontend's `VITE_API_URL` to its public base URL in the Vercel project settings, and set the backend's `CLIENT_ORIGINS` to the exact deployed frontend origin (for example, `https://safe-garden-rho.vercel.app`). Since Vite embeds `VITE_API_URL` at build time, redeploy the frontend after changing it. Verify the backend responds with `{"status":"ok"}` at `/api/health`. If the backend is unavailable, the request form offers a direct WhatsApp fallback and clearly states that the website could not save the request.

## Images

The hero, Soil Testing, and Water Testing sections use images in `public/images/`. Replace those files to update the photos while keeping the configured paths in `src/config/site.js`.

The backend stores requests in `backend/data/store.json`. Existing booking and payment endpoints remain available for the older service flow.
