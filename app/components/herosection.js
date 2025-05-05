import React from 'react';
import './herosection.css';
 // Import the CSS file

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <h1>Welcome to <span>Budgy</span></h1>
                <p>Your ultimate budget planner and calculator. Take control of your finances today!</p>
                <button className="hero-button"><a href='/signup'>Get Started</a></button>
                <p>Join us and start your financial journey!</p>
            </div>
        </section>
    );
};

export default HeroSection;
