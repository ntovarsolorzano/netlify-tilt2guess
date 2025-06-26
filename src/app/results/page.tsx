"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RotateCw, Home, CheckCircle, XCircle } from 'lucide-react';

function WordList({ title, words, icon: Icon, variant }: { title: string; words: string[]; icon: React.ElementType; variant: 'correct' | 'pass' }) {
  const colors = variant === 'correct' ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`font-headline flex items-center gap-2 ${colors}`}>
          <Icon className="h-6 w-6" />
          {title} ({words.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {words.length > 0 ? (
          <ScrollArea className="h-32 pr-4">
            <ul className="space-y-1">
              {words.map((word, index) => (
                <li key={index} className="text-lg text-muted-foreground">{word}</li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground">None.</p>
        )}
      </CardContent>
    </Card>
  );
}


export default function ResultsPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '0';
  const guessed = searchParams.get('guessed')?.split(',') || [];
  const passed = searchParams.get('passed')?.split(',') || [];
  const deckId = searchParams.get('deckId');

  return (
    <GameContainer>
      <div className="flex flex-col h-full">
        <header className="p-8 text-center bg-primary text-primary-foreground">
          <h1 className="font-headline text-3xl font-bold">Round Over!</h1>
          <p className="text-xl mt-2">Your score is</p>
          <div className="font-headline text-8xl font-bold text-accent">{score}</div>
        </header>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <WordList title="Correct" words={guessed.filter(Boolean)} icon={CheckCircle} variant="correct" />
          <WordList title="Passed" words={passed.filter(Boolean)} icon={XCircle} variant="pass" />
        </div>
        
        <Separator />

        <footer className="p-4 grid grid-cols-2 gap-4">
          <Button asChild variant="outline" size="lg" className="h-14 text-lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
          </Button>
          {deckId && (
            <Button asChild size="lg" className="h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`/play/${deckId}/ready`}>
                <RotateCw className="mr-2 h-5 w-5" />
                Play Again
              </Link>
            </Button>
          )}
        </footer>
      </div>
    </GameContainer>
  );
}
