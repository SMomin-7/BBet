import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import PlayersStatistics from './pages/PlayersStatistics';


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

      </Routes>
    </Router>
  );
}

export default App;
