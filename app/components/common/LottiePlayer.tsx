"use client";

import { useLottie } from "@/app/hooks/useLottie";

interface LottiePlayerProps {
  readonly path: string;
  readonly loop?: boolean;
  readonly autoplay?: boolean;
  readonly className?: string;
}

export function LottiePlayer({
  path,
  loop = true,
  autoplay = true,
  className = "",
}: LottiePlayerProps) {
  const { containerRef } = useLottie({ path, loop, autoplay });

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

