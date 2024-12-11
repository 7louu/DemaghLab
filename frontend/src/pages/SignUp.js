import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('regular'); // You can set the role to 'regular' by default
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection after successful signup

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
            navigate("/")
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make the request to the backend to register the user
      const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password, role });
      
      if (response.data.token) {
        // Store the user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token',JSON.stringify(response.data?.token))
        // Redirect to the home page after successful signup

        window.location.reload();
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div className='Login'>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
