"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import React, { useState } from "react";
import Head from "next/head";
import About from "./components/about";

export default function Home() {
  return (
    <div className="app-container">
      <main className="main-content">
        <HeroSection />
        <About />
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        p {
          color: #34495e;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #ecf0f1;
          color: #7f8c8d;
          font-size: 0.9rem;
          margin-top: auto;
        }
        @media (max-width: 768px) {
          .main-content {
            padding: 15px;
          }
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .main-content {
            padding: 10px;
          }
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 0.9rem;
          }
          .footer {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}
