"use client";

import { useGameSettings } from '@/hooks/use-game-settings';
import { useEffect, useState, useMemo } from 'react';

const FestivityAnimation = () => {
  const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}vw`,
      backgroundColor: `hsl(${Math.random() * 360}, 90%, 65%)`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${Math.random() * 3 + 5}s`,
    },
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map(p => (
        <div key={p.id} className="confetti" style={p.style} />
      ))}
    </div>
  );
};

const FireAnimation = () => {
    const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        style: {
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 50 + 10}px`,
            height: `${Math.random() * 50 + 10}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 3}s`,
            backgroundColor: ['#ff4500', '#ffa500', '#ff6347'][Math.floor(Math.random()*3)],
            opacity: Math.random() * 0.5 + 0.2,
        },
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {particles.map(p => (
                <div key={p.id} className="fire-particle" style={p.style} />
            ))}
        </div>
    );
};

export function HomeAnimation() {
  const { settings } = useGameSettings();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  switch (settings.homeAnimation) {
    case 'festivity':
      return <FestivityAnimation />;
    case 'fire':
      return <FireAnimation />;
    default:
      return null;
  }
}
