"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { MusicState } from "@/app/types/invitation";

export interface UseMusicPlayerReturn {
  readonly state: MusicState;
  readonly play: () => void;
  readonly pause: () => void;
  readonly toggle: () => void;
  readonly initialize: () => void;
}

export function useMusicPlayer(src: string): UseMusicPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicState>("idle");

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;

    const onEnded = () => setState("idle");
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const initialize = useCallback(() => {
    // Pre-load audio on user interaction (required by browsers)
    audioRef.current?.load();
  }, []);

  const play = useCallback(() => {
    setState("playing");
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play note (waiting for user audio file):", err);
      });
    }
  }, []);

  const pause = useCallback(() => {
    setState("paused");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (state === "playing") {
      pause();
    } else {
      play();
    }
  }, [state, play, pause]);

  return { state, play, pause, toggle, initialize };
}

