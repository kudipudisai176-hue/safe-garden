import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { company, images } from "../config/site";

const headline = "Growing a Greener Future Through Smart Agriculture".split(" ");
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950">
      {/* Slow zoom on the background photo (falls back to the green gradient if the image is missing) */}
      <motion.div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.hero})` }}
        initial={{ scale: 1 }} animate={{ scale: 1.1 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity, repeatType: "reverse" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/40 to-black/25" />

      {/* Subtle drifting light */}
      <motion.div aria-hidden className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-display text-5xl font-bold tracking-wide text-white sm:text-6xl">
          {company.brand}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-1 text-lg font-medium text-white/85">
          {company.fullName}
        </motion.p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {headline.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Reliable agricultural solutions for healthier soil, cleaner water, beautiful gardens, and well-maintained landscapes.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => go("services")}
            className="btn bg-[#549fe6] text-[#183e5c] hover:bg-[#78b4ec] focus-visible:ring-[#549fe6]">
            Explore Our Services <ArrowRight size={18} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => go("contact")} className="btn btn-ghost">
            <MessageCircle size={18} /> Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
