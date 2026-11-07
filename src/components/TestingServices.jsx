import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { images, soilParameters, waterParameters } from "../config/site";
import Reveal from "./Reveal";

function ParameterItem({ parameter, index }) {
  const Icon = parameter.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.035 }}
      title={`${parameter.name}${parameter.detail ? ` — ${parameter.detail}` : ""}: ${parameter.description}`}
      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/70 bg-white/45 px-2.5 py-2 shadow-sm transition-colors hover:bg-white/80 sm:px-3"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50/90 text-brand-800">
        <Icon size={19} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-stone-800">{parameter.name}</span>
        <span className="block truncate text-[11px] leading-4 text-stone-500">
          {parameter.detail || parameter.description}
        </span>
      </span>
    </motion.li>
  );
}

function TestingSection({ id, title, eyebrow, description, parameters, image, tone }) {
  return (
    <section id={id} className={`scroll-mt-20 py-12 sm:py-16 ${tone === "soil" ? "bg-white" : "bg-[#f4f8fc]"}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid items-center gap-7 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <div className="glass-card rounded-[1.75rem] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-stone-900">Test parameters</h3>
                <span className="rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm">
                  {parameters.length} tests
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {parameters.map((parameter, index) => (
                  <ParameterItem key={parameter.name} parameter={parameter} index={index} />
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-brand-100 shadow-[0_20px_50px_-28px_rgba(24,62,92,0.42)]">
              <img src={image} alt={`${title} laboratory testing`} loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/25" />
            </div>
            <div className="px-1 pt-5 sm:px-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-stone-600">{description}</p>
              <a href="#request" className="glass-action mt-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-5 py-2.5 text-sm font-bold text-brand-900 shadow-sm backdrop-blur-xl transition hover:bg-white">
                Request {tone === "soil" ? "Soil" : "Water"} Testing <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function TestingServices() {
  return (
    <>
      <TestingSection id="soil-testing" title="Soil Testing" eyebrow="Know your soil"
        description="A clear picture of soil reaction, salinity, organic carbon, and essential nutrients can help guide practical soil and crop management decisions."
        parameters={soilParameters} image={images.soil} tone="soil" />
      <TestingSection id="water-testing" title="Water Testing" eyebrow="Understand your water"
        description="Review important water chemistry indicators, including salinity, major ions, and sodium hazard indicators relevant to irrigation assessment."
        parameters={waterParameters} image={images.water} tone="water" />
    </>
  );
}
