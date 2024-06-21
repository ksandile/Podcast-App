import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import AudioPlayer from './AudioPlayer';
import './YourFav.css';

const YourFav = () => {
  const { favorites, removeFavorite, resetFavorites } = useFavorites();
  const [playingEpisode, setPlayingEpisode] = useState(null);

  const favoriteEpisodes = Object.values(favorites);

  const playEpisode = (episodeId) => {
    setPlayingEpisode(episodeId);
  };

  const pauseEpisode = () => {
    setPlayingEpisode(null);
  };

  if (favoriteEpisodes.length === 0) {
    return <div>No favorite episodes yet!</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Episodes</h1>
      <button onClick={resetFavorites}>Reset All</button>
      <ul className="favorites-list">
        {favoriteEpisodes.map((episode) => (
          <li key={episode.id} className="favorite-item">
            <h3>{episode.title}</h3>
            <p>Show: <Link to={`/show/${episode.showId}`}>{episode.showTitle}</Link></p>
            <p>Season: {episode.seasonNumber}</p>
            <p>Added on: {new Date(episode.addedDate).toLocaleDateString()}</p>
            <button onClick={() => removeFavorite(episode.id)}>Remove from Favorites</button>
            <AudioPlayer
              key={episode.id}
              src={episode.audioSrc}
              isPlaying={playingEpisode === episode.id}
              onPlay={() => playEpisode(episode.id)}
              onPause={pauseEpisode}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourFav;
