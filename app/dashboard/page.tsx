import { Suspense } from "react";
import { getGuestConfirmations, getDashboardStats } from "@/app/actions/dashboardActions";
import { GuestsSection } from "@/app/components/dashboard/GuestsSection";

async function GuestsContent() {
  const [guests, stats] = await Promise.all([
    getGuestConfirmations(),
    getDashboardStats(),
  ]);

  return <GuestsSection guests={guests} stats={stats} />;
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="dash-empty-state">
          <p className="dash-empty-text">Cargando confirmaciones...</p>
        </div>
      }
    >
      <GuestsContent />
    </Suspense>
  );
}
