import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function GameContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex justify-center bg-background">
      <div className={cn("relative flex flex-col w-full max-w-sm min-h-screen bg-card shadow-lg", className)}>
        {children}
      </div>
    </div>
  );
}
