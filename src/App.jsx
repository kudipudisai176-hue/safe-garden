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
  const separatePage = path === "/products" || path === "/field-management";

  useEffect(() => {
    document.title = path === "/products"
      ? "Products | SAFE"
      : path === "/field-management"
        ? "Field Management | SAFE"
        : "Soil & Water Testing Laboratory | SAFE";
  }, [path]);

  if (separatePage) {
    const isProductsPage = path === "/products";
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16">
          {isProductsPage ? <Products /> : <FieldManagement />}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="services" className="scroll-mt-16">
          <TestingServices />
        </div>
        <TestingRequest />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
