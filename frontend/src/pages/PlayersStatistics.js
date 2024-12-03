import React, { useState, useEffect } from 'react';
import '../styles/PlayersStatistics.css'; // Ensure the styles exist

function PlayersStatistics() {
  const [playersStats, setPlayersStats] = useState([]); // State for players and stats data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [sortOption, setSortOption] = useState('ranking'); // Default sorting option

  // Fetching data from the backend
  useEffect(() => {
    const fetchPlayersStats = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/players-stats/'); // API endpoint
        const data = await response.json(); // Parse JSON response
        setPlayersStats(data.players); // Update state with players data
      } catch (error) {
        console.error('Error fetching player statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayersStats();
  }, []);

  // Filter players based on the search query
  const filteredPlayers = playersStats.filter(
    (player) =>
      player.f_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.l_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort players based on the selected sort option
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    switch (sortOption) {
      case 'ranking':
        return a.ranking - b.ranking; // Low to high ranking
      case 'first_name':
        return a.f_name.localeCompare(b.f_name); // Alphabetical by first name
      case 'contract_length':
        return a.Contract_Length - b.Contract_Length; // Contract length
      default:
        return 0;
    }
  });

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

      {/* Sorting dropdown */}
      <div className="sorting-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="ranking">Ranking (High to Low)</option>
          <option value="first_name">First Name (A-Z)</option>
          <option value="contract_length">Contract Length</option>
        </select>
      </div>

      {loading ? (
        <p>Loading players and statistics...</p>
      ) : sortedPlayers.length > 0 ? (
        <table className="players-stats-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Team</th>
              <th>Contract Length</th>
              <th>Overall Rating</th>
              <th>Shots</th>
              <th>Assists</th>
              <th>Points</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={index}>
                <td>{player.f_name}</td>
                <td>{player.l_name}</td>
                <td>{player.team_name}</td>
                <td>{player.Contract_Length} year(s)</td>
                <td>{player.overall_rating}</td>
                <td>{player.Shots}</td>
                <td>{player.Assists}</td>
                <td>{player.Points}</td>
                <td>{player.ranking}</td>
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
