import About from "../../blocks/About/About";
import Contact from "../../blocks/Contact/Contact";
import Footer from "../../blocks/Footer/Footer";
import Hero from "../../blocks/Hero/Hero";
import Navbar from "../../blocks/Navbar/Navbar";
import Projects from "../../blocks/Projects/Projects";
import ScrollObserver from "../../blocks/ScrollObserver/ScrollObserver";
import Skills from "../../blocks/Skills/Skills";

export default function Home() {


  return (
    <>
      <ScrollObserver />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
