import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h3>Get Started Today</h3>
        <p>Ready to take control of your finances? Contact us for a free consultation.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="contact-form">
        {submitStatus === 'success' && (
          <div className="success-message">
            Thank you! We'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="error-message">
            Something went wrong. Please try again.
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your financial goals..."
            rows="4"
            required
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <style jsx>{`
        .contact-form-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          box-sizing: border-box;
        }

        .form-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .form-header h3 {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #64748b;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          line-height: 1.5;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background: white;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-top: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .success-message {
          background: #d1fae5;
          color: #065f46;
          padding: 0.75rem;
          border-radius: 6px;
          text-align: center;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          border: 1px solid #a7f3d0;
        }

        .error-message {
          background: #fee2e2;
          color: #991b1b;
          padding: 0.75rem;
          border-radius: 6px;
          text-align: center;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          border: 1px solid #fecaca;
        }

        /* Tablet breakpoint */
        @media (max-width: 1024px) {
          .contact-form-container {
            padding: 1.75rem;
          }
        }

        /* Mobile breakpoint */
        @media (max-width: 768px) {
          .contact-form-container {
            padding: 1.5rem;
            max-width: 100%;
          }
        }

        /* Small mobile breakpoint */
        @media (max-width: 480px) {
          .contact-form-container {
            padding: 1.25rem;
          }

          .form-header h3 {
            font-size: 1.2rem;
          }

          .form-group input,
          .form-group textarea {
            padding: 0.625rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 320px) {
          .contact-form-container {
            padding: 1rem;
          }

          .form-header h3 {
            font-size: 1.1rem;
          }

          .form-group input,
          .form-group textarea {
            padding: 0.5rem;
            font-size: 0.85rem;
          }

          .submit-btn {
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;