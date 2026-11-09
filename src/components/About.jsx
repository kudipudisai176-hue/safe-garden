import { Microscope, Sprout, ShieldCheck, TestTube2 } from "lucide-react";
import { company } from "../config/site";
import Reveal from "./Reveal";

const commitments = [
  { icon: Microscope, title: "Reliable analysis", text: "Clear soil and water testing to help you better understand your samples." },
  { icon: ShieldCheck, title: "Careful testing", text: "Consistent laboratory practices and attention to sample details." },
  { icon: Sprout, title: "Farmer-focused support", text: "Useful information to support farmers and agricultural development." },
  { icon: TestTube2, title: "Science-based service", text: "Testing grounded in measurable parameters and practical interpretation." },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-900">
            <img src="/images/hero.jpeg" alt="Agricultural landscape representing our laboratory's work"
              loading="lazy" className="aspect-[4/3] w-full object-cover opacity-75 transition duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-display text-2xl font-bold">Better information starts with a good test.</p>
              <p className="mt-2 text-sm text-white/75">Soil and water insights for agriculture.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">About SAFE</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">About Our Laboratory</h2>
          <p className="mt-5 leading-7 text-stone-600">
            Reliable soil and water analysis can help turn sample results into more informed agricultural decisions.
            {" "}Our commitment, “{company.fullName},” guides our careful, science-based support for farmers and agricultural development.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {commitments.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <Icon size={19} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
