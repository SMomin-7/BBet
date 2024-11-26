import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import PlayersStatistics from './pages/PlayersStatistics';
import Leaderboard from './pages/Leaderboard';
import Teams from './pages/Teams';


function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
        <Route path="/matches" element={<Matches />} />
        <Route path="/players-statistics" element={<PlayersStatistics />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> {/* Add Leaderboard route */}
        <Route path="/teams" element={<Teams />} /> {/* Add the Teams route */}

      </Routes>
    </Router>
  );
}

export default App;



