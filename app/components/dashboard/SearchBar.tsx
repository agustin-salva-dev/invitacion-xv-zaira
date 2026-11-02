"use client";

/**
 * Input de búsqueda reutilizable para el Dashboard.
 * Responsabilidad única: capturar texto de búsqueda con debounce visual.
 */

import { Search } from "lucide-react";

interface SearchBarProps {
  readonly value: string;
  readonly placeholder: string;
  readonly onChange: (value: string) => void;
}

export function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <div className="dash-search-wrapper">
      <Search size={16} className="dash-search-icon" aria-hidden="true" />
      <input
        type="search"
        className="dash-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}

