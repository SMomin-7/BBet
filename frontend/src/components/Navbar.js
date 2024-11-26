import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Import the Notification component
import '../styles/Navbar.css'; // Import the CSS file

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [notification, setNotification] = useState(null); // State for logout notification
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
    setNotification({ message: 'Logged out successfully!', type: 'success' }); // Set notification
    setTimeout(() => {
      navigate('/login'); // Redirect to login page
    }, 2000); // Delay navigation to show the notification
  };

  return (
    <>
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
                  <Link to="/teams" className="navbar-link"> {/* Add the Teams link */}
                    Teams
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="navbar-link">
                    Leaderboard
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

      {/* Render the notification if it exists */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}

export default Navbar;
