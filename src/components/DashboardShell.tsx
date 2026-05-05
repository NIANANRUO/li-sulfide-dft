"use client";

import { Menu, Network, X } from "lucide-react";
import { useMemo, useState } from "react";
import { dashboardModules, DashboardModuleId } from "@/data/dashboardModules";
import { DashboardContent } from "./dashboard/DashboardContent";

export function DashboardShell({ initialModule = "home", initialTabIndex }: { initialModule?: DashboardModuleId; initialTabIndex?: number }) {
  const initialDashboardModule = dashboardModules.find((item) => item.id === initialModule) ?? dashboardModules[0];
  const [activeModule, setActiveModule] = useState<DashboardModuleId>(initialDashboardModule.id);
  const initialTab = initialTabIndex === undefined ? initialDashboardModule.tabs[0] : initialDashboardModule.tabs[initialTabIndex] ?? initialDashboardModule.tabs[0];
  const [activeTab, setActiveTab] = useState<Record<string, string>>({ home: "总览" });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const module = useMemo(() => dashboardModules.find((item) => item.id === activeModule) ?? dashboardModules[0], [activeModule]);
  const currentTab = activeTab[activeModule] ?? (activeModule === initialDashboardModule.id ? initialTab : module.tabs[0]);
  const showTabs = activeModule !== "home" && activeModule !== "catalyst-design-map" && activeModule !== "projects";

  function selectModule(id: DashboardModuleId) {
    setActiveModule(id);
    setActiveTab((prev) => ({ ...prev, [id]: prev[id] ?? (dashboardModules.find((item) => item.id === id)?.tabs[0] ?? "") }));
    setMobileNavOpen(false);
  }

  function selectTab(tab: string) {
    setActiveTab((prev) => ({ ...prev, [activeModule]: tab }));
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020814] text-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.22),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(126,34,206,.18),transparent_28rem),linear-gradient(135deg,#020814_0%,#061226_48%,#020617_100%)]" />
      <div className="fixed inset-0 science-grid opacity-45" />
      <div className="relative flex min-h-screen flex-col">
        <TopCommandBar onMenu={() => setMobileNavOpen((value) => !value)} mobileNavOpen={mobileNavOpen} />
        <div className="flex flex-1">
          <SideNavigation active={activeModule} onSelect={selectModule} mobileOpen={mobileNavOpen} />
        {mobileNavOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setMobileNavOpen(false)} />}
          <main className="flex min-w-0 flex-1 flex-col">
          {showTabs && <SubTabBar tabs={module.tabs} active={currentTab} onSelect={selectTab} />}
          <section className="flex flex-1 p-3 md:p-4">
            <div className="min-h-[calc(100dvh-8rem)] w-full overflow-hidden rounded-xl border border-[#1f5b9d]/60 bg-[#061226]/65 shadow-[0_0_0_1px_rgba(56,189,248,.08),0_22px_80px_rgba(0,0,0,.38)] backdrop-blur-xl">
              <div key={`${activeModule}-${currentTab}`} className="h-full overflow-y-auto p-4 dft-scrollbar md:p-5">
                <DashboardContent moduleId={activeModule} tab={currentTab} onSelectModule={selectModule} onSelectTab={selectTab} />
              </div>
            </div>
          </section>
        </main>
        </div>
      </div>
    </div>
  );
}

function TopCommandBar({ onMenu, mobileNavOpen }: { onMenu: () => void; mobileNavOpen: boolean }) {
  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-[#1f5b9d]/60 bg-[#030915]/86 px-3 py-3 backdrop-blur-xl md:px-4">
      <div className="mx-auto grid max-w-[1900px] grid-cols-[auto_1fr] items-center gap-3 md:gap-4">
        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#2b6cb0]/70 bg-[#07162c] text-slate-200 lg:hidden" onClick={onMenu}>
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="hidden h-16 w-16 place-items-center rounded-2xl border border-blue-400/40 bg-blue-500/10 shadow-[0_0_35px_rgba(59,130,246,.35)] lg:grid">
            <Network className="text-blue-300" size={34} />
          </div>
        </div>
        <div className="min-w-0 text-center">
          <h1 className="truncate text-2xl font-black tracking-wide text-white md:text-4xl">DFT 指导下的锂硫电池催化剂筛选与机制研究</h1>
          <p className="mt-2 truncate text-sm font-medium text-slate-300 md:text-base">融合第一性原理计算、材料设计与电化学实验，揭示催化剂对多硫化物吸附与转化行为的调控机制</p>
        </div>
      </div>
    </header>
  );
}

function SideNavigation({
  active,
  onSelect,
  mobileOpen
}: {
  active: DashboardModuleId;
  onSelect: (id: DashboardModuleId) => void;
  mobileOpen: boolean;
}) {
  return (
    <aside
      className={`fixed bottom-0 top-[76px] z-40 flex w-64 overflow-y-auto border-r border-[#1f5b9d]/55 bg-[#041025]/95 px-4 py-6 backdrop-blur-xl transition-transform dft-scrollbar lg:sticky lg:top-[89px] lg:h-[calc(100dvh-89px)] lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="my-auto grid w-full gap-4">
        {dashboardModules.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`relative flex min-h-14 items-center gap-4 rounded-xl px-4 py-3.5 text-left transition ${
                isActive
                  ? "border border-blue-400/70 bg-gradient-to-r from-blue-600/55 to-cyan-500/20 text-white shadow-[0_0_24px_rgba(59,130,246,.38)]"
                  : "border border-transparent text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
              }`}
            >
              <Icon size={24} className="shrink-0" />
              <span className="text-lg font-medium leading-6">{item.shortTitle}</span>
              {isActive && <span className="absolute -right-1 h-7 w-1.5 rounded-l bg-cyan" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function SubTabBar({ tabs, active, onSelect }: { tabs: string[]; active: string; onSelect: (tab: string) => void }) {
  return (
    <div className="shrink-0 border-b border-[#1f5b9d]/55 bg-[#030915]/72 px-4 py-4">
      <div className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto rounded-xl border border-[#2b4d79] bg-[#081327]/95 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            className={`whitespace-nowrap rounded-lg px-5 py-3 text-sm transition ${
              active === tab
                ? "bg-gradient-to-b from-blue-600/70 to-blue-500/35 text-white shadow-[inset_0_-2px_0_#38bdf8,0_0_22px_rgba(59,130,246,.32)]"
                : "text-slate-300 hover:bg-blue-500/10 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
