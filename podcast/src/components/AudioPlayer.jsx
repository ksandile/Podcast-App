import React, { useEffect, useRef, useState } from 'react';

/**
 * AudioPlayer component renders an audio player with play/pause controls, seek bar,
 * current time, and duration display.
 *
 * Props:
 * - src: The URL of the audio file to be played.
 * - isPlaying: Boolean state indicating if the audio is currently playing.
 * - onPlay: Function to handle the play action.
 * - onPause: Function to handle the pause action.
 */
const AudioPlayer = ({ src, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null); // Reference to the <audio> element
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const [isSeeking, setIsSeeking] = useState(false); // State to track if user is seeking

  // Effect to set up event listeners when audio element is ready
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audioElement.duration); // Set total duration once loaded
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime); // Update current time as audio plays
    };

    audioElement.addEventListener('loadeddata', handleLoadedData); // Event listener for data loaded
    audioElement.addEventListener('timeupdate', handleTimeUpdate); // Event listener for time update

    // Clean up event listeners on component unmount
    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []); // Only runs once when component mounts

  // Effect to play or pause audio based on isPlaying prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play(); // Play audio if isPlaying is true
      } else {
        audioRef.current.pause(); // Pause audio if isPlaying is false
      }
    }
  }, [isPlaying]); // Run whenever isPlaying prop changes

  // Handler for play/pause button click
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause(); // Call parent function to handle pause
    } else {
      onPlay(); // Call parent function to handle play
    }
  };

  // Handler for when user starts seeking
  const handleSeekMouseDown = () => {
    setIsSeeking(true); // Set seeking state to true
  };

  // Handler for seek bar value change
  const handleSeekChange = (e) => {
    const newTime = e.target.value; // Get new time from input
    setCurrentTime(newTime); // Update current time state
    audioRef.current.currentTime = newTime; // Update audio element's current time
  };

  // Handler for when user finishes seeking
  const handleSeekMouseUp = () => {
    setIsSeeking(false); // Set seeking state to false
  };

  // Function to format time in seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Render the audio player UI
  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} /> {/* Audio element with ref to access DOM methods */}
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'} {/* Play or Pause button based on isPlaying state */}
        </button>
        <div className="seek-bar">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
          />
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
        <span className="current-time">{formatTime(currentTime)}</span> {/* Current time display */}
        <span className="duration">{formatTime(duration)}</span> {/* Total duration display */}
      </div>
    </div>
  );
};

export default AudioPlayer;
