import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contactpage.css';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [consoleLogs, setConsoleLogs] = useState([
    "[SYS] Portal initialized. Awaiting user input...",
    "[SYS] Ready to compile transmission payload."
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(rightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addLog = (logText) => {
    setConsoleLogs((prev) => [...prev.slice(-4), `[18:05:16] ${logText}`]);
  };

  const handleFocus = (field) => {
    addLog(`[FOCUS] Active buffer switched to: ${field.toUpperCase()}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length > 0 && !emailRegex.test(value)) {
        addLog(`[WARN] Email format validation: FAILED`);
      } else if (value.length > 0) {
        addLog(`[OK] Email format validation: SUCCESS`);
      }
    } else {
      addLog(`[INPUT] Updating buffer ${name.toUpperCase()} (${value.length} chars)`);
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addLog("[ERR] Missing required arguments. Build halted.");
      return;
    }

    setIsSubmitting(true);
    addLog("[SYS] Packaging submission payloads...");

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      addLog("[SYS] Contacting Web3Forms API gateway...");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Portfolio Contact",
          message: formData.message
        })
      });

      const result = await response.json();
      
      if (response.status === 200 || result.success) {
        addLog("[SYS] Transmission dispatched successfully. Status: 200 OK");
        addLog(`[SUCCESS] Thank you ${formData.name}! Message compiled.`);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        addLog(`[ERR] Gateway rejected request: ${result.message || 'Key missing'}`);
        setSubmitStatus('error');
      }
    } catch (error) {
      addLog(`[ERR] Connection error: ${error.message}`);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        
        <div className="contact-title-block">
          <span className="terminal-badge">TRANSMISSION PORTAL // SECURE LINK</span>
          <h1>Get In Touch</h1>
          <div className="section-divider"></div>
        </div>

        <div className="contact-grid">
          
          <div className="contact-left" ref={leftRef}>
            
            <div className="contact-info-card">
              <h3>Let's Collaborate!</h3>
              <p>
                Whether you have an exciting MERN project opportunity, want to build custom web applications, or just want to chat about code—feel free to drop a message!
              </p>
              
              <div className="contact-details-list">
                <div className="detail-row">
                  <span className="detail-label">HOST LOCATION:</span>
                  <span className="detail-val">Bhubaneswar, Odisha, India</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">INBOX EMAIL:</span>
                  <span className="detail-val">devilprakashdas@gmail.com</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">RECRUITMENT STATUS:</span>
                  <span className="detail-val badge-green">OPEN FOR HIRE</span>
                </div>
              </div>
            </div>

            <div className="contact-terminal">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">active_transmission.sh</span>
              </div>
              <div className="terminal-body">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="terminal-line">
                    <span className="line-prefix">$</span>
                    <span className="line-text">{log}</span>
                  </div>
                ))}
                <div className="terminal-line active-line">
                  <span className="line-prefix">$</span>
                  <span className="line-text blink-cursor">_</span>
                </div>
              </div>
            </div>

          </div>

          <div className="contact-right" ref={rightRef}>
            <form className="contact-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  placeholder="Enter your name" 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  placeholder="Enter your email" 
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  placeholder="What is this regarding?" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message Payload *</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  placeholder="Describe your project, offer, or question..." 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Compiling Payload..." : "Compile & Dispatch Message"}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-success-banner">
                  ⚡ Compilation Success! Message transmission successfully dispatched.
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactPage;
