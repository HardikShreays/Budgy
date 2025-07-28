"use client";
import Image from "next/image";
import SearchBar from "./components/searchbar";
import ContactForm from "./components/contactform";
import ProductCarousel from "./components/productcarousel";
import KeySellingPoints from "./components/keysellingpoints";
import TestimonialCarousel from "./components/testimonialcarousel";
import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="app-container">
      <SearchBar />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Take Control of Your <span className="highlight">Financial Future</span></h1>
              <p>Your ultimate budget planner and financial advisor. Track expenses, set goals, and achieve financial freedom with expert guidance.</p>
            </div>
            <div className="hero-form">
              <ContactForm />
            </div>
          </div>
        </section>
        
        <ProductCarousel />
        <KeySellingPoints />
        <TestimonialCarousel />
      </main>
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }
        
        .main-content {
          flex: 1;
          width: 100%;
          margin: 0 auto;
          margin-top: 80px;
        }
        
        .hero-section {
          background: linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8)),
                      url('https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover;
          min-height: 600px;
          display: flex;
          align-items: center;
          color: white;
          padding: 0 20px;
          width: 100%;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
          padding: 2rem 0;
        }
        
        .hero-text {
          flex: 1;
          min-width: 0;
        }
        
        .hero-text h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          word-wrap: break-word;
        }
        
        .highlight {
          color: #FACC15;
          position: relative;
        }
        
        .hero-text p {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          color: #f0f9ff;
          margin-bottom: 2rem;
        }
        
        .hero-form {
          flex: 0 0 auto;
          min-width: 300px;
        }
        
        /* Tablet breakpoint */
        @media (max-width: 1024px) {
          .hero-content {
            gap: 2rem;
            padding: 1.5rem 0;
          }
          
          .hero-form {
            min-width: 280px;
          }
        }
        
        /* Mobile breakpoint */
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding: 0 15px;
          }
          
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
            padding: 3rem 0;
          }
          
          .hero-text h1 {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
          }
          
          .hero-text p {
            font-size: clamp(0.9rem, 3vw, 1.1rem);
          }
          
          .hero-form {
            min-width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
        }
        
        /* Small mobile breakpoint */
        @media (max-width: 480px) {
          .hero-section {
            padding: 0 10px;
          }
          
          .hero-content {
            padding: 2rem 0;
            gap: 1.5rem;
          }
          
          .hero-text h1 {
            font-size: clamp(1.5rem, 7vw, 2rem);
          }
          
          .hero-text p {
            font-size: clamp(0.85rem, 3.5vw, 1rem);
          }
        }
        
        /* Extra small devices */
        @media (max-width: 320px) {
          .hero-content {
            padding: 1.5rem 0;
          }
          
          .hero-text h1 {
            font-size: 1.5rem;
          }
          
          .hero-text p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
