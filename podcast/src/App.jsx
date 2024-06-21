// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Yourfav from './components/YourFav';
import About from './components/About';
import Contact from './components/Contact';
import Show from './components/Show';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { CategoryProvider } from './components/context/CategoryContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import './components/Footer.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <CategoryProvider>
      <FavoritesProvider>
        <AuthProvider>
          <Router>
            <div>
              <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Home searchQuery={searchQuery} /></PrivateRoute>} />
                <Route path="/yourfav" element={<PrivateRoute><Yourfav /></PrivateRoute>} />
                <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                <Route path="/show/:showId" element={<PrivateRoute><Show /></PrivateRoute>} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </FavoritesProvider>
    </CategoryProvider>
  );
};

export default App;
