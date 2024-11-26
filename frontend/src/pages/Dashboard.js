import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Ensure this file exists for styling
import Betform from '../components/Betform'; // Correct import for Betform.js

function Dashboard() {
  const [balance, setBalance] = useState(0.0); // User's balance
  const [games, setGames] = useState([]); // Games/matches state
  const [loading, setLoading] = useState(true); // Loading state for matches
  const [selectedGame, setSelectedGame] = useState(null); // Game selected for betting
  const [betHistory, setBetHistory] = useState([]); // User's bet history

  // Fetch user data (balance and bet history) on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
      if (!user) {
        console.error('No user found in localStorage.');
        return;
      }
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-user-data/', {
          params: { user_id: user.id },
        });
        setBalance(response.data.balance); // Set user balance
        setBetHistory(response.data.bet_history); // Set bet history
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.error || error.message);
      }
    };

    const fetchGames = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockGames = [
          { id: 1, team1: 'Team A', team2: 'Team B', odds: { team1: 1.5, team2: 2.3 } },
          { id: 2, team1: 'Team C', team2: 'Team D', odds: { team1: 1.8, team2: 1.9 } },
          { id: 3, team1: 'Team E', team2: 'Team F', odds: { team1: 2.0, team2: 1.6 } },
        ];
        setGames(mockGames); // Set mock games (replace with API call if needed)
        setLoading(false);
      }, 1000);
    };

    fetchUserData();
    fetchGames();
  }, []);

  // Handle placing a bet
  const handlePlaceBet = async (game, selectedTeam, betAmount) => {
    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
    const odds = selectedTeam === game.team1 ? game.odds.team1 : game.odds.team2;

    // Validation: Ensure bet amount is greater than zero
    if (betAmount <= 0) {
      alert('Bet amount must be greater than zero.');
      return;
    }

    // Validation: Ensure sufficient balance
    if (betAmount > balance) {
      alert('Insufficient balance.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update-balance-and-place-bet/', {
        user_id: user.id,
        game: `${game.team1} vs ${game.team2}`,
        selected_team: selectedTeam,
        bet_amount: parseFloat(betAmount),
        payout: parseFloat(betAmount * odds),
      });

      // Update state after successful bet placement
      setBalance(response.data.balance); // Update balance from API response
      setBetHistory((prevHistory) => [
        ...prevHistory,
        {
          game: `${game.team1} vs ${game.team2}`,
          selected_team: selectedTeam,
          bet_amount: parseFloat(betAmount).toFixed(2),
          payout: (betAmount * odds).toFixed(2),
          result: 'Pending',
        },
      ]);

      alert(response.data.message); // Notify user
      setSelectedGame(null); // Close the bet form
    } catch (error) {
      console.error('Error placing bet:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Display User Balance */}
      <div className="user-balance">
        <h2>Your Balance: ${parseFloat(balance).toFixed(2)}</h2>
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
              {betHistory.map((bet, index) => (
                <tr key={index}>
                  <td>{bet.game}</td>
                  <td>{bet.selected_team}</td>
                  <td>${bet.bet_amount}</td>
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
