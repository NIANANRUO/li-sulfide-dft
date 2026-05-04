import { TheoryFigureOverview } from "@/components/CatalystDesignMap/TheoryFigureOverview";

export default function CatalystDesignMapPage() {
  return (
    <main className="min-h-screen bg-[#020814] p-4 text-slate-100">
      <div className="mx-auto h-[calc(100vh-2rem)] max-w-[1920px]">
        <TheoryFigureOverview />
      </div>
    </main>
  );
}

