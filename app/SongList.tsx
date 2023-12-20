import React, { useState } from 'react';
import { FaPlay, FaPause, FaBell } from 'react-icons/fa';
import { Menu as HeadlessMenu, MenuButton, MenuList, MenuItem } from '@headlessui/react';
import AudioPlayer from './AudioPlayer';

interface Song {
  id: string;
  title: string;
  audioSrc: string;
}

interface SongListProps {
  songs: Song[];
  setPlayingSong: (song: Song | null) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, setPlayingSong }) => {
  const [playingSong, setPlayingSongState] = useState<Song | null>(null);

  const onPlaySong = (song: Song) => {
    if (playingSong === song) {
      // Pause the song
      AudioPlayer.pause();
      setPlayingSongState(null);
    } else {
      // Play the song
      AudioPlayer.play(song.audioSrc);
      setPlayingSongState(song);
    }
  };

  const onSetRingtone = (song: Song) => {
    // Implement ringtone setting logic here
    console.log('Setting ringtone for song:', song);
  };

  return (
    <ul className="song-list">
      {songs.map((song) => (
        <li key={song.id} className="song-item">
          <button className="play-button" onClick={() => onPlaySong(song)}>
            {/* Toggle play/pause icon based on song state */}
          </button>
          <span className="song-title">{song.title}</span>
          <button className="ringtone-button" onClick={() => onSetRingtone(song)}>
            <FaBell />
          </button>
          <MenuButton {...otherProps}>
            <ThreeDotsIcon />
            {/* ... Popup menu content */}
          </MenuButton>
        </li>
      ))}
    </ul>
  );
  // ... rest of the component code
};

export default SongList;
