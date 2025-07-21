import React, { useState, useRef } from 'react';
import Image from 'next/image';

const ProductCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      title: "Budget Tracker Pro",
      description: "Advanced budgeting with AI-powered insights and spending predictions",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$9.99/month"
    },
    {
      id: 2,
      title: "Investment Portfolio Manager",
      description: "Professional-grade portfolio tracking and analysis tools",
      image: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$19.99/month"
    },
    {
      id: 3,
      title: "Debt Freedom Planner",
      description: "Strategic debt elimination with personalized payoff strategies",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$14.99/month"
    },
    {
      id: 4,
      title: "Retirement Calculator Plus",
      description: "Comprehensive retirement planning with scenario modeling",
      image: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$24.99/month"
    },
    {
      id: 5,
      title: "Tax Optimizer",
      description: "Year-round tax planning and optimization strategies",
      image: "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$12.99/month"
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
      setCurrentIndex(Math.min(products.length - 1, currentIndex + 1));
    }
  };

  return (
    <section className="product-carousel-section">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="carousel-container">
          <button 
            className="carousel-btn prev-btn" 
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          >
            &#8249;
          </button>
          
          <div className="carousel" ref={carouselRef}>
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="product-image"
                />
                <div className="product-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">{product.price}</span>
                    <button className="cta-btn">Get Started</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-btn next-btn" 
            onClick={scrollRight}
            disabled={currentIndex >= products.length - 3}
          >
            &#8250;
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-carousel-section {
          padding: 80px 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .product-carousel-section h2 {
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

        .product-card {
          min-width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .product-content p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #3B82F6;
        }

        .cta-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
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

          .product-card {
            min-width: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductCarousel;