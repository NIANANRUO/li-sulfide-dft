"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  BatteryCharging,
  CircleDot,
  FlaskConical,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import {
  challengeCards,
  challengeImpactPaths,
  challengePanelDetails,
  challengesGlossary,
  challengesScientificChecks,
  challengesTabs,
  conductivityPanelDetails,
  conductivityIssues,
  experimentDFTChallengeMap,
  kineticsBottlenecks,
  lithiumAnodeIssues,
  practicalPanelDetails,
  practicalConditionChallenges,
  problemStrategyMap,
  shuttleEffectMechanism,
  volumeExpansionIssues
} from "@/data/challengesData";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import {
  ResearchDemoFrame,
  ResearchDemoLabel,
  ResearchDemoNode,
  ResearchDemoPanel,
  ResearchDemoSvgDefs,
} from "@/components/ResearchDemoFrame";

type TabId = (typeof challengesTabs)[number]["id"];

export function ChallengesWorkspace({
  tab,
  onSelectTab
}: {
  tab: string;
  onSelectTab?: (label: string) => void;
}) {
  const active = challengesTabs.find((item) => item.label === tab) ?? challengesTabs[0];
  const selectTab = (id: string) => {
    const next = challengesTabs.find((item) => item.id === id);
    if (next) onSelectTab?.(next.label);
  };

  if (active.id === "overview") return <OverviewPanel active={active} onSelectTab={selectTab} />;
  if (active.id === "shuttle-effect") return <MechanismPanel active={active} visual={<ShuttleProblemAnimation />} kind="shuttle" />;
  if (active.id === "slow-kinetics") return <MechanismPanel active={active} visual={<KineticsBottleneckAnimation />} kind="kinetics" />;
  if (active.id === "low-conductivity") return <ConductivityPanel active={active} />;
  if (active.id === "volume-expansion") return <MechanismPanel active={active} visual={<VolumeExpansionAnimation />} kind="volume" />;
  if (active.id === "lithium-anode") return <MechanismPanel active={active} visual={<LithiumAnodeInstabilityAnimation />} kind="anode" />;
  if (active.id === "practical-conditions") return <PracticalConditionPanel active={active} />;
  return <StrategyMapPanel active={active} onSelectTab={selectTab} />;
}

function WorkspaceFrame({
  active,
  visual,
  explanation,
  footer,
  tag = "关键问题",
  stacked = false
}: {
  active: (typeof challengesTabs)[number];
  visual: React.ReactNode;
  explanation: React.ReactNode;
  footer?: React.ReactNode;
  tag?: string;
  stacked?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className={`grid gap-3 ${stacked ? "" : "2xl:grid-cols-[1.12fr_.88fr]"}`}>
        <GlassCard className={`${stacked ? "min-h-[24rem]" : "min-h-[27rem]"} border-blue-500/45 bg-[#07172c]/86`}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-cyan">{active.label}</p>
              <h2 className="mt-1 text-2xl font-bold text-white">{active.title}</h2>
            </div>
            <Tag>{tag}</Tag>
          </div>
          {visual}
        </GlassCard>
        <GlassCard className={`${stacked ? "" : "min-h-[27rem]"} border-slate-600/70 bg-[#081327]/90`}>
          <p className="mb-2 text-sm leading-6 text-slate-300">{active.description}</p>
          {explanation}
        </GlassCard>
      </div>
      {footer}
    </div>
  );
}

function OverviewPanel({
  active,
  onSelectTab
}: {
  active: (typeof challengesTabs)[number];
  onSelectTab: (id: string) => void;
}) {
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {challengeCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onSelectTab(card.id === "lithium-anode-instability" ? "lithium-anode" : card.id)}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-left transition hover:border-cyan/70 hover:bg-cyan/10"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-semibold text-white">{card.title}</p>
                <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-[11px] text-amber-100">{card.severity}</span>
              </div>
              <p className="text-sm leading-6 text-slate-300">{card.summary}</p>
            </button>
          ))}
        </div>
      }
      explanation={
        <div className="space-y-4">
          <p className="text-sm leading-7 text-slate-300">
            锂硫电池的实际循环性能和倍率性能受限，本质上来自电子传输、离子/分子传质、界面反应、结构力学和锂金属负极稳定性的耦合。催化剂、宿主结构、隔膜修饰、电解液调控、实验表征和 DFT 计算需要共同构成证据链。
          </p>
          <div className="rounded-lg border border-cyan/25 bg-cyan/[0.08] p-4">
            <p className="mb-3 font-semibold text-white">关键问题影响路径图</p>
            <div className="space-y-3">
              {challengeImpactPaths.map((path) => (
                <ImpactPath key={path.join("-")} path={path} />
              ))}
            </div>
          </div>
        </div>
      }
      footer={<BottomKnowledgeDock />}
    />
  );
}

function MechanismPanel({
  active,
  visual,
  kind
}: {
  active: (typeof challengesTabs)[number];
  visual: React.ReactNode;
  kind: "shuttle" | "kinetics" | "volume" | "anode";
}) {
  const content = getMechanismContent(kind);
  return (
    <WorkspaceFrame
      active={active}
      visual={visual}
      explanation={
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-300">{content.narrative}</p>
          <InfoList items={content.chain} />
          <EvidenceColumns experiments={content.experiments} dft={content.dft} />
          <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            {content.caution}
          </div>
        </div>
      }
      footer={<BottomKnowledgeDock />}
      stacked
    />
  );
}

function ConductivityPanel({ active }: { active: (typeof challengesTabs)[number] }) {
  return (
    <WorkspaceFrame
      active={active}
      visual={<ConductivityDiagram />}
      explanation={
        <div className="space-y-3">
          <InfoList items={conductivityIssues.map((item) => `${item.title}：${item.description}`)} />
          <InfoList items={conductivityPanelDetails.chain} />
          <EvidenceColumns
            experiments={conductivityPanelDetails.experiments}
            dft={conductivityPanelDetails.dft}
          />
          <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            {conductivityPanelDetails.caution}
          </div>
        </div>
      }
      footer={<BottomKnowledgeDock />}
      stacked
    />
  );
}

function PracticalConditionPanel({ active }: { active: (typeof challengesTabs)[number] }) {
  const radar = [
    { item: "硫载量", lab: 35, real: 88 },
    { item: "正极硫含量", lab: 45, real: 82 },
    { item: "贫电解液", lab: 25, real: 86 },
    { item: "有限锂", lab: 28, real: 78 },
    { item: "厚电极", lab: 32, real: 84 },
  ];
  return (
    <WorkspaceFrame
      active={active}
      visual={
        <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
          <ResearchDemoFrame title="实际工况雷达图" minHeight="24rem" className="p-3">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="rgba(148,163,184,.28)" />
                <PolarAngleAxis dataKey="item" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                <Radar name="实验室温和条件" dataKey="lab" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.18} />
                <Radar name="实际严苛条件" dataKey="real" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </ResearchDemoFrame>
          <div className="grid gap-3">
            {practicalConditionChallenges.map((item) => (
              <div key={item.id} className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{item.title}</p>
                  <Tag>{item.metric}</Tag>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                <p className="mt-2 text-xs leading-5 text-amber-100">{item.caution}</p>
              </div>
            ))}
          </div>
        </div>
      }
      explanation={
        <div className="space-y-4">
          <InfoList items={practicalPanelDetails.metrics} />
          <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100">
            {practicalPanelDetails.caution}
          </div>
          <p className="text-sm leading-7 text-slate-300">
            {practicalPanelDetails.dftBoundary}
          </p>
        </div>
      }
      footer={<BottomKnowledgeDock />}
    />
  );
}

function StrategyMapPanel({
  active,
  onSelectTab
}: {
  active: (typeof challengesTabs)[number];
  onSelectTab: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <GlassCard className="border-blue-500/45 bg-[#07172c]/86">
        <div className="mb-4">
          <p className="text-sm font-semibold text-cyan">{active.label}</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{active.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">{active.description}</p>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700/70">
          <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-100">
              <tr>
                {["问题", "直接后果", "材料策略", "实验验证", "DFT 分析"].map((header) => (
                  <th key={header} className="border-b border-slate-700 px-4 py-3 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {problemStrategyMap.map((row) => (
                <tr key={row.id} className="odd:bg-white/[0.025]">
                  <td className="border-b border-slate-800 px-4 py-3">
                    <button
                      onClick={() => onSelectTab(row.id === "lithium-anode-instability" ? "lithium-anode" : row.id)}
                      className="font-semibold text-cyan hover:text-white"
                    >
                      {row.problem}
                    </button>
                  </td>
                  <td className="border-b border-slate-800 px-4 py-3 text-slate-300">{row.consequence}</td>
                  <td className="border-b border-slate-800 px-4 py-3"><ChipList items={row.materialStrategies} /></td>
                  <td className="border-b border-slate-800 px-4 py-3"><ChipList items={row.experimentalValidation} /></td>
                  <td className="border-b border-slate-800 px-4 py-3"><ChipList items={row.dftAnalysis} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      <div className="grid gap-4 xl:grid-cols-[1fr_.82fr]">
        <GlassCard>
          <p className="mb-3 font-semibold text-white">实验信号与 DFT 解释边界</p>
          <div className="grid gap-3 md:grid-cols-2">
            {experimentDFTChallengeMap.map((item) => (
              <div key={item.experimentalSignal} className="rounded-lg border border-slate-700 bg-slate-950/45 p-4">
                <p className="font-semibold text-cyan">{item.experimentalSignal}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.possibleMeaning}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">DFT：{item.dftSupport}</p>
                <p className="mt-2 text-xs leading-5 text-amber-100">{item.caution}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <BottomKnowledgeDock compact />
      </div>
    </div>
  );
}

export function ShuttleProblemAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const steps = mode === "bare" ? shuttleEffectMechanism.steps : shuttleEffectMechanism.catalystModeSteps;
  const controls = useAnimationStepper(steps.length);

  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无抑制策略"], ["catalyst", "吸附/催化策略"]]}>
      <ShuttleCatalystScene mode={mode} playing={controls.playing} />
      <StepCard steps={steps} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

function LegacyShuttleProblemAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const steps = mode === "bare" ? shuttleEffectMechanism.steps : shuttleEffectMechanism.catalystModeSteps;
  const controls = useAnimationStepper(steps.length);

  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无抑制策略"], ["catalyst", "吸附/催化策略"]]}>
      <div className="relative h-72 overflow-hidden">
        <ElectrodeLayout />
        {mode === "catalyst" && <div className="absolute right-32 top-28 grid h-20 w-20 place-items-center rounded-full border border-cyan bg-cyan/20 text-xs text-cyan">吸附/催化位点</div>}
        {["Li2S8", "Li2S6", "Li2S4", "Li2S6"].map((label, index) => (
          <motion.span
            key={`${mode}-${label}-${index}`}
            className="absolute rounded-full bg-purple-400/95 px-2 py-1 text-xs text-white"
            initial={{ right: 112, top: 72 + index * 42 }}
            animate={
              controls.playing
                ? mode === "bare"
                  ? { right: [112, 300, 535], opacity: [1, 0.85, 0.42] }
                  : { right: [112, 165, 130], scale: [1, 1.1, 0.82], opacity: [1, 1, 0.72] }
                : {}
            }
            transition={{ duration: mode === "bare" ? 5 : 3.2, repeat: Infinity, delay: index * 0.42 }}
          >
            {label}
          </motion.span>
        ))}
        {mode === "bare" && <motion.div className="absolute left-24 top-12 h-48 w-5 rounded bg-red-900/70" animate={controls.playing ? { opacity: [0.25, 0.95, 0.45] } : {}} transition={{ duration: 2.6, repeat: Infinity }} />}
        <MetricStrip items={mode === "bare" ? ["容量衰减", "低库伦效率", "副反应层增厚"] : ["穿梭减弱", "硫利用率提升", "副反应降低"]} />
      </div>
      <StepCard steps={steps} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

export function KineticsBottleneckAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(kineticsBottlenecks.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无催化位点"], ["catalyst", "催化位点参与"]]}>
      <KineticsCatalystScene mode={mode} playing={controls.playing} />
      <StepCard steps={kineticsBottlenecks} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

function LegacyKineticsBottleneckAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(kineticsBottlenecks.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无催化剂"], ["catalyst", "有催化剂"]]}>
      <div className="relative h-72 overflow-hidden">
        <div className="absolute left-8 top-24 rounded-lg border border-purple-300/50 bg-purple-500/20 px-5 py-4 text-white">Li2S4</div>
        <ArrowRight className="absolute left-40 top-32 text-blue-300" size={34} />
        <div className="absolute left-[43%] top-20 h-28 w-36 rounded-lg border border-slate-600 bg-slate-900/80 p-3 text-center text-sm text-slate-200">
          {mode === "catalyst" ? "活性位点促进吸附与电子转移" : "表面惰性，转化阻力较大"}
        </div>
        <motion.div
          className="absolute right-20 top-28 h-14 w-28 rounded-lg border border-yellow-300/50 bg-yellow-300/20 text-center text-sm leading-[3.5rem] text-yellow-100"
          animate={controls.playing ? { scale: mode === "catalyst" ? [0.85, 1.1, 1] : [0.65, 0.78, 0.7] } : {}}
          transition={{ duration: mode === "catalyst" ? 1.8 : 3.8, repeat: Infinity }}
        >
          Li2S
        </motion.div>
        <EnergyBarrier high={mode === "bare"} />
        <MetricStrip items={mode === "bare" ? ["能垒高", "沉积不均", "极化增大"] : ["能垒降低", "沉积更均匀", "倍率改善"]} />
      </div>
      <StepCard steps={kineticsBottlenecks} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

export function VolumeExpansionAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(volumeExpansionIssues.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "未缓冲结构"], ["catalyst", "多孔/柔性宿主"]]}>
      <VolumeCatalystScene mode={mode} playing={controls.playing} />
      <StepCard steps={volumeExpansionIssues} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

function LegacyVolumeExpansionAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(volumeExpansionIssues.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无缓冲结构"], ["catalyst", "多孔/柔性宿主"]]}>
      <div className="relative h-72 overflow-hidden">
        <div className={`absolute inset-x-10 bottom-12 h-28 rounded-lg border ${mode === "catalyst" ? "border-cyan/45 bg-cyan/10" : "border-slate-600 bg-slate-900/65"}`}>
          {mode === "catalyst" && <div className="absolute inset-4 rounded border border-cyan/30 bg-[repeating-linear-gradient(90deg,rgba(34,211,238,.18)_0_10px,transparent_10px_22px)]" />}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-24 rounded-full bg-yellow-300/85 shadow-[0_0_18px_rgba(250,204,21,.3)]"
            style={{ left: `${20 + i * 16}%` }}
            animate={controls.playing ? { width: mode === "bare" ? [32, 72, 58] : [32, 50, 42], height: mode === "bare" ? [32, 72, 58] : [32, 50, 42] } : {}}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
        {mode === "bare" && <CrackMarks />}
        <MetricStrip items={mode === "bare" ? ["裂纹形成", "导电网络断开", "孔道堵塞"] : ["体积变化被缓冲", "网络连续", "沉积更均匀"]} />
      </div>
      <StepCard steps={volumeExpansionIssues} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

export function LithiumAnodeInstabilityAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(lithiumAnodeIssues.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "裸锂负极"], ["catalyst", "保护/调控界面"]]}>
      <AnodeCatalystScene mode={mode} playing={controls.playing} />
      <StepCard steps={lithiumAnodeIssues} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

function LegacyLithiumAnodeInstabilityAnimation() {
  const [mode, setMode] = useState<"bare" | "catalyst">("bare");
  const controls = useAnimationStepper(lithiumAnodeIssues.length);
  return (
    <AnimationShell mode={mode} setMode={setMode} controls={controls} modes={[["bare", "无保护负极"], ["catalyst", "有保护层"]]}>
      <div className="relative h-72 overflow-hidden">
        <div className="absolute left-12 top-12 h-48 w-28 rounded-lg border border-slate-300/60 bg-slate-200/75 text-center text-sm font-bold text-slate-950"><span className="mt-24 block">Li 金属</span></div>
        {mode === "bare" ? <UnstableSeiLayer /> : <ProtectedSeiLayer />}
        <div className="absolute left-44 right-12 top-12 h-48 rounded border border-blue-500/20 bg-blue-500/[0.06] text-center text-xs text-slate-400">
          <span className="mt-4 block">电解液侧 / Li+ 迁移空间</span>
        </div>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full bg-blue-300"
            initial={{ left: 290 + i * 52, top: 75 + i * 28 }}
            animate={controls.playing ? { left: mode === "bare" ? [290 + i * 52, 118 + i * 4] : [290 + i * 52, 98], top: mode === "bare" ? [75 + i * 28, 76 + i * 34] : [75 + i * 28, 104 + i * 18] } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.35 }}
          />
        ))}
        {mode === "bare" ? <Dendrites /> : <UniformLithiumLayer />}
        {mode === "bare" && ["Li2S6", "Li2S4"].map((label, i) => (
          <motion.span key={label} className="absolute rounded-full bg-purple-400 px-2 py-1 text-xs text-white" initial={{ right: 56, top: 92 + i * 44 }} animate={controls.playing ? { right: [56, 380, 520], opacity: [1, .8, .45] } : {}} transition={{ duration: 5, repeat: Infinity, delay: i * .5 }}>{label}</motion.span>
        ))}
        <MetricStrip items={mode === "bare" ? ["枝晶横向生长", "SEI 破裂/重构", "活性锂损失"] : ["Li+ 通量均匀", "人工 SEI 稳定", "副反应降低"]} />
      </div>
      <StepCard steps={lithiumAnodeIssues} active={controls.step} onSelect={controls.setStep} />
    </AnimationShell>
  );
}

function AnimationShell({
  mode,
  setMode,
  controls,
  modes,
  children
}: {
  mode: "bare" | "catalyst";
  setMode: (mode: "bare" | "catalyst") => void;
  controls: ReturnType<typeof useAnimationStepper>;
  modes: [string, string][];
  children: React.ReactNode;
}) {
  return (
    <ResearchDemoFrame title="关键问题动态演示图" minHeight="410px">
      <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border border-slate-700 p-1">
          {modes.map(([id, label]) => (
            <button key={id} onClick={() => { setMode(id as "bare" | "catalyst"); controls.setStep(0); }} className={`rounded px-3 py-2 text-sm ${mode === id ? "bg-cyan text-slate-950" : "text-slate-300 hover:bg-white/5"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <IconButton title={controls.playing ? "暂停" : "播放"} onClick={() => controls.setPlaying((value) => !value)}>{controls.playing ? <Pause size={16} /> : <Play size={16} />}</IconButton>
          <IconButton title="重播" onClick={() => controls.setStep(0)}><RotateCcw size={16} /></IconButton>
        </div>
      </div>
      {children}
      </div>
    </ResearchDemoFrame>
  );
}

function CatalystSceneFrame({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <div className="relative h-[20rem] overflow-hidden rounded-xl border border-cyan/20 bg-slate-950/30">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
        <ResearchDemoSvgDefs />
        <rect width="720" height="320" rx="18" fill="transparent" />
        <g opacity="0.16" stroke="#38bdf8" strokeWidth="0.8">
          {Array.from({ length: 13 }).map((_, index) => <path key={`v-${index}`} d={`M ${index * 60} 0 V 320`} />)}
          {Array.from({ length: 7 }).map((_, index) => <path key={`h-${index}`} d={`M 0 ${index * 54} H 720`} />)}
        </g>
      </svg>
      <ResearchDemoLabel tone="cyan" className="absolute left-4 top-4">{caption}</ResearchDemoLabel>
      {children}
    </div>
  );
}

function ShuttleCatalystScene({ mode, playing }: { mode: "bare" | "catalyst"; playing: boolean }) {
  const particles = ["Li2S8", "Li2S6", "Li2S4", "Li2S6"];
  return (
    <CatalystSceneFrame caption={mode === "bare" ? "LiPS 自由扩散路径" : "活性位点捕获-转化路径"}>
      <ElectrodeStack leftLabel="Li" rightLabel="S/C" />
      {mode === "catalyst" && <CatalystSiteCluster className="right-[7.8rem] top-[6.4rem]" label="M-Nx / polar site" />}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
        <defs>
          <marker id="shuttleArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={mode === "bare" ? "#f87171" : "#67e8f9"} />
          </marker>
        </defs>
        <path
          d={mode === "bare" ? "M590 108 C470 74 356 150 120 198" : "M588 120 C540 96 506 112 560 154 C594 188 538 210 486 184"}
          fill="none"
          stroke={mode === "bare" ? "#f87171" : "#67e8f9"}
          strokeWidth="2.5"
          className="demo-flow"
          markerEnd="url(#shuttleArrow)"
        />
      </svg>
      {particles.map((label, index) => (
        <motion.span
          key={`${mode}-${label}-${index}`}
          className="absolute rounded-full border border-violet-200/45 bg-violet-400/85 px-2 py-1 text-xs font-semibold text-white shadow-[0_0_18px_rgba(167,139,250,.38)]"
          initial={{ right: 92, top: 74 + index * 42 }}
          animate={
            playing
              ? mode === "bare"
                ? { right: [92, 310, 570], top: [74 + index * 42, 108 + index * 24, 170 + index * 16], opacity: [1, 0.82, 0.34] }
                : { right: [92, 134, 116], top: [74 + index * 42, 112 + index * 16, 144 + (index % 2) * 16], scale: [1, 1.12, 0.78], opacity: [1, 1, 0.62] }
              : {}
          }
          transition={{ duration: mode === "bare" ? 5.6 : 3.4, repeat: Infinity, delay: index * 0.38, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      ))}
      {mode === "bare" && <motion.div className="absolute left-[7.2rem] top-16 h-52 w-7 rounded-full bg-red-500/18 blur-sm" animate={playing ? { opacity: [0.2, 0.78, 0.28] } : {}} transition={{ duration: 2.6, repeat: Infinity }} />}
      <MetricStrip items={mode === "bare" ? ["LiPS 跨区迁移", "负极副反应", "容量衰减"] : ["局域吸附", "快速转化", "扩散概率降低"]} />
    </CatalystSceneFrame>
  );
}

function KineticsCatalystScene({ mode, playing }: { mode: "bare" | "catalyst"; playing: boolean }) {
  return (
    <CatalystSceneFrame caption={mode === "bare" ? "高能垒转化瓶颈" : "催化位点降低路径能垒"}>
      <div className="absolute left-8 top-24 grid gap-3">
        {["S8", "Li2S4", "Li2S"].map((item, index) => (
          <ResearchDemoNode key={item} tone={index === 1 ? "violet" : index === 2 ? "amber" : "slate"} className="w-24">
            {item}
          </ResearchDemoNode>
        ))}
      </div>
      <CatalystLattice className="left-[15rem] top-[5.6rem] h-32 w-52" active={mode === "catalyst"} />
      {mode === "catalyst" && <CatalystSiteCluster className="left-[21rem] top-[7rem]" label="dual site" />}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
        <path d="M132 158 C188 120 224 120 274 150" fill="none" stroke="#67e8f9" strokeWidth="2.3" className="demo-flow" markerEnd="url(#arrowCyan)" />
        <path d="M438 158 C494 118 546 116 612 154" fill="none" stroke="#67e8f9" strokeWidth="2.3" className="demo-flow" markerEnd="url(#arrowCyan)" />
        <path
          d={mode === "bare" ? "M402 266 C456 266 472 86 522 86 C572 86 586 266 646 266" : "M402 266 C456 266 476 158 522 158 C568 158 588 266 646 266"}
          fill="none"
          stroke={mode === "bare" ? "#fbbf24" : "#67e8f9"}
          strokeWidth="4"
          className="demo-draw"
        />
        <text x="492" y={mode === "bare" ? "78" : "150"} fill="#e0f2fe" fontSize="15" fontWeight="700">
          {mode === "bare" ? "high barrier" : "lower barrier"}
        </text>
      </svg>
      <motion.div
        className="absolute right-20 top-[8.1rem] grid h-16 w-28 place-items-center rounded-xl border border-amber-300/45 bg-amber-300/12 text-sm font-semibold text-amber-100"
        animate={playing ? { scale: mode === "catalyst" ? [0.92, 1.08, 1] : [0.72, 0.86, 0.76], opacity: mode === "catalyst" ? [0.75, 1, 0.86] : [0.38, 0.66, 0.46] } : {}}
        transition={{ duration: mode === "catalyst" ? 1.8 : 3.4, repeat: Infinity }}
      >
        Li2S deposit
      </motion.div>
      <ElectronRelay active={mode === "catalyst" && playing} />
      <MetricStrip items={mode === "bare" ? ["转化滞留", "Li2S 成核慢", "极化增大"] : ["电子耦合增强", "成核更均匀", "反应路径缩短"]} />
    </CatalystSceneFrame>
  );
}

function VolumeCatalystScene({ mode, playing }: { mode: "bare" | "catalyst"; playing: boolean }) {
  const nuclei = useMemo(() => [0, 1, 2, 3, 4], []);
  return (
    <CatalystSceneFrame caption={mode === "bare" ? "未受限沉积造成局部应力" : "多孔宿主分散体积变化"}>
      <CatalystLattice className="left-16 top-24 h-28 w-[34rem]" active={mode === "catalyst"} porous />
      {nuclei.map((item) => (
        <motion.span
          key={item}
          className="absolute rounded-full border border-amber-200/45 bg-amber-300/82 shadow-[0_0_20px_rgba(251,191,36,.28)]"
          style={{ left: `${18 + item * 13}%`, top: 138 + (item % 2) * 18 }}
          animate={playing ? { width: mode === "bare" ? [28, 72, 56] : [24, 44, 36], height: mode === "bare" ? [28, 72, 56] : [24, 44, 36], y: mode === "bare" ? [0, -16, -6] : [0, -5, 0] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, delay: item * 0.18 }}
        />
      ))}
      {mode === "bare" ? <StressFractureOverlay playing={playing} /> : <ElasticBufferOverlay playing={playing} />}
      <MetricStrip items={mode === "bare" ? ["应力集中", "导电骨架断裂", "孔道堵塞"] : ["孔道分担应变", "骨架连续", "沉积分布均匀"]} />
    </CatalystSceneFrame>
  );
}

function AnodeCatalystScene({ mode, playing }: { mode: "bare" | "catalyst"; playing: boolean }) {
  return (
    <CatalystSceneFrame caption={mode === "bare" ? "不均匀 Li+ 通量与副反应" : "保护界面引导均匀沉积"}>
      <ResearchDemoPanel className="absolute bottom-14 left-10 top-20 grid w-32 place-items-center border-slate-200/40 bg-slate-100/12 text-sm font-bold text-slate-100">
        Li metal
      </ResearchDemoPanel>
      <div className={`absolute bottom-14 left-[11.1rem] top-20 w-6 rounded-full ${mode === "bare" ? "bg-amber-300/30" : "bg-cyan/60 shadow-[0_0_24px_rgba(34,211,238,.36)]"}`} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.path
            key={item}
            d={mode === "bare" ? `M ${602 - item * 58} ${82 + item * 34} C 404 ${72 + item * 20} 260 ${140 + item * 22} 174 ${112 + item * 20}` : `M ${602 - item * 58} ${82 + item * 34} C 424 ${90 + item * 12} 302 ${108 + item * 18} 176 ${104 + item * 28}`}
            fill="none"
            stroke={mode === "bare" ? "#93c5fd" : "#67e8f9"}
            strokeWidth="2.1"
            strokeDasharray="8 10"
            animate={playing ? { strokeDashoffset: [0, -36] } : {}}
            transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
      {mode === "bare" ? <AnodeDendriteField playing={playing} /> : <UniformLiFlux playing={playing} />}
      {mode === "bare" && ["Li2S6", "Li2S4"].map((label, index) => (
        <motion.span
          key={label}
          className="absolute rounded-full border border-violet-200/40 bg-violet-400/80 px-2 py-1 text-xs text-white"
          initial={{ right: 52, top: 95 + index * 48 }}
          animate={playing ? { right: [52, 350, 520], opacity: [1, 0.72, 0.28] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: index * 0.45 }}
        >
          {label}
        </motion.span>
      ))}
      <MetricStrip items={mode === "bare" ? ["枝晶生长", "SEI 破裂", "活性 Li 损失"] : ["Li+ 通量均匀", "人工 SEI 稳定", "副反应降低"]} />
    </CatalystSceneFrame>
  );
}

function ElectrodeStack({ leftLabel, rightLabel }: { leftLabel: string; rightLabel: string }) {
  return (
    <>
      <ResearchDemoPanel className="absolute bottom-14 left-8 top-16 grid w-24 place-items-center border-slate-200/35 bg-slate-100/10 text-sm font-bold text-slate-100">
        {leftLabel}
      </ResearchDemoPanel>
      <ResearchDemoPanel className="absolute bottom-14 right-8 top-16 grid w-28 place-items-center border-amber-300/35 bg-amber-300/12 text-sm font-bold text-amber-100">
        {rightLabel}
      </ResearchDemoPanel>
      <ResearchDemoPanel className="absolute bottom-14 left-40 right-44 top-16 border-cyan/18 bg-cyan/[0.045]">
        <ResearchDemoLabel tone="slate" className="mt-2">electrolyte / separator region</ResearchDemoLabel>
      </ResearchDemoPanel>
    </>
  );
}

function CatalystSiteCluster({ className, label }: { className?: string; label: string }) {
  return (
    <motion.div
      className={`demo-pulse absolute grid h-24 w-24 place-items-center rounded-full border border-cyan/45 bg-cyan/12 text-center text-[11px] font-semibold leading-4 text-cyan shadow-[0_0_30px_rgba(34,211,238,.25)] ${className ?? ""}`}
    >
      <span>{label}</span>
      {[0, 1, 2, 3, 4].map((item) => <span key={item} className="absolute h-2 w-2 rounded-full bg-cyan" style={{ left: `${24 + (item % 3) * 18}px`, top: `${22 + Math.floor(item / 3) * 34}px` }} />)}
    </motion.div>
  );
}

function CatalystLattice({ className, active, porous = false }: { className?: string; active: boolean; porous?: boolean }) {
  return (
    <div className={`absolute rounded-xl border ${active ? "border-cyan/40 bg-cyan/[0.08]" : "border-slate-600/70 bg-slate-900/50"} p-3 shadow-[inset_0_0_22px_rgba(14,165,233,.08)] ${className ?? ""}`}>
      <div className={`grid h-full w-full ${porous ? "grid-cols-12" : "grid-cols-7"} gap-1.5`}>
        {Array.from({ length: porous ? 36 : 21 }).map((_, index) => (
          <span
            key={index}
            className={`rounded-full ${active && index % 7 === 3 ? "bg-cyan shadow-[0_0_14px_rgba(34,211,238,.52)]" : porous && index % 5 === 0 ? "bg-transparent ring-1 ring-cyan/28" : "bg-slate-400/35"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ElectronRelay({ active }: { active: boolean }) {
  return (
    <>
      {[0, 1, 2].map((item) => (
        <motion.span
          key={item}
          className="absolute h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(34,211,238,.55)]"
          initial={{ left: 300 + item * 34, top: 170 - item * 12 }}
          animate={active ? { x: [0, 24, 48], opacity: [0.25, 1, 0.25] } : { opacity: 0.2 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: item * 0.18 }}
        />
      ))}
    </>
  );
}

function StressFractureOverlay({ playing }: { playing: boolean }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
      {[238, 382, 492].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 124 L${x + 16} 158 L${x - 10} 184 L${x + 22} 226`}
          fill="none"
          stroke="#f87171"
          strokeWidth="2.3"
          animate={playing ? { opacity: [0.2, 1, 0.35] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.28 }}
        />
      ))}
    </svg>
  );
}

function ElasticBufferOverlay({ playing }: { playing: boolean }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 320">
      {[190, 300, 410, 520].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 120 C${x - 26} 154 ${x + 28} 184 ${x} 220`}
          fill="none"
          stroke="#67e8f9"
          strokeWidth="2.2"
          strokeDasharray="7 9"
          animate={playing ? { strokeDashoffset: [0, -32], opacity: [0.35, 0.9, 0.42] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18 }}
        />
      ))}
    </svg>
  );
}

function AnodeDendriteField({ playing }: { playing: boolean }) {
  return (
    <div className="absolute left-[11.6rem] top-24">
      {[24, 62, 104, 144].map((top, index) => (
        <motion.span
          key={top}
          className="absolute block h-0 border-b-[6px] border-t-[6px] border-l-[116px] border-b-transparent border-t-transparent border-l-slate-100 drop-shadow-[0_0_8px_rgba(226,232,240,.45)]"
          style={{ top, transformOrigin: "left center", rotate: `${index % 2 ? 5 : -8}deg` }}
          animate={playing ? { scaleX: [0.28, 1.08, 0.84], opacity: [0.65, 1, 0.78] } : {}}
          transition={{ duration: 2.7, repeat: Infinity, delay: index * 0.22 }}
        />
      ))}
    </div>
  );
}

function UniformLiFlux({ playing }: { playing: boolean }) {
  return (
    <div className="absolute left-[12.1rem] top-24 h-40 w-40">
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.span
          key={item}
          className="absolute left-0 h-1.5 rounded bg-cyan/75 shadow-[0_0_12px_rgba(34,211,238,.3)]"
          style={{ top: 16 + item * 28, width: 122 }}
          animate={playing ? { opacity: [0.35, 0.95, 0.42], x: [0, 10, 0] } : {}}
          transition={{ duration: 2.1, repeat: Infinity, delay: item * 0.14 }}
        />
      ))}
    </div>
  );
}

function useAnimationStepper(length: number) {
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % length), 2200);
    return () => window.clearInterval(timer);
  }, [length, playing]);
  return { playing, setPlaying, step, setStep };
}

function getMechanismContent(kind: "shuttle" | "kinetics" | "volume" | "anode") {
  return challengePanelDetails[kind];
}

function EvidenceColumns({ experiments, dft }: { experiments: string[]; dft: string[] }) {
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/[0.08] p-4">
        <p className="mb-3 flex items-center gap-2 font-semibold text-emerald-100"><FlaskConical size={17} />实验对应</p>
        <InfoList items={experiments} />
      </div>
      <div className="rounded-lg border border-blue-300/25 bg-blue-300/[0.08] p-4">
        <p className="mb-3 flex items-center gap-2 font-semibold text-blue-100"><Atom size={17} />DFT 对应</p>
        <InfoList items={dft} />
      </div>
    </div>
  );
}

function ConductivityDiagram() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ElectrodeConductivityCard title="未优化硫正极" optimized={false} />
      <ElectrodeConductivityCard title="导电宿主/催化剂复合结构" optimized />
    </div>
  );
}

function ElectrodeConductivityCard({ title, optimized }: { title: string; optimized: boolean }) {
  return (
    <ResearchDemoFrame title={title} minHeight="18rem" className="p-4">
    <div className="relative h-72 overflow-hidden">
      <p className="font-semibold text-white">{title}</p>
      <div className="absolute bottom-16 left-8 right-8 h-28 rounded border border-slate-600 bg-slate-900/80" />
      {optimized && <div className="absolute bottom-24 left-12 right-12 h-1 rounded bg-yellow-200" />}
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`absolute rounded-full ${optimized ? "bg-yellow-300" : "bg-yellow-300/60"}`} style={{ left: `${18 + i * 14}%`, bottom: `${optimized ? 92 + (i % 2) * 18 : 82 + (i % 3) * 24}px`, width: optimized ? 28 : 36, height: optimized ? 28 : 36 }} />
      ))}
      {optimized ? (
        <>
          <ArrowRight className="absolute left-16 top-28 text-yellow-200" size={24} />
          <ArrowRight className="absolute right-20 top-32 rotate-90 text-blue-300" size={24} />
          <p className="absolute bottom-5 left-5 text-xs text-slate-300">电子经导电网络传输；Li+ 经电解液/孔道迁移。</p>
        </>
      ) : (
        <>
          <span className="absolute left-24 top-32 h-px w-20 border-t border-dashed border-red-300" />
          <span className="absolute right-20 top-20 rounded bg-slate-200/80 px-2 py-1 text-xs text-slate-950">Li2S 绝缘层</span>
          <p className="absolute bottom-5 left-5 text-xs text-slate-300">接触不足、局部沉积和电荷转移阻力增大。</p>
        </>
      )}
    </div>
    </ResearchDemoFrame>
  );
}

function BottomKnowledgeDock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "" : "xl:grid-cols-[1fr_1fr]"}`}>
      <GlassCard>
        <p className="mb-2 font-semibold text-white">关键术语</p>
        <div className={`grid gap-2 ${compact ? "" : "md:grid-cols-2"}`}>
          {challengesGlossary.slice(0, compact ? 6 : 4).map((item) => (
            <div key={item.term} className="rounded border border-slate-700 bg-slate-950/40 p-2.5">
              <p className="text-sm font-semibold text-cyan">{item.chinese} / {item.term}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{item.definition}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      {!compact && (
        <GlassCard>
          <p className="mb-2 font-semibold text-white">科学表述检查</p>
          <InfoList items={challengesScientificChecks.slice(0, 4)} />
        </GlassCard>
      )}
    </div>
  );
}

function ImpactPath({ path }: { path: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {path.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-2">
          <span className="rounded border border-slate-700 bg-slate-950/65 px-3 py-2 text-xs text-slate-200">{item}</span>
          {index < path.length - 1 && <ArrowRight size={15} className="text-blue-300" />}
        </span>
      ))}
    </div>
  );
}

function StepCard({
  steps,
  active,
  onSelect
}: {
  steps: { id: string; title: string; description: string }[];
  active: number;
  onSelect: (step: number) => void;
}) {
  const current = steps[active] ?? steps[0];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
      <div className="flex flex-wrap gap-2 rounded-lg border border-slate-700 bg-slate-950/45 p-3">
        {steps.map((entry, index) => (
          <button key={entry.id} onClick={() => onSelect(index)} className={`grid h-8 w-8 place-items-center rounded text-xs ${active === index ? "bg-cyan text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
            {index + 1}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-cyan/25 bg-cyan/[0.08] p-4">
        <p className="font-semibold text-white">{current.title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{current.description}</p>
      </div>
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{items.map((item) => <span key={item} className="rounded border border-cyan/20 bg-cyan/[0.08] px-2 py-1 text-xs text-cyan">{item}</span>)}</div>;
}

function ElectrodeLayout() {
  return (
    <>
      <div className="absolute left-6 top-10 h-52 w-20 rounded bg-slate-300 text-center text-xs font-bold text-slate-950"><span className="mt-24 block">Li 负极</span></div>
      <div className="absolute right-6 top-10 h-52 w-24 rounded bg-yellow-400/80 text-center text-xs font-bold text-slate-950"><span className="mt-24 block">S/C 正极</span></div>
      <div className="absolute left-32 right-36 top-10 h-52 rounded border border-blue-500/25 bg-blue-500/8 text-center text-xs text-slate-400"><span className="mt-4 block">电解液 / 隔膜区域</span></div>
    </>
  );
}

function MetricStrip({ items }: { items: string[] }) {
  return <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded border border-cyan/25 bg-slate-950/70 px-3 py-1 text-xs text-cyan">{item}</span>)}</div>;
}

function EnergyBarrier({ high }: { high: boolean }) {
  return (
    <div className="absolute bottom-16 left-[36%] right-[18%] h-24">
      <svg viewBox="0 0 300 110" className="h-full w-full">
        <path d={high ? "M10 95 C80 95 95 12 150 12 C205 12 220 95 290 95" : "M10 95 C85 95 104 45 150 45 C196 45 215 95 290 95"} fill="none" stroke="#38bdf8" strokeWidth="4" />
        <text x="132" y={high ? "28" : "60"} fill="#e0f2fe" fontSize="16">{high ? "高能垒" : "能垒降低"}</text>
      </svg>
    </div>
  );
}

function CrackMarks() {
  return (
    <>
      <span className="absolute bottom-24 left-[42%] h-20 w-px rotate-12 bg-red-300" />
      <span className="absolute bottom-24 left-[43%] h-10 w-px -rotate-45 bg-red-300" />
      <span className="absolute bottom-20 left-[61%] h-24 w-px -rotate-12 bg-red-300" />
    </>
  );
}

function UnstableSeiLayer() {
  return (
    <div className="absolute left-[9.6rem] top-10 h-52 w-8">
      <motion.div
        className="absolute left-0 top-0 h-full w-3 rounded bg-amber-200/55"
        animate={{ opacity: [0.45, 0.82, 0.52] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      {[18, 58, 96, 138, 176].map((top, index) => (
        <motion.span
          key={top}
          className="absolute left-[-1px] h-8 w-px rotate-45 bg-red-300"
          style={{ top }}
          animate={{ opacity: [0.15, 1, 0.2], x: [0, index % 2 ? 5 : -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.24 }}
        />
      ))}
      <motion.div
        className="absolute left-3 top-6 h-40 w-2 rounded bg-amber-500/25"
        animate={{ opacity: [0.1, 0.55, 0.18], scaleX: [0.7, 1.35, 0.85] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />
      <span className="absolute left-5 top-2 rounded border border-amber-300/30 bg-slate-950/70 px-2 py-1 text-[10px] text-amber-100">SEI 破裂/重构</span>
    </div>
  );
}

function ProtectedSeiLayer() {
  return (
    <div className="absolute left-[9.6rem] top-10 h-52 w-8">
      <motion.div
        className="absolute left-0 top-0 h-full w-4 rounded bg-cyan/70 shadow-[0_0_18px_rgba(34,211,238,.35)]"
        animate={{ opacity: [0.78, 1, 0.82] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <span className="absolute left-5 top-2 rounded border border-cyan/30 bg-slate-950/70 px-2 py-1 text-[10px] text-cyan">稳定保护层</span>
    </div>
  );
}

function Dendrites() {
  return (
    <div className="absolute left-[10.2rem] top-16">
      {[
        { top: 22, length: 86, tilt: -9 },
        { top: 62, length: 128, tilt: 4 },
        { top: 104, length: 96, tilt: -5 },
        { top: 142, length: 116, tilt: 7 },
      ].map((branch, i) => (
        <motion.span
          key={branch.top}
          className="absolute block h-0 border-b-[6px] border-t-[6px] border-l-[96px] border-b-transparent border-t-transparent border-l-slate-100 drop-shadow-[0_0_8px_rgba(226,232,240,.45)]"
          style={{
            top: branch.top,
            borderLeftWidth: branch.length,
            transformOrigin: "left center",
            rotate: `${branch.tilt}deg`,
          }}
          animate={{ scaleX: [0.38, 1.08, 0.86], opacity: [0.75, 1, 0.86] }}
          transition={{ duration: 2.7, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={`dead-${i}`}
          className="absolute rounded-full bg-slate-100/80"
          style={{ left: 96 + i * 38, top: 42 + i * 44, width: 10, height: 10 }}
          animate={{ opacity: [0.2, 0.9, 0.35], y: [0, 7, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

function UniformLithiumLayer() {
  return (
    <div className="absolute left-[10.2rem] top-16 h-40 w-36">
      <motion.div className="absolute left-0 top-4 h-32 w-8 rounded bg-slate-100/80" animate={{ opacity: [0.65, 1, 0.75] }} transition={{ duration: 2.4, repeat: Infinity }} />
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute left-10 h-1 rounded bg-cyan/70"
          style={{ top: 24 + i * 28, width: 86 }}
          animate={{ opacity: [0.35, 0.85, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function IconButton({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return <button title={title} onClick={onClick} className="grid h-9 w-9 place-items-center rounded border border-slate-700 text-slate-200 hover:border-cyan/60 hover:text-cyan">{children}</button>;
}
