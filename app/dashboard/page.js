"use client";
import React from 'react';
import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  // Don't render anything if not logged in (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard; 