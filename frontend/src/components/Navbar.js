import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Check login state on component mount and when storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user'); // Check if user exists in localStorage
      setIsLoggedIn(!!user); // Update login status
    };

    checkLoginStatus();

    // Listen for storage changes to update navbar dynamically
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BBET
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/matches" className="navbar-link">
                  View Matches
                </Link>
              </li>
              <li>
                <Link to="/players-statistics" className="navbar-link">
                  Players & Statistics
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-link logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-link">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
