import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "../config/site";
import Reveal from "./Reveal";

const valueOrPending = (value) => value || "Contact details to be added";

export default function Contact() {
  const whatsapp = company.whatsappNumber.replace(/\D/g, "");
  const mapUrl = company.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`
    : null;

  return (
    <section id="contact" className="scroll-mt-20 bg-[#f4f8fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">We’re here to help</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Contact Our Laboratory</h2>
          <p className="mt-4 leading-7 text-stone-600">Reach out to ask about sample requirements, testing parameters, or submitting a sample.</p>
        </Reveal>

        <div className="mt-9 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal delay={0.06} className="glass-card rounded-[1.75rem] p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-stone-900">Laboratory Details</h3>
            <div className="mt-6 space-y-5">
              <ContactItem icon={MapPin} label="Brand tagline" value={company.fullName} />
              <ContactItem icon={Phone} label="Mobile Number" value={valueOrPending(company.phone)}
                href={company.phone ? `tel:${company.phone.replace(/[^\d+]/g, "")}` : undefined} />
              <ContactItem icon={Mail} label="Email" value={valueOrPending(company.email)}
                href={company.email ? `mailto:${company.email}` : undefined} />
              <ContactItem icon={MapPin} label="Address" value={valueOrPending(company.address)} />
            </div>
            {whatsapp ? (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"
                className="glass-action mt-7 inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-900">
                <MessageCircle size={17} /> Contact us on WhatsApp
              </a>
            ) : (
              <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-500">
                <MessageCircle size={17} /> WhatsApp contact to be added
              </p>
            )}
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-card relative flex h-full min-h-[300px] flex-col items-center justify-center rounded-[1.75rem] border-brand-100 bg-brand-50/65 p-8 text-center">
              <div aria-hidden className="glass-absolute absolute inset-0 opacity-40"
                style={{ backgroundImage: "radial-gradient(#8bb9e7 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-800 shadow-sm">
                <MapPin size={24} />
              </span>
              <h3 className="relative mt-4 font-display text-xl font-bold text-stone-900">Find Our Laboratory</h3>
              <p className="relative mt-2 max-w-sm text-sm leading-6 text-stone-600">
                {company.address || "The laboratory address and map location will be added here."}
              </p>
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noreferrer"
                  className="glass-action relative mt-5 inline-flex items-center gap-2 rounded-full border border-brand-800 px-5 py-2.5 text-sm font-bold text-brand-900 transition hover:bg-brand-800 hover:text-white">
                  Open in Google Maps <MapPin size={15} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</span>
        <span className="mt-1 block break-words text-sm font-semibold text-stone-800">{value}</span>
      </span>
    </>
  );

  return (
    <div className="flex items-center gap-3">
      {href ? <a href={href} className="flex min-w-0 items-center gap-3 hover:text-brand-800">{content}</a> : content}
    </div>
  );
}
