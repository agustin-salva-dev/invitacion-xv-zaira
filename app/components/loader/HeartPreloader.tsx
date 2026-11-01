"use client";

import { useEffect, useRef, useState } from "react";

interface HeartPreloaderProps {
  readonly onComplete: () => void;
}

export function HeartPreloader({ onComplete }: HeartPreloaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let anim: { destroy: () => void } | null = null;
    let completed = false;

    const init = () => {
      const container = containerRef.current;
      if (!container || !window.lottie || completed) return;

      anim = window.lottie.loadAnimation({
        container,
        path: "/assets/lottie/corazon.json",
        loop: true,
        autoplay: true,
        renderer: "svg",
      });
    };

    // Intentar inicializar inmediatamente, luego en el evento load
    const tryInit = () => init();
    if (document.readyState === "complete") {
      tryInit();
    }
    window.addEventListener("load", tryInit);

    // Esperar a que todo cargue y luego hacer fade-out
    const handleLoad = () => {
      if (completed) return;
      completed = true;

      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          anim?.destroy();
          onComplete();
        }, 500);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    // Fallback: timeout de 3s por si el evento load tarda
    const fallback = setTimeout(() => {
      if (!completed) handleLoad();
    }, 3000);

    return () => {
      window.removeEventListener("load", tryInit);
      clearTimeout(fallback);
      anim?.destroy();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="preloader-overlay"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <div ref={containerRef} className="preloader-lottie" />
      </div>
    </div>
  );
}

