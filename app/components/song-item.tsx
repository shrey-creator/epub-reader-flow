import React from "react";
import { BiBell } from "react-icons/bi";
import SideMenu from "./SideMenu";
import styles from "./SongItem.module.css";

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
    <div className={styles.songRow}>
      <div className={styles.leftComponent}>
        <button
          className={styles.playButtonSmall}
          onClick={() => {
            handlePlayClick(songindex);
          }}
        >
          {songindex === currentSongIndex ? "▐▐ " : "▶"}
        </button>
        <div className={styles.songDetails}>
          <div className={styles.songName}>{songName}</div>
        </div>
      </div>

      <div className={styles.middleComponent}>
        <div className={styles.singer}> {sungBy}</div>
      </div>

      <div className={styles.rightComponent}>
        {ringToneUrl && <BiBell className={styles.ringtoneIcon} />}
        <div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
