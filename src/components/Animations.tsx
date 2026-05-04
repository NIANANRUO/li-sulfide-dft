"use client";

import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard, Tag } from "./UI";
import { ResearchDemoFrame, ResearchDemoLabel, ResearchDemoNode, ResearchDemoPanel } from "@/components/ResearchDemoFrame";

const species = [
  { name: "S8", stage: "初始硫环", solubility: "低", impact: "尚未产生明显穿梭", capacity: "高理论容量来源", analysis: "XRD/Raman/分子优化" },
  { name: "Li2S8", stage: "高阶 LiPS", solubility: "高", impact: "易溶解并穿梭", capacity: "液相平台贡献", analysis: "UV-vis/吸附能" },
  { name: "Li2S6", stage: "高阶 LiPS", solubility: "高", impact: "穿梭显著", capacity: "液相氧化还原", analysis: "XPS/Bader/差分电荷" },
  { name: "Li2S4", stage: "中间体", solubility: "较高", impact: "穿梭与转化竞争", capacity: "关键转化节点", analysis: "自由能/NEB" },
  { name: "Li2S2", stage: "低阶固相", solubility: "低", impact: "穿梭减弱", capacity: "固相沉积过程", analysis: "Li2S 成核/COHP" },
  { name: "Li2S", stage: "最终放电产物", solubility: "低", impact: "绝缘沉积影响极化", capacity: "深度放电容量", analysis: "GCD/NEB 分解" }
];

export function ReactionAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const active = species[step];

  function move(direction: "charge" | "discharge") {
    setPlaying(true);
    const next = direction === "discharge" ? Math.min(step + 1, species.length - 1) : Math.max(step - 1, 0);
    setStep(next);
    setTimeout(() => setPlaying(false), 500);
  }

  return (
    <GlassCard>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-cyan">充放电转化动画</p>
          <h3 className="mt-1 text-xl font-semibold text-white">S8 → Li2S8 → Li2S6 → Li2S4 → Li2S2 → Li2S</h3>
        </div>
        <div className="flex gap-2">
          <button className="rounded bg-cyan/15 px-3 py-2 text-sm text-cyan soft-border" onClick={() => move("discharge")}>
            放电
          </button>
          <button className="rounded bg-violet/15 px-3 py-2 text-sm text-violet-200 soft-border" onClick={() => move("charge")}>
            充电
          </button>
          <button className="rounded p-2 soft-border" onClick={() => setStep(0)} title="重播">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="relative mb-6 h-28 rounded-lg border border-slate-700/70 bg-slate-950/50 p-4">
        <div className="absolute left-6 right-6 top-1/2 h-px bg-slate-600" />
        {species.map((item, index) => (
          <button
            key={item.name}
            className="absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border text-xs transition"
            style={{ left: `calc(${(index / (species.length - 1)) * 100}% - 24px)` }}
            onClick={() => setStep(index)}
          >
            <motion.span
              animate={{ scale: index === step && playing ? [1, 1.18, 1] : 1 }}
              className={`grid h-full w-full place-items-center rounded-full ${
                index === step ? "border-cyan bg-cyan/20 text-cyan" : "border-slate-600 bg-slate-900 text-slate-300"
              }`}
            >
              {item.name}
            </motion.span>
          </button>
        ))}
      </div>
      <input
        className="mb-5 w-full accent-cyan"
        type="range"
        min={0}
        max={species.length - 1}
        value={step}
        onChange={(event) => setStep(Number(event.target.value))}
      />
      <div className="grid gap-3 md:grid-cols-5">
        <Metric label="阶段" value={active.stage} />
        <Metric label="溶解性" value={active.solubility} />
        <Metric label="穿梭影响" value={active.impact} />
        <Metric label="容量关系" value={active.capacity} />
        <Metric label="分析方式" value={active.analysis} />
      </div>
    </GlassCard>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-700/70 bg-slate-900/60 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-100">{value}</p>
    </div>
  );
}

export function BatterySchematic() {
  const particles = useMemo(() => Array.from({ length: 7 }, (_, i) => i), []);
  return (
    <GlassCard className="overflow-hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-cyan">锂硫电池结构示意</p>
          <h3 className="text-xl font-semibold text-white">LiPS 生成、迁移与催化剂吸附</h3>
        </div>
        <Tag>CSS + SVG 动画</Tag>
      </div>
      <ResearchDemoFrame title="LiPS 生成、迁移与催化剂吸附" minHeight="18rem" className="p-0">
        <div className="relative h-72 overflow-hidden">
          <ResearchDemoPanel className="absolute inset-y-8 left-6 grid w-20 place-items-center border-slate-300/35 bg-slate-100/10 text-xs font-semibold text-slate-100">
            <span className="mt-24 block">Li 金属负极</span>
          </ResearchDemoPanel>
          <ResearchDemoPanel className="absolute inset-y-8 right-6 grid w-28 place-items-center border-amber-300/35 bg-amber-300/10 text-xs font-semibold text-amber-100">
            <span className="mt-24 block">硫正极 + 催化剂</span>
          </ResearchDemoPanel>
          <ResearchDemoPanel className="absolute inset-y-8 left-32 right-40 border-cyan/20 bg-cyan/[0.055] text-center text-xs text-slate-400">
            <ResearchDemoLabel className="mt-2" tone="cyan">电解液 / LiPS 迁移区域</ResearchDemoLabel>
          </ResearchDemoPanel>
          {particles.map((p) => (
            <motion.div
              key={p}
              className="absolute h-3 w-3 rounded-full bg-violet shadow-[0_0_18px_rgba(167,139,250,.55)]"
              initial={{ right: 122, top: 64 + p * 24 }}
              animate={{ right: [122, 240 + p * 18, 132], top: [64 + p * 24, 80 + p * 18, 82 + p * 20] }}
              transition={{ duration: 7, repeat: Infinity, delay: p * 0.45, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            className="absolute right-28 top-24 h-20 w-20 rounded-full border border-cyan/40 bg-cyan/10 shadow-[0_0_26px_rgba(34,211,238,.28)]"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 288">
            <defs>
              <marker id="batteryArrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#67e8f9" />
              </marker>
            </defs>
            <path d="M585 160 C470 106 390 180 250 128" fill="none" stroke="#67e8f9" strokeWidth="2.4" className="demo-flow" markerEnd="url(#batteryArrowCyan)" />
          </svg>
        </div>
      </ResearchDemoFrame>
    </GlassCard>
  );
}

export function ShuttleEffectAnimation() {
  const [mode, setMode] = useState<"none" | "catalyst">("none");
  const [play, setPlay] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  return (
    <GlassCard>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-cyan">多硫化物穿梭效应动画</p>
          <h3 className="text-xl font-semibold text-white">无催化剂 / 有催化剂对比</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded border border-slate-700 p-1">
            {[
              ["none", "无催化剂"],
              ["catalyst", "有催化剂"]
            ].map(([id, label]) => (
              <button
                key={id}
                className={`rounded px-3 py-2 text-sm ${mode === id ? "bg-cyan/15 text-cyan" : "text-slate-300"}`}
                onClick={() => setMode(id as "none" | "catalyst")}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="rounded p-2 soft-border" onClick={() => setPlay((value) => !value)} title="暂停或播放">
            {play ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="rounded p-2 soft-border" onClick={() => setReplayKey((value) => value + 1)} title="重播">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <ResearchDemoFrame title="多硫化物穿梭效应动画" minHeight="20rem" className="p-0">
        <div className="relative h-80 overflow-hidden">
          <div className="absolute left-5 top-8 h-64 w-20 rounded bg-slate-300 text-center text-xs font-bold text-slate-950">
            <span className="mt-28 block">Li</span>
          </div>
          <div className="absolute right-5 top-8 h-64 w-24 rounded bg-yellow-400/70 text-center text-xs font-bold text-slate-950">
            <span className="mt-28 block">S/C</span>
          </div>
          {mode === "catalyst" && (
            <div className="absolute right-32 top-28 grid h-20 w-20 place-items-center rounded-full border border-cyan/40 bg-cyan/15 text-xs text-cyan">
              催化剂
            </div>
          )}
          {["Li2S6", "Li2S4", "Li2S6", "Li2S4"].map((label, i) => (
            <motion.div
              key={`${label}-${i}-${mode}-${replayKey}`}
              className="absolute rounded-full bg-violet/90 px-2 py-1 text-xs text-white"
              initial={{ right: 110, top: 70 + i * 48 }}
              animate={
                play
                  ? mode === "none"
                    ? { right: [110, 330, 540], opacity: [1, 0.95, 0.45] }
                    : { right: [110, 150, 130], scale: [1, 1.12, 0.82], opacity: [1, 1, 0.7] }
                  : {}
              }
              transition={{ duration: mode === "none" ? 5.6 : 3.8, repeat: Infinity, delay: i * 0.45 }}
            >
              {label}
            </motion.div>
          ))}
        </div>
        </ResearchDemoFrame>
        <div className="rounded-lg border border-slate-700/70 bg-slate-900/50 p-5">
          <h4 className="font-semibold text-white">{mode === "none" ? "无催化剂模式" : "有催化剂模式"}</h4>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {mode === "none"
              ? "长链 Li2S6 / Li2S4 从正极溶解后向锂负极迁移，造成活性物质损失、库伦效率下降和锂负极副反应。"
              : "正极附近催化剂提供极性吸附和活性位点，使 LiPS 被捕获并加速向 Li2S2 / Li2S 转化，从而降低穿梭和极化。"}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export function CatalystAdsorptionAnimation() {
  const [play, setPlay] = useState(true);
  return (
    <GlassCard>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">催化剂吸附与电荷转移动画</h3>
        <button className="rounded p-2 soft-border" onClick={() => setPlay((value) => !value)} title="暂停或播放">
          {play ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <ResearchDemoFrame title="催化剂吸附与电荷转移动画" minHeight="18rem" className="p-0">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute bottom-10 left-20 right-20 h-12 rounded-xl border border-slate-500/45 bg-slate-800/55 shadow-[inset_0_0_22px_rgba(148,163,184,.08)]" />
        <div className="demo-pulse absolute bottom-20 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-cyan bg-cyan/20 text-xs text-cyan">
          M-N4
        </div>
        <motion.div
          className="absolute top-14 rounded-full bg-violet/90 px-3 py-2 text-sm text-white"
          animate={play ? { left: ["12%", "44%", "44%"], top: ["18%", "45%", "45%"] } : {}}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Li2S4
        </motion.div>
        <motion.div
          className="absolute left-[44%] top-[43%] h-24 w-24 rounded-full bg-yellow-300/20 blur-xl"
          animate={play ? { opacity: [0, 0.8, 0.35], scale: [0.6, 1.2, 1] } : {}}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-[52%] top-[48%] h-20 w-20 rounded-full bg-cyan/20 blur-xl"
          animate={play ? { opacity: [0, 0.75, 0.3], scale: [0.6, 1.15, 1] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-28 left-[56%] rounded-full border border-cyan/30 bg-cyan/10 px-2 py-1 text-xs text-cyan"
          animate={play ? { opacity: [0, 1, 0], x: [0, 18, 28] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        >
          e- 转移
        </motion.div>
      </div>
      </ResearchDemoFrame>
    </GlassCard>
  );
}

export function DFTWorkflowAnimation({
  steps,
  active,
  onSelect
}: {
  steps: { id: string; name: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onSelect(step.id)}
          className={`rounded-lg border p-4 text-left transition ${
            active === step.id ? "border-cyan bg-cyan/15 shadow-glow" : "border-slate-700 bg-slate-900/60 hover:border-cyan/40"
          }`}
        >
          <motion.div
            animate={active === step.id ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mb-3 grid h-8 w-8 place-items-center rounded bg-white/5 text-sm text-cyan"
          >
            {index + 1}
          </motion.div>
          <p className="text-sm font-semibold text-white">{step.name}</p>
        </button>
      ))}
    </div>
  );
}
