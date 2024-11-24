import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Navigation between pages
import axios from 'axios'; // For API calls
import '../styles/signup.css'; // CSS for styling

function Signup() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    deposit: '',
  });

  // State for displaying messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Destructure form data for easy validation
    const { name, email, password, confirmPassword, dob, deposit } = formData;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword || !dob || !deposit) {
      setError('All fields are required.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate deposit value
    if (isNaN(deposit) || parseFloat(deposit) <= 0) {
      setError('Deposit must be a valid positive number.');
      return;
    }

    try {
      // Submit form data to backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        dob,
        deposit: parseFloat(deposit), // Convert deposit to number
      });

      // Handle success
      setSuccess(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        deposit: '',
      }); // Reset form fields
    } catch (err) {
      // Handle errors from backend
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
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
