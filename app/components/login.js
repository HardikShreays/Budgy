"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/Authcontext';

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to login the user
      console.log('Form submitted:', formData);
      // After successful login, use the login function from context
      login(formData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="logo-container">
          <Image src="/icon-budgy.png" alt="Budgy Logo" width={60} height={60} />
          <h1>Budgy</h1>
        </div>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="forgot-password">
            <Link href="/forgot-password" className="link">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-button">Log In</button>
          
          <div className="signup-link">
            Don't have an account? <Link href="/signup" className="link">Sign up</Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f8f9fa;
        }

        .login-form-container {
          background: white;
          padding: 2.5rem;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .logo-container h1 {
          margin-top: 0.5rem;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h2 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          color: #34495e;
          font-size: 0.9rem;
          font-weight: 500;
        }

        input {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #3498db;
        }

        input.error {
          border-color: #e74c3c;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.8rem;
        }

        .forgot-password {
          text-align: right;
          margin-top: -0.5rem;
        }

        .login-button {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          padding: 0.8rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .signup-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #64748b;
          font-size: 0.9rem;
        }

        .link {
          color: #3B82F6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .link:hover {
          color: #2563EB;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-form-container {
            padding: 1.5rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          input {
            padding: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login; 