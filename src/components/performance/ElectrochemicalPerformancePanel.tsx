"use client";

import type * as React from "react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AlertTriangle, Calculator, CheckCircle2, Gauge, Link2, MousePointerClick, ShieldCheck } from "lucide-react";
import {
  ElectrochemicalTest,
  conditionComparisonRows,
  defaultConditionValues,
  electrochemicalScientificChecks,
  electrochemicalTabs,
  electrochemicalTests,
  performanceMechanismMaps,
  performanceMetrics,
  performancePitfalls,
  practicalConditionCards,
  simulatedDataNotice,
  testingConditions
} from "@/data/electrochemicalPerformanceData";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import { ResearchDemoFrame } from "@/components/ResearchDemoFrame";

const colors = {
  cyan: "#38bdf8",
  blue: "#60a5fa",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  slate: "#94a3b8"
};

export function ElectrochemicalPerformancePanel({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  const activeTab = electrochemicalTabs.find((item) => item.label === tab) ?? electrochemicalTabs[0];
  const [activeTestId, setActiveTestId] = useState("gcd");
  const activeTest = electrochemicalTests.find((item) => item.id === activeTestId) ?? electrochemicalTests[0];

  const panel = useMemo(() => {
    switch (activeTab.id) {
      case "overview":
        return <ElectrochemicalOverviewPanel onSelectTab={onSelectTab} />;
      case "metrics":
        return <PerformanceMetricsPanel />;
      case "gcd":
        return <GCDAnalysisPanel />;
      case "cycling":
        return <CyclingPerformancePanel />;
      case "rate":
        return <RateCapabilityPanel />;
      case "cv":
        return <CVAnalysisPanel />;
      case "eis":
        return <EISAnalysisPanel />;
      case "li2s-nucleation":
        return <Li2SNucleationPerformancePanel />;
      case "symmetric-cell":
        return <SymmetricCellPerformancePanel />;
      case "practical-condition":
        return <PracticalConditionPerformancePanel />;
      case "energy-density":
        return <EnergyDensityEstimatorPanel />;
      case "mechanism-map":
        return <PerformanceMechanismMapPanel />;
      case "pitfalls":
        return <PerformancePitfallsPanel />;
      default:
        return <ElectrochemicalOverviewPanel onSelectTab={onSelectTab} />;
    }
  }, [activeTab.id, onSelectTab]);

  return (
    <div className="flex h-full min-h-[720px] flex-col overflow-hidden">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Tag>电化学性能</Tag>
            <NoticeBadge />
          </div>
          <h2 className="text-2xl font-semibold text-white">锂硫电池电化学性能评价与数据解读</h2>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">{activeTab.title}：{activeTab.description}</p>
        </div>
        <div className="grid gap-2 text-right text-xs text-slate-400">
          <span>当前测试方法</span>
          <span className="text-base font-semibold text-cyan">{activeTest.name}</span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[17rem_minmax(0,1fr)_21rem]">
        <aside className="min-h-0 overflow-auto rounded-lg border border-blue-500/25 bg-[#061427]/80 p-3">
          <RailTitle icon={<Gauge size={16} />} title="测试方法导航" />
          <div className="grid gap-2">
            {electrochemicalTests.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTestId(item.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  activeTestId === item.id
                    ? "border-cyan/70 bg-cyan/15 text-white"
                    : "border-slate-700/60 bg-slate-950/30 text-slate-300 hover:border-cyan/40"
                }`}
              >
                <span className="block font-semibold">{item.name}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">{item.typicalPlot}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-700/60 pt-4">
            <RailTitle icon={<Calculator size={16} />} title="指标选择器" />
            <div className="flex flex-wrap gap-2">
              {performanceMetrics.slice(0, 8).map((item) => (
                <Tag key={item.id}>{item.name}</Tag>
              ))}
            </div>
          </div>
          <div className="mt-4 border-t border-slate-700/60 pt-4">
            <RailTitle icon={<ShieldCheck size={16} />} title="测试条件筛选器" />
            <div className="grid gap-2">
              {testingConditions.slice(0, 6).map((item) => (
                <div key={item.id} className="rounded border border-slate-700/60 bg-slate-950/30 p-2">
                  <p className="text-xs font-semibold text-blue-100">{item.label}</p>
                  <p className="mt-1 text-[11px] leading-4 text-slate-400">{item.rigorousRequirement}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-h-0 overflow-auto pr-1">{panel}</main>

        <aside className="min-h-0 overflow-auto">
          <AnalysisSidePanel test={activeTest} />
        </aside>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-[1.1fr_.9fr_1fr]">
        <PerformanceSummaryStrip />
        <PracticalJudgementCard />
        <ModuleLinkStrip onSelectTab={onSelectTab} />
      </div>
    </div>
  );
}

export function ElectrochemicalOverviewPanel({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <p className="text-sm leading-7 text-slate-200">
          锂硫电池具有很高的理论比容量，但实际性能评价必须同时考虑容量、倍率、循环、库伦效率、极化、面积容量、硫载量、电解液用量和锂负极过量。一个严谨的性能评价不能只展示 mAh g⁻¹，而要说明测试条件和电芯设计参数。
        </p>
      </GlassCard>
      <PerformanceMetricCards />
      <div className="grid gap-4 2xl:grid-cols-[1.15fr_.85fr]">
        <ChartCard title="指标之间的关系" subtitle="比容量需要被硫载量、E/S 比和极化条件重新放回电极语境。">
          <OverviewRadarLikeChart />
        </ChartCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">为什么不能只看 mAh g⁻¹？</h3>
          <InfoList
            items={[
              "mAh g⁻¹_S 通常只基于硫质量，不包含导电剂、粘结剂、集流体、电解液、隔膜、锂负极和封装。",
              "高比容量若来自低硫载量和过量电解液，不能直接说明高实际能量密度。",
              "实际高能量密度要求高硫载量、高正极硫含量、低 E/S 比、有限锂负极、较高面积容量和稳定长循环同时成立。",
              "性能提升只能作为机制支持证据，需要与表征和 DFT 共同解释。"
            ]}
          />
          <button
            onClick={() => onSelectTab?.("实际能量密度估算")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-2 text-sm font-semibold text-cyan hover:border-cyan"
          >
            <Link2 size={15} />
            进入能量密度估算
          </button>
        </GlassCard>
      </div>
    </div>
  );
}

export function PerformanceMetricCards() {
  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
      {performanceMetrics.slice(0, 8).map((metric) => (
        <GlassCard key={metric.id} className="border-blue-500/25 bg-[#08172d]/86 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-white">{metric.name}</p>
              <p className="mt-1 text-xs text-cyan">{metric.symbol ?? metric.id} · {metric.unit}</p>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded border border-cyan/30 bg-cyan/10 text-cyan">
              <Gauge size={16} />
            </span>
          </div>
          {metric.formula && <FormulaPill>{metric.formula}</FormulaPill>}
          <p className="mt-3 text-sm leading-6 text-slate-300">{metric.meaning}</p>
          <p className="mt-3 rounded border border-amber-300/20 bg-amber-300/10 p-2 text-xs leading-5 text-amber-100">{metric.rigorousNote}</p>
        </GlassCard>
      ))}
    </div>
  );
}

export function PerformanceMetricsPanel() {
  return (
    <div className="space-y-4">
      <PerformanceMetricCalculator />
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {performanceMetrics.map((metric) => (
          <GlassCard key={metric.id} className="p-4">
            <p className="text-lg font-semibold text-white">{metric.name}</p>
            <p className="mt-1 text-xs text-cyan">{metric.unit}{metric.symbol ? ` · ${metric.symbol}` : ""}</p>
            {metric.formula && <FormulaPill>{metric.formula}</FormulaPill>}
            <p className="mt-3 text-sm leading-6 text-slate-300">{metric.meaning}</p>
            <InfoBlock title="严谨说明" items={[metric.rigorousNote]} tone="amber" />
            <InfoBlock title="常见误区" items={metric.commonPitfalls} tone="rose" />
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <h3 className="mb-3 text-lg font-semibold text-white">实际能量密度相关参数</h3>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {["硫载量", "正极硫含量", "E/S 比", "N/P 比", "面积容量", "集流体质量", "隔膜质量", "电解液质量", "软包或扣式电池差异"].map((item) => (
            <div key={item} className="rounded border border-blue-500/25 bg-blue-500/10 p-3 text-sm text-blue-100">{item}</div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function PerformanceMetricCalculator() {
  const [specificCapacity, setSpecificCapacity] = useState(1000);
  const [loading, setLoading] = useState(4);
  const [qInitial, setQInitial] = useState(1000);
  const [qN, setQN] = useState(780);
  const [cycles, setCycles] = useState(200);
  const [electrolyte, setElectrolyte] = useState(48);
  const [sulfurMass, setSulfurMass] = useState(8);
  const [cRate, setCRate] = useState(0.2);

  const areal = (specificCapacity * loading) / 1000;
  const retention = (qN / qInitial) * 100;
  const decay = ((1 - qN / qInitial) / cycles) * 100;
  const es = electrolyte / sulfurMass;
  const current = cRate * 1675;

  return (
    <GlassCard className="border-cyan/30 bg-[#061427]/95">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">交互计算器</p>
          <h3 className="mt-1 text-xl font-semibold text-white">面积容量、保持率、E/S 比与 C-rate 换算</h3>
        </div>
        <NoticeBadge />
      </div>
      <div className="grid gap-4 2xl:grid-cols-4">
        <CalculatorGroup title="面积容量" result={`${areal.toFixed(2)} mAh cm⁻²`} formula="Q_areal = Q_specific × sulfur loading / 1000">
          <NumberInput label="比容量 / mAh g⁻¹" value={specificCapacity} onChange={setSpecificCapacity} />
          <NumberInput label="硫载量 / mg cm⁻²" value={loading} onChange={setLoading} />
          <p className="text-xs text-slate-400">示例：1000 × 4 / 1000 = 4 mAh cm⁻²</p>
        </CalculatorGroup>
        <CalculatorGroup title="容量保持率与衰减率" result={`${retention.toFixed(1)}% · ${decay.toFixed(3)}%/cycle`} formula="Retention = Q_n / Q_initial × 100%">
          <NumberInput label="Q_initial / mAh g⁻¹" value={qInitial} onChange={setQInitial} />
          <NumberInput label="Q_n / mAh g⁻¹" value={qN} onChange={setQN} />
          <NumberInput label="循环圈数 n" value={cycles} onChange={setCycles} />
        </CalculatorGroup>
        <CalculatorGroup title="E/S 比" result={`${es.toFixed(1)} μL mg⁻¹`} formula="E/S = electrolyte volume / sulfur mass">
          <NumberInput label="电解液体积 / μL" value={electrolyte} onChange={setElectrolyte} />
          <NumberInput label="硫质量 / mg" value={sulfurMass} onChange={setSulfurMass} />
          <p className="text-xs text-amber-100">低 E/S 更严苛，但会放大传质阻力和极化。</p>
        </CalculatorGroup>
        <CalculatorGroup title="C-rate 换算" result={`${current.toFixed(0)} mA g⁻¹_S`} formula="1C ≈ 1675 mA g⁻¹_S">
          <NumberInput label="C-rate" value={cRate} onChange={setCRate} step={0.1} />
          <p className="text-xs text-slate-400">0.2C ≈ 335 mA g⁻¹_S；文献比较时必须确认基准。</p>
        </CalculatorGroup>
      </div>
    </GlassCard>
  );
}

export function GCDAnalysisPanel() {
  const test = getTest("gcd");
  return (
    <StandardTestPanel
      test={test}
      chart={<GCDInteractiveChart />}
      principle={<PrincipleSchematic title="恒流充放电原理" steps={["恒定电流", "电压随容量变化", "放电平台", "充电平台", "平台极化"]} />}
      extra={<TestingConditionBadgePanel />}
    />
  );
}

export function GCDInteractiveChart() {
  const [mode, setMode] = useState<"platform" | "polarization" | "capacity">("platform");
  return (
    <ChartCard
      title="典型 GCD 充放电曲线"
      subtitle="悬停查看模拟曲线；点击按钮高亮平台、极化或容量贡献区域。"
      action={
        <div className="flex flex-wrap gap-2">
          {[
            ["platform", "平台"],
            ["polarization", "极化"],
            ["capacity", "容量贡献"]
          ].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id as typeof mode)} className={`rounded border px-2.5 py-1 text-xs ${mode === id ? "border-cyan bg-cyan/15 text-cyan" : "border-slate-700 text-slate-300"}`}>
              {label}
            </button>
          ))}
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={gcdData} margin={{ top: 18, right: 26, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="capacity" type="number" domain={[0, 1250]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Capacity / mAh g⁻¹" offset={-12} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis domain={[1.55, 2.85]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Voltage / V" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => typeof value === "number" ? value.toFixed(2) : value} />
          <Legend />
          {mode === "platform" && (
            <>
              <ReferenceArea x1={80} x2={420} y1={2.25} y2={2.42} fill={colors.cyan} fillOpacity={0.14} label={{ value: "S8 → 长链 LiPS", fill: colors.cyan }} />
              <ReferenceArea x1={460} x2={1080} y1={1.95} y2={2.12} fill={colors.emerald} fillOpacity={0.14} label={{ value: "LiPS → Li2S2/Li2S", fill: colors.emerald }} />
            </>
          )}
          {mode === "capacity" && (
            <>
              <ReferenceArea x1={90} x2={430} fill={colors.cyan} fillOpacity={0.12} label={{ value: "第一平台容量贡献", fill: colors.cyan }} />
              <ReferenceArea x1={430} x2={1120} fill={colors.emerald} fillOpacity={0.12} label={{ value: "第二平台容量贡献", fill: colors.emerald }} />
            </>
          )}
          {mode === "polarization" && (
            <>
              <ReferenceLine y={2.10} stroke={colors.emerald} strokeDasharray="4 4" label={{ value: "放电平台", fill: colors.emerald }} />
              <ReferenceLine y={2.35} stroke={colors.amber} strokeDasharray="4 4" label={{ value: "充电平台", fill: colors.amber }} />
            </>
          )}
          <Line type="monotone" dataKey="discharge" name="放电" stroke={colors.emerald} strokeWidth={3} dot={false} connectNulls />
          <Line type="monotone" dataKey="charge" name="充电" stroke={colors.amber} strokeWidth={3} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
        <Tag>第一个放电平台</Tag>
        <Tag>第二个放电平台</Tag>
        <Tag>充电平台</Tag>
        <Tag>平台电压差 / 极化电压</Tag>
      </div>
    </ChartCard>
  );
}

export function CyclingPerformancePanel() {
  const test = getTest("cycling");
  return <StandardTestPanel test={test} chart={<CyclingInteractiveChart />} principle={<PrincipleSchematic title="循环测试读图逻辑" steps={["初始容量", "活化阶段", "稳定循环区间", "容量保持率", "库伦效率"]} />} extra={<TestingConditionBadgePanel />} />;
}

export function CyclingInteractiveChart() {
  return (
    <ChartCard title="循环性能 + 库伦效率双轴图" subtitle="左轴为容量，右轴为库伦效率；必须与测试条件一起解读。">
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={cyclingData} margin={{ top: 18, right: 18, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="cycle" tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Cycle number" offset={-12} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis yAxisId="capacity" domain={[600, 1100]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Specific capacity / mAh g⁻¹" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <YAxis yAxisId="ce" orientation="right" domain={[94, 101]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="CE / %" angle={90} position="insideRight" fill="#94a3b8" />
          </YAxis>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <ReferenceArea x1={1} x2={20} yAxisId="capacity" fill={colors.amber} fillOpacity={0.1} label={{ value: "活化阶段", fill: colors.amber }} />
          <Line yAxisId="capacity" type="monotone" dataKey="discharge" name="放电容量" stroke={colors.emerald} strokeWidth={3} dot={false} />
          <Line yAxisId="capacity" type="monotone" dataKey="charge" name="充电容量" stroke={colors.blue} strokeWidth={2} dot={false} />
          <Line yAxisId="ce" type="monotone" dataKey="ce" name="库伦效率" stroke={colors.amber} strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <MiniStat label="容量保持率" value="约 78%" note="以活化后第 20 圈为初始点" />
        <MiniStat label="平均衰减率" value="约 0.11%/cycle" note="简化平均值，需说明区间" />
        <MiniStat label="CE 稳定性" value="98-99.5%" note="高 CE 仍不能单独证明无穿梭" />
      </div>
    </ChartCard>
  );
}

export function RateCapabilityPanel() {
  const test = getTest("rate");
  return <StandardTestPanel test={test} chart={<RateCapabilityChart />} principle={<PrincipleSchematic title="倍率测试阶段" steps={["0.1C", "0.2C", "0.5C", "1C", "2C", "回到 0.2C"]} />} extra={<TestingConditionBadgePanel />} />;
}

function RateCapabilityChart() {
  return (
    <ChartCard title="倍率性能阶梯图" subtitle="高倍率容量和恢复能力需要结合 GCD 平台极化一起判断。">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={rateData} margin={{ top: 18, right: 20, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="cycle" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
          <YAxis domain={[450, 1150]} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          {rateStages.map((stage) => (
            <ReferenceArea key={stage.label} x1={stage.start} x2={stage.end} fill={stage.color} fillOpacity={0.08} label={{ value: stage.label, fill: stage.color }} />
          ))}
          <Line type="monotone" dataKey="capacity" name="Capacity / mAh g⁻¹" stroke={colors.cyan} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CVAnalysisPanel() {
  const test = getTest("cv");
  return <StandardTestPanel test={test} chart={<CVChart />} principle={<PrincipleSchematic title="CV 原理" steps={["扫描电位", "测量电流响应", "还原峰", "氧化峰", "峰间距"]} />} extra={<TestingConditionBadgePanel />} />;
}

function CVChart({ symmetric = false }: { symmetric?: boolean }) {
  return (
    <ChartCard title={symmetric ? "对称电池 CV 曲线" : "典型 CV 曲线"} subtitle={symmetric ? "用于比较 LiPS 氧化还原动力学趋势。" : "峰位、峰电流和峰间距需要和扫描速率、载量一起报告。"}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={symmetric ? symmetricCvData : cvData} margin={{ top: 18, right: 20, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="voltage" type="number" domain={symmetric ? [-1, 1] : [1.6, 2.8]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Voltage / V" offset={-12} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Current / mA" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          {!symmetric && (
            <>
              <ReferenceLine x={2.32} stroke={colors.cyan} strokeDasharray="4 4" label={{ value: "第一还原峰", fill: colors.cyan }} />
              <ReferenceLine x={2.05} stroke={colors.emerald} strokeDasharray="4 4" label={{ value: "第二还原峰", fill: colors.emerald }} />
              <ReferenceLine x={2.42} stroke={colors.amber} strokeDasharray="4 4" label={{ value: "氧化峰", fill: colors.amber }} />
            </>
          )}
          <Line type="monotone" dataKey="catalyst" name="催化剂电极" stroke={colors.cyan} strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="blank" name="空白对照" stroke={colors.slate} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function EISAnalysisPanel() {
  const test = getTest("eis");
  return <StandardTestPanel test={test} chart={<EISChart />} principle={<EquivalentCircuit />} extra={<TestingConditionBadgePanel />} />;
}

function EISChart() {
  return (
    <ChartCard title="EIS Nyquist 图与等效电路拟合" subtitle="半圆大小只是 Rct 的证据之一，等效电路并非唯一解。">
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 18, right: 20, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="z" type="number" name="Z'" unit=" Ω" domain={[0, 210]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Z' / Ω" offset={-12} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis dataKey="negZi" type="number" name="-Z''" unit=" Ω" domain={[0, 95]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="-Z'' / Ω" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
          <Legend />
          <ReferenceLine x={18} stroke={colors.amber} strokeDasharray="4 4" label={{ value: "Rs", fill: colors.amber }} />
          <Scatter name="催化剂电极" data={eisData.catalyst} fill={colors.cyan} line={{ stroke: colors.cyan, strokeWidth: 2 }} />
          <Scatter name="空白对照" data={eisData.blank} fill={colors.slate} line={{ stroke: colors.slate, strokeWidth: 2 }} />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <MiniStat label="Rs" value="高频截距" note="电解液、隔膜和接触阻抗" />
        <MiniStat label="Rct" value="半圆直径" note="界面电荷转移趋势" />
        <MiniStat label="Warburg" value="低频斜线" note="扩散相关阻抗" />
      </div>
    </ChartCard>
  );
}

export function Li2SNucleationPerformancePanel() {
  const test = getTest("li2s-nucleation");
  return <StandardTestPanel test={test} chart={<Li2SNucleationChart />} principle={<PrincipleSchematic title="Li2S 成核/分解原理" steps={["LiPS 还原", "催化剂表面成核", "Li2S 沉积", "积分沉积容量", "充电分解"]} />} extra={<TestingConditionBadgePanel />} />;
}

function Li2SNucleationChart() {
  return (
    <ChartCard title="Li2S 恒电位沉积曲线" subtitle="峰出现时间、峰电流和积分面积共同反映局部沉积动力学。">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={li2sData} margin={{ top: 18, right: 20, bottom: 22, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Time / s" offset={-12} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Current / mA" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <Tooltip contentStyle={tooltipStyle} />
          <ReferenceLine x={820} stroke={colors.amber} strokeDasharray="4 4" label={{ value: "成核起始点", fill: colors.amber }} />
          <ReferenceLine x={1450} stroke={colors.cyan} strokeDasharray="4 4" label={{ value: "成核峰", fill: colors.cyan }} />
          <Area type="monotone" dataKey="catalyst" name="催化剂电极" stroke={colors.cyan} fill={colors.cyan} fillOpacity={0.18} />
          <Area type="monotone" dataKey="blank" name="空白对照" stroke={colors.slate} fill={colors.slate} fillOpacity={0.08} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SymmetricCellPerformancePanel() {
  const test = getTest("symmetric-cell");
  return <StandardTestPanel test={test} chart={<CVChart symmetric />} principle={<PrincipleSchematic title="对称电池原理" steps={["两个相同催化剂电极", "含 LiPS 电解液", "没有金属 Li 负极参与", "比较氧化还原峰", "辅助判断 LiPS 转化"]} />} extra={<TestingConditionBadgePanel values={[["电极", "催化剂/碳布双电极"], ["电解液", "含 Li2S6 的 DOL/DME"], ["扫描速率", "5 mV s⁻¹"], ["电压窗口", "-1.0-1.0 V"], ["电池类型", "对称电池"], ["温度", "25 °C"]]} />} />;
}

export function PracticalConditionPerformancePanel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {practicalConditionCards.map((item) => (
          <GlassCard key={item.title} className="p-4">
            <p className="text-lg font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-xl font-semibold text-cyan">{item.target}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-4 2xl:grid-cols-[1fr_.9fr]">
        <ChartCard title="温和条件 vs 实际严苛条件" subtitle="实际应用评价不能只看比容量。">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={practicalData} margin={{ top: 18, right: 20, bottom: 22, left: 8 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="mild" name="温和条件" fill={colors.blue} />
              <Bar dataKey="practical" name="严苛条件" fill={colors.amber} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">条件对比表</h3>
          <SimpleTableLite headers={["参数", "温和条件", "实际严苛条件"]} rows={conditionComparisonRows} />
          <p className="mt-3 rounded border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            实际应用评价不能只看比容量，还要看面积容量、E/S 比、硫含量和锂负极过量。
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

export function EnergyDensityEstimatorPanel() {
  const [loading, setLoading] = useState(5);
  const [capacity, setCapacity] = useState(900);
  const [voltage, setVoltage] = useState(2.1);
  const [fraction, setFraction] = useState(75);
  const [es, setEs] = useState(5);
  const [liThickness, setLiThickness] = useState(50);
  const [area, setArea] = useState(10);

  const arealCapacity = (loading * capacity) / 1000;
  const arealEnergy = arealCapacity * voltage;
  const riskScore = (loading >= 4 ? 0 : 2) + (arealCapacity >= 4 ? 0 : 2) + (es <= 6 ? 0 : 2) + (fraction >= 70 ? 0 : 1) + (liThickness <= 50 ? 0 : 1);
  const level = riskScore <= 1 ? "较接近严苛评价" : riskScore <= 4 ? "中等，仍需优化条件" : "温和条件特征明显";
  const totalCapacity = arealCapacity * area;

  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-[#061427]/95">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">简化估算器</p>
            <h3 className="mt-1 text-xl font-semibold text-white">高比容量不等于高实际能量密度</h3>
          </div>
          <NoticeBadge text="教学简化模型，不代表真实软包电芯精确能量密度。" />
        </div>
        <div className="grid gap-4 2xl:grid-cols-[1fr_.9fr]">
          <div className="grid gap-3 md:grid-cols-2">
            <NumberInput label="sulfur loading / mg cm⁻²" value={loading} onChange={setLoading} step={0.1} />
            <NumberInput label="specific capacity / mAh g⁻¹" value={capacity} onChange={setCapacity} />
            <NumberInput label="average discharge voltage / V" value={voltage} onChange={setVoltage} step={0.1} />
            <NumberInput label="sulfur fraction in cathode / wt%" value={fraction} onChange={setFraction} />
            <NumberInput label="E/S ratio / μL mg⁻¹" value={es} onChange={setEs} step={0.5} />
            <NumberInput label="Li thickness / μm" value={liThickness} onChange={setLiThickness} />
            <NumberInput label="cathode area / cm²" value={area} onChange={setArea} />
          </div>
          <div className="grid gap-3">
            <MiniStat label="面积容量" value={`${arealCapacity.toFixed(2)} mAh cm⁻²`} note="Q_areal = Q_specific × sulfur loading / 1000" />
            <MiniStat label="近似面积能量" value={`${arealEnergy.toFixed(2)} mWh cm⁻²`} note="area energy = areal capacity × average voltage" />
            <MiniStat label="电极总容量" value={`${totalCapacity.toFixed(1)} mAh`} note="用于理解面积放大，不是软包能量密度" />
            <MiniStat label="定性评价" value={level} note="真实能量密度需要完整电芯质量和体积核算" />
          </div>
        </div>
      </GlassCard>
      <ChartCard title="电芯质量预算提醒" subtitle="实际能量密度还受到非硫组分强烈影响。">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={massBudgetData} layout="vertical" margin={{ top: 12, right: 20, bottom: 8, left: 70 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="share" name="质量/体积影响权重示意">
              {massBudgetData.map((entry, index) => (
                <Cell key={entry.name} fill={[colors.cyan, colors.blue, colors.amber, colors.emerald, colors.violet, colors.rose][index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

export function PerformanceMechanismMapPanel() {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <p className="text-sm leading-7 text-slate-200">性能-机制对应是“支持关系”，不是单一因果证明。性能提升可能来自导电性、孔结构、硫分散、吸附、催化、电解液用量、硫载量和电极制备差异，需要多证据链共同约束。</p>
      </GlassCard>
      <div className="grid gap-3">
        {performanceMechanismMaps.map((item) => (
          <GlassCard key={item.id} className="p-4">
            <div className="grid gap-4 2xl:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <p className="text-xs text-slate-500">性能信号</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.performanceSignal}</p>
              </div>
              <InfoBlock title="可能机制" items={item.possibleMechanisms} />
              <InfoBlock title="对应表征" items={item.supportingExperiments} tone="emerald" />
              <InfoBlock title="对应 DFT / 注意" items={[...item.supportingDFT, item.caution]} tone="amber" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export function PerformancePitfallsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {performancePitfalls.map((item, index) => (
          <GlassCard key={item.id} className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded border border-rose-300/30 bg-rose-300/10 text-sm font-semibold text-rose-200">{index + 1}</span>
              <p className="font-semibold text-white">{item.wrongConclusion}</p>
            </div>
            <p className="rounded border border-emerald-300/25 bg-emerald-300/10 p-3 text-sm leading-6 text-emerald-100">{item.correctInterpretation}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <h3 className="mb-3 text-lg font-semibold text-white">严谨性检查清单</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {electrochemicalScientificChecks.map((item) => (
            <div key={item} className="flex gap-2 rounded border border-blue-500/25 bg-blue-500/10 p-3 text-sm leading-6 text-blue-100">
              <CheckCircle2 className="mt-1 shrink-0 text-cyan" size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function TestingConditionBadgePanel({ values = defaultConditionValues }: { values?: string[][] }) {
  return (
    <GlassCard className="border-amber-300/25 bg-amber-300/[0.06] p-4">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck size={17} className="text-amber-200" />
        <h3 className="text-base font-semibold text-white">测试条件卡</h3>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {values.map(([label, value]) => (
          <div key={label} className="rounded border border-slate-700/60 bg-slate-950/35 p-2">
            <p className="text-[11px] text-slate-500">{label}</p>
            <p className="mt-1 text-xs font-semibold text-slate-100">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function StandardTestPanel({ test, chart, principle, extra }: { test: ElectrochemicalTest; chart: React.ReactNode; principle: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 2xl:grid-cols-[1fr_.72fr]">
        {chart}
        <div className="space-y-4">
          {principle}
          {extra}
        </div>
      </div>
      <GlassCard>
        <h3 className="mb-3 text-lg font-semibold text-white">分析步骤播放器</h3>
        <StepPlayer steps={test.analysisSteps} />
      </GlassCard>
      <div className="grid gap-4 2xl:grid-cols-3">
        <InfoBlockCard title="能说明什么" items={test.proves} tone="emerald" />
        <InfoBlockCard title="不能说明什么" items={test.cannotProve} tone="amber" />
        <InfoBlockCard title="常见误区" items={test.commonPitfalls} tone="rose" />
      </div>
    </div>
  );
}

function AnalysisSidePanel({ test }: { test: ElectrochemicalTest }) {
  return (
    <div className="space-y-3">
      <GlassCard className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">这项测试测什么</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{test.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{test.purpose}</p>
        <div className="mt-3 grid gap-2 text-xs text-slate-300">
          <span>横轴：{test.xAxis}</span>
          <span>纵轴：{test.yAxis}</span>
        </div>
      </GlassCard>
      <InfoBlockCard title="图形关键区域" items={test.keyFeatures} />
      <InfoBlockCard title="如何分析" items={test.analysisSteps} />
      <InfoBlockCard title="能证明什么" items={test.proves} tone="emerald" />
      <InfoBlockCard title="不能证明什么" items={test.cannotProve} tone="amber" />
      <InfoBlockCard title="与表征和 DFT 对应" items={[...test.relatedCharacterization.map((item) => `表征：${item}`), ...test.relatedDFT.map((item) => `DFT：${item}`)]} tone="cyan" />
      <GlassCard className="border-rose-300/25 bg-rose-300/[0.06] p-4">
        <div className="mb-2 flex items-center gap-2 text-rose-100">
          <AlertTriangle size={16} />
          <p className="font-semibold">机制解释边界</p>
        </div>
        <p className="text-sm leading-6 text-slate-300">性能提升不能直接等同于催化机制成立，必须与结构表征、原位/后解析证据和 DFT 计算共同解释。</p>
      </GlassCard>
    </div>
  );
}

function PrincipleSchematic({ title, steps }: { title: string; steps: string[] }) {
  return (
    <ResearchDemoFrame title={title} compact minHeight="13rem" className="p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <NoticeBadge />
      </div>
      <div className="grid gap-2">
        {steps.map((step, index) => (
          <div key={step} className="demo-card flex items-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 p-2">
            <span className="demo-pulse grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan/35 bg-cyan/15 text-xs font-semibold text-cyan">{index + 1}</span>
            <span className="text-sm text-slate-200">{step}</span>
          </div>
        ))}
      </div>
    </ResearchDemoFrame>
  );
}

function EquivalentCircuit() {
  return (
    <ResearchDemoFrame title="等效电路" compact minHeight="13rem" className="p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">等效电路：Rs-(Rct/CPE)-W</h3>
        <NoticeBadge />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
        {["Rs", "Rct", "CPE", "Warburg"].map((item, index) => (
          <span key={item} className="demo-card rounded-xl border border-cyan/30 bg-cyan/10 px-3 py-2 text-cyan">
            {item}{index < 3 ? " →" : ""}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">等效电路不是唯一解，拟合必须说明测试状态、频率范围和拟合误差。</p>
    </ResearchDemoFrame>
  );
}

function StepPlayer({ steps }: { steps: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-3 2xl:grid-cols-[16rem_1fr]">
      <div className="grid gap-2">
        {steps.map((step, index) => (
          <button key={step} onClick={() => setActive(index)} className={`flex items-center gap-2 rounded border px-3 py-2 text-left text-sm ${active === index ? "border-cyan bg-cyan/15 text-white" : "border-slate-700/60 bg-slate-950/30 text-slate-300"}`}>
            <MousePointerClick size={15} className={active === index ? "text-cyan" : "text-slate-500"} />
            {index + 1}. {step}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-blue-500/25 bg-blue-500/10 p-4">
        <p className="text-xs font-semibold text-cyan">当前步骤</p>
        <p className="mt-2 text-xl font-semibold text-white">{steps[active]}</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">读图时先确认测试条件，再判断曲线特征是否支持动力学、稳定性或实用化结论。单一曲线只能提供支持证据，不能替代多方法验证。</p>
      </div>
    </div>
  );
}

function PerformanceSummaryStrip() {
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-base font-semibold text-white">性能指标总览</h3>
      <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
        {["mAh g⁻¹_S", "mAh cm⁻²", "% retention", "% CE", "V polarization", "μL mg⁻¹", "mg cm⁻²", "%/cycle"].map((item) => (
          <span key={item} className="rounded border border-blue-500/25 bg-blue-500/10 p-2 text-center text-blue-100">{item}</span>
        ))}
      </div>
    </GlassCard>
  );
}

function PracticalJudgementCard() {
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-base font-semibold text-white">实际工况评价</h3>
      <p className="text-sm leading-6 text-slate-300">高能量密度需要同时满足高硫载量、高硫含量、低 E/S、有限 Li、高面积容量和稳定长循环。</p>
    </GlassCard>
  );
}

function ModuleLinkStrip({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  const links = ["关键问题", "实验表征", "DFT 计算"];
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-base font-semibold text-white">相关模块跳转</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((item) => (
          <button key={item} onClick={() => onSelectTab?.("性能-机制对应关系")} className="rounded border border-cyan/35 bg-cyan/10 px-3 py-2 text-sm text-cyan hover:border-cyan">
            {item}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

function OverviewRadarLikeChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={overviewMetricData} margin={{ top: 16, right: 20, bottom: 16, left: 8 }}>
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
        <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="importance" name="评价重要性">
          {overviewMetricData.map((entry, index) => (
            <Cell key={entry.name} fill={[colors.cyan, colors.emerald, colors.amber, colors.blue][index % 4]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartCard({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <ResearchDemoFrame title={title} minHeight="22rem">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">科研示意图</p>
            <NoticeBadge />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </ResearchDemoFrame>
  );
}

function InfoBlockCard({ title, items, tone = "cyan" }: { title: string; items: string[]; tone?: "cyan" | "emerald" | "amber" | "rose" }) {
  return (
    <GlassCard className="p-4">
      <InfoBlock title={title} items={items} tone={tone} />
    </GlassCard>
  );
}

function InfoBlock({ title, items, tone = "cyan" }: { title: string; items: string[]; tone?: "cyan" | "emerald" | "amber" | "rose" }) {
  const toneClass = {
    cyan: "text-cyan",
    emerald: "text-emerald-300",
    amber: "text-amber-200",
    rose: "text-rose-200"
  }[tone];
  return (
    <div className="mt-3">
      <p className={`mb-2 text-sm font-semibold ${toneClass}`}>{title}</p>
      <ul className="space-y-1.5 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === "amber" ? "bg-amber-300" : tone === "rose" ? "bg-rose-300" : tone === "emerald" ? "bg-emerald-300" : "bg-cyan"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormulaPill({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 rounded border border-cyan/25 bg-cyan/10 px-3 py-2 font-mono text-xs text-cyan">{children}</p>;
}

function CalculatorGroup({ title, result, formula, children }: { title: string; result: string; formula: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-blue-500/25 bg-slate-950/35 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-cyan">{result}</p>
      <FormulaPill>{formula}</FormulaPill>
      <div className="mt-3 grid gap-3">{children}</div>
    </div>
  );
}

function NumberInput({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return (
    <label className="grid gap-1 text-xs text-slate-400">
      {label}
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-10 rounded border border-slate-700 bg-slate-950/80 px-3 text-sm text-slate-100 outline-none focus:border-cyan"
      />
    </label>
  );
}

function MiniStat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded border border-blue-500/25 bg-blue-500/10 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      {note && <p className="mt-1 text-xs leading-5 text-slate-400">{note}</p>}
    </div>
  );
}

function NoticeBadge({ text = simulatedDataNotice }: { text?: string }) {
  return <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[11px] font-medium text-amber-100">{text}</span>;
}

function RailTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
      <span className="text-cyan">{icon}</span>
      {title}
    </div>
  );
}

function SimpleTableLite({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700/70">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-slate-900/80 text-slate-100">
          <tr>{headers.map((header) => <th key={header} className="border-b border-slate-700/70 px-3 py-2 font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="odd:bg-slate-950/30 even:bg-slate-900/20">
              {row.map((cell) => <td key={cell} className="border-b border-slate-800/70 px-3 py-2 text-slate-300">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getTest(id: string) {
  return electrochemicalTests.find((item) => item.id === id) ?? electrochemicalTests[0];
}

const tooltipStyle = {
  background: "#020617",
  border: "1px solid rgba(56,189,248,.35)",
  borderRadius: 8,
  color: "#e2e8f0"
};

const gcdData = [
  { capacity: 0, discharge: 2.45, charge: null },
  { capacity: 100, discharge: 2.36, charge: null },
  { capacity: 300, discharge: 2.33, charge: null },
  { capacity: 450, discharge: 2.20, charge: null },
  { capacity: 650, discharge: 2.08, charge: null },
  { capacity: 900, discharge: 2.04, charge: null },
  { capacity: 1120, discharge: 1.92, charge: 2.05 },
  { capacity: 980, discharge: null, charge: 2.22 },
  { capacity: 720, discharge: null, charge: 2.34 },
  { capacity: 420, discharge: null, charge: 2.39 },
  { capacity: 120, discharge: null, charge: 2.48 },
  { capacity: 0, discharge: null, charge: 2.64 }
];

const cyclingData = Array.from({ length: 51 }, (_, i) => {
  const cycle = i * 4 + 1;
  const activation = cycle < 21 ? 45 * Math.sin(cycle / 8) : 0;
  const discharge = 1010 - cycle * 1.05 + activation;
  return {
    cycle,
    discharge: Math.round(discharge),
    charge: Math.round(discharge * (0.985 + Math.sin(cycle / 25) * 0.004)),
    ce: Number((98.2 + Math.min(cycle, 80) * 0.012 + Math.sin(cycle / 12) * 0.25).toFixed(2))
  };
});

const rateStages = [
  { start: 1, end: 8, label: "0.1C", color: colors.cyan },
  { start: 9, end: 16, label: "0.2C", color: colors.emerald },
  { start: 17, end: 24, label: "0.5C", color: colors.blue },
  { start: 25, end: 32, label: "1C", color: colors.amber },
  { start: 33, end: 40, label: "2C", color: colors.rose },
  { start: 41, end: 48, label: "回到 0.2C", color: colors.violet }
];

const rateData = Array.from({ length: 48 }, (_, i) => {
  const cycle = i + 1;
  const stage = rateStages.find((item) => cycle >= item.start && cycle <= item.end) ?? rateStages[0];
  const base: Record<string, number> = { "0.1C": 1040, "0.2C": 965, "0.5C": 845, "1C": 710, "2C": 560, "回到 0.2C": 930 };
  return { cycle, capacity: Math.round(base[stage.label] - (cycle - stage.start) * 4 + Math.sin(cycle) * 10), rate: stage.label };
});

const cvData = Array.from({ length: 100 }, (_, i) => {
  const voltage = 1.6 + i * 0.012;
  const catalyst = gaussian(voltage, 2.42, 0.055, 1.0) - gaussian(voltage, 2.31, 0.05, 0.75) - gaussian(voltage, 2.05, 0.06, 1.15);
  const blank = gaussian(voltage, 2.48, 0.075, 0.65) - gaussian(voltage, 2.26, 0.07, 0.45) - gaussian(voltage, 1.98, 0.08, 0.78);
  return { voltage: Number(voltage.toFixed(2)), catalyst: Number(catalyst.toFixed(3)), blank: Number(blank.toFixed(3)) };
});

const symmetricCvData = Array.from({ length: 100 }, (_, i) => {
  const voltage = -1 + i * 0.02;
  const catalyst = gaussian(voltage, 0.38, 0.18, 0.95) - gaussian(voltage, -0.42, 0.18, 0.9);
  const blank = gaussian(voltage, 0.46, 0.24, 0.52) - gaussian(voltage, -0.5, 0.24, 0.48);
  return { voltage: Number(voltage.toFixed(2)), catalyst: Number(catalyst.toFixed(3)), blank: Number(blank.toFixed(3)) };
});

const eisData = {
  catalyst: Array.from({ length: 36 }, (_, i) => {
    const theta = Math.PI * (i / 26);
    const r = 42;
    const z = 18 + r * (1 - Math.cos(theta)) + Math.max(0, i - 26) * 8;
    const negZi = Math.max(0, r * Math.sin(theta)) + Math.max(0, i - 26) * 4.5;
    return { z: Number(z.toFixed(1)), negZi: Number(negZi.toFixed(1)) };
  }),
  blank: Array.from({ length: 36 }, (_, i) => {
    const theta = Math.PI * (i / 26);
    const r = 66;
    const z = 20 + r * (1 - Math.cos(theta)) + Math.max(0, i - 26) * 9;
    const negZi = Math.max(0, r * Math.sin(theta)) + Math.max(0, i - 26) * 5;
    return { z: Number(z.toFixed(1)), negZi: Number(negZi.toFixed(1)) };
  })
};

const li2sData = Array.from({ length: 60 }, (_, i) => {
  const time = i * 60;
  const catalyst = time < 780 ? 0.03 : 0.03 + gaussian(time, 1450, 360, 0.86) + Math.max(0, 0.18 - (time - 1700) / 9000);
  const blank = time < 1080 ? 0.02 : 0.02 + gaussian(time, 1900, 500, 0.46) + Math.max(0, 0.08 - (time - 2100) / 12000);
  return { time, catalyst: Number(catalyst.toFixed(3)), blank: Number(blank.toFixed(3)) };
});

const practicalData = [
  { name: "硫载量", mild: 2, practical: 5 },
  { name: "面积容量", mild: 1.6, practical: 4.5 },
  { name: "E/S 严苛度", mild: 2, practical: 7 },
  { name: "Li 限制", mild: 1, practical: 6 },
  { name: "极化风险", mild: 2, practical: 8 }
];

const overviewMetricData = [
  { name: "比容量", importance: 78 },
  { name: "面积容量", importance: 92 },
  { name: "硫载量", importance: 94 },
  { name: "E/S", importance: 96 },
  { name: "N/P", importance: 88 },
  { name: "CE", importance: 84 },
  { name: "极化", importance: 90 },
  { name: "衰减率", importance: 86 }
];

const massBudgetData = [
  { name: "硫", share: 28 },
  { name: "导电剂/粘结剂", share: 10 },
  { name: "集流体", share: 15 },
  { name: "隔膜", share: 12 },
  { name: "电解液", share: 20 },
  { name: "锂负极/封装", share: 15 }
];

function gaussian(x: number, mu: number, sigma: number, amp: number) {
  return amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
}
