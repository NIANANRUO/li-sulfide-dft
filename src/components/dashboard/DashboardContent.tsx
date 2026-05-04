"use client";

import { ArrowRight, Atom, BookOpen, FlaskConical, Gauge, Layers3 } from "lucide-react";
import { DashboardModuleId, dashboardModules, lisAdvantages, researchPipeline } from "@/data/dashboardModules";
import { catalystSystems } from "@/data/catalystSystems";
import { characterizationMethods } from "@/data/characterizationMethods";
import { lipsSpecies, dftResultTable } from "@/data/dftWorkflows";
import { vaspTemplates } from "@/data/vaspTemplates";
import { BatterySchematic, CatalystAdsorptionAnimation, DFTWorkflowAnimation, ShuttleEffectAnimation } from "@/components/Animations";
import { AdsorptionEnergyChart, FreeEnergyPathChart, PerformanceCharts } from "@/components/Charts";
import { DFTTaskSelector } from "@/components/DFTTaskSelector";
import { ExperimentDFTMap } from "@/components/ExperimentDFTMap";
import { MethodExplorer } from "@/components/MethodExplorer";
import { Accordion, CodeBlock, EvidenceChain, GlassCard, GlossaryPanel, InfoList, SimpleTable, Tag } from "@/components/UI";
import { FundamentalsWorkspace } from "@/components/fundamentals/FundamentalsWorkspace";
import { ChallengesWorkspace } from "@/components/challenges/ChallengesWorkspace";
import { CatalystSystemsWorkspace } from "@/components/catalysts/CatalystSystemsWorkspace";
import { ExperimentalCharacterizationWorkspace } from "@/components/experiments/ExperimentalCharacterizationWorkspace";
import { DFTCalculationsPanel } from "@/components/dft/DFTCalculationsPanel";
import { ElectrochemicalPerformancePanel } from "@/components/performance/ElectrochemicalPerformancePanel";
import { ResearchGapsPanel } from "@/components/research-gaps/ResearchGapsPanel";
import { TheoryFigureOverview } from "@/components/CatalystDesignMap/TheoryFigureOverview";
import { VaspLearningStudio } from "@/components/vasp-learning/VaspLearningStudio";
import { MiniCard, PanelHeader, StatGrid } from "./DashboardPrimitives";

export function DashboardContent({
  moduleId,
  tab,
  onSelectModule,
  onSelectTab
}: {
  moduleId: DashboardModuleId;
  tab: string;
  onSelectModule: (id: DashboardModuleId) => void;
  onSelectTab?: (tab: string) => void;
}) {
  if (moduleId === "home") return <DashboardHome tab={tab} onSelectModule={onSelectModule} />;
  if (moduleId === "fundamentals") return <FundamentalsPanel tab={tab} />;
  if (moduleId === "challenges") return <ChallengesPanel tab={tab} onSelectTab={onSelectTab} />;
  if (moduleId === "catalysts") return <CatalystSystemsWorkspace tab={tab} onSelectTab={onSelectTab} />;
  if (moduleId === "experiments") return <ExperimentsPanel tab={tab} onSelectTab={onSelectTab} />;
  if (moduleId === "dft") return <DftPanel tab={tab} />;
  if (moduleId === "performance") return <PerformancePanel tab={tab} onSelectTab={onSelectTab} />;
  if (moduleId === "research-gaps") return <ResearchGapsPanel tab={tab} onSelectTab={onSelectTab} />;
  if (moduleId === "catalyst-design-map") return <TheoryFigureOverview />;
  if (moduleId === "projects") return <VaspLearningStudio />;
  return <DashboardHome tab="总览" onSelectModule={onSelectModule} />;
}

function DashboardHome({ tab, onSelectModule }: { tab: string; onSelectModule: (id: DashboardModuleId) => void }) {
  if (tab === "研究主线") {
    return (
      <div>
        <PanelHeader title="研究主线总览" desc="平台用一条机制链组织内容：从问题出发，经由催化剂设计和 DFT 计算筛选，再用实验表征和电化学性能验证。" />
        <div className="grid gap-4 md:grid-cols-5">
          {researchPipeline.map((item, index) => (
            <GlassCard key={item}>
              <div className="mb-4 grid h-9 w-9 place-items-center rounded bg-cyan/15 text-sm font-bold text-cyan">{index + 1}</div>
              <h3 className="text-lg font-semibold text-white">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{["明确穿梭、动力学和 Li2S 问题", "选择活性位点与结构类型", "吸附能、电荷、DOS、COHP、自由能", "XPS、XAS、Raman、电化学互证", "容量、倍率、循环和极化改善"][index]}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }
  if (tab === "机理示意") return <BatterySchematic />;
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr_auto] gap-3">
      <ModuleButtonGrid onSelectModule={onSelectModule} />
      <PipelineStrip />
    </div>
  );
}

function ModuleButtonGrid({ onSelectModule }: { onSelectModule: (id: DashboardModuleId) => void }) {
  const cards = dashboardModules.filter((item) => item.id !== "home");
  return (
    <div className="grid min-h-0 gap-3 lg:grid-cols-3">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSelectModule(item.id)}
            className="group min-h-0 rounded-xl border border-[#31547f] bg-gradient-to-br from-[#0b1930]/95 to-[#071225]/82 p-3 text-left transition hover:border-cyan hover:shadow-[0_0_32px_rgba(56,189,248,.34)]"
          >
            <div className="flex h-full items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-500/10 text-cyan shadow-[inset_0_0_22px_rgba(56,189,248,.12),0_0_20px_rgba(56,189,248,.14)]">
                <Icon size={26} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold text-white">{item.title}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-300 line-clamp-2">{item.description}</span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function PipelineStrip() {
  return (
    <div className="rounded-xl border border-[#1f5b9d]/70 bg-[#071225]/82 p-3">
      <p className="mb-2 text-sm font-semibold text-cyan">研究主线流程</p>
      <div className="grid gap-2 xl:grid-cols-5">
        {researchPipeline.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <div className="flex min-h-14 flex-1 items-center gap-2 rounded-lg border border-blue-500/45 bg-blue-500/10 p-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/45 text-sm text-cyan">{index + 1}</div>
              <div>
                <p className="text-sm font-semibold text-white">{item}</p>
                <p className="text-xs text-slate-400">机制闭环节点</p>
              </div>
            </div>
            {index < researchPipeline.length - 1 && <ArrowRight className="hidden text-blue-300 xl:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function FundamentalsPanel({ tab }: { tab: string }) {
  return <FundamentalsWorkspace tab={tab} />;
}

function ChallengesPanel({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  return <ChallengesWorkspace tab={tab} onSelectTab={onSelectTab} />;
}

function CatalystPanel({ tab }: { tab: string }) {
  const aliases: Record<string, string> = {
    单原子催化剂: "single-atom",
    双原子催化剂: "dual-atom",
    异质结催化剂: "heterostructure",
    金属氧化物: "metal-oxides",
    金属硫化物: "metal-sulfides",
    金属氮化物: "metal-nitrides",
    MXene: "mxenes",
    缺陷碳材料: "defect-carbon"
  };
  const item = catalystSystems.find((system) => system.id === aliases[tab]) ?? catalystSystems[0];
  return (
    <div className="space-y-5">
      <PanelHeader title={item.name} desc={item.summary} />
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">体系信息</h3>
          <InfoList items={[`核心科学问题：${item.keyQuestions.join("；")}`, `典型结构：${item.dftModels.slice(0, 4).join("、")}`, `活性位点：${item.activeSites.join("、")}`]} />
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">优势与局限</h3>
          <InfoList items={[`优势：${item.advantages.join("；")}`, `局限：${item.limitations.join("；")}`]} />
        </GlassCard>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">推荐表征与 DFT</h3>
          <InfoList items={[`推荐表征：${item.characterizationMethods.join("、")}`, `推荐 DFT：${item.dftMethods.join("、")}`, `LiPS 吸附特点：${item.adsorptionModes.join("、")}`]} />
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-lg font-semibold text-white">典型研究逻辑</h3>
          <EvidenceChain items={item.evidenceChain} />
        </GlassCard>
      </div>
      <CatalystAdsorptionAnimation />
    </div>
  );
}

function ExperimentsPanel({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  return <ExperimentalCharacterizationWorkspace tab={tab} onSelectTab={onSelectTab} />;
  if (tab === "按体系查看") return <MethodExplorer />;
  if (tab === "按方法查看") {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        {characterizationMethods.map((method) => (
          <MiniCard key={method.id} title={method.name} desc={`方法原理：${method.principle} 能证明：${method.whatItProves} 常见误区：${method.commonMistakes}`} tags={[method.category]} />
        ))}
      </div>
    );
  }
  if (tab === "实验-计算对应关系") return <ExperimentDFTMap />;
  return <EvidenceChain items={catalystSystems[0].evidenceChain} />;
}

function DftPanel({ tab }: { tab: string }) {
  return <DFTCalculationsPanel activeTabLabel={tab} />;
  if (tab === "吸附能") return <DftWorkbench main={<AdsorptionWorkbench />} />;
  if (tab === "吉布斯自由能") return <DftWorkbench main={<div className="space-y-5"><MiniCard title="吉布斯自由能" desc="ΔG = ΔE_DFT + ΔZPE - TΔS。最高上坡自由能差可用于判断限速步骤。" /><FreeEnergyPathChart /></div>} />;
  if (tab === "VASP 模板") {
    return <DftWorkbench main={<div className="grid gap-4">{vaspTemplates.map((template) => <Accordion key={template.id} title={template.title}><CodeBlock title={template.title} note={template.note} code={template.code} /></Accordion>)}</div>} />;
  }
  if (tab === "结果解读") return <DftWorkbench main={<SimpleTable headers={["结果类型", "说明什么", "如何支持催化机制"]} rows={dftResultTable} />} />;
  if (tab === "模型构建") return <DftWorkbench main={<DFTTaskSelector />} />;
  if (tab === "NEB 能垒") return <DftWorkbench main={<div className="space-y-5"><MiniCard title="NEB 能垒" desc="先优化初态和终态，再插入中间 images，最高点与初态能量差即为近似反应能垒。适用于 Li2S 分解、Li 扩散、S-S 键断裂和表面迁移。" /><DFTWorkflowAnimation steps={[{ id: "model", name: "模型构建" }, { id: "relax", name: "结构优化" }, { id: "ads", name: "吸附模型" }, { id: "static", name: "静态计算" }, { id: "analysis", name: "后处理分析" }, { id: "screen", name: "催化剂筛选" }]} active="analysis" onSelect={() => undefined} /></div>} />;
  return <DftWorkbench main={<DFTTaskSelector />} />;
}

function DftWorkbench({ main }: { main: React.ReactNode }) {
  return (
    <div className="grid gap-5 2xl:grid-cols-[1fr_21rem]">
      <div className="min-w-0 space-y-5">{main}</div>
      <GlassCard className="border-blue-500/40 bg-[#0b1a2f]/92">
        <p className="text-2xl font-bold text-white">DFT 计算模块</p>
        <div className="mt-2 h-1 w-10 rounded bg-blue-400" />
        <div className="my-6 grid place-items-center">
          <div className="grid h-40 w-40 place-items-center rounded-full border border-blue-400/30 bg-blue-500/10 shadow-[0_0_45px_rgba(59,130,246,.25)]">
            <Atom size={74} className="text-blue-200" strokeWidth={1.2} />
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-300">用于展示模型构建、VASP 输入模板、电子结构分析和反应路径计算。</p>
        <div className="mt-6 border-t border-slate-700/70 pt-5">
          <p className="mb-3 font-semibold text-slate-100">推荐入口</p>
          {["自由能路径", "Bader 电荷", "VASP 模板"].map((item) => (
            <div key={item} className="mb-3 flex items-center justify-between rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-slate-200">
              {item}
              <ArrowRight size={16} className="text-cyan" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function AdsorptionWorkbench() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ["催化剂体系", "单原子催化剂"],
          ["LiPS 物种", "Li2S4"],
          ["计算任务", "吸附能"]
        ].map(([label, value]) => (
          <label key={label} className="rounded-xl border border-[#31547f] bg-[#081327]/90 p-4 text-sm text-slate-400">
            {label}
            <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-3 text-base text-white">
              <option>{value}</option>
            </select>
          </label>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
        <AdsorptionEnergyChart />
        <GlassCard className="border-blue-500/40">
          <h3 className="mb-4 text-xl font-semibold text-white">计算说明</h3>
          <p className="text-sm text-slate-400">吸附能公式</p>
          <div className="my-4 rounded-lg border border-blue-500/45 bg-blue-500/10 p-5 text-center font-serif text-lg text-white">
            E<sub>ads</sub> = E(catalyst + LiPS) - E(catalyst) - E(LiPS)
          </div>
          <p className="text-sm leading-7 text-slate-300">吸附能用于评价催化剂对多硫化物的结合能力，理想催化剂应兼顾适中吸附强度与低反应能垒。</p>
        </GlassCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <MiniCard title="模型构建建议" desc="M-N4/C、氧化物 slab、MXene 终止基模型；比较 Li 端、S 端和平躺吸附构型。" tags={["M-N4/C", "slab", "MXene"]} />
        <MiniCard title="结果解读" desc="吸附更强不一定更优，需要结合自由能和 NEB 综合分析。" tags={["自由能", "NEB"]} />
        <MiniCard title="实验对应关系" desc="XPS 结合能偏移、Li2S6 吸附实验和电化学极化可与吸附能趋势互证。" tags={["XPS", "Li2S6", "极化"]} />
      </div>
    </div>
  );
}

function PerformancePanel({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  return <ElectrochemicalPerformancePanel tab={tab} onSelectTab={onSelectTab} />;
}

function AboutPanel({ tab }: { tab: string }) {
  const skills = ["锂硫电池", "电催化", "第一性原理计算", "VASP", "材料表征", "电化学分析", "科研可视化", "文献整理", "数据分析"];
  if (tab === "技能树") return <div className="flex flex-wrap gap-3">{skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}</div>;
  if (tab === "联系方式") return <MiniCard title="联系方式" desc="姓名、学校/课题组和邮箱均为占位内容，后续可替换为真实信息。" tags={["email@example.com", "课题组占位"]} />;
  if (tab === "研究方向") return <InfoList items={["锂硫电池催化剂设计", "第一性原理计算与 VASP", "实验表征证据链", "电化学性能分析", "科研可视化和知识平台搭建"]} />;
  return <MiniCard title="个人简介" desc="这里是个人简介占位。该平台适合作为研究生展示、组会汇报、导师查看和同行交流的交互式知识界面。" />;
}
