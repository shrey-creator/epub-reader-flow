import React, { useContext, useEffect, useState } from "react";
import { BiBell } from "react-icons/bi"; // Import the BiBell icon
import styles from "./MusicPage.module.css"; // Import CSS module
import SongDetail from "./song-item";
import { AudioPlayerContext } from "./audio-player-context";
import StickyBar from "./sticky-bar";

const MusicPage = () => {
  const songs = [
    {
      id: 1,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
      songUrl: "tes.mp3",
      imgUrl:
        "https://imgs.search.brave.com/RYl7czB-pd5dsWx2F8SoIICRTBu9lUFN5ZIVusCzU_0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zaGl2/amlwaWNzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9CcmFobWEtS3Vt/YXJpcy1JbWFnZXMt/RnJlZS1Eb3dubG9h/ZC0yMS1TZXB0ZW1i/ZXItMjAyMy5qcGc",
    },
    {
      id: 2,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
      songUrl: "bahara_part2.mp3",
      imgUrl:
        "https://imgs.search.brave.com/sRxpeEVsuEkxR1OBfSUVlPwsbeU1vjm9jqCCIVEDIiA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvc2hpdi1iYWJh/LWk2cDN6cTU5dHBu/Y2ZhYmouanBn",
    },
    {
      id: 3,
      name: "Song 1",
      singer: "Singer 1",
      isRingtoneAvailable: true,
      songUrl: "test2.mp3",
      imgUrl:
        "https://imgs.search.brave.com/OYmf3w94VZG5RxgGpFKp0WU6MqPM4Em9jrrFyVv_fm8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzVlL2Ez/LzU5LzVlYTM1OWY0/Y2Y1YmU4MjI1MThm/ZWZkY2IzMDRiOTNm/LmpwZw",
    },
    {
      id: 4,
      name: "Song 2",
      singer: "Singer 2",
      isRingtoneAvailable: false,
      songUrl: "test.mp3",
      imgUrl:
        "https://imgs.search.brave.com/dgmzsdLt86OYDBqY_42KU9POxOJHV8fJ_13KSxy40P8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDY2NjMy/NjIuanBn",
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

  const audioPlayer = useContext(AudioPlayerContext)?.current;
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const handleSongEnded = () => {
    // Check if there are more songs in the list
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1); // Update current song index
    } else {
      // If it's the last song, loop back to the beginning or stop playback
      setCurrentSongIndex(0); // Loop back to the first song
      // You can add logic here to stop playback or perform other actions
    }
  };
  // };
  useEffect(() => {
    audioPlayer?.addEventListener("ended", handleSongEnded);
  }, [AudioPlayerContext]);

  useEffect(() => {
    if (currentSongIndex >= 0) {
      const currentSongUrl = songs[currentSongIndex]?.songUrl as string;
      if (audioPlayer?.currentSrc !== currentSongUrl && audioPlayer)
        audioPlayer.src = currentSongUrl;
      audioPlayer?.play();
    }
  }, [currentSongIndex]);

  const handlePlayClick = (songIndex: number) => {
    if (songIndex === currentSongIndex) {
      if (isSongPlaying) setIsSongPlaying(false);
      else setIsSongPlaying(true);
    } else {
      setIsSongPlaying(true);
    }
    setCurrentSongIndex(songIndex);

    // if (songIndex === currentSongIndex) {
    //   setCurrentSongIndex(-1);
    // } else setCurrentSongIndex(songIndex);
    // setIsSongPlaying(true);
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
            <button
              className={styles["play-button"]}
              onClick={() => {
                setCurrentSongIndex(0);
              }}
            >
              Play
            </button>
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
                songindex={index}
                date={""}
                handlePlayClick={handlePlayClick}
                currentSongIndex={currentSongIndex}
              />
            </div>
          );
        })}
      </div>
      <StickyBar
        handleSongEnded={handleSongEnded}
        currentSongIndex={currentSongIndex}
        songsArray={songs}
        isSongPlaying={isSongPlaying}
        setIsSongPlaying={setIsSongPlaying}
      />
    </div>
  );
};

export default MusicPage;
