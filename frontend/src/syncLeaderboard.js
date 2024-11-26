import React, { useEffect } from 'react';
import axios from 'axios';

function SyncLeaderboard() {
  useEffect(() => {
    // Fetch leaderboard data from LocalStorage
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard'));

    if (!leaderboardData || leaderboardData.length === 0) {
      console.error("No leaderboard data found in LocalStorage.");
      return;
    }

    // Post leaderboard data to backend API
    const syncLeaderboard = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/sync-leaderboard/', {
          leaderboard: leaderboardData,
        });
        console.log('Leaderboard synced successfully:', response.data);
      } catch (error) {
        console.error('Error syncing leaderboard:', error.response?.data || error.message);
      }
    };

    syncLeaderboard();
  }, []);

  return <div>Syncing Leaderboard...</div>;
}

export default SyncLeaderboard;
