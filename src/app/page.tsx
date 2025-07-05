"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { Play, HelpCircle, Settings } from 'lucide-react';
import { HomeAnimation } from '@/components/home-animation';
import { useMusic } from '@/hooks/use-music';

export default function Home() {
  const { playTrack, stopMusic } = useMusic();

  useEffect(() => {
    playTrack('/api/home-music');

    return () => {
      // Stop music when navigating away from home
      // The next page will decide if it wants to play its own music
    };
  }, [playTrack]);

  return (
    <GameContainer className="flex flex-col items-center justify-center p-8 bg-card text-card-foreground relative overflow-hidden">
      <HomeAnimation />
      <div className="flex flex-col items-center text-center z-10">
        <h1 className="font-headline text-6xl font-bold tracking-tighter text-primary">
          Tilt'n'Guess
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          The hilarious head-to-head party game.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs mt-16 z-10">
        <Button asChild size="lg" className="h-14 text-xl font-bold bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/decks">
            <Play className="mr-2 h-6 w-6" />
            Start
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="h-14 text-xl font-semibold" onClick={stopMusic}>
          <Link href="/how-to-play">
            <HelpCircle className="mr-2 h-6 w-6" />
            How To Play
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="h-14 text-xl font-semibold" onClick={stopMusic}>
          <Link href="/settings">
            <Settings className="mr-2 h-6 w-6" />
            Settings
          </Link>
        </Button>
      </div>
    </GameContainer>
  );
}
