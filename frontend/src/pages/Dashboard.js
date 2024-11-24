import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'; // Ensure this file exists for styling
import Betform from '../components/Betform'; // Correct import for Betform.js

function Dashboard() {
  const [balance, setBalance] = useState(500.0); // User's balance
  const [games, setGames] = useState([]); // Games/matches state
  const [loading, setLoading] = useState(true); // Loading state for matches
  const [selectedGame, setSelectedGame] = useState(null); // Game selected for betting
  const [betHistory, setBetHistory] = useState([]); // User's bet history

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockGames = [
          { id: 1, team1: 'Team A', team2: 'Team B', odds: { team1: 1.5, team2: 2.3 } },
          { id: 2, team1: 'Team C', team2: 'Team D', odds: { team1: 1.8, team2: 1.9 } },
          { id: 3, team1: 'Team E', team2: 'Team F', odds: { team1: 2.0, team2: 1.6 } },
        ];
        setGames(mockGames);
        setLoading(false);
      }, 1000);
    };

    fetchGames();
  }, []);

  // Handle placing a bet
  const handlePlaceBet = (game, selectedTeam, betAmount) => {
    const oddsKey = selectedTeam === game.team1 ? 'team1' : 'team2'; // Map selected team to odds key
    const odds = game.odds[oddsKey]; // Retrieve correct odds

    if (!odds) {
      console.error('Odds not found for the selected team.');
      return;
    }

    const payout = betAmount * odds; // Calculate payout

    const newBet = {
      id: betHistory.length + 1,
      game: `${game.team1} vs ${game.team2}`,
      selectedTeam,
      betAmount: parseFloat(betAmount).toFixed(2), // Ensure bet amount is properly formatted
      payout: payout.toFixed(2), // Format payout to 2 decimals
      result: 'Pending',
    };

    setBetHistory([...betHistory, newBet]); // Update bet history
    setBalance(balance - betAmount); // Deduct bet amount from balance
    setSelectedGame(null); // Close the bet form
  };

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
          <p>Loading matches...</p>
        ) : (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <p>
                <strong>{game.team1}</strong> vs <strong>{game.team2}</strong>
              </p>
              <p className="odds">
                Odds: <span className="team-odds">{game.odds.team1.toFixed(2)}</span> -{' '}
                <span className="team-odds">{game.odds.team2.toFixed(2)}</span>
              </p>
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
          onPlaceBet={handlePlaceBet}
          onClose={() => setSelectedGame(null)} // Close the form
        />
      )}

      {/* Display User Bet History */}
      <div className="bet-history">
        <h2>Your Bets</h2>
        {betHistory.length > 0 ? (
          <table className="bet-history-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Team</th>
                <th>Bet Amount</th>
                <th>Payout</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {betHistory.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.game}</td>
                  <td>{bet.selectedTeam}</td>
                  <td>${bet.betAmount}</td>
                  <td>${bet.payout}</td>
                  <td
                    className={bet.result === 'Won' ? 'result-won' : 'result-pending'}
                  >
                    {bet.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bets placed yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
