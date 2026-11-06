import { ArrowRight, Droplets, Leaf, MapPin, Shovel, Sprout, Tractor } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "../config/site";
import Reveal from "./Reveal";

const fieldServices = [
  { icon: Sprout, title: "Crop and field care", description: "Practical field support to help keep crop areas healthy and productive." },
  { icon: Shovel, title: "Land preparation", description: "Field preparation and maintenance support based on your land's needs." },
  { icon: Droplets, title: "Water and irrigation", description: "Guidance for field water use and irrigation-related maintenance." },
  { icon: Leaf, title: "Ongoing maintenance", description: "Seasonal upkeep to help maintain clean, organized agricultural land." },
];

export default function FieldManagement() {
  const whatsappNumber = company.whatsappNumber.replace(/\D/g, "");
  const message = "Hi, I would like to know more about Field Management services.";
  const inquiryUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="/images/field-maintenance.jpg" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/85 to-brand-900/65" />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-brand-100 backdrop-blur-md">
              <Tractor size={15} /> AGRICULTURAL FIELD SERVICES
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Field Management</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Dependable support for field preparation, crop care, irrigation needs, and ongoing land maintenance.
            </p>
            {inquiryUrl && (
              <a href={inquiryUrl} target="_blank" rel="noreferrer"
                className="glass-action mt-8 inline-flex items-center gap-2 rounded-full bg-brand-300 px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-200">
                Ask about Field Management <ArrowRight size={17} />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f8fc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Support for your land</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-stone-950 sm:text-4xl">Field care that works with your needs</h2>
            <p className="mt-4 leading-7 text-stone-600">Tell us about your field and the type of assistance you are looking for.</p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fieldServices.map(({ icon: Icon, title, description }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass-card rounded-2xl p-5 sm:p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-800">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-stone-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
              </motion.article>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-brand-100 bg-white/75 p-6 shadow-sm backdrop-blur-lg sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                <MapPin size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900">Discuss your field requirements</h3>
                <p className="mt-1 text-sm leading-6 text-stone-600">Contact us to discuss your location, field size, and service needs.</p>
              </div>
            </div>
            {inquiryUrl && (
              <a href={inquiryUrl} target="_blank" rel="noreferrer"
                className="glass-action inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-800 px-5 py-3 text-sm font-bold text-white hover:bg-brand-900">
                Contact us <ArrowRight size={16} />
              </a>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
