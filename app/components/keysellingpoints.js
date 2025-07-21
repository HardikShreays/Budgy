import React from 'react';
import Image from 'next/image';

const KeySellingPoints = () => {
  const sellingPoints = [
    {
      id: 1,
      title: "Smart Budget Management",
      description: "Take control of your finances with our intelligent budgeting system. Track expenses automatically, set spending limits, and receive real-time alerts when you're approaching your budget limits. Our AI-powered insights help you identify spending patterns and optimize your financial habits.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageLeft: false
    },
    {
      id: 2,
      title: "Investment Portfolio Tracking",
      description: "Monitor all your investments in one comprehensive dashboard. Track performance across multiple accounts, analyze asset allocation, and get personalized recommendations based on your risk tolerance and financial goals. Stay informed with real-time market data and expert insights.",
      image: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageLeft: true
    },
    {
      id: 3,
      title: "Debt Elimination Strategy",
      description: "Break free from debt with our proven elimination strategies. Choose between debt snowball or avalanche methods, track your progress with visual charts, and stay motivated with milestone celebrations. Our calculators show you exactly when you'll be debt-free.",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageLeft: false
    },
    {
      id: 4,
      title: "Retirement Planning Made Simple",
      description: "Secure your financial future with comprehensive retirement planning tools. Calculate how much you need to save, optimize your 401(k) contributions, and explore different retirement scenarios. Our projections help you stay on track for a comfortable retirement.",
      image: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=600",
      imageLeft: true
    }
  ];

  return (
    <section className="key-selling-points">
      <div className="container">
        {sellingPoints.map((point) => (
          <div key={point.id} className={`selling-point ${point.imageLeft ? 'image-left' : 'image-right'}`}>
            <div className="content-section">
              <h3>{point.title}</h3>
              <p>{point.description}</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            <div className="image-section">
              <Image
                src={point.image}
                alt={point.title}
                width={500}
                height={350}
                className="selling-point-image"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .key-selling-points {
          padding: 80px 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .selling-point {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-bottom: 6rem;
          min-height: 400px;
        }

        .selling-point:last-child {
          margin-bottom: 0;
        }

        .selling-point.image-left {
          flex-direction: row-reverse;
        }

        .content-section {
          flex: 1;
          padding: 2rem 0;
        }

        .content-section h3 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .content-section p {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .learn-more-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .learn-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .image-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .selling-point-image {
          width: 100%;
          height: 350px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .selling-point-image:hover {
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .selling-point {
            flex-direction: column !important;
            gap: 2rem;
            margin-bottom: 4rem;
            text-align: center;
          }

          .content-section h3 {
            font-size: 1.8rem;
          }

          .content-section p {
            font-size: 1rem;
          }

          .selling-point-image {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .content-section h3 {
            font-size: 1.5rem;
          }

          .selling-point-image {
            height: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default KeySellingPoints;