"use client";

/**
 * Vista de Asistencias del Dashboard.
 * Muestra estadísticas y lista de titulares con sus acompañantes expandibles.
 */

import { useState, useMemo } from "react";
import { Users, UserCheck, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import { StatCard } from "@/app/components/dashboard/StatCard";
import { SearchBar } from "@/app/components/dashboard/SearchBar";
import type { GuestConfirmationView, DashboardStats } from "@/app/actions/dashboardActions";

interface GuestsSectionProps {
  readonly guests: readonly GuestConfirmationView[];
  readonly stats: DashboardStats;
}

interface GuestCardProps {
  readonly guest: GuestConfirmationView;
}

function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}

function GuestCard({ guest }: GuestCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasCompanions = guest.companions.length > 0;

  return (
    <div className="dash-guest-card">
      {/* Header de la tarjeta */}
      <button
        type="button"
        className="dash-guest-card-header"
        onClick={() => hasCompanions && setExpanded((prev) => !prev)}
        aria-expanded={hasCompanions ? expanded : undefined}
        style={{ cursor: hasCompanions ? "pointer" : "default" }}
      >
        <div className="dash-guest-card-info">
          <span className="dash-guest-name">
            {guest.firstName} {guest.lastName}
          </span>
          <span className="dash-guest-dni">DNI: {guest.dni}</span>
          <span className="dash-guest-date" suppressHydrationWarning>
            {formatDate(guest.createdAt)}
          </span>
        </div>

        <div className="dash-guest-card-right">
          <span
            className={`dash-companion-badge${guest.companionCount > 0 ? " has-companions" : ""}`}
          >
            {guest.companionCount > 0
              ? `+${guest.companionCount} acomp.`
              : "Solo"}
          </span>
          {hasCompanions && (
            <span className="dash-expand-icon" aria-hidden="true">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          )}
        </div>
      </button>

      {/* Acompañantes expandibles */}
      {hasCompanions && expanded && (
        <div className="dash-companions-list" role="list">
          {guest.companions.map((companion) => (
            <div key={companion.id} className="dash-companion-row" role="listitem">
              <span className="dash-companion-order">#{companion.order}</span>
              <span className="dash-companion-name">
                {companion.firstName} {companion.lastName}
              </span>
              <span className="dash-companion-dni">DNI: {companion.dni}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GuestsSection({ guests, stats }: GuestsSectionProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return guests;
    const term = search.toLowerCase().trim();
    return guests.filter(
      (g) =>
        g.firstName.toLowerCase().includes(term) ||
        g.lastName.toLowerCase().includes(term) ||
        g.dni.includes(term) ||
        g.companions.some(
          (c) =>
            c.firstName.toLowerCase().includes(term) ||
            c.lastName.toLowerCase().includes(term) ||
            c.dni.includes(term),
        ),
    );
  }, [guests, search]);

  return (
    <div className="dash-section">
      {/* Estadísticas */}
      <div className="dash-stats-grid">
        <StatCard
          label="Personas en total"
          value={stats.totalPersonas}
          icon={<Users size={22} />}
          accent="primary"
        />
        <StatCard
          label="Titulares"
          value={stats.totalTitulares}
          icon={<UserCheck size={22} />}
          accent="olive"
        />
        <StatCard
          label="Acompañantes"
          value={stats.totalAcompanantes}
          icon={<UserPlus size={22} />}
          accent="gold"
        />
      </div>

      {/* Buscador y lista */}
      <div className="dash-list-section">
        <div className="dash-list-toolbar">
          <h2 className="dash-list-title">
            Lista de confirmaciones
            <span className="dash-list-count">({filtered.length})</span>
          </h2>
          <SearchBar
            value={search}
            placeholder="Buscar por nombre o DNI..."
            onChange={setSearch}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="dash-empty-state">
            <Users size={40} className="dash-empty-icon" />
            <p className="dash-empty-text">
              {search ? "No hay resultados para tu búsqueda." : "Aún no hay asistencias confirmadas."}
            </p>
          </div>
        ) : (
          <div className="dash-guest-list">
            {filtered.map((guest) => (
              <GuestCard key={guest.id} guest={guest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

