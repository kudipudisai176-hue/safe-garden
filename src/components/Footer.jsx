import { Mail, MapPin, Phone } from "lucide-react";
import { company, navItems } from "../config/site";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_.8fr_1fr] lg:px-8">
        <div>
          <a href="/#home" className="inline-flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-300 font-display text-lg font-bold text-brand-950">S</span>
            <span>
              <span className="block font-display text-xl font-bold">{company.brand}</span>
              <span className="block text-[10px] font-semibold tracking-[0.12em] text-brand-200">SOIL &amp; WATER LAB</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6">{company.fullName} — soil and water testing services for informed agricultural decisions.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.filter(({ id }) => id !== "home").map(({ id, label, path, children }) => (
              <li key={id}>
                {children ? (
                  <>
                    <span>{label}</span>
                    <ul className="mt-2 space-y-2 border-l border-white/15 pl-3">
                      {children.map((child) => (
                        <li key={child.id}>
                          <a href={`/#${child.id}`} className="transition hover:text-brand-200">{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href={path || `/#${id}`} className="transition hover:text-brand-200">{label}</a>
                )}
              </li>
            ))}
            <li><a href="/#request" className="transition hover:text-brand-200">Request a Test</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5 shrink-0 text-brand-200" />{company.phone || "Phone details to be added"}</li>
            <li className="flex items-start gap-2 break-all"><Mail size={15} className="mt-0.5 shrink-0 text-brand-200" />{company.email || "Email details to be added"}</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-200" />{company.address || "Address details to be added"}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-xs">
        © {new Date().getFullYear()} {company.fullName}. All rights reserved.
      </p>
    </footer>
  );
}
