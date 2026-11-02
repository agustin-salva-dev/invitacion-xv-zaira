import { Suspense } from "react";
import { getSongSuggestions, getDashboardStats } from "@/app/actions/dashboardActions";
import { SongsSection } from "@/app/components/dashboard/SongsSection";

async function SongsContent() {
  const [songs, stats] = await Promise.all([
    getSongSuggestions(),
    getDashboardStats(),
  ]);

  return <SongsSection songs={songs} stats={stats} />;
}

export default function SongsPage() {
  return (
    <Suspense fallback={<div className="dash-empty-state"><p className="dash-empty-text">Cargando sugerencias...</p></div>}>
      <SongsContent />
    </Suspense>
  );
}

