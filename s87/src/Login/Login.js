// src/Login/Login.js
import './Login.module.scss';
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username,password);
  };
  

  return (
    <div className="loginc" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 >Login</h2>
      <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
