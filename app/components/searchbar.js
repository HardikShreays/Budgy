import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for financial services, tips, or resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>

      <style jsx>{`
        .search-bar-container {
          background: #f8fafc;
          padding: 15px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .search-form {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .search-input-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input {
          width: 100%;
          padding: 12px 50px 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .search-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .search-button:hover {
          background: #2563EB;
        }

        @media (max-width: 768px) {
          .search-input {
            font-size: 14px;
            padding: 10px 45px 10px 14px;
          }

          .search-button {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;