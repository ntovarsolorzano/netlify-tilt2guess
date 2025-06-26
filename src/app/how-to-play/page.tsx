import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { ArrowLeft, ArrowDownCircle, ArrowUpCircle, Smartphone } from 'lucide-react';

export default function HowToPlayPage() {
  return (
    <GameContainer>
      <header className="flex items-center p-4 border-b sticky top-0 bg-card z-10">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="font-headline text-2xl font-bold mx-auto pr-8">How To Play</h1>
      </header>
      <div className="flex-1 p-6 text-lg">
        <ul className="space-y-8">
          <li className="flex items-start gap-4">
            <Smartphone className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-headline text-xl font-bold">1. On Your Forehead</h2>
              <p className="text-muted-foreground">Place your phone on your forehead with the screen facing your friends.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <ArrowDownCircle className="h-10 w-10 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-headline text-xl font-bold">2. Correct Guess</h2>
              <p className="text-muted-foreground">When you guess a word correctly, tilt the phone <span className="font-bold">down</span>.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <ArrowUpCircle className="h-10 w-10 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-headline text-xl font-bold">3. Pass</h2>
              <p className="text-muted-foreground">If you're stuck, tilt the phone <span className="font-bold">up</span> to pass and get a new word.</p>
            </div>
          </li>
        </ul>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="font-bold bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/decks">Got It!</Link>
          </Button>
        </div>
      </div>
    </GameContainer>
  );
}
