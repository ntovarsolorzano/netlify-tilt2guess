"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GameContainer } from '@/components/game-container';
import { ArrowLeft, LogIn, LogOut, Moon, Sun, Monitor, Sparkles, Flame, Ban, Volume2, VolumeX } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useGameSettings } from '@/hooks/use-game-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { settings, updateSettings } = useGameSettings();
  const isLoggedIn = false; // Placeholder for auth status

  return (
    <GameContainer>
      <header className="flex items-center p-4 border-b">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="font-headline text-2xl font-bold mx-auto pr-8">Settings</h1>
      </header>
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Sound</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-2 rounded-lg">
                    <Label htmlFor="mute-switch" className="text-lg flex items-center gap-3 cursor-pointer">
                        {settings.isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                        Mute All Sounds
                    </Label>
                    <Switch
                        id="mute-switch"
                        checked={settings.isMuted}
                        onCheckedChange={(checked) => updateSettings({ isMuted: checked })}
                    />
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Gameplay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Round Duration</Label>
              <RadioGroup
                value={String(settings.duration)}
                onValueChange={(value) => updateSettings({ duration: Number(value) })}
                className="grid grid-cols-3 gap-4"
              >
                {[60, 90, 120].map(duration => (
                  <div key={duration}>
                    <RadioGroupItem value={String(duration)} id={`duration-${duration}`} className="sr-only" />
                    <Label
                      htmlFor={`duration-${duration}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="text-2xl font-bold">{duration}</span>
                      <span className="text-sm">sec</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              <Label className="text-lg font-semibold">Theme</Label>
              <RadioGroup
                value={settings.theme}
                onValueChange={(value: 'light' | 'dark' | 'system') => updateSettings({ theme: value })}
                className="grid grid-cols-3 gap-4"
              >
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                    <Label htmlFor="theme-light" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Sun className="h-8 w-8 mb-2" />
                        Light
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                    <Label htmlFor="theme-dark" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Moon className="h-8 w-8 mb-2" />
                        Dark
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                    <Label htmlFor="theme-system" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Monitor className="h-8 w-8 mb-2" />
                        System
                    </Label>
                  </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Homepage Animation</CardTitle>
            <CardDescription>Select a background animation for the home screen.</CardDescription>
          </CardHeader>
          <CardContent>
             <RadioGroup
                value={settings.homeAnimation}
                onValueChange={(value: 'festivity' | 'fire' | 'none') => updateSettings({ homeAnimation: value })}
                className="grid grid-cols-3 gap-4"
              >
                  <div>
                    <RadioGroupItem value="festivity" id="anim-festivity" className="sr-only" />
                    <Label htmlFor="anim-festivity" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Sparkles className="h-8 w-8 mb-2" />
                        Festivity
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="fire" id="anim-fire" className="sr-only" />
                    <Label htmlFor="anim-fire" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Flame className="h-8 w-8 mb-2" />
                        Fire
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="none" id="anim-none" className="sr-only" />
                    <Label htmlFor="anim-none" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                        <Ban className="h-8 w-8 mb-2" />
                        None
                    </Label>
                  </div>
              </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Account</CardTitle>
            <CardDescription>
              {isLoggedIn ? "You are logged in." : "Log in to sync your premium decks."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Log In / Sign Up
              </Button>
            )}
          </CardContent>
        </Card>

      </div>
    </GameContainer>
  );
}
