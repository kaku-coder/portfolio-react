import React, { useState, useEffect } from 'react'
import { CodeXml, Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'light');
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(targetId);
    if (window.lenis && targetElement) {
      window.lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='nav-container'>
        <div className='nav-logo'>
            <h2><CodeXml />Myfolio</h2>
        </div>
        <div className='nav-menu'>
            <ul>
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
            </ul>
        </div>
        <div className='nav-btn'>
            <a href="https://github.com/kaku-coder" target="_blank" rel="noopener noreferrer" className='github'>
                <img src="/github.png" alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/prakash-das-8374b5296/" target="_blank" rel="noopener noreferrer" className='linkedin'>
                <img src="/linkedin.png" alt="linkedin" />
            </a>
            <a href="mailto:devilprakashdas@gmail.com" className='gmail'>
                <img src="/gmail.png" alt="gmail" />
            </a>
            <button className='theme-toggle' onClick={toggleTheme} aria-label="Toggle Theme">
                {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
            </button>
        </div>

        <button className='mobile-toggle' onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="toggle-icon" /> : <Menu className="toggle-icon" />}
        </button>

        <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
            <ul>
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
            </ul>
            <div className='mobile-menu-socials'>
                <a href="https://github.com/kaku-coder" target="_blank" rel="noopener noreferrer" className='github'>
                    <img src="/github.png" alt="github" />
                </a>
                <a href="https://www.linkedin.com/in/prakash-das-8374b5296/" target="_blank" rel="noopener noreferrer" className='linkedin'>
                    <img src="/linkedin.png" alt="linkedin" />
                </a>
                <a href="mailto:devilprakashdas@gmail.com" className='gmail'>
                    <img src="/gmail.png" alt="gmail" />
                </a>
                <button className='theme-toggle' onClick={toggleTheme} aria-label="Toggle Theme">
                    {isDark ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar