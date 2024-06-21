import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation
import { useAuth } from '../contexts/AuthContext'; // Importing useAuth for authentication context management
import './Login.css'; // Importing CSS styles for the Login component

/**
 * Login component renders a form for user login.
 */
const Login = () => {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const { login } = useAuth(); // Destructuring login function from useAuth hook
  const navigate = useNavigate(); // Navigate function for programmatic navigation
  const [error, setError] = useState(null); // State for error message

  /**
   * Handles form submission.
   * Attempts to login with username and password.
   * If successful, navigates to the home page.
   * If unsuccessful, sets an error message.
   * @param {object} e - Form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (login(username, password)) { // Attempting login with provided username and password
      navigate('/'); // Navigates to the home page if login is successful
    } else {
      setError('Invalid username or password'); // Sets an error message if login fails
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Updates username state on input change
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Updates password state on input change
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>} {/* Displays error message if authentication fails */}
      </form>
    </div>
  );
};

export default Login; // Exporting Login component as default
