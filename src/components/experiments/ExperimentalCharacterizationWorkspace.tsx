"use client";

import { ArrowRight, CheckCircle2, FlaskConical, Microscope, Network, Search, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CharacterizationMethod,
  MethodVisualizationSpec,
  characterizationCategories,
  characterizationEvidenceFlow,
  characterizationMethods,
  characterizationOverviewIntro,
  characterizationPitfalls,
  electrochemicalValidationMethods,
  evidenceLayers,
  experimentDFTCorrelations,
  inSituOperandoIntro,
  inSituOperandoMethods,
  li2sDftCorrelation,
  li2sNucleationExperiments,
  li2sNucleationIntro,
  lipsAdsorptionDiffusionExperiments,
  rigorousLanguageRules,
  systemEvidenceChains
} from "@/data/experimentalCharacterizationData";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import { PanelHeader } from "@/components/dashboard/DashboardPrimitives";
import { ResearchDemoFrame, ResearchDemoLabel, ResearchDemoNode, ResearchDemoPanel } from "@/components/ResearchDemoFrame";

const categoryNames: Record<string, string> = {
  "structure-morphology": "结构与形貌",
  "phase-crystal": "晶相与结构",
  "composition-valence": "组成与价态",
  "local-coordination": "局域配位",
  "defect-electronic": "缺陷与电子结构",
  "reaction-process": "反应过程",
  "electrochemical-kinetics": "电化学动力学"
};

export function ExperimentalCharacterizationWorkspace({ tab, onSelectTab }: { tab: string; onSelectTab?: (tab: string) => void }) {
  return (
    <div className="flex h-full min-h-[680px] flex-col overflow-hidden">
      {tab === "表征总览" && <CharacterizationOverviewPanel onSelectTab={onSelectTab} />}
      {tab === "按体系查看" && <SystemEvidenceChainPanel />}
      {tab === "按方法查看" && <MethodExplorer />}
      {tab === "证据链总览" && <EvidenceChainOverview />}
      {tab === "LiPS 吸附与扩散验证" && <LiPSAdsorptionDiffusionPanel />}
      {tab === "Li2S 成核/分解验证" && <Li2SNucleationDecompositionPanel />}
      {tab === "原位/工况表征" && <InSituOperandoPanel />}
      {tab === "电化学动力学验证" && <ElectrochemicalValidationPanel />}
      {tab === "实验-DFT 对应关系" && <ExperimentDFTCorrelationPanel />}
      {tab === "常见误区与严谨性检查" && <CharacterizationPitfallsPanel />}
    </div>
  );
}

export function CharacterizationOverviewPanel({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  return (
    <WorkspaceGrid
      title="锂硫电池催化剂研究需要哪些表征证据？"
      desc={characterizationOverviewIntro}
      left={<EvidenceNavigator onSelectTab={onSelectTab} />}
      main={
        <div className="grid gap-3 xl:grid-cols-2">
          {characterizationCategories.map((category, index) => (
            <GlassCard key={category.id} className="border-blue-500/30 bg-[#08172d]/86">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <span className="grid h-8 w-8 place-items-center rounded border border-cyan/30 bg-cyan/10 text-sm text-cyan">{index + 1}</span>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {category.methods.map((method) => (
                  <Tag key={method}>{method}</Tag>
                ))}
              </div>
              <InfoBlock title="作用" items={[category.role]} tone="cyan" />
              <InfoBlock title="局限" items={[category.limitation]} tone="amber" />
            </GlassCard>
          ))}
        </div>
      }
      right={<RigorPanel method={characterizationMethods[0]} />}
      bottom={<EvidenceFlow />}
    />
  );
}

export function SystemEvidenceChainPanel() {
  const [systemId, setSystemId] = useState(systemEvidenceChains[0].id);
  const system = systemEvidenceChains.find((item) => item.id === systemId) ?? systemEvidenceChains[0];

  return (
    <WorkspaceGrid
      title="不同催化剂体系需要怎样的表征证据链？"
      desc="按催化剂体系组织证据链，重点区分结构存在、位点归属、反应参与和 DFT 解释。"
      left={
        <SelectorRail
          title="催化剂体系"
          items={systemEvidenceChains.map((item) => ({ id: item.id, label: item.systemName }))}
          active={systemId}
          onSelect={setSystemId}
        />
      }
      main={
        <div className="space-y-4">
          <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
            <h3 className="mb-3 text-xl font-semibold text-white">{system.systemName}</h3>
            <InfoBlock title="需要证明什么" items={system.keyQuestions} />
          </GlassCard>
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-white">推荐表征组合</h3>
            <FlowPills items={system.recommendedMethods} />
          </GlassCard>
          <div className="grid gap-3 xl:grid-cols-2">
            {system.methodRoles.map((role) => (
              <GlassCard key={role.method} className="p-4">
                <p className="font-semibold text-cyan">{role.method}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{role.role}</p>
              </GlassCard>
            ))}
          </div>
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-white">证据链总结</h3>
            <Timeline items={system.evidenceChain} />
          </GlassCard>
        </div>
      }
      right={<SideEvidencePanel proves={system.keyQuestions} cannot={system.commonPitfalls} dft={system.dftCorrelation} pitfalls={system.commonPitfalls} />}
      bottom={<CorrelationStrip />}
    />
  );
}

export function MethodExplorer() {
  const [methodId, setMethodId] = useState(characterizationMethods[0].id);
  const method = characterizationMethods.find((item) => item.id === methodId) ?? characterizationMethods[0];

  return (
    <WorkspaceGrid
      title="每种表征方法能证明什么？不能证明什么？"
      desc="方法详情页固定展示基本原理、分析流程、图画展示、证据边界、适用体系、典型解读、误区、DFT 对应和推荐搭配。"
      left={
        <div className="space-y-3">
          <SearchBox />
          <SelectorRail
            title="表征方法库"
            items={characterizationMethods.map((item) => ({ id: item.id, label: item.name, meta: categoryNames[item.category] }))}
            active={methodId}
            onSelect={setMethodId}
          />
        </div>
      }
      main={<MethodDetail method={method} />}
      right={<RigorPanel method={method} />}
      bottom={<MethodPairingBar method={method} />}
    />
  );
}

export function MethodVisualizationCard({ visualization }: { visualization: MethodVisualizationSpec }) {
  return (
    <GlassCard className="border-cyan/30 bg-[#061427]/95">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">科研示意图</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{visualization.title}</h3>
        </div>
        <Tag>{visualization.type}</Tag>
      </div>
      <div className="grid gap-4 2xl:grid-cols-[1.1fr_.9fr]">
        <ResearchDemoFrame title={visualization.title} compact minHeight="13rem" className="p-3">
          {renderMethodSketch(visualization)}
        </ResearchDemoFrame>
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-300">{visualization.description}</p>
          <InfoBlock title="应关注的信号" items={visualization.whatToObserve} />
          <InfoBlock title="能支持的结论" items={visualization.supportedConclusion} tone="emerald" />
          <InfoBlock title="不能单独支持" items={visualization.unsupportedConclusion} tone="amber" />
        </div>
      </div>
    </GlassCard>
  );
}

export function EvidenceChainOverview() {
  const [layerId, setLayerId] = useState(evidenceLayers[0].id);
  const layer = evidenceLayers.find((item) => item.id === layerId) ?? evidenceLayers[0];

  return (
    <WorkspaceGrid
      title="如何构建严谨的催化剂证据链？"
      desc="五层证据链把材料结构、活性位点、LiPS 作用、电化学动力学和理论机制分开验证，再做相互支撑。"
      left={<SelectorRail title="证据层级" items={evidenceLayers.map((item) => ({ id: item.id, label: item.name }))} active={layerId} onSelect={setLayerId} />}
      main={
        <div className="space-y-4">
          <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
            <h3 className="text-xl font-semibold text-white">{layer.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{layer.purpose}</p>
          </GlassCard>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {layer.methods.map((method) => (
              <div key={method} className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm font-semibold text-blue-100">
                {method}
              </div>
            ))}
          </div>
          <MethodVisualizationCard
            visualization={vizFromLayer(layer.name, layer.methods)}
          />
        </div>
      }
      right={<SideEvidencePanel proves={[layer.purpose]} cannot={layer.cannotConclude} dft={layer.cooperation} pitfalls={layer.cannotConclude} />}
      bottom={<EvidenceFlow />}
    />
  );
}

export function LiPSAdsorptionDiffusionPanel() {
  return (
    <TopicPanel
      title="如何证明催化剂能够吸附或限制多硫化物扩散？"
      desc="LiPS 吸附和扩散验证主要说明浓度降低、迁移减弱或界面相互作用增强，仍需要转化实验和 DFT 共同支持催化机制。"
      items={lipsAdsorptionDiffusionExperiments.map((item) => ({
        title: item.name,
        main: item.purpose,
        groups: [
          ["结果解读", item.interpretation],
          ["不能得出的结论", item.cannotConclude],
          ["DFT 对应", item.dft]
        ]
      }))}
      visualization={viz("LiPS 吸附-扩散-表面相互作用", "principle-schematic", ["LiPS", "功能层", "接收侧", "XPS/Raman"], ["颜色变化", "吸收峰下降", "表面峰位变化"], ["支持 LiPS 吸附或扩散抑制增强。"], ["不能单独支持催化转化或具体活性位点。"])}
    />
  );
}

export function Li2SNucleationDecompositionPanel() {
  return (
    <TopicPanel
      title="如何证明催化剂促进 Li2S 沉积与分解？"
      desc={li2sNucleationIntro}
      items={li2sNucleationExperiments.map((item) => ({
        title: item.name,
        main: "methods" in item && item.methods ? item.methods.join(" / ") : "恒电位成核与沉积电流响应",
        groups: [
          ["能证明", item.proves],
          ["典型解读", item.interpretation],
          ["严谨提醒", item.rigorousNotes]
        ]
      }))}
      visualization={viz("Li2S 成核、沉积和充电分解", "spectrum-curve", ["Time", "Current", "nucleation", "decomposition"], ["成核起始时间", "沉积容量", "充电极化"], ["支持 Li2S 沉积/分解动力学改善。"], ["不能单独支持完整 LiPS 路径或唯一活性位点。"])}
      footer={<InfoBlock title="DFT 对应" items={li2sDftCorrelation} />}
    />
  );
}

export function InSituOperandoPanel() {
  return (
    <TopicPanel
      title="如何在反应过程中追踪 LiPS 演化和电极结构变化？"
      desc={inSituOperandoIntro}
      items={inSituOperandoMethods.map((item) => ({
        title: item.method,
        main: item.canSee,
        groups: [
          ["适合研究什么问题", [item.suitableQuestion]],
          ["局限性", [item.limitation]],
          ["与 DFT 对应", [item.dft]]
        ]
      }))}
      visualization={viz("原位/工况反应追踪", "workflow-diagram", ["S8", "LiPS", "Li2S", "charge"], ["物种峰演变", "晶相变化", "价态变化"], ["支持反应过程中结构和中间体演化趋势。"], ["不能在无标准谱和对照时直接确定所有物种。"])}
    />
  );
}

export function ElectrochemicalValidationPanel() {
  return (
    <TopicPanel
      title="如何用电化学测试证明催化剂改善反应动力学？"
      desc="电化学测试可以支持极化降低、界面电荷转移改善和 LiPS 转化动力学增强，但不能单独替代结构、位点和反应过程证据。"
      items={electrochemicalValidationMethods.map((item) => ({
        title: item.method,
        main: item.rigorousExplanation,
        groups: [["关注", item.focus]]
      }))}
      visualization={viz("电化学动力学多指标验证", "comparison-chart", ["CV", "EIS", "Li2S", "GITT"], ["峰间距", "Rct", "成核峰", "弛豫幅度"], ["支持动力学改善和极化降低。"], ["不能单独支持具体催化机制或活性位点归因。"])}
    />
  );
}

export function ExperimentDFTCorrelationPanel() {
  return (
    <WorkspaceGrid
      title="实验结果如何与 DFT 计算互相验证？"
      desc="实验给出结构、价态和反应趋势，DFT 给出可解释的电子结构、成键与能垒模型；两者应相互约束，而不是互相替代。"
      left={<CorrelationMiniMatrix />}
      main={
        <div className="grid gap-3">
          {experimentDFTCorrelations.map((item) => (
            <GlassCard key={item.id} className="border-blue-500/30 p-4">
              <div className="grid gap-3 xl:grid-cols-[1fr_1fr_1.1fr]">
                <div>
                  <p className="text-xs text-slate-500">实验信号</p>
                  <p className="mt-1 font-semibold text-white">{item.experimentalSignal}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.experimentalMeaning}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">DFT 分析</p>
                  <div className="mt-2 flex flex-wrap gap-2">{item.dftAnalysis.map((dft) => <Tag key={dft}>{dft}</Tag>)}</div>
                </div>
                <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-3 text-sm leading-6 text-amber-100">{item.rigorousNote}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      }
      right={<LanguageRulesPanel />}
      bottom={<EvidenceFlow />}
    />
  );
}

export function CharacterizationPitfallsPanel() {
  const filters = ["全部", "单原子", "缺陷", "LiPS", "电化学", "DFT"];
  const [filter, setFilter] = useState(filters[0]);
  const pitfalls = useMemo(
    () => characterizationPitfalls.filter((item) => filter === "全部" || item.relatedMethods.includes(filter)),
    [filter]
  );

  return (
    <WorkspaceGrid
      title="锂硫电池催化剂表征中最容易出现哪些不严谨结论？"
      desc="把错误结论改写为可审稿、可复核、可与多证据链相容的表述。"
      left={
        <div className="space-y-3">
          <p className="text-sm font-semibold text-cyan">筛选项</p>
          <div className="grid gap-2">
            {filters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`rounded-lg border px-3 py-2 text-left text-sm ${filter === item ? "border-cyan bg-cyan/15 text-white" : "border-slate-700 bg-slate-950/35 text-slate-300"}`}>
                {item}
              </button>
            ))}
          </div>
          <LanguageRulesPanel />
        </div>
      }
      main={
        <div className="grid gap-3 xl:grid-cols-2">
          {pitfalls.map((item) => (
            <GlassCard key={item.id} className="border-amber-400/25 bg-amber-400/[0.06]">
              <div className="mb-3 flex items-start gap-3">
                <ShieldAlert className="mt-1 shrink-0 text-amber-300" size={20} />
                <div>
                  <p className="text-sm text-amber-200">错误结论</p>
                  <h3 className="mt-1 font-semibold text-white">{item.wrongConclusion}</h3>
                </div>
              </div>
              <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-3">
                <p className="text-sm text-emerald-200">更严谨说法</p>
                <p className="mt-1 text-sm leading-6 text-slate-100">{item.rigorousStatement}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">{item.relatedMethods.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            </GlassCard>
          ))}
        </div>
      }
      right={<ChecklistPanel />}
      bottom={<EvidenceFlow />}
    />
  );
}

function WorkspaceGrid({
  title,
  desc,
  left,
  main,
  right,
  bottom
}: {
  title: string;
  desc: string;
  left: React.ReactNode;
  main: React.ReactNode;
  right: React.ReactNode;
  bottom: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
      <PanelHeader title={title} desc={desc} />
      <div className="grid min-h-0 flex-1 gap-4 2xl:grid-cols-[18rem_1fr_22rem]">
        <aside className="min-h-0 overflow-y-auto rounded-xl border border-[#1f5b9d]/45 bg-[#061427]/72 p-3">{left}</aside>
        <section className="min-h-0 overflow-y-auto pr-1">{main}</section>
        <aside className="min-h-0 overflow-y-auto rounded-xl border border-[#1f5b9d]/45 bg-[#061427]/72 p-3">{right}</aside>
      </div>
      <div className="shrink-0">{bottom}</div>
    </div>
  );
}

function MethodDetail({ method }: { method: CharacterizationMethod }) {
  return (
    <div className="space-y-4">
      <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-semibold text-white">{method.name}</h3>
          <Tag>{categoryNames[method.category]}</Tag>
        </div>
        <InfoBlock title="方法基本原理" items={[method.principle]} />
      </GlassCard>
      <MethodVisualizationCard visualization={method.visualization} />
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard><InfoBlock title="如何分析这类数据" items={method.analysisGuide.analysisSteps} /></GlassCard>
        <GlassCard><InfoBlock title="关键观察信号" items={method.analysisGuide.keySignals} /></GlassCard>
        <GlassCard><InfoBlock title="对照策略" items={method.analysisGuide.comparisonStrategy} /></GlassCard>
        <GlassCard><InfoBlock title="分析提醒" items={method.analysisGuide.cautionNotes} tone="amber" /></GlassCard>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard><InfoBlock title="适用催化剂体系" items={method.suitableSystems} /></GlassCard>
        <GlassCard><InfoBlock title="典型结果解读" items={method.typicalInterpretation} /></GlassCard>
        <GlassCard><InfoBlock title="常见误区" items={method.commonPitfalls} tone="amber" /></GlassCard>
        <GlassCard><InfoBlock title="与 DFT 的对应关系" items={method.dftCorrelation} /></GlassCard>
      </div>
    </div>
  );
}

function RigorPanel({ method }: { method: CharacterizationMethod }) {
  return (
    <div className="space-y-3">
      <InfoBlock title="能证明什么" items={method.proves} tone="emerald" />
      <InfoBlock title="不能证明什么" items={method.cannotProve} tone="amber" />
      <InfoBlock title="与 DFT 对应" items={method.dftCorrelation} />
      <InfoBlock title="常见误区" items={method.commonPitfalls} tone="amber" />
    </div>
  );
}

function SideEvidencePanel({ proves, cannot, dft, pitfalls }: { proves: string[]; cannot: string[]; dft: string[]; pitfalls: string[] }) {
  return (
    <div className="space-y-3">
      <InfoBlock title="需要证明什么" items={proves} tone="emerald" />
      <InfoBlock title="不能证明什么" items={cannot} tone="amber" />
      <InfoBlock title="与 DFT 对应" items={dft} />
      <InfoBlock title="常见误区" items={pitfalls} tone="amber" />
    </div>
  );
}

function InfoBlock({ title, items, tone = "cyan" }: { title: string; items: string[]; tone?: "cyan" | "amber" | "emerald" }) {
  const color = tone === "amber" ? "text-amber-200 border-amber-400/25 bg-amber-400/[0.06]" : tone === "emerald" ? "text-emerald-200 border-emerald-400/25 bg-emerald-400/[0.06]" : "text-cyan border-cyan/20 bg-cyan/[0.05]";
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <InfoList items={items} />
    </div>
  );
}

function SelectorRail({ title, items, active, onSelect }: { title: string; items: { id: string; label: string; meta?: string }[]; active: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-cyan">{title}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`rounded-lg border px-3 py-2 text-left transition ${active === item.id ? "border-cyan bg-cyan/15 text-white shadow-[0_0_18px_rgba(56,189,248,.18)]" : "border-slate-700 bg-slate-950/35 text-slate-300 hover:border-blue-400/50"}`}
          >
            <span className="block text-sm font-semibold">{item.label}</span>
            {item.meta && <span className="mt-1 block text-xs text-slate-500">{item.meta}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function EvidenceNavigator({ onSelectTab }: { onSelectTab?: (tab: string) => void }) {
  const entries = [
    ["按体系查看", "体系证据链"],
    ["按方法查看", "方法边界"],
    ["证据链总览", "五层闭环"],
    ["实验-DFT 对应关系", "互相验证"],
    ["常见误区与严谨性检查", "审稿检查"]
  ];
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-cyan">工作区入口</p>
      {entries.map(([tab, note]) => (
        <button key={tab} onClick={() => onSelectTab?.(tab)} className="flex w-full items-center justify-between rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-3 text-left text-sm text-slate-200 hover:border-cyan">
          <span><span className="block font-semibold">{tab}</span><span className="text-xs text-slate-500">{note}</span></span>
          <ArrowRight size={16} className="text-cyan" />
        </button>
      ))}
    </div>
  );
}

function EvidenceFlow() {
  return (
    <div className="rounded-xl border border-[#1f5b9d]/50 bg-[#07162c]/88 p-3">
      <div className="flex flex-wrap items-center gap-2">
        {characterizationEvidenceFlow.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <div className="rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2 text-sm font-semibold text-cyan">{item}</div>
            {index < characterizationEvidenceFlow.length - 1 && <ArrowRight size={16} className="text-blue-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CorrelationStrip() {
  return (
    <div className="grid gap-2 rounded-xl border border-[#1f5b9d]/50 bg-[#07162c]/88 p-3 md:grid-cols-4">
      {experimentDFTCorrelations.slice(0, 4).map((item) => (
        <div key={item.id} className="rounded-lg border border-blue-500/25 bg-blue-500/10 p-3">
          <p className="text-sm font-semibold text-white">{item.experimentalSignal}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{item.dftAnalysis.join(" / ")}</p>
        </div>
      ))}
    </div>
  );
}

function MethodPairingBar({ method }: { method: CharacterizationMethod }) {
  return (
    <div className="rounded-xl border border-[#1f5b9d]/50 bg-[#07162c]/88 p-3">
      <p className="mb-2 text-sm font-semibold text-cyan">推荐搭配方法</p>
      <FlowPills items={method.recommendedPairings} />
    </div>
  );
}

function FlowPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => <Tag key={item}>{item}</Tag>)}
    </div>
  );
}

function Timeline({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item} className="flex gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-sm text-cyan">{index + 1}</span>
          <p className="pt-1 text-sm leading-6 text-slate-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

function TopicPanel({
  title,
  desc,
  items,
  visualization,
  footer
}: {
  title: string;
  desc: string;
  items: { title: string; main: string; groups: [string, string[]][] }[];
  visualization: MethodVisualizationSpec;
  footer?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return (
    <WorkspaceGrid
      title={title}
      desc={desc}
      left={<SelectorRail title="实验类型" items={items.map((entry, index) => ({ id: String(index), label: entry.title }))} active={String(active)} onSelect={(id) => setActive(Number(id))} />}
      main={
        <div className="space-y-4">
          <GlassCard className="border-cyan/30 bg-cyan/[0.06]">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.main}</p>
          </GlassCard>
          <MethodVisualizationCard visualization={visualization} />
          <div className="grid gap-3 xl:grid-cols-2">
            {item.groups.map(([groupTitle, groupItems]) => (
              <GlassCard key={groupTitle}>
                <InfoBlock title={groupTitle} items={groupItems} tone={groupTitle.includes("不能") || groupTitle.includes("提醒") || groupTitle.includes("局限") ? "amber" : "cyan"} />
              </GlassCard>
            ))}
          </div>
          {footer}
        </div>
      }
      right={<LanguageRulesPanel />}
      bottom={<CorrelationStrip />}
    />
  );
}

function LanguageRulesPanel() {
  return (
    <GlassCard className="p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan"><Sparkles size={16} />严谨表达</p>
      <InfoBlock title="推荐表达" items={rigorousLanguageRules.preferred} tone="emerald" />
      <div className="mt-3">
        <InfoBlock title="避免表达" items={rigorousLanguageRules.avoid} tone="amber" />
      </div>
    </GlassCard>
  );
}

function ChecklistPanel() {
  return (
    <GlassCard className="p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan"><CheckCircle2 size={16} />严谨性检查清单</p>
      <InfoList items={rigorousLanguageRules.checklist} />
    </GlassCard>
  );
}

function CorrelationMiniMatrix() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-cyan">对应矩阵</p>
      {experimentDFTCorrelations.map((item) => (
        <div key={item.id} className="rounded-lg border border-blue-500/25 bg-blue-500/10 p-3">
          <p className="text-sm font-semibold text-white">{item.experimentalSignal}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{item.dftAnalysis.join(" / ")}</p>
        </div>
      ))}
    </div>
  );
}

function SearchBox() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-500">
      <Search size={16} />
      方法库按科学类别组织
    </div>
  );
}

function vizFromLayer(name: string, methods: string[]): MethodVisualizationSpec {
  return viz(`${name} 工作流`, "workflow-diagram", methods.slice(0, 5), ["证据层级边界", "相邻层互补", "DFT 是否受实验约束"], ["支持该层目的下的多证据组合。"], ["不能越过证据层级直接给出完整机制结论。"]);
}

function viz(
  title: string,
  type: MethodVisualizationSpec["type"],
  keyLabels: string[],
  whatToObserve: string[],
  supportedConclusion: string[],
  unsupportedConclusion: string[],
  description = "示意图用于提示应观察的关键信号，不能替代真实实验数据。"
): MethodVisualizationSpec {
  return { title, type, description, keyLabels, whatToObserve, supportedConclusion, unsupportedConclusion };
}

function renderMethodSketch(visualization: MethodVisualizationSpec) {
  const title = visualization.title;
  if (title.startsWith("XRD")) return <LineSpectrumSketch mode="xrd" />;
  if (title.startsWith("SEM")) return <SemParticleSketch labels={visualization.keyLabels} />;
  if (title.includes("SAED")) return <TemSaedSketch />;
  if (title.includes("亮点")) return <HaadfSketch />;
  if (title.includes("mapping")) return <EdsMapSketch />;
  if (title.startsWith("XPS")) return <LineSpectrumSketch mode="xps" />;
  if (title.includes("EXAFS") || title.includes("WT")) return <LineSpectrumSketch mode="exafs" />;
  if (title.includes("D/G") || title.includes("Raman")) return <LineSpectrumSketch mode="raman" />;
  if (title.includes("g≈2.00")) return <LineSpectrumSketch mode="epr" />;
  if (title.includes("吸脱附")) return <BetSketch />;
  if (title.includes("UV-vis")) return <UvVisAdsorptionSketch />;
  if (title.includes("H 型池")) return <HCellLiPSSketch />;
  if (title.includes("对称电池")) return <CellCvSketch />;
  if (title.includes("Li2S 成核")) return <LineSpectrumSketch mode="li2s" />;
  if (title.includes("CV 峰位")) return <LineSpectrumSketch mode="cv" />;
  if (title.includes("Nyquist")) return <LineSpectrumSketch mode="eis" />;
  if (title.includes("充放电平台")) return <LineSpectrumSketch mode="gcd" />;
  if (title.includes("GITT")) return <LineSpectrumSketch mode="gitt" />;

  if (visualization.type === "spectrum-curve") return <SpectrumSketch labels={visualization.keyLabels} />;
  if (visualization.type === "microscopy-sketch") return <MicroscopySketch labels={visualization.keyLabels} />;
  if (visualization.type === "comparison-chart") return <ComparisonSketch labels={visualization.keyLabels} />;
  if (visualization.type === "principle-schematic") return <PrincipleSketch labels={visualization.keyLabels} />;
  return <WorkflowSketch labels={visualization.keyLabels} />;
}

function FigureAxes({ x, y }: { x: string; y: string }) {
  return (
    <>
      <path d="M52 206H488M52 206V30" stroke="#64748b" strokeWidth="1.3" />
      <text x="440" y="232" fill="#cbd5e1" fontSize="12">{x}</text>
      <text x="16" y="42" fill="#cbd5e1" fontSize="12">{y}</text>
    </>
  );
}

function LineSpectrumSketch({ mode }: { mode: "xrd" | "xps" | "exafs" | "raman" | "epr" | "li2s" | "cv" | "eis" | "gcd" | "gitt" }) {
  const axis = {
    xrd: ["2θ", "Intensity"],
    xps: ["Binding energy", "Intensity"],
    exafs: ["R / k space", "χ(R) / WT"],
    raman: ["Raman shift", "Intensity"],
    epr: ["Magnetic field", "Signal"],
    li2s: ["Time", "Current"],
    cv: ["Potential", "Current"],
    eis: ["Z'", "-Z''"],
    gcd: ["Capacity", "Voltage"],
    gitt: ["Time", "Voltage"]
  }[mode];

  return (
    <svg viewBox="0 0 540 250" className="h-full min-h-52 w-full">
      <FigureAxes x={axis[0]} y={axis[1]} />
      {mode === "xrd" && (
        <>
          {[[92, 170, "(002)"], [164, 90, "(101)"], [246, 126, "(103)"], [328, 62, "target"], [426, 148, "impurity"]].map(([x, top, label], index) => (
            <g key={label}>
              <path d={`M ${Number(x) - 18} 198 C ${Number(x) - 7} 198, ${Number(x) - 5} ${top}, ${x} ${top} C ${Number(x) + 5} ${top}, ${Number(x) + 7} 198, ${Number(x) + 18} 198`} fill="none" stroke={index === 4 ? "#f59e0b" : "#67e8f9"} strokeWidth="3.4" />
              <text x={Number(x) - 22} y={Number(top) - 18} fill={index === 4 ? "#fbbf24" : "#cbd5e1"} fontSize="12">{label}</text>
            </g>
          ))}
          <path d="M78 214 C92 228,108 228,124 214" fill="none" stroke="#a78bfa" strokeWidth="2" />
          <text x="64" y="240" fill="#a5b4fc" fontSize="12">low-angle shift / d-spacing</text>
        </>
      )}
      {mode === "xps" && (
        <>
          <path d="M70 196 C105 190,120 106,150 110 C178 114,184 190,216 196 C250 198,268 134,294 136 C320 138,334 194,374 198 C410 200,448 198,486 196" fill="none" stroke="#67e8f9" strokeWidth="3.5" />
          <path d="M82 196 C112 192,128 124,156 126 C182 128,190 190,222 196M244 196 C268 192,280 154,306 154 C330 154,340 192,370 196" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M150 88 H182" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowAmber)" />
          <text x="108" y="74" fill="#fef3c7" fontSize="12">adsorption shift</text>
          <text x="86" y="224" fill="#cbd5e1" fontSize="12">constrained peak fitting</text>
        </>
      )}
      {mode === "exafs" && (
        <>
          <path d="M68 192 C90 148,112 78,138 112 C166 150,190 176,218 162 C242 150,260 106,286 132 C320 166,354 178,392 152 C430 126,456 104,486 136" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <line x1="140" x2="140" y1="52" y2="206" stroke="#334155" strokeDasharray="4 7" />
          <line x1="350" x2="350" y1="52" y2="206" stroke="#334155" strokeDasharray="4 7" />
          <text x="106" y="48" fill="#cbd5e1" fontSize="12">M-N/M-S</text>
          <text x="330" y="76" fill="#fbbf24" fontSize="12">M-M?</text>
          <circle cx="350" cy="70" r="21" fill="none" stroke="#f59e0b" strokeDasharray="4 4" />
        </>
      )}
      {mode === "raman" && (
        <>
          <path d="M64 196 C102 194,110 72,146 74 C184 76,190 194,228 196 C270 198,278 92,316 92 C352 92,360 194,404 196 C426 196,438 150,458 152 C474 154,482 184,496 188" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <path d="M70 202 C112 198,120 98,154 100 C190 102,198 198,232 202 C270 204,282 118,318 118 C352 118,364 196,404 202" fill="none" stroke="#f59e0b" strokeWidth="2.4" />
          <text x="128" y="58" fill="#cbd5e1" fontSize="12">D</text><text x="300" y="78" fill="#cbd5e1" fontSize="12">G</text><text x="432" y="138" fill="#fef3c7" fontSize="12">LiPS</text>
        </>
      )}
      {mode === "epr" && (
        <>
          <path d="M72 140 C132 140,164 142,210 140 C238 138,246 62,264 62 C282 62,292 214,312 214 C332 214,338 142,360 140 C410 138,452 140,486 140" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <path d="M72 154 C140 154,204 154,238 152 C254 150,260 118,272 118 C284 118,290 184,304 184 C318 184,326 156,360 154 C406 152,454 154,486 154" fill="none" stroke="#f59e0b" strokeWidth="2.4" />
          <line x1="274" x2="274" y1="44" y2="206" stroke="#334155" strokeDasharray="4 7" />
          <text x="286" y="54" fill="#cbd5e1" fontSize="12">g≈2.00 defect signal</text>
        </>
      )}
      {mode === "li2s" && (
        <>
          <path d="M62 188 C96 186,128 186,156 184 C176 182,182 112,208 86 C232 62,270 86,286 128 C306 180,354 196,486 198" fill="none" stroke="#67e8f9" strokeWidth="3.5" />
          <path d="M62 192 C118 190,154 190,186 188 C210 186,224 132,252 116 C282 98,318 122,336 158 C362 200,410 202,486 202" fill="none" stroke="#f59e0b" strokeWidth="2.6" />
          <path d="M196 188 C220 144,254 120,286 128 C274 172,236 190,196 188" fill="#38bdf8" opacity=".16" />
          <text x="130" y="58" fill="#cbd5e1" fontSize="12">earlier onset</text><text x="226" y="68" fill="#cbd5e1" fontSize="12">peak / area</text>
        </>
      )}
      {mode === "cv" && (
        <>
          <path d="M82 136 C132 48,206 54,238 118 C266 176,340 204,442 178 C360 224,232 230,158 186 C112 160,88 150,82 136" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <path d="M98 140 C154 76,206 82,230 126 C256 174,326 192,416 172 C340 210,236 214,166 184 C126 166,104 150,98 140" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="166" y="62" fill="#cbd5e1" fontSize="12">redox peaks</text><text x="326" y="216" fill="#cbd5e1" fontSize="12">peak separation</text>
        </>
      )}
      {mode === "eis" && (
        <>
          <path d="M70 206 C92 144,172 144,198 206 C236 206,274 178,312 164 C370 142,424 126,486 100" fill="none" stroke="#67e8f9" strokeWidth="3.5" />
          <path d="M70 206 C84 172,130 172,148 206 C190 206,236 190,282 172 C350 146,416 124,486 88" fill="none" stroke="#f59e0b" strokeWidth="2.6" />
          <text x="86" y="236" fill="#fef3c7" fontSize="12">Rct semicircle</text><text x="342" y="136" fill="#cbd5e1" fontSize="12">Warburg diffusion</text>
        </>
      )}
      {mode === "gcd" && (
        <>
          <path d="M68 64 H176 C210 66,222 100,246 106 H366 C400 108,420 150,468 164" fill="none" stroke="#67e8f9" strokeWidth="3.3" />
          <path d="M68 188 H176 C212 186,226 150,250 144 H366 C400 142,420 104,468 92" fill="none" stroke="#f59e0b" strokeWidth="3.3" />
          <path d="M326 106 V144" stroke="#fbbf24" strokeWidth="2" />
          <text x="336" y="130" fill="#fef3c7" fontSize="12">polarization</text><text x="108" y="54" fill="#cbd5e1" fontSize="12">charge/discharge plateaus</text>
        </>
      )}
      {mode === "gitt" && (
        <>
          <path d="M66 176 L92 176 L92 142 L128 150 L128 166 L164 172 L164 136 L200 146 L200 162 L236 168 L236 130 L272 142 L272 158 L308 164 L308 124 L344 138 L344 154 L380 160 L380 118 L416 134 L416 150 L472 158" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <path d="M92 142 V176M128 150 V166M164 136 V172M200 146 V162M236 130 V168M272 142 V158" stroke="#f59e0b" strokeDasharray="4 5" />
          <text x="104" y="118" fill="#cbd5e1" fontSize="12">pulse</text><text x="210" y="190" fill="#cbd5e1" fontSize="12">relaxation</text>
        </>
      )}
    </svg>
  );
}

function SemParticleSketch({ labels }: { labels: string[] }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg bg-[#020617]">
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} className="absolute rounded-full border border-cyan/30 bg-cyan/10" style={{ left: `${6 + (index * 19) % 82}%`, top: `${12 + (index * 29) % 58}%`, width: `${42 + (index % 3) * 18}px`, height: `${34 + (index % 4) * 12}px` }} />
      ))}
      {Array.from({ length: 30 }).map((_, index) => <span key={`pore-${index}`} className="absolute rounded-full bg-slate-950/85 ring-1 ring-slate-500/25" style={{ left: `${8 + (index * 13) % 82}%`, top: `${16 + (index * 23) % 66}%`, width: 6 + (index % 4), height: 6 + (index % 4) }} />)}
      <div className="absolute bottom-4 left-4 h-2 w-28 rounded bg-slate-200/80" /><span className="absolute bottom-7 left-4 text-xs text-slate-300">500 nm</span>
      <ResearchDemoLabel className="absolute right-4 top-4" tone="amber">post-cycling deposit</ResearchDemoLabel>
      <div className="absolute bottom-4 right-4 flex flex-wrap justify-end gap-2">{labels.slice(0, 3).map((label) => <ResearchDemoLabel key={label}>{label}</ResearchDemoLabel>)}</div>
    </div>
  );
}

function TemSaedSketch() {
  return (
    <svg viewBox="0 0 540 250" className="h-full min-h-52 w-full">
      <rect x="38" y="36" width="250" height="170" rx="20" fill="#071426" stroke="#38bdf8" strokeOpacity=".35" />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${66 + i * 20} 68 L${126 + i * 20} 176`} stroke="#67e8f9" strokeWidth="2" opacity=".62" />)}
      <path d="M176 50 C198 86,194 126,214 158 C226 178,250 190,276 194" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6 6" />
      <text x="72" y="52" fill="#cbd5e1" fontSize="12">lattice fringes</text><text x="202" y="92" fill="#fef3c7" fontSize="12">interface</text>
      <g transform="translate(378 120)"><circle r="64" fill="#020617" stroke="#64748b" /><circle r="23" fill="none" stroke="#67e8f9" strokeWidth="2.5" /><circle r="43" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 5" /><circle r="58" fill="none" stroke="#f59e0b" strokeWidth="1.8" />{Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 6) * 43} cy={Math.sin(i * Math.PI / 6) * 43} r="2.3" fill="#e0f2fe" />)}</g>
      <text x="342" y="212" fill="#cbd5e1" fontSize="12">SAED rings / spots</text>
    </svg>
  );
}

function HaadfSketch() {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_45%_50%,rgba(30,41,59,.9),#020617_68%)]">
      {Array.from({ length: 90 }).map((_, index) => <span key={index} className="absolute h-1 w-1 rounded-full bg-slate-400/20" style={{ left: `${4 + (index * 17) % 92}%`, top: `${8 + (index * 31) % 82}%` }} />)}
      {Array.from({ length: 12 }).map((_, index) => <span key={`single-${index}`} className="demo-pulse absolute h-2.5 w-2.5 rounded-full bg-cyan-100 shadow-[0_0_18px_#67e8f9]" style={{ left: `${12 + (index * 29) % 72}%`, top: `${14 + (index * 37) % 64}%`, animationDelay: `${index * 0.12}s` }} />)}
      <span className="absolute left-[58%] top-[37%] h-3 w-7 rounded-full bg-cyan-100 shadow-[0_0_20px_#67e8f9]" />
      <span className="absolute right-[16%] top-[58%] h-12 w-12 rounded-full border border-amber-300/70 bg-amber-300/25" />
      <ResearchDemoLabel className="absolute left-4 top-4">isolated high-Z dots</ResearchDemoLabel><ResearchDemoLabel className="absolute bottom-4 right-4" tone="amber">cluster check</ResearchDemoLabel>
    </div>
  );
}

function EdsMapSketch() {
  const maps = [["M", "#38bdf8"], ["N/O/S", "#a78bfa"], ["C", "#34d399"], ["overlay", "#fbbf24"]] as const;
  return (
    <div className="grid h-56 grid-cols-4 gap-2">
      {maps.map(([label, color], mapIndex) => (
        <div key={label} className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-950/70">
          {Array.from({ length: 34 }).map((_, index) => <span key={index} className="absolute rounded-full" style={{ backgroundColor: color, opacity: mapIndex === 3 ? 0.28 + (index % 3) * 0.18 : 0.18 + (index % 4) * 0.14, left: `${8 + (index * (mapIndex + 7)) % 82}%`, top: `${10 + (index * (mapIndex + 11)) % 76}%`, width: 4 + (index % 3), height: 4 + (index % 3) }} />)}
          <span className="absolute bottom-2 left-2 text-xs font-semibold text-slate-100">{label}</span>
        </div>
      ))}
    </div>
  );
}

function BetSketch() {
  return (
    <svg viewBox="0 0 540 250" className="h-full min-h-52 w-full">
      <path d="M48 206H248M48 206V34M310 206H500M310 206V34" stroke="#64748b" />
      <path d="M58 194 C84 186,104 174,126 154 C150 132,164 108,184 104 C208 100,226 132,238 166" fill="none" stroke="#67e8f9" strokeWidth="3" />
      <path d="M58 184 C96 176,124 150,152 116 C178 84,210 94,238 144" fill="none" stroke="#f59e0b" strokeWidth="2.4" />
      {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={326 + i * 22} y={190 - ((i * 31) % 86)} width="12" height={16 + ((i * 31) % 86)} rx="3" fill={i === 3 ? "#f59e0b" : "#38bdf8"} opacity=".86" />)}
      <text x="72" y="48" fill="#cbd5e1" fontSize="12">isotherm hysteresis</text><text x="340" y="48" fill="#cbd5e1" fontSize="12">pore distribution</text>
    </svg>
  );
}

function UvVisAdsorptionSketch() {
  return (
    <div className="grid h-56 grid-cols-[.85fr_1.15fr] gap-3">
      <div className="flex items-end justify-center gap-4 rounded-lg border border-cyan/25 bg-slate-950/60 p-4">{["blank", "host", "catalyst"].map((label, i) => <div key={label} className="text-center"><div className="mx-auto h-28 w-10 rounded-b-2xl rounded-t-md border border-slate-400/35" style={{ background: `rgba(250, 204, 21, ${0.78 - i * 0.23})` }} /><p className="mt-2 text-xs text-slate-300">{label}</p></div>)}</div>
      <svg viewBox="0 0 300 220" className="h-full w-full rounded-lg border border-cyan/25 bg-slate-950/60"><path d="M38 184H268M38 184V28" stroke="#64748b" /><path d="M48 176 C80 166,96 68,126 72 C158 76,166 174,204 176 C230 178,246 130,264 142" fill="none" stroke="#f59e0b" strokeWidth="3" /><path d="M48 180 C84 174,102 118,130 122 C158 126,170 178,204 180 C232 182,246 154,264 160" fill="none" stroke="#67e8f9" strokeWidth="3" /><text x="74" y="48" fill="#fef3c7" fontSize="12">absorbance drop</text></svg>
    </div>
  );
}

function HCellLiPSSketch() {
  return (
    <svg viewBox="0 0 540 250" className="h-full min-h-52 w-full">
      <path d="M90 54 H204 V92 H236 V54 H450 V202 H330 V164 H208 V202 H90 Z" fill="#071426" stroke="#67e8f9" strokeWidth="2" />
      <rect x="104" y="74" width="118" height="108" rx="12" fill="rgba(250,204,21,.28)" stroke="#f59e0b" /><rect x="318" y="74" width="118" height="108" rx="12" fill="rgba(14,165,233,.08)" stroke="#38bdf8" /><rect x="250" y="72" width="38" height="112" rx="8" fill="rgba(52,211,153,.18)" stroke="#34d399" />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M${162 + i * 16} ${120 + (i % 2) * 14} C230 ${86 + i * 12},286 ${154 - i * 6},358 ${118 + i * 9}`} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 6" opacity=".78" />)}
      <text x="126" y="66" fill="#fef3c7" fontSize="12">LiPS donor</text><text x="246" y="204" fill="#bbf7d0" fontSize="12">separator</text><text x="338" y="66" fill="#cbd5e1" fontSize="12">receiving side</text>
    </svg>
  );
}

function CellCvSketch() {
  return (
    <svg viewBox="0 0 540 250" className="h-full min-h-52 w-full">
      <rect x="50" y="62" width="76" height="126" rx="10" fill="#0f172a" stroke="#67e8f9" /><rect x="414" y="62" width="76" height="126" rx="10" fill="#0f172a" stroke="#67e8f9" /><rect x="170" y="88" width="200" height="74" rx="18" fill="rgba(250,204,21,.18)" stroke="#f59e0b" />
      <path d="M128 126 H168M372 126 H412" stroke="#94a3b8" strokeWidth="2" /><path d="M88 46 C152 32,168 40,226 32 C292 22,330 46,390 36 C426 30,458 36,486 44" fill="none" stroke="#67e8f9" strokeWidth="3" /><path d="M84 210 C150 220,178 198,232 208 C294 220,328 196,390 208 C434 216,462 212,490 204" fill="none" stroke="#a78bfa" strokeWidth="2.6" />
      <text x="70" y="204" fill="#cbd5e1" fontSize="12">identical catalyst electrodes</text><text x="198" y="134" fill="#fef3c7" fontSize="12">LiPS electrolyte redox</text>
    </svg>
  );
}

function SpectrumSketch({ labels }: { labels: string[] }) {
  return (
    <svg viewBox="0 0 520 250" className="h-full min-h-52 w-full">
      <defs>
        <linearGradient id="curve" x1="0" x2="1"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#a78bfa" /></linearGradient>
      </defs>
      <path d="M42 210H485M42 210V24" stroke="#475569" strokeWidth="1.4" />
      <path d="M48 190 C80 178,100 82,128 178 C154 216,174 62,208 152 C244 224,270 44,306 132 C340 194,360 112,392 142 C430 180,450 86,482 122" fill="none" stroke="url(#curve)" strokeWidth="4" className="demo-draw" />
      <path d="M50 205 C116 198,148 160,206 184 C260 210,310 160,382 182 C430 196,462 158,484 170" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="demo-flow" opacity=".85" />
      {labels.slice(0, 5).map((label, index) => (
        <g key={label}>
          <line x1={100 + index * 78} x2={100 + index * 78} y1="42" y2="210" stroke="#334155" strokeDasharray="4 7" />
          <text x={86 + index * 78} y={34 + (index % 2) * 18} fill="#cbd5e1" fontSize="12">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function MicroscopySketch({ labels }: { labels: string[] }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_30%_35%,rgba(30,64,175,.55),transparent_22%),radial-gradient(circle_at_70%_60%,rgba(15,23,42,.9),transparent_28%),#020617]">
      {Array.from({ length: 34 }).map((_, index) => (
        <span key={index} className="absolute rounded-full bg-slate-500/30" style={{ left: `${(index * 31) % 96}%`, top: `${(index * 47) % 88}%`, width: 2 + (index % 4), height: 2 + (index % 4) }} />
      ))}
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={`bright-${index}`} className="demo-pulse absolute h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_#67e8f9]" style={{ left: `${12 + ((index * 17) % 74)}%`, top: `${18 + ((index * 23) % 60)}%`, animationDelay: `${index * 0.16}s` }} />
      ))}
      <span className="absolute right-14 top-16 h-10 w-12 rounded-full border border-amber-300/50 bg-amber-300/20 shadow-[0_0_20px_rgba(251,191,36,.25)]" />
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
        {labels.slice(0, 4).map((label) => <Tag key={label}>{label}</Tag>)}
      </div>
    </div>
  );
}

function ComparisonSketch({ labels }: { labels: string[] }) {
  return (
    <div className="grid h-56 grid-cols-3 gap-3">
      {["对照", "载体", "催化剂"].map((name, index) => (
        <ResearchDemoPanel key={name} className="flex flex-col justify-between border-blue-500/25 bg-blue-500/10">
          <p className="text-sm font-semibold text-white">{name}</p>
          <div className="flex h-24 items-end gap-2">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-700 to-cyan-300" style={{ height: `${24 + ((i + index) * 13) % 64}%` }} />)}
          </div>
          <p className="text-xs leading-5 text-slate-400">{labels[index] ?? "signal"}</p>
        </ResearchDemoPanel>
      ))}
    </div>
  );
}

function PrincipleSketch({ labels }: { labels: string[] }) {
  return (
    <div className="flex h-56 items-center justify-center gap-3">
      {["供体池", "功能层", "接收池"].map((name, index) => (
        <div key={name} className="flex items-center gap-3">
          <ResearchDemoNode tone={index === 1 ? "cyan" : "blue"} className={`grid h-32 w-28 place-items-center ${index === 1 ? "demo-pulse" : ""}`}>
            <span>{labels[index] ?? name}</span>
          </ResearchDemoNode>
          {index < 2 && <ArrowRight className="text-blue-300" />}
        </div>
      ))}
    </div>
  );
}

function WorkflowSketch({ labels }: { labels: string[] }) {
  return (
    <div className="flex h-56 flex-wrap items-center justify-center gap-3">
      {(labels.length ? labels : characterizationEvidenceFlow).slice(0, 6).map((label, index, arr) => (
        <div key={label} className="flex items-center gap-3">
          <ResearchDemoNode tone={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "blue" : "violet"}>{label}</ResearchDemoNode>
          {index < arr.length - 1 && <ArrowRight size={18} className="text-blue-300" />}
        </div>
      ))}
    </div>
  );
}
