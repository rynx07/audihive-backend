import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked!'); // Add this line

    // Prepare the data to be sent
    const userData = {
      username,
      email,
      firstname,
      lastname,
      password,
      category,
      role,
    };

    try {
      // Send the registration request to the backend
      const response = await axios.post('http://localhost:3005/api/users/register', userData);

      if (response.status === 200) {
        const data = response.data;
        console.log('User registered!', data);
        setIsRegistered(true); // User registration successful
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleJoinNow = () => {
    navigate("/login"); // Redirect to the login page
  };

  // Render confirmation screen if registered, otherwise render registration form
  if (isRegistered) {
    return (
      <div>
        <h1>Registration Successful!</h1>
        <p>You have successfully registered.</p>
        
        <button onClick={handleJoinNow}>Sign In</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        id="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />

      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
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

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <label htmlFor="role">Role:</label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Select a role</option>
        <option value="MUSICIAN">Musician</option>
        <option value="EVENT_ORG">Event Organizer</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;