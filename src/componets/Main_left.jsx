import React from 'react'
import './Main_left.css'

const Main_left = () => {

  const scrollToContact = () => {
    const target = document.querySelector('#contact');
    if (window.lenis && target) {
      window.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='main-left-container'>
        <h1 className='main-left-heading'>
          Hello I'm <span className="highlight">Prakash</span>
        </h1>
        <p className='main-left-subheading'>MERN Stack Developer</p>
        <p className='main-left-description'>
          Passionate about building responsive and user-friendly web applications using MongoDB, Express.js, React, and Node.js. I enjoy solving problems, creating real-world projects, and continuously improving my development skills.
        </p>
        <div className="main-left-actions">
            <button className='btn-solid'>Download CV</button>
            <button className='btn-outline' onClick={scrollToContact}>Hire Me</button>
        </div>
    </div>
  )
}

export default Main_left