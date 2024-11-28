import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import Betform from '../components/Betform';
import Notification from '../components/Notification';

function Dashboard() {
  const [balance, setBalance] = useState(0.0); // User's balance
  const [games, setGames] = useState([]); // Available matches
  const [loading, setLoading] = useState(true); // Loading state for matches
  const [selectedGame, setSelectedGame] = useState(null); // Selected game for betting
  const [betHistory, setBetHistory] = useState([]); // User's betting history
  const [notification, setNotification] = useState(null); // Notification state

  // Fetch user data and game data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        console.error('No user found in localStorage.');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-user-data/', {
          params: { user_id: user.id },
        });
        setBalance(parseFloat(response.data.balance)); // Parse balance to ensure it's numeric
        setBetHistory(response.data.bet_history);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.error || error.message);
      }
    };

    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/matches/'); // Fetch matches from backend
        const formattedGames = response.data.matches.map((match) => ({
          id: match.id,
          team1: match.team1,
          team2: match.team2,
          odds: { team1: match.team1_odds, team2: match.team2_odds },
        }));
        setGames(formattedGames);
      } catch (error) {
        console.error('Error fetching games data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchGames();
  }, []);

  // Handle bet placement
  const handlePlaceBet = async (game, selectedTeam, betAmount) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const odds = selectedTeam === game.team1 ? game.odds.team1 : game.odds.team2;

    // Validate bet amount and balance
    const numericBetAmount = parseFloat(betAmount);
    const numericBalance = parseFloat(balance);

    if (numericBetAmount <= 0) {
      setNotification({ message: 'Bet amount must be greater than zero.', type: 'error' });
      return;
    }

    if (numericBetAmount > numericBalance) {
      setNotification({ message: 'Insufficient balance.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update-balance-and-place-bet/', {
        user_id: user.id,
        game: `${game.team1} vs ${game.team2}`,
        selected_team: selectedTeam,
        bet_amount: numericBetAmount,
        payout: numericBetAmount * odds,
      });

      // Update balance and betting history
      setBalance(parseFloat(response.data.balance)); // Update balance
      setBetHistory((prevHistory) => [
        ...prevHistory,
        {
          game: `${game.team1} vs ${game.team2}`,
          selected_team: selectedTeam,
          bet_amount: numericBetAmount.toFixed(2),
          payout: (numericBetAmount * odds).toFixed(2),
          result: 'Pending',
        },
      ]);

      setNotification({ message: 'Bet placed successfully!', type: 'success' });
      setSelectedGame(null); // Close the bet form
    } catch (error) {
      setNotification({ message: 'Error placing bet. Please try again.', type: 'error' });
      console.error('Error placing bet:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Render Notifications */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* User Balance */}
      <div className="user-balance">
        <h2>Your Balance: ${balance.toFixed(2)}</h2>
      </div>

      {/* Available Matches */}
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
                onClick={() => setSelectedGame(game)}
              >
                Place Bet
              </button>
            </div>
          ))
        )}
      </div>

      {/* Betting Form */}
      {selectedGame && (
        <Betform
          game={selectedGame}
          onPlaceBet={handlePlaceBet}
          onClose={() => setSelectedGame(null)}
          userBalance={balance}
        />
      )}

      {/* Bet History */}
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
                  <td>{bet.result}</td>
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
