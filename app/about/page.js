"use client";
import Image from 'next/image';
import TeamCarousel from "../components/teamcarousel";

export default function AboutPage() {
  return (
    <div className="page-container">
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>About <span className="highlight">Budgy</span></h1>
            <p>Empowering individuals and families to achieve financial freedom through smart budgeting and expert guidance.</p>
          </div>
        </section>

        {/* Company History Section */}
        <section className="history-section">
          <div className="container">
            <h2>Our Story</h2>
            <p>
              Founded in 2020 by a team of financial experts and technology professionals, Budgy was born from a simple belief: 
              everyone deserves access to professional-grade financial planning tools. After witnessing countless individuals 
              struggle with complex financial decisions and expensive advisory services, we set out to democratize financial planning.
            </p>
            <p>
              What started as a simple budgeting app has evolved into a comprehensive financial wellness platform, serving over 
              100,000 users worldwide. Our journey has been driven by one core mission: making financial literacy accessible, 
              affordable, and actionable for everyone.
            </p>
          </div>
        {/* Mission & Vision Section */}
        <section className="mission-vision-section">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <div className="icon">🎯</div>
                <h3>Our Mission</h3>
                <p>
                  To empower individuals and families with the tools, knowledge, and confidence they need to make informed 
                  financial decisions and achieve their dreams. We believe financial wellness should be accessible to everyone, 
                  regardless of their starting point or income level.
                </p>
              </div>
              <div className="vision-card">
                <div className="icon">🌟</div>
                <h3>Our Vision</h3>
                <p>
                  A world where financial stress is eliminated through education, technology, and personalized guidance. 
                  We envision a future where every person has the tools and knowledge to build wealth, achieve their goals, 
                  and live with financial confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
        </section>
        {/* Team Section */}
        <TeamCarousel />
      </main>
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .main-content {
          flex: 1;
          width: 100%;
          margin: 0 auto;
          margin-top: 80px; /* Add margin to account for fixed navbar */
        }
        
        .hero-section {
          background: linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8)),
                      url('https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: white;
          padding: 0 50px;
        }
        
        .hero-content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .highlight {
          color: #FACC15;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          max-width: 500px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .history-section {
          padding: 80px 0;
          background: white;
        }
        
        .history-section h2 {
          font-size: 2.5rem;
          color: #2563EB;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .history-section p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #64748b;
          margin-bottom: 1.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .mission-vision-section {
          padding: 80px 0;
          background: #f8fafc;
        }
        
        .mission-vision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }
        
        .mission-card,
        .vision-card {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .mission-card:hover,
        .vision-card:hover {
          transform: translateY(-5px);
        }
        
        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .mission-card h3,
        .vision-card h3 {
          font-size: 1.5rem;
          color: #2563EB;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .mission-card p,
        .vision-card p {
          color: #64748b;
          line-height: 1.7;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 0 20px;
            text-align: center;
            justify-content: center;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .mission-vision-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .mission-card,
          .vision-card {
            padding: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.8rem;
          }
          
          .history-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
} 