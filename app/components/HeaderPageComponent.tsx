import React from "react";
import styles from "./HeaderComponent.module.css"; // Import CSS module for styling

const HeaderComponent: React.FC<{
  handlePlayClick: () => void;
  titleOfSong: string;
  imageUrl: string;
}> = ({ handlePlayClick, titleOfSong, imageUrl }) => {
  if (!imageUrl)
    imageUrl =
      "https://imgs.search.brave.com/cHLZr76waEu1WhroTUyOjvQ52daoiir39BznW1pq5vk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJhaG1ha3VtYXJp/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDkvU2ls/ZW5jZS1tdXNpYy03/Njh4NzY4LmpwZw";
  return (
    <div className={styles["top-component"]}>
      <div className={styles["top-left"]}>
        <img src={imageUrl} alt="Song Cover" className={styles["song-cover"]} />
        <div className="top-side-component">
          <div className={styles["title"]}>{titleOfSong}</div>
          <button className={styles["play-button"]} onClick={handlePlayClick}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
