import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Sprout, Droplets, Info, Phone, Menu, X } from "lucide-react";
import { company, navItems } from "../config/site";

const icons = { home: Home, "soil-testing": Sprout, "water-testing": Droplets, about: Info, contact: Phone };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setActiveId(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
      scrolled || open ? "bg-forest-dark/95 shadow-lg backdrop-blur" : "bg-transparent"
    }`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button onClick={() => go("home")} className="text-left" aria-label="Go to top">
          <span className="font-display text-2xl font-bold leading-none tracking-wide text-white">{company.brand}</span>
          <span className="hidden text-[11px] leading-tight text-leaf-light sm:block">SOIL &amp; WATER LAB</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map(({ id, label }) => {
            const Icon = icons[id];
            return (
              <li key={id}>
                <button onClick={() => go(id)}
                  className={`group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-gold ${
                    activeId === id ? "text-gold" : "text-white/90"
                  }`}>
                  {Icon && <Icon size={16} className="transition group-hover:-translate-y-0.5" />}
                  {label}
                  {activeId === id && <motion.span layoutId="active-nav-highlight"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                </button>
              </li>
            );
          })}
        </ul>

        <button className="rounded-full p-2 text-white md:hidden" onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-4 md:hidden">
            {navItems.map(({ id, label }, index) => {
              const Icon = icons[id];
              return (
                <motion.li key={id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}>
                  <button onClick={() => go(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-white/10 ${
                      activeId === id ? "text-gold" : "text-white"
                    }`}>
                    {Icon && <Icon size={18} className="text-gold" />} {label}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
