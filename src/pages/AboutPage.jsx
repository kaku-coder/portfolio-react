import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Aboutpage.css';
import aboutimage from '../assets/ChatGPT Image May 30, 2026, 05_38_13 PM.png';

gsap.registerPlugin(ScrollTrigger);

const generateContributionData = () => {
    const data = [];
    for (let week = 0; week < 53; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
            const rand = Math.random();
            let level = 0;

            if (rand > 0.96) level = 4;
            else if (rand > 0.90) level = 3;
            else if (rand > 0.80) level = 2;
            else if (rand > 0.65) level = 1;
            else level = 0;

            const contributions = level === 0 ? 0 : Math.floor(Math.random() * (level * 2)) + 1;
            const dateStr = `Week ${week + 1}, Day ${day + 1}`;
            weekData.push({ level, contributions, date: dateStr });
        }
        data.push(weekData);
    }
    return data;
};

const AboutPage = () => {
    const [activeCell, setActiveCell] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [isSpeaking, setIsSpeaking] = useState(false);
    const contributionGrid = useRef(generateContributionData());
    const speechRef = useRef(null);

    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const cardRef = useRef(null);
    const statsRef = useRef(null);
    const gridContainerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const toggleSpeech = () => {
        if (!window.speechSynthesis) {
            alert("Text-to-speech is not supported in this browser. Please try Chrome, Edge, or Safari!");
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const bioText = "Hello, World! I am Prakash, also known as Kaku. I am a highly motivated MERN Stack Fresher specializing in building modern full-stack web applications. I specialize in building responsive React interfaces and developing secure, clean REST APIs using Node, Express, and MongoDB. Click me again if you want to mute my voice!";

        const utterance = new SpeechSynthesisUtterance(bioText);
        utterance.pitch = 1.05;
        utterance.rate = 0.95;

        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            gsap.fromTo(cardRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            gsap.fromTo('.stat-box',
                { scale: 0.85, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            gsap.fromTo('.github-grid-widget',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridContainerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e, cell) => {
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.parentNode.getBoundingClientRect();

        setTooltipPos({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top - 38
        });
        setActiveCell(cell);
    };

    const handleMouseLeave = () => {
        setActiveCell(null);
    };

    return (
        <section className="about-section" id="about" ref={sectionRef}>
            <div className="about-container">

                <div className="about-header">
                    <span className="terminal-badge">ABOUT ME // REPOSITORY PROFILE</span>
                    <h1>Developer Biography</h1>
                    <div className="section-divider"></div>
                </div>

                <div className="about-layout-row">

                    <div className="about-avatar-window" ref={imageRef}>
                        <div className="card-window-header">
                            <span className="dot red" onClick={toggleSpeech} style={{ cursor: 'pointer' }} title="Mute/Stop speech"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span className="window-title">profile_avatar.png</span>
                        </div>
                        <div className="avatar-body" onClick={toggleSpeech} style={{ cursor: 'pointer', position: 'relative' }}>
                            <div className="avatar-beacon" title="Click to hear Kaku speak!">
                                <span className="beacon-ping"></span>
                                <span className="beacon-dot">🔊</span>
                            </div>

                            {isSpeaking && (
                                <>
                                    <div className="avatar-ripple ripple-1"></div>
                                    <div className="avatar-ripple ripple-2"></div>
                                </>
                            )}
                            <img
                                src={aboutimage}
                                alt="Prakash Kaku Avatar"
                                className={`avatar-img ${isSpeaking ? 'speaking-avatar' : ''}`}
                            />

                            <div className={`avatar-speech-bubble ${isSpeaking ? 'speaking' : ''}`}>
                                {isSpeaking ? (
                                    <div className="speech-wave">
                                        <span className="wave-bar"></span>
                                        <span className="wave-bar"></span>
                                        <span className="wave-bar"></span>
                                        <span className="bubble-text">Mute Voice 🔇</span>
                                    </div>
                                ) : (
                                    <span className="bubble-text">Click to hear me! 🔊</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="about-bio-window" ref={cardRef}>
                        <div className="card-window-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span className="window-title">biography_stream.md</span>
                        </div>
                        <div className="bio-body">
                            <h3>Hello, World! I'm Prakash (Kaku) 👋</h3>
                            <p>
                                I am a highly motivated **MERN Stack Fresher** specializing in building modern full-stack web applications. My coding journey is driven by absolute consistency, building deep-dive self-taught projects, and writing pristine, component-based architectures.
                            </p>
                            <p>
                                I thrive on translating complex layouts into responsive React interfaces and developing secure, clean RESTful APIs using Node, Express, and MongoDB. I treat consistency as my core foundation, committing code daily and optimizing performance streams.
                            </p>
                            <div className="focus-badges">
                                <span className="focus-badge">#FrontendMastery</span>
                                <span className="focus-badge">#BackendPipelines</span>
                                <span className="focus-badge">#MERNFresher</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="about-stats-row" ref={statsRef}>

                    <div className="stat-box shadow-cyan">
                        <div className="stat-value">340+</div>
                        <div className="stat-label">TOTAL COMMITS</div>
                        <div className="stat-details">Mock active uploads</div>
                    </div>

                    <div className="stat-box shadow-purple">
                        <div className="stat-value">14 Days</div>
                        <div className="stat-label">LONGEST STREAK</div>
                        <div className="stat-details">Consistent daily practice</div>
                    </div>

                    <div className="stat-box shadow-green">
                        <div className="stat-value">98.4%</div>
                        <div className="stat-label">BUILD STABILITY</div>
                        <div className="stat-details">Zero-error compilation</div>
                    </div>

                    <div className="stat-box shadow-amber">
                        <div className="stat-value">80+</div>
                        <div className="stat-label">REST API CALLS</div>
                        <div className="stat-details">Daily postman requests</div>
                    </div>

                </div>

                <div className="github-grid-widget" ref={gridContainerRef}>
                    <div className="widget-header-bar">
                        <div className="header-indicators">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <h3>GITHUB COMMIT REPLICA // ANNUAL ACTIVITY MATRIX</h3>
                        <span className="git-branch">Branch: <strong>main</strong></span>
                    </div>

                    <div className="calendar-scroll-container">
                        <div className="calendar-grid">

                            {activeCell && (
                                <div
                                    className="grid-tooltip"
                                    style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
                                >
                                    <strong>{activeCell.contributions} commits</strong> on {activeCell.date}
                                </div>
                            )}

                            <div className="weeks-wrapper">
                                {contributionGrid.current.map((week, wIndex) => (
                                    <div key={wIndex} className="grid-week">
                                        {week.map((cell, dIndex) => (
                                            <div
                                                key={dIndex}
                                                className={`grid-cell level-${cell.level}`}
                                                onMouseEnter={(e) => handleMouseEnter(e, cell)}
                                                onMouseLeave={handleMouseLeave}
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="calendar-legend">
                        <span className="legend-label">Consistency Scale:</span>
                        <div className="legend-cells">
                            <span>Less</span>
                            <div className="grid-cell level-0"></div>
                            <div className="grid-cell level-1"></div>
                            <div className="grid-cell level-2"></div>
                            <div className="grid-cell level-3"></div>
                            <div className="grid-cell level-4"></div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutPage;