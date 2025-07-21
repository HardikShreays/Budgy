import React, { useState, useRef } from 'react';
import Image from 'next/image';

const TeamCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "CEO & Founder",
      bio: "Former Goldman Sachs analyst with 15+ years in financial planning. Passionate about making financial literacy accessible to everyone.",
      photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "CTO",
      bio: "Tech entrepreneur and software architect. Previously led engineering teams at fintech startups, specializing in secure financial applications.",
      photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Head of Financial Advisory",
      bio: "Certified Financial Planner (CFP) with expertise in retirement planning and investment strategies. Helps clients achieve their financial goals.",
      photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 4,
      name: "David Thompson",
      title: "Lead Product Designer",
      bio: "UX/UI expert focused on creating intuitive financial interfaces. Believes great design makes complex financial concepts simple to understand.",
      photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 5,
      name: "Lisa Park",
      title: "Head of Customer Success",
      bio: "Customer experience specialist dedicated to ensuring every user achieves their financial goals. Former banking relationship manager.",
      photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 6,
      name: "Robert Kim",
      title: "Senior Financial Analyst",
      bio: "Investment research expert with deep knowledge of market trends and portfolio optimization. Helps develop our investment recommendation algorithms.",
      photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setCurrentIndex(Math.min(teamMembers.length - 1, currentIndex + 1));
    }
  };

  return (
    <section className="team-carousel-section">
      <div className="container">
        <h2>Meet the Team</h2>
        <p className="section-subtitle">
          Our experienced team of financial experts and technology professionals is dedicated to your success
        </p>
        
        <div className="carousel-container">
          <button 
            className="carousel-btn prev-btn" 
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          >
            &#8249;
          </button>
          
          <div className="carousel" ref={carouselRef}>
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="photo-container">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="team-photo"
                  />
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <h4>{member.title}</h4>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-btn next-btn" 
            onClick={scrollRight}
            disabled={currentIndex >= teamMembers.length - 3}
          >
            &#8250;
          </button>
        </div>
      </div>

      <style jsx>{`
        .team-carousel-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .team-carousel-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2563EB;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #64748b;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: hidden;
          scroll-behavior: smooth;
          flex: 1;
          padding: 10px 0;
        }

        .team-card {
          min-width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          text-align: center;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
        }

        .photo-container {
          padding: 2rem 2rem 1rem;
        }

        .team-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e5e7eb;
          transition: border-color 0.3s ease;
        }

        .team-card:hover .team-photo {
          border-color: #3B82F6;
        }

        .team-content {
          padding: 0 2rem 2rem;
        }

        .team-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .team-content h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #3B82F6;
          margin-bottom: 1rem;
        }

        .team-content p {
          color: #64748b;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .carousel-btn {
          background: #3B82F6;
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-btn:hover:not(:disabled) {
          background: #2563EB;
        }

        .carousel-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .carousel-container {
            flex-direction: column;
          }

          .carousel {
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .carousel-btn {
            display: none;
          }

          .team-card {
            min-width: 280px;
          }

          .team-photo {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamCarousel;