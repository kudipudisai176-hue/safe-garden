import { randomUUID, createHmac, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

const backendDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(backendDir, ".env") });

const serviceDefinitions = [
  ["soil-testing", "Soil Testing", "SERVICE_PRICE_SOIL_TESTING_INR"],
  ["water-testing", "Water Testing", "SERVICE_PRICE_WATER_TESTING_INR"],
  ["gardening", "Gardening", "SERVICE_PRICE_GARDENING_INR"],
  ["lawn-maintenance", "Lawn Maintenance", "SERVICE_PRICE_LAWN_MAINTENANCE_INR"],
  ["field-maintenance", "Field Maintenance", "SERVICE_PRICE_FIELD_MAINTENANCE_INR"],
];

function configuredPrice(variable) {
  const raw = process.env[variable]?.trim();
  if (!raw) return null;
  const price = Number(raw);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(`${variable} must be a positive number of rupees.`);
  }
  return price;
}

const services = serviceDefinitions.map(([slug, title, priceVariable]) => ({
  _id: slug,
  slug,
  title,
  price: configuredPrice(priceVariable),
}));

const dataFile = path.resolve(backendDir, process.env.DATA_FILE || "./data/store.json");
const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("This origin is not allowed by the API."));
  },
}));
app.use(express.json({ limit: "16kb" }));

function validMobile(value) {
  return typeof value === "string" && /^[6-9]\d{9}$/.test(value);
}

function isNonEmptyString(value, minLength = 1) {
  return typeof value === "string" && value.trim().length >= minLength;
}

function validationErrors(fields) {
  return Object.entries(fields)
    .filter(([, valid]) => !valid)
    .map(([field]) => `${field} is invalid.`);
}

function sendValidationError(res, errors) {
  return res.status(400).json({ errors });
}

let store;
let writes = Promise.resolve();

async function persistStore() {
  const snapshot = JSON.stringify(store, null, 2);
  const temporaryFile = `${dataFile}.tmp`;
  writes = writes.then(async () => {
    await mkdir(path.dirname(dataFile), { recursive: true });
    await writeFile(temporaryFile, snapshot, "utf8");
    await rename(temporaryFile, dataFile);
  });
  return writes;
}

async function loadStore() {
  try {
    const saved = JSON.parse(await readFile(dataFile, "utf8"));
    return {
      bookings: Array.isArray(saved.bookings) ? saved.bookings : [],
      contacts: Array.isArray(saved.contacts) ? saved.contacts : [],
      paymentOrders: saved.paymentOrders && typeof saved.paymentOrders === "object"
        ? saved.paymentOrders
        : {},
    };
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error(`Could not read backend data file "${dataFile}": ${error.message}`);
    }
    return { bookings: [], contacts: [], paymentOrders: {} };
  }
}

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/services", (_req, res) => res.json({ services }));

app.post("/api/contact", async (req, res, next) => {
  const { fullName, mobile, message } = req.body || {};
  const errors = validationErrors({
    fullName: isNonEmptyString(fullName, 2),
    mobile: validMobile(mobile),
    message: isNonEmptyString(message, 5),
  });
  if (errors.length) return sendValidationError(res, errors);

  const contact = {
    _id: randomUUID(),
    fullName: fullName.trim(),
    mobile,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  store.contacts.push(contact);
  try {
    await persistStore();
    return res.status(201).json({ message: "Enquiry received.", contact });
  } catch (error) {
    store.contacts.pop();
    return next(error);
  }
});

app.post("/api/bookings", async (req, res, next) => {
  const { customerName, mobile, serviceSlug, location, preferredDate, message = "" } = req.body || {};
  const today = new Date().toISOString().slice(0, 10);
  const validDate = typeof preferredDate === "string"
    && /^\d{4}-\d{2}-\d{2}$/.test(preferredDate)
    && !Number.isNaN(Date.parse(`${preferredDate}T00:00:00Z`))
    && new Date(`${preferredDate}T00:00:00Z`).toISOString().slice(0, 10) === preferredDate
    && preferredDate >= today;
  const errors = validationErrors({
    customerName: isNonEmptyString(customerName, 2),
    mobile: validMobile(mobile),
    serviceSlug: services.some((service) => service.slug === serviceSlug),
    location: isNonEmptyString(location, 3),
    preferredDate: validDate,
    message: typeof message === "string" && message.length <= 2000,
  });
  if (errors.length) return sendValidationError(res, errors);

  const booking = {
    _id: randomUUID(),
    customerName: customerName.trim(),
    mobile,
    serviceSlug,
    location: location.trim(),
    preferredDate,
    message: message.trim(),
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
  };
  store.bookings.push(booking);
  try {
    await persistStore();
    return res.status(201).json({ booking });
  } catch (error) {
    store.bookings.pop();
    return next(error);
  }
});

app.post("/api/payments/create-order", async (req, res, next) => {
  const { bookingId } = req.body || {};
  if (!isNonEmptyString(bookingId)) {
    return sendValidationError(res, ["bookingId is required."]);
  }
  const booking = store.bookings.find((item) => item._id === bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  if (booking.paymentStatus === "paid") {
    return res.status(409).json({ message: "This booking has already been paid." });
  }

  const service = services.find((item) => item.slug === booking.serviceSlug);
  if (!service || !Number.isFinite(service.price)) {
    return res.status(503).json({ message: "Payment is unavailable until a price is configured for this service." });
  }
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!keyId || !keySecret) {
    return res.status(503).json({ message: "Online payment is not configured. Please contact the service provider." });
  }

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(service.price * 100),
        currency: "INR",
        receipt: booking._id,
        notes: { bookingId: booking._id, serviceSlug: booking.serviceSlug },
      }),
    });
    const order = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Razorpay order creation failed:", response.status, order.error?.description || "Unknown error");
      return res.status(502).json({ message: "Could not create a payment order. Please try again later." });
    }
    if (!order.id || !Number.isInteger(order.amount) || order.currency !== "INR") {
      throw new Error("Razorpay returned an invalid order.");
    }

    store.paymentOrders[order.id] = { bookingId: booking._id, amount: order.amount };
    await persistStore();
    return res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/payments/verify", async (req, res, next) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, bookingId } = req.body || {};
  const order = store.paymentOrders[orderId];
  if (!isNonEmptyString(orderId) || !isNonEmptyString(paymentId) || !isNonEmptyString(signature)
      || !isNonEmptyString(bookingId)) {
    return sendValidationError(res, ["Valid order, payment, signature, and booking IDs are required."]);
  }
  if (!order || order.bookingId !== bookingId) {
    return res.status(400).json({ message: "The payment order does not match this booking." });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!secret) return res.status(503).json({ message: "Payment verification is not configured." });
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest();
  let received;
  try {
    received = Buffer.from(signature, "hex");
  } catch {
    received = Buffer.alloc(0);
  }
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return res.status(400).json({ message: "Payment signature verification failed." });
  }

  const booking = store.bookings.find((item) => item._id === bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  if (booking.paymentStatus === "paid" && booking.paymentId !== paymentId) {
    return res.status(409).json({ message: "A different payment has already been recorded for this booking." });
  }

  const previous = { paymentStatus: booking.paymentStatus, paymentId: booking.paymentId, paidAt: booking.paidAt };
  booking.paymentStatus = "paid";
  booking.paymentId = paymentId;
  booking.paidAt = new Date().toISOString();
  try {
    await persistStore();
    return res.json({ message: "Payment verified.", booking });
  } catch (error) {
    Object.assign(booking, previous);
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must contain valid JSON." });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large." });
  }
  console.error("API request failed:", error);
  return res.status(500).json({ message: "The server could not complete this request." });
});

const port = Number(process.env.PORT || 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

store = await loadStore();
await mkdir(path.dirname(dataFile), { recursive: true });
app.listen(port, () => {
  console.log(`SAFE API listening on http://localhost:${port}`);
  console.log(`Persistent data: ${dataFile}`);
});
