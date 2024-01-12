import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsFeed from './Newsfeed/NewsFeed';
import Main from './main/MainPage';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3005/api/users/login', {
        username: username,
        password: password,
     
      });
  
      console.log(response.data);
  
      if (response.data && response.data.firstname && response.data.lastname && response.data.category ) {
        // Set isLoggedIn to true
        setIsLoggedIn(true);
        setError('');
  
        // Store user details in localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userDetails', JSON.stringify(response.data));
  
        navigate('/mainpage');
      } else {
        setError('Firstname or lastname missing in the response');
      }
  
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError('Login failed. Please try again.');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;