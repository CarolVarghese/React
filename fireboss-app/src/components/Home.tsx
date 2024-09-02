// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
      <p className="text-lg mb-4">Fire Boss</p>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <Link to="/signin" className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600 mb-2 md:mb-0">
          Sign In
        </Link>
        <Link to="/signup" className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600 mb-2 md:mb-0">
          Sign Up
        </Link>
        <Link to="/users" className="bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600">
          User Management
        </Link>
      </div>
    </div>
  );
};

export default Home;
