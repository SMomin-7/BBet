import React, { useState, useEffect } from 'react';
import '../styles/Matches.css';
import axios from 'axios';

function Matches() {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/matches/');
        console.log('API Response:', response.data);

        const { upcoming_matches = [], completed_matches = [] } = response.data || {};

        const formatMatches = (matches) =>
          matches.map((match) => ({
            ...match,
            date: match.date || 'Date Unavailable',
            stadium: match.stadium || 'McMahon Stadium',
          }));

        setUpcomingMatches(formatMatches(upcoming_matches));
        console.log('Upcoming Matches:', formatMatches(upcoming_matches));

        setCompletedMatches(formatMatches(completed_matches));
        console.log('Completed Matches:', formatMatches(completed_matches));
      } catch (error) {
        console.error('Error fetching matches:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filterMatches = (matches) => {
    const filtered = matches.filter(
      (match) =>
        match.team1.toLowerCase().includes(filter.toLowerCase()) ||
        match.team2.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('Filtered Matches:', filtered);
    return filtered;
  };

  return (
    <div className="matches-container">
      <h1>Matches</h1>
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
      ) : (
        <>
          <h2>Upcoming Matches</h2>
          {filterMatches(upcomingMatches).length > 0 ? (
            <div className="matches-list">
              {filterMatches(upcomingMatches).map((match, index) => (
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
            <p className="no-matches-message">
              No upcoming matches found. Current State: {JSON.stringify(upcomingMatches)}
            </p>
          )}

          <h2>Completed Matches</h2>
          {filterMatches(completedMatches).length > 0 ? (
            <div className="matches-list">
              {filterMatches(completedMatches).map((match, index) => (
                <div key={index} className="match-card completed-match">
                  <p className="match-details">
                    <strong>{match.team1}</strong> vs <strong>{match.team2}</strong>
                  </p>
                  <p className="match-details">Date: {match.date}</p>
                  <p className="match-details">Stadium: {match.stadium}</p>
                  <p
                    className={`match-details ${match.winner ? 'winner' : ''}`}
                  >
                    Winner: {match.winner || 'Draw'}
                  </p>
                  <p className="match-details">
                    Scores: {match.team1_score} - {match.team2_score}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-matches-message">
              No completed matches found. Current State: {JSON.stringify(completedMatches)}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Matches;
