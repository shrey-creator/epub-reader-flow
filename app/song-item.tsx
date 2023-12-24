import React, { useContext, useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import SideMenu from "./SideMenu";
import { AudioPlayerContext } from "./audio-player-context";

interface SongDetailView {
  songName: string;
  sungBy: string;
  date: string;
  ringToneUrl: string;
  songindex: number;
  handlePlayClick: any;
  currentSongIndex: number;
}

const SongDetail: React.FC<SongDetailView> = ({
  songName,
  sungBy,
  date,
  ringToneUrl,
  songindex,
  handlePlayClick,
  currentSongIndex,
}) => {
  // const [isPlaying, setPlaying] = useState(false); // State to control play/pause

  return (
    <div className="song-row">
      <button
        className="play-button-small"
        onClick={() => {
          handlePlayClick(songindex);
        }}
      >
        {songindex === currentSongIndex ? "▐▐ " : "▶"}
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
