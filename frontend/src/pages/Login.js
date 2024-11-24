import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Login.css';

function Login() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    console.log({ email, password }); // For now, just log the input
    // In the future, send these details to your backend API
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Show error message */}
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
