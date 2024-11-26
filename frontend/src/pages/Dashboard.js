import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import Betform from '../components/Betform';

function Dashboard() {
  const [balance, setBalance] = useState(0.0);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [betHistory, setBetHistory] = useState([]);

  // Fetch user data (balance and bet history) on component mount
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
        setBalance(parseFloat(response.data.balance)); // Ensure balance is a number
        setBetHistory(response.data.bet_history);
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
        setGames(mockGames);
        setLoading(false);
      }, 1000);
    };

    fetchUserData();
    fetchGames();
  }, []);

  // Handle placing a bet
  const handlePlaceBet = async (game, selectedTeam, betAmount) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const odds = selectedTeam === game.team1 ? game.odds.team1 : game.odds.team2;

    // Parse bet amount and balance as numbers
    const numericBetAmount = parseFloat(betAmount);
    const numericBalance = parseFloat(balance);

    if (numericBetAmount <= 0) {
      alert('Bet amount must be greater than zero.');
      return;
    }

    if (numericBetAmount > numericBalance) {
      alert('Insufficient balance.');
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

      // Update balance and bet history
      setBalance(parseFloat(response.data.balance)); // Ensure balance is updated as a number
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

      alert(response.data.message);
      setSelectedGame(null);
    } catch (error) {
      console.error('Error placing bet:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="user-balance">
        <h2>Your Balance: ${balance.toFixed(2)}</h2>
      </div>
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
      {selectedGame && (
        <Betform
          game={selectedGame}
          onPlaceBet={handlePlaceBet}
          onClose={() => setSelectedGame(null)}
          userBalance={balance}
        />
      )}
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
