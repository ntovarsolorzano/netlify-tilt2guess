"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDecks, type WordDeck } from '@/lib/decks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { ArrowLeft, Star, Lock, Loader2 } from 'lucide-react';
import { useMusic } from '@/hooks/use-music';

function DeckCard({ deck }: { deck: WordDeck }) {
  const { stopMusic } = useMusic();
  const handlePlayClick = () => {
    if (!deck.isPremium) {
      stopMusic();
    }
  };
  
  return (
    <Card className="flex flex-col text-center hover:border-primary transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-lg flex justify-between items-start h-12">
          {deck.name}
          {deck.isPremium && <Star className="h-5 w-5 text-accent fill-accent flex-shrink-0" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex-1 flex items-center justify-center my-4">
          <Image
            src={deck.stickerUrl}
            alt={`${deck.name} deck icon`}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <Button asChild className="w-full font-bold mt-auto" disabled={deck.isPremium} onClick={handlePlayClick}>
          <Link href={`/play/${deck.id}/ready`}>
            {deck.isPremium && <Lock className="mr-2 h-4 w-4" />}
            {deck.isPremium ? 'Unlock' : 'Play'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DecksPage() {
  const [decks, setDecks] = useState<WordDeck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDecks().then(data => {
      setDecks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <GameContainer className="flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <header className="flex items-center p-4 border-b">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="font-headline text-2xl font-bold mx-auto pr-8">Select a Deck</h1>
      </header>
      <div className="p-4 overflow-y-auto flex-1">
        <div className="grid grid-cols-2 gap-4">
          {decks.map(deck => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      </div>
    </GameContainer>
  );
}
