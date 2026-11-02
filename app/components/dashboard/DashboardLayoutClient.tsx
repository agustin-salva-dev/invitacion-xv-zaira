"use client";

/**
 * Wrapper cliente del Layout del Dashboard.
 * Gestiona el acceso por PIN con persistencia de sesión en sessionStorage
 * y sincronización con useSyncExternalStore sin cascading renders ni hydration mismatches.
 */

import { useState, useCallback, useSyncExternalStore } from "react";
import { PinGate } from "@/app/components/dashboard/PinGate";
import { DashboardShell } from "@/app/components/dashboard/DashboardShell";

interface DashboardLayoutClientProps {
  readonly children: React.ReactNode;
  readonly totalGuests: number;
  readonly totalSongs: number;
  readonly expectedPin: string;
}

function subscribe() {
  return () => {};
}

export function DashboardLayoutClient({
  children,
  totalGuests,
  totalSongs,
  expectedPin,
}: DashboardLayoutClientProps) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const [localAuth, setLocalAuth] = useState(false);

  const isSessionAuth = isClient
    ? typeof window !== "undefined" && window.sessionStorage.getItem("dash_auth") === "true"
    : false;

  const authenticated = localAuth || isSessionAuth;

  const handlePinSuccess = useCallback(() => {
    try {
      window.sessionStorage.setItem("dash_auth", "true");
    } catch {
      // Ignorar si sessionStorage está bloqueado
    }
    setLocalAuth(true);
  }, []);

  if (!isClient || !authenticated) {
    return <PinGate expectedPin={expectedPin} onSuccess={handlePinSuccess} />;
  }

  return (
    <DashboardShell totalGuests={totalGuests} totalSongs={totalSongs}>
      {children}
    </DashboardShell>
  );
}
