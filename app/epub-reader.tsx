import React, { useContext, useEffect, useState } from "react";
import { BiBell } from "react-icons/bi"; // Import the BiBell icon
import styles from "./MusicPage.module.css"; // Import CSS module
import SongDetail from "./song-item";
import { AudioPlayerContext } from "./audio-player-context";

const MusicPage = () => {
  const songs = [
    {
      id: 1,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
      songUrl: "test.mp3",
    },
    {
      id: 2,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
      songUrl: "test1.mp3",
    },
    {
      id: 3,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
      songUrl: "test2.mp3",
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

  const audioPlayer = useContext(AudioPlayerContext);
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState("");
  // const handleSongEnded = () => {
  //   // Check if there are more songs in the list
  //   if (currentSongIndex < songs.length - 1) {
  //     setCurrentSongIndex(currentSongIndex + 1); // Update current song index
  //   } else {
  //     // If it's the last song, loop back to the beginning or stop playback
  //     setCurrentSongIndex(0); // Loop back to the first song
  //     // You can add logic here to stop playback or perform other actions
  //   }
  // };

  // audioPlayer.addEventListener('ended', handleSongEnded);

  useEffect(() => {
    if (currentPlayingUrl) {
      audioPlayer.src = currentPlayingUrl as string;
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }, [currentPlayingUrl]);

  const handlePlayClick = (songUrl: string) => {
    // Logic to play the song using the provided URL

    if (songUrl) {
      setCurrentPlayingUrl(songUrl);
    } else {
      setCurrentPlayingUrl("");
    }
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
        {songs.map((song, index) => {
          return (
            <div>
              <SongDetail
                songName={song.name}
                sungBy={song.singer}
                ringToneUrl={"test.mp3"}
                key={index}
                songUrl={song?.songUrl}
                date={""}
                handlePlayClick={handlePlayClick}
                currentPlayingSongUrl={currentPlayingUrl}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicPage;
