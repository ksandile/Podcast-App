import React from 'react';

/**
 * Episode component renders details of a single episode.
 * Props:
 * - episode: Object containing episode details (title, duration).
 */
const Episode = ({ episode }) => {
  return (
    <li className="episode-item"> {/* List item with episode-item class */}
      <div className="episode-details"> {/* Container div with episode-details class */}
        <h4 className="episode-title">{episode.title}</h4> {/* Episode title heading */}
        <p className="episode-duration">Duration: {episode.duration}</p> {/* Episode duration paragraph */}
      </div>
    </li>
  );
};

export default Episode; // Export Episode component as default
