import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenre } from '../services/podcastService';

/**
 * Genre component fetches and displays podcasts belonging to a specific genre.
 */
const Genre = () => {
  const { genreId } = useParams(); // Extracts genreId from URL parameters
  const [genre, setGenre] = useState(null); // State to hold genre data
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetches genre data based on genreId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenre(genreId); // Fetch genre data
        setGenre(data); // Sets genre state with fetched data
        setLoading(false); // Marks loading as complete
      } catch (error) {
        console.error(`Error fetching genre with ID ${genreId}:`, error);
        setLoading(false); // Marks loading as complete on error
      }
    };

    fetchData(); // Executes fetchData function on component mount or when genreId changes
  }, [genreId]);

  // Renders loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Renders message if genre data is not found
  if (!genre) {
    return <div>Genre not found</div>;
  }

  // Renders genre name and list of shows belonging to the genre
  return (
    <div>
      <h1>{genre.name} Podcasts</h1> {/* Displays genre name */}
      <ul>
        {genre.shows.map(show => (
          <li key={show.id}>
            <a href={`/show/${show.id}`}>{show.title}</a> {/* Links to individual show page */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre; // Exports Genre component as default
