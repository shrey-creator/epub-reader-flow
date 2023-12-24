import { useEffect, useRef, useState } from "react";
import styles from "./Progressbar.module.css"; // Import CSS module for styling

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const [handlePosition, setHandlePosition] = useState(0);
  const [position, setPosition] = useState(0);

  const [hoverTime, setHoverTime] = useState("0:00");

  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressPercentage = (currentTime / duration) * 100;
    setHandlePosition(progressPercentage);
  }, [currentTime, duration]);

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = handleRef.current?.getBoundingClientRect();
    const barWidth = rect?.width || 0;
    const position = event.clientX - rect.left;
    const newPercentage = Math.min(
      100,
      Math.max(0, (position / barWidth) * 100)
    );
    setHandlePosition(newPercentage);
    onSeek(duration * (newPercentage / 100));
  };

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = handleRef.current?.getBoundingClientRect();
    const barWidth = rect?.width || 0;
    const position = event.clientX - rect.left;
    const hoverPercentage = Math.min(
      100,
      Math.max(0, (position / barWidth) * 100)
    );
    const hoverTimeInSeconds = (duration * hoverPercentage) / 100;

    const hoverMinutes = Math.floor(hoverTimeInSeconds / 60);
    const hoverSeconds = Math.floor(hoverTimeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    setHoverTime(`${hoverMinutes}:${hoverSeconds}`);

    setPosition(event.clientX); // Update position for hoverTime div
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = handleRef.current?.getBoundingClientRect();
    const barWidth = rect?.width || 0;
    const position = event.clientX - rect.left;
    const clickPercentage = Math.min(
      100,
      Math.max(0, (position / barWidth) * 100)
    );
    const clickTimeInSeconds = duration * (clickPercentage / 100);

    onSeek(clickTimeInSeconds);
  };

  return (
    <div
      className={styles.ProgressBarContainer}
      ref={handleRef}
      onMouseMove={handleHover}
      onMouseLeave={() => setHoverTime("0:00")}
      onClick={handleClick}
      onMouseDown={handleDrag}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{ width: `${handlePosition}%` }}
        className={styles.ProgressBarFilled}
      ></div>
      {hoverTime !== "0:00" && (
        <div
          style={{
            left: `${position - 5}px`, // Position based on mouse position
            position: "absolute",
            cursor: "cursor", // Show clickable cursor
          }}
        >
          <p>{hoverTime}</p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
