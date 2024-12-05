import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard.js';
import Summary from './Summary/Summary.js';
import Login from './Login/Login.js';
import Report from './Report/Report.js';
import Menu from './Menu/Menu.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if the token is valid (optional, based on your backend validation)
  const checkTokenValidity = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://104.131.13.39:3001/verify-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity(); // Check token validity on page load
  }, []);

  // Callback function for login to set isLoggedIn to true
  const handleLogin = async (username, password) => {
    const response = await fetch('http://104.131.13.39:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token); // Store token
      setIsLoggedIn(true);
    } else {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Menu onLogout={handleLogout} />

        {/* Main Content Area */}
        <main id="main-content" tabIndex="-1" role="main">
          <Routes>
            {/* If not logged in, navigate to Login */}
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/summary"
              element={isLoggedIn ? <Summary /> : <Navigate to="/" />}
            />
            <Route
              path="/report"
              element={isLoggedIn ? <Report /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
