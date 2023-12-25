import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi"; // Assuming you're using React Icons

import styles from "./SideMenu.module.css";

const SideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOptionClick = (option) => {
    // Handle click for the selected option
    console.log(`Clicked on ${option}`);
    // You can implement logic for each option here (e.g., share or add to playlist)
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <BiDotsHorizontalRounded />
      </div>
      {menuOpen && (
        <div className={styles.options}>
          <div
            className={styles.option}
            onClick={() => handleOptionClick("Share")}
          >
            Share
          </div>
          <div
            className={styles.option}
            onClick={() => handleOptionClick("Add to Playlist")}
          >
            Add to Playlist
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
