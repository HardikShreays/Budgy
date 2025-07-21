import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      review: "Budgy completely transformed how I manage my finances. The intuitive interface and powerful insights helped me save over $5,000 in my first year!",
      photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      title: "Marketing Manager",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      review: "As a freelancer, tracking expenses was a nightmare. Budgy's automated categorization and reporting features have been a game-changer for my business.",
      photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      title: "Freelance Designer",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      review: "The investment tracking feature is incredible. I can see all my portfolios in one place and make informed decisions based on real-time data.",
      photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      title: "Financial Analyst",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      review: "Budgy helped me pay off $25,000 in debt using their debt snowball strategy. The motivation and clear progress tracking kept me on track.",
      photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
      title: "Software Engineer",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Park",
      review: "The retirement planning tools are fantastic. I now have a clear roadmap to financial independence, and I'm confident in my future.",
      photo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      title: "Teacher",
      rating: 5
    }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1));
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= testimonials.length - 3) {
        setCurrentIndex(0);
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      } else {
        scrollRight();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonial-carousel-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="carousel-container">
          <button 
            className="carousel-btn prev-btn" 
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          >
            &#8249;
          </button>
          
          <div className="carousel" ref={carouselRef}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="review-text">"{testimonial.review}"</p>
                  <div className="customer-info">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="customer-photo"
                    />
                    <div className="customer-details">
                      <h4>{testimonial.name}</h4>
                      <span className="customer-title">{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-btn next-btn" 
            onClick={scrollRight}
            disabled={currentIndex >= testimonials.length - 3}
          >
            &#8250;
          </button>
        </div>
      </div>

      <style jsx>{`
        .testimonial-carousel-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .testimonial-carousel-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2563EB;
          margin-bottom: 3rem;
          font-weight: 700;
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

        .testimonial-card {
          min-width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
        }

        .testimonial-content {
          padding: 2rem;
        }

        .stars {
          margin-bottom: 1rem;
        }

        .star {
          color: #d1d5db;
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }

        .star.filled {
          color: #fbbf24;
        }

        .review-text {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .customer-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .customer-photo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .customer-details h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .customer-title {
          color: #64748b;
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

          .testimonial-card {
            min-width: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;