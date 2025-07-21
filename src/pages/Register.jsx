import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userFetcher';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(username, password);
      setMessage(`User ${username} registered successfully!`);
      navigate('/cat-database');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

return (
  <div className="login-form-container">
    <form className="login-form" onSubmit={handleRegister}>
      <h2>Register</h2>

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

      <button type="submit">Register</button>

      {message && <p className="error-message">{message}</p>}

      <p className="center-text">
        Already have an account?{' '}
        <a href="/login" className="text-[#397dc1] underline">
          Log in here
        </a>
      </p>
    </form>
  </div>
);
}