"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const services = [
    {
      id: 1,
      title: "Personal Budget Planning",
      shortDescription: "Comprehensive budget planning for individuals",
      detailedDescription: "Our personal budget planning service helps you create a customized financial roadmap. We analyze your income, expenses, and financial goals to develop a sustainable budget that works for your lifestyle. Our experts provide ongoing support and adjustments to ensure you stay on track.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Investment Advisory",
      shortDescription: "Professional investment guidance and portfolio management",
      detailedDescription: "Make informed investment decisions with our expert advisory services. We provide personalized investment strategies based on your risk tolerance, financial goals, and timeline. Our team monitors market trends and adjusts your portfolio to maximize returns while minimizing risk.",
      image: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Debt Management",
      shortDescription: "Strategic debt reduction and consolidation services",
      detailedDescription: "Take control of your debt with our comprehensive management services. We help you develop strategies to pay down debt efficiently, negotiate with creditors, and explore consolidation options. Our goal is to help you become debt-free while maintaining your quality of life.",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Retirement Planning",
      shortDescription: "Secure your financial future with retirement planning",
      detailedDescription: "Plan for a comfortable retirement with our comprehensive planning services. We help you calculate retirement needs, optimize savings strategies, and choose the right investment vehicles. Our experts ensure you're on track to meet your retirement goals.",
      image: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "Tax Optimization",
      shortDescription: "Maximize savings through strategic tax planning",
      detailedDescription: "Minimize your tax burden with our optimization strategies. We identify deductions, credits, and tax-efficient investment options to help you keep more of your hard-earned money. Our year-round planning approach ensures you're always prepared for tax season.",
      image: "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I get started with Budgy?",
      answer: "Getting started is easy! Simply sign up for a free account, and you'll have access to our basic budgeting tools. For personalized services, schedule a consultation with one of our financial experts."
    },
    {
      id: 2,
      question: "What makes Budgy different from other financial apps?",
      answer: "Budgy combines automated tracking with personalized human expertise. While our app handles the day-to-day tracking, our certified financial advisors provide strategic guidance tailored to your unique situation."
    },
    {
      id: 3,
      question: "Is my financial data secure?",
      answer: "Absolutely. We use bank-level encryption and security measures to protect your data. We never sell your information to third parties, and you maintain full control over your financial data."
    },
    {
      id: 4,
      question: "Do you offer services for businesses?",
      answer: "Yes! We offer specialized business financial management services including cash flow analysis, expense tracking, and financial planning for small to medium-sized businesses."
    },
    {
      id: 5,
      question: "What are your pricing plans?",
      answer: "We offer a free basic plan with essential budgeting tools, and premium plans starting at $9.99/month that include advanced features and access to financial advisors."
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Financial Services</h1>
          <p>Comprehensive financial solutions tailored to your needs</p>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="services-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-carousel">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => handleServiceClick(service)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="service-image"
                />
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Service View */}
          {selectedService && (
            <div className="service-detail">
              <div className="detail-content">
                <div className="detail-text">
                  <h3>{selectedService.title}</h3>
                  <p>{selectedService.detailedDescription}</p>
                  <button className="contact-btn">Get Started</button>
                </div>
                <div className="detail-image">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    width={400}
                    height={300}
                    className="detail-img"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  {faq.question}
                  <span className={`faq-icon ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                    +
                  </span>
                </button>
                {expandedFAQ === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
          margin-top: 80px;
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

        .hero-content p {
          font-size: 1.2rem;
          max-width: 500px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .services-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .services-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2563EB;
          margin-bottom: 3rem;
        }

        .services-carousel {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          padding: 20px 0;
          scroll-behavior: smooth;
        }

        .service-card {
          min-width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
        }

        .service-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
        }

        .service-content {
          padding: 1.5rem;
        }

        .service-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2563EB;
          margin-bottom: 0.5rem;
        }

        .service-content p {
          color: #64748b;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .learn-more-btn {
          background: #3B82F6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .learn-more-btn:hover {
          background: #2563EB;
        }

        .service-detail {
          margin-top: 3rem;
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .detail-content {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .detail-text {
          flex: 1;
        }

        .detail-text h3 {
          font-size: 2rem;
          color: #2563EB;
          margin-bottom: 1rem;
        }

        .detail-text p {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .contact-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .contact-btn:hover {
          transform: translateY(-2px);
        }

        .detail-image {
          flex: 1;
        }

        .detail-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }

        .faq-section {
          padding: 80px 0;
          background: white;
        }

        .faq-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #2563EB;
          margin-bottom: 3rem;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1rem;
        }

        .faq-question {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 1.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-icon {
          font-size: 1.5rem;
          color: #3B82F6;
          transition: transform 0.3s ease;
        }

        .faq-icon.expanded {
          transform: rotate(45deg);
        }

        .faq-answer {
          padding-bottom: 1.5rem;
          color: #64748b;
          line-height: 1.6;
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

          .services-carousel {
            flex-direction: column;
            align-items: center;
          }

          .service-card {
            min-width: 100%;
            max-width: 400px;
          }

          .detail-content {
            flex-direction: column;
          }

          .detail-text {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;