"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Image src={"/icon-budgy.png"} alt="Budgy Logo" width={50} height={50} />
        Budgy
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <a href="#home" style={styles.navLink} className="nav-link">Home</a>
        </li>
        <li style={styles.navItem}>
          <a href="#about" style={styles.navLink} className="nav-link">About</a>
        </li>
        <li style={styles.navItem}>
          <a href="#contact" style={styles.navLink} className="nav-link">Contact</a>
        </li>
        <li style={styles.navItem}>
          {isLoggedIn ? (
            <button style={styles.button} onClick={logout}>Logout</button>
          ) : (
            <button style={styles.button} onClick={login}>Login</button>
          )}
        </li>
      </ul>

      {/* Style tag for animation and hover effect */}
      <style jsx>{`
        .nav-link {
          position: relative;
          padding-bottom: 5px;
          color: #3B82F6;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #3B82F6;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #1e40af;
        }
      `}</style>
    </nav>
  );
};

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
    display: "flex",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  navItem: {
    marginLeft: "25px",
  },
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
};

export default Navbar;
