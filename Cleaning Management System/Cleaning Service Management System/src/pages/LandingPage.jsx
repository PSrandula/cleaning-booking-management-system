import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const cleaningHero = "https://plus.unsplash.com/premium_photo-1683141112334-d7d404f6e716?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xlYW4lMjBtYW5hZ2VtZW50JTIwc3lzdGVtfGVufDB8fDB8fHww";

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-primary text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-2xl font-bold">Cleaning Management System</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/login" className="hover:text-light transition">Login</Link>
            <Link to="/signup" className="bg-white text-primary px-6 py-2 rounded-full hover:bg-light transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Professional Cleaning Services At Your Doorstep
            </h1>
            <p className="text-xl text-light mb-8">
              Book expert cleaners with just a few clicks. Spotless homes, happy lives.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/signup" 
                className="bg-white text-primary px-8 py-3 rounded-full text-center font-semibold hover:bg-light transition"
              >
                Book Now
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={cleaningHero} 
              alt="Professional cleaning service" 
              className="rounded-xl shadow-2xl w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;