import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import SideMenu from "./SideMenu";

interface SongDetailView {
  songName: string;
  sungBy: string;
  date: string;
  ringToneUrl: string;
  songUrl: string | undefined;
}

const SongDetail: React.FC<SongDetailView> = ({
  songName,
  sungBy,
  date,
  ringToneUrl,
  songUrl,
}) => {
  const [isPlaying, setPlaying] = useState(false); // State to control play/pause
  const [audioPlayer, setAudioPlayer] = useState(new Audio(songUrl));

  return (
    <div className="song-row">
      <button
        className="play-button-small"
        onClick={() => {
          if (audioPlayer && isPlaying) {
            audioPlayer.pause();
          } else if (audioPlayer && !isPlaying) {
            audioPlayer.play();
          }

          if (isPlaying) setPlaying(false);
          else setPlaying(true);
        }}
      >
        {isPlaying ? "▐▐ " : "▶"}
      </button>
      <div className="song-details">
        <div className="song-name">{songName}</div>
        <div className="singer"> {sungBy}</div>
      </div>
      {ringToneUrl && (
        <button>
          <BiBell className="ringtone-icon" />
        </button>
      )}
      <div className="options1">
        <SideMenu />
        {/* <button className="options-button">...</button> */}
        {/* Add UI for options menu */}
      </div>
    </div>
  );
};

export default SongDetail;
