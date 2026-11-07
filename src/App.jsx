import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TestingServices from "./components/TestingServices";
import Products from "./components/Products";
import TestingRequest from "./components/TestingRequest";
import FieldManagement from "./components/FieldManagement";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    document.title = "Soil & Water Testing Laboratory | SAFE";

    const legacySection = path === "/products"
      ? "products"
      : path === "/field-management"
        ? "field-management"
        : null;
    const sectionId = legacySection || window.location.hash.slice(1);

    if (legacySection) {
      window.history.replaceState(null, "", `/#${legacySection}`);
    }

    if (sectionId) {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView();
      });
    }
  }, [path]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="services" className="scroll-mt-16">
          <TestingServices />
        </div>
        <FieldManagement />
        <Products />
        <TestingRequest />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
