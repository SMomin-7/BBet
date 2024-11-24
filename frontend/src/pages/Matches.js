import React, { useState, useEffect } from 'react';
import '../styles/Matches.css'; // Ensure the styles are created

function Matches() {
  const [matches, setMatches] = useState([]); // State for all matches
  const [loading, setLoading] = useState(true); // State for loading
  const [filter, setFilter] = useState(''); // State for filtering matches

  // Simulate fetching matches from a backend
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockMatches = [
          { id: 1, date: '2024-11-21', team1: 'Team A', team2: 'Team B', stadium: 'Stadium 1' },
          { id: 2, date: '2024-11-22', team1: 'Team C', team2: 'Team D', stadium: 'Stadium 2' },
          { id: 3, date: '2024-11-23', team1: 'Team E', team2: 'Team F', stadium: 'Stadium 3' },
        ];
        setMatches(mockMatches);
        setLoading(false);
      }, 1000); // Simulate 1-second delay
    };

    fetchMatches();
  }, []);

  // Filter matches by team name
  const filteredMatches = matches.filter(
    (match) =>
      match.team1.toLowerCase().includes(filter.toLowerCase()) ||
      match.team2.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="matches-container">
      <h1>Matches</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by team name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading matches...</p>
      ) : filteredMatches.length > 0 ? (
        <div className="matches-list">
          {filteredMatches.map((match) => (
            <div key={match.id} className="match-card">
              <p>
                <strong>{match.team1}</strong> vs <strong>{match.team2}</strong>
              </p>
              <p>Date: {match.date}</p>
              <p>Stadium: {match.stadium}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}

export default Matches;
