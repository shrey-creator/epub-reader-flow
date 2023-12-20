import React, { useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
  onFinished?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay, onPause, onFinished }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const audioRef = React.useRef(null);
  
    useEffect(() => {
      if (isPlaying) {
        audioRef?.current.play();
      } else {
        audioRef?.current.pause();
      }
    }, [isPlaying]);
  
    useEffect(() => {
      const updateProgress = () => {
        if (audioRef.current) {
          const { currentTime, duration } = audioRef.current;
          const percentage = Math.min(1, currentTime / duration);
          setProgress(percentage);
        }
      };
      audioRef.current.addEventListener('timeupdate', updateProgress);
      return () => audioRef.current.removeEventListener('timeupdate', updateProgress);
    }, []);
  
    const handlePlayClick = () => {
      onPlay();
      setIsPlaying(true);
    };
  
    const handlePauseClick = () => {
      onPause();
      setIsPlaying(false);
    };
  
    const handleProgressClick = (event) => {
      const clickPosition = event.nativeEvent.offsetX / event.target.offsetWidth;
      audioRef.current.currentTime = clickPosition * audioRef.current.duration;
    };
  
    return (
      <div className="audio-player">
        <button onClick={isPlaying ? handlePauseClick : handlePlayClick}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div style={{ width: `${progress * 100}%` }} />
        </div>
        {onFinished && (
          <button onClick={() => onFinished()}>Finished Listening</button>
        )}
      </div>
    );
  };

export default AudioPlayer;
