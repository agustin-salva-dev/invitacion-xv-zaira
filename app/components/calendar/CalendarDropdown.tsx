"use client";

/**
 * Dropdown de opciones para agendar el evento en un calendario externo.
 * Opciones: Google Calendar (redirección) y Apple Calendar (descarga .ics RFC 5545).
 * Responsabilidad única: mostrar las opciones y disparar la acción correspondiente.
 */

import { useState, useCallback, useEffect } from "react";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/app/lib/calendar/calendarUtils";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import type { EventSchedule } from "@/app/types/invitation";

interface CalendarDropdownProps {
  readonly event: EventSchedule;
  readonly honoree: string;
}

export function CalendarDropdown({ event, honoree }: CalendarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const containerRef = useClickOutside<HTMLDivElement>(close);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const handleGoogleCalendar = useCallback(() => {
    const url = buildGoogleCalendarUrl(event, honoree);
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  }, [event, honoree, close]);

  const handleAppleCalendar = useCallback(() => {
    downloadIcsFile(event, honoree);
    close();
  }, [event, honoree, close]);

  return (
    <div className="calendar-dropdown-wrapper" ref={containerRef}>
      <button
        type="button"
        className="boton"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="calendar-dropdown-menu"
      >
        📅 Agendar
        <span className="calendar-dropdown-arrow" aria-hidden="true">
          {isOpen ? " ▲" : " ▼"}
        </span>
      </button>

      {isOpen && (
        <div
          id="calendar-dropdown-menu"
          className="calendar-dropdown-menu"
          role="menu"
          aria-label="Elegí tu calendario"
        >
          <button
            type="button"
            className="calendar-dropdown-item"
            role="menuitem"
            onClick={handleGoogleCalendar}
          >
            <span className="calendar-dropdown-item-icon" aria-hidden="true">
              🗓️
            </span>
            Google Calendar
          </button>

          <button
            type="button"
            className="calendar-dropdown-item"
            role="menuitem"
            onClick={handleAppleCalendar}
          >
            <span className="calendar-dropdown-item-icon" aria-hidden="true">
              🍎
            </span>
            Apple Calendar
          </button>
        </div>
      )}
    </div>
  );
}

