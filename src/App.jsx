import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  useLenis();

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <Cursor />
      <Nav />
      <main>
        <Hero ready={loaderDone} />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}