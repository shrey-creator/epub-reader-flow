import React from "react";
import { BiBell } from "react-icons/bi";

interface SongDetailView {
  songName: string;
  sungBy: string;
  date: string;
  ringToneUrl: string;
  id: number;
}

const SongDetail: React.FC<SongDetailView> = ({
  songName,
  sungBy,
  date,
  ringToneUrl,
  id,
}) => {
  console.log(id);

  return (
    <div className="song-row" key={id}>
      <button
        className="play-button-small"
        onClick={() => handlePlayClick(songUrl)}
      >
        {" "}
        {isPlaying ? "▐▐ " : "▶"}
      </button>
      <div className="song-details">
        <div className="song-name">{songName}</div>
        <div className="singer"> {sungBy}</div>
      </div>
      {ringToneUrl && <BiBell className="ringtone-icon" />}
      <div className="options">
        <button className="options-button">...</button>
        {/* Add UI for options menu */}
      </div>
    </div>
  );
};

export default SongDetail;
