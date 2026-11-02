"use client";

/**
 * Tarjeta de estadística del dashboard.
 * Responsabilidad única: mostrar una métrica clave con icono y valor.
 */

import type { ReactNode } from "react";

interface StatCardProps {
  readonly label: string;
  readonly value: number;
  readonly icon: ReactNode;
  readonly accent?: "primary" | "gold" | "olive";
}

export function StatCard({ label, value, icon, accent = "primary" }: StatCardProps) {
  return (
    <div className={`dash-stat-card dash-stat-card--${accent}`}>
      <div className="dash-stat-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="dash-stat-info">
        <span className="dash-stat-value">{value}</span>
        <span className="dash-stat-label">{label}</span>
      </div>
    </div>
  );
}

