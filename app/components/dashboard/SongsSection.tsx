"use client";

/**
 * Vista de Canciones Sugeridas del Dashboard.
 * Muestra lista de sugerencias con buscador y enlace externo opcional.
 */

import { useState, useMemo } from "react";
import { Music, ExternalLink } from "lucide-react";
import { StatCard } from "@/app/components/dashboard/StatCard";
import { SearchBar } from "@/app/components/dashboard/SearchBar";
import type { SongSuggestionView, DashboardStats } from "@/app/actions/dashboardActions";

interface SongsSectionProps {
  readonly songs: readonly SongSuggestionView[];
  readonly stats: DashboardStats;
}

function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoString));
}

export function SongsSection({ songs, stats }: SongsSectionProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return songs;
    const term = search.toLowerCase().trim();
    return songs.filter(
      (s) =>
        s.songTitle.toLowerCase().includes(term) ||
        s.guestName.toLowerCase().includes(term),
    );
  }, [songs, search]);

  return (
    <div className="dash-section">
      {/* Estadística */}
      <div className="dash-stats-grid dash-stats-grid--single">
        <StatCard
          label="Canciones sugeridas"
          value={stats.totalCanciones}
          icon={<Music size={22} />}
          accent="primary"
        />
      </div>

      {/* Buscador y lista */}
      <div className="dash-list-section">
        <div className="dash-list-toolbar">
          <h2 className="dash-list-title">
            Playlist de sugerencias
            <span className="dash-list-count">({filtered.length})</span>
          </h2>
          <SearchBar
            value={search}
            placeholder="Buscar por canción o persona..."
            onChange={setSearch}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="dash-empty-state">
            <Music size={40} className="dash-empty-icon" />
            <p className="dash-empty-text">
              {search ? "No hay resultados para tu búsqueda." : "Aún no hay canciones sugeridas."}
            </p>
          </div>
        ) : (
          <div className="dash-guest-list">
            {filtered.map((song) => (
              <div key={song.id} className="dash-song-card">
                <div className="dash-song-icon" aria-hidden="true">
                  <Music size={20} />
                </div>
                <div className="dash-song-info">
                  <span className="dash-song-title">{song.songTitle}</span>
                  <span className="dash-song-meta" suppressHydrationWarning>
                    Sugerida por <strong>{song.guestName}</strong> · {formatDate(song.createdAt)}
                  </span>
                </div>
                {song.link && (
                  <a
                    href={song.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dash-song-link-btn"
                    aria-label={`Escuchar ${song.songTitle}`}
                    title="Abrir enlace"
                  >
                    <ExternalLink size={16} />
                    <span>Escuchar</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

