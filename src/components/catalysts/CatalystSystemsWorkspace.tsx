"use client";

import { ArrowRight, BrainCircuit, CheckCircle2, FlaskConical, Layers3, Radar as RadarIcon, Zap } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import {
  catalystComparisonRows,
  catalystDesignPrinciples,
  catalystExperimentDFTMap,
  catalystRadarData,
  catalystSelectionGuide,
  catalystSystems,
  catalystSystemTabs
} from "@/data/catalystSystemsData";
import { catalystModelBySystemId } from "@/data/catalystModelsData";
import { CatalystModelViewer } from "@/components/catalysts/CatalystModelViewer";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import { PanelHeader } from "@/components/dashboard/DashboardPrimitives";

type CatalystSystem = (typeof catalystSystems)[number];

export function CatalystSystemsWorkspace({
  tab,
  onSelectTab
}: {
  tab: string;
  onSelectTab?: (tab: string) => void;
}) {
  const activeTab = catalystSystemTabs.find((item) => item.label === tab) ?? catalystSystemTabs[0];

  if (activeTab.id === "design-principles") return <DesignPrinciplesPanel />;
  if (activeTab.id === "overview") return <CatalystSystemOverviewGrid onSelectTab={onSelectTab} />;
  if (activeTab.id === "comparison-guide") return <CatalystSystemComparisonMatrix />;

  const system = catalystSystems.find((item) => item.id === activeTab.id) ?? catalystSystems[0];
  return <CatalystDetailPanel system={system} onSelectTab={onSelectTab} />;
}

function DesignPrinciplesPanel() {
  return (
    <div className="grid h-full min-h-[760px] gap-4 2xl:grid-cols-[1.12fr_.88fr]">
      <div className="min-w-0 space-y-4">
        <PanelHeader
          title="锂硫电池催化剂应该如何设计？"
          desc="催化剂不是导电碳宿主的同义词。它需要在 LiPS 固定、反应能垒降低、Li2S 成核/分解、界面电荷转移和实际电极工况之间取得平衡。"
        />
        <div className="grid gap-3 lg:grid-cols-2">
          {catalystDesignPrinciples.map((item, index) => (
            <GlassCard key={item.id} className="border-blue-500/30 bg-[#07162c]/86">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan/35 bg-cyan/10 text-sm font-bold text-cyan">{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.relatedDFT.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <p className="mt-4 rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-100">{item.caution}</p>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="min-w-0 space-y-4">
        <CatalystDesignPrincipleRadar />
        <GlassCard className="border-amber-400/35 bg-amber-400/10">
          <div className="flex items-center gap-2 text-amber-100">
            <CheckCircle2 size={18} />
            <h3 className="font-semibold">严谨提示</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-amber-50">
            催化剂活性不能只由吸附能判断。吸附能、自由能、NEB 能垒、电子结构、实验动力学测试和长期循环稳定性需要综合分析。DFT 可用于分析原子尺度吸附、电子结构和反应路径，但不能直接替代实际复杂电解液、电极孔结构和电芯工程条件。
          </p>
        </GlassCard>
        <MechanismBridge />
      </div>
    </div>
  );
}

export function CatalystDesignPrincipleRadar() {
  return (
    <GlassCard className="min-h-[420px] border-cyan/25 bg-[#07162c]/92">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">CatalystDesignPrincipleRadar</h3>
          <p className="mt-1 text-sm text-slate-400">不同体系的相对特点，用于研究策略选择，不代表绝对性能排序。</p>
        </div>
        <RadarIcon className="text-cyan" />
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={catalystRadarData}>
            <PolarGrid stroke="rgba(148,163,184,.22)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)", color: "#e2e8f0" }} />
            <Radar name="SACs" dataKey="SACs" stroke="#38d7ff" fill="#38d7ff" fillOpacity={0.16} />
            <Radar name="异质结" dataKey="异质结" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.12} />
            <Radar name="MXene" dataKey="MXene" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function CatalystSystemOverviewGrid({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  return (
    <div className="space-y-4">
      <PanelHeader
        title="锂硫电池催化剂体系全景图"
        desc="这些卡片是研究策略和模型入口，而不是彼此绝对独立的材料类别。点击卡片可切换到对应二级标签。"
      />
      <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-3">
        {catalystSystems.map((system) => {
          const tab = catalystSystemTabs.find((item) => item.id === system.id);
          return (
            <button
              key={system.id}
              onClick={() => tab && onSelectTab?.(tab.label)}
              className="group h-full rounded-lg border border-[#31547f] bg-[#07162c]/86 p-4 text-left transition hover:border-cyan/70 hover:bg-blue-500/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.12em] text-cyan">{system.abbreviation}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{system.name}</h3>
                </div>
                <ArrowRight className="mt-1 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan" size={18} />
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{system.summary}</p>
              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-300">
                <MiniLine label="核心作用" value={system.mechanisms.slice(0, 2).join(" / ")} />
                <MiniLine label="代表模型" value={system.recommendedDFTModels.slice(0, 2).join(" / ")} />
                <MiniLine label="优势" value={system.advantages[0]} />
                <MiniLine label="局限" value={system.limitations[0]} />
                <MiniLine label="表征" value={system.recommendedCharacterization.slice(0, 3).join(" / ")} />
                <MiniLine label="DFT" value={system.recommendedDFTAnalysis.slice(0, 3).join(" / ")} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CatalystDetailPanel({
  system,
  onSelectTab
}: {
  system: CatalystSystem;
  onSelectTab?: (tab: string) => void;
}) {
  const model = catalystModelBySystemId[system.id] ?? catalystModelBySystemId["lips-adsorption"];
  return (
    <div className="grid h-full min-h-[780px] gap-4 2xl:grid-cols-[17rem_1fr_24rem]">
      <SystemSelector activeId={system.id} onSelectTab={onSelectTab} />
      <div className="min-w-0 space-y-4">
        <PanelHeader title={system.name.includes("MXene") ? "MXene 催化/宿主材料：二维导电骨架与表面终止基调控" : catalystSystemTabs.find((item) => item.id === system.id)?.title ?? system.name} desc={system.summary} />
        <div className="grid gap-4">
          <CatalystModelViewer model={model} />
          <GlassCard className="border-cyan/25 bg-[#07162c]/92">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white"><Zap size={18} className="text-cyan" />核心作用机制</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {system.mechanisms.map((item) => (
                <div key={item} className="rounded-lg border border-slate-700/70 bg-slate-950/30 px-3 py-2 text-sm leading-6 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-blue-400/25 bg-blue-500/10 p-3 text-sm leading-7 text-blue-50">
              机制表达应同时覆盖吸附、催化、导电、界面调控和结构约束。不要把催化剂作用简化为“吸附多硫化物”。
            </div>
          </GlassCard>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <GlassCard>
            <h3 className="mb-3 text-lg font-semibold text-white">核心科学问题</h3>
            <InfoList items={system.coreQuestions} />
          </GlassCard>
          <GlassCard>
            <h3 className="mb-3 text-lg font-semibold text-white">优势 / 局限 / 常见误区</h3>
            <div className="grid gap-3 text-sm leading-6 lg:grid-cols-2">
              <InfoBlock title="优势" items={system.advantages} />
              <InfoBlock title="局限" items={system.limitations} />
            </div>
            <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm leading-7 text-amber-50">{system.caution}</p>
          </GlassCard>
        </div>
      </div>
      <RightEvidencePanel system={system} onSelectTab={onSelectTab} />
    </div>
  );
}

function SystemSelector({ activeId, onSelectTab }: { activeId: string; onSelectTab?: (tab: string) => void }) {
  return (
    <GlassCard className="h-full overflow-hidden border-blue-500/35 bg-[#061327]/92 p-3">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">体系选择器</p>
      <div className="grid max-h-[700px] gap-1.5 overflow-y-auto pr-1">
        {catalystSystems.map((system) => {
          const tab = catalystSystemTabs.find((item) => item.id === system.id);
          const active = system.id === activeId;
          return (
            <button
              key={system.id}
              onClick={() => tab && onSelectTab?.(tab.label)}
              className={`rounded-lg border px-3 py-2.5 text-left transition ${active ? "border-cyan/70 bg-cyan/12 text-white" : "border-transparent text-slate-300 hover:border-blue-500/35 hover:bg-blue-500/10"}`}
            >
              <span className="block text-sm font-semibold">{system.name}</span>
              <span className="mt-1 block text-xs text-slate-500">{system.abbreviation}</span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}

function RightEvidencePanel({ system, onSelectTab }: { system: CatalystSystem; onSelectTab?: (tab: string) => void }) {
  return (
    <div className="min-w-0 space-y-4">
      <GlassCard className="border-blue-500/35 bg-[#07162c]/92">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white"><FlaskConical size={18} className="text-cyan" />推荐表征</h3>
        <div className="flex flex-wrap gap-2">
          {system.recommendedCharacterization.map((item) => <Tag key={item}>{item}</Tag>)}
        </div>
      </GlassCard>
      <GlassCard className="border-blue-500/35 bg-[#07162c]/92">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white"><Layers3 size={18} className="text-cyan" />推荐 DFT 模型</h3>
        <InfoList items={system.recommendedDFTModels} />
        <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-200">推荐 DFT 分析</h4>
        <InfoList items={system.recommendedDFTAnalysis.slice(0, 6)} />
      </GlassCard>
      <GlassCard className="border-emerald-400/30 bg-emerald-400/10">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white"><BrainCircuit size={18} className="text-emerald-300" />适用研究问题</h3>
        <InfoList items={system.applicableQuestions} />
      </GlassCard>
      <GlassCard className="border-cyan/25 bg-[#07162c]/88">
        <h3 className="mb-3 text-lg font-semibold text-white">后续模块入口</h3>
        <div className="grid gap-2">
          {["实验表征", "DFT 计算"].map((item) => (
            <button key={item} onClick={() => undefined} className="flex items-center justify-between rounded-lg border border-blue-500/35 bg-blue-500/10 px-3 py-2 text-left text-sm text-slate-200">
              {item}证据链
              <ArrowRight size={16} className="text-cyan" />
            </button>
          ))}
          <button onClick={() => onSelectTab?.("体系对比与选择指南")} className="flex items-center justify-between rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-2 text-left text-sm text-cyan">
            体系对比与选择指南
            <ArrowRight size={16} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

export function CatalystSystemComparisonMatrix() {
  return (
    <div className="space-y-4">
      <PanelHeader title="如何根据研究目标选择催化剂体系？" desc="矩阵把吸附、催化、导电、结构明确性、表征难度和 DFT 建模难度放在同一个视野里，避免把某一种体系写成万能方案。" />
      <GlassCard className="overflow-hidden p-0">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-[#081327] text-slate-200">
              <tr>
                {["体系", "LiPS 吸附", "催化转化", "导电性", "结构明确性", "表征难度", "DFT 难度", "工况适配", "常见风险"].map((head) => (
                  <th key={head} className="border-b border-slate-700/70 px-4 py-3 font-semibold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {catalystComparisonRows.map((row) => (
                <tr key={row.system} className="border-b border-slate-800/80 text-slate-300">
                  <td className="px-4 py-3 font-semibold text-white">{row.system}</td>
                  <td className="px-4 py-3">{row.adsorption}</td>
                  <td className="px-4 py-3">{row.catalysis}</td>
                  <td className="px-4 py-3">{row.conductivity}</td>
                  <td className="px-4 py-3">{row.clarity}</td>
                  <td className="px-4 py-3">{row.charDifficulty}</td>
                  <td className="px-4 py-3">{row.dftDifficulty}</td>
                  <td className="px-4 py-3">{row.compatibility}</td>
                  <td className="px-4 py-3 text-amber-100">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      <div className="grid gap-4 2xl:grid-cols-[1fr_.9fr]">
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">优势、局限与适合研究</h3>
          <div className="grid max-h-[360px] gap-3 overflow-y-auto pr-1 xl:grid-cols-2">
            {catalystComparisonRows.map((row) => (
              <div key={row.system} className="rounded-lg border border-blue-500/25 bg-blue-500/8 p-3">
                <p className="font-semibold text-white">{row.system}</p>
                <MiniLine label="优势" value={row.advantage} />
                <MiniLine label="局限" value={row.limitation} />
                <MiniLine label="适合研究" value={row.suitable} />
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">选择建议</h3>
          <div className="grid gap-3">
            {catalystSelectionGuide.map((item) => (
              <div key={item.researchGoal} className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
                <p className="font-semibold text-cyan">{item.researchGoal}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.recommendedSystems.join(" / ")}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <ExperimentDFTBridge />
    </div>
  );
}

function ExperimentDFTBridge() {
  return (
    <GlassCard>
      <h3 className="mb-3 text-lg font-semibold text-white">实验-DFT 对应入口</h3>
      <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {catalystExperimentDFTMap.map((item) => (
          <div key={item.system} className="rounded-lg border border-cyan/20 bg-cyan/8 p-3">
            <p className="font-semibold text-white">{item.system}</p>
            <MiniLine label="实验" value={item.keyExperiment} />
            <MiniLine label="模型" value={item.dftModel} />
            <p className="mt-2 text-xs leading-5 text-slate-400">{item.interpretation}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function MechanismBridge() {
  return (
    <GlassCard className="border-blue-500/35 bg-[#07162c]/88">
      <h3 className="mb-3 text-lg font-semibold text-white">承接前两部分的机制链</h3>
      <div className="grid gap-3">
        {[
          ["锂硫基础", "S8 -> Li2S 的多硫化物转化过程"],
          ["关键问题", "穿梭效应、动力学缓慢、低导电性、体积变化和锂负极不稳定"],
          ["催化剂体系", "通过吸附、催化、导电、界面调控和结构约束缓解问题"]
        ].map(([title, desc], index) => (
          <div key={title} className="flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan/35 text-cyan">{index + 1}</span>
            <div>
              <p className="font-semibold text-white">{title}</p>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 font-semibold text-cyan">{title}</p>
      <InfoList items={items} />
    </div>
  );
}

function MiniLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-2 text-xs leading-5 text-slate-400">
      <span className="mr-2 text-slate-200">{label}</span>{value}
    </p>
  );
}
