import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="hero">
        <h1 className="hero-title">Basketball Betting App</h1>
        <p className="hero-subtitle">Experience the thrill of basketball and betting combined.</p>
        <button className="cta-button">Get Started</button>
      </header>
      <section className="features">
        <h2>Why and How was it made ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Purpose</h3>
            <p>Project website for Database Management course. </p>
          </div>
          <div className="feature-card">
            <h3>Technologies and Sofware Used</h3>
            <p>Python, Django, ReactJS, Javascript, CSS, Postman, MySQL</p>
          </div>
          <div className="feature-card">
            <h3>Who are we ?</h3>
            <p>CPSC 471 Group 16 - BBET </p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>Developed by: <strong>Shaim Momin</strong></p>
      </footer>
    </div>
  );
}

export default Home;
