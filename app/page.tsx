"use client";
import { useEffect, useRef, useState } from "react";
import MusicPage from "./components/MusicPlayerDetailPage";
import { AudioPlayerContext } from "./audio-player-context";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null); // Your audioRef

  return (
    <AudioPlayerContext.Provider value={audioRef}>
      <MusicPage />
    </AudioPlayerContext.Provider>
  );
}
