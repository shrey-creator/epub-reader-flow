import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi"; // Assuming you're using React Icons

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
    <div className={"side-menu"}>
      <div className={"menu-icon"} onClick={toggleMenu}>
        <BiDotsHorizontalRounded />
      </div>
      {menuOpen && (
        <div className="options">
          <div className="option" onClick={() => handleOptionClick("Share")}>
            Share
          </div>
          <div
            className="option"
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
