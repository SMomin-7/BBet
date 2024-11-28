import React, { useState, useEffect } from 'react';
import '../styles/Matches.css'; // Ensure the styles are created
import axios from 'axios';

function Matches() {
  const [matches, setMatches] = useState([]); // State for all matches
  const [loading, setLoading] = useState(true); // State for loading
  const [filter, setFilter] = useState(''); // State for filtering matches

  // Fetch matches from the backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/matches/'); // API endpoint for matches

        const formattedMatches = response.data.matches.map((match) => ({
          ...match,
          date: match.date || 'Date Unavailable', // Use the date from backend or fallback
          stadium: match.stadium || 'McMahon Stadium', // Use the stadium from backend or fallback
        }));

        setMatches(formattedMatches); // Update matches state with formatted data
      } catch (error) {
        console.error('Error fetching matches:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter matches by team name
  const filteredMatches = matches.filter(
    (match) =>
      match.team1.toLowerCase().includes(filter.toLowerCase()) ||
      match.team2.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by team name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      {loading ? (
        <p className="loading-message">Loading matches...</p>
      ) : filteredMatches.length > 0 ? (
        <div className="matches-list">
          {filteredMatches.map((match, index) => (
            <div key={index} className="match-card">
              <p className="match-details">
                <strong>{match.team1}</strong> vs <strong>{match.team2}</strong>
              </p>
              <p className="match-details">Date: {match.date}</p>
              <p className="match-details">Stadium: {match.stadium}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-matches-message">No matches found.</p>
      )}
    </div>
  );
}

export default Matches;
