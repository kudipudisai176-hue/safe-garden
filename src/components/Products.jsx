import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { company, products } from "../config/site";
import Reveal from "./Reveal";

export default function Products() {
  const whatsappNumber = company.whatsappNumber.replace(/\D/g, "");

  return (
    <section id="products" className="scroll-mt-20 bg-[#f4f8fc]/85 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">For your growing needs</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Our Products</h2>
          <p className="mt-4 leading-7 text-stone-600">
            Explore our plants, seeds, and agricultural products. Contact us for product details and availability.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(({ name, category, icon: Icon }, index) => {
            const message = `Hi, I would like to know more about ${name}. Please share product details and availability.`;
            const inquiryUrl = whatsappNumber
              ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
              : null;

            return (
              <motion.article key={name} initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
                className="glass-card group rounded-2xl p-5 sm:p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-800 transition duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{category}</p>
                <h3 className="mt-2 min-h-14 font-display text-xl font-bold leading-snug text-stone-900">{name}</h3>
                {inquiryUrl ? (
                  <a href={inquiryUrl} target="_blank" rel="noreferrer"
                    className="glass-action mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800 hover:text-brand-950">
                    Ask on WhatsApp <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="mt-4 inline-block text-sm text-stone-500">Contact us for details</span>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
