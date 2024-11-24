import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'; // Ensure this file exists for styling
import Betform from '../components/Betform'; // Correct import for Betform.js

function Dashboard() {
  // State for user balance
  // eslint-disable-next-line no-unused-vars
  const [balance, setBalance] = useState(500.0);

  // State for games/matches
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to track the selected game for placing a bet
  const [selectedGame, setSelectedGame] = useState(null);

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      // Simulated delay to mimic API call
      setTimeout(() => {
        const mockGames = [
          { id: 1, team1: 'Team A', team2: 'Team B', odds: '1.5 - 2.3' },
          { id: 2, team1: 'Team C', team2: 'Team D', odds: '1.8 - 1.9' },
          { id: 3, team1: 'Team E', team2: 'Team F', odds: '2.0 - 1.6' },
        ];
        setGames(mockGames);
        setLoading(false);
      }, 1000); // 1-second delay
    };

    fetchGames();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Display User Balance */}
      <div className="user-balance">
        <h2>Your Balance: ${balance.toFixed(2)}</h2>
      </div>

      {/* Display Games/Matches */}
      <div className="games-list">
        <h2>Available Matches</h2>
        {loading ? (
          <p>Loading matches...</p> // Show a loading message while fetching
        ) : (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <p>
                <strong>{game.team1}</strong> vs <strong>{game.team2}</strong>
              </p>
              <p>Odds: {game.odds}</p>
              <button
                className="bet-button"
                onClick={() => setSelectedGame(game)} // Set the selected game for betting
              >
                Place Bet
              </button>
            </div>
          ))
        )}
      </div>

      {/* Display Betform when a game is selected */}
      {selectedGame && (
        <Betform
          game={selectedGame}
          onClose={() => setSelectedGame(null)} // Close the Betform
        />
      )}
    </div>
  );
}

export default Dashboard;
