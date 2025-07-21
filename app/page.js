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
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
        }
        
        .hero-text {
          flex: 1;
        }
        
        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        
        .highlight {
          color: #FACC15;
          position: relative;
        }
        
        .hero-text p {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #f0f9ff;
          margin-bottom: 2rem;
        }
        
        .hero-form {
          flex: 0 0 auto;
        }
        
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
          
          .hero-text h1 {
            font-size: 2.5rem;
          }
          
          .hero-text p {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
