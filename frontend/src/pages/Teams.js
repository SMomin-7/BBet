import React, { useState, useEffect } from 'react';
import '../styles/Teams.css'; // Import CSS file for styling
import axios from 'axios';

function Teams() {
  const [teams, setTeams] = useState([]); // State to hold team data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Fetch data from backend API
        const response = await axios.get('http://127.0.0.1:8000/api/teams/');
        setTeams(response.data.teams); // Update state with API data
        setLoading(false); // Turn off loading state
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="teams-container">
      <h1>Teams & Rankings</h1>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <table className="teams-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Team Name</th>
              <th>Coach Name</th>
              <th>Year Founded</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.ranking}</td> {/* Use 'ranking' from API */}
                <td>{team.name}</td> {/* Team Name */}
                <td>{team.coach}</td> {/* Coach Name */}
                <td>{team.year_founded}</td> {/* Year Founded */}
                <td>{team.points}</td> {/* Points */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;
