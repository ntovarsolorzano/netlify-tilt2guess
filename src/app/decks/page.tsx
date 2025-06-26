import Link from 'next/link';
import { getDecks, type WordDeck } from '@/lib/decks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function DeckCard({ deck }: { deck: WordDeck }) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary transition-all duration-200">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex justify-between items-start">
          {deck.name}
          {deck.isPremium && <Star className="h-5 w-5 text-accent fill-accent" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full font-bold" disabled={deck.isPremium}>
          <Link href={`/play/${deck.id}/ready`}>
            {deck.isPremium && <Lock className="mr-2 h-4 w-4" />}
            {deck.isPremium ? 'Unlock' : 'Play'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default async function DecksPage() {
  const decks = await getDecks();

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

export const revalidate = 60; // Revalidate data every 60 seconds
