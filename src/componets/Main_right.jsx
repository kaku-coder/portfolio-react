import React from 'react'
import './Main_right.css'

const Main_right = () => {
    return (
        <div className="main-right-container">
            <div className="code-window">
                <div className="window-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="window-title">mission.js</span>
                </div>
                <div className="window-body">
                    <pre><code>{`const mission = {
    role: "MERN Developer",
    goal: "Build Amazing Products",
    status: "Learning Every Day 🚀"
};

console.log(mission);`}</code></pre>
                </div>
            </div>
        </div>
    )
}

export default Main_right