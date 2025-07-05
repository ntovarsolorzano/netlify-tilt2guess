"use client";

import React, { createContext, useContext, useRef, useState, useCallback, ReactNode, useEffect } from 'react';
import { useGameSettings } from './use-game-settings';

type MusicContextType = {
  playTrack: (src: string) => void;
  stopMusic: () => void;
  isPlaying: boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { settings } = useGameSettings();

  // Effect to control the muted state of the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = settings.isMuted;
    }
  }, [settings.isMuted]);

  const playTrack = useCallback((src: string) => {
    if (audioRef.current) {
      if (!audioRef.current.src.endsWith(src)) {
        audioRef.current.src = src;
      }
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => console.error("Audio play failed.", error));
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
    { value: { playTrack, stopMusic, isPlaying } },
    React.createElement('audio', { ref: audioRef, preload: "auto" }),
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
