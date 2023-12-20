import React from 'react';
import { PlayIcon } from 'react-icons/fa';

interface PlayAllButtonProps {
  albumId: string;
  onClick: () => void;
}

const PlayAllButton: React.FC<PlayAllButtonProps> = ({ albumId, onClick }) => {
  return (
    <button className="play-all-button" onClick={onClick}>
      <PlayIcon /> Play All
    </button>
  );
};

export default PlayAllButton;
