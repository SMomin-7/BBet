import React, { useState, useEffect } from 'react';
import '../styles/PlayersStatistics.css'; // Ensure the styles exist

function PlayersStatistics() {
  const [playersStats, setPlayersStats] = useState([]); // State for players and stats data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchPlayersStats = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockData = [
          {
            player_Id: 1,
            f_name: 'John',
            l_name: 'Doe',
            team_name: 'Team A',
            Contract_Length: 2,
            overall_rating: 85,
            Shots: 120,
            Assists: 40,
            Points: 200,
          },
          {
            player_Id: 2,
            f_name: 'Jane',
            l_name: 'Smith',
            team_name: 'Team B',
            Contract_Length: 3,
            overall_rating: 78,
            Shots: 95,
            Assists: 25,
            Points: 150,
          },
        ];
        setPlayersStats(mockData);
        setLoading(false);
      }, 1000); // Simulate 1-second delay
    };

    fetchPlayersStats();
  }, []);

  // Filter players based on the search query
  const filteredPlayers = playersStats.filter(
    (player) =>
      player.f_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.l_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="players-stats-container">
      <h1>Players and Statistics</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading players and statistics...</p>
      ) : filteredPlayers.length > 0 ? (
        <table className="players-stats-table">
          <thead>
            <tr>
              <th>Player ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Team</th>
              <th>Contract Length</th>
              <th>Overall Rating</th>
              <th>Shots</th>
              <th>Assists</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.player_Id}>
                <td>{player.player_Id}</td>
                <td>{player.f_name}</td>
                <td>{player.l_name}</td>
                <td>{player.team_name}</td>
                <td>{player.Contract_Length} year(s)</td>
                <td>{player.overall_rating}</td>
                <td>{player.Shots}</td>
                <td>{player.Assists}</td>
                <td>{player.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players found matching your search.</p>
      )}
    </div>
  );
}

export default PlayersStatistics;
