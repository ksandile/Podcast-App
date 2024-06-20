import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from './context/CategoryContext';
import { useAuth } from '../contexts/AuthContext';
import logo from '../Assets/logo.png';
import './Header.css';

const Header = ({ searchQuery, onSearchChange }) => {
  const { setSelectedCategory } = useContext(CategoryContext);
  const { user, logout } = useAuth();

  const handleHomeClick = () => {
    setSelectedCategory('All');
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link" onClick={handleHomeClick}>
        <img src={logo} alt="Podcast Logo" className="logo" />
      </Link>
      <nav>
        <ul className="nav-links">
          <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
          {user ? (
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
          ) : (
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

export default Header;
