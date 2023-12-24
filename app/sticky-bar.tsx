import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./StickyBar.module.css"; // Import CSS module for styling
import { AudioPlayerContext } from "./audio-player-context";
import { FaPause, FaPlay } from "react-icons/fa"; // Import Play Icon from react-icons/fa

const StickyBar: React.FC<{
  handleSongEnded: () => void;
  currentSongIndex: number;
  songsArray: any;
}> = ({ handleSongEnded, currentSongIndex, songsArray }) => {
  const audioRef = useContext(AudioPlayerContext);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const togglePlay = () => {
    if (audioRef?.current) {
      if (currentSongIndex === -1) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const updateProgressBar = () => {
    const audio = audioRef?.current;
    const progressBar = progressBarRef.current;
    if (audio && progressBar) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;

      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(
        `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`
      );

      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration % 60);
      setDuration(
        `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`
      );
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef?.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const progressBarWidth = progressBarRef.current.clientWidth;
      const seekPercentage = (offsetX / progressBarWidth) * 100;
      const seekTime = (audioRef.current.duration * seekPercentage) / 100;
      audioRef.current.currentTime = seekTime;
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

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      audioRef?.current &&
      progressBarRef.current &&
      currentSongIndex !== -1
    ) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const progressBarWidth = progressBarRef.current.clientWidth;
      const hoverPercentage = (offsetX / progressBarWidth) * 100;
      const hoverTimeInSeconds =
        (audioRef.current.duration * hoverPercentage) / 100;

      const hoverMinutes = Math.floor(hoverTimeInSeconds / 60);
      const hoverSeconds = Math.floor(hoverTimeInSeconds % 60);
      setHoverTime(
        `${hoverMinutes}:${hoverSeconds.toString().padStart(2, "0")}`
      );
    }
  };

  const handleHoverLeave = () => {
    setHoverTime("0:00");
  };

  return (
    <div className={styles.stickyBar}>
      <div
        className={styles.progressBar}
        onMouseMove={handleHover}
        onMouseLeave={handleHoverLeave}
        onClick={handleSeek}
        ref={progressBarRef}
      >
        <div className={styles.progress}></div>
        {hoverTime !== "0:00" && (
          <div className={styles.hoverTime}>
            <span>{hoverTime}</span>
          </div>
        )}
      </div>

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

        {currentSongIndex === -1 ? (
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
            <span>{currentTime}</span> / <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBar;
