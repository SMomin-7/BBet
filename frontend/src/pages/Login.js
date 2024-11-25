import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import axios from 'axios'; // For API calls
import '../styles/Login.css';

function Login() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // UseNavigate for redirecting after login
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      // Send login data to backend
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      // Handle success
      setSuccess(response.data.message); // Display success message
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to the dashboard after 2 seconds
      }, 2000);
    } catch (err) {
      // Handle backend errors
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Show error message */}
      {success && <p className="success-message">{success}</p>} {/* Show success message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="switch-link">
        Don't have an account? <Link to="/signup">Signup here</Link> {/* Link to Signup */}
      </p>
    </div>
  );
}

export default Login;
