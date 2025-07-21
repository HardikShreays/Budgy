"use client";
import React from 'react';
import Image from 'next/image';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Budgeting Tips for Beginners",
      description: "Learn the fundamental principles of budgeting that will help you take control of your finances and build a secure financial future.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Build an Emergency Fund in 6 Months",
      description: "Discover practical strategies to build a robust emergency fund that will protect you from unexpected financial challenges.",
      image: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Michael Chen",
      date: "January 12, 2025",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Investment Basics: Where to Start Your Journey",
      description: "A comprehensive guide for beginners looking to start their investment journey with confidence and knowledge.",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Emily Rodriguez",
      date: "January 10, 2025",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Debt Snowball vs. Debt Avalanche: Which is Right for You?",
      description: "Compare two popular debt repayment strategies and learn which approach will work best for your financial situation.",
      image: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "David Thompson",
      date: "January 8, 2025",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Retirement Planning in Your 20s: Why Starting Early Matters",
      description: "Understand the power of compound interest and why starting your retirement planning early can make a massive difference.",
      image: "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Lisa Park",
      date: "January 5, 2025",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Tax Season Preparation: A Complete Checklist",
      description: "Get organized for tax season with our comprehensive checklist and maximize your refund while avoiding common mistakes.",
      image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Robert Kim",
      date: "January 3, 2025",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Blog</h1>
          <p>Expert insights, tips, and strategies to help you achieve financial success</p>
        </div>
      </section>

      {/* Blog Posts List */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image-container">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="blog-image"
                  />
                  <div className="read-time">{post.readTime}</div>
                </div>
                <div className="blog-content">
                  <h2>{post.title}</h2>
                  <p className="blog-description">{post.description}</p>
                  <div className="blog-meta">
                    <div className="author-info">
                      <span className="author-name">By {post.author}</span>
                      <span className="blog-date">{post.date}</span>
                    </div>
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-page {
          margin-top: 80px;
        }

        .hero-section {
          background: linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8)),
                      url('https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.3rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
        }

        .blog-image-container {
          position: relative;
          overflow: hidden;
        }

        .blog-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }

        .read-time {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(59, 130, 246, 0.9);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .blog-content {
          padding: 1.5rem;
        }

        .blog-content h2 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .blog-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .blog-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .author-name {
          font-weight: 600;
          color: #3B82F6;
          font-size: 0.9rem;
        }

        .blog-date {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .read-more-btn {
          background: #3B82F6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .read-more-btn:hover {
          background: #2563EB;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            font-size: 1.1rem;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .blog-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;