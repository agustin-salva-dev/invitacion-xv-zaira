/**
 * Layout de la sección /dashboard.
 * Server Component: obtiene stats y datos de la DB, protege con PIN vía Client Component.
 */

import { Suspense, type ReactNode } from "react";
import { getDashboardStats } from "@/app/actions/dashboardActions";
import { DashboardLayoutClient } from "@/app/components/dashboard/DashboardLayoutClient";

interface DashboardLayoutProps {
  readonly children: ReactNode;
}

export const metadata = {
  title: "Panel de Control · Zaira XV",
  robots: "noindex, nofollow",
};

export const instant = false;

async function DashboardLayoutContent({ children }: { readonly children: ReactNode }) {
  const stats = await getDashboardStats();

  return (
    <DashboardLayoutClient
      totalGuests={stats.totalPersonas}
      totalSongs={stats.totalCanciones}
      expectedPin={process.env.DASHBOARD_PIN ?? "0809"}
    >
      {children}
    </DashboardLayoutClient>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Suspense fallback={<div className="pin-gate-backdrop" />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}

