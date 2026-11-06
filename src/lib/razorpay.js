import { api } from "./api";
import { company } from "../config/site";

function loadCheckout() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error("Could not load Razorpay. Check your connection."));
    document.body.appendChild(s);
  });
}

/**
 * Opens Razorpay checkout for a booking.
 * Success is only reported after the BACKEND verifies the signature.
 * Resolves { status: "success" | "dismissed" }, rejects with an Error on failure.
 */
export async function payForBooking({ bookingId, name, phone, serviceTitle }) {
  await loadCheckout();
  const order = await api.createOrder(bookingId); // { orderId, amount, currency, keyId }

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.keyId, // public key id only; the secret never reaches the browser
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: `${company.brand} – ${company.fullName}`,
      description: serviceTitle,
      prefill: { name, contact: phone },
      theme: { color: "#14452F" },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
      handler: async (response) => {
        try {
          await api.verifyPayment({ ...response, bookingId });
          resolve({ status: "success" });
        } catch (err) {
          reject(err);
        }
      },
    });
    rzp.on("payment.failed", (r) =>
      reject(new Error(r?.error?.description || "Payment failed. You have not been charged."))
    );
    rzp.open();
  });
}
