"client";
"use client";
import Image from "next/image";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import React, { useState } from "react";
import Head from "next/head";
import { AuthProvider } from "./context/Authcontext";
import About from "./components/about";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return (
    <AuthProvider>
      <div>
        <Head>
          <title>Budgy</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Budgy - Your personal finance assistant"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />
        <HeroSection />
        <About />
        <footer>
          <p>&copy; 2025 Budgy. All rights reserved.</p>
        </footer>

        <style jsx>{`
          div {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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

          footer {
            text-align: center;
            padding: 10px;
            background-color: #ecf0f1;
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        `}</style>
      </div>
    </AuthProvider>
  );
}
