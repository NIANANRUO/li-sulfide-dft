export type ElectrochemicalTestType =
  | "gcd"
  | "cycling"
  | "rate"
  | "cv"
  | "eis"
  | "li2s-nucleation"
  | "symmetric-cell"
  | "practical-condition"
  | "energy-density";

export interface PerformanceMetric {
  id: string;
  name: string;
  symbol?: string;
  unit: string;
  formula?: string;
  meaning: string;
  rigorousNote: string;
  commonPitfalls: string[];
}

export interface ElectrochemicalTest {
  id: string;
  name: string;
  type: ElectrochemicalTestType;
  purpose: string;
  typicalPlot: string;
  xAxis: string;
  yAxis: string;
  keyFeatures: string[];
  analysisSteps: string[];
  proves: string[];
  cannotProve: string[];
  commonPitfalls: string[];
  relatedMechanisms: string[];
  relatedCharacterization: string[];
  relatedDFT: string[];
}

export interface TestingCondition {
  id: string;
  label: string;
  unit: string;
  whyImportant: string;
  rigorousRequirement: string;
}

export interface PerformanceMechanismMap {
  id: string;
  performanceSignal: string;
  possibleMechanisms: string[];
  supportingExperiments: string[];
  supportingDFT: string[];
  caution: string;
}

export const simulatedDataNotice = "示意图 / 模拟数据，仅用于教学演示，不代表真实实验数据。";

export const electrochemicalTabs = [
  {
    id: "overview",
    label: "性能总览",
    title: "锂硫电池性能评价不能只看比容量",
    description:
      "锂硫电池性能评价必须同时考虑比容量、面积容量、硫载量、E/S 比、N/P 比、库伦效率、极化和循环条件。"
  },
  {
    id: "metrics",
    label: "关键指标",
    title: "锂硫电池性能评价中的关键参数如何计算？",
    description:
      "关键指标包括比容量、面积容量、容量保持率、每圈衰减率、库伦效率、E/S 比、C-rate 和实际能量密度相关参数。"
  },
  {
    id: "gcd",
    label: "GCD 充放电曲线",
    title: "如何分析锂硫电池恒流充放电曲线？",
    description:
      "GCD 曲线可用于分析放电平台、充电平台、容量释放、平台极化和反应可逆性。"
  },
  {
    id: "cycling",
    label: "循环性能与库伦效率",
    title: "如何判断锂硫电池循环稳定性是否可靠？",
    description:
      "循环曲线应结合容量保持率、每圈衰减率、库伦效率和测试条件综合分析。"
  },
  {
    id: "rate",
    label: "倍率性能",
    title: "如何分析锂硫电池倍率性能？",
    description:
      "倍率性能反映高电流密度下容量保持和恢复能力，但强烈依赖硫载量、电极厚度和电解液条件。"
  },
  {
    id: "cv",
    label: "CV 曲线分析",
    title: "如何用 CV 分析锂硫电池氧化还原动力学？",
    description:
      "CV 可用于分析还原峰、氧化峰、峰电流、峰间距和反应极化。"
  },
  {
    id: "eis",
    label: "EIS 阻抗分析",
    title: "如何分析锂硫电池 EIS 阻抗谱？",
    description:
      "EIS 可用于分析 Rs、Rct 和扩散相关阻抗，但等效电路选择需要谨慎。"
  },
  {
    id: "li2s-nucleation",
    label: "Li2S 成核/分解",
    title: "如何用 Li2S 成核测试评价催化转化能力？",
    description:
      "Li2S 成核测试可辅助评价催化剂对 Li2S 沉积动力学的影响。"
  },
  {
    id: "symmetric-cell",
    label: "对称电池",
    title: "如何用对称电池评价 LiPS 转化动力学？",
    description:
      "对称电池可用于比较催化剂对 LiPS 氧化还原反应的电化学活性。"
  },
  {
    id: "practical-condition",
    label: "高硫载量与贫电解液评价",
    title: "什么样的性能更接近实际应用？",
    description:
      "实际应用评价需要关注高硫载量、高面积容量、低 E/S 比和有限锂负极条件。"
  },
  {
    id: "energy-density",
    label: "实际能量密度估算",
    title: "为什么高比容量不等于高实际能量密度？",
    description:
      "实际能量密度受硫含量、电解液、锂负极、集流体、隔膜和封装等多因素影响。"
  },
  {
    id: "mechanism-map",
    label: "性能-机制对应关系",
    title: "电化学性能如何与催化剂机制对应？",
    description:
      "性能提升需要结合实验表征和 DFT 计算才能建立合理机制解释。"
  },
  {
    id: "pitfalls",
    label: "常见误区与严谨性检查",
    title: "锂硫电池电化学性能最容易出现哪些误读？",
    description:
      "必须避免只看高比容量、忽略测试条件、过度解释性能曲线等问题。"
  }
] as const;

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: "specific-capacity",
    name: "比容量",
    symbol: "Q_specific",
    unit: "mAh g⁻¹_S",
    formula: "Q_specific = capacity / sulfur mass",
    meaning: "通常基于硫质量计算，反映单位质量硫释放的容量。",
    rigorousNote: "如果只基于硫质量计算，不能直接代表整个电极或全电芯能量密度。",
    commonPitfalls: ["不说明容量归一化基准", "把基于硫质量的容量当成全电芯容量", "忽略硫载量和 E/S 比"]
  },
  {
    id: "areal-capacity",
    name: "面积容量",
    symbol: "Q_areal",
    unit: "mAh cm⁻²",
    formula: "Q_areal = Q_specific × sulfur loading / 1000",
    meaning: "面积容量更接近实际电极评价，尤其适合高硫载量研究。",
    rigorousNote: "面积容量必须结合硫载量、E/S 比、极化和循环稳定性分析。",
    commonPitfalls: ["只报告 mAh g⁻¹，不报告 mAh cm⁻²", "高面积容量但循环不稳定", "高载量下未说明极化变化"]
  },
  {
    id: "sulfur-loading",
    name: "硫载量",
    unit: "mg cm⁻²",
    meaning: "单位面积电极上的硫质量。高硫载量通常有利于提高面积容量。",
    rigorousNote: "高硫载量会放大传质、导电、体积变化和 LiPS 转化问题。",
    commonPitfalls: ["低载量下高容量被误解为实用化性能", "不报告硫载量", "载量不同的样品直接比较"]
  },
  {
    id: "e-s-ratio",
    name: "E/S 比",
    symbol: "E/S",
    unit: "μL mg⁻¹",
    formula: "E/S = electrolyte volume / sulfur mass",
    meaning: "表示每 mg 硫对应的电解液体积，是影响实际能量密度的关键参数。",
    rigorousNote: "低 E/S 更接近实际高能量密度需求，但会增加传质阻力和极化。",
    commonPitfalls: ["不报告 E/S 比", "过量电解液下的性能被过度解读", "忽略贫电解液带来的传质问题"]
  },
  {
    id: "np-ratio",
    name: "N/P 比或锂负极过量",
    unit: "ratio / μm",
    meaning: "反映锂负极容量与正极容量的匹配程度。",
    rigorousNote: "过量锂负极会掩盖锂负极不稳定问题，实用化评价必须说明锂箔厚度或 N/P 比。",
    commonPitfalls: ["只报告正极性能", "忽略锂负极副反应", "用过量 Li 条件声称实际应用"]
  },
  {
    id: "coulombic-efficiency",
    name: "库伦效率",
    symbol: "CE",
    unit: "%",
    formula: "CE = Q_discharge / Q_charge × 100%",
    meaning: "反映充放电可逆性。",
    rigorousNote: "低 CE 可能与 LiPS 穿梭、副反应或锂负极不稳定有关；高 CE 不能单独证明无穿梭。",
    commonPitfalls: ["高 CE 直接等同于无穿梭", "忽略锂负极副反应", "不结合循环后表征"]
  },
  {
    id: "retention",
    name: "容量保持率",
    unit: "%",
    formula: "Retention = Q_n / Q_initial × 100%",
    meaning: "评价长循环后容量相对于初始容量的保持程度。",
    rigorousNote: "必须说明 Q_initial 选取第几圈，尤其要区分活化阶段。",
    commonPitfalls: ["选择性选取初始点", "不说明循环起止范围", "忽略活化过程"]
  },
  {
    id: "polarization",
    name: "电压极化",
    unit: "V",
    meaning: "充放电平台之间的电压差或 CV 峰间距，可反映反应极化和动力学阻力。",
    rigorousNote: "极化需要结合 GCD、CV、EIS 和测试电流密度共同判断。",
    commonPitfalls: ["只看容量不看平台", "不同电流密度下直接比较极化", "把极化降低单独等同于催化位点成立"]
  },
  {
    id: "decay-rate",
    name: "每圈衰减率",
    unit: "% per cycle",
    formula: "Decay per cycle = (1 - Q_n / Q_initial) / n × 100%",
    meaning: "用于描述某个循环区间的平均容量衰减速度。",
    rigorousNote: "这是简化平均值；若初期有活化过程，必须说明起止循环范围。",
    commonPitfalls: ["把全程平均值用于非线性衰减", "不说明活化循环", "忽略测试条件差异"]
  },
  {
    id: "c-rate",
    name: "C-rate",
    unit: "C / mA g⁻¹_S",
    formula: "1C ≈ 1675 mA g⁻¹_S",
    meaning: "表示相对于硫理论容量的充放电速率。",
    rigorousNote: "文献中也可能直接使用 mA g⁻¹，比较时必须确认基准。",
    commonPitfalls: ["不说明 C-rate 换算", "不同容量基准直接比较", "忽略高载量厚电极下实际电流"]
  }
];

export const testingConditions: TestingCondition[] = [
  { id: "sulfur-loading", label: "硫载量", unit: "mg cm⁻²", whyImportant: "直接影响面积容量和实际应用意义。", rigorousRequirement: "所有循环、倍率和 GCD 图旁边都应显示硫载量。" },
  { id: "sulfur-content", label: "正极硫含量", unit: "wt%", whyImportant: "影响正极级容量和实际能量密度。", rigorousRequirement: "需要说明正极中硫、导电剂、粘结剂和催化剂比例。" },
  { id: "e-s-ratio", label: "E/S 比", unit: "μL mg⁻¹", whyImportant: "决定电解液用量和实际能量密度潜力。", rigorousRequirement: "必须报告，尤其在声称高能量密度时。" },
  { id: "li-anode", label: "锂负极厚度 / N/P 比", unit: "μm 或 ratio", whyImportant: "过量锂会掩盖负极不稳定问题。", rigorousRequirement: "实用化性能评价应说明锂负极过量程度。" },
  { id: "current-density", label: "电流密度 / C-rate", unit: "mA g⁻¹ 或 C", whyImportant: "影响容量、极化和倍率性能。", rigorousRequirement: "需要说明 C-rate 换算基准。" },
  { id: "voltage-window", label: "电压窗口", unit: "V", whyImportant: "影响容量释放和副反应风险。", rigorousRequirement: "所有 GCD 和循环数据必须说明电压窗口。" },
  { id: "cell-type", label: "电池类型", unit: "扣式 / 软包 / 对称", whyImportant: "不同电芯结构的质量占比、压力和界面条件不同。", rigorousRequirement: "比较性能时必须说明电池类型。" },
  { id: "electrolyte", label: "电解液组成", unit: "盐 / 溶剂 / 添加剂", whyImportant: "影响 LiPS 溶解、穿梭和锂负极界面。", rigorousRequirement: "必须报告盐浓度、溶剂体系和添加剂。" },
  { id: "temperature", label: "循环温度", unit: "°C", whyImportant: "温度会显著影响动力学和副反应。", rigorousRequirement: "长循环和倍率测试应说明温度。" },
  { id: "activation", label: "活化循环", unit: "圈数 / C-rate", whyImportant: "活化会影响初始容量、保持率和衰减率计算。", rigorousRequirement: "必须说明是否存在低倍率活化循环。" }
];

export const defaultConditionValues = [
  ["硫载量", "4.2 mg cm⁻²"],
  ["正极硫含量", "72 wt%"],
  ["E/S 比", "6.0 μL mg⁻¹"],
  ["锂负极", "50 μm Li 或 N/P≈3"],
  ["电流密度", "0.2C / 335 mA g⁻¹_S"],
  ["电压窗口", "1.7-2.8 V"],
  ["电池类型", "CR2032 扣式半电池"],
  ["电解液组成", "1 M LiTFSI + 0.2 M LiNO₃, DOL/DME"],
  ["循环温度", "25 °C"],
  ["活化循环", "0.05C 2 圈后测试"]
];

export const electrochemicalTests: ElectrochemicalTest[] = [
  {
    id: "gcd",
    name: "恒流充放电 GCD",
    type: "gcd",
    purpose: "分析锂硫电池的容量、放电平台、充电平台和电压极化。",
    typicalPlot: "Voltage-Capacity curve",
    xAxis: "Capacity / mAh g⁻¹",
    yAxis: "Voltage / V",
    keyFeatures: ["第一个放电平台：S8 → 长链 LiPS", "第二个放电平台：LiPS → Li2S2 / Li2S", "充电平台：Li2S / Li2S2 → LiPS → S8", "平台电压差", "容量贡献区域"],
    analysisSteps: ["看放电平台是否清晰", "看两个放电平台容量贡献", "看充放电平台间距", "看首圈与后续循环差异", "看平台是否衰减或变斜", "结合 CV 和 EIS 分析动力学"],
    proves: ["硫物种转化过程", "极化程度", "容量释放", "循环中反应可逆性变化"],
    cannotProve: ["不能单独证明具体催化位点", "不能单独证明 LiPS 吸附机制", "不能单独证明 DFT 反应路径正确"],
    commonPitfalls: ["只看容量不看平台极化", "不报告硫载量和 E/S 比", "把首圈高容量当成长期稳定性", "不区分活化过程和衰减过程"],
    relatedMechanisms: ["LiPS 转化", "Li2S 沉积/分解", "电极极化"],
    relatedCharacterization: ["CV", "EIS", "Li2S 成核", "Raman"],
    relatedDFT: ["自由能路径", "NEB", "DOS/PDOS"]
  },
  {
    id: "cycling",
    name: "循环性能与库伦效率",
    type: "cycling",
    purpose: "评价电池长循环稳定性、容量保持和充放电可逆性。",
    typicalPlot: "Capacity and CE vs cycle number",
    xAxis: "Cycle number",
    yAxis: "Capacity / mAh g⁻¹ and CE / %",
    keyFeatures: ["放电容量", "充电容量", "库伦效率", "容量保持率", "每圈衰减率", "活化阶段"],
    analysisSteps: ["看初始容量", "看是否有活化阶段", "看稳定循环区间", "看容量保持率", "看每圈衰减率", "看库伦效率是否稳定", "看循环条件是否严苛", "看硫载量、E/S 比和电流密度"],
    proves: ["长循环稳定性", "活性物质利用率变化", "穿梭效应和副反应趋势", "电极结构稳定性趋势"],
    cannotProve: ["不能单独证明催化机制", "高 CE 不代表完全没有穿梭", "长循环稳定不代表实际高能量密度，除非测试条件足够严苛"],
    commonPitfalls: ["忽略硫载量和 E/S 比", "用过量电解液下长循环代表实用性能", "高 CE 被直接解释为无副反应"],
    relatedMechanisms: ["穿梭效应", "电极结构稳定性", "锂负极副反应"],
    relatedCharacterization: ["循环后 XPS", "SEM/TEM", "H 型扩散池", "自放电测试"],
    relatedDFT: ["吸附能", "界面结合", "自由能"]
  },
  {
    id: "rate",
    name: "倍率性能",
    type: "rate",
    purpose: "评价不同电流密度下容量保持和恢复能力。",
    typicalPlot: "Capacity vs cycle under different C-rates",
    xAxis: "Cycle number",
    yAxis: "Capacity / mAh g⁻¹",
    keyFeatures: ["0.1C → 0.2C → 0.5C → 1C → 2C → 回到 0.2C", "高倍率容量保持", "低倍率恢复", "平台极化变化"],
    analysisSteps: ["看低倍率容量", "看高倍率容量保持", "看倍率升高时容量下降幅度", "看恢复低倍率后容量是否恢复", "判断反应动力学和结构稳定性"],
    proves: ["高电流密度下反应能力", "电子/离子传输趋势", "动力学改善趋势"],
    cannotProve: ["不能单独证明催化位点", "低载量倍率性能不能代表厚电极", "不能替代实际工况测试"],
    commonPitfalls: ["不说明 C-rate 基准", "不同载量直接比较", "只展示倍率容量，不展示 GCD 平台变化"],
    relatedMechanisms: ["电子传输", "Li+ 传输", "LiPS 转化动力学"],
    relatedCharacterization: ["EIS", "CV", "GITT", "对称电池"],
    relatedDFT: ["DOS/PDOS", "自由能", "NEB"]
  },
  {
    id: "cv",
    name: "循环伏安 CV",
    type: "cv",
    purpose: "分析锂硫电池氧化还原峰、电极极化和反应可逆性。",
    typicalPlot: "Current-Voltage curve",
    xAxis: "Voltage / V",
    yAxis: "Current / mA",
    keyFeatures: ["第一还原峰：S8 → 长链 LiPS", "第二还原峰：LiPS → Li2S2 / Li2S", "氧化峰：Li2S / Li2S2 → S8", "峰电流", "峰位", "峰间距"],
    analysisSteps: ["看还原峰和氧化峰位置", "看峰电流大小", "看峰间距", "比较不同催化剂峰位", "比较不同扫描速率", "判断动力学趋势"],
    proves: ["氧化还原反应是否更容易发生", "极化是否降低", "反应可逆性是否改善", "LiPS 转化动力学趋势"],
    cannotProve: ["不能单独证明具体催化位点", "不能单独证明完整反应路径", "峰电流受电极面积、载量和扫描速率影响"],
    commonPitfalls: ["只看峰高不看峰位", "忽略扫描速率", "不同电极载量直接比较"],
    relatedMechanisms: ["LiPS 氧化还原", "极化降低", "动力学改善"],
    relatedCharacterization: ["GCD", "EIS", "对称电池"],
    relatedDFT: ["自由能路径", "NEB", "DOS"]
  },
  {
    id: "eis",
    name: "电化学阻抗 EIS",
    type: "eis",
    purpose: "分析界面电荷转移阻抗、电解液阻抗和扩散相关阻抗。",
    typicalPlot: "Nyquist plot",
    xAxis: "Z' / Ω",
    yAxis: "-Z'' / Ω",
    keyFeatures: ["高频截距 Rs", "半圆 Rct", "中低频扩散区域", "Warburg 斜线", "等效电路 Rs-(Rct/CPE)-W"],
    analysisSteps: ["看高频截距 Rs", "看半圆大小 Rct", "看低频 Warburg", "看循环前后变化", "结合等效电路拟合", "与 CV 和 GCD 交叉分析"],
    proves: ["电解液和接触阻抗", "界面电荷转移阻力", "扩散相关阻力", "界面稳定性变化趋势"],
    cannotProve: ["不能单独证明具体催化位点", "等效电路不是唯一解", "Rct 低不代表所有反应路径都更优"],
    commonPitfalls: ["只比较半圆大小就下结论", "不说明等效电路", "不报告测试状态", "把 EIS 结果过度解释成完整催化机制"],
    relatedMechanisms: ["界面电荷转移", "扩散阻抗", "极化"],
    relatedCharacterization: ["CV", "GCD", "GITT"],
    relatedDFT: ["DOS/PDOS", "差分电荷", "界面电子结构"]
  },
  {
    id: "li2s-nucleation",
    name: "Li2S 成核测试",
    type: "li2s-nucleation",
    purpose: "评价催化剂对 Li2S 成核、沉积和分解动力学的影响。",
    typicalPlot: "Current-time curve",
    xAxis: "Time / s",
    yAxis: "Current / mA",
    keyFeatures: ["成核起始点", "成核峰", "峰电流", "沉积容量", "成核时间", "积分面积"],
    analysisSteps: ["看成核峰出现时间", "看峰电流大小", "看沉积容量", "比较不同催化剂", "结合 SEM/TEM 沉积形貌", "与 DFT Li2S 吸附能、自由能和 NEB 对应"],
    proves: ["催化剂是否促进 Li2S 成核", "Li2S 沉积动力学", "放电末期转化能力"],
    cannotProve: ["不能单独代表完整锂硫电池循环性能", "不能单独确定具体活性位点", "不能替代全电池测试"],
    commonPitfalls: ["不做空白对照", "不保持 LiPS 浓度一致", "不归一化电极面积或催化剂质量", "不结合沉积形貌分析"],
    relatedMechanisms: ["Li2S 成核", "Li2S 沉积", "Li2S 分解"],
    relatedCharacterization: ["SEM/TEM", "CV", "GCD"],
    relatedDFT: ["Li2S 吸附能", "自由能", "NEB"]
  },
  {
    id: "symmetric-cell",
    name: "对称电池",
    type: "symmetric-cell",
    purpose: "在没有金属锂负极参与的条件下比较催化剂对 LiPS 氧化还原的促进作用。",
    typicalPlot: "Symmetric-cell CV",
    xAxis: "Voltage / V",
    yAxis: "Current / mA",
    keyFeatures: ["两个相同催化剂电极", "含 LiPS 电解液", "氧化峰", "还原峰", "峰电流", "峰间距"],
    analysisSteps: ["看是否出现明显氧化还原峰", "看峰电流", "看峰间距", "比较不同催化剂", "判断 LiPS 转化动力学趋势"],
    proves: ["催化剂对 LiPS 氧化还原反应的促进作用", "反应动力学趋势", "电催化活性辅助证据"],
    cannotProve: ["不能完全代表全电池", "不能说明锂负极稳定性", "不能单独证明真实催化机制"],
    commonPitfalls: ["忽略 LiPS 浓度差异", "不做空白电极", "把对称电池峰电流直接等同全电池性能"],
    relatedMechanisms: ["LiPS 氧化还原", "界面催化", "电子转移"],
    relatedCharacterization: ["CV", "EIS", "Li2S 成核"],
    relatedDFT: ["吸附能", "电荷转移", "自由能"]
  },
  {
    id: "practical-condition",
    name: "高硫载量与贫电解液评价",
    type: "practical-condition",
    purpose: "判断性能测试条件是否接近实际应用，而不是只展示温和条件下的高比容量。",
    typicalPlot: "Practical-condition comparison",
    xAxis: "Condition severity",
    yAxis: "Areal capacity / risk",
    keyFeatures: ["高硫载量", "高面积容量", "低 E/S 比", "有限锂负极", "厚电极"],
    analysisSteps: ["检查硫载量是否达到 4-5 mg cm⁻²", "检查面积容量是否达到约 4 mAh cm⁻²", "检查 E/S 比是否偏低", "检查是否有限锂负极", "结合极化和循环稳定性判断"],
    proves: ["测试条件严苛程度", "电极级容量意义", "离实际应用的距离"],
    cannotProve: ["不能单独给出真实软包能量密度", "不能替代完整电芯工程验证", "不能忽略安全和寿命问题"],
    commonPitfalls: ["低载量高容量被过度宣传", "不报告硫含量", "扣式电池结果直接外推软包"],
    relatedMechanisms: ["传质限制", "极化放大", "锂负极限制"],
    relatedCharacterization: ["厚电极 GCD", "贫电解液循环", "软包验证"],
    relatedDFT: ["反应能垒", "LiPS 吸附", "离子扩散"]
  },
  {
    id: "energy-density",
    name: "实际能量密度估算",
    type: "energy-density",
    purpose: "用简化模型说明高比容量不等于高实际能量密度。",
    typicalPlot: "Areal energy and mass budget",
    xAxis: "Cell design parameter",
    yAxis: "Approximate contribution",
    keyFeatures: ["硫质量", "正极硫含量", "导电剂和粘结剂", "集流体", "隔膜", "电解液", "锂负极", "封装"],
    analysisSteps: ["计算面积容量", "计算面积能量", "检查硫含量", "检查 E/S 比", "检查 Li 过量", "给出实用化风险提示"],
    proves: ["参数对能量密度的方向性影响", "高容量数据的工程约束", "软包设计需要完整质量核算"],
    cannotProve: ["不能代表真实软包电芯精确能量密度", "不能替代完整质量和体积核算", "不能预测安全性"],
    commonPitfalls: ["只用 mAh g⁻¹ × 电压估算全电芯", "忽略电解液和锂负极质量", "不区分理论与实际能量密度"],
    relatedMechanisms: ["材料利用率", "电极设计", "贫电解液限制"],
    relatedCharacterization: ["高载量循环", "软包测试", "E/S 依赖性"],
    relatedDFT: ["催化活性与高载量适配性", "离子扩散", "界面稳定性"]
  }
];

export const practicalConditionCards = [
  { title: "高硫载量", target: "≥ 4-5 mg cm⁻²", note: "提高面积容量，同时放大导电、传质、体积变化和 LiPS 转化问题。" },
  { title: "高面积容量", target: "≥ 4 mAh cm⁻²", note: "比单纯 mAh g⁻¹ 更接近电极级评价。" },
  { title: "低 E/S 比", target: "越低越接近高能量密度", note: "会增加反应难度、降低 LiPS 溶解缓冲能力、放大极化。" },
  { title: "有限锂负极", target: "报告 Li 厚度或 N/P 比", note: "过量锂会掩盖负极问题。" }
];

export const conditionComparisonRows = [
  ["硫载量", "< 2 mg cm⁻²", "≥ 4-5 mg cm⁻²"],
  ["E/S 比", "> 10-20 μL mg⁻¹", "较低，接近贫电解液"],
  ["锂负极", "过量 Li", "有限 Li，需报告 N/P"],
  ["电流密度", "低电流密度", "更关注高面积容量下极化"],
  ["电池类型", "扣式电池", "厚电极、软包或严苛扣式验证"],
  ["典型表现", "高比容量容易实现", "传质和极化问题明显"]
];

export const performanceMechanismMaps: PerformanceMechanismMap[] = [
  {
    id: "polarization-reduction",
    performanceSignal: "GCD 平台极化降低",
    possibleMechanisms: ["电荷转移改善", "LiPS 转化更快", "Li2S 成核/分解更容易"],
    supportingExperiments: ["EIS", "CV", "Li2S 成核", "对称电池"],
    supportingDFT: ["自由能路径", "NEB", "DOS/PDOS"],
    caution: "平台极化降低是动力学改善的支持证据，但不能单独证明具体活性位点。"
  },
  {
    id: "cycling-stability",
    performanceSignal: "循环稳定性提升",
    possibleMechanisms: ["穿梭减弱", "LiPS 被吸附或转化", "电极结构更稳定", "锂负极副反应减少"],
    supportingExperiments: ["UV-vis", "H 型扩散池", "循环后 XPS", "SEM/TEM"],
    supportingDFT: ["吸附能", "差分电荷", "界面结合"],
    caution: "循环稳定性提升可能来自导电性、孔结构、硫分散和电解液条件等多因素。"
  },
  {
    id: "rate-improvement",
    performanceSignal: "倍率性能提升",
    possibleMechanisms: ["电子传输更快", "Li+ 传输改善", "催化转化动力学改善"],
    supportingExperiments: ["EIS", "CV", "GITT", "对称电池"],
    supportingDFT: ["DOS/PDOS", "自由能", "NEB"],
    caution: "倍率性能强烈依赖硫载量、电极厚度、导电剂比例和电解液条件。"
  },
  {
    id: "li2s-nucleation-enhancement",
    performanceSignal: "Li2S 成核容量提升",
    possibleMechanisms: ["催化剂促进 Li2S 沉积", "Li2S 与表面相互作用适中", "转化能垒降低"],
    supportingExperiments: ["Li2S 成核测试", "SEM/TEM 沉积形貌", "GCD"],
    supportingDFT: ["Li2S 吸附能", "自由能", "NEB"],
    caution: "Li2S 成核测试是局部动力学证据，仍需全电池验证。"
  },
  {
    id: "ce-improvement",
    performanceSignal: "库伦效率提升",
    possibleMechanisms: ["穿梭减弱", "副反应减少", "反应可逆性增强"],
    supportingExperiments: ["H 型扩散池", "XPS 负极分析", "自放电测试", "长循环"],
    supportingDFT: ["LiPS 吸附能", "界面电荷转移", "反应自由能"],
    caution: "高 CE 是整体可逆性信号，不能单独证明完全没有穿梭。"
  }
];

export const performancePitfalls = [
  { id: "capacity-only", wrongConclusion: "只看高比容量。", correctInterpretation: "必须同时看硫载量、E/S 比、面积容量和循环条件。" },
  { id: "low-loading-high-energy", wrongConclusion: "低硫载量下的高容量代表实际高能量密度。", correctInterpretation: "低载量下高容量不能直接代表实际电芯能量密度。" },
  { id: "ce-no-shuttle", wrongConclusion: "高库伦效率说明完全没有穿梭。", correctInterpretation: "高 CE 只能说明整体可逆性较好，不能单独证明无穿梭。" },
  { id: "cycle-mechanism", wrongConclusion: "长循环稳定说明催化机制成立。", correctInterpretation: "循环稳定可能由导电、孔结构、硫分散、电解液过量等多因素造成。" },
  { id: "rate-catalyst", wrongConclusion: "倍率性能好说明催化剂一定更强。", correctInterpretation: "倍率性能也受导电剂、硫载量、电极厚度和电解液影响。" },
  { id: "eis-best", wrongConclusion: "EIS 半圆小就说明催化剂最好。", correctInterpretation: "Rct 低只是界面电荷转移改善的证据之一。" },
  { id: "li2s-full-cell", wrongConclusion: "Li2S 成核容量大就说明全电池一定好。", correctInterpretation: "Li2S 成核是局部动力学证据，仍需全电池验证。" },
  { id: "missing-es", wrongConclusion: "不报告 E/S 比。", correctInterpretation: "E/S 比是锂硫电池实际能量密度评价的关键参数，必须报告。" },
  { id: "missing-loading", wrongConclusion: "不报告硫含量和硫载量。", correctInterpretation: "没有硫载量和硫含量，容量数据无法严谨比较。" },
  { id: "condition-mismatch", wrongConclusion: "用不同测试条件比较不同材料。", correctInterpretation: "应尽量使用相同电极配方、载量、电解液、电流密度和测试窗口进行对比。" }
];

export const electrochemicalScientificChecks = [
  "所有性能曲线必须同时展示测试条件。",
  "不能只看比容量，必须关注硫载量、面积容量和 E/S 比。",
  "低硫载量、过量电解液下的性能不能直接代表实用化性能。",
  "GCD 曲线必须分析平台和极化，不只是容量。",
  "循环性能必须说明初始容量选取和循环范围。",
  "倍率性能必须说明 C-rate 换算基准。",
  "CV 不能单独证明具体催化机制。",
  "EIS 等效电路不唯一，不能过度解读。",
  "Li2S 成核测试需要对照样品和形貌验证。",
  "性能提升必须与表征和 DFT 共同解释。"
];
