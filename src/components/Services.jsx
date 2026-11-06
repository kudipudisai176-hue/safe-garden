import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { serviceCatalog } from "../config/site";
import { api } from "../lib/api";
import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import BookingModal from "./BookingModal";

export default function Services() {
  const [remote, setRemote] = useState([]); // [{ _id, slug, price, ... }] from the backend
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getServices().then((res) => setRemote(res.services || res.data || [])).catch(() => {});
  }, []);

  // Merge backend data (id, editable price) onto the static presentation data.
  const services = useMemo(
    () => serviceCatalog.map((s) => {
      const r = remote.find((x) => x.slug === s.slug);
      return { ...s, id: r?._id, price: r?.price };
    }),
    [remote]
  );

  return (
    <section id="services" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-black sm:text-4xl">Our Professional Services</h2>
          <p className="mt-3 text-forest-dark/75">Complete solutions for agriculture, gardening, and environmental maintenance.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} onBook={setSelected} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && <BookingModal service={selected} services={services} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
