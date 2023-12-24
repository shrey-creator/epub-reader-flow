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
}) => {};

export default HeaderComponent;
