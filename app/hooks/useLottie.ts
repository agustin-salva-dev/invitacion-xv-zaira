"use client";

import { useEffect, useRef } from "react";

interface LottieInstance {
  play: () => void;
  stop: () => void;
  destroy: () => void;
}

interface LottieOptions {
  container: HTMLElement;
  path: string;
  loop: boolean;
  autoplay: boolean;
  renderer?: "svg" | "canvas" | "html";
}

declare global {
  interface Window {
    lottie: {
      loadAnimation: (options: LottieOptions) => LottieInstance;
    };
  }
}

interface UseLottieOptions {
  readonly path: string;
  readonly loop?: boolean;
  readonly autoplay?: boolean;
}

export function useLottie({
  path,
  loop = true,
  autoplay = true,
}: UseLottieOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<LottieInstance | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.lottie) return;

    const anim = window.lottie.loadAnimation({
      container,
      path,
      loop,
      autoplay,
      renderer: "svg",
    });

    animationRef.current = anim;

    return () => {
      anim.destroy();
      animationRef.current = null;
    };
  }, [path, loop, autoplay]);

  return { containerRef, animation: animationRef };
}

