"use client";

import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, CircleDot, Pause, Play, RotateCcw, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  batteryComponents,
  chargeDischargeCurve,
  fundamentalsGlossary,
  fundamentalsScientificChecks,
  fundamentalsTabs,
  nextModuleEntrances,
  polysulfideSpecies,
  practicalEnergyFactors,
  reactionMechanism,
  researchLinkLogic,
  shuttleAnimationModes,
  theoreticalAdvantages
} from "@/data/fundamentalsData";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import { ResearchDemoFrame, ResearchDemoLabel, ResearchDemoNode, ResearchDemoPanel } from "@/components/ResearchDemoFrame";

type Props = {
  tab: string;
};

export function FundamentalsWorkspace({ tab }: Props) {
  const active = fundamentalsTabs.find((item) => item.label === tab) ?? fundamentalsTabs[0];

  if (active.id === "components") return <BatteryComponentsPanel active={active} />;
  if (active.id === "advantages") return <AdvantagesPanel active={active} />;
  if (active.id === "mechanism") return <MechanismPanel active={active} />;
  if (active.id === "gcd-curve") return <ChargeDischargeCurvePanel active={active} />;
  if (active.id === "polysulfide-conversion") return <PolysulfideConversionPanel active={active} />;
  if (active.id === "shuttle-animation") return <ShuttlePanel active={active} />;
  return <ResearchLinkPanel active={active} />;
}

function WorkspaceFrame({
  active,
  visual,
  explanation,
  footer
}: {
  active: (typeof fundamentalsTabs)[number];
  visual: React.ReactNode;
  explanation: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="grid items-start gap-3 2xl:grid-cols-[1.15fr_.85fr]">
        <GlassCard className="min-h-[24rem] border-blue-500/45 bg-[#07172c]/85">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-cyan">{active.label}</p>
              <h2 className="mt-1 text-2xl font-bold text-white">{active.title}</h2>
            </div>
            <Tag>锂硫基础</Tag>
          </div>
          <ResearchDemoFrame title={active.title} minHeight="20rem" className="p-0">
            {visual}
          </ResearchDemoFrame>
        </GlassCard>
        <GlassCard className="min-h-[24rem] border-slate-600/70 bg-[#081327]/88">
          <p className="mb-3 text-sm leading-6 text-slate-300">{active.description}</p>
          {explanation}
        </GlassCard>
      </div>
      {footer}
    </div>
  );
}

function BatteryComponentsPanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  const [selected, setSelected] = useState(batteryComponents[0].id);
  const item = batteryComponents.find((entry) => entry.id === selected) ?? batteryComponents[0];

  return (
    <WorkspaceFrame
      active={active}
      visual={<BatteryStructureDiagram selected={selected} onSelect={setSelected} />}
      explanation={
        <div className="space-y-3">
          <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
            <p className="text-xs text-cyan">当前组成</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.shortName} · {item.role}</p>
          </div>
          <InfoList items={[item.description, item.keyIssue, `图示提示：${item.visualHint}`]} />
          <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            科学严谨提示：Li+ 通过电解液/隔膜迁移，电子通过外电路和电极导电网络传输，不应把电子画成直接穿过电解液。
          </div>
        </div>
      }
      footer={
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {batteryComponents.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelected(entry.id)}
              className={`rounded-xl border p-3 text-left transition ${
                selected === entry.id ? "border-cyan bg-cyan/15 shadow-[0_0_24px_rgba(56,189,248,.24)]" : "border-slate-700 bg-slate-950/50 hover:border-cyan/40"
              }`}
            >
              <p className="font-semibold text-white">{entry.name}</p>
              <p className="mt-1 text-xs text-slate-400">{entry.role}</p>
            </button>
          ))}
        </div>
      }
    />
  );
}

function BatteryStructureDiagram({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const hot = (id: string) => selected === id;
  return (
    <div className="relative h-[20rem] overflow-hidden">
      <ResearchDemoPanel className="absolute left-8 top-12 grid h-48 w-24 place-items-center border-slate-300/45 bg-slate-100/10 text-center text-xs font-bold text-slate-100">
        <button onClick={() => onSelect("lithium-anode")} className="h-full w-full">锂金属负极</button>
      </ResearchDemoPanel>
      <div className={`absolute left-[38%] top-12 h-48 w-10 rounded border ${hot("separator") ? "border-cyan bg-cyan/25" : "border-blue-300/40 bg-blue-300/10"}`}>
        <button onClick={() => onSelect("separator")} className="h-full w-full text-[10px] text-blue-100 [writing-mode:vertical-rl]">隔膜</button>
      </div>
      <div className={`absolute left-36 right-36 top-12 h-48 rounded-xl border ${hot("electrolyte") ? "border-cyan bg-cyan/15" : "border-blue-500/25 bg-blue-500/[0.08]"}`}>
        <button onClick={() => onSelect("electrolyte")} className="h-full w-full text-sm text-slate-300">电解液 / Li+ 传输</button>
      </div>
      <ResearchDemoPanel className="absolute right-8 top-12 grid h-48 w-28 place-items-center border-yellow-300/45 bg-yellow-300/10 text-center text-xs font-bold text-amber-100">
        <button onClick={() => onSelect("sulfur-cathode")} className="h-full w-full">硫正极</button>
      </ResearchDemoPanel>
      <button
        onClick={() => onSelect("conductive-host")}
        className={`absolute right-14 top-24 h-20 w-16 rounded border ${hot("conductive-host") ? "border-cyan bg-cyan/25" : "border-slate-900/40 bg-slate-900/40"} text-[10px] text-slate-100`}
      >
        导电骨架
      </button>
      <button
        onClick={() => onSelect("catalyst-host")}
        className={`demo-pulse absolute right-28 top-28 grid h-14 w-14 place-items-center rounded-full border ${hot("catalyst-host") ? "border-cyan bg-cyan/30" : "border-cyan/40 bg-cyan/15"} text-[10px] text-cyan`}
      >
        催化位点
      </button>
      <div className="absolute left-14 right-14 top-7 flex items-center justify-between text-xs text-yellow-100">
        <span>e− 外电路</span>
        <span>e−</span>
      </div>
      <div className="absolute left-20 right-20 top-10 h-px bg-yellow-200/70" />
      <ArrowRight className="absolute right-20 top-6 text-yellow-200" size={18} />
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute top-[45%] h-3 w-3 rounded-full bg-blue-300"
          initial={{ left: "24%" }}
          animate={{ left: ["24%", "62%"] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute rounded-full bg-purple-400/90 px-2 py-1 text-[10px] text-white"
          initial={{ right: 122, top: 124 + i * 32 }}
          animate={{ right: [122, 220, 310], opacity: [1, 0.85, 0.38] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
        >
          Li2Sx
        </motion.span>
      ))}
      <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
        <ResearchDemoLabel tone="blue">Li+ 电解液迁移</ResearchDemoLabel>
        <ResearchDemoLabel tone="amber">e- 外电路/导电网络</ResearchDemoLabel>
      </div>
    </div>
  );
}

function AdvantagesPanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {theoreticalAdvantages.map((item) => (
              <div key={item.id} className="rounded-xl border border-blue-500/35 bg-blue-500/10 p-3">
                <p className="text-sm text-cyan">{item.label}</p>
                <p className="mt-1 text-xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-300">{item.explanation}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">
            <p className="mb-2 font-semibold text-white">实际电芯指标影响因素</p>
            <div className="grid gap-2">
              {practicalEnergyFactors.map((item) => (
                <div key={item.factor} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
                  <span className="text-slate-300">{item.factor}</span>
                  <span className="h-2 overflow-hidden rounded bg-slate-800">
                    <span className="block h-full rounded bg-gradient-to-r from-blue-500 to-cyan" style={{ width: `${item.score}%` }} />
                  </span>
                  <span className="text-right text-cyan">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      explanation={
        <div className="space-y-3">
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-3">
            <p className="font-semibold text-amber-100">严谨提示</p>
            <p className="mt-2 text-sm leading-6 text-amber-100/90">
              理论比容量和理论能量密度是理想指标。科研展示中必须区分“活性物质理论容量”“正极级能量密度”和“全电芯实际能量密度”。不要写成“锂硫电池实际能量密度就是 2600 Wh kg⁻¹”。
            </p>
          </div>
          <InfoList items={theoreticalAdvantages.map((item) => `${item.label}：${item.caution}`)} />
        </div>
      }
    />
  );
}

function MechanismPanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="space-y-3">
          <ReactionPathway />
          <div className="grid gap-3">
            {reactionMechanism.stages.map((stage) => (
              <div key={stage.id} className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-white">{stage.name}</h3>
                  <Tag>{stage.simplifiedReaction}</Tag>
                </div>
                <p className="mt-2 text-sm leading-5 text-slate-300">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      }
      explanation={
        <div className="space-y-3">
          <FormulaCard title="放电总反应" formula={reactionMechanism.dischargeOverall} />
          <FormulaCard title="充电反向反应" formula={reactionMechanism.chargeOverall} />
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-3">
            <p className="font-semibold text-amber-100">简化模型说明</p>
            <p className="mt-2 text-sm leading-6 text-amber-100/90">{reactionMechanism.caution}</p>
          </div>
        </div>
      }
    />
  );
}

function ReactionPathway({ activeFormula }: { activeFormula?: string }) {
  return (
    <ResearchDemoPanel>
      <p className="mb-3 text-sm font-semibold text-cyan">简化转化路径</p>
      <div className="flex flex-wrap items-center gap-2">
        {reactionMechanism.simplifiedPathway.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <ResearchDemoNode tone={activeFormula === item ? "cyan" : index < 2 ? "amber" : "violet"} className={activeFormula === item ? "demo-pulse" : ""}>
              {item}
            </ResearchDemoNode>
            {index < reactionMechanism.simplifiedPathway.length - 1 && <ArrowRight size={18} className="text-blue-300" />}
          </div>
        ))}
      </div>
    </ResearchDemoPanel>
  );
}

function FormulaCard({ title, formula }: { title: string; formula: string }) {
  return (
    <div className="rounded-xl border border-blue-500/35 bg-blue-500/10 p-3">
      <p className="text-sm text-cyan">{title}</p>
      <p className="mt-1 font-mono text-lg text-white">{formula}</p>
    </div>
  );
}

function ChargeDischargeCurvePanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  const [selected, setSelected] = useState(chargeDischargeCurve.regions[0].id);
  const region = chargeDischargeCurve.regions.find((item) => item.id === selected) ?? chargeDischargeCurve.regions[0];

  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="space-y-3">
          <ClassicGcdChart selected={selected} onSelect={setSelected} />
          <div className="grid gap-3 md:grid-cols-3">
            {chargeDischargeCurve.regions.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  selected === item.id ? "border-cyan bg-cyan/15 shadow-[0_0_24px_rgba(56,189,248,.18)]" : "border-slate-700 bg-slate-950/50 hover:border-cyan/40"
                }`}
              >
                <p className="font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs text-cyan">{item.voltageRange}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.species}</p>
              </button>
            ))}
          </div>
        </div>
      }
      explanation={
        <div className="space-y-3">
          <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
            <p className="text-xs text-cyan">当前解读区域</p>
            <h3 className="mt-1 text-xl font-bold text-white">{region.label}</h3>
            <p className="mt-1 text-sm text-slate-300">{region.voltageRange} · {region.capacityRegion}</p>
          </div>
          <InfoList items={[`对应物种：${region.species}`, region.interpretation, region.warning]} />
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
            <p className="mb-2 font-semibold text-white">曲线读图要点</p>
            <InfoList items={chargeDischargeCurve.interpretationPoints.map((item) => `${item.title}：${item.description}`)} />
          </div>
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-3">
            <p className="mb-2 font-semibold text-amber-100">严谨提示</p>
            <InfoList items={chargeDischargeCurve.scientificNotes} />
          </div>
        </div>
      }
      footer={
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {chargeDischargeCurve.researchConnections.map((item) => (
            <div key={item} className="rounded-xl border border-cyan/25 bg-cyan/[0.08] p-3 text-sm leading-5 text-slate-300">
              {item}
            </div>
          ))}
        </div>
      }
    />
  );
}

function ClassicGcdChart({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const discharge = chargeDischargeCurve.dischargeData.map((item) => ({ ...item, discharge: item.voltage }));
  const charge = chargeDischargeCurve.chargeData.map((item) => ({ ...item, charge: item.voltage }));

  return (
    <div className="h-[20rem] p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-cyan">经典恒流充放电曲线示意</p>
          <p className="mt-1 text-xs text-slate-400">容量基于硫质量归一化，曲线为教学示意而非固定实验值。</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-2 rounded border border-cyan/25 bg-cyan/10 px-2 py-1 text-cyan">
            <span className="h-0.5 w-5 rounded bg-cyan" />
            放电曲线
          </span>
          <span className="inline-flex items-center gap-2 rounded border border-amber-300/25 bg-amber-300/10 px-2 py-1 text-amber-100">
            <span className="h-0.5 w-5 rounded bg-amber-400" />
            充电曲线
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="70%">
        <LineChart margin={{ top: 8, right: 18, bottom: 18, left: 0 }}>
          <CartesianGrid stroke="rgba(148,163,184,.16)" />
          <XAxis dataKey="capacity" type="number" domain={[0, 1500]} stroke="#94a3b8" unit=" mAh g⁻¹" />
          <YAxis dataKey="voltage" type="number" domain={[1.65, 2.65]} stroke="#94a3b8" unit=" V" />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)", color: "#e2e8f0" }} />
          <ReferenceArea x1={0} x2={460} y1={2.22} y2={2.48} fill="#38d7ff" fillOpacity={selected === "upper-plateau" ? 0.18 : 0.06} strokeOpacity={0} />
          <ReferenceArea x1={520} x2={1320} y1={1.95} y2={2.16} fill="#a78bfa" fillOpacity={selected === "lower-plateau" ? 0.18 : 0.06} strokeOpacity={0} />
          <ReferenceArea x1={160} x2={1320} y1={2.22} y2={2.58} fill="#f59e0b" fillOpacity={selected === "charge-plateau" ? 0.16 : 0.05} strokeOpacity={0} />
          <ReferenceLine y={2.35} stroke="#38d7ff" strokeDasharray="4 4" />
          <ReferenceLine y={2.08} stroke="#a78bfa" strokeDasharray="4 4" />
          <ReferenceLine y={2.42} stroke="#f59e0b" strokeDasharray="4 4" />
          <Line name="放电曲线" data={discharge} type="monotone" dataKey="discharge" stroke="#38d7ff" strokeWidth={3} dot={false} isAnimationActive />
          <Line name="充电曲线" data={charge} type="monotone" dataKey="charge" stroke="#f59e0b" strokeWidth={3} dot={false} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {chargeDischargeCurve.regions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`rounded border px-2 py-1 text-[11px] ${selected === item.id ? "border-cyan bg-cyan/15 text-cyan" : "border-slate-700 bg-slate-950/70 text-slate-300"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PolysulfideConversionPanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  const [selected, setSelected] = useState(polysulfideSpecies[0].id);
  const item = polysulfideSpecies.find((entry) => entry.id === selected) ?? polysulfideSpecies[0];
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="space-y-3">
          <ReactionPathway activeFormula={item.formula} />
          <div className="grid gap-3 md:grid-cols-6">
            {polysulfideSpecies.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry.id)}
                className={`rounded-xl border p-3 transition ${entry.id === selected ? "border-cyan bg-cyan/15" : "border-slate-700 bg-slate-950/50 hover:border-cyan/40"}`}
              >
                <MoleculeIcon species={entry} />
                <p className="mt-2 font-semibold text-white">{entry.formula}</p>
                <p className="mt-1 text-xs text-slate-400">{entry.type}</p>
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
            <p className="text-sm font-semibold text-cyan">实验 / DFT 关联</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">实验：{item.relationToExperiment}</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">DFT：{item.relationToDFT}</p>
          </div>
        </div>
      }
      explanation={
        <div className="space-y-3">
          <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
            <p className="text-xs text-cyan">当前物种</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{item.formula}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.type} · {item.stage} · 溶解性：{item.solubility}</p>
          </div>
          <InfoList items={[item.description, `与问题关系：${item.relationToProblem}`]} />
        </div>
      }
    />
  );
}

function MoleculeIcon({ species }: { species: (typeof polysulfideSpecies)[number] }) {
  const map: Record<string, string> = {
    yellow: "#facc15",
    orange: "#fb923c",
    purple: "#c084fc",
    "light-blue": "#a5f3fc",
    white: "#f8fafc"
  };
  const sulfur = map[species.visualColor] ?? "#facc15";
  const lithium = "#93c5fd";
  const bond = "rgba(203,213,225,.62)";

  if (species.geometry === "ring") {
    const atoms = Array.from({ length: species.sulfurCount ?? 8 }).map((_, index) => {
      const angle = (Math.PI * 2 * index) / (species.sulfurCount ?? 8) - Math.PI / 2;
      return { x: 50 + Math.cos(angle) * 28, y: 36 + Math.sin(angle) * 24 };
    });
    return (
      <svg viewBox="0 0 100 72" className="mx-auto h-16 w-24" aria-label={`${species.formula} ring molecule`}>
        {atoms.map((atom, index) => {
          const next = atoms[(index + 1) % atoms.length];
          return <line key={`bond-${index}`} x1={atom.x} y1={atom.y} x2={next.x} y2={next.y} stroke={bond} strokeWidth="2" />;
        })}
        {atoms.map((atom, index) => (
          <g key={`s-${index}`}>
            <circle cx={atom.x} cy={atom.y} r="6.5" fill={sulfur} stroke="rgba(255,255,255,.45)" strokeWidth="1" />
            <text x={atom.x} y={atom.y + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill="#111827">S</text>
          </g>
        ))}
        <text x="50" y="67" textAnchor="middle" fontSize="9" fill="#94a3b8">环状 S8</text>
      </svg>
    );
  }

  const sulfurCount = species.sulfurCount ?? 4;
  const lithiumCount = species.lithiumCount ?? 2;
  const start = sulfurCount <= 2 ? 42 : sulfurCount === 4 ? 30 : sulfurCount === 6 ? 22 : 14;
  const gap = sulfurCount <= 2 ? 16 : sulfurCount === 4 ? 13 : sulfurCount === 6 ? 10.5 : 8.5;
  const y = 36;
  const sulfurAtoms = Array.from({ length: sulfurCount }).map((_, index) => ({
    x: start + index * gap,
    y: y + (species.geometry === "cluster" ? (index % 2 ? 5 : -5) : index % 2 ? 3 : -3)
  }));
  const leftLi = { x: Math.max(9, sulfurAtoms[0].x - 18), y: sulfurAtoms[0].y - 12 };
  const rightLi = { x: Math.min(91, sulfurAtoms[sulfurAtoms.length - 1].x + 18), y: sulfurAtoms[sulfurAtoms.length - 1].y + 12 };

  return (
    <svg viewBox="0 0 100 72" className="mx-auto h-16 w-24" aria-label={`${species.formula} molecule`}>
      {lithiumCount > 0 && <line x1={leftLi.x} y1={leftLi.y} x2={sulfurAtoms[0].x} y2={sulfurAtoms[0].y} stroke={bond} strokeWidth="2" />}
      {sulfurAtoms.map((atom, index) => {
        const next = sulfurAtoms[index + 1];
        return next ? <line key={`bond-${index}`} x1={atom.x} y1={atom.y} x2={next.x} y2={next.y} stroke={bond} strokeWidth="2" /> : null;
      })}
      {lithiumCount > 1 && <line x1={sulfurAtoms[sulfurAtoms.length - 1].x} y1={sulfurAtoms[sulfurAtoms.length - 1].y} x2={rightLi.x} y2={rightLi.y} stroke={bond} strokeWidth="2" />}
      {lithiumCount > 0 && (
        <g>
          <circle cx={leftLi.x} cy={leftLi.y} r="7" fill={lithium} stroke="rgba(255,255,255,.55)" strokeWidth="1" />
          <text x={leftLi.x} y={leftLi.y + 3} textAnchor="middle" fontSize="7" fontWeight="800" fill="#082f49">Li</text>
        </g>
      )}
      {sulfurAtoms.map((atom, index) => (
        <g key={`s-${index}`}>
          <circle cx={atom.x} cy={atom.y} r={sulfurCount > 6 ? 5.5 : 6.5} fill={sulfur} stroke="rgba(255,255,255,.45)" strokeWidth="1" />
          <text x={atom.x} y={atom.y + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill={species.visualColor === "white" || species.visualColor === "light-blue" ? "#0f172a" : "#111827"}>S</text>
        </g>
      ))}
      {lithiumCount > 1 && (
        <g>
          <circle cx={rightLi.x} cy={rightLi.y} r="7" fill={lithium} stroke="rgba(255,255,255,.55)" strokeWidth="1" />
          <text x={rightLi.x} y={rightLi.y + 3} textAnchor="middle" fontSize="7" fontWeight="800" fill="#082f49">Li</text>
        </g>
      )}
      <text x="50" y="67" textAnchor="middle" fontSize="9" fill="#94a3b8">
        {species.lithiumCount ? `Li-S${species.sulfurCount}-Li` : "S8"}
      </text>
    </svg>
  );
}

function ShuttlePanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  return (
    <WorkspaceFrame
      active={active}
      visual={<EnhancedShuttleAnimation />}
      explanation={
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-300">
            在放电过程中，硫正极生成的长链多硫化物 Li2Sx，尤其是 Li2S8、Li2S6 和 Li2S4，容易溶解于电解液并向锂负极迁移。这些可溶性中间体到达锂负极后可能被进一步还原，并与锂金属发生副反应。
          </p>
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            催化剂并不是“完全阻止穿梭”，更严谨的表述是：减弱穿梭、限制扩散、促进转化并降低副反应概率。
          </div>
        </div>
      }
    />
  );
}

function EnhancedShuttleAnimation() {
  const [mode, setMode] = useState(shuttleAnimationModes[0].id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const data = shuttleAnimationModes.find((entry) => entry.id === mode) ?? shuttleAnimationModes[0];
  const current = data.steps[step];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border border-slate-700 p-1">
          {shuttleAnimationModes.map((entry) => (
            <button key={entry.id} onClick={() => { setMode(entry.id); setStep(0); }} className={`rounded px-3 py-2 text-sm ${mode === entry.id ? "bg-cyan text-slate-950" : "text-slate-300"}`}>
              {entry.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPlaying((value) => !value)} className="rounded border border-slate-700 p-2">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
          <button onClick={() => setStep(0)} className="rounded border border-slate-700 p-2"><RotateCcw size={16} /></button>
        </div>
      </div>
      <div className="relative h-60 overflow-hidden">
        <div className="absolute left-6 top-8 h-44 w-20 rounded bg-slate-300 text-center text-xs font-bold text-slate-950"><span className="mt-20 block">Li</span></div>
        <div className="absolute right-6 top-8 h-44 w-24 rounded bg-yellow-400/80 text-center text-xs font-bold text-slate-950"><span className="mt-20 block">S/C</span></div>
        <div className="absolute left-32 right-36 top-8 h-44 rounded border border-blue-500/25 bg-blue-500/8 text-center text-xs text-slate-400"><span className="mt-4 block">电解液 / 隔膜区域</span></div>
        {mode === "with-catalyst" && <div className="absolute right-32 top-24 grid h-16 w-16 place-items-center rounded-full border border-cyan bg-cyan/20 text-xs text-cyan">催化位点</div>}
        {["Li2S8", "Li2S6", "Li2S4", "Li2S6"].map((label, index) => (
          <motion.div
            key={`${mode}-${index}-${step}`}
            className="absolute rounded-full bg-purple-400/95 px-2 py-1 text-xs text-white"
          initial={{ right: 110, top: 58 + index * 36 }}
            animate={
              playing
                ? mode === "without-catalyst"
                  ? { right: [110, 300, 520], opacity: [1, 0.85, 0.45] }
                  : { right: [110, 160, 135], scale: [1, 1.12, 0.82], opacity: [1, 1, 0.7] }
                : {}
            }
            transition={{ duration: 5, repeat: Infinity, delay: index * 0.45 }}
          >
            {label}
          </motion.div>
        ))}
        {mode === "without-catalyst" && <motion.div className="absolute left-24 top-10 h-40 w-4 rounded bg-red-900/60" animate={playing ? { opacity: [0.2, 0.85, 0.5] } : {}} transition={{ duration: 3, repeat: Infinity }} />}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
        <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
          <p className="text-sm text-cyan">{data.label}</p>
          <p className="mt-1 text-sm leading-5 text-slate-300">{data.summary}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {data.steps.map((entry, index) => (
              <button key={entry.id} onClick={() => setStep(index)} className={`rounded px-2 py-1 text-xs ${step === index ? "bg-cyan text-slate-950" : "bg-slate-800 text-slate-300"}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <p className="font-semibold text-white">{current.title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-300">{current.description}</p>
        </div>
      </div>
    </div>
  );
}

function ResearchLinkPanel({ active }: { active: (typeof fundamentalsTabs)[number] }) {
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="grid gap-3">
          {researchLinkLogic.map((item, index) => (
            <div key={item.id} className="grid gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 md:grid-cols-[2rem_1fr_1fr]">
              <div className="grid h-8 w-8 place-items-center rounded-full border border-cyan text-cyan">{index + 1}</div>
              <div>
                <p className="font-semibold text-white">{item.problem}</p>
                <p className="mt-1 text-sm text-slate-400">{item.consequence}</p>
              </div>
              <div>
                <p className="text-sm leading-6 text-cyan">{item.researchDirection}</p>
                <p className="mt-1 text-xs text-slate-500">{item.relatedModules.join(" / ")}</p>
              </div>
            </div>
          ))}
        </div>
      }
      explanation={
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-300">基础机理不是孤立知识点，而是后续模块的入口：材料为什么要设计、表征为什么要成链、DFT 为什么要建模，全部来自这些基础限制。</p>
          <div className="grid gap-3">
            {fundamentalsScientificChecks.slice(0, 5).map((item) => (
              <div key={item} className="rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm leading-6 text-slate-300">{item}</div>
            ))}
          </div>
        </div>
      }
      footer={
        <div className="grid gap-3 md:grid-cols-4">
          {nextModuleEntrances.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-cyan/25 bg-cyan/[0.08] p-3">
              <p className="font-semibold text-white">{entry.title}</p>
              <p className="mt-1 text-sm leading-5 text-slate-300">{entry.description}</p>
            </div>
          ))}
        </div>
      }
    />
  );
}
