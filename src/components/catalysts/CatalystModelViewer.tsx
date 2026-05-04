"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, FileQuestion, FileText, Info, Layers3, ShieldCheck, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { CatalystModelData, ModelAccuracyLevel, SchematicType } from "@/data/catalystModelsData";
import { ResearchDemoFrame } from "@/components/ResearchDemoFrame";
import { GlassCard, InfoList, Tag } from "@/components/UI";

const accuracyLabels: Record<ModelAccuracyLevel, string> = {
  schematic: "机制示意",
  representative: "代表性模型",
  "real-dft-structure": "真实 DFT 结构"
};

const accuracyNotes: Record<ModelAccuracyLevel, string> = {
  schematic: "当前图为机制示意图，用于解释活性位点和作用机制，不代表真实优化结构。",
  representative: "当前图用于说明常见 DFT 建模思路，真实结构需由具体 POSCAR/CIF/XYZ 文件确定。",
  "real-dft-structure": "当前图来自真实结构文件，可用于展示实际计算模型；仍需确认文件来源、优化状态和吸附物种。"
};

export function CatalystModelViewer({ model }: { model: CatalystModelData }) {
  const hasStructureFile = model.visualizationType === "structure-file" && Boolean(model.structureFile);
  const shouldUseStructure = hasStructureFile && model.accuracyLevel === "real-dft-structure";
  const fallbackToSchematic = model.visualizationType === "structure-file" && !model.structureFile;

  return (
    <GlassCard className="border-blue-500/30 bg-[#07162c]/92">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan">{model.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{model.name}</h3>
        </div>
        <AccuracyBadge level={model.accuracyLevel} />
      </div>

      {fallbackToSchematic && (
        <div className="mb-3 rounded-lg border border-amber-400/35 bg-amber-400/10 px-3 py-2 text-sm leading-6 text-amber-50">
          未检测到真实结构文件，已切换为机制示意图。
        </div>
      )}

      <div className="grid gap-4">
        <div className="min-w-0">
          <ResearchDemoFrame title={model.name} minHeight="220px" className="p-4">
            {shouldUseStructure ? <StructureViewer model={model} /> : <SchematicViewer type={model.schematicType} />}
          </ResearchDemoFrame>
          <div className="mt-3 rounded-lg border border-cyan/25 bg-cyan/10 p-3 text-sm leading-6 text-cyan-50">
            <div className="mb-1 flex items-center gap-2 font-semibold text-cyan">
              <Info size={16} />
              结构类型说明
            </div>
            {accuracyNotes[model.accuracyLevel]}
          </div>
        </div>

        <div className="grid min-w-0 gap-3 lg:grid-cols-2">
          <StatusPanel model={model} />
          <Legend type={model.schematicType} isStructure={shouldUseStructure} />
          <div className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
            <p className="mb-2 text-sm font-semibold text-white">活性位点说明</p>
            <p className="text-sm leading-6 text-slate-300">{model.activeSiteDescription}</p>
          </div>
          <div className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
            <p className="mb-2 text-sm font-semibold text-white">模型说明</p>
            <p className="text-sm leading-6 text-slate-300">{model.modelDescription}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <InfoColumn title="科学提示" items={model.scientificNotes} tone="cyan" />
        <InfoColumn title="局限性说明" items={model.limitations} tone="amber" />
        <InfoColumn title="验证清单" items={model.validationChecklist} tone="emerald" />
      </div>
    </GlassCard>
  );
}

function AccuracyBadge({ level }: { level: ModelAccuracyLevel }) {
  const className =
    level === "real-dft-structure"
      ? "border-emerald-300/50 bg-emerald-400/15 text-emerald-100"
      : level === "representative"
        ? "border-blue-300/50 bg-blue-400/15 text-blue-100"
        : "border-amber-300/50 bg-amber-400/15 text-amber-100";

  return (
    <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${className}`}>
      <ShieldCheck size={14} />
      {accuracyLabels[level]}
    </span>
  );
}

function StructureViewer({ model }: { model: CatalystModelData }) {
  return (
    <div className="grid min-h-[238px] place-items-center text-center">
      <div>
        <FileText className="mx-auto text-emerald-300" size={52} />
        <p className="mt-3 text-lg font-semibold text-white">真实结构文件渲染入口</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          文件：{model.structureFile}，格式：{model.structureFileFormat.toUpperCase()}
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          本组件不会随机生成坐标。后续接入 POSCAR/CIF/XYZ/PDB 解析器后，仅从该文件读取原子坐标进行渲染。
        </p>
      </div>
    </div>
  );
}

function SchematicViewer({ type }: { type: SchematicType }) {
  const content = schematicContent[type] ?? schematicContent.placeholder;
  return (
    <div className="flex min-h-[190px] flex-col justify-between">
      <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-100">
        示意图，不代表真实优化结构。
      </div>
      <MechanismDiagram type={type} />
      <div className="my-4 grid gap-3 md:grid-cols-3">
        {content.steps.map((step, index) => (
          <div key={step.title} className="grid grid-cols-[2.3rem_1fr] items-start gap-3">
            <span className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-bold ${content.colors[index % content.colors.length]}`}>{index + 1}</span>
            <div className="rounded-lg border border-slate-700/70 bg-slate-900/45 p-3">
              <p className="font-semibold text-white">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </div>
  );
}

function MechanismDiagram({ type }: { type: SchematicType }) {
  const diagrams: Record<SchematicType, React.ReactNode> = {
    "single-atom": (
      <DiagramFrame title="单原子位点调控 LiPS 转化">
        <SiteBlock label="M-Nx/C 位点" tone="cyan" />
        <FlowArrow label="LiPS 接近" />
        <SiteBlock label="M-S / Li-N 相互作用" tone="blue" />
        <FlowArrow label="电荷转移" />
        <SiteBlock label="Li2S 成核/分解" tone="emerald" />
      </DiagramFrame>
    ),
    "dual-atom": (
      <DiagramFrame title="相邻双金属位点协同">
        <SiteBlock label="M1 位点" tone="cyan" />
        <BridgeBlock top="LiPS 桥连吸附" bottom="Li 端 / S 端双点稳定" />
        <SiteBlock label="M2 位点" tone="fuchsia" />
        <FlowArrow label="协同降低能垒" />
        <SiteBlock label="快速转化" tone="emerald" />
      </DiagramFrame>
    ),
    heterostructure: (
      <DiagramFrame title="异质界面电荷重分布">
        <PhaseBlock label="相 A" tone="blue" />
        <InterfaceBlock label="界面区" />
        <PhaseBlock label="相 B" tone="emerald" />
        <FlowArrow label="内建电场 / 功函数差" />
        <SiteBlock label="界面优先吸附 LiPS" tone="cyan" />
      </DiagramFrame>
    ),
    "metal-oxide-slab": (
      <DiagramFrame title="氧化物极性表面与氧空位">
        <SurfaceBand label="金属氧化物表面" accent="O vacancy" />
        <FlowArrow label="极性吸附" />
        <SiteBlock label="LiPS 固定" tone="amber" />
        <FlowArrow label="可变价/缺陷态" />
        <SiteBlock label="转化动力学改善" tone="emerald" />
      </DiagramFrame>
    ),
    "metal-sulfide-slab": (
      <DiagramFrame title="硫化物边缘/硫空位催化">
        <SurfaceBand label="金属硫化物表面" accent="S vacancy / edge" />
        <FlowArrow label="S-S 键活化" />
        <SiteBlock label="LiPS 转化" tone="cyan" />
        <FlowArrow label="沉积/分解" />
        <SiteBlock label="Li2S" tone="emerald" />
      </DiagramFrame>
    ),
    "metal-nitride-slab": (
      <DiagramFrame title="氮化物导电催化通路">
        <SurfaceBand label="金属氮化物表面" accent="M-N 位点" />
        <FlowArrow label="快速电子传输" />
        <SiteBlock label="界面电荷转移" tone="blue" />
        <FlowArrow label="降低极化" />
        <SiteBlock label="LiPS 转化" tone="emerald" />
      </DiagramFrame>
    ),
    "phosphide-carbide-slab": (
      <DiagramFrame title="磷化物/碳化物电子结构调控">
        <SurfaceBand label="MPx / MCx 导电相" accent="M-P / M-C" />
        <FlowArrow label="调控金属中心" />
        <SiteBlock label="LiPS 吸附-转化" tone="cyan" />
        <FlowArrow label="电荷转移" />
        <SiteBlock label="低极化" tone="emerald" />
      </DiagramFrame>
    ),
    "mxene-surface": (
      <DiagramFrame title="MXene 终止基与层间限域">
        <LayerStack />
        <FlowArrow label="-O/-OH/-F 调控" />
        <SiteBlock label="LiPS 层间限域" tone="cyan" />
        <FlowArrow label="二维导电骨架" />
        <SiteBlock label="界面转化" tone="emerald" />
      </DiagramFrame>
    ),
    "defect-carbon": (
      <DiagramFrame title="缺陷/掺杂碳从限域到吸附">
        <PorousHost />
        <FlowArrow label="N/S/P/B 掺杂" />
        <SiteBlock label="极性位点增强" tone="cyan" />
        <FlowArrow label="导电网络" />
        <SiteBlock label="高硫负载支撑" tone="emerald" />
      </DiagramFrame>
    ),
    multicomponent: (
      <DiagramFrame title="多组分局部位点协同">
        <MultiSiteCluster />
        <FlowArrow label="多中心调控" />
        <SiteBlock label="吸附强度分布" tone="blue" />
        <FlowArrow label="路径筛选" />
        <SiteBlock label="协同转化" tone="emerald" />
      </DiagramFrame>
    ),
    "lips-adsorption": (
      <DiagramFrame title="LiPS 吸附-转化机制">
        <SiteBlock label="Li2S6 / Li2S4" tone="amber" />
        <FlowArrow label="适度吸附" />
        <SiteBlock label="活性位点" tone="cyan" />
        <FlowArrow label="Li2S2 -> Li2S" />
        <SiteBlock label="成核/分解" tone="emerald" />
      </DiagramFrame>
    ),
    placeholder: (
      <DiagramFrame title="结构文件缺失占位">
        <SiteBlock label="未检测到结构文件" tone="amber" />
        <FlowArrow label="禁止伪造坐标" />
        <SiteBlock label="仅展示机制示意" tone="cyan" />
      </DiagramFrame>
    )
  };

  return <div className="mt-4">{diagrams[type] ?? diagrams.placeholder}</div>;
}

function DiagramFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="demo-card rounded-xl border border-cyan/25 bg-slate-950/45 p-3">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-300">
        <Zap size={14} className="text-cyan" />
        {title}
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {children}
      </div>
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-cyan md:flex-col">
      <ArrowRight size={18} />
      <span className="max-w-24 text-center leading-4">{label}</span>
    </div>
  );
}

function SiteBlock({ label, tone }: { label: string; tone: "cyan" | "blue" | "emerald" | "amber" | "fuchsia" }) {
  const toneMap = {
    cyan: "border-cyan/35 bg-cyan/10 text-cyan",
    blue: "border-blue-300/35 bg-blue-500/10 text-blue-100",
    emerald: "border-emerald-300/35 bg-emerald-500/10 text-emerald-100",
    amber: "border-amber-300/35 bg-amber-400/10 text-amber-100",
    fuchsia: "border-fuchsia-300/35 bg-fuchsia-500/10 text-fuchsia-100"
  };
  return (
    <div className={`demo-node min-h-20 rounded-xl border p-3 text-center text-sm font-semibold leading-6 ${toneMap[tone]}`}>
      {label}
    </div>
  );
}

function BridgeBlock({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-lg border border-cyan/30 bg-cyan/10 p-3 text-center">
      <p className="text-sm font-semibold text-cyan">{top}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{bottom}</p>
    </div>
  );
}

function PhaseBlock({ label, tone }: { label: string; tone: "blue" | "emerald" }) {
  const cls = tone === "blue" ? "border-blue-300/35 bg-blue-500/10 text-blue-100" : "border-emerald-300/35 bg-emerald-500/10 text-emerald-100";
  return <div className={`min-h-20 rounded-lg border p-3 text-center text-sm font-semibold ${cls}`}>{label}<div className="mt-2 h-2 rounded bg-current opacity-30" /></div>;
}

function InterfaceBlock({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-cyan/40 bg-cyan/10 p-3 text-center text-sm font-semibold text-cyan shadow-[0_0_28px_rgba(56,189,248,.18)]">
      {label}
      <p className="mt-1 text-xs font-normal text-slate-300">charge redistribution</p>
    </div>
  );
}

function SurfaceBand({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="rounded-lg border border-slate-600/70 bg-slate-800/45 p-3">
      <p className="text-center text-sm font-semibold text-white">{label}</p>
      <div className="mt-3 grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className={`h-3 rounded ${index === 3 ? "bg-amber-300" : "bg-cyan/35"}`} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-amber-100">{accent}</p>
    </div>
  );
}

function LayerStack() {
  return (
    <div className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 p-3">
      <p className="text-center text-sm font-semibold text-emerald-100">MXene layers</p>
      <div className="mt-3 space-y-1.5">
        {[0, 1, 2].map((item) => <div key={item} className="h-3 rounded bg-cyan/40" />)}
      </div>
      <p className="mt-2 text-center text-xs text-slate-300">Tx termination</p>
    </div>
  );
}

function PorousHost() {
  return (
    <div className="rounded-lg border border-slate-500/50 bg-slate-800/45 p-3">
      <p className="text-center text-sm font-semibold text-white">porous carbon host</p>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} className={`h-3 rounded-full ${index % 5 === 2 ? "bg-cyan/70" : "bg-slate-500/45"}`} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-cyan">defect / dopant sites</p>
    </div>
  );
}

function MultiSiteCluster() {
  return (
    <div className="rounded-lg border border-rose-300/35 bg-rose-500/10 p-3">
      <p className="text-center text-sm font-semibold text-rose-100">multi-metal local sites</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {["Fe", "Co", "Ni", "Mn", "Mo", "V"].map((item) => (
          <span key={item} className="rounded border border-cyan/30 bg-cyan/10 px-2 py-1 text-xs text-cyan">{item}</span>
        ))}
      </div>
    </div>
  );
}

const schematicContent: Record<SchematicType, { steps: { title: string; desc: string }[]; tags: string[]; colors: string[] }> = {
  "single-atom": {
    steps: [
      { title: "孤立活性中心", desc: "用“金属中心 + 配位环境”表达 M-Nx/C 建模概念，不绘制具体键长或原子坐标。" },
      { title: "LiPS 接近位点", desc: "示意 Li 端或 S 端可能接近金属中心或邻近配位原子。" },
      { title: "电子结构调控", desc: "强调电荷转移和反应路径分析需要真实 DFT 模型验证。" }
    ],
    tags: ["M-N4/C 概念", "单原子证据链", "非真实结构"],
    colors: ["border-cyan/50 bg-cyan/15 text-cyan", "border-blue-300/50 bg-blue-500/15 text-blue-100"]
  },
  "dual-atom": {
    steps: [
      { title: "相邻双位点", desc: "只表示 M1 与 M2 需要被证明相邻，不给出 M-M 距离。" },
      { title: "桥连吸附假设", desc: "提示需要比较单点吸附、桥连吸附、Li/S 双端稳定等构型。" },
      { title: "协同作用验证", desc: "协同必须由表征、对照实验和 DFT 自由能路径共同支持。" }
    ],
    tags: ["M1-M2 协同", "桥连构型", "非真实结构"],
    colors: ["border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  heterostructure: {
    steps: [
      { title: "两相接触", desc: "以界面区域表达异质结，不画晶格匹配后的真实界面结构。" },
      { title: "电荷重分布", desc: "示意功函数差异或界面电荷转移的研究假设。" },
      { title: "界面对照", desc: "真实计算需比较界面、单相 A、单相 B 上的 LiPS 吸附和转化。" }
    ],
    tags: ["界面作用", "功函数", "非晶格模型"],
    colors: ["border-blue-300/50 bg-blue-500/15 text-blue-100", "border-emerald-300/50 bg-emerald-500/15 text-emerald-100"]
  },
  "metal-oxide-slab": {
    steps: [
      { title: "极性氧化物表面", desc: "只说明金属位点、氧位点和极性吸附，不表示具体晶面。" },
      { title: "氧空位假设", desc: "用缺陷概念提示氧空位可能改变电子态。" },
      { title: "导电短板", desc: "提示氧化物常需与导电碳、MXene 或导电相复合。" }
    ],
    tags: ["氧空位", "极性吸附", "非 slab 坐标"],
    colors: ["border-amber-300/50 bg-amber-400/15 text-amber-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "metal-sulfide-slab": {
    steps: [
      { title: "晶格硫 vs 反应硫", desc: "明确材料中的硫和 LiPS 中的硫需要区分。" },
      { title: "边缘/空位位点", desc: "表示边缘和硫空位可能是活性来源，不画真实边缘结构。" },
      { title: "转化证据", desc: "Li2S 成核、对称电池和 DFT 路径用于支持催化转化。" }
    ],
    tags: ["硫空位", "边缘位点", "非真实晶面"],
    colors: ["border-yellow-300/50 bg-yellow-400/15 text-yellow-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "metal-nitride-slab": {
    steps: [
      { title: "导电表面", desc: "只说明氮化物可能提供更快电子传输。" },
      { title: "金属-N 位点", desc: "提示金属位点和 N 位点的 LiPS 作用需单独证明。" },
      { title: "动力学验证", desc: "导电性优势必须结合 LiPS 转化路径和电化学动力学判断。" }
    ],
    tags: ["金属-N", "导电催化", "非真实晶面"],
    colors: ["border-sky-300/50 bg-sky-400/15 text-sky-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "phosphide-carbide-slab": {
    steps: [
      { title: "高导电相", desc: "说明磷化物/碳化物常被用于改善电荷传输。" },
      { title: "电子结构调控", desc: "金属-P 或金属-C 键可能调控金属中心电子结构。" },
      { title: "真实催化证明", desc: "仍需证明 LiPS 吸附、自由能路径和 Li2S 成核/分解改善。" }
    ],
    tags: ["金属-P/C", "导电增强", "非真实晶体"],
    colors: ["border-violet-300/50 bg-violet-500/15 text-violet-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "mxene-surface": {
    steps: [
      { title: "二维导电骨架", desc: "示意层状电子通路，不描述真实 Ti3C2Tx 坐标。" },
      { title: "混合终止基", desc: "-O、-OH、-F 通常共存；纯终止 DFT 模型是简化近似。" },
      { title: "层间限域", desc: "层间距、堆叠和氧化稳定性需要实验结构证据。" }
    ],
    tags: ["Ti3C2Tx 概念", "终止基", "非真实坐标"],
    colors: ["border-emerald-300/50 bg-emerald-500/15 text-emerald-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "defect-carbon": {
    steps: [
      { title: "导电/孔结构", desc: "碳材料首先提供导电网络和硫负载空间。" },
      { title: "缺陷与掺杂", desc: "缺陷、N/S/P/B 掺杂可能增强 LiPS 相互作用。" },
      { title: "催化证据", desc: "不能仅凭高比表面积或循环性能声称催化作用。" }
    ],
    tags: ["缺陷", "掺杂", "非真实碳结构"],
    colors: ["border-slate-300/50 bg-slate-500/15 text-slate-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  multicomponent: {
    steps: [
      { title: "复杂组成", desc: "多元素体系可能提供多活性中心和局部电子结构调控。" },
      { title: "活性来源归因", desc: "需要证明单相/多相、元素分布和具体活性位点。" },
      { title: "简化模型声明", desc: "DFT 常只能选择代表性局部位点，必须说明近似关系。" }
    ],
    tags: ["多金属", "高熵", "非真实结构"],
    colors: ["border-rose-300/50 bg-rose-500/15 text-rose-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  "lips-adsorption": {
    steps: [
      { title: "LiPS 接近", desc: "示意 Li2S6/Li2S4 接近活性位点，不显示真实分子构象。" },
      { title: "适度吸附", desc: "吸附太弱无法限制穿梭，太强可能阻碍后续转化。" },
      { title: "转化路径", desc: "Li2S4 -> Li2S2 -> Li2S 和 Li2S 分解需真实自由能/NEB 支持。" }
    ],
    tags: ["LiPS", "适度吸附", "非优化构型"],
    colors: ["border-amber-300/50 bg-amber-400/15 text-amber-100", "border-cyan/50 bg-cyan/15 text-cyan"]
  },
  placeholder: {
    steps: [
      { title: "暂无结构文件", desc: "未提供真实结构文件时，只展示机制解释占位。" },
      { title: "禁止随机坐标", desc: "不会生成随机球棍或伪晶体结构。" }
    ],
    tags: ["placeholder", "no structure file"],
    colors: ["border-amber-300/50 bg-amber-400/15 text-amber-100"]
  }
};

function StatusPanel({ model }: { model: CatalystModelData }) {
  const hasFile = Boolean(model.structureFile);
  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        {hasFile ? <CheckCircle2 size={16} className="text-emerald-300" /> : <FileQuestion size={16} className="text-amber-300" />}
        真实结构文件状态
      </p>
      <div className="grid gap-1.5 text-xs leading-5 text-slate-300">
        <p>文件状态：{hasFile ? "已配置结构文件" : "未配置结构文件"}</p>
        <p>文件格式：{model.structureFileFormat}</p>
        <p>优化结构：{model.isOptimizedStructure === undefined ? "未声明" : model.isOptimizedStructure ? "是" : "否"}</p>
        <p>包含 LiPS：{model.containsAdsorbate ? `是，${model.adsorbateSpecies ?? "未声明物种"}` : "否 / 未声明"}</p>
        <p>可视化类型：{model.visualizationType}</p>
      </div>
    </div>
  );
}

function Legend({ type, isStructure }: { type: SchematicType; isStructure: boolean }) {
  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        <Layers3 size={16} className="text-cyan" />
        图例
      </p>
      {isStructure ? (
        <InfoList items={["原子坐标来自结构文件", "元素颜色与键连需由解析器和结构文件定义", "不进行随机补点或自动伪造结构"]} />
      ) : (
        <InfoList items={[
          `示意类型：${type}`,
          "色块和箭头只表示机制关系",
          "不表示原子半径、键长、键角、配位数或晶胞参数"
        ]} />
      )}
    </div>
  );
}

function InfoColumn({ title, items, tone }: { title: string; items: string[]; tone: "cyan" | "amber" | "emerald" }) {
  const color = tone === "cyan" ? "border-cyan/25 bg-cyan/8" : tone === "amber" ? "border-amber-400/30 bg-amber-400/10" : "border-emerald-400/30 bg-emerald-400/10";
  const icon = tone === "amber" ? <AlertTriangle size={16} className="text-amber-200" /> : tone === "emerald" ? <CheckCircle2 size={16} className="text-emerald-300" /> : <Info size={16} className="text-cyan" />;
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">{icon}{title}</p>
      <InfoList items={items} />
    </div>
  );
}
