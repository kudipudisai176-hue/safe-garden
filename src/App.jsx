import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TestingServices from "./components/TestingServices";
import TestingRequest from "./components/TestingRequest";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
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
