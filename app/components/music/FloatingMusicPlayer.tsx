"use client";

import { useRef, useEffect } from "react";
import type { UseMusicPlayerReturn } from "@/app/hooks/useMusicPlayer";

interface FloatingMusicPlayerProps {
  readonly musicPlayer: UseMusicPlayerReturn;
}

export function FloatingMusicPlayer({ musicPlayer }: FloatingMusicPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<{ play: () => void; stop: () => void; destroy: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.lottie) return;

    animRef.current = window.lottie.loadAnimation({
      container,
      path: "/assets/lottie/music-player-icon.json",
      loop: true,
      autoplay: false,
      renderer: "svg",
    });

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, []);

  // Sincronizar animación con estado de música
  useEffect(() => {
    if (!animRef.current) return;
    if (musicPlayer.state === "playing") {
      animRef.current.play();
    } else {
      animRef.current.stop();
    }
  }, [musicPlayer.state]);

  const isPlaying = musicPlayer.state === "playing";

  const getAriaLabel = (): string => {
    return isPlaying ? "Pausar música" : "Reproducir música";
  };

  return (
    <button
      className={`floating-music-player ${isPlaying ? "is-playing" : "is-paused"}`}
      onClick={musicPlayer.toggle}
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
      style={{
        backgroundColor: "#58A7D8",
        borderColor: "#FFFFFF",
        opacity: isPlaying ? 1 : 0.55,
      }}
    >
      <div ref={containerRef} className="music-icon-lottie" aria-hidden="true" />
    </button>
  );
}

