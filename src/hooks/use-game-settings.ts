"use client";

import { useState, useEffect, useCallback } from 'react';

type Settings = {
  duration: number;
  theme: 'light' | 'dark' | 'system';
  homeAnimation: 'festivity' | 'fire' | 'none';
  isMuted: boolean;
};

const defaultSettings: Settings = {
  duration: 60,
  theme: 'dark',
  homeAnimation: 'festivity',
  isMuted: false,
};

export function useGameSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('tilt-n-guess-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error("Could not load settings, using defaults.", error);
      setSettings(defaultSettings);
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem('tilt-n-guess-settings', JSON.stringify(updated));
    } catch (error) {
        console.error("Could not save settings.", error);
    }
  }, [settings]);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
       if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
       } else {
        document.documentElement.classList.remove('dark');
       }
    }
  }, [settings.theme]);

  return { settings, updateSettings };
}
