import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // For API calls
import '../styles/signup.css'; // CSS for styling

function Signup() {
  const navigate = useNavigate(); // For programmatic navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    deposit: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { name, email, password, confirmPassword, dob, deposit } = formData;

    if (!name || !email || !password || !confirmPassword || !dob || !deposit) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (isNaN(deposit) || parseFloat(deposit) <= 0) {
      setError('Deposit must be a valid positive number.');
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        name,
        email,
        password,
        dob,
        deposit: parseFloat(deposit), // Convert deposit to a number
      });

      setSuccess(true); // Indicate success
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        deposit: '',
      }); // Reset form fields
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  if (success) {
    return (
      <div className="signup-container">
        <h1>Signup Successful!</h1>
        <p>Your account has been created. You can now log in.</p>
        <button
          className="login-button"
          onClick={() => navigate('/login')} // Redirect to login page
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deposit">Initial Deposit ($):</label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            placeholder="Enter initial deposit"
            required
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <p className="switch-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
