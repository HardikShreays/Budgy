"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.logoSection}>
            <Image src="/icon-budgy.png" alt="Budgy Logo" width={40} height={40} />
            <h3 style={styles.logoText}>Budgy</h3>
          </div>
          <p style={styles.description}>
            Your smart financial companion for better money management and financial freedom.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><Link href="/" style={styles.link}>Home</Link></li>
            <li><Link href="/about" style={styles.link}>About Us</Link></li>
            <li><Link href="/services" style={styles.link}>Services</Link></li>
            <li><Link href="/blog" style={styles.link}>Blog</Link></li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Resources</h4>
          <ul style={styles.linkList}>
            <li><Link href="/help" style={styles.link}>Help Center</Link></li>
            <li><Link href="/faq" style={styles.link}>FAQ</Link></li>
            <li><Link href="/contact" style={styles.link}>Contact Us</Link></li>
            <li><Link href="/dashboard" style={styles.link}>Dashboard</Link></li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Legal</h4>
          <ul style={styles.linkList}>
            <li><Link href="/privacy" style={styles.link}>Privacy Policy</Link></li>
            <li><Link href="/terms" style={styles.link}>Terms of Service</Link></li>
            <li><Link href="/security" style={styles.link}>Security</Link></li>
            <li><Link href="/cookies" style={styles.link}>Cookie Policy</Link></li>
          </ul>
        </div>
        
        <div style={styles.section}>
          <h4 style={styles.heading}>Newsletter</h4>
          <p style={styles.description}>
            Stay updated with the latest financial tips and product updates.
          </p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.emailInput}
            />
            <button style={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <div style={styles.socialLinks}>
          <a href="https://twitter.com/budgy" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            Twitter
          </a>
          <a href="https://linkedin.com/company/budgy" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            LinkedIn
          </a>
          <a href="https://instagram.com/budgy" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            Instagram
          </a>
        </div>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} Budgy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "60px 0 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
  },
  section: {
    marginBottom: "20px",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    color: "#3B82F6",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#a0a0a0",
    marginTop: "10px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#ffffff",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#a0a0a0",
    textDecoration: "none",
    fontSize: "14px",
    lineHeight: "2",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#3B82F6",
    },
  },
  newsletterForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },
  emailInput: {
    padding: "10px",
    border: "1px solid #333",
    borderRadius: "4px",
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    fontSize: "14px",
  },
  subscribeBtn: {
    padding: "10px 15px",
    backgroundColor: "#3B82F6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.3s ease",
  },
  bottomSection: {
    maxWidth: "1200px",
    margin: "40px auto 0",
    padding: "20px",
    borderTop: "1px solid #333",
    textAlign: "center",
  },
  socialLinks: {
    marginBottom: "20px",
  },
  socialLink: {
    color: "#a0a0a0",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "14px",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#3B82F6",
    },
  },
  copyright: {
    fontSize: "14px",
    color: "#a0a0a0",
    margin: 0,
  },
};

export default Footer; 