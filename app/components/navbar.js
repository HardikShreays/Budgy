"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, login, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Image src={"/icon-budgy.png"} alt="Budgy Logo" width={50} height={50} />
        Budgy
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="hamburger-button"
        style={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <div style={styles.hamburgerIcon}>
          <span style={{...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
          <span style={{...styles.hamburgerLine, opacity: isMenuOpen ? '0' : '1'}}></span>
          <span style={{...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}}></span>
        </div>
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`} style={styles.navLinks}>
        <li className="nav-item">
          <a href="/" style={styles.navLink} className="nav-link-hover">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" style={styles.navLink} className="nav-link-hover">About</a>
        </li>
        <li className="nav-item">
          <a href="#contact" style={styles.navLink} className="nav-link-hover">Contact</a>
        </li>
        <li className="nav-item">
          <a href="/dashboard" style={styles.navLink} className="nav-link-hover">Dashboard</a>
        </li>
        <li className="nav-item">
          {isLoggedIn ? (
            <button style={styles.button} onClick={logout}>Logout</button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={styles.button} onClick={() => router.push('/login')}>Login</button>
              <button style={styles.button} onClick={() => router.push('/signup')}>Sign Up</button>
            </div>
          )}
        </li>
      </ul>

      <style jsx>{`
        /* Hover effect for navigation links */
        .nav-link-hover {
          position: relative;
          padding-bottom: 5px;
          color: #3B82F6;
        }
        .nav-link-hover::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #3B82F6;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
        .nav-link-hover:hover {
          color: #1e40af;
        }

        /* Desktop Styles */
        .nav-links {
          display: flex;
          align-items: center;
        }
        .hamburger-button {
          display: none;
        }
        .nav-item {
          margin-left: 25px; /* Spacing for desktop view */
        }

        /* Mobile Styles (for viewports 768px or less) */
        @media (max-width: 768px) {
          .hamburger-button {
            display: block;
            z-index: 1001;
          }
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background-color: white;
            padding: 80px 20px 20px 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            align-items: center;
          }
          .nav-links.open {
            display: flex;
          }
          .nav-item {
            margin-left: 0; /* Remove desktop spacing */
            margin-bottom: 20px; /* Add vertical spacing for mobile */
          }
        }
      `}</style>
    </nav>
  );
};

// --- Your styles object, now corrected ---
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    backgroundColor: "white",
    color: "#3B82F6",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navLinks: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  // navItem style is now handled entirely in <style jsx>
  navLink: {
    fontSize: "18px",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  },
  button: {
    backgroundColor: "#3B82F6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  hamburgerButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
  },
  hamburgerIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "24px",
    height: "18px",
  },
  hamburgerLine: {
    width: "100%",
    height: "2px",
    backgroundColor: "#3B82F6",
    transition: "all 0.3s ease",
  },
};

export default Navbar;