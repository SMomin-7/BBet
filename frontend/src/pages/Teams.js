import React, { useState, useEffect } from 'react';
import '../styles/Teams.css'; // Import CSS file for styling

function Teams() {
  const [teams, setTeams] = useState([]); // State to hold team data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Mock data for teams
        const mockTeams = [
          { position: 1, name: 'Team Alpha', coach: 'Coach A', year: 1998, points: 10 },
          { position: 2, name: 'Team Beta', coach: 'Coach B', year: 2002, points: 10 },
          { position: 3, name: 'Team Gamma', coach: 'Coach C', year: 2010, points: 10 },
          { position: 4, name: 'Team Delta', coach: 'Coach D', year: 2005, points: 10 },
        ];

        // Simulate API delay using setTimeout
        setTimeout(() => {
          setTeams(mockTeams); // Update state with mock data
          setLoading(false); // Turn off loading state
        }, 1000);
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
              <th>Established Year</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.position}</td>
                <td>{team.name}</td>
                <td>{team.coach}</td>
                <td>{team.year}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;
