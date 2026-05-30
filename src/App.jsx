import React, { useEffect } from "react";
import './App.css'
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import SkillPage from "./pages/SkillPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./componets/Navbar";
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth scroll easing
      smoothWheel: true,
      syncTouch: false, // Let mobile touch scroll naturally, smooth-scroll on desktop
    });

    window.lenis = lenis;

    // 2. Connect Lenis scroll events to update GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 3. Connect GSAP ticker to update Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // 4. Disable lag smoothing for perfect sync
    gsap.ticker.lagSmoothing(0);

    // 5. Global Navbar load animation
    gsap.fromTo('.nav-container',
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    );

    // 6. Refresh ScrollTrigger after a slight delay to ensure all heights are calculated correctly
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // 7. Cleanup on unmount
    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(updateTicker);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="main">
      <Navbar/>
      <MainPage/>
      <AboutPage/>
      <SkillPage/>
      <ProjectsPage/>
      <ContactPage/>
    </div>
  );  
};

export default App;
