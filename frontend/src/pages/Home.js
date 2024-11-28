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
        <h2>Why Bet With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Action</h3>
            <p>Stay ahead with live scores and dynamic betting odds.</p>
          </div>
          <div className="feature-card">
            <h3>Seamless Experience</h3>
            <p>Place bets with ease on our user-friendly platform.</p>
          </div>
          <div className="feature-card">
            <h3>Elite Security</h3>
            <p>Your data and transactions are protected at all times.</p>
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
