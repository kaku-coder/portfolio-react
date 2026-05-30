import React, { useEffect, useRef } from 'react'
import './Mainpage.css'
import Main_left from '../componets/Main_left'
import Main_right from '../componets/Main_right'
import gsap from 'gsap'

const MainPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Official GSAP React Context for animation clean-up and rendering safety
    const ctx = gsap.context(() => {
      // 1. Main Left Elements: Stagger slide up and fade in
      gsap.fromTo(
        ['.main-left-heading', '.main-left-subheading', '.main-left-description', '.main-left-actions'],
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out', 
          stagger: 0.15, 
          delay: 0.25 
        }
      );

      // 2. Main Right Code Window: Elastic scale and pop-in
      gsap.fromTo('.code-window',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.4, 
          ease: 'elastic.out(1, 0.75)', 
          delay: 0.4 
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Revert timeline when component unmounts
  }, []);

  return (
    <div className='main_page' id="home" ref={containerRef}>
        <div className="main-content">
            <Main_left/>
            <Main_right/>
        </div>
    </div>
  )
}

export default MainPage
