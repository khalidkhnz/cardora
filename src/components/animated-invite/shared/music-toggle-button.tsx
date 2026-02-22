"use client";

import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export function MusicToggleButton({ isPlaying, onToggle, className }: MusicToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={
        className ??
        "fixed top-4 right-4 z-50 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-800/80"
      }
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}
