import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Sprout, Droplets, Info, Phone, Menu, X, ShoppingBag, Tractor, FlaskConical, ChevronDown } from "lucide-react";
import { company, navItems } from "../config/site";

const icons = {
  home: Home,
  testing: FlaskConical,
  "soil-testing": Sprout,
  "water-testing": Droplets,
  "field-management": Tractor,
  products: ShoppingBag,
  about: Info,
  contact: Phone,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [testingOpen, setTestingOpen] = useState(false);
  const [activeId, setActiveId] = useState(window.location.hash.slice(1) || "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTestingOpen(false);
    setActiveId(id);
    window.history.replaceState(null, "", `/#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <nav className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6 ${
        scrolled || open ? "border border-white/15 bg-forest-dark/80 shadow-lg backdrop-blur-xl" : "border border-transparent bg-transparent"
      }`}>
        <button onClick={() => go("home")} className="text-left" aria-label="Go to top">
          <span className="font-display text-2xl font-bold leading-none tracking-wide text-white">{company.brand}</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map(({ id, label }) => {
            const Icon = icons[id];
            const active = id === "testing"
              ? ["soil-testing", "water-testing"].includes(activeId)
              : activeId === id;
            return (
              <li key={id}>
                {id === "testing" ? (
                  <div className="relative">
                    <button onClick={() => setTestingOpen((value) => !value)}
                      aria-expanded={testingOpen}
                      aria-haspopup="menu"
                      className={`glass-action group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-gold ${
                        active ? "text-gold" : "text-white/90"
                      }`}>
                      <Icon size={16} className="transition group-hover:-translate-y-0.5" />
                      {label}
                      <ChevronDown size={14} className={`transition-transform ${testingOpen ? "rotate-180" : ""}`} />
                      {active && <motion.span layoutId="active-nav-highlight"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                    </button>
                    <AnimatePresence>
                      {testingOpen && (
                        <motion.div role="menu" initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.16 }}
                          className="glass-card absolute left-0 top-full z-50 mt-3 min-w-52 rounded-2xl p-2">
                          {navItems.find((item) => item.id === "testing").children.map((child) => {
                            const ChildIcon = icons[child.id];
                            return (
                              <button key={child.id} role="menuitem" onClick={() => go(child.id)}
                                className={`glass-action flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${
                                  activeId === child.id ? "bg-brand-50 text-brand-900" : "text-stone-700 hover:bg-brand-50 hover:text-brand-900"
                                }`}>
                                <ChildIcon size={17} className="text-brand-700" />
                                {child.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                <button onClick={() => go(id)}
                  className={`glass-action group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-gold ${
                    active ? "text-gold" : "text-white/90"
                  }`}>
                  {Icon && <Icon size={16} className="transition group-hover:-translate-y-0.5" />}
                  {label}
                  {active && <motion.span layoutId="active-nav-highlight"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
                </button>
                )}
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
              const active = id === "testing"
                ? ["soil-testing", "water-testing"].includes(activeId)
                : activeId === id;
              return (
                <motion.li key={id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}>
                  {id === "testing" ? (
                    <>
                      <button onClick={() => setTestingOpen((value) => !value)}
                        aria-expanded={testingOpen}
                        className={`glass-action flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-white/10 ${
                          active ? "text-gold" : "text-white"
                        }`}>
                        <span className="flex items-center gap-3">
                          {Icon && <Icon size={18} className="text-gold" />} {label}
                        </span>
                        <ChevronDown size={16} className={`text-gold transition-transform ${testingOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {testingOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-5">
                            {navItems.find((item) => item.id === "testing").children.map((child) => {
                              const ChildIcon = icons[child.id];
                              return (
                                <button key={child.id} onClick={() => go(child.id)}
                                  className={`glass-action flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium hover:bg-white/10 ${
                                    activeId === child.id ? "text-gold" : "text-white/85"
                                  }`}>
                                  <ChildIcon size={16} className="text-gold" /> {child.label}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                  <button onClick={() => go(id)}
                    className={`glass-action flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-white/10 ${
                      active ? "text-gold" : "text-white"
                    }`}>
                    {Icon && <Icon size={18} className="text-gold" />} {label}
                  </button>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
