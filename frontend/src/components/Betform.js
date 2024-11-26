import React, { useState } from 'react';
import '../styles/Betform.css'; // Ensure styles exist
import ConfirmationModel from './ConfirmationModel'; // Correct import for ConfirmationModel

function BetForm({ game, onPlaceBet, onClose, userBalance }) {
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to toggle the confirmation modal

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const numericBetAmount = parseFloat(betAmount);
    const numericBalance = parseFloat(userBalance);

    // Validation
    if (!selectedTeam || isNaN(numericBetAmount)) {
      setError('All fields are required.');
      return;
    }

    if (numericBetAmount <= 0) {
      setError('Bet amount must be greater than zero.');
      return;
    }

    if (numericBetAmount > numericBalance) {
      setError('Insufficient balance.');
      return;
    }

    // Show confirmation modal
    setShowModal(true);
  };

  // Handle confirming the bet
  const handleConfirm = () => {
    // Pass the bet details to the parent handler
    onPlaceBet(game, selectedTeam, parseFloat(betAmount));
    setShowModal(false); // Close the modal
    onClose(); // Close the form
  };

  // Handle canceling the confirmation
  const handleCancel = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <div className="betform-overlay">
        <div className="betform-container">
          <h2>Place Your Bet</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Team:</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">-- Select a team --</option>
                <option value={game.team1}>{game.team1}</option>
                <option value={game.team2}>{game.team2}</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bet Amount ($):</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Enter your bet amount"
              />
            </div>
            <button type="submit" className="submit-button">
              Place Bet
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>

      {/* Render ConfirmationModel when showModal is true */}
      {showModal && (
        <ConfirmationModel
          betDetails={{
            team1: game.team1,
            team2: game.team2,
            amount: parseFloat(betAmount).toFixed(2), // Format amount to 2 decimal places
            team: selectedTeam,
          }}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default BetForm;
