import React from 'react';
import '../styles/ConfirmationModel.css'; // Create a CSS file for styling

function ConfirmationModal({ betDetails, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Confirm Your Bet</h2>
        <p>
          <strong>Match:</strong> {betDetails.team1} vs {betDetails.team2}
        </p>
        <p>
          <strong>Bet Amount:</strong> ${betDetails.amount}
        </p>
        <p>
          <strong>Selected Team:</strong> {betDetails.team}
        </p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
