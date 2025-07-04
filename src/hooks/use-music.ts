"use client";

import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react';

type MusicContextType = {
  playMusic: () => void;
  stopMusic: () => void;
  isPlaying: boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => console.error("Audio play failed. User interaction may be required.", error));
      setIsPlaying(true);
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  return React.createElement(
    MusicContext.Provider,
    { value: { playMusic, stopMusic, isPlaying } },
    React.createElement('audio', { ref: audioRef, src: "/media/music/Lights.mp4", preload: "auto" }),
    children
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
