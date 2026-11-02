"use client";

/**
 * Cliente de control para el sidebar del Dashboard.
 * Gestiona el estado de apertura y colapso del sidebar.
 * Responsabilidad única: orquestar la interacción entre sidebar y contenido.
 */

import { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "@/app/components/dashboard/DashboardSidebar";

interface DashboardShellProps {
  readonly children: React.ReactNode;
  readonly totalGuests: number;
  readonly totalSongs: number;
}

export function DashboardShell({ children, totalGuests, totalSongs }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleCollapse = useCallback(() => setCollapsed((prev) => !prev), []);

  return (
    <div className={`dashboard-shell${collapsed ? " sidebar-collapsed" : ""}`}>
      <DashboardSidebar
        isOpen={sidebarOpen}
        isCollapsed={collapsed}
        totalGuests={totalGuests}
        totalSongs={totalSongs}
        onClose={closeSidebar}
        onToggleCollapse={toggleCollapse}
      />

      <div className="dashboard-main">
        {/* Topbar móvil */}
        <header className="dashboard-topbar">
          <button
            type="button"
            className="dashboard-menu-btn"
            onClick={openSidebar}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <span className="dashboard-topbar-title">Panel de Control</span>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

