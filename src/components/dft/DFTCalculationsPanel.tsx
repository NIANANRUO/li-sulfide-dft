"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AlertTriangle, Atom, Beaker, FileCode2, FlaskConical, Pause, Play, RotateCcw, Workflow } from "lucide-react";
import { GlassCard, InfoList, Tag } from "@/components/UI";
import {
  ResearchDemoFrame,
  ResearchDemoLabel,
  ResearchDemoNode,
  ResearchDemoPanel,
  ResearchDemoSvgDefs,
} from "@/components/ResearchDemoFrame";
import {
  adsorptionEnergyMockData,
  calculationTaskOptions,
  catalystModelGuides,
  catalystSystemOptions,
  dftCalculationTasks,
  dftScientificChecks,
  dftTabs,
  experimentDFTMaps,
  freeEnergyMockData,
  lipsSpeciesOptions,
  nebMockData,
  overviewCards,
  pdosMockData,
  pitfalls,
  postProcessingTools,
  vaspTemplates,
  workflowSteps
} from "@/data/dftCalculationsData";

const colors = ["#38bdf8", "#22c55e", "#f59e0b", "#a78bfa", "#fb7185"];

export function DFTCalculationsPanel({ activeTabLabel }: { activeTabLabel?: string }) {
  const [activeTab, setActiveTab] = useState(dftTabs.find((item) => item.label === activeTabLabel)?.id ?? "overview");
  const [system, setSystem] = useState(catalystSystemOptions[0]);
  const [species, setSpecies] = useState("Li2S4");
  const [task, setTask] = useState("吸附能");

  useEffect(() => {
    const next = dftTabs.find((item) => item.label === activeTabLabel);
    if (next) setActiveTab(next.id);
  }, [activeTabLabel]);

  const tab = dftTabs.find((item) => item.id === activeTab) ?? dftTabs[0];
  const selectedTask = dftCalculationTasks.find((item) => task.includes(item.name.slice(0, 2))) ?? dftCalculationTasks[0];

  return (
    <div className="flex min-h-0 flex-col gap-4 lg:h-[calc(100vh-10.75rem)] lg:overflow-hidden">
      <div className="shrink-0 rounded-xl border border-blue-500/45 bg-[#07162c]/92 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">DFT 计算</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">DFT/VASP 第一性原理计算方法库</h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">{tab.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag>模板参数</Tag>
            <Tag>需收敛测试</Tag>
            <Tag>示意图 / 模拟数据</Tag>
          </div>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Selector label="催化剂体系" value={system} options={catalystSystemOptions} onChange={setSystem} />
          <Selector label="LiPS 物种" value={species} options={lipsSpeciesOptions} onChange={setSpecies} />
          <Selector label="计算任务" value={task} options={calculationTaskOptions} onChange={setTask} />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-5 lg:overflow-hidden 2xl:grid-cols-[17rem_minmax(0,1fr)_22rem]">
        <aside className="space-y-4 lg:min-h-0 lg:overflow-y-auto lg:pr-2 dft-scrollbar">
          <GlassCard className="border-blue-500/40 bg-[#081327]/90">
            <p className="mb-3 text-sm font-semibold text-cyan">二级标签</p>
            <div className="grid gap-1.5">
              {dftTabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeTab === item.id ? "bg-blue-500/25 text-white shadow-[inset_3px_0_0_#38bdf8]" : "text-slate-300 hover:bg-blue-500/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="border-cyan/25">
            <p className="mb-3 text-sm font-semibold text-cyan">当前任务位置</p>
            <MiniWorkflow active={task} />
          </GlassCard>
        </aside>

        <main className="min-w-0 space-y-5 lg:min-h-0 lg:overflow-y-auto lg:pr-2 dft-scrollbar">
          <PanelTitle title={tab.title} desc={tab.description} />
          {renderPanel(activeTab, system, species, task)}
          <BottomNavigator task={selectedTask.name} />
        </main>

        <div className="lg:min-h-0 lg:overflow-y-auto lg:pr-2 dft-scrollbar">
          <RightExplanation task={selectedTask} system={system} species={species} />
        </div>
      </div>
    </div>
  );
}

function renderPanel(tab: string, system: string, species: string, task: string) {
  if (tab === "overview") return <DFTOverviewPanel />;
  if (tab === "workflow") return <DFTWorkflowPanel />;
  if (tab === "model-building") return <ModelConstructionPanel selectedSystem={system} />;
  if (tab === "lips-adsorption-model") return <LiPSAdsorptionModelPanel species={species} />;
  if (tab === "adsorption-energy") return <AdsorptionEnergyPanel />;
  if (tab === "free-energy") return <FreeEnergyPathPanel />;
  if (tab === "bader") return <BaderChargePanel />;
  if (tab === "charge-density-difference") return <ChargeDensityDifferencePanel />;
  if (tab === "dos-pdos-ldos") return <DOSAnalysisPanel />;
  if (tab === "cohp") return <COHPAnalysisPanel />;
  if (tab === "neb") return <NEBAnalysisPanel />;
  if (tab === "vasp-templates") return <VASPTemplatesPanel />;
  if (tab === "post-processing") return <PostProcessingPanel />;
  if (tab === "experiment-dft") return <ExperimentDFTMappingPanel />;
  if (tab === "pitfalls") return <DFTPitfallsPanel />;
  return <TaskDynamicPanel task={task} />;
}

export function DFTTaskSelector() {
  return <DFTCalculationsPanel />;
}

function Selector({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 rounded-lg border border-[#31547f] bg-slate-950/40 p-3 text-sm text-slate-400">
      {label}
      <select className="rounded-lg border border-slate-700 bg-[#020814] px-3 py-2.5 text-white outline-none focus:border-cyan" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function PanelTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-[#31547f] bg-[#081327]/86 p-5">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
    </div>
  );
}

export function DFTOverviewPanel() {
  return (
    <div className="space-y-5">
      <GlassCard>
        <p className="text-sm leading-7 text-slate-300">
          DFT 计算可以从原子尺度解释催化剂与 LiPS 之间的相互作用，分析界面电荷转移、电子结构变化、成键特征和反应路径。它常用于解释为什么某种催化剂能够吸附 LiPS、促进 LiPS 转化、降低 Li2S 成核/分解能垒，以及改善反应动力学。然而，DFT 模型是简化模型，不能直接替代真实电池实验。
        </p>
      </GlassCard>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewCards.map(([title, desc], index) => (
          <GlassCard key={title} className="relative overflow-hidden">
            <div className="absolute right-4 top-4 text-blue-400/20">
              <Atom size={64} strokeWidth={1} />
            </div>
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-cyan/15 text-sm font-bold text-cyan">{index + 1}</div>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
          </GlassCard>
        ))}
      </div>
      <TwoColumnNotes
        leftTitle="DFT 能解决什么"
        left={["比较催化剂表面和 LiPS 的相互作用趋势", "解释吸附前后电荷转移和轨道耦合", "识别可能的热力学限速步骤", "估算特定初态/终态之间的动力学能垒"]}
        rightTitle="DFT 不能直接解决什么"
        right={["不能完整模拟真实电解液、厚电极和贫电解液全电芯", "不能用单一吸附能证明完整催化机制", "不能把简化模型直接等同真实无序材料", "不能跳过收敛测试直接照搬模板参数"]}
      />
    </div>
  );
}

export function DFTWorkflowPanel() {
  return (
    <div className="space-y-5">
      <DFTWorkflowAnimation />
      <FlowDiagram />
      <div className="grid gap-4 lg:grid-cols-3">
        {workflowSteps.map((step, index) => (
          <GlassCard key={step.name}>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan/40 text-sm text-cyan">{index + 1}</span>
              <h4 className="font-semibold text-white">{step.name}</h4>
            </div>
            <p className="text-xs text-slate-500">输入：{step.input}</p>
            <p className="mt-1 text-xs text-slate-500">输出：{step.output}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{step.goal}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export function DFTWorkflowAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % workflowSteps.length), 1800);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <GlassCard className="border-blue-500/45 bg-[#07162c]/92">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xl font-semibold text-white">逐步点亮计算流程</h4>
          <p className="mt-1 text-sm text-slate-400">动画用于说明输入文件、输出文件和分析目标的先后关系。</p>
        </div>
        <div className="flex gap-2">
          <IconButton label={playing ? "暂停" : "播放"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={16} /> : <Play size={16} />}</IconButton>
          <IconButton label="重播" onClick={() => setStep(0)}><RotateCcw size={16} /></IconButton>
        </div>
      </div>
      <DFTWorkflowScene step={step} onSelect={(index) => { setStep(index); setPlaying(false); }} />
      <div className="mt-4 grid gap-3 rounded-lg border border-slate-700/70 bg-slate-950/45 p-4 md:grid-cols-3">
        <InfoPill title="输入文件 / 依据" value={workflowSteps[step].input} />
        <InfoPill title="输出文件 / 结果" value={workflowSteps[step].output} />
        <InfoPill title="分析目标" value={workflowSteps[step].goal} />
      </div>
    </GlassCard>
  );
}

export function ModelConstructionPanel({ selectedSystem }: { selectedSystem: string }) {
  const guide = catalystModelGuides.find((item) => selectedSystem.includes(item.systemName.slice(0, 2))) ?? catalystModelGuides[0];
  const modelType = resolveDftModelType(selectedSystem, guide.id);
  return (
    <div className="space-y-5">
      <ModelSketch guide={guide} selectedSystem={selectedSystem} modelType={modelType} />
      <div className="grid gap-4 xl:grid-cols-2">
        {catalystModelGuides.map((item) => (
          <GlassCard key={item.id} className={item.id === guide.id ? "border-cyan/60" : ""}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-white">{item.systemName}</h4>
              {item.representativeModels.slice(0, 3).map((model) => <Tag key={model}>{model}</Tag>)}
            </div>
            <GridInfo title="建模步骤" items={item.modelBuildingSteps} />
            <GridInfo title="适用问题" items={item.recommendedTasks} />
            <GridInfo title="需要注意的近似" items={item.keyApproximation} />
            <GridInfo title="推荐后处理 / 谨慎点" items={item.cautions} />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function resolveDftModelType(selectedSystem: string, fallback: string) {
  if (selectedSystem.includes("MXene")) return "mxene";
  if (selectedSystem.includes("高熵") || selectedSystem.includes("多组分")) return "multi-component";
  if (selectedSystem.includes("磷化") || selectedSystem.includes("碳化")) return "metal-phosphide-carbide";
  if (selectedSystem.includes("氮化")) return "metal-nitride";
  if (selectedSystem.includes("硫化")) return "metal-sulfide";
  if (selectedSystem.includes("氧化")) return "metal-oxide";
  if (selectedSystem.includes("异质")) return "heterojunction";
  if (selectedSystem.includes("双原子")) return "dual-atom";
  if (selectedSystem.includes("缺陷") || selectedSystem.includes("掺杂")) return "defect-carbon";
  if (selectedSystem.includes("单原子")) return "single-atom";
  return fallback;
}

export function LiPSAdsorptionModelPanel({ species }: { species: string }) {
  const modes = ["Li 端吸附", "S 端吸附", "平躺吸附", "端基吸附", "桥连吸附", "界面吸附", "空位吸附", "双金属桥连吸附"];
  return (
    <div className="space-y-5">
      <LiPSSketch species={species} />
      <div className="grid gap-4 xl:grid-cols-[1fr_.9fr]">
        <GlassCard>
          <h4 className="mb-3 text-lg font-semibold text-white">LiPS 物种选择</h4>
          <p className="text-sm leading-7 text-slate-300">Li2S6 和 Li2S4 常作为代表性可溶性 LiPS 模型；Li2S2 和 Li2S 常用于分析放电后期固相产物转化、成核和分解。</p>
          <div className="mt-4 flex flex-wrap gap-2">{lipsSpeciesOptions.map((item) => <Tag key={item}>{item}</Tag>)}</div>
        </GlassCard>
        <GlassCard>
          <h4 className="mb-3 text-lg font-semibold text-white">气相 LiPS 模型</h4>
          <InfoList items={["使用足够大盒子，避免分子间周期性相互作用", "可使用 Gamma 点", "每个 LiPS 分子先优化并保存 E(LiPS)", "参考态需与吸附体系使用一致泛函、赝势、ENCUT 和收敛标准"]} />
        </GlassCard>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {modes.map((mode) => (
          <GlassCard key={mode} className="text-center">
            <AdsorptionModeIcon mode={mode} />
            <p className="mt-3 text-sm font-semibold text-white">{mode}</p>
          </GlassCard>
        ))}
      </div>
      <TwoColumnNotes
        leftTitle="输出分析记录"
        left={["吸附能和吸附距离", "关键键长：Li-O、Li-N、M-S、Li-S、S-S", "电荷转移、DOS 和 COHP 变化", "多个初始构型优化后的能量排序"]}
        rightTitle="严谨性提醒"
        right={["最终构型不能凭直觉确定", "没有真实 POSCAR/CONTCAR 时只能展示机制示意图", "同一能量比较必须使用一致计算参数", "吸附构型选择会显著影响结论"]}
      />
    </div>
  );
}

export function AdsorptionEnergyPanel() {
  const task = dftCalculationTasks[0];
  return (
    <div className="space-y-5">
      <GlassCard>
        <p className="text-sm text-slate-400">公式和参考态</p>
        <Formula value="E_ads = E(catalyst + LiPS) - E(catalyst) - E(LiPS)" />
        <p className="mt-3 text-sm leading-7 text-slate-300">
          E(catalyst + LiPS)、E(catalyst)、E(LiPS) 应使用一致的泛函、赝势、截断能、k 点、能量收敛标准和必要的色散校正。吸附能为负通常表示吸附放热，但吸附太强可能导致中间体脱附困难、转化受阻或活性位点钝化。
        </p>
      </GlassCard>
      <AdsorptionEnergyChart />
      <TwoColumnNotes leftTitle="分析步骤" left={task.analysisGuide.concat(["比较同一催化剂对不同 LiPS 的吸附", "结合自由能和 NEB 判断是否真正促进转化"])} rightTitle="常见误区" right={task.commonPitfalls} />
    </div>
  );
}

export function AdsorptionEnergyChart() {
  return <DFTAdsorptionEnergyScene />;
}

function LegacyAdsorptionEnergyChart() {
  return (
    <ResearchDemoFrame title="DFT 计算流程图" minHeight="16rem">
      <ChartHeader title="LiPS 吸附能柱状图" />
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={adsorptionEnergyMockData}>
            <CartesianGrid stroke="#1e3a5f" strokeDasharray="3 3" />
            <XAxis dataKey="species" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" label={{ value: "E_ads / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ background: "#020814", border: "1px solid #31547f", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
            <ReferenceArea y1={-2.4} y2={-1.1} fill="#22c55e" fillOpacity={0.08} label={{ value: "适度吸附窗口", fill: "#86efac", position: "insideTopLeft" }} />
            <ReferenceLine y={-3} stroke="#fb7185" strokeDasharray="5 5" label={{ value: "过强风险", fill: "#fda4af", position: "right" }} />
            {["Fe-N4/C", "Co-N4/C", "TiO2-x", "Ti3C2O2", "MoS2-edge"].map((key, index) => <Bar key={key} dataKey={key} fill={colors[index]} radius={[4, 4, 0, 0]} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ResearchDemoFrame>
  );
}

export function FreeEnergyPathPanel() {
  return (
    <div className="space-y-5">
      <GlassCard>
        <p className="text-sm text-slate-400">自由能修正公式</p>
        <Formula value="ΔG = ΔE_DFT + ΔZPE - TΔS" />
        <p className="mt-3 text-sm leading-7 text-slate-300">ΔE_DFT 来自 DFT 总能差；ΔZPE 是零点能修正；TΔS 是熵修正。固体表面吸附物种的熵贡献通常需要谨慎近似，文献中常使用简化处理，但必须说明近似和参考态。</p>
      </GlassCard>
      <FreeEnergyChart />
      <TwoColumnNotes leftTitle="分析步骤" left={["看整体反应是否热力学有利", "找最高上坡步骤", "比较不同催化剂是否降低关键步骤 ΔG", "结合 NEB 判断动力学能垒", "与 CV、Li2S 成核、对称电池对应"]} rightTitle="常见误区" right={["将自由能路径等同于真实反应速率", "忽略熵和 ZPE 修正近似", "没有说明参考态", "只计算一个中间体就推断完整反应路径"]} />
    </div>
  );
}

export function FreeEnergyChart() {
  return <DFTFreeEnergyScene />;
}

function LegacyFreeEnergyChart() {
  return (
    <GlassCard>
      <ChartHeader title="S8 → Li2S 自由能路径" />
      <div className="h-80">
        <ResponsiveContainer>
          <LineChart data={freeEnergyMockData}>
            <CartesianGrid stroke="#1e3a5f" strokeDasharray="3 3" />
            <XAxis dataKey="step" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" label={{ value: "ΔG / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ background: "#020814", border: "1px solid #31547f", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
            <ReferenceLine x="Li2S2" stroke="#f59e0b" label={{ value: "最高上坡步骤", fill: "#f59e0b", position: "top" }} />
            {["Fe-N4/C", "TiO2-x", "MoS2-edge"].map((key, index) => <Line key={key} dataKey={key} stroke={colors[index]} strokeWidth={3} dot />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function BaderChargePanel() {
  return (
    <TaskPanelLayout
      icon={<Beaker />}
      flow={["静态计算生成 CHGCAR", "LAECHG 输出 AECCAR0 和 AECCAR2", "chgsum.pl AECCAR0 AECCAR2", "bader CHGCAR -ref CHGCAR_sum", "读取 ACF.dat", "对比吸附前后关键原子电荷"]}
      notes={["ACF.dat 中 CHARGE 是电子数相关结果，不应简单当作正负电荷直接解读", "需要结合 POTCAR 中 ZVAL 或统一参考方法", "Bader 结果对网格密度敏感", "需要确保计算收敛和 FFT 网格足够细"]}
      visual={<BaderSketch />}
    />
  );
}

export function ChargeDensityDifferencePanel() {
  return (
    <div className="space-y-5">
      <GlassCard>
        <Formula value="Δρ = ρ(catalyst + LiPS) - ρ(catalyst) - ρ(LiPS)" />
        <p className="mt-3 text-sm leading-7 text-slate-300">三种电荷密度必须在相同晶格、相同原子位置参考下计算：吸附体系、去掉 LiPS 后催化剂部分、去掉催化剂后 LiPS 部分。</p>
      </GlassCard>
      <TaskPanelLayout
        icon={<FlaskConical />}
        flow={["优化吸附体系", "固定吸附体系中的几何位置", "分别计算整体、催化剂、LiPS 的 CHGCAR", "用脚本做电荷密度相减", "使用 VESTA 绘制等值面图"]}
        notes={["黄色表示电子积累，青色表示电子耗尽", "差分电荷图适合做空间重排解释，不宜过度定量化", "不同几何结构、不同网格或不同晶胞不能直接相减"]}
        visual={<ChargeDifferenceSketch />}
      />
    </div>
  );
}

export function DOSAnalysisPanel() {
  return (
    <div className="space-y-5">
      <PDOSChart />
      <TwoColumnNotes leftTitle="DOS / PDOS / LDOS 分别说明什么" left={["DOS：总态密度", "PDOS：投影到特定原子或轨道的态密度", "LDOS：局域态密度，可观察空间局域电子态", "费米能级附近 DOS 较高通常意味着可参与导电或反应的电子态更多"]} rightTitle="分析步骤" right={["看费米能级附近态密度", "看金属 d 轨道贡献", "看 S p 与 metal d 是否有重叠", "比较吸附前后峰位变化", "结合 COHP 分析成键性质"]} />
      <TwoColumnNotes leftTitle="VASP 设置建议" left={["ICHARG = 11 或基于已收敛电荷密度", "LORBIT = 11 或适合的投影设置", "NEDOS 设置足够大", "ISMEAR 和 SIGMA 根据金属/半导体体系选择", "使用更密 k 点获得平滑 DOS"]} rightTitle="边界" right={["DOS 不能单独证明反应能垒降低", "DOS 高不等于催化活性一定高", "需与结构、能量、电荷和 COHP 共同解释"]} />
    </div>
  );
}

export function PDOSChart() {
  return <DFTPDOSScene />;
}

function LegacyPDOSChart() {
  return (
    <GlassCard>
      <ChartHeader title="PDOS 示例：metal d 与 S p 轨道重叠" />
      <div className="h-80">
        <ResponsiveContainer>
          <AreaChart data={pdosMockData}>
            <CartesianGrid stroke="#1e3a5f" strokeDasharray="3 3" />
            <XAxis dataKey="energy" stroke="#94a3b8" label={{ value: "E - Ef / eV", fill: "#94a3b8", position: "insideBottom", offset: -3 }} />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#020814", border: "1px solid #31547f", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
            <ReferenceArea x1={-1.2} x2={0.4} fill="#f59e0b" fillOpacity={0.08} label={{ value: "轨道耦合区", fill: "#fbbf24", position: "insideTop" }} />
            <ReferenceLine x={0} stroke="#f8fafc" label={{ value: "Ef", fill: "#f8fafc", position: "top" }} />
            <Area dataKey="metalD" name="metal d" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.35} />
            <Area dataKey="sP" name="S p" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.32} />
            <Area dataKey="liS" name="Li s" stroke="#22c55e" fill="#22c55e" fillOpacity={0.24} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function COHPAnalysisPanel() {
  return (
    <div className="space-y-5">
      <COHPSketch />
      <TwoColumnNotes leftTitle="重点分析键" left={["M-S", "Li-O", "Li-N", "Li-F", "Li-S", "S-S"]} rightTitle="LOBSTER 质量检查" right={["需要 VASP 输出合适的 WAVECAR、CHGCAR 等文件", "需要选择合理基组", "需要检查 charge spilling", "COHP 需与键长、电荷转移和吸附能共同分析"]} />
      <TwoColumnNotes leftTitle="如何解读" left={["费米能级以下成键态占据支持键相互作用", "反键态占据增加可能削弱对应键", "ICOHP 可比较同类键强弱趋势", "吸附前后 S-S 键弱化可辅助解释 LiPS 活化"]} rightTitle="常见误区" right={["只看 ICOHP 数值不看成键/反键区", "不检查 LOBSTER 计算质量", "将 COHP 单独作为催化机制全部证据", "不结合结构和电荷分析"]} />
    </div>
  );
}

export function NEBAnalysisPanel() {
  return (
    <div className="space-y-5">
      <NEBEnergyPathChart />
      <TaskPanelLayout
        icon={<Workflow />}
        flow={["优化初态", "优化终态", "确保初态和终态原子数一致", "插入中间 images", "设置 IMAGES", "运行 NEB", "检查收敛", "绘制能量路径", "读取能垒"]}
        notes={["00 为初态，最后一个目录为终态，中间目录为插值结构", "IMAGES 等于中间图像数", "可使用 VTST 工具生成插值和绘图", "Climbing image NEB 可用于更准确过渡态搜索"]}
        visual={<NEBSketch />}
      />
      <TwoColumnNotes leftTitle="适用任务" left={["Li2S 分解", "Li2S 成核过程关键重排", "Li 在表面扩散", "LiPS 转化中关键键断裂/形成", "S-S 键断裂", "Li2S4 → Li2S2 / Li2S 的关键路径"]} rightTitle="常见误区" right={["初态和终态未充分优化", "原子顺序不一致", "中间结构不合理", "images 太少", "未检查力收敛", "将自由能路径和 NEB 能垒混淆"]} />
    </div>
  );
}

export function NEBEnergyPathChart() {
  return <DFTNEBEnergyScene />;
}

function LegacyNEBEnergyPathChart() {
  return (
    <GlassCard>
      <ChartHeader title="NEB 能量路径图" />
      <div className="h-80">
        <ResponsiveContainer>
          <LineChart data={nebMockData}>
            <CartesianGrid stroke="#1e3a5f" strokeDasharray="3 3" />
            <XAxis dataKey="image" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" label={{ value: "Energy / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ background: "#020814", border: "1px solid #31547f", color: "#fff" }} />
            <ReferenceLine y={0.71} stroke="#f59e0b" label={{ value: "Ea ≈ 0.71 eV", fill: "#f59e0b", position: "right" }} />
            <Line dataKey="energy" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function VASPTemplatesPanel() {
  return (
    <div className="space-y-4">
      <GlassCard className="border-amber-400/35 bg-amber-400/5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-1 shrink-0 text-amber-300" size={20} />
          <p className="text-sm leading-7 text-amber-100">以下所有输入文件都是模板，不可直接作为所有体系通用参数。用户必须根据体系做 ENCUT、k 点、真空层、U 值、磁性和收敛测试。</p>
        </div>
      </GlassCard>
      {vaspTemplates.map((template) => <CodeBlockWithExplanation key={template.id} template={template} />)}
    </div>
  );
}

export function CodeBlockWithExplanation({ template }: { template: (typeof vaspTemplates)[number] }) {
  return (
    <GlassCard>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-white">{template.name}</h4>
          <p className="mt-1 text-sm text-slate-400">{template.purpose}</p>
        </div>
        <Tag>需根据具体体系收敛测试</Tag>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <pre className="max-h-80 overflow-auto rounded-lg border border-slate-700 bg-slate-950/85 p-4 text-xs leading-6 text-slate-200"><code>{template.incar}</code></pre>
        <div className="grid gap-4">
          <GridInfo title="参数说明" items={template.explanation} />
          <GridInfo title="谨慎使用" items={template.cautions} />
        </div>
      </div>
    </GlassCard>
  );
}

export function PostProcessingPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {postProcessingTools.map(([tool, usage]) => (
        <GlassCard key={tool}>
          <div className="mb-3 flex items-center gap-3">
            <FileCode2 className="text-cyan" size={22} />
            <h4 className="text-lg font-semibold text-white">{tool}</h4>
          </div>
          <p className="text-sm leading-7 text-slate-300">{usage}</p>
        </GlassCard>
      ))}
    </div>
  );
}

export function ExperimentDFTMappingPanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {experimentDFTMaps.map((item) => (
        <GlassCard key={item.id}>
          <h4 className="text-lg font-semibold text-white">{item.experimentalObservation}</h4>
          <div className="mt-3 flex flex-wrap gap-2">{item.dftAnalysis.map((method) => <Tag key={method}>{method}</Tag>)}</div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{item.interpretation}</p>
          <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-6 text-amber-100">边界：{item.caution}</p>
        </GlassCard>
      ))}
    </div>
  );
}

export function DFTPitfallsPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {pitfalls.map(([mistake, fix], index) => (
          <GlassCard key={mistake}>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rose-500/15 text-sm font-semibold text-rose-200">{index + 1}</span>
              <h4 className="font-semibold text-white">{mistake}</h4>
            </div>
            <p className="text-sm leading-7 text-slate-300">正确做法：{fix}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="border-cyan/35">
        <h4 className="mb-3 text-lg font-semibold text-white">严谨性检查清单</h4>
        <InfoList items={dftScientificChecks} />
      </GlassCard>
    </div>
  );
}

function RightExplanation({ task, system, species }: { task: (typeof dftCalculationTasks)[number]; system: string; species: string }) {
  return (
    <aside className="space-y-4">
      <GlassCard className="border-blue-500/40 bg-[#081327]/92">
        <p className="text-sm font-semibold text-cyan">解释区</p>
        <h4 className="mt-2 text-xl font-bold text-white">{task.name}</h4>
        <p className="mt-3 text-sm leading-7 text-slate-300">{task.purpose}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>{system}</Tag>
          <Tag>{species}</Tag>
        </div>
      </GlassCard>
      <SideBlock title="输入文件说明" items={task.inputFiles} />
      <SideBlock title="输出文件说明" items={task.outputFiles} />
      <SideBlock title="如何分析结果" items={task.analysisGuide} />
      <SideBlock title="与实验表征对应" items={task.experimentCorrelation} />
      <SideBlock title="常见误区" items={task.commonPitfalls} />
      <GlassCard className="border-amber-400/35 bg-amber-400/5">
        <p className="text-sm font-semibold text-amber-100">严谨性提醒</p>
        <p className="mt-2 text-xs leading-6 text-amber-100/90">DFT 是原子尺度简化模型。结论应与结构、能量、电荷、电子结构、反应路径和实验表征共同闭环，不能由单一结果过度外推。</p>
      </GlassCard>
    </aside>
  );
}

function BottomNavigator({ task }: { task: string }) {
  return (
    <GlassCard className="border-blue-500/35 bg-[#07162c]/80">
      <div className="grid gap-4 md:grid-cols-3">
        <InfoPill title="当前任务在整体工作流中的位置" value={task} />
        <InfoPill title="推荐下一步计算" value="吸附能之后建议做 Bader / 差分电荷 / DOS，关键步骤再接自由能和 NEB。" />
        <InfoPill title="相关实验入口" value="XPS、EXAFS、Raman、EIS、CV、Li2S 成核与对称电池。" />
      </div>
    </GlassCard>
  );
}

function TaskDynamicPanel({ task }: { task: string }) {
  return <GlassCard><h4 className="text-lg font-semibold text-white">{task}</h4><p className="mt-3 text-sm leading-7 text-slate-300">请选择上方二级标签查看对应的方法库、流程图、输入模板和结果解读。</p></GlassCard>;
}

function MiniWorkflow({ active }: { active: string }) {
  const steps = ["模型构建", "结构优化", "静态计算", "吸附能", "电荷分析", "DOS/COHP", "自由能/NEB", "实验对应"];
  return (
    <div className="grid gap-2">
      {steps.map((step) => (
        <div key={step} className={`rounded border px-3 py-2 text-xs ${active.includes(step.slice(0, 2)) ? "border-cyan bg-cyan/15 text-white" : "border-slate-700 bg-slate-950/35 text-slate-400"}`}>{step}</div>
      ))}
    </div>
  );
}

function SideBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <GlassCard>
      <h4 className="mb-3 text-sm font-semibold text-cyan">{title}</h4>
      <InfoList items={items} />
    </GlassCard>
  );
}

function GridInfo({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-cyan">{title}</p>
      <InfoList items={items} />
    </div>
  );
}

function TwoColumnNotes({ leftTitle, left, rightTitle, right }: { leftTitle: string; left: string[]; rightTitle: string; right: string[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <GlassCard><h4 className="mb-3 text-lg font-semibold text-white">{leftTitle}</h4><InfoList items={left} /></GlassCard>
      <GlassCard><h4 className="mb-3 text-lg font-semibold text-white">{rightTitle}</h4><InfoList items={right} /></GlassCard>
    </div>
  );
}

function Formula({ value }: { value: string }) {
  return <div className="mt-3 rounded-lg border border-cyan/35 bg-cyan/10 p-5 text-center font-serif text-lg text-white">{value}</div>;
}

function ChartHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <Tag>示意图 / 模拟数据，仅用于教学演示，不代表真实计算结果</Tag>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button title={label} onClick={onClick} className="grid h-9 w-9 place-items-center rounded-lg border border-blue-500/40 bg-blue-500/10 text-slate-100 hover:border-cyan">{children}</button>;
}

function InfoPill({ title, value }: { title: string; value: string }) {
  return <div><p className="text-xs text-slate-500">{title}</p><p className="mt-1 text-sm leading-6 text-slate-200">{value}</p></div>;
}

function DFTDemoSurface({
  children,
  label,
  minHeight = "16rem",
  className = "",
}: {
  children: React.ReactNode;
  label?: string;
  minHeight?: string;
  className?: string;
}) {
  return (
    <ResearchDemoFrame title={label} minHeight={minHeight} className={`p-0 ${className}`}>
      <div className="relative min-h-[inherit] overflow-hidden p-4">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 760 330">
          <ResearchDemoSvgDefs />
          <g opacity="0.15" stroke="#38bdf8" strokeWidth="0.8">
            {Array.from({ length: 14 }).map((_, index) => <path key={`v-${index}`} d={`M ${index * 58} 0 V 330`} />)}
            {Array.from({ length: 7 }).map((_, index) => <path key={`h-${index}`} d={`M 0 ${index * 55} H 760`} />)}
          </g>
        </svg>
        {label && <ResearchDemoLabel tone="cyan" className="absolute left-4 top-3 max-w-[calc(100%-2rem)] truncate">{label}</ResearchDemoLabel>}
        <div className={label ? "relative pt-8" : "relative"}>{children}</div>
      </div>
    </ResearchDemoFrame>
  );
}

function DFTWorkflowScene({ step, onSelect }: { step: number; onSelect: (index: number) => void }) {
  return (
    <DFTDemoSurface label="DFT workflow state map" minHeight="22rem">
      <div className="grid min-h-[19rem] grid-cols-3 gap-3 pt-10 md:grid-cols-9">
        {workflowSteps.map((item, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <button
              key={item.name}
              onClick={() => onSelect(index)}
              className={`demo-card group relative flex min-h-28 flex-col justify-between rounded-xl border p-3 text-left transition ${
                active ? "border-cyan bg-cyan/15 shadow-[0_0_28px_rgba(56,189,248,.22)]" : done ? "border-blue-500/45 bg-blue-500/10" : "border-slate-700 bg-slate-950/45 hover:border-cyan/45"
              }`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${active ? "demo-pulse border-cyan bg-cyan/20 text-cyan" : "border-slate-600 text-slate-300"}`}>
                {index + 1}
              </span>
              <span className="text-sm font-semibold leading-5 text-white">{item.name}</span>
              {index < workflowSteps.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan/55 md:block" />}
            </button>
          );
        })}
      </div>
    </DFTDemoSurface>
  );
}

function FlowDiagram() {
  const refreshedSteps = ["模型构建", "结构优化", "静态计算", "吸附能", "电荷分析", "DOS/COHP", "自由能/NEB", "实验对应"];
  return (
    <DFTDemoSurface label="calculation evidence chain" minHeight="18rem">
      <ChartHeader title="DFT 计算流程图" />
      <div className="grid gap-3 pt-3 md:grid-cols-4 xl:grid-cols-8">
        {refreshedSteps.map((step, index) => (
          <div key={step} className="demo-card relative rounded-xl border border-cyan/25 bg-slate-950/55 p-4 text-center shadow-[inset_0_0_18px_rgba(14,165,233,.08)]">
            <div className="demo-pulse mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-cyan/15 text-cyan">{index + 1}</div>
            <p className="text-sm font-semibold text-white">{step}</p>
            {index < refreshedSteps.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan/55 xl:block" />}
          </div>
        ))}
      </div>
    </DFTDemoSurface>
  );
  const steps = ["模型构建", "结构优化", "静态计算", "吸附能", "电荷分析", "DOS/COHP", "自由能/NEB", "实验对应"];
  return (
    <ResearchDemoFrame title="DFT 计算流程图" minHeight="15rem">
      <ChartHeader title="DFT 计算流程图" />
      <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">
        {steps.map((step, index) => (
          <div key={step} className="demo-card relative rounded-xl border border-blue-500/40 bg-blue-500/10 p-4 text-center">
            <div className="demo-pulse mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-cyan/15 text-cyan">{index + 1}</div>
            <p className="text-sm font-semibold text-white">{step}</p>
          </div>
        ))}
      </div>
    </ResearchDemoFrame>
  );
}

function DFTAdsorptionEnergyScene() {
  return (
    <DFTDemoSurface label="LiPS adsorption energy comparison" minHeight="29rem">
      <ChartHeader title="LiPS 吸附能柱状图" />
      <div className="grid gap-5 pt-3 xl:grid-cols-[1fr_.72fr]">
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={adsorptionEnergyMockData}>
              <CartesianGrid stroke="rgba(56,189,248,.18)" strokeDasharray="3 3" />
              <XAxis dataKey="species" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: "E_ads / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "#020814", border: "1px solid rgba(56,189,248,.35)", color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
              <ReferenceArea y1={-2.4} y2={-1.1} fill="#22c55e" fillOpacity={0.08} label={{ value: "moderate window", fill: "#86efac", position: "insideTopLeft" }} />
              <ReferenceLine y={-3} stroke="#fb7185" strokeDasharray="5 5" label={{ value: "over-binding risk", fill: "#fda4af", position: "right" }} />
              {["Fe-N4/C", "Co-N4/C", "TiO2-x", "Ti3C2O2", "MoS2-edge"].map((key, index) => <Bar key={key} dataKey={key} fill={colors[index]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <AdsorptionMicroScene />
      </div>
    </DFTDemoSurface>
  );
}

function DFTFreeEnergyScene() {
  return (
    <DFTDemoSurface label="free-energy landscape" minHeight="29rem">
      <ChartHeader title="S8 → Li2S 自由能路径" />
      <div className="grid gap-5 pt-3 xl:grid-cols-[1fr_.65fr]">
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={freeEnergyMockData}>
              <CartesianGrid stroke="rgba(56,189,248,.18)" strokeDasharray="3 3" />
              <XAxis dataKey="step" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: "ΔG / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "#020814", border: "1px solid rgba(56,189,248,.35)", color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
              <ReferenceLine x="Li2S2" stroke="#f59e0b" label={{ value: "uphill step", fill: "#f59e0b", position: "top" }} />
              {["Fe-N4/C", "TiO2-x", "MoS2-edge"].map((key, index) => <Line key={key} dataKey={key} stroke={colors[index]} strokeWidth={3} dot />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ReactionPathMicroScene />
      </div>
    </DFTDemoSurface>
  );
}

function DFTPDOSScene() {
  return (
    <DFTDemoSurface label="orbital overlap window" minHeight="29rem">
      <ChartHeader title="PDOS 示例：metal d 与 S p 轨道重叠" />
      <div className="grid gap-5 pt-3 xl:grid-cols-[1fr_.65fr]">
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={pdosMockData}>
              <CartesianGrid stroke="rgba(56,189,248,.18)" strokeDasharray="3 3" />
              <XAxis dataKey="energy" stroke="#94a3b8" label={{ value: "E - Ef / eV", fill: "#94a3b8", position: "insideBottom", offset: -3 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#020814", border: "1px solid rgba(56,189,248,.35)", color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
              <ReferenceArea x1={-1.2} x2={0.4} fill="#f59e0b" fillOpacity={0.08} label={{ value: "overlap window", fill: "#fbbf24", position: "insideTop" }} />
              <ReferenceLine x={0} stroke="#f8fafc" label={{ value: "Ef", fill: "#f8fafc", position: "top" }} />
              <Area dataKey="metalD" name="metal d" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.35} />
              <Area dataKey="sP" name="S p" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.32} />
              <Area dataKey="liS" name="Li s" stroke="#22c55e" fill="#22c55e" fillOpacity={0.24} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <OrbitalCouplingMicroScene />
      </div>
    </DFTDemoSurface>
  );
}

function DFTNEBEnergyScene() {
  return (
    <DFTDemoSurface label="NEB image energy path" minHeight="29rem">
      <ChartHeader title="NEB 能量路径图" />
      <div className="grid gap-5 pt-3 xl:grid-cols-[1fr_.65fr]">
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={nebMockData}>
              <CartesianGrid stroke="rgba(56,189,248,.18)" strokeDasharray="3 3" />
              <XAxis dataKey="image" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: "Energy / eV", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "#020814", border: "1px solid rgba(56,189,248,.35)", color: "#fff" }} />
              <ReferenceLine y={0.71} stroke="#f59e0b" label={{ value: "Ea ≈ 0.71 eV", fill: "#f59e0b", position: "right" }} />
              <Line dataKey="energy" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <NEBImagesMicroScene />
      </div>
    </DFTDemoSurface>
  );
}

function DFTModelSketchScene({ type }: { type: string }) {
  const selected = [
    "single-atom",
    "dual-atom",
    "heterojunction",
    "metal-oxide",
    "metal-sulfide",
    "metal-nitride",
    "metal-phosphide-carbide",
    "mxene",
    "defect-carbon",
    "multi-component",
  ].includes(type) ? type : "single-atom";
  return (
    <div className="relative h-64 w-full overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 300" role="img">
        <ResearchDemoSvgDefs />
        {selected === "single-atom" && <DFTSingleAtomModel />}
        {selected === "dual-atom" && <DFTDualAtomModel />}
        {selected === "heterojunction" && <DFTHeterojunctionModel />}
        {selected === "metal-oxide" && <DFTOxideSlabModel />}
        {selected === "metal-sulfide" && <DFTSulfideSlabModel />}
        {selected === "metal-nitride" && <DFTNitrideSlabModel />}
        {selected === "metal-phosphide-carbide" && <DFTPhosphideCarbideModel />}
        {selected === "mxene" && <DFTMxeneModel />}
        {selected === "defect-carbon" && <DFTDefectCarbonModel />}
        {selected === "multi-component" && <DFTMultiComponentModel />}
      </svg>
    </div>
  );
}

function AdsorptionMicroScene() {
  return (
    <ResearchDemoPanel className="min-h-72 border-cyan/25 bg-slate-950/45">
      <ResearchDemoLabel tone="cyan">reference states</ResearchDemoLabel>
      <div className="relative mt-4 h-48">
        <CatalystMiniSurface />
        <LiPSMolecule className="left-[40%] top-5 scale-90" />
        <motion.span className="absolute left-[49%] top-[5.4rem] h-14 w-14 rounded-full bg-cyan/18 blur-xl" animate={{ opacity: [0.25, 0.85, 0.35], scale: [0.8, 1.15, 0.9] }} transition={{ duration: 2.8, repeat: Infinity }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 224">
          <path d="M82 184 C132 136 180 130 226 78" fill="none" stroke="#67e8f9" strokeWidth="2.4" strokeDasharray="8 10" className="demo-flow" markerEnd="url(#arrowCyan)" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
        <ResearchDemoLabel tone="emerald">moderate</ResearchDemoLabel>
        <ResearchDemoLabel tone="amber">over-bound</ResearchDemoLabel>
      </div>
    </ResearchDemoPanel>
  );
}

function ReactionPathMicroScene() {
  const states = ["S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"];
  return (
    <ResearchDemoPanel className="min-h-72 border-cyan/25 bg-slate-950/45">
      <ResearchDemoLabel tone="cyan">coordinate</ResearchDemoLabel>
      <div className="relative mt-5 h-48">
        {states.map((state, index) => (
          <div key={state} className="absolute" style={{ left: `${index * 22}%`, top: `${106 - Math.sin(index / (states.length - 1) * Math.PI) * 58}px` }}>
            <ResearchDemoNode tone={index === 3 ? "amber" : "cyan"} className="w-16 px-2 text-xs">{state}</ResearchDemoNode>
          </div>
        ))}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 224">
          <path d="M28 148 C78 80 118 86 154 118 C190 148 202 42 248 86 C276 110 292 142 306 154" fill="none" stroke="#67e8f9" strokeWidth="2.6" className="demo-draw" />
        </svg>
      </div>
    </ResearchDemoPanel>
  );
}

function OrbitalCouplingMicroScene() {
  return (
    <ResearchDemoPanel className="min-h-72 border-cyan/25 bg-slate-950/45">
      <ResearchDemoLabel tone="cyan">d-p coupling</ResearchDemoLabel>
      <div className="relative mt-6 h-48">
        <CatalystMiniSurface />
        <motion.div className="absolute left-[28%] top-10 h-24 w-24 rounded-full border border-cyan/40 bg-cyan/10" animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.45, 0.9, 0.45] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="absolute left-[50%] top-14 h-20 w-20 rounded-full border border-amber-300/40 bg-amber-300/10" animate={{ scale: [1.08, 0.92, 1.08], opacity: [0.45, 0.88, 0.45] }} transition={{ duration: 3, repeat: Infinity }} />
        <ResearchDemoNode tone="cyan" className="absolute left-[28%] top-[4.7rem] w-16 px-2 text-xs">M d</ResearchDemoNode>
        <ResearchDemoNode tone="amber" className="absolute left-[55%] top-[5.7rem] w-16 px-2 text-xs">S p</ResearchDemoNode>
        <ResearchDemoLabel tone="amber" className="absolute bottom-3 left-1/2 -translate-x-1/2">near Ef</ResearchDemoLabel>
      </div>
    </ResearchDemoPanel>
  );
}

function NEBImagesMicroScene() {
  const images = ["00", "01", "02", "03", "04", "05"];
  return (
    <ResearchDemoPanel className="min-h-72 border-cyan/25 bg-slate-950/45">
      <ResearchDemoLabel tone="cyan">NEB images</ResearchDemoLabel>
      <div className="relative mt-6 h-48">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 224">
          <path d="M26 162 C86 68 142 58 188 88 C236 118 270 152 302 164" fill="none" stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="8 10" className="demo-flow" />
        </svg>
        {images.map((image, index) => (
          <div key={image} className="absolute text-center" style={{ left: `${4 + index * 17}%`, top: `${116 - Math.sin(index / (images.length - 1) * Math.PI) * 68}px` }}>
            <ResearchDemoNode tone={index === 2 ? "amber" : "cyan"} className="h-10 w-12 p-0 text-xs">{image}</ResearchDemoNode>
          </div>
        ))}
        <ResearchDemoLabel tone="amber" className="absolute right-2 top-2">TS search</ResearchDemoLabel>
      </div>
    </ResearchDemoPanel>
  );
}

function CatalystMiniSurface() {
  return (
    <div className="absolute bottom-8 left-6 right-6 h-16 rounded-xl border border-cyan/25 bg-slate-900/65 p-2">
      <div className="grid h-full grid-cols-10 gap-1">
        {Array.from({ length: 20 }).map((_, index) => <span key={index} className={`rounded-full ${index === 13 ? "bg-cyan shadow-[0_0_14px_rgba(34,211,238,.55)]" : "bg-slate-400/35"}`} />)}
      </div>
    </div>
  );
}

function LiPSMolecule({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute h-24 w-36 ${className}`}>
      {[0, 1, 2, 3].map((item) => <span key={item} className="absolute h-6 w-6 rounded-full border border-yellow-100 bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,.25)]" style={{ left: item * 28, top: 24 + Math.sin(item * 1.2) * 12 }} />)}
      {[0, 1].map((item) => <span key={`li-${item}`} className="absolute h-5 w-5 rounded-full border border-violet-100 bg-violet-300" style={{ left: item ? 112 : 0, top: item ? 12 : 54 }} />)}
    </div>
  );
}

function DFTSingleAtomModel() {
  return (
    <>
      <GrapheneLattice highlightVacancy />
      <SvgAtom x={380} y={150} r={22} fill="#0891b2" stroke="#67e8f9" label="M" labelFill="#ecfeff" />
      {[[330, 112], [430, 112], [330, 188], [430, 188]].map(([x, y], index) => (
        <g key={index}>
          <line x1="380" y1="150" x2={x} y2={y} stroke="#67e8f9" strokeWidth="2.4" />
          <SvgAtom x={x} y={y} r={13} fill="#2563eb" stroke="#bfdbfe" label="N" labelFill="#eff6ff" />
        </g>
      ))}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">M-N4/C single-atom site</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">one isolated metal atom coordinated by four pyridinic N atoms in a graphene vacancy</text>
    </>
  );
}

function DFTDualAtomModel() {
  const m1 = { x: 344, y: 154 };
  const m2 = { x: 416, y: 154 };
  const nSites = [
    { x: 286, y: 118, metal: m1 },
    { x: 326, y: 210, metal: m1 },
    { x: 372, y: 102, metal: m1 },
    { x: 388, y: 210, metal: m2 },
    { x: 434, y: 102, metal: m2 },
    { x: 474, y: 118, metal: m2 },
  ];
  return (
    <>
      <DualVacancyGrapheneLattice />
      <ellipse cx="380" cy="154" rx="105" ry="72" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="6 4" />
      <line x1={m1.x + 19} y1={m1.y} x2={m2.x - 19} y2={m2.y} stroke="#f59e0b" strokeWidth="4" />
      <path d="M344 128 C368 96 396 96 416 128" fill="none" stroke="#67e8f9" strokeWidth="2.2" strokeDasharray="6 5" />
      <SvgAtom x={m1.x} y={m1.y} r={20} fill="#0e7490" stroke="#67e8f9" label="M1" labelFill="#ecfeff" />
      <SvgAtom x={m2.x} y={m2.y} r={20} fill="#7c3aed" stroke="#ddd6fe" label="M2" labelFill="#f5f3ff" />
      {nSites.map(({ x, y, metal }, index) => (
        <g key={index}>
          <line x1={metal.x} y1={metal.y} x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" opacity=".92" />
          <SvgAtom x={x} y={y} r={12} fill="#2563eb" stroke="#bfdbfe" label="N" labelFill="#eff6ff" />
        </g>
      ))}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">M1-M2-N6/C dual-atom site</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">adjacent metal pair in an extended carbon divacancy; each metal has local N coordination and a defined M-M distance</text>
      <text x="380" y="92" textAnchor="middle" fontSize="12" fill="#67e8f9">bridge adsorption pocket</text>
    </>
  );
}

function DualVacancyGrapheneLattice() {
  const nodes = Array.from({ length: 56 }).map((_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    return { x: 130 + col * 72 + (row % 2) * 36, y: 64 + row * 28 };
  });
  const inVacancy = (x: number, y: number) => ((x - 380) ** 2) / (118 ** 2) + ((y - 154) ** 2) / (74 ** 2) < 1;
  return (
    <g>
      {nodes.map((node, i) => {
        const hidden = inVacancy(node.x, node.y);
        return (
          <g key={i}>
            {nodes.slice(i + 1).map((other, j) => {
              const d = Math.hypot(node.x - other.x, node.y - other.y);
              const crossesVacancy = inVacancy((node.x + other.x) / 2, (node.y + other.y) / 2);
              return d < 80 && !hidden && !crossesVacancy ? <line key={j} x1={node.x} y1={node.y} x2={other.x} y2={other.y} stroke="#334155" strokeWidth="1.5" /> : null;
            })}
            {!hidden && <circle cx={node.x} cy={node.y} r="6" fill="#94a3b8" stroke="#cbd5e1" />}
          </g>
        );
      })}
    </g>
  );
}

function DFTHeterojunctionModel() {
  return (
    <>
      <rect x="58" y="82" width="294" height="150" rx="8" fill="#172554" stroke="#60a5fa" />
      <rect x="408" y="82" width="294" height="150" rx="8" fill="#3b1d0f" stroke="#fb923c" />
      <rect x="354" y="76" width="52" height="162" fill="#020617" opacity=".92" />
      <line x1="380" y1="72" x2="380" y2="242" stroke="#67e8f9" strokeWidth="2.2" strokeDasharray="7 5" />
      {Array.from({ length: 30 }).map((_, index) => <SvgAtom key={`a-${index}`} x={88 + (index % 6) * 46} y={112 + Math.floor(index / 6) * 24} r={6.5} fill={index % 2 ? "#93c5fd" : "#38bdf8"} />)}
      {Array.from({ length: 30 }).map((_, index) => <SvgAtom key={`b-${index}`} x={438 + (index % 6) * 46} y={112 + Math.floor(index / 6) * 24} r={6.5} fill={index % 2 ? "#fb923c" : "#fde047"} />)}
      <path d="M326 154 C352 126 408 126 436 154" fill="none" stroke="#67e8f9" strokeWidth="3" markerEnd="url(#arrowCyan)" />
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">oxide/sulfide or oxide/carbon interface slab</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">two matched crystal surfaces share one interface; mismatch, strain and termination must be reported</text>
      <text x="204" y="258" textAnchor="middle" fontSize="12" fill="#bfdbfe">phase A facet</text>
      <text x="556" y="258" textAnchor="middle" fontSize="12" fill="#fed7aa">phase B facet</text>
    </>
  );
}

function DFTOxideSlabModel() {
  return (
    <>
      <rect x="70" y="82" width="620" height="150" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1, 2].map((row) => Array.from({ length: 9 }).map((_, col) => {
        const x = 110 + col * 66 + (row % 2) * 24;
        const y = 110 + row * 42;
        const vacancy = row === 1 && col === 5;
        return (
          <g key={`${row}-${col}`}>
            <SvgAtom x={x} y={y} r={12} fill="#38bdf8" stroke="#bae6fd" label="M" labelFill="#082f49" />
            {vacancy ? (
              <circle cx={x + 30} cy={y + 20} r="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
            ) : (
              <SvgAtom x={x + 30} y={y + 20} r={9.5} fill="#fb7185" stroke="#fecdd3" label="O" labelFill="#450a0a" />
            )}
          </g>
        );
      }))}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">transition-metal oxide slab with oxygen vacancy</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">low-index M-O surface; LiPS binding can involve Li-O and M-S interactions</text>
      <text x="540" y="244" fontSize="12" fill="#fbbf24">oxygen vacancy</text>
    </>
  );
}

function DFTSulfideSlabModel() {
  return (
    <>
      <rect x="78" y="90" width="604" height="132" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1].map((row) => Array.from({ length: 9 }).map((_, col) => {
        const x = 112 + col * 64 + (row % 2) * 32;
        const y = 112 + row * 76;
        const vacancy = row === 0 && col === 5;
        return (
          <g key={`${row}-${col}`}>
            {!vacancy && <SvgAtom x={x} y={y} r={10} fill="#fde047" stroke="#fef9c3" label="S" labelFill="#422006" />}
            {vacancy && <circle cx={x} cy={y} r="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />}
            <SvgAtom x={x + 30} y={y + 36} r={13} fill="#38bdf8" stroke="#bae6fd" label="M" labelFill="#082f49" />
            <line x1={x} y1={y} x2={x + 30} y2={y + 36} stroke="#64748b" strokeWidth="1.6" />
          </g>
        );
      }))}
      <path d="M86 86 H682" stroke="#facc15" strokeWidth="2" strokeDasharray="6 5" />
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">metal sulfide edge / sulfur-vacancy slab</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">distinguishes lattice sulfur from sulfur in LiPS; edge and vacancy sites are not basal-plane equivalents</text>
      <text x="496" y="88" fontSize="12" fill="#fbbf24">S vacancy / exposed metal site</text>
    </>
  );
}

function DFTNitrideSlabModel() {
  return (
    <>
      <rect x="76" y="86" width="608" height="142" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1, 2].map((row) => Array.from({ length: 8 }).map((_, col) => {
        const x = 118 + col * 70 + (row % 2) * 34;
        const y = 108 + row * 44;
        const nVacancy = row === 1 && col === 5;
        return (
          <g key={`${row}-${col}`}>
            <SvgAtom x={x} y={y} r={12} fill="#38bdf8" stroke="#bae6fd" label="M" labelFill="#082f49" />
            {nVacancy ? (
              <circle cx={x + 32} cy={y + 22} r="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
            ) : (
              <SvgAtom x={x + 32} y={y + 22} r={10} fill="#2563eb" stroke="#bfdbfe" label="N" labelFill="#eff6ff" />
            )}
          </g>
        );
      }))}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">transition-metal nitride M-N slab</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">metal nitride surfaces expose M-N coordination; N vacancy or exposed metal sites must be modeled separately</text>
      <text x="520" y="244" fontSize="12" fill="#fbbf24">N vacancy / exposed M</text>
    </>
  );
}

function DFTPhosphideCarbideModel() {
  return (
    <>
      <rect x="76" y="86" width="608" height="142" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1, 2].map((row) => Array.from({ length: 8 }).map((_, col) => {
        const x = 116 + col * 70 + (row % 2) * 34;
        const y = 108 + row * 44;
        const carbideSide = col > 4;
        const anion = carbideSide ? "C" : "P";
        return (
          <g key={`${row}-${col}`}>
            <SvgAtom x={x} y={y} r={12} fill="#38bdf8" stroke="#bae6fd" label="M" labelFill="#082f49" />
            <SvgAtom x={x + 32} y={y + 22} r={anion === "P" ? 10.5 : 9.5} fill={anion === "P" ? "#a78bfa" : "#94a3b8"} stroke="#e2e8f0" label={anion} labelFill="#020617" />
          </g>
        );
      }))}
      <line x1="492" y1="84" x2="492" y2="232" stroke="#67e8f9" strokeDasharray="6 5" strokeWidth="1.8" />
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">metal phosphide / carbide slab</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">phosphides and carbides require distinct P or C sublattices; they cannot reuse oxide/sulfide topology</text>
      <text x="286" y="252" textAnchor="middle" fontSize="12" fill="#ddd6fe">M-P domain</text>
      <text x="586" y="252" textAnchor="middle" fontSize="12" fill="#cbd5e1">M-C domain</text>
    </>
  );
}

function DFTMxeneModel() {
  return (
    <>
      <rect x="84" y="96" width="592" height="112" rx="10" fill="#111827" stroke="#475569" />
      {Array.from({ length: 10 }).map((_, index) => {
        const x = 118 + index * 58;
        const topTermination = index % 3 === 0 ? "O" : index % 3 === 1 ? "OH" : "F";
        const bottomTermination = index % 3 === 0 ? "OH" : index % 3 === 1 ? "F" : "O";
        return (
          <g key={index}>
            <SvgAtom x={x} y={118} r={12} fill="#38bdf8" stroke="#bae6fd" label="Ti" labelFill="#082f49" />
            <SvgAtom x={x + 28} y={152} r={9} fill="#94a3b8" stroke="#cbd5e1" label="C" labelFill="#020617" />
            <SvgAtom x={x} y={186} r={12} fill="#38bdf8" stroke="#bae6fd" label="Ti" labelFill="#082f49" />
            <SvgAtom x={x} y={70} r={8.5} fill={topTermination === "O" ? "#fb7185" : topTermination === "OH" ? "#a78bfa" : "#22c55e"} stroke="#e2e8f0" label={topTermination} labelFill="#020617" />
            <SvgAtom x={x} y={234} r={8.5} fill={bottomTermination === "O" ? "#fb7185" : bottomTermination === "OH" ? "#a78bfa" : "#22c55e"} stroke="#e2e8f0" label={bottomTermination} labelFill="#020617" />
          </g>
        );
      })}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">Ti3C2Tx MXene terminated surface</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">Ti-C-Ti layered slab with O/OH/F terminations on both exposed surfaces</text>
    </>
  );
}

function DFTDefectCarbonModel() {
  return (
    <>
      <GrapheneLattice highlightVacancy />
      <circle cx="380" cy="150" r="34" fill="#020617" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
      {[
        [332, 110, "N", "#2563eb"],
        [430, 112, "B", "#fb7185"],
        [326, 192, "S", "#fde047"],
        [438, 194, "P", "#a78bfa"],
      ].map(([x, y, label, fill]) => <SvgAtom key={String(label)} x={Number(x)} y={Number(y)} r={13} fill={String(fill)} stroke="#e2e8f0" label={String(label)} labelFill="#020617" />)}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">vacancy / heteroatom-doped carbon model</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">metal-free defective graphene; LiPS binding is assigned to vacancy, edge or heteroatom-polarized carbon sites</text>
    </>
  );
}

function DFTMultiComponentModel() {
  const metals = [
    ["Fe", "#38bdf8"],
    ["Co", "#60a5fa"],
    ["Ni", "#22c55e"],
    ["Mn", "#f59e0b"],
    ["Cu", "#a78bfa"],
  ] as const;
  return (
    <>
      <rect x="72" y="82" width="616" height="154" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1, 2, 3].map((row) => Array.from({ length: 9 }).map((_, col) => {
        const x = 112 + col * 66 + (row % 2) * 30;
        const y = 104 + row * 34;
        const [label, fill] = metals[(row * 3 + col) % metals.length];
        return <SvgAtom key={`${row}-${col}`} x={x} y={y} r={11.5} fill={fill} stroke="#e2e8f0" label={label} labelFill="#020617" />;
      }))}
      {[0, 1, 2].map((index) => (
        <circle key={index} cx={520 + index * 42} cy={196 - index * 18} r="13" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" />
      ))}
      <text x="36" y="34" fontSize="15" fill="#e2e8f0">multi-component / high-entropy catalyst surface</text>
      <text x="36" y="58" fontSize="12" fill="#94a3b8">mixed-metal sublattice; local ensemble, composition and site statistics are part of the model</text>
      <text x="502" y="252" fontSize="12" fill="#fbbf24">local active ensembles</text>
    </>
  );
}

function SvgAtom({
  x,
  y,
  r,
  fill,
  stroke,
  label,
  labelFill = "#0f172a",
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  stroke?: string;
  label?: string;
  labelFill?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.8 : 0} />
      {label && <text x={x} y={y + 4} textAnchor="middle" fontSize={label.length > 1 ? 8 : 10} fill={labelFill} fontWeight="700">{label}</text>}
    </g>
  );
}

function ModelSketch({ guide, selectedSystem, modelType }: { guide: (typeof catalystModelGuides)[number]; selectedSystem: string; modelType: string }) {
  return (
    <GlassCard>
      <ChartHeader title={`${selectedSystem} 模型构建示意`} />
      <ResearchDemoFrame title={`${selectedSystem} 模型构建示意`} compact minHeight="18rem" className="p-3">
        <DFTModelSketchScene type={modelType} />
      </ResearchDemoFrame>
      <p className="mt-3 text-xs leading-6 text-slate-500">示意图用于说明建模逻辑和位点类型，不代表真实优化结构；真实结构展示必须来自 POSCAR、CONTCAR、CIF 或 XYZ。</p>
    </GlassCard>
  );
}

function LiPSSketch({ species }: { species: string }) {
  return (
    <GlassCard>
      <ChartHeader title={`${species} 吸附构型示意`} />
      <div className="grid gap-4 md:grid-cols-3">
        {["Li 端靠近 O/N/F 位点", "S 端靠近金属位点", "双金属桥连吸附"].map((label, mode) => (
          <ResearchDemoFrame key={label} title={label} compact minHeight="15rem" className="p-4">
            <AdsorptionGeometrySvg mode={mode} species={species} />
            <p className="text-center text-sm text-slate-200">{label}</p>
          </ResearchDemoFrame>
        ))}
      </div>
    </GlassCard>
  );
}

function AdsorptionModeIcon({ mode }: { mode: string }) {
  const liAnchored = mode.includes("Li");
  const bridge = mode.includes("妗ヨ繛") || mode.includes("桥");
  return (
    <div className="mx-auto h-20 w-28 rounded-lg border border-cyan/20 bg-slate-950/45 p-1">
      <svg viewBox="0 0 112 80" className="h-full w-full">
        <ResearchDemoSvgDefs />
        <rect x="8" y="58" width="96" height="8" rx="2" fill="#334155" />
        <g opacity=".85">
          {Array.from({ length: 8 }).map((_, index) => <circle key={index} cx={18 + index * 12} cy="54" r="3.5" fill={index === 4 ? "#67e8f9" : "#94a3b8"} />)}
        </g>
        <circle cx={bridge ? 44 : 56} cy="48" r="10" fill="#155e75" stroke="#67e8f9" />
        {bridge && <circle cx="70" cy="48" r="10" fill="#155e75" stroke="#67e8f9" />}
        <circle cx={liAnchored ? 34 : 76} cy="24" r="7" fill="#c4b5fd" />
        <circle cx="48" cy="29" r="7" fill="#fde047" />
        <circle cx="62" cy="30" r="7" fill="#fde047" />
        <line x1="48" y1="29" x2="62" y2="30" stroke="#facc15" strokeWidth="2" />
        <line x1={bridge ? 44 : 56} y1="48" x2={liAnchored ? 34 : 76} y2={liAnchored ? 24 : 30} stroke="#67e8f9" strokeDasharray="4 3" />
        {bridge && <line x1="70" y1="48" x2="62" y2="30" stroke="#67e8f9" strokeDasharray="4 3" />}
      </svg>
    </div>
  );
  return (
    <div className="mx-auto h-20 w-28">
      <svg viewBox="0 0 112 80" className="h-full w-full">
        <rect x="8" y="58" width="96" height="8" rx="2" fill="#475569" />
        <circle cx="56" cy="48" r="10" fill="#155e75" stroke="#67e8f9" />
        <text x="56" y="52" textAnchor="middle" fontSize="9" fill="#e0f2fe">M</text>
        <circle cx={mode.includes("Li") ? 34 : 76} cy="24" r="7" fill="#c4b5fd" />
        <text x={mode.includes("Li") ? 34 : 76} y="27" textAnchor="middle" fontSize="6" fill="#1e1b4b">Li</text>
        <circle cx="48" cy="29" r="7" fill="#fde047" />
        <circle cx="62" cy="30" r="7" fill="#fde047" />
        <line x1="48" y1="29" x2="62" y2="30" stroke="#facc15" strokeWidth="2" />
        <line x1="56" y1="48" x2={mode.includes("桥连") ? 62 : mode.includes("Li") ? 34 : 76} y2={mode.includes("Li") ? 24 : 30} stroke="#38bdf8" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}

function CatalystModelDiagram({ type }: { type: string }) {
  const selected = type === "metal-oxide" || type === "metal-sulfide" || type === "mxene" || type === "heterojunction" || type === "dual-atom" || type === "defect-carbon" ? type : "single-atom";
  if (selected === "dual-atom") return <DualAtomSvg />;
  if (selected === "heterojunction") return <HeterojunctionSvg />;
  if (selected === "metal-oxide") return <SlabSvg kind="oxide" />;
  if (selected === "metal-sulfide") return <SlabSvg kind="sulfide" />;
  if (selected === "mxene") return <MXeneSvg />;
  if (selected === "defect-carbon") return <DefectCarbonSvg />;
  return <SingleAtomSvg />;
}

function SingleAtomSvg() {
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <GrapheneLattice />
      <circle cx="380" cy="135" r="22" fill="#0e7490" stroke="#67e8f9" strokeWidth="3" />
      <text x="380" y="140" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700">M</text>
      {[[330, 100], [430, 100], [330, 170], [430, 170]].map(([x, y], index) => (
        <g key={index}>
          <line x1="380" y1="135" x2={x} y2={y} stroke="#60a5fa" strokeWidth="2.5" />
          <circle cx={x} cy={y} r="14" fill="#3b82f6" stroke="#bfdbfe" strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="#eff6ff">N</text>
        </g>
      ))}
      <text x="34" y="32" fontSize="15" fill="#cbd5e1">M-N4/C 局部配位模型</text>
      <text x="34" y="54" fontSize="12" fill="#94a3b8">金属锚定在石墨烯空位附近，需检查超胞尺寸、自旋和配位环境。</text>
    </svg>
  );
}

function DualAtomSvg() {
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <GrapheneLattice />
      {[[348, 135, "M1"], [412, 135, "M2"]].map(([x, y, label]) => (
        <g key={label}>
          <circle cx={Number(x)} cy={Number(y)} r="20" fill="#0e7490" stroke="#67e8f9" strokeWidth="3" />
          <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">{label}</text>
        </g>
      ))}
      <line x1="368" y1="135" x2="392" y2="135" stroke="#f59e0b" strokeWidth="4" />
      {[[300, 92], [348, 83], [412, 83], [460, 92], [320, 180], [440, 180]].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="13" fill="#3b82f6" stroke="#bfdbfe" strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="11" fill="#eff6ff">N</text>
        </g>
      ))}
      <text x="34" y="32" fontSize="15" fill="#cbd5e1">M1-M2-N6/C 协同位点</text>
      <text x="34" y="54" fontSize="12" fill="#94a3b8">双原子位点需要体现 M1-M2 距离和桥连吸附，不是两个远离单原子的简单相加。</text>
    </svg>
  );
}

function HeterojunctionSvg() {
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <rect x="40" y="70" width="315" height="130" rx="8" fill="#172554" stroke="#60a5fa" />
      <rect x="405" y="70" width="315" height="130" rx="8" fill="#3b1d0f" stroke="#f97316" />
      {Array.from({ length: 30 }).map((_, i) => <circle key={`a-${i}`} cx={70 + (i % 6) * 47} cy={100 + Math.floor(i / 6) * 24} r="7" fill={i % 2 ? "#93c5fd" : "#38bdf8"} />)}
      {Array.from({ length: 30 }).map((_, i) => <circle key={`b-${i}`} cx={435 + (i % 6) * 47} cy={100 + Math.floor(i / 6) * 24} r="7" fill={i % 2 ? "#fb923c" : "#fde047"} />)}
      <rect x="356" y="58" width="48" height="154" fill="#020814" opacity=".92" />
      <line x1="380" y1="52" x2="380" y2="218" stroke="#67e8f9" strokeWidth="2" strokeDasharray="7 5" />
      <path d="M330 136 C355 108, 405 108, 432 136" fill="none" stroke="#22c55e" strokeWidth="3" className="demo-flow" markerEnd="url(#arrow)" />
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#22c55e" /></marker></defs>
      <text x="160" y="226" textAnchor="middle" fontSize="14" fill="#bfdbfe">相 A：oxide / MXene / carbon</text>
      <text x="565" y="226" textAnchor="middle" fontSize="14" fill="#fed7aa">相 B：sulfide / carbide / oxide</text>
      <text x="380" y="38" textAnchor="middle" fontSize="15" fill="#cbd5e1">界面区域：需报告晶面、终止方式、应变和失配率</text>
    </svg>
  );
}

function SlabSvg({ kind }: { kind: "oxide" | "sulfide" }) {
  const anion = kind === "oxide" ? "O" : "S";
  const anionColor = kind === "oxide" ? "#fb7185" : "#fde047";
  const title = kind === "oxide" ? "金属氧化物 slab 与氧空位模型" : "金属硫化物 slab：基面 / 边缘 / 硫空位";
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <rect x="70" y="62" width="620" height="160" rx="10" fill="#0f172a" stroke="#334155" />
      {[0, 1, 2].map((row) =>
        Array.from({ length: 9 }).map((_, col) => {
          const x = 110 + col * 66 + (row % 2) * 24;
          const y = 92 + row * 48;
          const vacancy = row === 1 && col === 5;
          return (
            <g key={`${row}-${col}`}>
              <circle cx={x} cy={y} r="13" fill="#38bdf8" stroke="#bae6fd" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="10" fill="#082f49">M</text>
              {!vacancy && (
                <>
                  <circle cx={x + 30} cy={y + 22} r="10" fill={anionColor} stroke="#fff7ed" />
                  <text x={x + 30} y={y + 26} textAnchor="middle" fontSize="9" fill="#1f2937">{anion}</text>
                </>
              )}
              {vacancy && <circle cx={x + 30} cy={y + 22} r="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />}
            </g>
          );
        })
      )}
      <text x="42" y="35" fontSize="15" fill="#cbd5e1">{title}</text>
      <text x="515" y="214" fontSize="12" fill="#fbbf24">空位位点</text>
      <text x="42" y="246" fontSize="12" fill="#94a3b8">slab 通常固定底层、优化表层；过渡金属体系需要检查 DFT+U、磁性和表面终止。</text>
    </svg>
  );
}

function MXeneSvg() {
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <rect x="90" y="88" width="580" height="92" rx="10" fill="#111827" stroke="#475569" />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} className={i % 3 === 0 ? "demo-float" : ""}>
          <circle cx={125 + i * 56} cy="112" r="13" fill="#38bdf8" stroke="#bae6fd" />
          <text x={125 + i * 56} y="117" textAnchor="middle" fontSize="9" fill="#082f49">Ti</text>
          <circle cx={153 + i * 56} cy="156" r="10" fill="#94a3b8" />
          <text x={153 + i * 56} y="160" textAnchor="middle" fontSize="8" fill="#020617">C</text>
          <circle cx={125 + i * 56} cy="65" r="9" fill={i % 3 === 0 ? "#fb7185" : i % 3 === 1 ? "#a78bfa" : "#22c55e"} />
          <text x={125 + i * 56} y="47" textAnchor="middle" fontSize="10" fill="#cbd5e1">{i % 3 === 0 ? "O" : i % 3 === 1 ? "OH" : "F"}</text>
        </g>
      ))}
      <text x="42" y="35" fontSize="15" fill="#cbd5e1">Ti3C2Tx：终止基控制 LiPS 结合位点</text>
      <text x="42" y="230" fontSize="12" fill="#94a3b8">纯 -O、-OH、-F 是简化模型；真实 MXene 常为混合终止基并可能含层间水和表面氧化。</text>
    </svg>
  );
}

function DefectCarbonSvg() {
  return (
    <svg viewBox="0 0 760 270" className="h-72 w-full">
      <GrapheneLattice />
      <circle cx="382" cy="135" r="30" fill="#020814" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" />
      {[[326, 104, "N"], [440, 102, "B"], [320, 174, "S"], [445, 174, "P"]].map(([x, y, label], index) => (
        <g key={index}>
          <circle cx={Number(x)} cy={Number(y)} r="15" fill={label === "N" ? "#3b82f6" : label === "B" ? "#fb7185" : label === "S" ? "#fde047" : "#a78bfa"} stroke="#e2e8f0" />
          <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fontSize="12" fill="#0f172a">{label}</text>
        </g>
      ))}
      <text x="34" y="32" fontSize="15" fill="#cbd5e1">缺陷碳 / 杂原子掺杂碳模型</text>
      <text x="34" y="54" fontSize="12" fill="#94a3b8">需要比较本征碳、空位、边缘和不同杂原子位点，不能把无序碳过度简化为单一石墨烯。</text>
    </svg>
  );
}

function GrapheneLattice({ highlightVacancy = false }: { highlightVacancy?: boolean }) {
  const nodes = Array.from({ length: 56 }).map((_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    return { x: 130 + col * 72 + (row % 2) * 36, y: 64 + row * 28 };
  });
  const vacancy = { x: 382, y: 148, radius: highlightVacancy ? 46 : 0 };
  return (
    <g>
      {nodes.map((node, i) => {
        const hidden = highlightVacancy && Math.hypot(node.x - vacancy.x, node.y - vacancy.y) < vacancy.radius;
        return (
        <g key={i}>
          {nodes.slice(i + 1).map((other, j) => {
            const d = Math.hypot(node.x - other.x, node.y - other.y);
            const crossesVacancy = highlightVacancy && Math.hypot((node.x + other.x) / 2 - vacancy.x, (node.y + other.y) / 2 - vacancy.y) < vacancy.radius;
            return d < 80 && !hidden && !crossesVacancy ? <line key={j} x1={node.x} y1={node.y} x2={other.x} y2={other.y} stroke="#334155" strokeWidth="1.5" /> : null;
          })}
          {!hidden && <circle cx={node.x} cy={node.y} r="6" fill="#94a3b8" stroke="#cbd5e1" />}
        </g>
        );
      })}
      {highlightVacancy && <circle cx={vacancy.x} cy={vacancy.y} r="39" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />}
    </g>
  );
}

function AdsorptionGeometrySvg({ mode, species }: { mode: number; species: string }) {
  const sCount = species === "S8" || species === "Li2S8" ? 6 : species === "Li2S6" ? 5 : species === "Li2S4" ? 4 : 2;
  const sulfur = Array.from({ length: sCount }).map((_, i) => [250 + i * 34, 80 + Math.sin(i * 1.3) * 12]);
  return (
    <svg viewBox="0 0 520 190" className="mx-auto h-36 w-full max-w-md">
      <rect x="55" y="140" width="410" height="18" rx="3" fill="#475569" />
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={80 + i * 55} cy="132" r="10" fill={i % 2 ? "#38bdf8" : "#94a3b8"} />)}
      <circle cx={mode === 2 ? 210 : 260} cy="118" r="18" fill="#155e75" stroke="#67e8f9" strokeWidth="2" />
      <text x={mode === 2 ? 210 : 260} y="123" textAnchor="middle" fontSize="13" fill="#e0f2fe">M</text>
      {mode === 2 && (
        <>
          <circle cx="310" cy="118" r="18" fill="#155e75" stroke="#67e8f9" strokeWidth="2" />
          <text x="310" y="123" textAnchor="middle" fontSize="13" fill="#e0f2fe">M</text>
        </>
      )}
      {sulfur.map(([x, y], i) => (
        <g key={i}>
          {i > 0 && <line x1={sulfur[i - 1][0]} y1={sulfur[i - 1][1]} x2={x} y2={y} stroke="#facc15" strokeWidth="3" />}
          <circle cx={x} cy={y} r="13" fill="#fde047" stroke="#fef9c3" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="#422006">S</text>
        </g>
      ))}
      <circle cx="218" cy="63" r="11" fill="#c4b5fd" stroke="#ede9fe" />
      <text x="218" y="67" textAnchor="middle" fontSize="9" fill="#312e81">Li</text>
      <circle cx={250 + (sCount - 1) * 34 + 32} cy="74" r="11" fill="#c4b5fd" stroke="#ede9fe" />
      <text x={250 + (sCount - 1) * 34 + 32} y="78" textAnchor="middle" fontSize="9" fill="#312e81">Li</text>
      {mode === 0 && <line x1="218" y1="63" x2="260" y2="118" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />}
      {mode === 1 && <line x1={sulfur[0][0]} y1={sulfur[0][1]} x2="260" y2="118" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />}
      {mode === 2 && (
        <>
          <line x1={sulfur[1][0]} y1={sulfur[1][1]} x2="210" y2="118" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
          <line x1={sulfur[sulfur.length - 2][0]} y1={sulfur[sulfur.length - 2][1]} x2="310" y2="118" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
        </>
      )}
    </svg>
  );
}

function TaskPanelLayout({ icon, flow, notes, visual }: { icon: React.ReactNode; flow: string[]; notes: string[]; visual: React.ReactNode }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_.9fr]">
      <GlassCard>
        <div className="mb-4 flex items-center gap-3 text-cyan">{icon}<h4 className="text-lg font-semibold text-white">计算流程</h4></div>
        <InfoList items={flow} />
      </GlassCard>
      <GlassCard>
        <h4 className="mb-4 text-lg font-semibold text-white">结果图形演示</h4>
        {visual}
        <p className="mt-3 text-xs text-slate-500">示意图 / 模拟数据，仅用于教学演示，不代表真实计算结果。</p>
      </GlassCard>
      <GlassCard className="xl:col-span-2">
        <h4 className="mb-3 text-lg font-semibold text-white">如何分析与常见误区</h4>
        <InfoList items={notes} />
      </GlassCard>
    </div>
  );
}

function DFTBaderScene() {
  const atoms = [
    { label: "M", value: 0.32, tone: "cyan" as const },
    { label: "S", value: -0.21, tone: "amber" as const },
    { label: "Li", value: 0.18, tone: "violet" as const },
    { label: "O/N", value: -0.12, tone: "blue" as const },
  ];
  return (
    <DFTDemoSurface label="Bader charge partition" minHeight="20rem">
      <div className="grid min-h-56 gap-4 pt-8 md:grid-cols-[.9fr_1.1fr]">
        <div className="relative">
          <CatalystMiniSurface />
          <LiPSMolecule className="left-[36%] top-4 scale-75" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 224">
            <path d="M220 76 C190 118 160 126 118 156" fill="none" stroke="#67e8f9" strokeWidth="2.3" strokeDasharray="8 10" className="demo-flow" markerEnd="url(#arrowCyan)" />
          </svg>
        </div>
        <div className="grid grid-cols-4 items-end gap-3">
          {atoms.map((atom) => (
            <div key={atom.label} className="text-center">
              <div className={`mx-auto w-11 rounded-t border ${atom.value > 0 ? "border-cyan/45 bg-cyan/65" : "border-amber-300/45 bg-amber-300/65"}`} style={{ height: `${86 + atom.value * 110}px` }} />
              <ResearchDemoLabel tone={atom.tone}>{atom.label}</ResearchDemoLabel>
              <p className="mt-1 text-[11px] text-slate-400">{atom.value > 0 ? "+" : ""}{atom.value.toFixed(2)} e</p>
            </div>
          ))}
        </div>
      </div>
    </DFTDemoSurface>
  );
}

function DFTChargeDifferenceScene() {
  return (
    <DFTDemoSurface label="charge density difference" minHeight="20rem">
      <div className="relative min-h-56 pt-8">
        <CatalystMiniSurface />
        <LiPSMolecule className="left-[42%] top-5 scale-75" />
        <motion.span className="absolute left-[56%] top-[34%] h-20 w-28 rounded-full bg-yellow-300/65 blur-md" animate={{ opacity: [0.35, 0.88, 0.42], scale: [0.85, 1.12, 0.9] }} transition={{ duration: 2.8, repeat: Infinity }} />
        <motion.span className="absolute left-[30%] top-[48%] h-16 w-28 rounded-full bg-cyan/55 blur-md" animate={{ opacity: [0.35, 0.82, 0.38], scale: [1.12, 0.9, 1.06] }} transition={{ duration: 2.8, repeat: Infinity }} />
        <ResearchDemoLabel tone="amber" className="absolute right-4 top-6 max-w-40 text-center">electron gain</ResearchDemoLabel>
        <ResearchDemoLabel tone="cyan" className="absolute bottom-4 left-4 max-w-40 text-center">electron loss</ResearchDemoLabel>
      </div>
    </DFTDemoSurface>
  );
}

function DFTCOHPScene() {
  const data = [
    { e: -4, bonding: -1.1, antibonding: 0.1 },
    { e: -3, bonding: -1.5, antibonding: 0.2 },
    { e: -2, bonding: -0.9, antibonding: 0.25 },
    { e: -1, bonding: -0.5, antibonding: 0.45 },
    { e: 0, bonding: -0.2, antibonding: 0.7 },
    { e: 1, bonding: -0.1, antibonding: 0.95 }
  ];
  return (
    <DFTDemoSurface label="bonding / antibonding occupation" minHeight="29rem">
        <ChartHeader title="COHP 曲线与成键/反键区域" />
        <div className="grid gap-5 pt-3 xl:grid-cols-[1fr_.62fr]">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke="rgba(56,189,248,.18)" strokeDasharray="3 3" />
                <XAxis dataKey="e" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#020814", border: "1px solid rgba(56,189,248,.35)", color: "#fff" }} />
                <ReferenceLine x={0} stroke="#f8fafc" label={{ value: "Ef", fill: "#f8fafc", position: "top" }} />
                <ReferenceLine y={0} stroke="#94a3b8" />
                <Line dataKey="bonding" name="bonding (-COHP)" stroke="#38bdf8" strokeWidth={3} dot />
                <Line dataKey="antibonding" name="antibonding" stroke="#fb7185" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <ResearchDemoPanel className="min-h-72 border-cyan/25 bg-slate-950/45">
            <ResearchDemoLabel tone="cyan">M-S / Li-O / S-S</ResearchDemoLabel>
            <div className="relative mt-8 h-48">
              <CatalystMiniSurface />
              <LiPSMolecule className="left-[40%] top-2 scale-75" />
              <motion.span className="absolute left-[47%] top-[5.8rem] h-16 w-16 rounded-full border border-cyan/40 bg-cyan/10" animate={{ scale: [0.88, 1.12, 0.9], opacity: [0.45, 0.9, 0.48] }} transition={{ duration: 2.6, repeat: Infinity }} />
            </div>
          </ResearchDemoPanel>
        </div>
    </DFTDemoSurface>
  );
}

function DFTNEBSetupScene() {
  return (
    <DFTDemoSurface label="NEB directory/image setup" minHeight="20rem">
      <div className="relative min-h-56 pt-8">
        <svg className="absolute inset-x-4 top-16 h-44 w-[calc(100%-2rem)]" viewBox="0 0 620 180">
          <path d="M28 134 C122 38 210 42 294 82 C386 126 456 134 592 122" fill="none" stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="8 10" className="demo-flow" />
        </svg>
        {["00", "01", "02", "03", "04", "05"].map((item, index) => (
          <div key={item} className="absolute text-center" style={{ left: `${5 + index * 17}%`, top: `${128 - Math.sin(index / 5 * Math.PI) * 72}px` }}>
            <ResearchDemoNode tone={index === 2 ? "amber" : "cyan"} className="h-10 w-12 p-0 text-xs">{item}</ResearchDemoNode>
            <p className="mt-2 text-[10px] text-slate-400">{index === 0 ? "IS" : index === 5 ? "FS" : "image"}</p>
          </div>
        ))}
      </div>
    </DFTDemoSurface>
  );
}

function BaderSketch() {
  return <DFTBaderScene />;
}

function LegacyBaderSketch() {
  const bars = [20, -14, 11, -8];
  return <ResearchDemoFrame title="Bader 电荷转移示意" compact minHeight="13rem" className="p-4"><div className="grid h-52 items-end gap-3 md:grid-cols-4">{bars.map((bar, index) => <div key={index} className="text-center"><div className="mx-auto w-10 rounded-t bg-cyan" style={{ height: `${70 + bar}px` }} /><p className="mt-2 text-xs text-slate-300">{["M", "S", "Li", "O/N"][index]}</p></div>)}</div></ResearchDemoFrame>;
}

function ChargeDifferenceSketch() {
  return <DFTChargeDifferenceScene />;
}

function LegacyChargeDifferenceSketch() {
  return <ResearchDemoFrame title="差分电荷密度示意" compact minHeight="13rem"><div className="relative h-52"><span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan text-cyan">M</span><span className="absolute left-[58%] top-[34%] h-16 w-24 rounded-full bg-yellow-300/70 blur-sm" /><span className="absolute left-[32%] top-[50%] h-14 w-24 rounded-full bg-cyan-300/65 blur-sm" /><span className="absolute right-8 top-8 text-xs text-yellow-200">电子积累</span><span className="absolute left-8 bottom-8 text-xs text-cyan-200">电子耗尽</span></div></ResearchDemoFrame>;
}

function COHPSketch() {
  return <DFTCOHPScene />;
}

function LegacyCOHPSketch() {
  const data = [
    { e: -4, bonding: -1.1, antibonding: 0.1 },
    { e: -3, bonding: -1.5, antibonding: 0.2 },
    { e: -2, bonding: -0.9, antibonding: 0.25 },
    { e: -1, bonding: -0.5, antibonding: 0.45 },
    { e: 0, bonding: -0.2, antibonding: 0.7 },
    { e: 1, bonding: -0.1, antibonding: 0.95 }
  ];
  return (
    <GlassCard>
      <ChartHeader title="COHP 曲线与成键/反键区域" />
      <ResearchDemoFrame title="COHP 曲线与成键/反键区域" compact minHeight="18rem" className="p-3">
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#1e3a5f" strokeDasharray="3 3" />
            <XAxis dataKey="e" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#020814", border: "1px solid #31547f", color: "#fff" }} />
            <ReferenceLine x={0} stroke="#f8fafc" label={{ value: "Ef", fill: "#f8fafc", position: "top" }} />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Line dataKey="bonding" name="成键区 (-COHP)" stroke="#38bdf8" strokeWidth={3} dot />
            <Line dataKey="antibonding" name="反键区" stroke="#fb7185" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </ResearchDemoFrame>
    </GlassCard>
  );
}

function NEBSketch() {
  return <DFTNEBSetupScene />;
}

function LegacyNEBSketch() {
  return <ResearchDemoFrame title="NEB 路径图" compact minHeight="13rem" className="p-5"><div className="flex h-52 items-center justify-between">{["IS", "01", "02", "03", "04", "FS"].map((item, index) => <div key={item} className="text-center"><div className="grid h-10 w-10 place-items-center rounded-full border border-cyan/50 bg-cyan/10 text-xs text-white">{item}</div><div className="mt-3 h-16 w-1 rounded bg-blue-500/40" style={{ transform: `translateY(${-Math.sin(index / 5 * Math.PI) * 40}px)` }} /></div>)}</div></ResearchDemoFrame>;
}
