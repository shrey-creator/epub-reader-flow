import { createContext, useRef } from "react";
// const audioRef = useRef<HTMLAudioElement>(new Audio());

export const CurrentPlayingSongContext = createContext("");
type AudioRefType = React.RefObject<HTMLAudioElement>;

export const AudioPlayerContext = createContext<AudioRefType | null>(null);
