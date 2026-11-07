import { useState } from "react";
import { AlertCircle, CalendarDays, Loader2, MessageCircle } from "lucide-react";
import { company } from "../config/site";
import { api } from "../lib/api";
import Reveal from "./Reveal";

const soilRequestParameters = [
  { name: "Macro nutrients" },
  { name: "Micro nutrients" },
  { name: "pH" },
  { name: "EC" },
  { name: "OC" },
];

const today = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
};

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  village: "",
  mandal: "",
  district: "",
  sampleType: "Soil",
  parameters: [],
  collectionDate: "",
  message: "",
};

export default function TestingRequest() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [requestError, setRequestError] = useState("");
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setWhatsappFallbackUrl("");
  };

  const toggleParameter = (name) => {
    setForm((current) => ({
      ...current,
      parameters: current.parameters.includes(name)
        ? current.parameters.filter((parameter) => parameter !== name)
        : [...current.parameters, name],
    }));
    setErrors((current) => ({ ...current, parameters: "" }));
    setWhatsappFallbackUrl("");
  };

  const chooseSampleType = (sampleType) => {
    setForm((current) => ({ ...current, sampleType, parameters: [] }));
    setErrors((current) => ({ ...current, parameters: "" }));
    setWhatsappFallbackUrl("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) nextErrors.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!form.village.trim()) nextErrors.village = "Enter your village.";
    if (!form.mandal.trim()) nextErrors.mandal = "Enter your mandal.";
    if (!form.district.trim()) nextErrors.district = "Enter your district.";
    if (form.sampleType === "Soil" && form.parameters.length === 0) {
      nextErrors.parameters = "Select at least one testing parameter.";
    }
    if (!form.collectionDate) nextErrors.collectionDate = "Choose a sample collection date.";
    if (form.collectionDate && form.collectionDate < today()) nextErrors.collectionDate = "Choose today or a future date.";
    setErrors(nextErrors);
    setNotice("");
    setRequestError("");
    setWhatsappFallbackUrl("");
    if (Object.keys(nextErrors).length) return;

    const requestDetails = [
      "LABORATORY TESTING REQUEST",
      "",
      `Customer: ${form.name.trim()}`,
      `Mobile: ${form.phone.trim()}`,
      `Email: ${form.email.trim()}`,
      `Village: ${form.village.trim()}`,
      `Mandal: ${form.mandal.trim()}`,
      `District: ${form.district.trim()}`,
      `Sample type: ${form.sampleType}`,
      `Selected parameters: ${form.parameters.length ? form.parameters.join(", ") : "No parameter selection (Water Testing)"}`,
      `Sample collection date: ${form.collectionDate}`,
      `Additional message: ${form.message.trim() || "None"}`,
    ].join("\n");
    const whatsappNumber = company.whatsappNumber.replace(/\D/g, "");
    if (!whatsappNumber) {
      setRequestError("WhatsApp contact is not configured. Please contact the laboratory.");
      return;
    }
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(requestDetails)}`;

    setSubmitting(true);
    try {
      await api.sendContact({
        fullName: form.name.trim(),
        mobile: form.phone.trim(),
        message: requestDetails,
      });
      window.location.assign(whatsappUrl);
    } catch (error) {
      setRequestError(error.message);
      setWhatsappFallbackUrl(whatsappUrl);
      setSubmitting(false);
    }
  };

  return (
    <section id="request" className="scroll-mt-20 bg-brand-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Get started</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Request a Laboratory Test</h2>
          <p className="mt-4 leading-7 text-white/70">Tell us about your sample and the testing you need. We’ll prepare an email request for you to review and send.</p>
        </Reveal>

        <Reveal delay={0.08} className="glass-card mx-auto mt-10 max-w-4xl rounded-[1.75rem] p-5 text-stone-800 sm:p-8 lg:p-10">
          <form onSubmit={submit} noValidate className="space-y-7">
            {requestError && (
              <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
                <AlertCircle size={18} className="mt-0.5 shrink-0" /> {requestError}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="request-name" label="Customer Name" error={errors.name}>
                <input id="request-name" className="field" name="name" autoComplete="name" value={form.name} onChange={update("name")} />
              </Field>
              <Field id="request-phone" label="Mobile Number" error={errors.phone}>
                <input id="request-phone" className="field" name="phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national"
                  value={form.phone} onChange={(event) => {
                    setForm((current) => ({ ...current, phone: event.target.value.replace(/\D/g, "") }));
                    setErrors((current) => ({ ...current, phone: "" }));
                    setWhatsappFallbackUrl("");
                  }} />
              </Field>
              <Field id="request-email" label="Email Address" error={errors.email}>
                <input id="request-email" className="field" name="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} />
              </Field>
              <Field id="request-village" label="Village" error={errors.village}>
                <input id="request-village" className="field" name="village" autoComplete="address-level3" value={form.village} onChange={update("village")} />
              </Field>
              <Field id="request-mandal" label="Mandal" error={errors.mandal}>
                <input id="request-mandal" className="field" name="mandal" value={form.mandal} onChange={update("mandal")} />
              </Field>
              <Field id="request-district" label="District" error={errors.district}>
                <input id="request-district" className="field" name="district" autoComplete="address-level2" value={form.district} onChange={update("district")} />
              </Field>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-bold text-stone-800">Sample Type</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Soil", "Water"].map((type) => (
                  <label key={type} className={`glass-option flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                    form.sampleType === type ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-stone-200 hover:border-brand-300"
                  }`}>
                    <input type="radio" name="sampleType" value={type} checked={form.sampleType === type}
                      onChange={() => chooseSampleType(type)} className="h-4 w-4 accent-brand-800" />
                    <span className="text-sm font-semibold">{type} Testing</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {form.sampleType === "Soil" ? (
              <fieldset>
                <legend className="mb-1 text-sm font-bold text-stone-800">Select Testing Parameters</legend>
                <p className="mb-3 text-xs text-stone-500">Choose one or more soil tests.</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {soilRequestParameters.map(({ name, detail }) => (
                    <label key={name} className={`glass-option flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 ${
                      form.parameters.includes(name) ? "border-brand-600 bg-brand-50" : "border-stone-200 hover:border-brand-300"
                    }`}>
                      <input type="checkbox" checked={form.parameters.includes(name)} onChange={() => toggleParameter(name)}
                        className="h-4 w-4 rounded accent-brand-800" />
                      <span>
                        <span className="block text-sm font-semibold text-stone-800">{name}</span>
                        {detail && <span className="block text-[11px] text-stone-500">{detail}</span>}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.parameters && <p role="alert" className="mt-2 text-xs text-red-700">{errors.parameters}</p>}
              </fieldset>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="request-date" label="Sample Collection Date" error={errors.collectionDate}>
                <div className="relative">
                  <input id="request-date" className="field pr-11" name="collectionDate" type="date" min={today()}
                    value={form.collectionDate} onChange={update("collectionDate")} />
                  <CalendarDays size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
              </Field>
              <Field id="request-message" label="Additional Message (optional)">
                <textarea id="request-message" className="field min-h-[48px] resize-y" name="message" rows={2}
                  value={form.message} onChange={update("message")} />
              </Field>
            </div>

            <div>
              <button type="submit" disabled={submitting}
                className="glass-action inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-900 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                {submitting ? <><Loader2 size={17} className="animate-spin" /> Saving request…</>
                  : <><MessageCircle size={17} /> Send Request on WhatsApp</>}
              </button>
              {whatsappFallbackUrl && (
                <a href={whatsappFallbackUrl} target="_blank" rel="noreferrer"
                  className="glass-action mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-800 px-6 py-3.5 text-sm font-bold text-brand-900 hover:bg-brand-50 sm:ml-3 sm:mt-0 sm:w-auto">
                  <MessageCircle size={17} /> Send directly via WhatsApp
                </a>
              )}
              {notice && <p role="status" className="mt-3 text-sm text-brand-800">{notice}</p>}
              <p className="mt-3 text-xs leading-5 text-stone-500">
                {whatsappFallbackUrl
                  ? "The request was not saved on this website because its server is unavailable. Use the WhatsApp button above to send it directly; tap Send in WhatsApp to message the laboratory."
                  : "Your request is saved by the laboratory backend first, then WhatsApp opens with the details ready to send. Tap Send in WhatsApp to message the laboratory."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  );
}
