import './Login.module.scss';
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div
      className="loginc"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2 tabIndex="0">Login</h2>
      <div className="login-form">
        <form onSubmit={handleSubmit} aria-label="Login form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
              aria-label="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-label="Enter your password"
            />
          </div>
          <button
            className="login-button"
            type="submit"
            aria-label="Submit login form"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
