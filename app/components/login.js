"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/Authcontext';

const Login = () => {
  // *** FIX: Destructure authLoading to prevent content flashing ***
  // We assume your AuthContext provides:
  // - login: function to log the user in.
  // - isLoggedIn: boolean indicating auth status.
  // - authLoading: boolean indicating if the initial auth check is running.
  const { login, isLoggedIn, authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // *** FIX: Consolidated error and loading states ***
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirects the user if they are already logged in AND the initial auth check is complete.
    if (!authLoading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, authLoading, router]);

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
    if (!validateForm()) {
      return; // Stop submission if client-side validation fails
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      // *** FIX: Await the login function and handle server-side errors ***
      // The login function in AuthContext should throw an error on failure.
      await login(formData);
      // On successful login, the `isLoggedIn` state will change,
      // and the `useEffect` hook will handle the redirection automatically.
    } catch (error) {
      // Display server-side errors (e.g., "Invalid credentials") to the user.
      setErrors({ form: error.message || 'Invalid email or password.' });
      setIsSubmitting(false); // Re-enable the form on failure
    }
  };
  
  // *** FIX: Show a full-page loader during the initial authentication check ***
  // This is the correct way to prevent the login form from flashing for authenticated users.
  if (authLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
        {/* You can replace this with a proper spinner component */}
      </div>
    );
  }

  // Render the login form only if the initial auth check is complete and the user is not logged in.
  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="logo-container">
          <Image src="/icon-budgy.png" alt="Budgy Logo" width={60} height={60} />
          <h1>Budgy</h1>
        </div>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* *** FIX: Display form-level errors from the server *** */}
          {errors.form && <div className="form-error-message">{errors.form}</div>}

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
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
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
              disabled={isSubmitting}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && <span id="password-error" className="error-message">{errors.password}</span>}
          </div>

          <div className="forgot-password">
            <Link href="/forgot-password" className="link">Forgot Password?</Link>
          </div>

          {/* *** FIX: Disable button and show loading text during submission *** */}
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
          
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
          .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 1.2rem;
          background-color: #f8f9fa;
        }

        .login-button:disabled {
          background: #9ca3af; /* A grey color for disabled state */
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .form-error-message {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
          padding: 0.75rem;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      
      `}</style>
    </div>
  );
};

export default Login;
