"use client";

import { useState, useEffect } from "react";
import type { CountdownTime } from "@/app/types/invitation";

function computeCountdown(targetDate: string): CountdownTime {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const distance = target - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

export function useCountdown(targetDate: string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(
    computeCountdown(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = computeCountdown(targetDate);
      setCountdown(next);
      if (next.isExpired) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}

