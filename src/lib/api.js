const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = Array.isArray(data.errors) ? data.errors.join(" ") : "";
    throw new Error(detail || data.message || "Something went wrong. Please try again.");
  }
  return data;
}

const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });

export const api = {
  getServices: () => request("/api/services"),
  sendContact: (payload) => post("/api/contact", payload),
  createBooking: (payload) => post("/api/bookings", payload),
  createOrder: (bookingId) => post("/api/payments/create-order", { bookingId }),
  verifyPayment: (payload) => post("/api/payments/verify", payload),
};
