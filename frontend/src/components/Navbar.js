import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

function Navbar() {
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
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
