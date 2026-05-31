import { useCallback, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './lib/useSmoothScroll';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Courses from './components/Courses';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';

export default function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);

  const onLoaded = useCallback(() => {
    setReady(true);
    // Layout shifted as content revealed; recompute scroll positions.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Preloader onDone={onLoaded} />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <Courses />
        <HowItWorks />
        <WhyUs />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
