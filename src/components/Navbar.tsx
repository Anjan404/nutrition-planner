import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = user ? [
    { name: 'Diet Plan', path: '/diet-plan' },
    { name: 'Meals', path: '/meal-suggestions' },
    { name: 'Progress', path: '/progress-tracker' },
    { name: 'Food Tracker', path: '/food-tracker' },
  ] : [
    { name: 'Features', path: '/#features' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Testimonials', path: '/#testimonials' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-vital-mint/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-primary p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
            >
              <Heart className="h-6 w-6 text-white" />
            </motion.div>
            <span className="font-poppins font-bold text-xl text-graphite-ink">
              Nutri<span className="text-vital-mint">Gen</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-poppins font-medium transition-colors duration-200 relative ${
                  isActive(item.path)
                    ? 'text-vital-mint'
                    : 'text-graphite-ink hover:text-vital-mint'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vital-mint rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="font-poppins font-medium">Profile</span>
                </button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    <Link
                      to="/profile-setup"
                      className="block px-4 py-2 text-sm text-graphite-ink hover:bg-soft-cloud transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile Setup
                    </Link>
                    <Link
                      to="/cultural-preferences"
                      className="block px-4 py-2 text-sm text-graphite-ink hover:bg-soft-cloud transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Preferences
                    </Link>
                    <Link
                      to="/wearable-integration"
                      className="block px-4 py-2 text-sm text-graphite-ink hover:bg-soft-cloud transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Wearables
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-alert-red hover:bg-soft-cloud transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="font-poppins font-medium text-graphite-ink hover:text-vital-mint transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-poppins font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-graphite-ink hover:text-vital-mint transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-vital-mint/10"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block font-poppins font-medium py-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-vital-mint'
                    : 'text-graphite-ink hover:text-vital-mint'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <div className="pt-4 space-y-3">
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 font-poppins font-medium text-graphite-ink hover:text-vital-mint transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gradient-primary text-white py-3 rounded-lg font-poppins font-medium hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
            {user && (
              <div className="pt-4 space-y-3 border-t border-vital-mint/10">
                <Link
                  to="/profile-setup"
                  onClick={() => setIsOpen(false)}
                  className="block font-poppins font-medium py-2 text-graphite-ink hover:text-vital-mint transition-colors"
                >
                  Profile Setup
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left font-poppins font-medium py-2 text-alert-red hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};