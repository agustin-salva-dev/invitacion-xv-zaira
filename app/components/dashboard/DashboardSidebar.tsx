"use client";

/**
 * Sidebar de navegación del Dashboard.
 * En desktop: lateral fijo con opción de colapsar a mini-sidebar.
 * En móvil: fullscreen overlay con animación de deslizamiento fluida.
 * Responsabilidad única: navegación y estructura visual del dashboard.
 */

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Music, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface DashboardSidebarProps {
  readonly isOpen: boolean;
  readonly isCollapsed: boolean;
  readonly totalGuests: number;
  readonly totalSongs: number;
  readonly onClose: () => void;
  readonly onToggleCollapse: () => void;
}

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly count: number;
}

export function DashboardSidebar({
  isOpen,
  isCollapsed,
  totalGuests,
  totalSongs,
  onClose,
  onToggleCollapse,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const navItems: readonly NavItem[] = [
    {
      href: "/dashboard",
      label: "Asistencias",
      icon: <Users size={20} />,
      count: totalGuests,
    },
    {
      href: "/dashboard/songs",
      label: "Canciones",
      icon: <Music size={20} />,
      count: totalSongs,
    },
  ];

  const handleNavClick = useCallback(() => {
    // En móvil, cerrar el sidebar al navegar
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Overlay de fondo para móvil */}
      {isOpen && (
        <div
          className="dashboard-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar principal */}
      <aside
        className={`dashboard-sidebar${isOpen ? " is-open" : ""}${isCollapsed ? " is-collapsed" : ""}`}
        aria-label="Menú de navegación del panel"
      >
        {/* Header del sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">Zaira</span>
            {!isCollapsed && (
              <span className="sidebar-brand-subtitle">Panel de Control</span>
            )}
          </div>

          {/* Botón cerrar en móvil */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>

          {/* Botón colapsar en desktop */}
          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navegación principal */}
        <nav className="sidebar-nav" aria-label="Secciones del dashboard">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/dashboard/guests"
                  : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`sidebar-nav-item${isActive ? " is-active" : ""}`}
                    onClick={handleNavClick}
                    title={isCollapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="sidebar-nav-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="sidebar-nav-label">{item.label}</span>
                    )}
                    {item.count > 0 && (
                      <span
                        className="sidebar-nav-badge"
                        aria-label={`${item.count} registros`}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer del sidebar: Link a la invitación pública */}
        <div className="sidebar-footer">
          <Link
            href="/"
            className="sidebar-back-link"
            title="Ver invitación pública"
          >
            <ExternalLink size={16} />
            {!isCollapsed && <span>Ver invitación</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}

