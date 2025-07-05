import { GameContainer } from '@/components/game-container';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <GameContainer className="flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </GameContainer>
  );
}
