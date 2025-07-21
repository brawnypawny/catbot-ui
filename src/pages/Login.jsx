import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../services/AuthContext';
import { loginUser } from '../services/userFetcher';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUser(username, password);
      localStorage.setItem('token', token);    
      navigate('/cat-database');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>

        {error && <p className="error-message">{error}</p>}


        <p className="center-text">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#397dc1] underline">
            Register here
          </a>
        </p>
      
      </form>

    </div>
  );
}
