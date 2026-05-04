export type CharacterizationCategory =
  | "structure-morphology"
  | "phase-crystal"
  | "composition-valence"
  | "local-coordination"
  | "defect-electronic"
  | "reaction-process"
  | "electrochemical-kinetics";

export interface MethodAnalysisGuide {
  analysisSteps: string[];
  keySignals: string[];
  comparisonStrategy: string[];
  cautionNotes: string[];
}

export interface MethodVisualizationSpec {
  title: string;
  type:
    | "principle-schematic"
    | "spectrum-curve"
    | "microscopy-sketch"
    | "comparison-chart"
    | "workflow-diagram";
  description: string;
  keyLabels: string[];
  whatToObserve: string[];
  supportedConclusion: string[];
  unsupportedConclusion: string[];
}

export interface CharacterizationMethod {
  id: string;
  name: string;
  category: CharacterizationCategory;
  principle: string;
  analysisGuide: MethodAnalysisGuide;
  visualization: MethodVisualizationSpec;
  proves: string[];
  cannotProve: string[];
  suitableSystems: string[];
  typicalInterpretation: string[];
  commonPitfalls: string[];
  recommendedPairings: string[];
  dftCorrelation: string[];
}

export interface SystemEvidenceChain {
  id: string;
  systemName: string;
  keyQuestions: string[];
  recommendedMethods: string[];
  evidenceChain: string[];
  methodRoles: {
    method: string;
    role: string;
  }[];
  commonPitfalls: string[];
  dftCorrelation: string[];
}

export interface ExperimentDFTCorrelation {
  id: string;
  experimentalSignal: string;
  experimentalMeaning: string;
  dftAnalysis: string[];
  rigorousNote: string;
}

export interface EvidenceLayer {
  id: string;
  name: string;
  methods: string[];
  purpose: string;
  cannotConclude: string[];
  cooperation: string[];
}

export interface PitfallItem {
  id: string;
  wrongConclusion: string;
  rigorousStatement: string;
  relatedMethods: string[];
}

export const characterizationTabs = [
  "表征总览",
  "按体系查看",
  "按方法查看",
  "证据链总览",
  "LiPS 吸附与扩散验证",
  "Li2S 成核/分解验证",
  "原位/工况表征",
  "电化学动力学验证",
  "实验-DFT 对应关系",
  "常见误区与严谨性检查"
];

export const characterizationOverviewIntro =
  "锂硫电池催化剂研究中的实验表征不能只证明“材料做出来了”，还要证明材料结构、活性位点、价态/电子结构、界面作用、缺陷、LiPS 吸附与转化行为，以及最终电化学动力学改善。一个严谨的研究通常需要形成多层证据链：结构证据、化学态证据、反应过程证据、电化学动力学证据和 DFT 机理证据。";

export const characterizationEvidenceFlow = ["结构证据", "活性位点证据", "LiPS 作用证据", "电化学动力学证据", "DFT 机制证据"];

export const li2sNucleationIntro =
  "Li2S 成核、沉积和充电分解是锂硫电池反应动力学中的关键过程。一个有效的催化剂不仅应吸附 LiPS，还应促进 Li2S 的可控沉积和后续分解，从而降低极化并提高硫利用率。";

export const li2sDftCorrelation = ["Li2S 吸附能", "Li2S 分解自由能", "Li2S 分解 NEB 能垒", "Li2S 与催化剂界面差分电荷", "Li-S 键和 M-S 键 COHP"];

export const inSituOperandoIntro =
  "传统非原位表征只能观察反应前后状态，难以完整捕捉充放电过程中的中间体和动态结构演变。原位或工况表征可以在电池运行过程中追踪 LiPS 生成、转化、Li2S 沉积、晶相变化、价态变化和界面演变，是理解锂硫电池机制的重要工具。";

export const characterizationCategories: {
  id: CharacterizationCategory;
  name: string;
  methods: string[];
  role: string;
  limitation: string;
}[] = [
  {
    id: "structure-morphology",
    name: "结构与形貌表征",
    methods: ["SEM", "TEM", "HRTEM", "SAED", "AC-HAADF-STEM", "STEM-EDS mapping", "EELS"],
    role: "观察材料形貌、粒径、孔结构、晶格条纹、元素分布、单原子/双原子位点和异质界面。",
    limitation: "显微图通常是局部区域信息，必须结合多区域统计和其他体相/局域结构表征。"
  },
  {
    id: "phase-crystal",
    name: "晶相与结构表征",
    methods: ["XRD", "Raman", "SAED", "HRTEM", "XAS"],
    role: "判断晶相、结晶度、缺陷、局域配位和结构演变。",
    limitation: "XRD 对低含量、无定形或高度分散物种不敏感；无金属峰不能单独证明不存在金属团簇。"
  },
  {
    id: "composition-valence",
    name: "元素组成与价态表征",
    methods: ["XPS", "ICP-OES/MS", "EDS mapping", "EELS", "XANES"],
    role: "分析元素组成、金属含量、表面价态、电子结构和价态变化。",
    limitation: "XPS 是表面敏感技术，结合能偏移通常反映电子环境变化，但不能单独定量证明电荷转移量。"
  },
  {
    id: "local-coordination",
    name: "局域配位与原子结构表征",
    methods: ["XAS", "XANES", "EXAFS", "WT-EXAFS", "AC-HAADF-STEM"],
    role: "分析单原子/双原子催化剂中金属价态、配位数、键长和是否存在 M-M 配位。",
    limitation: "单原子结构通常需要 HAADF-STEM、EXAFS、XANES、XPS、ICP 和 XRD 多证据共同判断。"
  },
  {
    id: "defect-electronic",
    name: "缺陷与电子结构表征",
    methods: ["Raman", "EPR", "XPS", "UPS", "Kelvin probe", "Mott-Schottky"],
    role: "分析碳缺陷、氧空位/硫空位、表面功函数、能带结构和界面电荷行为。",
    limitation: "缺陷不能只靠一个峰判断，需要多种方法交叉验证。"
  },
  {
    id: "reaction-process",
    name: "反应过程与电化学验证",
    methods: ["UV-vis Li2S6 吸附", "H 型扩散池", "对称电池", "Li2S 成核", "原位 Raman", "原位 XRD", "CV", "EIS", "GCD", "Tafel", "GITT"],
    role: "验证 LiPS 吸附、扩散、转化、Li2S 沉积/分解和电化学动力学改善。",
    limitation: "电化学性能改善不等同于机制证明，必须结合结构表征和反应过程分析。"
  }
];

const guide = (
  analysisSteps: string[],
  keySignals: string[],
  comparisonStrategy: string[],
  cautionNotes: string[]
): MethodAnalysisGuide => ({ analysisSteps, keySignals, comparisonStrategy, cautionNotes });

const viz = (
  title: string,
  type: MethodVisualizationSpec["type"],
  keyLabels: string[],
  whatToObserve: string[],
  supportedConclusion: string[],
  unsupportedConclusion: string[],
  description = "示意图用于提示应观察的关键信号，不能替代真实实验数据。"
): MethodVisualizationSpec => ({ title, type, description, keyLabels, whatToObserve, supportedConclusion, unsupportedConclusion });

export const characterizationMethods: CharacterizationMethod[] = [
  {
    id: "xrd",
    name: "XRD",
    category: "phase-crystal",
    principle: "XRD 用于分析晶体材料的物相、晶体结构和结晶度。晶体对 X 射线发生衍射，衍射峰位置与晶面间距相关，可由 Bragg 定律理解。",
    analysisGuide: guide(
      ["读取 2θ 峰位、峰强和峰宽。", "标注晶面归属、杂相峰和层间距变化。", "对 MXene 重点关注 (002) 峰移动。"],
      ["目标晶相峰", "杂相峰", "峰宽变化", "MXene (002) 峰位"],
      ["与标准 PDF 卡片、对照样品和文献峰位比较。", "与 HRTEM/SAED 和 XAS 联合判断结构。"],
      ["对低含量、高分散或无定形物种不敏感。", "无金属峰只能作为辅助排除明显晶态颗粒的证据。"]
    ),
    visualization: viz("XRD 典型衍射峰与层间距变化", "spectrum-curve", ["2θ", "Intensity", "目标晶相", "杂相", "(002) shift"], ["峰位归属", "低角峰移动", "杂相是否可见"], ["支持晶相存在、层间距变化或两相共存。"], ["不能单独支持单原子结构或完全排除团簇。"]),
    proves: ["晶相是否存在", "是否有明显晶态杂相", "层间距变化", "异质结构中两相共存"],
    cannotProve: ["不能单独证明单原子结构", "不能排除所有小尺寸团簇或无定形相", "不能证明具体活性位点参与反应"],
    suitableSystems: ["单原子催化剂", "异质结催化剂", "金属氧化物", "金属硫化物", "金属氮化物", "磷化物/碳化物", "MXene"],
    typicalInterpretation: ["目标峰与标准卡片匹配时，可支持目标晶相形成。", "MXene (002) 峰向低角移动，可能表明层间距增大。", "没有金属峰只能说明未检测到明显晶态金属颗粒。"],
    commonPitfalls: ["把 XRD 无金属峰等同于单原子结构。", "忽略无定形相和低负载物种。"],
    recommendedPairings: ["HRTEM", "SAED", "XAS", "XPS", "ICP"],
    dftCorrelation: ["晶相和晶面选择可为 slab 模型构建提供依据。", "层间距变化可与插层或终止基模型相互参照。"]
  },
  {
    id: "sem",
    name: "SEM",
    category: "structure-morphology",
    principle: "SEM 通过电子束扫描材料表面并收集二次电子或背散射电子信号，用于观察表面形貌。",
    analysisGuide: guide(
      ["观察颗粒尺寸、团聚程度、片层和孔结构。", "比较循环前后电极形貌和沉积覆盖。", "进行多区域统计，避免只展示最优区域。"],
      ["颗粒尺度", "片层结构", "孔结构", "循环后沉积"],
      ["与 TEM、BET、GCD 循环后表征联合使用。", "对比空白载体、复合材料和循环后样品。"],
      ["SEM 不是原子级证据。", "样品制备和导电喷金可能影响表面观察。"]
    ),
    visualization: viz("SEM 多孔颗粒与循环后沉积示意", "microscopy-sketch", ["多孔颗粒", "片层", "沉积层", "尺度统计"], ["形貌是否均一", "是否明显团聚", "沉积是否均匀"], ["支持材料形貌、厚电极结构和循环后形貌变化。"], ["不能支持价态、配位或催化机制。"]),
    proves: ["宏观/微观形貌", "颗粒或片层结构", "循环前后形貌变化", "厚电极结构变化"],
    cannotProve: ["不能证明原子级活性位点", "不能直接证明价态、配位或催化机制"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["片层或多孔结构可能有利于电解液浸润和硫负载。", "循环后沉积更均匀可辅助支持界面反应更可控。"],
    commonPitfalls: ["用单张 SEM 图解释所有性能提升。", "忽略多区域和粒径统计。"],
    recommendedPairings: ["TEM", "BET/BJH", "EDS mapping", "GCD", "Li2S 沉积形貌"],
    dftCorrelation: ["通常不直接对应单一 DFT 模型，但可约束孔结构、表面暴露和界面模型假设。"]
  },
  {
    id: "tem-hrtem-saed",
    name: "TEM / HRTEM / SAED",
    category: "structure-morphology",
    principle: "TEM 利用透射电子成像，HRTEM 可观察晶格条纹，SAED 可通过选区电子衍射辅助判断局部晶体结构。",
    analysisGuide: guide(
      ["观察纳米结构、晶格条纹、晶面间距和界面。", "读取 SAED 环或斑点并与晶面匹配。", "与 XRD 的体相结果交叉验证。"],
      ["晶格条纹", "晶面间距", "SAED 环", "异质界面"],
      ["比较多个区域和不同放大倍数。", "与标准晶面、XRD 和 EDS mapping 对照。"],
      ["局部图像不能代表整体样品。", "晶格条纹需要与晶相和晶面匹配。"]
    ),
    visualization: viz("晶格条纹、异质界面与 SAED 环", "microscopy-sketch", ["d-spacing", "界面", "SAED ring", "纳米颗粒"], ["条纹间距", "界面接触", "衍射环归属"], ["支持纳米结构、晶面和异质界面存在。"], ["不能单独支持电子转移或整体样品结构均一。"]),
    proves: ["纳米结构", "晶格条纹", "晶面间距", "局部晶体结构", "异质界面", "纳米颗粒分布"],
    cannotProve: ["局部图像不能代表整体样品", "不能单独证明电子转移", "不能单独确定催化机制"],
    suitableSystems: ["异质结催化剂", "金属氧化物", "金属硫化物", "金属氮化物", "磷化物/碳化物", "MXene"],
    typicalInterpretation: ["清晰晶格条纹和 SAED 匹配可辅助支持目标晶相。", "紧密界面图像可支持异质结形成，但仍需 XPS/UPS 等电子结构证据。"],
    commonPitfalls: ["把局部界面图直接等同于大面积异质结。", "只给晶格条纹但不做晶面归属。"],
    recommendedPairings: ["XRD", "STEM-EDS mapping", "XPS", "UPS/Kelvin probe"],
    dftCorrelation: ["晶面信息可用于选择 slab 表面。", "界面取向可为异质结 DFT 模型提供参考。"]
  },
  {
    id: "haadf",
    name: "AC-HAADF-STEM",
    category: "local-coordination",
    principle: "像差校正 HAADF-STEM 的强度近似与原子序数 Z 相关，高 Z 金属原子在轻元素载体上表现为亮点。",
    analysisGuide: guide(
      ["观察孤立亮点、相邻双亮点和团簇/颗粒。", "进行多区域统计，报告代表性与异常区域。", "与 XAS、ICP 和 XRD 交叉验证。"],
      ["孤立高 Z 亮点", "相邻双亮点", "团簇", "颗粒"],
      ["与低 Z 载体背景、空白载体和不同区域对比。", "结合 EXAFS 判断 M-M 配位。"],
      ["不能从几处亮点推断整个样品。", "亮点可能受投影、污染或厚度影响。"]
    ),
    visualization: viz("单原子、相邻双原子与团簇亮点对比", "microscopy-sketch", ["单原子亮点", "双原子亮点", "团簇", "碳载体"], ["亮点是否孤立", "是否存在团簇", "多区域一致性"], ["支持金属高度分散或局部双原子位点存在的推断。"], ["不能单独支持全样品都是单原子或给出配位环境。"]),
    proves: ["高 Z 金属原子在载体上的孤立亮点", "单原子或双原子位点的局部图像", "金属原子分散状态"],
    cannotProve: ["不能单独证明全样品都是单原子", "不能单独给出配位环境", "不能单独排除所有团簇"],
    suitableSystems: ["单原子催化剂", "双原子催化剂", "缺陷碳与杂原子掺杂碳"],
    typicalInterpretation: ["轻元素载体上的孤立高亮点可支持金属高度分散。", "相邻亮点需要结合 EXAFS/WT-EXAFS 判断是否存在 M1-M2 相互作用。"],
    commonPitfalls: ["用一张 HAADF-STEM 图证明单原子。", "忽略团簇区域和统计。"],
    recommendedPairings: ["EXAFS", "WT-EXAFS", "XANES", "XPS", "ICP", "XRD"],
    dftCorrelation: ["为 M-N4/C、M-N3/C 或 M1-M2 位点模型提供局部结构依据。"]
  },
  {
    id: "eds-mapping",
    name: "STEM-EDS mapping",
    category: "composition-valence",
    principle: "在 STEM 下结合能谱分析元素特征 X 射线信号，获得元素空间分布。",
    analysisGuide: guide(
      ["比较不同元素 mapping 是否重叠。", "检查偏析、局部富集和界面区域。", "结合 HRTEM、XRD、XPS 判断结构属性。"],
      ["元素重叠", "偏析区域", "界面分布", "多元素均匀性"],
      ["与线扫、面扫和 ICP 定量互补。", "与空白载体和物理混合物对照。"],
      ["元素共存不等于形成化学键。", "mapping 分辨率不足以直接说明原子级配位。"]
    ),
    visualization: viz("多元素 mapping 叠加示意", "comparison-chart", ["M", "N/O/S", "C", "overlay"], ["元素是否均匀", "是否局部富集", "界面是否重叠"], ["支持元素空间分布和多相/界面区域判断。"], ["不能单独支持原子级配位或高熵单相结构。"]),
    proves: ["元素空间分布", "多元素是否大致均匀", "异质结构中不同元素区域"],
    cannotProve: ["不能证明原子级配位", "不能证明元素之间一定形成化学键", "不能单独证明高熵单相结构"],
    suitableSystems: ["异质结催化剂", "多组分/高熵体系", "双原子催化剂", "MXene"],
    typicalInterpretation: ["多元素均匀重叠可支持组分分散良好。", "界面处元素相邻分布可辅助支持异质界面。"],
    commonPitfalls: ["用 EDS mapping 单独证明高熵结构。", "把元素重叠直接说成化学键形成。"],
    recommendedPairings: ["HRTEM", "XRD", "XPS", "ICP", "XAS"],
    dftCorrelation: ["可为多组分模型中元素分布和界面位置提供实验约束。"]
  },
  {
    id: "xps",
    name: "XPS",
    category: "composition-valence",
    principle: "XPS 是表面敏感技术，通过测量光电子结合能分析元素组成、化学态、价态和表面电子环境。",
    analysisGuide: guide(
      ["分析核心能级峰位、价态分峰和峰面积比例。", "比较吸附前后、循环前后或异质组分前后的结合能偏移。", "进行电荷校正并设置合理分峰约束。"],
      ["结合能偏移", "价态峰", "N 1s/O 1s/S 2p/P 2p/C 1s", "循环后表面物种"],
      ["与标准样品、空白载体、XANES 和 DFT 电荷分析对照。", "对 S 2p 区分晶格硫、多硫化物硫和氧化硫物种。"],
      ["XPS 是表面信息，不等于体相信息。", "结合能偏移不能直接定量 Bader 电荷。"]
    ),
    visualization: viz("XPS 分峰与吸附后峰位偏移", "spectrum-curve", ["Binding Energy", "Intensity", "价态峰", "吸附后偏移"], ["峰位移动", "分峰约束", "循环后新峰"], ["支持表面价态、化学状态和电子环境变化。"], ["不能单独支持氧空位、定量电荷转移或催化机制。"]),
    proves: ["表面元素组成", "金属价态变化", "N/O/S/P/C 化学状态", "循环前后表面物种", "电子环境变化"],
    cannotProve: ["不能直接定量 Bader 电荷", "不能单独证明氧空位", "不能单独证明催化机制", "表面信息不等于体相信息"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["结合能偏移可能表明电子环境变化。", "LiPS 接触后 S 2p 或金属峰变化可辅助支持界面相互作用。"],
    commonPitfalls: ["把结合能偏移说成电子转移多少。", "仅凭 O 1s 缺陷氧峰证明氧空位。", "S 2p 解峰时混淆晶格硫、多硫化物硫和氧化硫。"],
    recommendedPairings: ["XANES", "EXAFS", "EPR", "Raman", "吸附实验", "DFT Bader"],
    dftCorrelation: ["XPS 结合能偏移可与 Bader 电荷、差分电荷和 DOS 变化对应。"]
  },
  {
    id: "xas",
    name: "XAS / XANES / EXAFS / WT-EXAFS",
    category: "local-coordination",
    principle: "XAS 研究元素价态和局域配位环境。XANES 偏重价态和电子结构，EXAFS 偏重配位数、键长和局域结构，WT-EXAFS 可辅助区分不同散射路径。",
    analysisGuide: guide(
      ["比较吸收边位置和白线强度。", "分析 R 空间峰、拟合配位数、键长和 M-M 配位。", "用 WT 图辅助区分轻元素散射与金属散射。"],
      ["吸收边", "白线强度", "M-N/M-O/M-S 峰", "M-M 峰", "WT-EXAFS"],
      ["与金属箔、氧化物、硫化物和标准配合物参比。", "将拟合结果与 DFT 优化键长互相检查。"],
      ["拟合依赖模型选择。", "复杂无序结构难以完全还原。", "不能孤立使用。"]
    ),
    visualization: viz("EXAFS R 空间峰与 WT 散射路径", "spectrum-curve", ["R space", "M-N/M-O/M-S", "M-M", "WT"], ["轻元素配位峰", "M-M 是否明显", "拟合残差"], ["支持金属价态、局域配位和是否存在明显 M-M 配位。"], ["不能孤立支持复杂真实结构的唯一模型。"]),
    proves: ["金属价态", "局域配位原子", "配位数", "金属-轻元素配位", "是否存在明显 M-M 配位", "单原子/双原子结构的重要证据"],
    cannotProve: ["拟合结果依赖模型选择", "不能孤立使用", "难以完全还原复杂无序结构"],
    suitableSystems: ["单原子催化剂", "双原子催化剂", "金属氧化物", "金属硫化物", "金属氮化物", "多组分/高熵体系"],
    typicalInterpretation: ["缺少明显 M-M 峰并存在合理 M-N/M-S/M-O 配位，可支持高度分散金属位点。", "XANES 边位移动可辅助说明价态变化。"],
    commonPitfalls: ["只看 R 空间峰位就下单原子结论。", "EXAFS 过拟合或路径选择不合理。"],
    recommendedPairings: ["AC-HAADF-STEM", "XPS", "ICP", "XRD", "DFT 结构模型"],
    dftCorrelation: ["EXAFS 配位环境可对应 DFT 中 M-N4、M-N3、M-O、M-S、M1-M2 模型。"]
  },
  {
    id: "raman",
    name: "Raman",
    category: "defect-electronic",
    principle: "Raman 通过非弹性散射反映分子振动、晶格振动、碳缺陷和部分硫物种信息。",
    analysisGuide: guide(
      ["读取 D/G 比、峰位移动和半峰宽。", "识别缺陷相关峰或 LiPS 相关峰随反应变化。", "控制激光功率和采集条件。"],
      ["D/G 比", "峰位移动", "LiPS 中间体峰", "半峰宽"],
      ["与 XPS、EPR、原位谱和对照样品比较。", "结合电位或时间序列观察演化趋势。"],
      ["D/G 比不能单独说明催化活性。", "信号受荧光、激光、样品厚度影响。"]
    ),
    visualization: viz("D/G 峰与原位 LiPS 峰演变", "spectrum-curve", ["D band", "G band", "LiPS peaks", "time/potential"], ["D/G 变化", "峰位移动", "中间体峰消长"], ["支持碳缺陷、硫物种或反应演化趋势。"], ["不能单独支持缺陷类型或催化活性增强。"]),
    proves: ["碳材料 D/G 比", "石墨化程度和缺陷", "部分金属化合物相结构", "硫物种或 LiPS 中间体", "原位 Raman 中反应演化趋势"],
    cannotProve: ["D/G 比不能单独说明催化活性", "峰位变化需要结合结构和化学态分析", "不能单独确定复杂物种"],
    suitableSystems: ["缺陷碳与杂原子掺杂碳", "MXene", "金属硫化物", "金属氧化物", "异质结催化剂"],
    typicalInterpretation: ["D/G 比升高可能支持缺陷增多。", "原位 LiPS 峰衰减或转化加快可辅助支持反应过程改变。"],
    commonPitfalls: ["把 D/G 比升高直接等同于催化活性增强。", "忽略荧光背景和峰重叠。"],
    recommendedPairings: ["XPS", "EPR", "XAS", "原位 Raman", "DFT 中间体稳定性"],
    dftCorrelation: ["可与缺陷模型、LiPS 转化路径和反应中间体分析对应。"]
  },
  {
    id: "epr",
    name: "EPR",
    category: "defect-electronic",
    principle: "EPR 检测未成对电子信号，可用于分析氧空位、硫空位和部分缺陷位点。",
    analysisGuide: guide(
      ["分析 g 值、信号强度和峰形。", "比较处理前后或还原/氧化气氛后的变化。", "结合 XPS、Raman 和 XAS 判断缺陷归属。"],
      ["g≈2.00 信号", "信号强度", "处理前后变化"],
      ["与无缺陷对照、不同热处理样品和 DFT 缺陷模型比较。"],
      ["不能单独定量所有缺陷。", "信号归属需要谨慎。"]
    ),
    visualization: viz("g≈2.00 附近缺陷信号对比", "spectrum-curve", ["Magnetic field", "g≈2.00", "defect signal", "control"], ["信号强度差异", "峰形变化", "对照样品"], ["支持未成对电子或缺陷位点存在的推断。"], ["不能单独支持具体缺陷浓度或唯一缺陷类型。"]),
    proves: ["氧空位", "硫空位", "未成对电子", "部分缺陷位点"],
    cannotProve: ["不能单独定量所有缺陷", "不能在无对照时可靠归属信号"],
    suitableSystems: ["金属氧化物", "金属硫化物", "缺陷碳与杂原子掺杂碳"],
    typicalInterpretation: ["g≈2.00 附近增强信号常被用作缺陷或未成对电子的辅助证据。"],
    commonPitfalls: ["将一个 EPR 峰直接定义为氧空位或硫空位。", "缺少处理前后和空白对照。"],
    recommendedPairings: ["XPS", "Raman", "XAS", "DFT 缺陷模型"],
    dftCorrelation: ["可与缺陷态 DOS、自旋密度和缺陷形成能对应。"]
  },
  {
    id: "bet-bjh",
    name: "BET / BJH",
    category: "structure-morphology",
    principle: "通过气体吸脱附等温线和孔径模型分析比表面积、孔体积和孔径分布。",
    analysisGuide: guide(
      ["读取吸脱附曲线类型和滞后环。", "报告 BET 比表面积、孔体积和孔径分布。", "与硫载量和电化学表现结合。"],
      ["比表面积", "孔体积", "孔径分布", "滞后环"],
      ["与 SEM/TEM 孔结构、TGA 硫含量和 GCD 性能对照。"],
      ["BET 不直接证明 LiPS 化学吸附。", "孔结构贡献不能替代活性位点证据。"]
    ),
    visualization: viz("吸脱附等温线与孔径分布", "comparison-chart", ["P/P0", "adsorption", "desorption", "pore size"], ["滞后环", "孔径峰", "比表面积差异"], ["支持比表面积、孔体积和多孔结构判断。"], ["不能单独支持化学吸附强或催化活性高。"]),
    proves: ["比表面积", "孔体积", "孔径分布", "多孔结构"],
    cannotProve: ["高比表面积不等于高催化活性", "BET 不直接证明 LiPS 化学吸附"],
    suitableSystems: ["缺陷碳与杂原子掺杂碳", "MXene", "多孔复合材料"],
    typicalInterpretation: ["介孔/大孔有利于传质，微孔可能增强物理限域。", "孔结构改善可辅助解释倍率和硫负载表现。"],
    commonPitfalls: ["用高 BET 解释所有性能提升。", "忽略化学吸附与催化证据。"],
    recommendedPairings: ["SEM", "TEM", "TGA", "UV-vis 吸附", "电化学动力学"],
    dftCorrelation: ["通常不直接对应单点 DFT，主要用于约束传质和可接触表面积解释。"]
  },
  {
    id: "uv-vis-lips",
    name: "UV-vis Li2S6 / Li2S4 吸附实验",
    category: "reaction-process",
    principle: "通过 LiPS 溶液特征吸收峰变化比较材料对多硫化物的吸附或浓度降低能力。",
    analysisGuide: guide(
      ["比较溶液颜色和特征吸收峰强度。", "设置空白组、对照组和目标材料组。", "保持材料质量、LiPS 浓度和光程一致。"],
      ["Li2S6/Li2S4 吸收峰", "颜色变浅", "峰强下降"],
      ["与空白溶液、载体、物理混合样品和 DFT 吸附能对照。"],
      ["颜色变化可能受沉淀、光散射和材料本身颜色干扰。", "不能单独证明催化转化。"]
    ),
    visualization: viz("LiPS 溶液颜色和 UV-vis 峰强对比", "comparison-chart", ["blank", "host", "catalyst", "absorbance"], ["峰强是否下降", "颜色是否变浅", "对照是否充分"], ["支持 LiPS 浓度降低或吸附增强。"], ["不能单独支持催化转化或具体吸附位点。"]),
    proves: ["材料对 LiPS 可能具有吸附作用", "颜色变化是直观辅助证据", "吸收峰下降可作为半定量证据"],
    cannotProve: ["不能单独证明催化转化", "不能单独证明吸附位点", "不能排除沉淀或材料颜色干扰"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["溶液颜色变浅可能说明 LiPS 浓度降低。", "特征峰强度下降可支持吸附或浓度降低。"],
    commonPitfalls: ["把颜色变浅直接说成催化转化。", "缺少相同质量和空白对照。"],
    recommendedPairings: ["吸附后 XPS", "Raman/FTIR", "H 型扩散池", "对称电池", "DFT 吸附能"],
    dftCorrelation: ["对应 LiPS 吸附能、差分电荷和 Bader 电荷。"]
  },
  {
    id: "h-cell",
    name: "H 型扩散池",
    category: "reaction-process",
    principle: "利用 H 型池两侧浓度梯度，比较 LiPS 穿过隔膜或功能层的扩散速率。",
    analysisGuide: guide(
      ["观察接收侧颜色随时间变化。", "测量 UV-vis 吸收峰增长速率。", "比较普通隔膜与功能化隔膜/中间层。"],
      ["颜色梯度", "接收侧吸收峰", "扩散速率"],
      ["保持隔膜面积、LiPS 浓度和时间窗口一致。", "与完整电池循环和穿梭抑制实验对照。"],
      ["扩散池条件与真实电池不同。", "不能直接证明催化转化。"]
    ),
    visualization: viz("H 型池 LiPS 扩散示意", "principle-schematic", ["LiPS side", "separator", "receiving side", "diffusion"], ["接收侧颜色", "峰强增长速度", "功能层阻隔"], ["支持隔膜或中间层对 LiPS 迁移的抑制作用。"], ["不能单独支持真实电池中完全无穿梭或催化转化。"]),
    proves: ["LiPS 跨膜扩散能力", "隔膜或中间层对 LiPS 迁移的抑制作用"],
    cannotProve: ["不能直接证明催化转化", "不能直接说明电池中完全无穿梭", "扩散实验环境与真实电池不同"],
    suitableSystems: ["隔膜涂层", "中间层", "MXene", "多孔碳", "极性催化剂"],
    typicalInterpretation: ["接收侧颜色变浅或吸收峰增长变慢，通常支持扩散被减弱。"],
    commonPitfalls: ["把扩散抑制等同于催化转化。", "忽略隔膜厚度和孔结构差异。"],
    recommendedPairings: ["UV-vis 吸附", "完整电池循环", "EIS", "DFT 吸附能"],
    dftCorrelation: ["可与 LiPS 吸附能和表面电荷分布共同解释穿梭抑制趋势。"]
  },
  {
    id: "symmetric-cell",
    name: "对称电池",
    category: "electrochemical-kinetics",
    principle: "使用相同催化剂电极和含 LiPS 电解液，评价 LiPS 氧化还原反应动力学。",
    analysisGuide: guide(
      ["读取氧化还原峰、峰电流和峰间距。", "比较不同催化剂与扫描速率。", "控制电极负载量和 LiPS 浓度。"],
      ["氧化还原峰", "峰电流", "峰间距", "扫描速率依赖"],
      ["与完整电池 CV、Li2S 成核和 DFT 自由能路径对照。"],
      ["测试条件与完整电池不同。", "不能单独确定具体活性位点。"]
    ),
    visualization: viz("对称电池 CV 峰电流和峰间距", "spectrum-curve", ["Potential", "Current", "peak current", "peak separation"], ["峰电流大小", "峰间距", "可逆性"], ["支持 LiPS 氧化还原动力学改善。"], ["不能单独支持具体活性位点或完整机制。"]),
    proves: ["催化剂对 LiPS 氧化还原反应的电化学活性", "峰电流和峰间距可辅助评价转化动力学"],
    cannotProve: ["不能单独确定具体活性位点", "需结合负载量、扫描速率和对照样品"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["峰电流更高、峰间距更小通常支持 LiPS 转化动力学更好。"],
    commonPitfalls: ["忽略电极面积、负载量和 LiPS 浓度。", "用对称电池替代完整电池验证。"],
    recommendedPairings: ["CV", "Li2S 成核", "GCD", "DFT 自由能/NEB"],
    dftCorrelation: ["对应自由能路径、NEB 能垒和 DOS/PDOS 分析。"]
  },
  {
    id: "li2s-nucleation",
    name: "Li2S 成核测试",
    category: "reaction-process",
    principle: "在恒电位条件下监测 Li2S 沉积电流响应，评价催化剂促进 Li2S 成核和沉积的能力。",
    analysisGuide: guide(
      ["读取成核起始时间、成核峰电流和沉积容量。", "计算成核过电位并比较对照样品。", "统一硫浓度、电解液和催化剂负载。"],
      ["成核起始时间", "峰电流", "积分沉积容量", "成核过电位"],
      ["与 SEM/TEM 沉积形貌、CV 氧化峰和 DFT Li2S 能垒对照。"],
      ["不能单独说明完整 LiPS 转化路径。", "实验条件需要严格一致。"]
    ),
    visualization: viz("Li2S 成核时间-电流曲线", "spectrum-curve", ["Time", "Current", "onset", "peak", "area"], ["成核更早", "峰电流更高", "面积更大"], ["支持催化剂促进 Li2S 沉积动力学。"], ["不能单独支持完整 LiPS 转化路径或唯一活性位点。"]),
    proves: ["催化剂对 Li2S 成核和沉积过程的促进作用", "成核峰电流、沉积容量和成核过电位反映沉积动力学"],
    cannotProve: ["不能单独说明完整 LiPS 转化路径", "需结合沉积形貌和 DFT"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["更早出现成核峰、沉积容量更高和成核过电位更低，通常支持催化剂促进 Li2S 沉积。"],
    commonPitfalls: ["不同硫浓度或催化剂负载下直接比较。", "只用成核曲线下完整机制结论。"],
    recommendedPairings: ["SEM/TEM 沉积形貌", "CV", "GCD", "原位 Raman", "DFT NEB"],
    dftCorrelation: ["对应 Li2S 吸附能、Li2S 成核自由能和 NEB。"]
  },
  {
    id: "cv",
    name: "CV",
    category: "electrochemical-kinetics",
    principle: "通过电位扫描记录电流响应，反映氧化还原过程和反应可逆性。",
    analysisGuide: guide(
      ["读取还原峰和氧化峰位置。", "比较峰电流、峰间距和扫描速率依赖。", "关注极化程度和反应可逆性。"],
      ["还原峰", "氧化峰", "峰电位差", "峰电流"],
      ["与对称电池、GCD 平台和 Li2S 成核对照。"],
      ["峰位和峰强受电极负载、电解液和扫描速率影响。", "不能单独证明催化机制。"]
    ),
    visualization: viz("不同催化剂 CV 峰位和峰电流对比", "spectrum-curve", ["Potential", "Current", "redox peaks", "polarization"], ["峰间距", "峰电流", "峰位偏移"], ["支持极化降低和反应可逆性改善。"], ["不能单独支持具体催化机制。"]),
    proves: ["氧化还原峰", "峰电位差", "极化程度", "反应可逆性", "不同扫描速率下动力学差异"],
    cannotProve: ["不能单独证明催化机制", "不能排除电极负载和电解液影响"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["峰间距减小和峰电流增大通常支持极化降低和反应动力学改善。"],
    commonPitfalls: ["忽略硫载量和扫描速率。", "把峰强提升直接归因于某个活性位点。"],
    recommendedPairings: ["EIS", "GCD", "对称电池", "Li2S 成核", "DFT 自由能"],
    dftCorrelation: ["可与自由能路径、NEB 和电子结构分析共同解释动力学趋势。"]
  },
  {
    id: "eis",
    name: "EIS",
    category: "electrochemical-kinetics",
    principle: "通过小幅交流扰动测量电化学体系的阻抗响应，用于分析界面电荷转移和扩散相关过程。",
    analysisGuide: guide(
      ["读取高频截距 Rs、半圆直径 Rct 和低频 Warburg 斜线。", "比较循环前后阻抗变化。", "检查等效电路是否合理。"],
      ["Rs", "Rct", "Warburg", "循环后阻抗"],
      ["与 CV、GCD、DOS/PDOS 和差分电荷分析对照。"],
      ["拟合模型不唯一。", "Rct 降低不能单独证明具体活性位点。"]
    ),
    visualization: viz("Nyquist 曲线 Rs、Rct 与 Warburg", "spectrum-curve", ["Z'", "-Z''", "Rs", "Rct", "Warburg"], ["半圆大小", "低频斜线", "循环前后变化"], ["支持界面电荷转移或扩散阻抗变化。"], ["不能单独支持某个活性位点有效。"]),
    proves: ["界面电荷转移阻抗", "扩散相关阻抗", "循环前后界面变化"],
    cannotProve: ["拟合模型不唯一", "Rct 降低不能单独证明具体活性位点"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["Rct 降低通常说明界面电荷转移更容易。", "循环后阻抗变化可辅助评价界面稳定性。"],
    commonPitfalls: ["过度解读等效电路拟合。", "只用低阻抗判断催化剂最好。"],
    recommendedPairings: ["CV", "GCD", "对称电池", "DOS/PDOS", "差分电荷"],
    dftCorrelation: ["对应 DOS/PDOS、差分电荷和界面电子结构。"]
  },
  {
    id: "gcd",
    name: "GCD",
    category: "electrochemical-kinetics",
    principle: "恒电流充放电曲线反映容量、平台、电极极化和循环稳定性。",
    analysisGuide: guide(
      ["读取充放电平台、平台间距和比容量。", "比较容量保持率和倍率性能。", "报告硫载量、电流密度、E/S 比和硫含量。"],
      ["放电平台", "充电平台", "平台间距", "容量保持率"],
      ["与 CV、EIS、Li2S 成核和循环后形貌对照。"],
      ["性能提升不能单独证明材料机制。", "测试参数必须透明。"]
    ),
    visualization: viz("充放电平台和极化差异", "spectrum-curve", ["Capacity", "Voltage", "plateau", "polarization"], ["平台间距", "容量", "倍率变化"], ["支持容量、极化和循环稳定性比较。"], ["不能单独支持催化机制或活性位点归因。"]),
    proves: ["充放电平台", "比容量", "极化", "循环稳定性"],
    cannotProve: ["不能单独证明材料机制", "不能区分导电、孔结构、吸附和催化贡献"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["更小的平台间距和更高容量保持可支持电化学性能改善。"],
    commonPitfalls: ["不报告硫载量、E/S 比和电流密度。", "用循环性能直接证明机制成立。"],
    recommendedPairings: ["CV", "EIS", "Li2S 成核", "循环后 XPS/Raman"],
    dftCorrelation: ["可与自由能、NEB 和界面电子结构共同解释极化和容量趋势。"]
  },
  {
    id: "gitt",
    name: "GITT",
    category: "electrochemical-kinetics",
    principle: "通过间歇恒流脉冲和静置弛豫分析动态极化与 Li+ 扩散相关信息。",
    analysisGuide: guide(
      ["读取脉冲电位响应和静置弛豫幅度。", "比较不同 SOC 区间扩散相关趋势。", "确认扩散系数计算假设是否适用。"],
      ["脉冲响应", "弛豫幅度", "动态极化", "扩散趋势"],
      ["与 EIS、CV 和倍率性能对照。"],
      ["计算扩散系数依赖模型假设。", "不能直接等同于催化活性。"]
    ),
    visualization: viz("GITT 脉冲-弛豫电位曲线", "spectrum-curve", ["Time", "Voltage", "pulse", "relaxation"], ["弛豫幅度", "极化变化", "SOC 区间差异"], ["支持 Li+ 扩散相关趋势和动态极化比较。"], ["不能单独支持催化活性或具体反应位点。"]),
    proves: ["电位响应", "Li+ 扩散相关信息", "动态极化"],
    cannotProve: ["不能直接等同于催化活性", "扩散系数依赖模型假设"],
    suitableSystems: ["全部体系"],
    typicalInterpretation: ["更小的极化和更平稳的弛豫可辅助支持动力学改善。"],
    commonPitfalls: ["把 GITT 扩散系数当作唯一动力学证据。", "忽略多相反应和模型假设限制。"],
    recommendedPairings: ["CV", "EIS", "GCD", "DFT 扩散/界面分析"],
    dftCorrelation: ["可与界面电荷分布、迁移路径和 DOS 趋势辅助对照。"]
  }
];

export const systemEvidenceChains: SystemEvidenceChain[] = [
  {
    id: "single-atom",
    systemName: "单原子催化剂",
    keyQuestions: ["金属是否以单原子形式存在", "是否存在金属纳米颗粒、团簇或金属氧化物杂相", "金属单原子的配位环境", "金属价态和电子结构", "单原子位点是否参与 LiPS 吸附和转化"],
    recommendedMethods: ["XRD", "AC-HAADF-STEM", "XANES", "EXAFS / WT-EXAFS", "XPS", "ICP", "DFT"],
    evidenceChain: ["XRD 辅助排除明显晶态杂相", "HAADF-STEM 多区域观察孤立亮点", "XANES/EXAFS 判断价态与 M-N/M-S/M-O 配位", "XPS/ICP 分析表面价态与负载量", "LiPS 实验和 DFT 共同解释吸附与转化"],
    methodRoles: [
      { method: "XRD", role: "辅助排除晶态金属颗粒或金属化合物杂相。" },
      { method: "AC-HAADF-STEM", role: "观察孤立高 Z 金属亮点。" },
      { method: "XANES", role: "判断金属价态和电子结构。" },
      { method: "EXAFS / WT-EXAFS", role: "确认 M-N、M-S 或 M-O 配位，排除明显 M-M 配位。" },
      { method: "XPS", role: "分析表面价态和 N 配位类型。" },
      { method: "ICP", role: "定量金属负载量。" },
      { method: "DFT", role: "构建 M-N4/C、M-N3/C 等模型解释 LiPS 吸附和转化。" }
    ],
    commonPitfalls: ["XRD 无金属峰不能单独证明单原子。", "HAADF-STEM 中几个孤立亮点不能代表整个样品。", "EXAFS 拟合需要合理路径和误差分析。", "单原子位点存在不等于一定具有催化作用。"],
    dftCorrelation: ["EXAFS 配位对应 M-N4/C 模型。", "XPS 结合能偏移对应 Bader / 差分电荷。", "LiPS 吸附实验对应吸附能。", "对称电池 / Li2S 成核对应自由能 / NEB。"]
  },
  {
    id: "dual-atom",
    systemName: "双原子催化剂",
    keyQuestions: ["是否存在相邻双金属位点", "是同核还是异核双原子", "是否存在 M1-M2 相互作用", "双金属是否产生协同作用", "是否排除金属团簇或纳米颗粒"],
    recommendedMethods: ["AC-HAADF-STEM 多区域统计", "EXAFS", "WT-EXAFS", "XANES", "XPS", "STEM-EDS/EELS", "ICP", "DFT"],
    evidenceChain: ["多区域 HAADF-STEM 观察相邻亮点", "EXAFS/WT-EXAFS 寻找 M1-M2 或不同配位路径", "XANES/XPS 判断双金属电子结构变化", "EDS/EELS/ICP 确认组成与分布", "DFT 比较单金属、双金属和物理混合模型"],
    methodRoles: [
      { method: "AC-HAADF-STEM", role: "提供相邻金属亮点的局部图像和统计。" },
      { method: "EXAFS / WT-EXAFS", role: "辅助判断 M1-M2 相互作用和轻元素配位。" },
      { method: "STEM-EDS/EELS", role: "区分同核/异核元素分布。" },
      { method: "DFT", role: "比较协同位点与单一位点的吸附能、自由能和电荷分布。" }
    ],
    commonPitfalls: ["两种金属元素共存不等于双原子催化剂。", "双金属掺杂不等于相邻双金属位点。", "需要证明协同作用而不是简单叠加。"],
    dftCorrelation: ["M1-M2 距离与 EXAFS 拟合对应。", "双金属协同可用差分电荷、DOS/PDOS 和反应自由能比较。"]
  },
  {
    id: "heterostructure",
    systemName: "异质结催化剂",
    keyQuestions: ["是否形成两相共存", "是否形成紧密异质界面", "是否存在界面电子转移", "是否形成内建电场或功函数差异", "LiPS 是否优先在界面处吸附和转化"],
    recommendedMethods: ["XRD", "HRTEM", "SAED", "STEM-EDS mapping", "XPS", "Raman", "UPS/Kelvin probe", "DFT 界面模型"],
    evidenceChain: ["XRD 支持两相存在", "HRTEM/SAED 展示晶面与界面", "EDS mapping 展示元素相邻分布", "XPS/Raman/UPS 支持界面电子结构变化", "DFT 构建界面模型解释 LiPS 作用"],
    methodRoles: [
      { method: "XRD", role: "确认两相晶体信号。" },
      { method: "HRTEM / SAED", role: "观察紧密异质界面和晶面关系。" },
      { method: "XPS / UPS", role: "辅助判断界面电子转移和功函数差异。" },
      { method: "DFT", role: "构建界面吸附、差分电荷和内建电场模型。" }
    ],
    commonPitfalls: ["两种物质物理混合不等于异质结。", "XRD 出现两相不等于形成界面。", "XPS 结合能偏移需要结合其他证据解释。"],
    dftCorrelation: ["界面电荷重排对应 XPS/UPS/Kelvin probe。", "界面吸附能和自由能路径对应 LiPS 转化实验。"]
  },
  {
    id: "metal-oxide",
    systemName: "金属氧化物",
    keyQuestions: ["氧化物晶相", "金属价态", "是否存在氧空位", "氧空位是否增强 LiPS 吸附或催化转化", "导电性不足是否得到改善"],
    recommendedMethods: ["XRD", "XPS", "EPR", "Raman", "HRTEM", "XAS", "UV-vis Li2S6 吸附", "电化学动力学", "DFT"],
    evidenceChain: ["XRD/HRTEM 判断晶相与晶面", "XPS/XANES 判断金属价态", "EPR/Raman/XPS/XAS 共同支持氧空位", "LiPS 吸附与 Li2S 成核验证反应行为", "DFT 缺陷模型解释吸附和能垒"],
    methodRoles: [
      { method: "EPR", role: "辅助识别未成对电子和氧空位相关信号。" },
      { method: "XPS O 1s", role: "分析表面氧物种，但需谨慎解峰。" },
      { method: "DFT", role: "比较有/无氧空位模型的吸附能、电子结构和反应能垒。" }
    ],
    commonPitfalls: ["不能只凭 XPS O 1s 中某个峰证明氧空位。", "氧空位浓度越高不一定越好。", "强吸附不等于快速转化。", "氧化物导电性不足需要单独验证。"],
    dftCorrelation: ["氧空位形成能、缺陷态 DOS、LiPS 吸附能和差分电荷与 EPR/XPS 互相支撑。"]
  },
  {
    id: "metal-sulfide",
    systemName: "金属硫化物",
    keyQuestions: ["金属硫化物晶相", "金属价态和 S 2p 状态", "是否存在硫空位或边缘活性位点", "晶格硫与电化学 LiPS 硫如何区分", "是否促进 LiPS 转化和 Li2S 成核"],
    recommendedMethods: ["XRD", "XPS S 2p", "Raman", "HRTEM", "EPR", "XAS", "LiPS 吸附/扩散", "对称电池", "Li2S 成核", "DFT"],
    evidenceChain: ["XRD/HRTEM 确认硫化物晶相", "XPS/XAS 判断金属和 S 状态", "EPR/Raman 辅助分析硫空位", "LiPS 吸附、对称电池和 Li2S 成核验证反应过程", "DFT 比较边缘/空位/晶面模型"],
    methodRoles: [
      { method: "XPS S 2p", role: "区分晶格硫、多硫化物硫和氧化硫物种。" },
      { method: "Li2S 成核", role: "评价沉积动力学是否改善。" },
      { method: "DFT", role: "比较硫空位、边缘位点和完整表面对 LiPS 的作用。" }
    ],
    commonPitfalls: ["金属硫化物中的晶格硫不能直接等同于电解液中的多硫化物。", "XPS S 2p 解峰需要谨慎。", "表面硫空位需要多证据证明。", "LiPS 吸附实验不能单独证明催化。"],
    dftCorrelation: ["硫空位模型、M-S 成键、LiPS 吸附能和 Li2S 分解 NEB 可与实验转化证据对应。"]
  },
  {
    id: "metal-nitride",
    systemName: "金属氮化物",
    keyQuestions: ["氮化物晶相", "金属-N 结构", "导电性优势", "LiPS 吸附与转化能力", "表面是否氧化或重构"],
    recommendedMethods: ["XRD", "XPS N 1s", "HRTEM", "电导率/EIS", "XAS", "LiPS 吸附实验", "对称电池", "DFT"],
    evidenceChain: ["XRD/HRTEM 确认氮化物结构", "XPS N 1s/XAS 判断金属-N 和价态", "EIS/电导率评价电荷传输", "LiPS 吸附与对称电池验证转化", "DFT 比较表面吸附和重构模型"],
    methodRoles: [
      { method: "XPS N 1s", role: "分析金属-N、吡啶 N、石墨 N 等不同氮状态。" },
      { method: "EIS", role: "辅助说明界面电荷转移。" },
      { method: "DFT", role: "解释金属-N 表面对 LiPS 的吸附和电荷转移。" }
    ],
    commonPitfalls: ["导电性好不等于催化性好。", "表面氧化可能影响真实活性位点。", "需要证明 LiPS 转化而不是只证明电荷传输。"],
    dftCorrelation: ["DOS/PDOS、表面氧化模型和 LiPS 吸附能可与 XPS/EIS/吸附实验对应。"]
  },
  {
    id: "phosphide-carbide",
    systemName: "磷化物/碳化物",
    keyQuestions: ["磷化物/碳化物晶相", "金属-P 或金属-C 化学状态", "导电性和催化作用", "表面是否氧化或重构", "是否促进 LiPS 转化"],
    recommendedMethods: ["XRD", "XPS P 2p / C 1s", "HRTEM", "Raman", "XAS", "电导率/EIS", "Li2S 成核", "DFT"],
    evidenceChain: ["XRD/HRTEM 确认晶相", "XPS/XAS 判断化学状态", "Raman 区分碳载体和缺陷贡献", "EIS 与 Li2S 成核验证动力学", "DFT 比较金属-P/C 位点和表面氧化模型"],
    methodRoles: [
      { method: "XPS P 2p / C 1s", role: "判断金属-P、氧化 P、金属-C 和碳载体状态。" },
      { method: "Li2S 成核", role: "辅助证明沉积动力学改善。" },
      { method: "DFT", role: "解释金属-P/C 键合、表面重构和 LiPS 转化能垒。" }
    ],
    commonPitfalls: ["不能只强调导电性。", "需要区分碳载体贡献和金属磷化物/碳化物贡献。", "表面氧化或重构需考虑。"],
    dftCorrelation: ["表面吸附、氧化重构、DOS/PDOS 和 NEB 与 XPS/EIS/Li2S 成核对应。"]
  },
  {
    id: "mxene",
    systemName: "MXene",
    keyQuestions: ["MXene 是否成功剥离", "层间距是否变化", "表面终止基种类", "是否发生堆叠或氧化", "终止基如何影响 LiPS 吸附"],
    recommendedMethods: ["XRD", "SEM/TEM", "AFM", "XPS", "Raman", "BET", "Zeta potential", "LiPS 吸附实验", "EIS", "DFT"],
    evidenceChain: ["XRD/AFM/SEM 确认剥离与层间距", "XPS/Raman 判断终止基和氧化状态", "BET/Zeta 评价孔结构和表面性质", "LiPS 吸附/EIS 验证功能行为", "DFT 用混合终止基或代表性终止基谨慎建模"],
    methodRoles: [
      { method: "XRD", role: "分析 (002) 峰和层间距变化。" },
      { method: "XPS", role: "识别 -O、-OH、-F 等终止基和氧化物。" },
      { method: "DFT", role: "比较不同终止基对 LiPS 吸附和电荷分布的影响。" }
    ],
    commonPitfalls: ["真实 MXene 通常是混合终止基，不能用纯 -O/-OH/-F 模型直接代表真实样品。", "XRD 层间距变化不等于一定有高效 LiPS 吸附。", "片层导电性好不等于催化活性强。"],
    dftCorrelation: ["终止基模型、层间插层和表面吸附能与 XPS/XRD/LiPS 吸附互相支撑。"]
  },
  {
    id: "defect-carbon",
    systemName: "缺陷碳与杂原子掺杂碳",
    keyQuestions: ["碳结构和孔结构", "缺陷程度", "掺杂元素类型和含量", "掺杂位点与 LiPS 相互作用", "是否具有真实催化作用"],
    recommendedMethods: ["SEM/TEM", "Raman", "XPS", "BET", "XRD", "EPR", "元素分析", "TGA", "UV-vis LiPS 吸附", "电化学动力学", "DFT"],
    evidenceChain: ["SEM/TEM/BET 描述形貌和孔结构", "Raman/EPR/XPS 共同判断缺陷和掺杂状态", "元素分析/TGA 定量组成和硫含量", "吸附与电化学验证 LiPS 行为", "DFT 比较不同 N/O/S/P 掺杂和缺陷模型"],
    methodRoles: [
      { method: "Raman", role: "辅助判断碳缺陷和石墨化程度。" },
      { method: "XPS", role: "区分吡啶 N、吡咯 N、石墨 N、氧化 N、M-N 配位等。" },
      { method: "DFT", role: "比较掺杂位点对 LiPS 吸附和电荷分布的影响。" }
    ],
    commonPitfalls: ["高比表面积不能单独解释所有性能提升。", "D/G 比升高不等于一定催化活性增强。", "杂原子掺杂需要区分不同类型。", "性能提升可能来自导电、孔结构、限域和弱吸附多种因素。"],
    dftCorrelation: ["不同缺陷/掺杂模型的吸附能、Bader 电荷和 DOS 可与 Raman/XPS/EPR 对应。"]
  },
  {
    id: "high-entropy",
    systemName: "多组分/高熵体系",
    keyQuestions: ["是否为单相还是多相", "多元素是否均匀分布", "元素价态和局域配位", "是否存在协同作用", "活性来源是否可以合理归因"],
    recommendedMethods: ["XRD", "STEM-EDS mapping", "XPS", "ICP", "XAS", "HRTEM", "Raman/EPR", "电化学动力学", "DFT 代表性位点模型"],
    evidenceChain: ["XRD/HRTEM 判断单相或多相", "EDS/ICP 确认多元素分布和含量", "XPS/XAS 判断价态与局域配位", "电化学和反应实验验证功能", "DFT 选取代表性位点并声明模型简化"],
    methodRoles: [
      { method: "STEM-EDS mapping", role: "辅助展示多元素空间分布。" },
      { method: "XAS", role: "分析目标元素局域配位和价态。" },
      { method: "DFT", role: "用代表性局部位点解释趋势，而不是复现全部复杂结构。" }
    ],
    commonPitfalls: ["元素越多不等于性能越好。", "不能只用 EDS mapping 证明高熵结构。", "多组分活性来源需要谨慎归因。", "DFT 模型通常只能代表局部位点。"],
    dftCorrelation: ["代表性局部模型的吸附能、电子结构和自由能趋势可与多证据实验趋势对应。"]
  }
];

export const evidenceLayers: EvidenceLayer[] = [
  { id: "structure", name: "材料结构证据", methods: ["XRD", "SEM", "TEM", "HRTEM", "SAED", "BET"], purpose: "证明材料形貌、晶相、孔结构和基本组成。", cannotConclude: ["不能证明具体活性位点一定参与反应。", "不能单独证明电子转移或催化机制。"], cooperation: ["为活性位点证据提供结构背景。", "为 DFT 晶面或界面模型提供依据。"] },
  { id: "active-site", name: "活性位点证据", methods: ["AC-HAADF-STEM", "XAS", "EXAFS", "WT-EXAFS", "XPS", "EPR", "Raman"], purpose: "证明单原子、双原子、缺陷、氧空位、硫空位、终止基或界面位点。", cannotConclude: ["位点存在不等于一定是反应活性来源。"], cooperation: ["需要 LiPS 作用证据和电化学动力学证据验证功能。"] },
  { id: "lips", name: "LiPS 作用证据", methods: ["UV-vis 吸附", "H 型扩散池", "循环后 XPS", "Raman", "原位 Raman", "对称电池"], purpose: "证明 LiPS 吸附、扩散抑制和转化增强。", cannotConclude: ["吸附不等于快速转化。", "颜色变化不能单独证明催化。"], cooperation: ["与 DFT 吸附能、差分电荷和自由能路径对应。"] },
  { id: "kinetics", name: "电化学动力学证据", methods: ["CV", "EIS", "GCD", "Li2S 成核", "Tafel", "GITT", "倍率性能", "长循环"], purpose: "证明转化动力学改善、极化降低和循环稳定性提升。", cannotConclude: ["性能提升不能直接证明某个机制。"], cooperation: ["需要结构、位点和反应过程证据共同归因。"] },
  { id: "dft", name: "理论机制证据", methods: ["DFT 吸附能", "Bader 电荷", "差分电荷", "DOS/PDOS", "COHP", "自由能", "NEB"], purpose: "解释吸附、电子转移、成键作用和反应能垒变化。", cannotConclude: ["DFT 是简化模型，不能替代实验表征。"], cooperation: ["用实验约束模型，用理论解释趋势，二者不一致时需要分析差异。"] }
];

export const lipsAdsorptionDiffusionExperiments = [
  {
    name: "UV-vis Li2S6 / Li2S4 吸附实验",
    purpose: "直观比较不同材料对 LiPS 溶液的吸附能力。",
    interpretation: ["溶液颜色变浅可能说明 LiPS 浓度降低。", "UV-vis 特征峰强度下降可作为定量或半定量证据。", "需要空白对照和相同质量材料对照。"],
    cannotConclude: ["不能单独证明催化转化。", "不能单独证明吸附位点。", "不能排除沉淀或材料本身颜色干扰。"],
    dft: ["LiPS 吸附能", "差分电荷", "Bader 电荷"]
  },
  {
    name: "H 型扩散池实验",
    purpose: "比较 LiPS 透过隔膜或功能层的扩散速率。",
    interpretation: ["接收侧颜色变浅或吸收峰增长变慢，说明扩散被减弱。", "可比较普通隔膜和功能化隔膜/中间层。"],
    cannotConclude: ["不能直接说明电池中完全无穿梭。", "不能直接证明催化转化。", "扩散池条件与真实电池不同。"],
    dft: ["LiPS 吸附能", "界面静电势", "表面电荷分布"]
  },
  {
    name: "吸附后 XPS / Raman / FTIR",
    purpose: "分析材料与 LiPS 接触后表面化学状态变化。",
    interpretation: ["S 2p、Li 1s、金属峰、N/O/P/F 峰位变化可辅助说明相互作用。", "Raman 可观察多硫化物相关振动变化。"],
    cannotConclude: ["峰位变化需要结合对照样品。", "表面吸附不等于快速转化。", "需与 DFT 吸附能、电荷转移分析结合。"],
    dft: ["差分电荷", "Bader 电荷", "吸附构型", "振动模式"]
  }
];

export const li2sNucleationExperiments = [
  {
    name: "Li2S 成核测试",
    proves: ["催化剂对 Li2S 沉积动力学的影响", "成核过电位", "成核峰电流", "沉积容量"],
    interpretation: ["更早出现成核峰、沉积容量更高、成核过电位更低，通常支持催化剂促进 Li2S 沉积。"],
    rigorousNotes: ["需要结合相同硫浓度、电解液条件、催化剂负载和对照样品分析。"]
  },
  {
    name: "Li2S 沉积形貌观察",
    methods: ["SEM", "TEM", "非原位表征"],
    proves: ["Li2S 沉积是否均匀", "是否形成大颗粒或覆盖活性位点", "催化剂表面沉积行为"],
    interpretation: ["更均匀的沉积可辅助支持沉积过程更可控。"],
    rigorousNotes: ["非原位转移和洗涤可能改变沉积物形貌。"]
  },
  {
    name: "充电分解分析",
    methods: ["CV 氧化峰", "GCD 充电平台", "NEB/自由能计算", "原位/非原位 Raman 或 XPS"],
    proves: ["Li2S 分解动力学", "充电极化变化", "催化剂是否促进 Li2S 氧化"],
    interpretation: ["更低充电极化和更明显氧化响应可支持 Li2S 分解更容易。"],
    rigorousNotes: ["需与结构稳定性和副反应分析共同判断。"]
  }
];

export const inSituOperandoMethods = [
  { method: "原位 Raman", canSee: "多硫化物中间体和硫物种变化。", suitableQuestion: "追踪反应过程中不同硫物种的演变趋势。", limitation: "信号可能受荧光、激光功率、电解液和窗口材料影响。", dft: "反应路径、自由能图、中间体稳定性。" },
  { method: "原位 XRD", canSee: "晶态 S8、Li2S 或其他晶相变化。", suitableQuestion: "观察晶态相变和沉积/消失过程。", limitation: "对无定形、多硫化物溶液和低含量物种不敏感。", dft: "晶相稳定性和晶面模型。" },
  { method: "原位/工况 XAS", canSee: "催化剂金属中心价态和配位环境变化。", suitableQuestion: "研究单原子、双原子、金属氧化物、硫化物在反应中的电子结构变化。", limitation: "实验复杂，数据解析需要模型支持。", dft: "价态、电荷分布和局域配位模型。" },
  { method: "原位 UV-vis", canSee: "电解液中 LiPS 浓度变化。", suitableQuestion: "观察 LiPS 溶解和消耗趋势。", limitation: "不能单独确定复杂物种组成。", dft: "LiPS 稳定性和吸附能趋势。" },
  { method: "原位/非原位 XPS", canSee: "循环后电极表面硫物种、金属价态和界面副产物。", suitableQuestion: "分析表面反应产物和价态演变。", limitation: "非原位样品容易受空气暴露、洗涤过程和转移条件影响。", dft: "表面吸附、分解产物和电荷转移。" }
];

export const electrochemicalValidationMethods = [
  { method: "CV", focus: ["还原峰和氧化峰位置", "峰电位差", "峰电流", "扫描速率依赖", "反应可逆性"], rigorousExplanation: "峰间距减小和峰电流增大通常支持极化降低和反应动力学改善，但不能单独证明具体催化机制。" },
  { method: "EIS", focus: ["Rs", "Rct", "Warburg 扩散", "循环前后阻抗变化"], rigorousExplanation: "Rct 降低通常说明界面电荷转移更容易，但等效电路选择会影响拟合结果，不能过度解读。" },
  { method: "对称电池", focus: ["LiPS 电解液中的氧化还原峰", "峰电流", "峰间距", "不同催化剂对比"], rigorousExplanation: "对称电池可辅助评价 LiPS 转化动力学，但测试条件与完整电池不同。" },
  { method: "Li2S 成核", focus: ["成核时间", "成核峰电流", "沉积容量", "沉积过电位"], rigorousExplanation: "可辅助证明 Li2S 沉积动力学改善，需要统一硫浓度、电解液和催化剂负载。" },
  { method: "Tafel", focus: ["反应动力学斜率", "不同催化剂对比"], rigorousExplanation: "Tafel 分析在复杂多步反应体系中需要谨慎解释。" },
  { method: "GITT", focus: ["电位弛豫", "Li+ 扩散相关信息", "动态极化"], rigorousExplanation: "GITT 得出的扩散系数依赖模型假设，不能单独作为催化机制证据。" }
];

export const experimentDFTCorrelations: ExperimentDFTCorrelation[] = [
  { id: "xps-shift", experimentalSignal: "XPS 结合能偏移", experimentalMeaning: "表面电子环境变化。", dftAnalysis: ["Bader 电荷", "差分电荷", "DOS"], rigorousNote: "XPS 不能直接给出 Bader 电荷数值。" },
  { id: "exafs", experimentalSignal: "EXAFS 配位数和键长", experimentalMeaning: "金属局域配位结构。", dftAnalysis: ["M-N4/C", "M-N3/C", "M1-M2-N6/C 等模型"], rigorousNote: "EXAFS 拟合模型需要合理，不能过拟合。" },
  { id: "haadf", experimentalSignal: "HAADF-STEM 孤立亮点", experimentalMeaning: "高 Z 金属原子可能高度分散。", dftAnalysis: ["单原子或双原子活性位点模型"], rigorousNote: "需要与 XAS 结合排除团簇。" },
  { id: "uv-vis", experimentalSignal: "UV-vis LiPS 吸附", experimentalMeaning: "材料可能吸附 LiPS。", dftAnalysis: ["LiPS 吸附能", "差分电荷"], rigorousNote: "不能单独证明催化转化。" },
  { id: "sym-cv", experimentalSignal: "对称电池 CV", experimentalMeaning: "LiPS 氧化还原动力学。", dftAnalysis: ["自由能路径", "NEB", "DOS"], rigorousNote: "需结合完整电池和 Li2S 成核测试。" },
  { id: "li2s", experimentalSignal: "Li2S 成核测试", experimentalMeaning: "Li2S 沉积动力学。", dftAnalysis: ["Li2S 吸附能", "Li2S 成核自由能", "NEB"], rigorousNote: "需结合沉积形貌和控制实验。" },
  { id: "raman", experimentalSignal: "Raman / 原位 Raman", experimentalMeaning: "硫物种和 LiPS 中间体变化。", dftAnalysis: ["反应路径", "自由能图", "中间体稳定性"], rigorousNote: "谱峰归属需要标准谱、计算模拟和对照样品。" },
  { id: "eis", experimentalSignal: "EIS", experimentalMeaning: "界面电荷转移和扩散阻抗。", dftAnalysis: ["DOS/PDOS", "差分电荷", "界面电子结构"], rigorousNote: "EIS 等效电路选择会影响结论。" }
];

export const characterizationPitfalls: PitfallItem[] = [
  { id: "xrd-single-atom", wrongConclusion: "XRD 无金属峰就说是单原子。", rigorousStatement: "XRD 无金属峰只能说明未检测到明显晶态金属颗粒，不能单独证明单原子结构。", relatedMethods: ["单原子", "XRD"] },
  { id: "haadf-one-image", wrongConclusion: "HAADF-STEM 一张图就证明单原子。", rigorousStatement: "HAADF-STEM 是局部证据，需要多区域统计，并结合 XAS、XPS、ICP 和 XRD。", relatedMethods: ["单原子", "HAADF-STEM"] },
  { id: "xps-charge", wrongConclusion: "XPS 峰位偏移就定量说明电子转移。", rigorousStatement: "XPS 峰位偏移反映电子环境变化，定量电荷转移需要结合 Bader 电荷等计算分析。", relatedMethods: ["XPS", "DFT"] },
  { id: "o-vacancy", wrongConclusion: "O 1s 缺陷氧峰就证明氧空位。", rigorousStatement: "氧空位需要结合 EPR、Raman、XAS 和 DFT 缺陷模型。", relatedMethods: ["缺陷", "XPS", "EPR"] },
  { id: "uvvis-catalysis", wrongConclusion: "UV-vis 颜色变浅就证明催化。", rigorousStatement: "UV-vis 颜色变浅主要支持吸附或浓度降低，不能单独证明催化转化。", relatedMethods: ["LiPS", "UV-vis"] },
  { id: "eis-best", wrongConclusion: "EIS 阻抗低就说明催化剂最好。", rigorousStatement: "阻抗降低说明界面电荷转移改善，但催化性能还需要 CV、Li2S 成核、自由能和 NEB 等证据。", relatedMethods: ["电化学", "EIS"] },
  { id: "cycle-mechanism", wrongConclusion: "循环性能好就证明机制成立。", rigorousStatement: "性能提升可能来自导电性、孔结构、硫分布、吸附、催化或电解液条件，不能直接证明某一机制。", relatedMethods: ["电化学"] },
  { id: "bet-adsorption", wrongConclusion: "BET 高就说明吸附强。", rigorousStatement: "BET 反映物理比表面积和孔结构，不直接说明化学吸附强度。", relatedMethods: ["BET", "LiPS"] },
  { id: "insitu-peak", wrongConclusion: "原位表征看到峰变化就直接确定物种。", rigorousStatement: "原位谱峰需要结合标准谱、计算模拟、对照样品和多技术验证。", relatedMethods: ["原位", "Raman", "XRD"] },
  { id: "dft-selective", wrongConclusion: "DFT 和实验不一致时只保留有利结论。", rigorousStatement: "DFT 模型是简化近似，若与实验不一致，需要分析模型、参数和实验条件差异。", relatedMethods: ["DFT"] }
];

export const rigorousLanguageRules = {
  preferred: ["可能表明", "辅助证明", "支持该推断", "需要结合其他证据", "不能单独作为机制证明", "与 DFT 结果相互支撑"],
  avoid: ["直接证明", "完全说明", "充分证明", "唯一原因", "一定表明", "单独证明催化机制"],
  checklist: [
    "是否把结构证明、电子结构证明、反应过程证明和性能验证分开描述？",
    "是否为每个机制结论提供至少两类互补证据？",
    "是否说明每种表征不能证明什么？",
    "是否把 DFT 作为解释和支撑，而不是替代实验？",
    "是否报告关键实验条件，如硫载量、E/S 比、LiPS 浓度和催化剂负载？",
    "是否避免把局部图像、单一峰位或单一性能指标绝对化？"
  ]
};
