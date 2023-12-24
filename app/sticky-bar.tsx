import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./StickyBar.module.css"; // Import CSS module for styling
import { AudioPlayerContext } from "./audio-player-context";
import { FaPause, FaPlay } from "react-icons/fa"; // Import Play Icon from react-icons/fa
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
    setIsSongPlaying(!isSongPlaying);
  };

  // ... audio playback logic

  const convertSecondsToMinSec = (seconds: number): string => {
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

  const [hoverTime, setHoverTime] = useState("0:00");

  //   const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
  //     if (
  //       audioRef?.current &&
  //       progressBarRef.current &&
  //       currentSongIndex !== -1
  //     ) {
  //       const rect = progressBarRef.current.getBoundingClientRect();
  //       const offsetX = event.clientX - rect.left;
  //       const progressBarWidth = progressBarRef.current.clientWidth;
  //       const hoverPercentage = (offsetX / progressBarWidth) * 100;
  //       const hoverTimeInSeconds =
  //         (audioRef.current.duration * hoverPercentage) / 100;

  //       const hoverMinutes = Math.floor(hoverTimeInSeconds / 60);
  //       const hoverSeconds = Math.floor(hoverTimeInSeconds % 60);
  //       setHoverTime(
  //         `${hoverMinutes}:${hoverSeconds.toString().padStart(2, "0")}`
  //       );
  //     }
  //   };

  const handleHoverLeave = () => {
    setHoverTime("0:00");
  };

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

        {!isSongPlaying ? (
          <FaPlay className={styles.playIcon} onClick={togglePlay} />
        ) : (
          <FaPause className={styles.playIcon} onClick={togglePlay} />
        )}

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
