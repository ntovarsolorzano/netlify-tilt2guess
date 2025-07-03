"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getDeckById, WordDeck } from '@/lib/decks';
import { useGameSettings } from '@/hooks/use-game-settings';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

// Using absolute tilt angles now. Assumes phone is vertical on forehead (beta ~90deg).
// A tilt of ~40 degrees in either direction is required.
const TILT_THRESHOLD_UP = 130; // Tilt screen toward ceiling to Pass
const TILT_THRESHOLD_DOWN = 50; // Tilt screen toward floor for Correct

type TiltState = 'neutral' | 'correct' | 'pass';
type GameStatus = 'playing' | 'paused' | 'ended';

export default function GameplayPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  const { settings } = useGameSettings();

  const [deck, setDeck] = useState<WordDeck | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [status, setStatus] = useState<GameStatus>('playing');
  
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [passedWords, setPassedWords] = useState<string[]>([]);
  
  const [tiltState, setTiltState] = useState<TiltState>('neutral');
  const isTilted = useRef(false);

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    
    getDeckById(deckId).then(data => {
      if (data) {
        setDeck(data);
        setWords(shuffleArray([...data.words]));
      }
    });
  }, [deckId]);

  const endGame = useCallback(() => {
    setStatus('ended');
    router.replace(`/results?deckId=${deckId}&score=${score}&guessed=${guessedWords.join(',')}&passed=${passedWords.join(',')}`);
  }, [router, deckId, score, guessedWords, passedWords]);

  useEffect(() => {
    if (status !== 'playing' || words.length === 0) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      endGame();
    }
  }, [timeLeft, status, words, endGame]);

  const nextWord = useCallback(() => {
    isTilted.current = false;
    setTiltState('neutral');
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      endGame();
    }
  }, [currentWordIndex, words.length, endGame]);

  const handleCorrect = useCallback(() => {
    if (isTilted.current || status !== 'playing') return;
    isTilted.current = true;
    setScore(s => s + 1);
    setGuessedWords(g => [...g, words[currentWordIndex]]);
    setTiltState('correct');
    setTimeout(nextWord, 500);
  }, [status, words, currentWordIndex, nextWord]);

  const handlePass = useCallback(() => {
    if (isTilted.current || status !== 'playing') return;
    isTilted.current = true;
    setPassedWords(p => [...p, words[currentWordIndex]]);
    setTiltState('pass');
    setTimeout(nextWord, 500);
  }, [status, words, currentWordIndex, nextWord]);
  
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta; // Front-to-back tilt in degrees
      if (beta === null) return;
      
      // Correct: Tilt down (beta decreases from 90)
      if (beta < TILT_THRESHOLD_DOWN) {
        handleCorrect();
      } 
      // Pass: Tilt up (beta increases from 90)
      else if (beta > TILT_THRESHOLD_UP) {
        handlePass();
      }
    };
    
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [handleCorrect, handlePass]);

  const getBackgroundColor = () => {
    switch(tiltState) {
      case 'correct': return 'bg-green-500';
      case 'pass': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  if (!deck) {
    return <div className="w-screen h-screen bg-primary" />;
  }

  return (
    <main className={`w-screen h-screen flex flex-col items-center justify-center transition-colors duration-200 ${getBackgroundColor()}`}>
      <div className="absolute top-5 left-5 text-primary-foreground text-3xl font-bold">Score: {score}</div>
      <div className="absolute top-5 right-5 text-primary-foreground text-3xl font-bold">Time: {timeLeft}</div>
      
      {tiltState === 'neutral' && (
        <h1 className="text-white font-headline text-7xl md:text-9xl font-bold text-center px-4">
          {words[currentWordIndex]}
        </h1>
      )}

      {tiltState === 'correct' && (
        <Check className="w-48 h-48 text-white" />
      )}

      {tiltState === 'pass' && (
        <X className="w-48 h-48 text-white" />
      )}
      
      <div className="absolute bottom-5 right-5 flex gap-4 md:hidden">
        <Button onClick={handlePass} variant="destructive" size="lg">Pass</Button>
        <Button onClick={handleCorrect} variant="secondary" className="bg-green-500 hover:bg-green-600" size="lg">Correct</Button>
      </div>

       <Button onClick={endGame} variant="ghost" className="absolute bottom-5 left-5 text-primary-foreground hover:bg-white/20">
        End Game
       </Button>
    </main>
  );
}
