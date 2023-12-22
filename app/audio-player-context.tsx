import { createContext } from "react";

export const AudioPlayerContext = createContext(new Audio());
export const CurrentPlayingSongContext = createContext("");
