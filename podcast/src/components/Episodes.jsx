import React from 'react';

const Episode = ({ episode }) => {
  return (
    <li className="episode-item">
      <div className="episode-details">
        <h4 className="episode-title">{episode.title}</h4>
        <p className="episode-duration">Duration: {episode.duration}</p>
      </div>
    </li>
  );
};

export default Episode;
