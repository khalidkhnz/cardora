"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useMusicPlayer(musicUrl: string | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!musicUrl) return;

    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audioRef.current = null;
    };
  }, [musicUrl]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  return { audioRef, isPlaying, toggle };
}
