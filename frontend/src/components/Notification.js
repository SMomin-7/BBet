import React from 'react';
import '../styles/Notification.css';

function Notification({ message, type, onClose }) {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Notification;
