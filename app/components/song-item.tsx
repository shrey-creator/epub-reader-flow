import React from "react";
import { BiBell } from "react-icons/bi";
import SideMenu from "../SideMenu";

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
      </div>
    </div>
  );
};

export default SongDetail;
