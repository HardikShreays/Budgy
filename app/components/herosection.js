import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './herosection.css';
 // Import the CSS file

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Take Control of Your <span>Financial Future</span></h1>
                    <p className="hero-subtitle">Your ultimate budget planner and calculator. Track expenses, set goals, and achieve financial freedom.</p>
                    
                    <div className="hero-features">
                        <div className="feature">
                            <div className="feature-icon">📊</div>
                            <h3>Smart Budgeting</h3>
                            <p>Create and manage budgets with ease</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">🎯</div>
                            <h3>Goal Tracking</h3>
                            <p>Set and achieve your financial goals</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">📱</div>
                            <h3>Mobile Friendly</h3>
                            <p>Access your budget anywhere, anytime</p>
                        </div>
                    </div>

                    <div className="cta-container">
                        <Link href="/signup" className="cta-button primary">
                            Get Started Free
                        </Link>
                        <Link href="/about" className="cta-button secondary">
                            Learn More
                        </Link>
                    </div>

                    <div className="trust-badges">
                        <div className="badge">
                            <span className="badge-number">10K+</span>
                            <span className="badge-text">Active Users</span>
                        </div>
                        <div className="badge">
                            <span className="badge-number">4.8</span>
                            <span className="badge-text">User Rating</span>
                        </div>
                        <div className="badge">
                            <span className="badge-number">24/7</span>
                            <span className="badge-text">Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
