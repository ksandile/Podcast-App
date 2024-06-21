import React from 'react';
import AudioPlayer from './AudioPlayer';
import './PersistentAudioPlayer.css';

const PersistentAudioPlayer = ({ episode, seasonImage, onPause }) => {
  if (!episode) return null;

  return (
    <div className="persistent-audio-player">
      <img src={seasonImage} alt={`Season ${episode.seasonNumber}`} className="season-thumbnail" />
      <div className="episode-info">
        <h4>{episode.title}</h4>
        <p>Episode {episode.id}</p>
      </div>
      <AudioPlayer
        src={episode.audioSrc}
        isPlaying={true}
        onPlay={() => {}} // You might want to handle this in the parent component
        onPause={onPause}
      />
    </div>
  );
};

export default PersistentAudioPlayer;