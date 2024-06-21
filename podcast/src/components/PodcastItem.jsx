import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchShow } from '../services/podcastService'; // Importing fetchShow function to fetch show details
import AudioPlayer from './AudioPlayer'; // Importing AudioPlayer component for episode playback
import './Home.css'; // Importing CSS styles for the component

// Mapping of genre IDs to genre names
const genreMap = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

// Function to format date string into a readable format
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * PodcastItem component renders details of a podcast item including its image, title, author, season, genre,
 * last updated date, and episode playback functionality.
 * @param {Object} props - Props containing the podcast object.
 */
const PodcastItem = ({ podcast }) => {
  const [show, setShow] = useState(null); // State to hold the show details
  const [loading, setLoading] = useState(true); // State to indicate loading state
  const [error, setError] = useState(null); // State to hold error message
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0); // State to track currently selected episode index
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is currently playing
  const [audioSrc, setAudioSrc] = useState(''); // State to hold audio source URL for playback

  // Effect to fetch show details when component mounts or podcast ID changes
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const data = await fetchShow(podcast.id); // Fetch show details using fetchShow function
        setShow(data); // Set show details in state
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching show details:', error);
        setError('Failed to fetch show details.'); // Set error message if fetching fails
        setLoading(false); // Set loading state to false
      }
    };

    fetchShowDetails(); // Invoke fetchShowDetails function
  }, [podcast.id]); // Dependency array ensures useEffect runs when podcast ID changes

  // Effect to set initial audio source when show details are fetched
  useEffect(() => {
    if (show && show.seasons && show.seasons.length > 0) {
      const firstEpisode = show.seasons[0]?.episodes[0];
      if (firstEpisode) {
        setAudioSrc(firstEpisode.audioSrc); // Set audio source to the first episode's audioSrc
      }
    }
  }, [show]); // Dependency array ensures useEffect runs when show details change

  // Function to handle playback of selected episode
  const handlePlay = (episodeIndex) => {
    const selectedEpisode = show.seasons[0]?.episodes[episodeIndex];
    if (selectedEpisode) {
      setAudioSrc(selectedEpisode.audioSrc); // Set audio source to the selected episode's audioSrc
      setIsPlaying(true); // Set isPlaying state to true to start playback
      setCurrentEpisodeIndex(episodeIndex); // Update current episode index
    }
  };

  // Function to handle pausing playback
  const handlePause = () => {
    setIsPlaying(false); // Set isPlaying state to false to pause playback
  };

  // Render loading state while fetching show details
  if (loading) {
    return (
      <li className="podcast-item">
        <div className="podcast-image">
          <img src={podcast.image} alt={podcast.title} />
        </div>
        <div className="podcast-details">
          <h3>{podcast.title}</h3>
          <p>Loading show details...</p>
        </div>
      </li>
    );
  }

  // Render error state if show details fetch fails
  if (error) {
    return (
      <li className="podcast-item">
        <div className="podcast-image">
          <img src={podcast.image} alt={podcast.title} />
        </div>
        <div className="podcast-details">
          <h3>{podcast.title}</h3>
          <p>{error}</p>
        </div>
      </li>
    );
  }

  // Render podcast item with details and episode playback controls
  return (
    <li className="podcast-item">
      <div className="podcast-image">
        <img src={podcast.image} alt={podcast.title} />
      </div>
      <div className="podcast-details">
        <h3>
          <Link to={`/show/${podcast.id}`} className="podcast-link">
            {podcast.title}
          </Link>
        </h3>
        <p>Author: {podcast.author}</p>
        <p>Season: {podcast.season}</p>
        <p>Genre: {genreMap[podcast.genre]}</p>
        <p>Last Updated: {formatDate(podcast.lastUpdated)}</p>
        <div className="action-buttons">
          {/* Map through episodes to render playback buttons */}
          {show.seasons[0]?.episodes.map((episode, index) => (
            <button
              key={index}
              onClick={() => handlePlay(index)}
              className={currentEpisodeIndex === index ? 'active' : ''}
            >
              Episode {index + 1}
            </button>
          ))}
          {/* Render AudioPlayer component for playback */}
          {audioSrc ? (
            <AudioPlayer
              src={audioSrc}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <p>No episodes available</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default PodcastItem; // Export PodcastItem component as default
