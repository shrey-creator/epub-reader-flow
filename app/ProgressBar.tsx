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

  return (
    <div className={styles.ProgressBarContainer}>
      <div
        style={{ width: `${handlePosition}%` }}
        className={styles.ProgressBarFilled}
      >
        <div
          className={styles.Handle}
          ref={handleRef}
          onMouseDown={handleDrag}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
