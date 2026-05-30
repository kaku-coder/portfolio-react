import React, { useState, useEffect, useRef } from 'react'
import './Skillpage.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  react: {
    name: "React",
    category: "Frontend Framework",
    proficiency: 90,
    experience: "Hooks, Router, Redux",
    projects: "5+ Self-Builds",
    status: "OPTIMAL",
    color: "#0ea5e9",
    description: "Highly proficient in component-based architectures, React hooks (useState, useEffect, useRef), React Router, state management, and fluid responsive styling.",
    logs: [
      "[SYS] Initializing React Engine...",
      "[SYS] Rendering Virtual DOM Tree...",
      "[SYS] Reconciliation algorithm activated successfully.",
      "[SYS] Status: OPTIMAL | Speed: 0.12ms | Memory: STABLE"
    ]
  },
  node: {
    name: "Node.js",
    category: "Backend Runtime",
    proficiency: 82,
    experience: "Event Loop, REST APIs",
    projects: "3+ Self-Builds",
    status: "ACTIVE",
    color: "#22c55e",
    description: "Experienced in building non-blocking backend servers, handling RESTful API design, path routing, filesystem modules, and custom middlewares.",
    logs: [
      "[SYS] Initializing Node V8 Engine...",
      "[SYS] Spawning Event Loop process...",
      "[SYS] Listening on port 5000 (HTTPS)...",
      "[SYS] Status: ACTIVE | Connections: 142 | Clusters: 4"
    ]
  },
  mongodb: {
    name: "MongoDB",
    category: "NoSQL Database",
    proficiency: 80,
    experience: "NoSQL Modeling, Schemas",
    projects: "3+ Integrated",
    status: "STABLE",
    color: "#10b981",
    description: "Proficient in designing collections, defining robust mongoose schemas, building CRUD query filters, and connecting backend routes to database clusters.",
    logs: [
      "[SYS] Connecting to MongoDB Atlas Cluster...",
      "[SYS] Database authentication: SUCCESSFUL.",
      "[SYS] Running aggregation pipelines on 'users' collection...",
      "[SYS] Status: STABLE | Latency: 8ms | Sharding: ACTIVE"
    ]
  },
  express: {
    name: "Express.js",
    category: "Backend Framework",
    proficiency: 85,
    experience: "MVC Pattern, JWT Auth",
    projects: "4+ Integrated",
    status: "STABLE",
    color: "#f59e0b",
    description: "Proficient in designing modular router paths, integrating request parsers, setting custom security headers, and implementing JWT token authentication.",
    logs: [
      "[SYS] Booting Express App framework...",
      "[SYS] Loading global middleware stack (helmet, morgan, json)...",
      "[SYS] Mount path routes registered successfully.",
      "[SYS] Status: STABLE | Active Router: MERN_REST_API"
    ]
  },
  javascript: {
    name: "JavaScript",
    category: "Core Programming",
    proficiency: 88,
    experience: "ES6+, Async, DOM",
    projects: "10+ Scripts",
    status: "OPTIMAL",
    color: "#eab308",
    description: "Mastery of ECMAScript standards, asynchronous mechanisms (Promises, Async/Await), scope chains, closures, events, and modern algorithms.",
    logs: [
      "[SYS] Parsing ECMAScript engine modules...",
      "[SYS] Compiling Async Call Stack...",
      "[SYS] Garbage Collector: Active & monitoring leaks.",
      "[SYS] Status: OPTIMAL | Compile Time: 0.04ms"
    ]
  },
  tailwind: {
    name: "Tailwind CSS",
    category: "CSS Utility Engine",
    proficiency: 88,
    experience: "Flex/Grid, Fluid UI",
    projects: "8+ Responsive",
    status: "OPTIMAL",
    color: "#3b82f6",
    description: "Expert in building custom layouts using Tailwind, crafting responsive mobile-first viewports, handling transitions, and clean modern style rules.",
    logs: [
      "[SYS] Loading Tailwind v4 CSS Engine...",
      "[SYS] Compiling JIT (Just-in-Time) utility utilities...",
      "[SYS] Generated responsive theme media classes.",
      "[SYS] Status: OPTIMAL | Style Sheet size: 10.6kB"
    ]
  }
};

const SkillPage = () => {
  const [activeKey, setActiveKey] = useState('react');
  const activeTech = skillsData[activeKey];
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.command-grid-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const strokeRadius = 70;
  const strokeCircumference = 2 * Math.PI * strokeRadius;
  const strokeDashoffset = strokeCircumference - (activeTech.proficiency / 100) * strokeCircumference;

  return (
    <section className="skill-section" id="skills" ref={sectionRef}>
      <div className="skill-container">
        
        <div className="skill-title-block" ref={titleRef}>
          <span className="terminal-badge">DIAGNOSTICS v1.0.4</span>
          <h1>Tech Stack Command Center</h1>
          <div className="section-divider"></div>
        </div>

        <div className="command-grid" ref={gridRef}>
          
          <div className="command-grid-item tech-selector-widget">
            <h3 className="widget-header">
              <span className="status-indicator-green"></span>
              CORE MODULE SELECTOR
            </h3>
            <div className="tech-buttons-list">
              {Object.keys(skillsData).map((key) => {
                const tech = skillsData[key];
                const isSelected = key === activeKey;
                return (
                  <button 
                    key={key} 
                    className={`tech-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveKey(key)}
                    style={{ '--tech-color-glow': tech.color }}
                  >
                    <span className="tech-btn-name">{tech.name}</span>
                    <span className="tech-btn-status">{tech.status}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="command-grid-item diagnostics-widget">
            <h3 className="widget-header">
              <span className="status-indicator-blue"></span>
              MODULE METRICS & STATUS
            </h3>
            
            <div className="diagnostics-body">
              <div className="gauge-container">
                <svg className="progress-ring" width="160" height="160">
                  <circle 
                    className="progress-ring-bg"
                    strokeWidth="8"
                    fill="transparent"
                    r={strokeRadius}
                    cx="80"
                    cy="80"
                  />
                  <circle 
                    className="progress-ring-fill"
                    strokeWidth="8"
                    stroke={activeTech.color}
                    fill="transparent"
                    r={strokeRadius}
                    cx="80"
                    cy="80"
                    style={{
                      strokeDasharray: `${strokeCircumference} ${strokeCircumference}`,
                      strokeDashoffset: strokeDashoffset
                    }}
                  />
                </svg>
                <div className="gauge-overlay">
                  <span className="gauge-value">{activeTech.proficiency}%</span>
                  <span className="gauge-label">POWER</span>
                </div>
              </div>

              <div className="metadata-card">
                <div className="meta-row">
                  <span className="meta-label">TECH CATEGORY:</span>
                  <span className="meta-val highlight" style={{ color: activeTech.color }}>{activeTech.category}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">MODULE FOCUS:</span>
                  <span className="meta-val">{activeTech.experience}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">COMPLETED BUILDS:</span>
                  <span className="meta-val">{activeTech.projects}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">MODULE INTEGRITY:</span>
                  <span className="meta-val badge" style={{ backgroundColor: `${activeTech.color}20`, color: activeTech.color }}>
                    {activeTech.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="diagnostics-desc">
              <p>{activeTech.description}</p>
            </div>
          </div>

          <div className="command-grid-item console-widget">
            <h3 className="widget-header">
              <span className="status-indicator-amber"></span>
              LIVE ACTIVE SYSTEM LOGS
            </h3>
            <div className="console-body">
              {activeTech.logs.map((log, index) => (
                <div key={index} className="console-line">
                  <span className="console-time">[18:05:16]</span>
                  <span className="console-text">{log}</span>
                </div>
              ))}
              <div className="console-line live-cursor-line">
                <span className="console-time">[18:05:16]</span>
                <span className="console-text text-cursor">_</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default SkillPage