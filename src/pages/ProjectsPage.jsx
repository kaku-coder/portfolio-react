import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projectspage.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "DevFlow",
    subtitle: "Developer Q&A Platform",
    techs: ["React", "Express", "Node.js", "MongoDB"],
    description: "Built a high-fidelity StackOverflow-like platform utilizing secure JWT auth, advanced Mongoose collection aggregation pipelines, and fully responsive styling. Features search caching and a community voting engine.",
    filename: "devflow_sys.sh",
    logs: [
      "[DB] Connected to MongoDB Atlas successfully",
      "[JWT] Session verification: ACTIVE",
      "[SYS] Client state synchronized | Size: 18.2kB",
      "[SYS] Server live at port 5000"
    ]
  },
  {
    id: 2,
    title: "ShopX",
    subtitle: "Premium MERN E-Commerce",
    techs: ["React", "Redux Toolkit", "MongoDB", "Express"],
    description: "Designed a clean, state-driven single-vendor storefront. Fully implemented Redux-managed shopping cart logic, robust checkout pipelines with session data caching, and a responsive administration statistics panel.",
    filename: "shopx_terminal.bat",
    logs: [
      "[SYS] Redux active state: INITIALIZED",
      "[API] Fetch products payload: 200 OK (8ms)",
      "[SYS] Checkout secure socket stream active",
      "[SYS] Admin system integrity: OPTIMAL"
    ]
  },
  {
    id: 3,
    title: "TaskSync",
    subtitle: "Real-Time Collaborative Board",
    techs: ["React", "Socket.io", "Express", "Node.js"],
    description: "Created a real-time team workspace card dashboard (Trello replica). Features live socket connection handlers that synchronize client cards instantly across browsers, drag-and-drop state preservation, and user notifications.",
    filename: "tasksync_socket.log",
    logs: [
      "[SOCK] Socket.io handshake: ESTABLISHED",
      "[SOCK] Joined active room session: MERN_BOARD_90",
      "[SYS] Broadcast payload: PERSISTED to MongoDB",
      "[SYS] Active connection threads: 4"
    ]
  }
];

const ProjectsPage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

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

      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
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

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-container">
        
        <div className="projects-title-block" ref={titleRef}>
          <span className="terminal-badge">LIVE REPOSITORIES // CORE BUILDS</span>
          <h1>Selected Works & Projects</h1>
          <div className="section-divider"></div>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              
              <div className="project-card-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="project-filename">{project.filename}</span>
              </div>

              <div className="project-card-body">
                <div className="project-title-wrapper">
                  <h2>{project.title}</h2>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
                
                <div className="project-tags">
                  {project.techs.map((tech, tIndex) => (
                    <span key={tIndex} className="project-tag">{tech}</span>
                  ))}
                </div>

                <p className="project-desc">{project.description}</p>
              </div>

              <div className="project-card-console">
                <div className="project-console-header">Console Logs</div>
                <div className="project-console-body">
                  {project.logs.map((log, lIndex) => (
                    <div key={lIndex} className="console-log-line">
                      <span className="log-arrow">&gt;</span>
                      <span className="log-text">{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-actions">
                <a href="#" className="project-btn-solid">Live App</a>
                <a href="https://github.com/kaku-coder" target="_blank" rel="noopener noreferrer" className="project-btn-outline">Repository</a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsPage;
