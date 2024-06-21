import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreviews } from '../services/podcastService';
import { useFavorites } from '../contexts/FavoritesContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * Home component displays a carousel of podcasts and a list of filtered podcast previews.
 * @param {string} searchQuery - The current search query for filtering podcasts by title.
 * @param {function} onSearchChange - Callback function to handle search query changes.
 */
const Home = ({ searchQuery, onSearchChange }) => {
  // State variables
  const [previews, setPreviews] = useState([]); // All podcast previews fetched from the server
  const [filteredPreviews, setFilteredPreviews] = useState([]); // Podcast previews after filtering
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [error, setError] = useState(null); // Error state message
  const [sortCriteria, setSortCriteria] = useState('All'); // Criteria for sorting podcasts
  const [selectedGenre, setSelectedGenre] = useState('All'); // Selected genre for filtering
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites(); // Favorites context hook

  // Genre dictionary mapping genre ID to genre name
  const genres = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  // Fetch podcast previews when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviews(); // Fetch podcast previews from a service
        setPreviews(data); // Set all previews
        setFilteredPreviews(data); // Initialize filtered previews with all previews
        setLoading(false); // Set loading state to false after fetching
      } catch (error) {
        console.error('Error fetching previews:', error); // Log error if fetching fails
        setError('Failed to fetch podcast previews.'); // Set error message
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchData(); // Call fetch data function
  }, []); // Dependency array ensures useEffect runs only once on component mount

  // Effect to filter and sort previews based on search, sort criteria, and genre filter
  useEffect(() => {
    // Function to sort podcast previews based on criteria
    const sortData = (criteria, data) => {
      let sortedData = [...data]; // Create a copy of the data array
      switch (criteria) {
        case 'A-Z':
          sortedData.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A-Z
          break;
        case 'Z-A':
          sortedData.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title Z-A
          break;
        case 'Newest':
          sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by newest
          break;
        case 'Oldest':
          sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated)); // Sort by oldest
          break;
        default:
          sortedData = [...data]; // Default to original data array if no criteria matches
      }
      return sortedData; // Return sorted data array
    };

    // Function to filter podcast previews based on search query
    const filterData = (data, query) => {
      return data.filter(podcast => 
        podcast.title.toLowerCase().includes(query.toLowerCase()) // Filter by title match
      );
    };

    // Function to filter podcast previews based on selected genre
    const genreFilterData = (data, genre) => {
      if (genre === 'All') {
        return data; // Return all data if genre is 'All'
      }
      return data.filter(podcast => podcast.genres.includes(parseInt(genre))); // Filter by genre ID match
    };

    // Sort and filter data based on current state values
    let sortedData = sortData(sortCriteria, previews); // Sort previews
    let filteredData = filterData(sortedData, searchQuery); // Filter by search query
    let genreFilteredData = genreFilterData(filteredData, selectedGenre); // Filter by selected genre

    setFilteredPreviews(genreFilteredData); // Update filtered previews state
  }, [sortCriteria, previews, searchQuery, selectedGenre]); // Dependencies for the effect

  // Handle change in sort criteria
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria); // Set new sort criteria
  };

  // Handle change in selected genre
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre); // Set new selected genre
  };

  // Handle favorite toggle for a podcast
  const handleFavoriteToggle = (podcast) => {
    if (isFavorite(podcast.id)) {
      removeFavorite(podcast.id); // Remove from favorites if already favorited
    } else {
      addFavorite(podcast); // Add to favorites if not already favorited
    }
  };

  // Format date string into readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Date formatting options
    return new Date(dateString).toLocaleDateString(undefined, options); // Format date string
  };

  // Render loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if fetching fails
  if (error) {
    return <div>{error}</div>;
  }

  // Render component UI once data is loaded and filtered
  return (
    <div className="home">
    <div className="carousel-wrapper">
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={6000}
      transitionTime={1000}
      swipeable={true}
      emulateTouch={true}
      className="main-carousel"
    >
      {previews.map(podcast => (
        <div key={podcast.id} className="carousel-slide">
          <img src={podcast.image} alt={podcast.title} className="carousel-image" />
          <div className="carousel-content">
            <h2 className="carousel-title">{podcast.title}</h2>
            <p className="carousel-description">{podcast.description.slice(0, 100)}...</p>
            <Link to={`/show/${podcast.id}`} className="carousel-button">
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
      
      <h1>Latest Podcasts</h1>

      {/* Dropdowns for sorting and filtering podcasts */}
      <div className="filter-dropdown">
        {/* Dropdown for sorting criteria */}
        <select value={sortCriteria} onChange={(e) => handleSortChange(e.target.value)}>
          
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="All">All</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>

        {/* Dropdown for selecting genre */}
        <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
          <option value="All">All Genres</option>
          {Object.entries(genres).map(([id, title]) => (
            <option key={id} value={id}>{title}</option> // Option for each genre
          ))}
        </select>
      </div>

      {/* List of filtered podcast previews */}
      <ul className="podcast-list">
        {filteredPreviews.map((podcast) => (
          <li key={podcast.id} className="podcast-item">
            {/* Podcast image */}
            <div className="podcast-image">
              <img src={podcast.image} alt={podcast.title} />
            </div>

            {/* Podcast details */}
            <div className="podcast-details">
              {/* Link to show details */}
              <h3>
                <Link to={`/show/${podcast.id}`} className="podcast-link">
                  {podcast.title}
                </Link>
              </h3>

              {/* Podcast season */}
              <p>Season: {podcast.seasons}</p>

              {/* Podcast genres */}
              <p>Genre: {podcast.genres.map(genreId => genres[genreId]).join(', ')}</p>

              {/* Last updated date */}
              <p>Last Updated: {formatDate(podcast.updated)}</p>

              {/* Action buttons (favorites toggle) */}
              <div className="action-buttons">
                {/* Favorite button */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
