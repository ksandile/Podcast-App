import React, { createContext, useState, useContext, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (episode) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [episode.id]: episode,
    }));
  };

  const removeFavorite = (episodeId) => {
    const { [episodeId]: _, ...updatedFavorites } = favorites;
    setFavorites(updatedFavorites);
  };

  const isFavorite = (episodeId) => {
    return !!favorites[episodeId];
  };

  const resetFavorites = () => {
    setFavorites({});
    localStorage.removeItem('favorites');
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, resetFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
