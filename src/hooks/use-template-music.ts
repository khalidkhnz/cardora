"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Ambient music using Web Audio API.
 * Creates a lush, evolving pad with reverb — sounds like real ambient music.
 *
 * To use real MP3s instead: place files in public/audio/ named:
 * maharani.mp3, azure-vows.mp3, whispered-vows.mp3, noir-atelier.mp3, maison-blanche.mp3
 */

type Mood = "warm" | "ocean" | "vintage" | "dark" | "elegant";

const FILE_MAP: Record<Mood, string> = {
  warm: "maharani",
  ocean: "azure-vows",
  vintage: "whispered-vows",
  dark: "noir-atelier",
  elegant: "maison-blanche",
};

// Musical notes — each mood gets a unique chord progression feel
const PADS: Record<Mood, { notes: number[]; bass: number; tempo: number }> = {
  warm:    { notes: [264, 330, 396, 528], bass: 132, tempo: 0.15 },
  ocean:   { notes: [296, 352, 444, 528], bass: 148, tempo: 0.12 },
  vintage: { notes: [250, 314, 374, 500], bass: 125, tempo: 0.10 },
  dark:    { notes: [222, 264, 334, 444], bass: 111, tempo: 0.08 },
  elegant: { notes: [280, 352, 420, 560], bass: 140, tempo: 0.13 },
};

function createReverb(ctx: AudioContext): ConvolverNode {
  const convolver = ctx.createConvolver();
  const rate = ctx.sampleRate;
  const length = rate * 3;
  const impulse = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

export function useTemplateMusic(mood: Mood = "warm") {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const stoppers = useRef<(() => void)[]>([]);
  const usingFile = useRef(false);

  const startPad = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const pad = PADS[mood];

    // Master chain: gain → reverb → output
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 4);

    const reverb = createReverb(ctx);
    const reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.6, ctx.currentTime);

    const dry = ctx.createGain();
    dry.gain.setValueAtTime(0.5, ctx.currentTime);

    master.connect(dry);
    dry.connect(ctx.destination);
    master.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(ctx.destination);

    const allOscs: OscillatorNode[] = [];

    // Pad notes — slow evolving with vibrato
    pad.notes.forEach((freq, i) => {
      // Main tone
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Slow vibrato
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(pad.tempo + i * 0.02, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const noteGain = ctx.createGain();
      // Fade each note in at slightly different times
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.25 - i * 0.04, ctx.currentTime + 2 + i * 0.8);

      osc.connect(noteGain);
      noteGain.connect(master);
      osc.start();
      allOscs.push(osc);

      // Add a quiet octave-up harmonic for shimmer
      const harmonic = ctx.createOscillator();
      harmonic.type = "sine";
      harmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);
      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(0.03, ctx.currentTime);
      harmonic.connect(hGain);
      hGain.connect(master);
      harmonic.start();
      allOscs.push(harmonic);
    });

    // Bass — warm sub tone
    const bass = ctx.createOscillator();
    bass.type = "triangle";
    bass.frequency.setValueAtTime(pad.bass, ctx.currentTime);
    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0, ctx.currentTime);
    bassGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 5);
    bass.connect(bassGain);
    bassGain.connect(master);
    bass.start();
    allOscs.push(bass);

    // Sub bass — very deep
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(pad.bass / 2, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 6);
    sub.connect(subGain);
    subGain.connect(master);
    sub.start();
    allOscs.push(sub);

    // Slow filter sweep for movement
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(0.5, ctx.currentTime);
    // Slow sweep
    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.setValueAtTime(0.05, ctx.currentTime);
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.setValueAtTime(300, ctx.currentTime);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(filter.frequency);
    filterLfo.start();

    // Re-route master through filter
    master.disconnect();
    master.connect(filter);
    filter.connect(dry);
    filter.connect(reverb);

    stoppers.current = [() => {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      setTimeout(() => {
        allOscs.forEach(o => { try { o.stop(); } catch {} });
        try { filterLfo.stop(); } catch {}
        try { void ctx.close(); } catch {}
        ctxRef.current = null;
      }, 2500);
    }];
  }, [mood]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      if (usingFile.current && audioRef.current) {
        audioRef.current.pause();
      } else {
        stoppers.current.forEach(fn => fn());
        stoppers.current = [];
      }
      setIsPlaying(false);
      return;
    }

    // Check for MP3 file first
    const mp3 = `/audio/${FILE_MAP[mood]}.mp3`;
    fetch(mp3, { method: "HEAD" })
      .then(res => {
        if (res.ok && (res.headers.get("content-type")?.includes("audio") || res.headers.get("content-length") !== "0")) {
          if (!audioRef.current) {
            audioRef.current = new Audio(mp3);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;
          }
          void audioRef.current.play().then(() => {
            usingFile.current = true;
            setIsPlaying(true);
          }).catch(() => {
            audioRef.current = null;
            startPad();
            usingFile.current = false;
            setIsPlaying(true);
          });
        } else {
          throw new Error("no mp3");
        }
      })
      .catch(() => {
        startPad();
        usingFile.current = false;
        setIsPlaying(true);
      });
  }, [isPlaying, mood, startPad]);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      stoppers.current.forEach(fn => fn());
      if (ctxRef.current) { try { void ctxRef.current.close(); } catch {} ctxRef.current = null; }
    };
  }, []);

  return { isPlaying, toggle };
}
