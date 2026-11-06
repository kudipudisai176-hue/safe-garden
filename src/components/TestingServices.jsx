import { ArrowRight, Check, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { images, soilParameters, waterParameters } from "../config/site";
import Reveal from "./Reveal";

function ParameterCard({ parameter, index, tone }) {
  const Icon = parameter.icon;
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.4, delay: (index % 4) * 0.045 }}
    className="glass-card group rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          "bg-brand-50 text-brand-800"
        }`}>
          <Icon size={19} strokeWidth={1.8} />
        </span>
        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-700 opacity-0 transition group-hover:opacity-100">
          <Check size={12} />
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-stone-900">{parameter.name}</h3>
      {parameter.detail && <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-stone-500">{parameter.detail}</p>}
      <p className="mt-2 text-sm leading-6 text-stone-600">{parameter.description}</p>
    </motion.article>
  );
}

function TestingSection({ id, title, eyebrow, description, parameters, image, tone }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-24 ${tone === "soil" ? "bg-white" : "bg-[#f4f8fc]"}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div className="group relative min-h-[240px] overflow-hidden rounded-[1.75rem] bg-brand-100 sm:min-h-[300px]">
            <img src={image} alt={`${title} laboratory testing`} loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur"><FlaskConical size={21} /></span>
              <span className="font-semibold">{title} parameters</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-stone-600">{description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-stone-200">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              {parameters.length} test parameters available
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {parameters.map((parameter, index) => (
            <ParameterCard key={parameter.name} parameter={parameter} index={index} tone={tone} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href="#request" className="glass-action inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-900">
            Request {tone === "soil" ? "Soil" : "Water"} Testing <ArrowRight size={16} />
          </a>
        </div>
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
