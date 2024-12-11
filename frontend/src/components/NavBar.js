import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/check-auth', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data.ok) {
            setIsAuthenticated(true);
            setUserName(data.user.name); // Set the user's name from the response
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  const handleSignOut = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem('token');
    setIsAuthenticated(false);  // Update the state to reflect that the user is logged out
    setUserName(''); // Clear the user's name
    navigate('/'); // Redirect to the homepage or any other page you prefer
    window.location.reload()
  };

  return (
    <div className='navbar'>
      <h1>{isAuthenticated ? ("Welcome , " + userName) : 'Logo.'}</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        {isAuthenticated ? (
          <>  
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;