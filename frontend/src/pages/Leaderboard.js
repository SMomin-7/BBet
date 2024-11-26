import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Leaderboard.css'; // Optional CSS for styling

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/leaderboard/');
        console.log('API Response:', response.data.leaderboard); // Log API response
        setLeaderboard(response.data.leaderboard); // Update state with leaderboard data
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaderboard();
  }, []);
  

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : leaderboard.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bets Placed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index}>
                <td>{user.rank || index + 1}</td> {/* Use rank or fallback to index + 1 */}
                <td>{user.user__name || 'N/A'}</td> {/* Ensure fallback values for undefined keys */}
                <td>{user.user__email || 'N/A'}</td>
                <td>{user.bet_count || 0}</td> {/* Default to 0 if bet_count is missing */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rankings available.</p>
      )}
    </div>
  );
  
}

export default Leaderboard;
