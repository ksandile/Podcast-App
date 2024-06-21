import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from './context/CategoryContext'; // Importing CategoryContext for category management
import { useAuth } from '../contexts/AuthContext'; // Importing useAuth for authentication context management
import logo from '../Assets/logo.png'; // Importing the logo image
import './Header.css'; // Importing CSS styles for the Header component

/**
 * Header component displays the navigation bar with links and search functionality.
 * @param {string} searchQuery - The current search query for podcasts.
 * @param {function} onSearchChange - Function to handle search query changes.
 */
const Header = ({ searchQuery, onSearchChange }) => {
  const { setSelectedCategory } = useContext(CategoryContext); // Accessing setSelectedCategory from CategoryContext
  const { user, logout } = useAuth(); // Accessing user state and logout function from AuthContext

  // Handles clicking on the home link, resetting category to 'All'
  const handleHomeClick = () => {
    setSelectedCategory('All');
  };

  // Handles changes in the search input field
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header">
      {/* Link to home page with logo */}
      <Link to="/" className="logo-link" onClick={handleHomeClick}>
        <img src={logo} alt="Podcast Logo" className="logo" />
      </Link>
      {/* Navigation links */}
      <nav>
        <ul className="nav-links">
          {/* Conditional rendering based on user authentication */}
          <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
          {user ? ( // If user is authenticated
            <>
              <li><Link to="/yourfav">Favorite</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li className="search-container">
                <input
                  type="text"
                  placeholder="Search podcasts by title..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </li>
              <li><button onClick={logout} className="logout-button">Logout</button></li>
            </>
          ) : ( // If user is not authenticated
            <>
              <li><Link to="/contact">Contact</Link></li>
              <li className="search-container">
                <input
                  type="text"
                  placeholder="Search podcasts by title..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header; // Exporting Header component as default
