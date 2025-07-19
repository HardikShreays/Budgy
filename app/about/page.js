"use client";
import About from "../components/about";
import Navbar from "../components/navbar";
import { AuthProvider } from "../context/Authcontext";

export default function AboutPage() {
  return (
    <AuthProvider>
      <div className="page-container">
        <main className="main-content">
          <About />
        </main>

        <style jsx>{`
          .page-container {
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
            margin-top: 80px; /* Add margin to account for fixed navbar */
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
          }

          @media (max-width: 480px) {
            .main-content {
              padding: 10px;
            }

            .footer {
              padding: 15px;
            }
          }
        `}</style>
      </div>
    </AuthProvider>
  );
} 