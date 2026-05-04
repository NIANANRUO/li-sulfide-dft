"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Atom,
  BatteryCharging,
  Beaker,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Database,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers3,
  LineChart as LineChartIcon,
  Network,
  ShieldAlert,
  Sparkles,
  Target,
  TestTube2
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import { ResearchDemoFrame } from "@/components/ResearchDemoFrame";
import {
  ResearchGapItem,
  anodeCouplingChain,
  dftScalePyramid,
  directionTargets,
  highLoadingMechanismChains,
  materialSystems,
  operandoTechniqueRows,
  practicalConditionRows,
  requiredReportingParameters,
  researchDirectionTemplates,
  researchGapItems,
  researchGapPitfalls,
  researchGapScientificChecks,
  researchGapTabs,
  researchMethods,
  schematicNotice
} from "@/data/researchGapsData";

type TabId = (typeof researchGapTabs)[number]["id"];

const tone = {
  cyan: "#38bdf8",
  blue: "#60a5fa",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  slate: "#94a3b8"
};

export function ResearchGapsPanel({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  const active = researchGapTabs.find((item) => item.label === tab) ?? researchGapTabs[0];
  const [selectedGapId, setSelectedGapId] = useState(researchGapItems[0].id);
  const selectedGap = researchGapItems.find((item) => item.id === selectedGapId) ?? researchGapItems[0];
  const selectedCategory = selectedGap.category;

  const panel = useMemo(() => {
    switch (active.id) {
      case "overview":
        return <ResearchGapsOverviewPanel selectedGapId={selectedGapId} onSelectGap={setSelectedGapId} onSelectTab={onSelectTab} />;
      case "practical-parameters":
        return <PracticalGapPanel />;
      case "high-loading-lean-electrolyte":
        return <HighLoadingLeanElectrolyteGapPanel />;
      case "lithium-anode-coupling":
        return <LithiumAnodeCouplingGapPanel />;
      case "catalyst-passivation":
        return <CatalystPassivationGapPanel />;
      case "operando-mechanism":
        return <OperandoMechanismGapPanel />;
      case "dft-multiscale":
        return <DFTMultiscaleGapPanel />;
      case "standardization-open-data":
        return <StandardizationOpenDataGapPanel />;
      case "solid-state-lis":
        return <SolidStateLiSGapPanel />;
      case "direction-generator":
        return <ResearchDirectionGenerator />;
      case "proposal-template":
        return <ResearchProposalTemplatePanel />;
      case "pitfalls":
        return <ResearchGapPitfallsPanel />;
      default:
        return <ResearchGapsOverviewPanel selectedGapId={selectedGapId} onSelectGap={setSelectedGapId} onSelectTab={onSelectTab} />;
    }
  }, [active.id, selectedGapId, onSelectTab]);

  return (
    <div className="flex h-full min-h-[740px] flex-col overflow-hidden">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Tag>研究空白</Tag>
            <Tag>前沿问题</Tag>
            <NoticeBadge />
          </div>
          <h2 className="text-2xl font-semibold text-white">锂硫电池研究空白与未来方向</h2>
          <p className="mt-2 max-w-6xl text-sm leading-7 text-slate-300">{active.title}：{active.description}</p>
        </div>
        <div className="rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-100">
          当前主题：{selectedGap.title}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[17rem_minmax(0,1fr)_22rem]">
        <aside className="min-h-0 overflow-auto rounded-lg border border-blue-500/25 bg-[#061427]/82 p-3">
          <RailTitle icon={<Network size={16} />} title="研究空白分类" />
          <div className="grid gap-2">
            {researchGapItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedGapId(item.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  selectedGapId === item.id
                    ? "border-cyan/70 bg-cyan/15 text-white"
                    : "border-slate-700/60 bg-slate-950/30 text-slate-300 hover:border-cyan/40"
                }`}
              >
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-1 block text-[11px] text-slate-400">{item.importanceLevel} · {categoryLabel(item.category)}</span>
              </button>
            ))}
          </div>
          <FilterBox />
        </aside>

        <main className="min-h-0 overflow-auto pr-1">{panel}</main>

        <aside className="min-h-0 overflow-auto">
          <ResearchGapSidePanel gap={selectedGap} category={selectedCategory} />
        </aside>
      </div>

      <ResearchGapsFooter onSelectTab={onSelectTab} />
    </div>
  );
}

export function ResearchGapsOverviewPanel({
  selectedGapId,
  onSelectGap,
  onSelectTab
}: {
  selectedGapId: string;
  onSelectGap: (id: string) => void;
  onSelectTab?: (tab: string) => void;
}) {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <p className="text-sm leading-7 text-slate-200">
          锂硫电池研究已经在硫宿主、催化剂、隔膜修饰、电解液调控和锂负极保护方面取得大量进展，但距离实际高能量密度电芯仍存在明显断层。当前最重要的研究空白不再只是“如何提高比容量”，而是如何在高硫载量、低 E/S 比、有限锂负极、厚电极、真实电芯条件下，同时实现高硫利用率、低极化、稳定循环和可解释机制。
        </p>
      </GlassCard>
      <div className="grid gap-4 2xl:grid-cols-[1.08fr_.92fr]">
        <ResearchGapMap onSelectTab={onSelectTab} />
        <ResearchGapRadar />
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {researchGapItems.map((gap) => (
          <button
            key={gap.id}
            onClick={() => onSelectGap(gap.id)}
            className={`rounded-lg border p-4 text-left transition ${
              selectedGapId === gap.id
                ? "border-cyan/70 bg-cyan/[0.12] shadow-[0_0_24px_rgba(56,189,248,.18)]"
                : "border-blue-500/25 bg-[#08172d]/86 hover:border-cyan/50"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="font-semibold text-white">{gap.title}</p>
              <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-[11px] text-amber-100">{gap.importanceLevel}</span>
            </div>
            <p className="text-sm leading-6 text-slate-300">{gap.unresolvedProblem}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {gap.relatedModules.slice(0, 3).map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </button>
        ))}
      </div>
      <GapEvidenceStrategyMatrix />
    </div>
  );
}

export function ResearchGapMap({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  const nodes = [
    { label: "实际工况", x: "45%", y: "12%", tab: "实用化参数断层" },
    { label: "高载量/贫电解液", x: "70%", y: "28%", tab: "高载量与贫电解液" },
    { label: "锂负极耦合", x: "77%", y: "66%", tab: "锂负极耦合" },
    { label: "催化剂钝化", x: "45%", y: "78%", tab: "催化剂钝化" },
    { label: "原位机制", x: "18%", y: "62%", tab: "原位机制" },
    { label: "DFT/多尺度", x: "17%", y: "28%", tab: "DFT 与多尺度" },
    { label: "标准化数据", x: "45%", y: "45%", tab: "标准化与数据" }
  ];
  return (
    <ChartShell title="研究空白地图" subtitle="空白不是孤立点：实际参数会同时牵动正极、负极、催化剂、表征和计算模型。">
      <div className="relative h-[26rem] overflow-hidden">
        <svg className="absolute inset-0 h-full w-full">
          {[
            ["45%", "45%", "45%", "12%"],
            ["45%", "45%", "70%", "28%"],
            ["45%", "45%", "77%", "66%"],
            ["45%", "45%", "45%", "78%"],
            ["45%", "45%", "18%", "62%"],
            ["45%", "45%", "17%", "28%"],
            ["70%", "28%", "77%", "66%"],
            ["18%", "62%", "45%", "78%"],
            ["17%", "28%", "45%", "12%"]
          ].map(([x1, y1, x2, y2], index) => (
            <motion.line
              key={`${x1}-${y1}-${x2}-${y2}-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(56,189,248,.36)"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: [0.35, 0.8, 0.45] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.12 }}
            />
          ))}
        </svg>
        {nodes.map((node, index) => (
          <button
            key={node.label}
            onClick={() => onSelectTab?.(node.tab)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-2 text-center text-sm font-semibold shadow-lg transition hover:scale-105 ${
              node.label === "标准化数据"
                ? "border-amber-300/40 bg-amber-300/15 text-amber-100"
                : "border-cyan/35 bg-[#07172c]/95 text-cyan"
            }`}
            style={{ left: node.x, top: node.y }}
          >
            <span className="block">{node.label}</span>
            <span className="mt-1 block text-[10px] font-normal text-slate-400">Gap {index + 1}</span>
          </button>
        ))}
        <div className="absolute bottom-3 left-3 right-3 rounded border border-amber-300/25 bg-amber-300/10 p-2 text-xs text-amber-100">{schematicNotice}</div>
      </div>
    </ChartShell>
  );
}

export function ResearchGapRadar() {
  const data = [
    { subject: "重要性", practical: 96, anode: 90, catalyst: 82 },
    { subject: "未解决程度", practical: 88, anode: 86, catalyst: 80 },
    { subject: "实验难度", practical: 84, anode: 82, catalyst: 72 },
    { subject: "计算难度", practical: 70, anode: 80, catalyst: 88 },
    { subject: "课题潜力", practical: 92, anode: 88, catalyst: 90 }
  ];
  return (
    <ChartShell title="Gap radar / matrix" subtitle="用于估计不同空白的研究价值、难度和论文选题潜力。">
      <div className="h-[26rem]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(148,163,184,.28)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Radar name="实用化参数" dataKey="practical" stroke={tone.cyan} fill={tone.cyan} fillOpacity={0.16} />
            <Radar name="锂负极耦合" dataKey="anode" stroke={tone.amber} fill={tone.amber} fillOpacity={0.15} />
            <Radar name="催化剂钝化" dataKey="catalyst" stroke={tone.violet} fill={tone.violet} fillOpacity={0.16} />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

export function PracticalGapPanel() {
  return (
    <TopicLayout
      icon={<Gauge size={20} />}
      title="温和实验条件 vs 实际目标条件"
      intro="锂硫电池的理论能量密度很高，但实际能量密度受到硫载量、正极硫含量、电解液用量、锂负极过量、集流体、隔膜和封装等多因素影响。单一参数改善不能替代多参数同时严苛化验证。"
      visual={<PracticalConditionMatrix />}
      details={[
        "只提高硫载量，但 E/S 仍很高，并不等于实用化。",
        "只降低 E/S，但硫载量很低，也不能代表高能量密度。",
        "高硫载量 + 低 E/S + 有限锂 + 高硫含量 + 高面积容量才更接近实际评价。"
      ]}
    />
  );
}

function PracticalConditionMatrix() {
  const severity = [
    { name: "只提高硫载量", value: 46 },
    { name: "只降低 E/S", value: 42 },
    { name: "高载量+低E/S", value: 72 },
    { name: "再加入有限锂", value: 86 },
    { name: "接近实际电芯", value: 96 }
  ];
  return (
    <div className="space-y-4">
      <SimpleMatrix headers={["参数", "温和实验条件", "实际目标条件"]} rows={practicalConditionRows} />
      <ChartShell title="单一参数提升 vs 多参数同时严苛化" compact>
        <div className="grid gap-3">
          {severity.map((item) => (
            <div key={item.name} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="text-slate-300">{item.name}</span>
              <span className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.span className="block h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan" initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 0.8 }} />
              </span>
              <span className="text-right text-cyan">{item.value}</span>
            </div>
          ))}
        </div>
      </ChartShell>
    </div>
  );
}

export function HighLoadingLeanElectrolyteGapPanel() {
  return (
    <TopicLayout
      icon={<BatteryCharging size={20} />}
      title="高硫载量与贫电解液叠加后的机制链"
      intro="高硫载量有利于提高面积容量，但会放大电极厚度、电子传输、Li+ 扩散、LiPS 转化和 Li2S 沉积问题。贫电解液有利于提高实际能量密度，却会降低 LiPS 溶解与传输缓冲能力。"
      visual={<MechanismChainPanel chains={highLoadingMechanismChains} />}
      details={["贫电解液下的催化剂有效性评价必须成为默认对照。", "厚电极中的 LiPS 梯度和 Li2S 沉积空间分布是关键机制空白。", "未来需要三相界面、孔结构、导电网络和催化位点协同设计。"]}
    />
  );
}

export function LithiumAnodeCouplingGapPanel() {
  return (
    <TopicLayout
      icon={<ShieldAlert size={20} />}
      title="硫正极与锂负极耦合机制"
      intro="锂硫电池的衰减不是单一正极问题。LiPS 穿梭到锂负极后会导致 SEI 增厚、活性锂消耗、死锂形成和锂枝晶生长，锂负极不稳定又会反过来影响全电池库伦效率、循环寿命和安全性。"
      visual={<AnodeCouplingDiagram />}
      details={["很多工作只研究硫正极催化剂，忽略锂负极状态。", "过量锂负极会掩盖真实负极问题。", "正极催化剂是否减少负极副反应，需要负极 XPS、SEM、有限锂全电池和自放电证据。"]}
    />
  );
}

export function CatalystPassivationGapPanel() {
  return (
    <TopicLayout
      icon={<LineChartIcon size={20} />}
      title="吸附强度-催化性能火山图"
      intro="锂硫电池催化剂设计中常强调 LiPS 吸附能力，但强吸附并不一定意味着高催化性能。未来研究需要从强吸附转向适度吸附、快速转化和抗钝化。"
      visual={<VolcanoChart />}
      details={["过弱吸附无法限制穿梭。", "适度吸附可以固定 LiPS 并促进快速转化。", "过强吸附可能导致脱附困难、活性位点覆盖、Li2S 沉积钝化或不可逆副反应。"]}
    />
  );
}

export function OperandoMechanismGapPanel() {
  return (
    <TopicLayout
      icon={<FlaskConical size={20} />}
      title="非原位 vs 原位/工况表征"
      intro="许多机制结论仍来自非原位 XPS、非原位 Raman、UV-vis 吸附实验或循环后形貌观察。这些方法有价值，但难以完整捕捉 LiPS、Li2S、催化剂价态和锂负极界面的动态演化。"
      visual={<OperandoComparison />}
      details={["高硫载量低 E/S 条件下的 LiPS 真实演化仍不清楚。", "Li2S 在厚电极中的空间沉积分布不清楚。", "原位电池结构与真实电芯仍有差异，结论必须说明边界。"]}
    />
  );
}

export function DFTMultiscaleGapPanel() {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <div className="mb-3 flex items-center gap-2 text-cyan">
          <Layers3 size={20} />
          <p className="font-semibold text-white">计算尺度金字塔</p>
        </div>
        <p className="text-sm leading-7 text-slate-200">
          DFT 是理解 LiPS 吸附、电荷转移、电子结构和反应路径的重要工具，但常规模型通常是理想化、静态、真空或简单溶剂化环境下的原子尺度模型。
        </p>
      </GlassCard>
      <DFTScalePyramid />
      <GapEvidenceStrategyMatrix />
    </div>
  );
}

export function StandardizationOpenDataGapPanel() {
  return (
    <TopicLayout
      icon={<Database size={20} />}
      title="标准化报告清单"
      intro="当前文献中测试条件差异巨大，导致性能难以公平比较。未来领域需要更统一的数据报告规范、性能基准、开放数据集和可复用分析工具。"
      visual={<ReportingChecklist />}
      details={["缺少统一报告模板和性能比较方式。", "很多论文不完整报告 E/S 比、硫含量、锂负极厚度。", "高质量机器学习数据集需要包含负结果、失败条件和完整测试元数据。"]}
    />
  );
}

export function SolidStateLiSGapPanel() {
  const rows = [
    ["三相界面不足", "电子/离子/活性物质接触不连续", "混合离子-电子导电硫正极"],
    ["界面接触差", "固态电解质与硫/碳/催化剂接触不足", "柔性界面层与准固态凝胶"],
    ["反应路径不清", "Li2S 和 LiPS-like 中间体演化证据不足", "原位 Raman/XAS/阻抗联用"],
    ["锂负极不稳", "枝晶、高阻抗和界面副反应仍存在", "人工 SEI 与压力窗口优化"],
    ["加工困难", "厚电极、压力和温度依赖强", "标准化固态全电池协议"]
  ];
  return (
    <TopicLayout
      icon={<Layers3 size={20} />}
      title="固态/准固态 Li-S 的关键空白"
      intro="固态或准固态锂硫电池有望缓解液态电解液中的穿梭效应并提升安全性，但并不意味着问题消失。固态体系面临固-固界面接触差、离子传输慢、界面阻抗高和硫正极反应动力学慢等问题。"
      visual={<SimpleMatrix headers={["空白", "瓶颈", "未来研究方向"]} rows={rows} />}
      details={["固态 Li-S 必须报告压力、温度、固态电解质电导和界面阻抗。", "需要 DFT/MD 界面模型解释离子迁移和界面稳定性。", "适合作为界面工程、准固态凝胶和固态原位表征课题。"]}
    />
  );
}

export function ResearchDirectionGenerator() {
  const [target, setTarget] = useState(directionTargets[1]);
  const [material, setMaterial] = useState(materialSystems[3]);
  const [method, setMethod] = useState(researchMethods[3]);
  const generated = {
    title: `${target}条件下${material}体系的 LiPS 转化、Li2S 成核与机制验证`,
    question: `${material}在${target}场景下是否仍能实现适度 LiPS 吸附、快速转化，并避免活性位点钝化？`,
    hypothesis: `通过${method}与高硫载量低 E/S 电化学验证结合，可区分材料本征催化贡献、传质贡献和测试条件贡献。`,
    experiments: ["结构确认：XRD/XPS/TEM/Raman", "LiPS 相互作用：UV-vis、H 型扩散池、原位 Raman", "循环后分析：XPS、SEM、Li2S 沉积形貌"],
    dft: ["构建有/无缺陷或活性位点 slab", "比较 Li2S6、Li2S4、Li2S 吸附与脱附", "Bader、差分电荷、DOS/COHP", "Li2S 分解或 Li 扩散 NEB"],
    electrochemistry: ["高硫载量 ≥ 4-5 mg cm⁻²", "E/S 梯度和有限锂测试", "GCD、EIS、GITT、Li2S 成核", "面积容量和长循环"],
    caution: "不能只用吸附能或颜色吸附证明催化；必须结合动力学、电化学严苛条件和循环后活性位点证据。"
  };
  return (
    <div className="space-y-4">
      <ChartShell title="课题方向生成流程图" subtitle="从研究空白反向规划科学问题、材料策略、实验、DFT 和电化学验证。">
        <FlowLine steps={["研究空白", "科学问题", "材料策略", "实验表征", "DFT/多尺度", "电化学验证"]} />
      </ChartShell>
      <div className="grid gap-4 2xl:grid-cols-[.86fr_1.14fr]">
        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold text-white">生成器输入</h3>
          <Selector label="研究目标" value={target} options={directionTargets} onChange={setTarget} />
          <Selector label="材料体系" value={material} options={materialSystems} onChange={setMaterial} />
          <Selector label="研究方法" value={method} options={researchMethods} onChange={setMethod} />
        </GlassCard>
        <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
          <p className="text-xs font-semibold text-cyan">生成课题草案</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{generated.title}</h3>
          <InfoBlock title="科学问题" items={[generated.question]} />
          <InfoBlock title="研究假设" items={[generated.hypothesis]} toneName="emerald" />
          <InfoBlock title="关键实验" items={generated.experiments} />
          <InfoBlock title="关键 DFT" items={generated.dft} toneName="violet" />
          <InfoBlock title="电化学验证" items={generated.electrochemistry} toneName="amber" />
          <div className="mt-4 rounded border border-rose-300/25 bg-rose-300/10 p-3 text-sm leading-6 text-rose-100">{generated.caution}</div>
        </GlassCard>
      </div>
    </div>
  );
}

export function ResearchProposalTemplatePanel() {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <h3 className="mb-3 text-lg font-semibold text-white">课题方案必须包含的 15 个部分</h3>
        <div className="grid gap-2 md:grid-cols-3">
          {["课题标题", "研究背景", "当前空白", "核心科学问题", "研究假设", "材料设计策略", "实验合成路线", "结构表征证据链", "电化学验证条件", "DFT 计算方案", "预期结果", "可能风险", "替代方案", "创新点", "严谨性检查"].map((item) => (
            <span key={item} className="rounded border border-blue-500/25 bg-blue-500/10 p-2 text-sm text-blue-100">{item}</span>
          ))}
        </div>
      </GlassCard>
      <div className="grid gap-4 2xl:grid-cols-2">
        {researchDirectionTemplates.map((template) => (
          <GlassCard key={template.id} className="p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyan">{template.targetGap}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{template.title}</h3>
              </div>
              <Tag>论文选题</Tag>
            </div>
            <p className="rounded border border-slate-700/70 bg-slate-950/35 p-3 text-sm leading-6 text-slate-300">{template.scientificQuestion}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <InfoBlock title="材料策略" items={template.materialStrategy} />
              <InfoBlock title="表征证据链" items={template.characterizationPlan} toneName="emerald" />
              <InfoBlock title="电化学条件" items={template.electrochemicalPlan} toneName="amber" />
              <InfoBlock title="DFT 方案" items={template.dftPlan} toneName="violet" />
            </div>
            <InfoBlock title="风险与替代方案" items={[...template.risks, ...template.fallbackStrategies]} toneName="rose" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export function ResearchGapPitfallsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {researchGapPitfalls.map((item, index) => (
          <GlassCard key={item.id} className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded border border-rose-300/30 bg-rose-300/10 text-sm font-semibold text-rose-200">{index + 1}</span>
              <p className="font-semibold text-white">需要避免的表述</p>
            </div>
            <p className="rounded border border-rose-300/25 bg-rose-300/10 p-3 text-sm leading-6 text-rose-100">错误：{item.wrongStatement}</p>
            <p className="mt-3 rounded border border-emerald-300/25 bg-emerald-300/10 p-3 text-sm leading-6 text-emerald-100">正确：{item.rigorousStatement}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.explanation}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <h3 className="mb-3 text-lg font-semibold text-white">严谨性检查清单</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {researchGapScientificChecks.map((item) => (
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

export function GapEvidenceStrategyMatrix() {
  return (
    <GlassCard>
      <h3 className="mb-3 text-lg font-semibold text-white">研究空白-关键问题-实验-DFT-电化学验证矩阵</h3>
      <div className="overflow-x-auto rounded-lg border border-slate-700/70">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-100">
            <tr>{["研究空白", "关键科学问题", "推荐实验", "推荐 DFT / 计算", "电化学验证", "谨慎表达"].map((header) => <th key={header} className="border-b border-slate-700 px-3 py-3">{header}</th>)}</tr>
          </thead>
          <tbody>
            {researchGapItems.slice(0, 8).map((gap) => (
              <tr key={gap.id} className="odd:bg-slate-950/25 even:bg-slate-900/20">
                <td className="border-b border-slate-800 px-3 py-3 font-semibold text-cyan">{gap.title}</td>
                <td className="border-b border-slate-800 px-3 py-3 text-slate-300">{gap.keyQuestions[0]}</td>
                <td className="border-b border-slate-800 px-3 py-3"><ChipList items={gap.recommendedExperiments.slice(0, 3)} /></td>
                <td className="border-b border-slate-800 px-3 py-3"><ChipList items={gap.recommendedDFT.slice(0, 3)} /></td>
                <td className="border-b border-slate-800 px-3 py-3"><ChipList items={gap.recommendedElectrochemistry.slice(0, 3)} /></td>
                <td className="border-b border-slate-800 px-3 py-3 text-amber-100">{gap.cautions[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function ResearchGapSidePanel({ gap }: { gap: ResearchGapItem; category: string }) {
  return (
    <div className="space-y-3">
      <GlassCard className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">为什么这是空白</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{gap.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{gap.whyItMatters}</p>
      </GlassCard>
      <InfoBlockCard title="现有研究做到哪里" items={[gap.currentStatus]} />
      <InfoBlockCard title="关键瓶颈" items={[gap.unresolvedProblem]} toneName="amber" />
      <InfoBlockCard title="需要什么实验" items={gap.recommendedExperiments} toneName="emerald" />
      <InfoBlockCard title="需要什么 DFT / 计算" items={gap.recommendedDFT} toneName="violet" />
      <InfoBlockCard title="电化学验证条件" items={gap.recommendedElectrochemistry} toneName="cyan" />
      <InfoBlockCard title="课题切入点" items={gap.possibleResearchDirections} toneName="emerald" />
      <GlassCard className="border-rose-300/25 bg-rose-300/[0.06] p-4">
        <div className="mb-2 flex items-center gap-2 text-rose-100">
          <AlertTriangle size={16} />
          <p className="font-semibold">谨慎表达</p>
        </div>
        <InfoList items={gap.cautions} />
      </GlassCard>
    </div>
  );
}

function TopicLayout({ icon, title, intro, visual, details }: { icon: React.ReactNode; title: string; intro: string; visual: React.ReactNode; details: string[] }) {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <div className="mb-3 flex items-center gap-2 text-cyan">{icon}<p className="font-semibold text-white">{title}</p></div>
        <p className="text-sm leading-7 text-slate-200">{intro}</p>
      </GlassCard>
      <div className="grid gap-4 2xl:grid-cols-[1.15fr_.85fr]">
        {visual}
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">研究空白如何转为课题</h3>
          <InfoList items={details} />
          <div className="mt-4 rounded border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
            结论需要谨慎表达：单一性能提升、单一吸附能或非原位快照都不能独立构成完整机制证据。
          </div>
        </GlassCard>
      </div>
      <GapEvidenceStrategyMatrix />
    </div>
  );
}

function MechanismChainPanel({ chains }: { chains: typeof highLoadingMechanismChains }) {
  return (
    <ChartShell title="高硫载量/贫电解液机制链动画" subtitle="两类实用化参数叠加后，传质、极化和转化动力学会同步恶化。">
      <div className="space-y-4">
        <AnimatedChain label="高硫载量链" items={chains.loading} color="cyan" />
        <AnimatedChain label="贫电解液链" items={chains.lean} color="amber" />
        <AnimatedChain label="叠加后设计要求" items={chains.coupled} color="emerald" />
      </div>
    </ChartShell>
  );
}

function AnimatedChain({ label, items, color }: { label: string; items: string[]; color: "cyan" | "amber" | "emerald" }) {
  const colorClass = color === "cyan" ? "border-cyan/35 bg-cyan/10 text-cyan" : color === "amber" ? "border-amber-300/35 bg-amber-300/10 text-amber-100" : "border-emerald-300/35 bg-emerald-300/10 text-emerald-100";
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-white">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <span key={`${label}-${item}`} className="flex items-center gap-2">
            <motion.span className={`rounded border px-3 py-2 text-xs ${colorClass}`} animate={{ opacity: [0.65, 1, 0.75] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.16 }}>{item}</motion.span>
            {index < items.length - 1 && <ArrowRight size={15} className="text-slate-500" />}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnodeCouplingDiagram() {
  return (
    <ChartShell title="正负极耦合示意图" subtitle="LiPS 穿梭与锂负极失稳是互相放大的全电池问题。">
      <div className="relative h-[24rem] overflow-hidden">
        <div className="absolute left-8 top-14 h-48 w-24 rounded-lg border border-yellow-300/45 bg-yellow-300/20 text-center text-sm font-semibold text-yellow-100"><span className="mt-20 block">S 正极</span></div>
        <div className="absolute right-8 top-14 h-48 w-24 rounded-lg border border-slate-300/45 bg-slate-200/20 text-center text-sm font-semibold text-slate-100"><span className="mt-20 block">Li 负极</span></div>
        <div className="absolute left-40 right-40 top-14 h-48 rounded border border-blue-500/25 bg-blue-500/[0.06] text-center text-xs text-slate-400"><span className="mt-4 block">隔膜 / 电解液 / LiPS 迁移区域</span></div>
        {["Li2S8", "Li2S6", "Li2S4"].map((item, index) => (
          <motion.span
            key={item}
            className="absolute rounded-full bg-violet-400 px-2 py-1 text-xs text-white"
            initial={{ left: 150, top: 88 + index * 48 }}
            animate={{ left: [150, 345, 560], opacity: [1, 0.9, 0.45] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.4 }}
          >
            {item}
          </motion.span>
        ))}
        <div className="absolute bottom-4 left-4 right-4">
          <FlowLine steps={anodeCouplingChain} dense />
        </div>
      </div>
    </ChartShell>
  );
}

function VolcanoChart() {
  const data = Array.from({ length: 31 }, (_, i) => {
    const x = i / 30;
    const y = Math.max(8, 96 - Math.pow((x - 0.5) * 3.8, 2) * 72);
    return { strength: Number((x * 10).toFixed(1)), effectiveness: Number(y.toFixed(1)) };
  });
  return (
    <ChartShell title="吸附强度-催化性能火山图" subtitle="适度相互作用比单纯强吸附更接近理想催化剂窗口。">
      <ResponsiveContainer width="100%" height={330}>
        <LineChart data={data} margin={{ top: 18, right: 24, bottom: 28, left: 8 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="strength" tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="LiPS-catalyst interaction strength" position="insideBottom" offset={-18} fill="#94a3b8" />
          </XAxis>
          <YAxis domain={[0, 100]} tick={{ fill: "#cbd5e1", fontSize: 12 }}>
            <Label value="Catalytic effectiveness" angle={-90} position="insideLeft" fill="#94a3b8" />
          </YAxis>
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="effectiveness" stroke={tone.cyan} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid gap-2 md:grid-cols-3">
        {["吸附太弱：LiPS 易扩散，穿梭严重", "适度吸附：固定 LiPS 并快速转化", "吸附过强：脱附困难，位点覆盖，催化剂钝化"].map((item) => (
          <div key={item} className="rounded border border-blue-500/25 bg-blue-500/10 p-3 text-sm leading-6 text-blue-100">{item}</div>
        ))}
      </div>
    </ChartShell>
  );
}

function OperandoComparison() {
  return (
    <div className="space-y-4">
      <ChartShell title="非原位 vs 原位/工况" subtitle="非原位能看快照，原位/工况能跟踪反应过程和动态中间体。" compact>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-4">
            <p className="mb-3 font-semibold text-white">非原位：反应前后快照</p>
            <FlowLine steps={["循环前", "拆电池", "清洗/转移", "循环后"]} dense />
            <p className="mt-3 text-sm leading-6 text-slate-400">适合确认终态形貌和组成，但可能受空气暴露、洗涤和转移影响。</p>
          </div>
          <div className="rounded-lg border border-cyan/35 bg-cyan/10 p-4">
            <p className="mb-3 font-semibold text-white">原位/工况：动态追踪</p>
            <FlowLine steps={["放电平台", "LiPS 演化", "Li2S 成核", "充电分解"]} dense />
            <p className="mt-3 text-sm leading-6 text-slate-300">适合捕捉动态中间体、价态变化和界面演化。</p>
          </div>
        </div>
      </ChartShell>
      <SimpleMatrix headers={["技术", "能回答什么", "谨慎点"]} rows={operandoTechniqueRows} />
    </div>
  );
}

function DFTScalePyramid() {
  return (
    <ChartShell title="DFT → AIMD → MD → 介观传质 → 电芯模型 → 数据驱动模型" subtitle="每一层都有能回答的问题，也有不能替代的实验边界。">
      <div className="grid gap-3 lg:grid-cols-2">
        {dftScalePyramid.map((item, index) => (
          <div key={item.level} className="demo-card rounded-xl border border-cyan/20 bg-slate-950/45 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-cyan">{item.level}</p>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/35 bg-cyan/10 text-xs font-semibold text-cyan">{index + 1}</span>
            </div>
            <div className="grid gap-2">
              <p className="rounded-lg border border-blue-300/20 bg-blue-500/10 p-3 text-sm leading-6 text-slate-200">
                <span className="font-semibold text-blue-100">能解决：</span>{item.solves}
              </p>
              <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
                <span className="font-semibold">不能解决：</span>{item.cannot}
              </p>
              <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm leading-6 text-emerald-100">
                <span className="font-semibold">对应实验：</span>{item.experiment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ChartShell>
  );
}

function ReportingChecklist() {
  return (
    <ChartShell title="Li-S 性能论文必要报告参数" subtitle="没有完整元数据，性能比较、机器学习和机制归因都会失真。">
      <div className="grid gap-2 md:grid-cols-3">
        {requiredReportingParameters.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded border border-emerald-300/25 bg-emerald-300/10 p-3 text-sm text-emerald-100">
            <ClipboardList size={15} className="shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </ChartShell>
  );
}

function ResearchGapsFooter({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  return (
    <div className="mt-4 grid gap-3 xl:grid-cols-[1.1fr_.9fr_1fr]">
      <GlassCard className="p-4">
        <h3 className="mb-3 text-base font-semibold text-white">与前面模块的关联</h3>
        <div className="flex flex-wrap gap-2">
          {["关键问题", "催化剂体系", "实验表征", "DFT 计算", "电化学性能"].map((item) => <Tag key={item}>{item}</Tag>)}
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <h3 className="mb-3 text-base font-semibold text-white">可生成课题草案</h3>
        <button onClick={() => onSelectTab?.("方向生成器")} className="inline-flex items-center gap-2 rounded border border-cyan/40 bg-cyan/10 px-3 py-2 text-sm font-semibold text-cyan hover:border-cyan">
          <Sparkles size={15} />
          进入方向生成器
        </button>
      </GlassCard>
      <GlassCard className="p-4">
        <h3 className="mb-3 text-base font-semibold text-white">证据链规划器</h3>
        <p className="text-sm leading-6 text-slate-300">空白 → 科学问题 → 实验表征 → DFT/多尺度 → 电化学严苛验证。</p>
      </GlassCard>
    </div>
  );
}

function FilterBox() {
  return (
    <div className="mt-4 border-t border-slate-700/60 pt-4">
      <RailTitle icon={<Target size={16} />} title="筛选器" />
      <div className="grid gap-3">
        <SmallSelect label="研究难度" options={["高：原位/软包/有限锂", "中：厚电极/低 E/S", "低：标准化对照"]} />
        <SmallSelect label="课题类型" options={["硕士课题", "博士课题", "方法学论文", "数据论文"]} />
        <div className="rounded border border-cyan/25 bg-cyan/10 p-3 text-xs leading-5 text-cyan">
          关联入口：催化剂体系、实验表征、DFT、电化学性能
        </div>
      </div>
    </div>
  );
}

function SimpleMatrix({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700/70">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-slate-900/80 text-slate-100">
          <tr>{headers.map((header) => <th key={header} className="border-b border-slate-700 px-4 py-3 font-semibold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="odd:bg-slate-950/35 even:bg-slate-900/25">
              {row.map((cell) => <td key={cell} className="border-b border-slate-800 px-4 py-3 text-slate-300">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChartShell({ title, subtitle, children, compact = false }: { title: string; subtitle?: string; children: React.ReactNode; compact?: boolean }) {
  return (
    <ResearchDemoFrame title={title} minHeight={compact ? "14rem" : "22rem"} className={compact ? "p-4" : ""}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">科研示意图</p>
            <NoticeBadge />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </ResearchDemoFrame>
  );
}

function FlowLine({ steps, dense = false }: { steps: string[]; dense?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <span key={`${step}-${index}`} className="flex items-center gap-2">
          <span className={`rounded border border-cyan/25 bg-cyan/10 text-cyan ${dense ? "px-2 py-1 text-[11px]" : "px-3 py-2 text-sm"}`}>{step}</span>
          {index < steps.length - 1 && <ArrowRight size={dense ? 12 : 15} className="text-slate-500" />}
        </span>
      ))}
    </div>
  );
}

function Selector({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="mb-4 grid gap-2 text-sm text-slate-300">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 rounded-lg border border-slate-700 bg-slate-950/80 px-3 text-slate-100 outline-none focus:border-cyan">
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function SmallSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="grid gap-1 text-xs text-slate-400">
      {label}
      <select className="h-9 rounded border border-slate-700 bg-slate-950/80 px-2 text-xs text-slate-100 outline-none focus:border-cyan">
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function InfoBlockCard({ title, items, toneName = "cyan" }: { title: string; items: string[]; toneName?: "cyan" | "emerald" | "amber" | "rose" | "violet" }) {
  return (
    <GlassCard className="p-4">
      <InfoBlock title={title} items={items} toneName={toneName} />
    </GlassCard>
  );
}

function InfoBlock({ title, items, toneName = "cyan" }: { title: string; items: string[]; toneName?: "cyan" | "emerald" | "amber" | "rose" | "violet" }) {
  const color = {
    cyan: "text-cyan",
    emerald: "text-emerald-300",
    amber: "text-amber-200",
    rose: "text-rose-200",
    violet: "text-violet-200"
  }[toneName];
  return (
    <div className="mt-3">
      <p className={`mb-2 text-sm font-semibold ${color}`}>{title}</p>
      <ul className="space-y-1.5 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${toneName === "amber" ? "bg-amber-300" : toneName === "rose" ? "bg-rose-300" : toneName === "emerald" ? "bg-emerald-300" : toneName === "violet" ? "bg-violet-300" : "bg-cyan"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{items.map((item) => <span key={item} className="rounded border border-cyan/20 bg-cyan/[0.08] px-2 py-1 text-xs text-cyan">{item}</span>)}</div>;
}

function NoticeBadge() {
  return <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[11px] font-medium text-amber-100">{schematicNotice}</span>;
}

function RailTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
      <span className="text-cyan">{icon}</span>
      {title}
    </div>
  );
}

function categoryLabel(category: ResearchGapItem["category"]) {
  const labels: Record<ResearchGapItem["category"], string> = {
    "practical-parameters": "实用化参数",
    "high-loading-lean-electrolyte": "高载量/贫电解液",
    "lithium-anode-coupling": "锂负极耦合",
    "catalyst-passivation": "催化剂钝化",
    "operando-mechanism": "原位机制",
    "dft-multiscale": "DFT/多尺度",
    "standardization-open-data": "标准化数据",
    "solid-state-lis": "固态 Li-S",
    "research-proposal": "课题设计"
  };
  return labels[category];
}

const tooltipStyle = {
  background: "#020617",
  border: "1px solid rgba(56,189,248,.35)",
  borderRadius: 8,
  color: "#e2e8f0"
};
