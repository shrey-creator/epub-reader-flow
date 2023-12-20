import React, { useState } from "react";
import { BiBell } from "react-icons/bi"; // Import the BiBell icon
import styles from "./MusicPage.module.css"; // Import CSS module
import SongDetail from "./song-item";

const MusicPage = () => {
  const songs = [
    {
      id: 1,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
    },
    {
      id: 2,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
    },
    {
      id: 3,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
    },
    {
      id: 4,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
    },
    {
      id: 5,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
    },
    {
      id: 6,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
    },
    {
      id: 7,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
    },
    {
      id: 8,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
    },
    // Add more songs as needed
  ];
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const [playing, setPlaying] = useState(false); // State to control play/pause

  const handlePlayClick = (songUrl: string) => {
    // Logic to play the song using the provided URL
    const audioPlayer = new Audio(songUrl);

    if (playing) {
      setPlaying(false);
      audioPlayer.pause();
    } else {
      setCurrentSongUrl(songUrl);
      setPlaying(true);
      audioPlayer.play();
    }

    // Implement your audio player or playback logic here
    // For instance:
  };

  return (
    <div className={styles["music-page"]}>
      {/* Top Component */}
      <div className={styles["top-component"]}>
        <div className={styles["top-left"]}>
          <img
            src="https://imgs.search.brave.com/RYl7czB-pd5dsWx2F8SoIICRTBu9lUFN5ZIVusCzU_0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zaGl2/amlwaWNzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9CcmFobWEtS3Vt/YXJpcy1JbWFnZXMt/RnJlZS1Eb3dubG9h/ZC0yMS1TZXB0ZW1i/ZXItMjAyMy5qcGc"
            alt="Song Cover"
            className={styles["song-cover"]}
          />
          <div className="top-side-component">
            <div className={styles["title"]}>Title of the Song</div>
            <button className={styles["play-button"]}>Play</button>
          </div>
        </div>
      </div>

      {/* List of Songs */}
      <div className={styles["song-list"]}>
        {songs.map((song, index) => (
          <SongDetail
            songName={song.name}
            sungBy={song.singer}
            ringToneUrl={song.isRingtoneAvailable}
            id={index}
            songUrl={"test.mp3"}
            handlePlayClick={handlePlayClick}
            isPlaying={playing}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
