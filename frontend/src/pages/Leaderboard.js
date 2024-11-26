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
        setLeaderboard(response.data.leaderboard); // Set the leaderboard data
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
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.num_bets}</td>
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
