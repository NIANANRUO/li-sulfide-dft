"use client";

import { AlertTriangle, Beaker, BrainCircuit, Microscope, Sparkles } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { CatalystDirection } from "@/data/catalystDirections";
import { theoryFigureMap } from "./TheoryFigureMap";

const tabs = ["方向概述", "理论图片解读", "实验验证", "DFT 路线", "风险点"] as const;

export function CatalystDirectionDetail({ direction }: { direction: CatalystDirection }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("方向概述");
  const Figure = theoryFigureMap[direction.figureType];

  return (
    <aside className="flex h-full min-h-0 flex-col rounded-xl border border-cyan/35 bg-[#041124]/86 shadow-[0_0_42px_rgba(56,189,248,.18)] backdrop-blur-xl">
      <div className="border-b border-cyan/20 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-amber-300/45 bg-amber-300/10 px-3 py-1 text-sm font-black text-amber-200">{direction.priority}</span>
          <span className="rounded-full border border-blue-300/35 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-100">{direction.category}</span>
          <span className="rounded-full border border-violet-300/35 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-100">{direction.difficulty}</span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-white">{direction.shortTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{direction.tagline}</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 dft-scrollbar">
        <div key={direction.id} className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-cyan/30 bg-slate-950/70 p-2">
            <Figure />
          </div>
          <div>
            <h3 className="text-lg font-black text-cyan">{direction.theoryFigureTitle}</h3>
            <p className="mt-2 rounded-lg border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">{direction.theoryFigureCaption}</p>
          </div>
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-[#24517b] bg-[#08162c] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${
                  activeTab === tab ? "bg-cyan/20 text-cyan shadow-[inset_0_-2px_0_#38d7ff]" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <TabContent direction={direction} activeTab={activeTab} />
        </div>
      </div>
    </aside>
  );
}

function TabContent({ direction, activeTab }: { direction: CatalystDirection; activeTab: (typeof tabs)[number] }) {
  if (activeTab === "理论图片解读") {
    return (
      <DetailBlock icon={<BrainCircuit size={17} />} title="机理图解读">
        <p className="text-sm leading-7 text-slate-300">{direction.theoryExplanation}</p>
        <ChipRow title="视觉重点" items={direction.visualFocus} />
      </DetailBlock>
    );
  }
  if (activeTab === "实验验证") {
    return <DetailBlock icon={<Microscope size={17} />} title="实验验证路线"><NumberedList items={direction.experimentRoute} /></DetailBlock>;
  }
  if (activeTab === "DFT 路线") {
    return <DetailBlock icon={<Beaker size={17} />} title="DFT 理论路线"><NumberedList items={direction.dftRoute} /></DetailBlock>;
  }
  if (activeTab === "风险点") {
    return <DetailBlock icon={<AlertTriangle size={17} />} title="关键风险"><NumberedList items={direction.risks} tone="warn" /></DetailBlock>;
  }
  return (
    <div className="space-y-3">
      <DetailBlock icon={<Sparkles size={17} />} title="核心科学问题">
        <p className="text-sm leading-7 text-slate-300">{direction.coreQuestion}</p>
      </DetailBlock>
      <ChipRow title="代表材料体系" items={direction.systems} />
      <ChipRow title="创新点" items={direction.innovations} />
    </div>
  );
}

function DetailBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-cyan/20 bg-white/[0.035] p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-cyan">
        {icon}
        {title}
      </h4>
      {children}
    </section>
  );
}

function ChipRow({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-blue-400/20 bg-blue-500/[0.045] p-4">
      <h4 className="mb-3 text-sm font-black text-blue-100">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-lg border border-cyan/25 bg-cyan/10 px-2.5 py-1.5 text-xs leading-5 text-slate-100">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function NumberedList({ items, tone = "normal" }: { items: string[]; tone?: "normal" | "warn" }) {
  return (
    <ol className="space-y-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black ${tone === "warn" ? "bg-amber-300/15 text-amber-200" : "bg-cyan/15 text-cyan"}`}>{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
