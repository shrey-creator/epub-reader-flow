import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./StickyBar.module.css"; // Import CSS module for styling
import { AudioPlayerContext } from "../audio-player-context";
import { FaPause, FaPlay, FaFastForward, FaFastBackward } from "react-icons/fa"; // Import Play Icon from react-icons/fa
import ProgressBar from "./ProgressBar";

const StickyBar: React.FC<{
  handleSongEnded: () => void;
  currentSongIndex: number;
  songsArray: any;
  isSongPlaying: boolean;
  setIsSongPlaying: any;
}> = ({
  handleSongEnded,
  currentSongIndex,
  songsArray,
  isSongPlaying,
  setIsSongPlaying,
}) => {
  const audioRef = useContext(AudioPlayerContext);
  const [currentTimeInSeconds, setCurrentTime] = useState(0);
  const [durationInSeconds, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef?.current) {
      if (!isSongPlaying && currentSongIndex !== -1) {
        audioRef.current.pause();
      } else if (isSongPlaying) {
        audioRef.current.play();
      }
    }
  }, [isSongPlaying]);

  const togglePlay = () => {
    if (currentSongIndex !== -1) setIsSongPlaying(!isSongPlaying);
  };

  // ... audio playback logic

  const convertSecondsToMinSec = (seconds: number): string => {
    if (!seconds) return `00:00`;
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const updateProgressBar = () => {
    const audio = audioRef?.current;
    if (audio) {
      const progress = (audio.currentTime / audio.duration) * 100;
      //   progressBar.style.width = `${progress}%`;

      // Get current time and duration as numbers
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(audio.currentTime % 60);
      const currentTimeInSeconds = currentMinutes * 60 + currentSeconds;

      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration % 60);
      const durationInSeconds = durationMinutes * 60 + durationSeconds;

      // Update state with numbers, but format as strings for display
      setCurrentTime(currentTimeInSeconds);
      setDuration(durationInSeconds);
    }
  };

  const handleSeek = (clickTimeInSeconds: number) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = clickTimeInSeconds;
    }
  };

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.addEventListener("timeupdate", updateProgressBar);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateProgressBar);
        }
      };
    }
  }, []);

  const handleFastForward = () => {
    let forwaredTime = currentTimeInSeconds + 10;
    if (forwaredTime > durationInSeconds) forwaredTime = durationInSeconds;
    if (audioRef?.current) audioRef.current.currentTime = forwaredTime;
  };

  const handleBackForward = () => {
    let backWardedTime = currentTimeInSeconds - 10;
    if (backWardedTime < 0) backWardedTime = 0;
    if (audioRef?.current) audioRef.current.currentTime = backWardedTime;
  };

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songsArray[currentSongIndex]?.name || "Unknown Title",
        artist: "Your Artist Name", // Update with appropriate artist info
        album: "Your Album Name", // Update with appropriate album info
        // artwork: [
        //   {
        //     src: songsArray[currentSongIndex]?.imgUrl,
        //     sizes: "96x96",
        //     type: "image/png",
        //   },
        //   // Add more artwork sizes if needed
        // ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        setIsSongPlaying(true);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        setIsSongPlaying(false);
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        handleBackForward();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        handleFastForward();
      });
    }
  }, [
    currentSongIndex,
    handleBackForward,
    handleFastForward,
    setIsSongPlaying,
    songsArray,
  ]);

  return (
    <div className={styles.stickyBar}>
      <ProgressBar
        currentTime={currentTimeInSeconds}
        duration={durationInSeconds}
        onSeek={handleSeek}
      />

      <div className={styles.stickyBarBottomSection}>
        <div className={styles.songInfot}>
          {currentSongIndex !== -1 ? (
            <div className={styles.songInfo}>
              <img src={songsArray[currentSongIndex]?.imgUrl} alt="" />
              <p>{songsArray[currentSongIndex]?.name}</p>
            </div>
          ) : (
            <div className={styles.songInfoHidden}>
              <img
                src="https://imgs.search.brave.com/WCLH_FtKrXIFcLDsmF-XjYrqRIwO-0vMsFTjvYtt1ek/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9ia2Fy/dGljbGVzaG9tZS5m/aWxlcy53b3JkcHJl/c3MuY29tLzIwMTkv/MDgvMGJmZTMtMTYy/MmMtOGNjMjMzXzRj/OWM0YWI3MWQyODQy/MDM5NDhlZDIwZThi/ZGNmODM0bXYyLmpw/Zz93PTMwMiZoPTMw/Mg"
                alt=""
              />
              <p>song</p>
            </div>
          )}
        </div>

        <div className={styles.stickyBarMiddleSection}>
          <FaFastBackward
            className={styles.playIcon}
            onClick={handleBackForward}
          />
          {!isSongPlaying ? (
            <FaPlay className={styles.playIcon} onClick={togglePlay} />
          ) : (
            <FaPause className={styles.playIcon} onClick={togglePlay} />
          )}
          <FaFastForward
            className={styles.playIcon}
            onClick={handleFastForward}
          />
        </div>

        <div>
          <audio
            ref={audioRef}
            src="/test2.mp3"
            onEnded={handleSongEnded}
          ></audio>

          <div className={styles.timeDisplay}>
            <span>{convertSecondsToMinSec(currentTimeInSeconds)}</span> /{" "}
            <span>{convertSecondsToMinSec(durationInSeconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBar;
