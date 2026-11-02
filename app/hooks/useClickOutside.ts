"use client";

/**
 * Hook reutilizable para detectar clicks fuera de un elemento DOM.
 * Responsabilidad única: cerrar dropdowns, menús y popovers al hacer clic afuera.
 */

import { useEffect, useRef, useCallback } from "react";

export function useClickOutside<T extends HTMLElement>(onClickOutside: () => void) {
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [onClickOutside],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return ref;
}

