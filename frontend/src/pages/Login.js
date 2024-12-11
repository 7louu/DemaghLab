import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is already authenticated when the component loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (localStorage.getItem('token')) {
          // Make a request to check if the token is valid
          const response = await axios.get('http://localhost:5000/api/users/check-auth', {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
          });

          // If the user is authenticated, redirect to /courses
          if (response.data.ok) {
            navigate('/')
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', JSON.stringify(response.data.token));

        // Redirect to /courses after successful login
        window.location.reload();
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div className='Login'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
