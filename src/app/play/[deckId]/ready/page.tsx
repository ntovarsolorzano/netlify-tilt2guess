"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GameContainer } from '@/components/game-container';
import { getDeckById, WordDeck } from '@/lib/decks';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type PermissionState = 'prompt' | 'granted' | 'denied';

export default function ReadyPage() {
  const [deck, setDeck] = useState<WordDeck | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [gameState, setGameState] = useState<'loading' | 'ready' | 'countdown' | 'error'>('loading');
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;

  useEffect(() => {
    if (deckId) {
      getDeckById(deckId).then(data => {
        if (data) {
          setDeck(data);
          setGameState('ready');
        } else {
          setGameState('error');
        }
      });
    }
  }, [deckId]);

  useEffect(() => {
    if (gameState !== 'countdown') return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push(`/play/${deckId}`);
    }
  }, [countdown, gameState, router, deckId]);

  const handleStart = async () => {
    // Check for DeviceOrientationEvent and request permission for tilt controls
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionState('granted');
          setGameState('countdown');
        } else {
          setPermissionState('denied');
        }
      } catch (error) {
        // This can happen if the user is on a non-secure context or an unsupported browser
        console.warn("Permission request failed, proceeding without tilt controls.", error)
        setGameState('countdown');
      }
    } else {
      // For browsers that don't require explicit permission
      setPermissionState('granted');
      setGameState('countdown');
    }
  };

  if (gameState === 'loading') {
    return (
      <GameContainer className="flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </GameContainer>
    );
  }
  
  if (gameState === 'error') {
     return (
      <GameContainer className="flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-headline text-2xl text-destructive">Deck not found</h1>
        <p className="text-muted-foreground">Could not load the selected deck. Please go back and try another.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </GameContainer>
    );
  }
  
  return (
    <GameContainer className="flex flex-col items-center justify-center bg-primary text-primary-foreground text-center p-4">
      {gameState === 'ready' && (
        <>
          <h1 className="font-headline text-6xl font-bold">Get Ready!</h1>
          <p className="text-2xl mt-2 mb-8">Deck: <span className="font-bold">{deck?.name}</span></p>
          <p className="max-w-xs text-lg mb-8">Place the phone on your forehead so your friends can see the screen.</p>
          <Button onClick={handleStart} size="lg" className="h-16 text-2xl bg-accent text-accent-foreground hover:bg-accent/90">
            Start
          </Button>
          {permissionState === 'denied' && (
            <p className="mt-4 text-sm text-yellow-300">Tilt controls disabled. Please enable motion sensor access in your browser settings.</p>
          )}
        </>
      )}
      {gameState === 'countdown' && (
        <div className="animate-ping-once">
          <h1 className="font-headline font-bold text-9xl">{countdown > 0 ? countdown : "Go!"}</h1>
        </div>
      )}
    </GameContainer>
  );
}
