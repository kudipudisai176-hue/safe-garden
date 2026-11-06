import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, CreditCard, Loader2, AlertCircle } from "lucide-react";
import { api } from "../lib/api";
import { payForBooking } from "../lib/razorpay";

const today = () => new Date().toISOString().split("T")[0];

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number.";
  if (!f.serviceSlug) e.serviceSlug = "Choose a service.";
  if (f.location.trim().length < 3) e.location = "Enter the service location.";
  if (!f.preferredDate) e.preferredDate = "Choose a date.";
  return e;
}

export default function BookingModal({ service, services, onClose }) {
  const [form, setForm] = useState({
    name: "", phone: "", serviceSlug: service.slug, location: "", preferredDate: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("form"); // form | submitting | booked
  const [booking, setBooking] = useState(null);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "error" | "info", text }

  const chosen = services.find((s) => s.slug === form.serviceSlug) || service;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStage("submitting"); setNotice(null);
    try {
      const res = await api.createBooking({
        customerName: form.name.trim(), mobile: form.phone, serviceSlug: form.serviceSlug,
        location: form.location.trim(), preferredDate: form.preferredDate, message: form.message.trim(),
      });
      setBooking(res.booking || res.data);
      setStage("booked");
    } catch (err) {
      setNotice({ type: "error", text: err.message });
      setStage("form");
    }
  };

  const pay = async () => {
    setPaying(true); setNotice(null);
    try {
      const r = await payForBooking({
        bookingId: booking._id || booking.id, name: form.name, phone: form.phone, serviceTitle: chosen.title,
      });
      if (r.status === "success") setPaid(true);
      else setNotice({ type: "info", text: "Payment window closed. You can pay any time using the button below." });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally { setPaying(false); }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-forest-dark/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="booking-title"
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between">
          <h3 id="booking-title" className="font-display text-2xl font-bold text-black">
            {stage === "booked" ? "Booking received" : `Book ${chosen.title}`}
          </h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-forest hover:bg-forest/10"><X size={20} /></button>
        </div>

        {notice && (
          <p role="alert" className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
            notice.type === "error" ? "bg-red-50 text-red-700" : "bg-gold/15 text-forest-dark"}`}>
            <AlertCircle size={16} className="mt-0.5 shrink-0" /> {notice.text}
          </p>
        )}

        {stage !== "booked" ? (
          <form onSubmit={submit} noValidate className="mt-5 space-y-4">
            <Field label="Customer Name" error={errors.name}>
              <input className="field" value={form.name} onChange={set("name")} autoComplete="name" />
            </Field>
            <Field label="Mobile Number" error={errors.phone}>
              <input className="field" inputMode="numeric" maxLength={10} value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))} autoComplete="tel-national" />
            </Field>
            <Field label="Selected Service" error={errors.serviceSlug}>
              <select className="field" value={form.serviceSlug} onChange={set("serviceSlug")}>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              </select>
            </Field>
            <Field label="Location" error={errors.location}>
              <input className="field" value={form.location} onChange={set("location")} placeholder="Village / area, city" />
            </Field>
            <Field label="Preferred Date" error={errors.preferredDate}>
              <input type="date" className="field" min={today()} value={form.preferredDate} onChange={set("preferredDate")} />
            </Field>
            <Field label="Additional Message (optional)">
              <textarea rows={3} className="field resize-none" value={form.message} onChange={set("message")} />
            </Field>
            <button disabled={stage === "submitting"} className="btn btn-green w-full disabled:opacity-60">
              {stage === "submitting" ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : "Confirm Booking"}
            </button>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <CheckCircle2 size={52} className="mx-auto text-leaf" />
            <p className="mt-3 text-forest-dark">
              Thank you, {form.name.trim().split(" ")[0]}. Your request for <strong>{chosen.title}</strong> on{" "}
              <strong>{form.preferredDate}</strong> has been saved. We will contact you on {form.phone}.
            </p>
            {paid ? (
              <p className="mt-5 rounded-xl bg-leaf-light p-3 text-sm font-semibold text-forest">
                Payment verified and recorded. Thank you!
              </p>
            ) : typeof chosen.price === "number" ? (
              <button onClick={pay} disabled={paying} className="btn btn-gold mt-6 w-full disabled:opacity-60">
                {paying ? <><Loader2 size={18} className="animate-spin" /> Processing…</>
                  : <><CreditCard size={18} /> Pay Now · ₹{chosen.price.toLocaleString("en-IN")}</>}
              </button>
            ) : null}
            <button onClick={onClose} className="mt-3 text-sm font-semibold text-forest underline underline-offset-4">Close</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
