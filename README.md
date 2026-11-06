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

`VITE_WHATSAPP_NUMBER` must contain digits only, including the country code. The testing request form validates the fields, saves the request through the backend contact endpoint, then opens WhatsApp with a prefilled message. The customer must tap **Send** in WhatsApp to message the laboratory. For a deployed frontend, set `VITE_API_URL` to the backend URL and configure the backend `CLIENT_ORIGINS` to allow the frontend's origin.

## Images

The hero, Soil Testing, and Water Testing sections use images in `public/images/`. Replace those files to update the photos while keeping the configured paths in `src/config/site.js`.

The backend stores requests in `backend/data/store.json`. Existing booking and payment endpoints remain available for the older service flow.
