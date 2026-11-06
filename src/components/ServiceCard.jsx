import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

export default function ServiceCard({ service, index, onBook }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-forest to-leaf">
        <img src={service.image} alt={service.title} loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-forest-dark shadow-md">
          <Icon size={22} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-black">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-dark/75">{service.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {typeof service.price === "number" ? (
            <span className="text-sm font-semibold text-forest">From ₹{service.price.toLocaleString("en-IN")}</span>
          ) : <span />}
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => onBook(service)} className="btn btn-green !px-5 !py-2.5">
            <CalendarCheck size={16} /> Book Now
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
