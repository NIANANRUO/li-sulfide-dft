export type ResearchGapCategory =
  | "practical-parameters"
  | "high-loading-lean-electrolyte"
  | "lithium-anode-coupling"
  | "catalyst-passivation"
  | "operando-mechanism"
  | "dft-multiscale"
  | "standardization-open-data"
  | "solid-state-lis"
  | "research-proposal";

export interface ResearchGapItem {
  id: string;
  title: string;
  category: ResearchGapCategory;
  importanceLevel: "核心空白" | "重要空白" | "新兴方向" | "工程转化空白";
  currentStatus: string;
  unresolvedProblem: string;
  whyItMatters: string;
  keyQuestions: string[];
  recommendedExperiments: string[];
  recommendedDFT: string[];
  recommendedElectrochemistry: string[];
  possibleResearchDirections: string[];
  cautions: string[];
  relatedModules: string[];
}

export interface ResearchDirectionTemplate {
  id: string;
  title: string;
  targetGap: string;
  scientificQuestion: string;
  hypothesis: string;
  materialStrategy: string[];
  characterizationPlan: string[];
  electrochemicalPlan: string[];
  dftPlan: string[];
  expectedInnovation: string[];
  risks: string[];
  fallbackStrategies: string[];
}

export interface GapPitfall {
  id: string;
  wrongStatement: string;
  rigorousStatement: string;
  explanation: string;
}

export const schematicNotice = "示意图 / 研究框架图，仅用于教学和科研规划，不代表单一实验结果。";

export const researchGapTabs = [
  {
    id: "overview",
    label: "空白总览",
    title: "当前锂硫电池研究还有哪些真正没有解决的问题？",
    description:
      "锂硫电池研究的核心空白已从单纯提高比容量转向实际高能量密度条件下的材料、机制、负极、电解液、评价标准和多尺度理解。"
  },
  {
    id: "practical-parameters",
    label: "实用化参数断层",
    title: "为什么很多高性能结果难以代表实际高能量密度？",
    description:
      "低硫载量、过量电解液和过量锂负极条件下的高容量不能直接代表实际电芯性能。"
  },
  {
    id: "high-loading-lean-electrolyte",
    label: "高载量与贫电解液",
    title: "为什么高硫载量和贫电解液是最关键的实用化空白？",
    description:
      "高硫载量和低 E/S 比会同时放大传质、导电、极化、LiPS 转化和 Li2S 沉积问题。"
  },
  {
    id: "lithium-anode-coupling",
    label: "锂负极耦合",
    title: "为什么硫正极研究不能忽略锂金属负极？",
    description:
      "LiPS 穿梭和锂负极副反应相互耦合，正极催化和负极保护需要协同设计。"
  },
  {
    id: "catalyst-passivation",
    label: "催化剂钝化",
    title: "为什么“吸附越强越好”可能是错误方向？",
    description:
      "过强吸附可能导致活性位点覆盖、Li2S 沉积钝化或不可逆反应，理想催化剂需要适度吸附和快速转化。"
  },
  {
    id: "operando-mechanism",
    label: "原位机制",
    title: "为什么需要更多原位/工况表征？",
    description:
      "非原位表征难以捕捉 LiPS、Li2S、催化剂价态和锂负极界面的动态演化。"
  },
  {
    id: "dft-multiscale",
    label: "DFT 与多尺度",
    title: "为什么常规 DFT 难以完全解释真实锂硫电池？",
    description:
      "常规 DFT 模型多为静态理想模型，未来需要结合溶剂化、分子动力学、多尺度传质和机器学习。"
  },
  {
    id: "standardization-open-data",
    label: "标准化与数据",
    title: "为什么锂硫电池需要更统一的性能评价标准？",
    description:
      "不同文献测试条件差异巨大，缺少统一报告规范、benchmark 和开放数据集。"
  },
  {
    id: "solid-state-lis",
    label: "固态/准固态",
    title: "固态和准固态锂硫电池还有哪些关键空白？",
    description:
      "固态 Li-S 可提升安全性，但仍面临界面阻抗、离子传导、固-固接触和反应路径不清等问题。"
  },
  {
    id: "direction-generator",
    label: "方向生成器",
    title: "如何把研究空白转化为具体课题？",
    description:
      "根据研究目标、材料体系和研究方法生成可执行的课题方向。"
  },
  {
    id: "proposal-template",
    label: "课题模板",
    title: "锂硫电池研究空白如何写成课题方案？",
    description:
      "将研究空白转化为研究背景、科学问题、实验方案、DFT 方案和创新点。"
  },
  {
    id: "pitfalls",
    label: "严谨性检查",
    title: "研究空白模块中哪些表述需要避免？",
    description:
      "避免空泛展望、过度外推、单一指标判断和 DFT 过度解释。"
  }
] as const;

export const researchGapItems: ResearchGapItem[] = [
  {
    id: "lab-to-practical-gap",
    title: "实验室性能与实际电芯性能断层",
    category: "practical-parameters",
    importanceLevel: "核心空白",
    currentStatus: "大量研究仍在低硫载量、过量电解液和厚锂箔条件下展示高容量和长循环。",
    unresolvedProblem: "这些温和条件下的性能无法直接代表高能量密度电芯，实际参数同时严苛化后性能常明显下降。",
    whyItMatters: "实际 Li-S 电池需要高硫载量、高硫含量、低 E/S、有限锂和高面积容量共同成立。",
    keyQuestions: ["材料在高硫载量和低 E/S 下是否仍有效？", "同一材料在温和条件和严苛条件下性能差异多大？", "如何建立更公平的性能评价标准？"],
    recommendedExperiments: ["高硫载量循环", "低 E/S 梯度测试", "有限锂全电池", "软包电池验证", "面积容量和能量密度估算"],
    recommendedDFT: ["DFT 解释局部吸附和转化机制", "多尺度模型分析厚电极传质", "数据驱动分析参数-性能关系"],
    recommendedElectrochemistry: ["GCD", "长循环", "倍率性能", "EIS", "高面积容量测试"],
    possibleResearchDirections: ["实用化参数下的催化剂有效性评价", "高硫载量/低 E/S 条件下性能衰减机制", "Li-S 性能 benchmark 数据库"],
    cautions: ["不能用低硫载量高容量直接声称高能量密度", "必须报告 E/S、硫载量、N/P 和正极硫含量"],
    relatedModules: ["电化学性能", "催化剂体系", "实验表征"]
  },
  {
    id: "high-loading-lean-electrolyte-gap",
    title: "高硫载量与贫电解液耦合空白",
    category: "high-loading-lean-electrolyte",
    importanceLevel: "核心空白",
    currentStatus: "高硫载量和低 E/S 被认为是提高实际能量密度的关键，但二者同时实现仍困难。",
    unresolvedProblem: "厚电极传质、LiPS 转化、Li2S 沉积和极化问题在贫电解液下被显著放大。",
    whyItMatters: "如果催化剂只在过量电解液下有效，其实际应用价值有限。",
    keyQuestions: ["催化剂在贫电解液下是否仍能促进 LiPS 转化？", "厚电极中 LiPS 和 Li2S 空间分布如何演化？", "孔结构、导电网络和催化位点如何协同？"],
    recommendedExperiments: ["E/S 梯度实验", "厚电极截面 SEM", "原位 Raman", "EIS 随 SOC 变化", "Li2S 沉积形貌"],
    recommendedDFT: ["LiPS 溶剂化吸附模型", "Li2S 成核模型", "DFT + MD", "多孔电极传质模型"],
    recommendedElectrochemistry: ["高载量 GCD", "贫电解液循环", "GITT", "倍率性能", "面积容量"],
    possibleResearchDirections: ["贫电解液下的双功能催化宿主", "厚电极三相界面优化", "高载量电极中的 Li2S 沉积分布调控"],
    cautions: ["不要只在低载量下证明催化效果", "高硫载量必须同时报告 E/S 和极化变化"],
    relatedModules: ["电化学性能", "DFT 计算", "实验表征"]
  },
  {
    id: "lithium-anode-coupling-gap",
    title: "硫正极与锂负极协同保护不足",
    category: "lithium-anode-coupling",
    importanceLevel: "核心空白",
    currentStatus: "许多研究主要优化硫正极宿主或催化剂，但锂负极副反应和枝晶问题仍限制全电池寿命。",
    unresolvedProblem: "LiPS 穿梭会腐蚀锂负极，锂负极不稳定又会影响库伦效率和安全性。",
    whyItMatters: "实际 Li-S 电池必须同时稳定硫正极和锂负极。",
    keyQuestions: ["正极催化剂是否减少负极硫物种沉积？", "锂负极保护层是否兼容 LiPS 环境？", "有限锂条件下正负极如何协同优化？"],
    recommendedExperiments: ["Li 对称电池", "Cu/Li 库伦效率", "有限锂全电池", "负极 XPS", "循环后锂负极 SEM", "自放电测试"],
    recommendedDFT: ["LiPS 与 Li 金属/SEI 相互作用", "Li 吸附能", "Li 扩散能垒", "保护层与 LiPS 反应倾向"],
    recommendedElectrochemistry: ["有限锂全电池", "N/P 比梯度测试", "长循环", "库伦效率"],
    possibleResearchDirections: ["正负极双向调控隔膜", "兼容 LiPS 的人工 SEI", "有限锂条件下正极催化剂评价"],
    cautions: ["不能只看正极性能忽略锂负极", "过量锂会掩盖真实负极问题"],
    relatedModules: ["关键问题", "电化学性能", "实验表征"]
  },
  {
    id: "catalyst-passivation-gap",
    title: "催化剂钝化与适度吸附标准缺失",
    category: "catalyst-passivation",
    importanceLevel: "重要空白",
    currentStatus: "多数研究强调增强 LiPS 吸附和催化转化，但长期循环中催化剂是否钝化常被忽略。",
    unresolvedProblem: "过强吸附、Li2S 覆盖或不可逆副反应可能导致活性位点失效。",
    whyItMatters: "抗钝化能力决定催化剂能否在长循环和高硫载量条件下保持有效。",
    keyQuestions: ["什么是最佳吸附强度窗口？", "Li2S 是否覆盖活性位点？", "循环后催化剂电子结构是否变化？", "如何设计可再生活性位点？"],
    recommendedExperiments: ["循环后 XPS", "原位 XAS", "Li2S 沉积形貌", "长循环前后对称电池", "原位 Raman"],
    recommendedDFT: ["吸附能", "脱附能", "Li2S 覆盖模型", "NEB", "COHP", "表面重构模型"],
    recommendedElectrochemistry: ["Li2S 成核", "对称电池循环前后对比", "长循环", "倍率恢复"],
    possibleResearchDirections: ["抗钝化单原子/双原子催化剂", "适度吸附描述符", "Li2S 覆盖下活性保持机制"],
    cautions: ["不能写吸附越强越好", "吸附实验不能单独证明催化和抗钝化"],
    relatedModules: ["催化剂体系", "DFT 计算", "实验表征"]
  },
  {
    id: "operando-mechanism-gap",
    title: "真实工况下 LiPS 与 Li2S 动态机制不足",
    category: "operando-mechanism",
    importanceLevel: "重要空白",
    currentStatus: "很多机制判断仍依赖非原位表征和间接电化学结果。",
    unresolvedProblem: "LiPS 动态演化、Li2S 沉积位置、催化剂价态变化和锂负极界面演化缺少实时证据。",
    whyItMatters: "没有动态证据，许多催化机制只能算推断而不是直接验证。",
    keyQuestions: ["充放电过程中 LiPS 如何演化？", "Li2S 在厚电极中如何沉积？", "催化剂价态是否发生动态变化？", "锂负极 SEI 如何受 LiPS 影响？"],
    recommendedExperiments: ["原位 Raman", "原位 XRD", "原位 XAS", "原位 UV-vis", "原位 EIS", "X-ray tomography", "cryo-TEM"],
    recommendedDFT: ["反应路径计算", "中间体稳定性", "AIMD", "界面重构模型"],
    recommendedElectrochemistry: ["SOC 分段测试", "不同放电深度取样", "原位电化学联用"],
    possibleResearchDirections: ["高硫载量下 Li2S 空间沉积可视化", "催化剂价态原位演化", "LiPS 穿梭和锂负极副反应实时追踪"],
    cautions: ["非原位结果可能受洗涤、空气暴露和转移影响", "原位电池结构也需要说明与真实电池的差异"],
    relatedModules: ["实验表征", "DFT 计算", "关键问题"]
  },
  {
    id: "dft-multiscale-gap",
    title: "DFT 模型与真实电池环境脱节",
    category: "dft-multiscale",
    importanceLevel: "重要空白",
    currentStatus: "常规 DFT 多使用理想表面、真空吸附、静态结构和少量 LiPS 物种。",
    unresolvedProblem: "真实电池中的溶剂化、浓度、贫电解液、界面重构、厚电极传质和动态反应难以被常规 DFT 完整描述。",
    whyItMatters: "如果模型与真实工况差异太大，计算结论可能只能解释趋势，不能直接预测实际性能。",
    keyQuestions: ["溶剂化如何改变 LiPS 吸附？", "缺陷和多晶面如何影响催化？", "如何连接原子尺度和电极尺度？", "哪些描述符真正可迁移？"],
    recommendedExperiments: ["XPS", "EXAFS", "原位 Raman", "Li2S 成核", "EIS", "标准化电化学数据"],
    recommendedDFT: ["显式/隐式溶剂模型", "AIMD", "NEB", "微观动力学", "多尺度传质模型", "机器学习描述符"],
    recommendedElectrochemistry: ["不同 E/S 和硫载量下性能对比", "高通量性能数据库", "参数敏感性测试"],
    possibleResearchDirections: ["溶剂化 LiPS 吸附模型", "DFT + ML 催化剂筛选", "多尺度厚电极模型"],
    cautions: ["不能把单一真空吸附能当作真实电池性能预测", "描述符需要实验和多体系验证"],
    relatedModules: ["DFT 计算", "实验表征", "电化学性能"]
  },
  {
    id: "standardization-open-data-gap",
    title: "性能评价标准化与开放数据不足",
    category: "standardization-open-data",
    importanceLevel: "工程转化空白",
    currentStatus: "不同论文中的硫载量、E/S 比、正极配方、锂负极厚度和容量归一化基准差异很大。",
    unresolvedProblem: "缺少统一报告模板、可复用 benchmark 和高质量负结果数据，导致材料性能难以公平比较。",
    whyItMatters: "没有标准化数据，描述符筛选、机器学习和实用化判断都容易被测试条件偏差误导。",
    keyQuestions: ["哪些参数必须强制报告？", "如何比较不同工况下的同一材料？", "如何记录失败条件和负结果？"],
    recommendedExperiments: ["统一扣式电池协议", "软包验证协议", "E/S 和载量矩阵测试", "曲线数字化与元数据整理"],
    recommendedDFT: ["描述符数据库", "高通量吸附能和能垒计算", "实验-计算数据结构化"],
    recommendedElectrochemistry: ["固定硫载量、电解液和 N/P 的对照测试", "面积容量与能量密度估算", "公开原始 GCD/CV/EIS 数据"],
    possibleResearchDirections: ["Li-S 性能数据库", "标准化报告工具", "开放 benchmark 与 ML 筛选"],
    cautions: ["不同测试条件下的容量不能直接比较", "数据库必须保留测试条件和负结果"],
    relatedModules: ["电化学性能", "实验表征", "DFT 计算"]
  },
  {
    id: "solid-state-lis-gap",
    title: "固态/准固态 Li-S 界面与机制空白",
    category: "solid-state-lis",
    importanceLevel: "新兴方向",
    currentStatus: "固态或准固态 Li-S 有望减弱液态穿梭并提升安全性，但界面和动力学问题仍突出。",
    unresolvedProblem: "固-固接触、离子传导、界面阻抗、硫正极反应路径和锂负极界面稳定性仍未形成清晰机制图。",
    whyItMatters: "固态化不能自动解决 Li-S 的转化动力学和锂负极问题，反而引入新的界面限制。",
    keyQuestions: ["固态硫正极如何建立电子-离子-活性物质三相界面？", "Li2S/LiPS-like 中间体是否存在并如何迁移？", "固态电解质与锂负极界面如何稳定？"],
    recommendedExperiments: ["EIS 界面阻抗", "固态电解质离子电导", "截面 SEM", "原位压力/阻抗测试", "固态全电池循环", "Li 对称电池"],
    recommendedDFT: ["固态电解质/硫界面模型", "Li 迁移能垒", "固-固界面粘附能", "MD 离子传输模拟"],
    recommendedElectrochemistry: ["温度依赖 EIS", "压力依赖循环", "低温固态 Li-S", "有限锂固态全电池"],
    possibleResearchDirections: ["混合离子-电子导电硫正极", "准固态凝胶电解质", "固态 Li-S 原位表征"],
    cautions: ["不能把无液态穿梭等同于机制已解决", "固态测试必须报告压力、温度和界面构型"],
    relatedModules: ["关键问题", "实验表征", "DFT 计算"]
  },
  {
    id: "carbon-host-reevaluation-gap",
    title: "高载量贫电解液下碳基宿主最优性仍需重评",
    category: "high-loading-lean-electrolyte",
    importanceLevel: "重要空白",
    currentStatus: "碳材料因导电和孔结构优势被广泛使用，但在贫电解液和厚电极条件下未必总是最佳宿主。",
    unresolvedProblem: "非极性碳对 LiPS 固定与催化转化有限，过高孔体积还可能需要更多电解液润湿，影响实际能量密度。",
    whyItMatters: "宿主设计需要在导电、孔结构、极性吸附、催化位点和非活性质量之间重新平衡。",
    keyQuestions: ["高孔体积是否增加电解液需求？", "极性位点和导电网络如何最小质量化集成？", "碳/极性催化剂复合比例是否存在最优窗口？"],
    recommendedExperiments: ["电极润湿性", "孔结构-BET", "厚电极截面导电网络观察", "低 E/S 循环", "硫含量梯度测试"],
    recommendedDFT: ["碳缺陷与极性位点 LiPS 吸附对比", "界面电荷转移", "Li2S 成核构型"],
    recommendedElectrochemistry: ["相同硫载量和 E/S 下对照", "面积容量", "GITT", "EIS"],
    possibleResearchDirections: ["低非活性质量导电-催化一体宿主", "低电解液需求孔结构设计", "碳基宿主实用化边界图谱"],
    cautions: ["高比表面积不一定意味着高实用能量密度", "必须区分导电贡献和催化贡献"],
    relatedModules: ["催化剂体系", "电化学性能", "实验表征"]
  },
  {
    id: "descriptor-ml-gap",
    title: "描述符、机器学习与开放数据可迁移性不足",
    category: "dft-multiscale",
    importanceLevel: "新兴方向",
    currentStatus: "吸附能、电荷转移、d 带中心等描述符被用于筛选催化剂，但跨体系迁移能力仍有限。",
    unresolvedProblem: "不同材料、LiPS 物种、溶剂化条件和测试参数混杂，导致模型容易学习到文献条件偏差而不是真实机制。",
    whyItMatters: "可迁移模型可加速催化剂设计，但必须建立在标准化计算和电化学元数据之上。",
    keyQuestions: ["哪些描述符能同时反映吸附、转化和抗钝化？", "如何把 DFT 数据与真实工况性能连接？", "负结果如何进入训练集？"],
    recommendedExperiments: ["统一性能测试矩阵", "开放原始曲线", "失败样品记录", "结构-性能元数据标注"],
    recommendedDFT: ["高通量吸附能", "自由能和 NEB 数据", "COHP/Bader/DOS 描述符", "主动学习工作流"],
    recommendedElectrochemistry: ["同一材料跨 E/S、载量和 N/P 条件测试", "参数敏感性分析", "外部验证集"],
    possibleResearchDirections: ["Li-S 催化剂可迁移描述符", "DFT + ML 适度吸附筛选", "开放 Li-S 数据标准"],
    cautions: ["不能用小样本相关性直接声称预测规律", "模型必须公开特征、数据来源和适用边界"],
    relatedModules: ["DFT 计算", "实验表征", "电化学性能"]
  }
];

export const practicalConditionRows = [
  ["硫载量", "< 2 mg cm⁻²", "≥ 4-5 mg cm⁻²"],
  ["E/S 比", "> 10-20 μL mg⁻¹", "更低 E/S，比容量释放更困难"],
  ["锂负极", "过量锂箔", "有限锂，需报告 N/P 或 Li 厚度"],
  ["正极硫含量", "非活性质量可偏高", "高硫含量，低非活性质量"],
  ["电极形态", "薄电极、传质短", "厚电极、高面积容量"],
  ["电芯类型", "扣式电池为主", "严苛扣式、软包或接近实际结构"],
  ["结果解读", "高比容量更容易实现", "极化、传质、锂负极问题同步放大"]
];

export const highLoadingMechanismChains = {
  loading: ["高硫载量", "厚电极", "电子/离子传输路径变长", "局部 LiPS 积累", "Li2S 沉积不均", "极化升高", "硫利用率降低"],
  lean: ["贫电解液", "LiPS 溶解和迁移空间受限", "黏度/浓度效应增强", "反应中间体转化受限", "传质阻力增加", "容量释放不足"],
  coupled: ["厚电极 + 贫电解液", "高硫利用需求", "三相界面设计更关键", "导电网络、离子通道、催化位点和孔结构协同优化"]
};

export const anodeCouplingChain = ["正极 LiPS 生成", "LiPS 穿梭", "锂负极副反应", "SEI 破裂/重构", "活性锂消耗", "死锂/枝晶", "全电池容量衰减和安全风险"];

export const operandoTechniqueRows = [
  ["原位 Raman", "LiPS 物种演化、S-S 键相关信号", "荧光干扰和电池窗口结构需说明"],
  ["原位 XRD", "S8/Li2S 晶相生成和分解", "无定形 LiPS 难捕捉"],
  ["原位 XAS", "催化剂价态和配位动态", "同步辐射资源与模型电池差异"],
  ["原位 UV-vis", "可溶 LiPS 浓度变化", "厚电极和低 E/S 下光路受限"],
  ["原位 EIS", "不同 SOC 下界面阻抗变化", "等效电路不唯一"],
  ["X-ray tomography", "厚电极空间结构与沉积", "时间分辨率和辐照影响需评估"],
  ["冷冻电镜", "保留敏感界面和沉积形貌", "取样和转移过程仍需谨慎"]
];

export const dftScalePyramid = [
  { level: "DFT", solves: "吸附、电荷转移、电子结构、局部反应路径", cannot: "厚电极传质和长时间动态循环", experiment: "XPS、XAS、Li2S 成核、GCD 极化" },
  { level: "AIMD", solves: "界面短时间动态、溶剂化结构、初始重构", cannot: "大尺度孔结构和长循环", experiment: "原位谱学、溶剂化结构线索" },
  { level: "分子动力学", solves: "离子扩散、溶剂化、聚合物/凝胶电解质传输", cannot: "精确反应断键成键", experiment: "离子电导、扩散系数、黏度" },
  { level: "介观传质", solves: "厚电极 LiPS 梯度、孔结构和浓度分布", cannot: "原子级活性位点", experiment: "截面 SEM、EIS、GITT、tomography" },
  { level: "电芯模型", solves: "E/S、N/P、面积容量和能量密度敏感性", cannot: "具体催化机理", experiment: "扣式/软包电池参数矩阵" },
  { level: "数据驱动模型", solves: "描述符筛选、趋势预测、实验规划", cannot: "超出训练域的确定性结论", experiment: "标准化数据库和外部验证集" }
];

export const requiredReportingParameters = [
  "sulfur loading",
  "sulfur content in cathode",
  "E/S ratio",
  "N/P ratio 或 Li foil thickness",
  "electrolyte composition",
  "cathode formulation",
  "current density / C-rate",
  "voltage window",
  "cell type",
  "separator/interlayer mass",
  "areal capacity",
  "cycle number",
  "activation protocol",
  "temperature",
  "capacity normalization basis"
];

export const directionTargets = ["高硫载量", "贫电解液", "锂负极保护", "催化剂抗钝化", "原位机制", "DFT 筛选", "固态 Li-S", "标准化评价"];
export const materialSystems = ["单原子", "双原子", "异质结", "金属氧化物", "金属硫化物", "MXene", "缺陷碳", "多组分/高熵", "电解液/隔膜", "锂负极保护层"];
export const researchMethods = ["实验合成", "表征", "电化学", "DFT", "机器学习", "原位表征", "多尺度模拟"];

export const researchDirectionTemplates: ResearchDirectionTemplate[] = [
  {
    id: "lean-electrolyte-catalyst",
    title: "高硫载量贫电解液条件下催化剂有效性验证",
    targetGap: "高硫载量与贫电解液",
    scientificQuestion: "催化剂在低 E/S 条件下是否仍能促进 LiPS 转化和 Li2S 成核？",
    hypothesis: "具有适度 LiPS 吸附和良好电子结构的极性催化剂可在贫电解液下维持较低极化和较高硫利用率。",
    materialStrategy: ["构建极性金属化合物/导电骨架复合结构", "调控孔结构和离子通道", "控制催化剂添加量，避免非活性质量过高"],
    characterizationPlan: ["XRD/XPS/HRTEM 确认结构", "BET 分析孔结构", "UV-vis 和 H 型扩散池分析 LiPS 作用", "Li2S 成核和沉积形貌分析"],
    electrochemicalPlan: ["高硫载量测试", "E/S 梯度测试", "面积容量", "EIS 和 GCD 极化分析", "长循环"],
    dftPlan: ["Li2S6/Li2S4/Li2S 吸附能", "Bader 和差分电荷", "DOS/PDOS", "Li2S 分解 NEB"],
    expectedInnovation: ["在实际更严苛条件下验证催化剂有效性", "建立贫电解液下吸附-转化关系"],
    risks: ["低 E/S 下容量快速下降", "厚电极传质限制掩盖催化效果"],
    fallbackStrategies: ["优化孔结构", "调节电解液组成", "降低催化剂颗粒团聚"]
  },
  {
    id: "anti-passivation-catalyst",
    title: "抗钝化单原子/双原子催化剂设计",
    targetGap: "催化剂钝化与适度吸附",
    scientificQuestion: "如何避免强吸附导致 Li2S 覆盖和活性位点钝化？",
    hypothesis: "双位点协同结构可实现一个位点吸附 LiPS、另一个位点促进转化，从而降低钝化风险。",
    materialStrategy: ["设计异核双原子 M1-M2 位点", "调控金属中心电子结构", "构建导电碳载体"],
    characterizationPlan: ["HAADF-STEM", "XAS/EXAFS", "循环后 XPS", "原位/非原位 Raman", "Li2S 沉积形貌"],
    electrochemicalPlan: ["对称电池循环前后对比", "Li2S 成核", "长循环", "倍率恢复"],
    dftPlan: ["多构型吸附能", "Li2S 覆盖模型", "COHP", "自由能路径", "NEB"],
    expectedInnovation: ["从强吸附转向抗钝化催化剂设计", "建立适度吸附与催化活性平衡"],
    risks: ["双原子结构证明困难", "活性位点可能在循环中重构"],
    fallbackStrategies: ["降低金属负载量", "引入异质结协同位点", "使用原位 XAS 监测结构变化"]
  },
  {
    id: "cathode-anode-coupling",
    title: "正极催化剂与锂负极保护协同设计",
    targetGap: "锂负极与全电池耦合",
    scientificQuestion: "正极侧 LiPS 转化促进是否能够降低锂负极副反应？",
    hypothesis: "快速转化 LiPS 并限制其迁移，可降低负极硫物种沉积，同时人工 SEI 可进一步稳定锂沉积。",
    materialStrategy: ["正极催化宿主", "功能化隔膜", "人工 SEI 或锂保护层"],
    characterizationPlan: ["负极循环后 XPS", "锂负极 SEM", "H 型扩散池", "原位光学观察", "SEI 成分分析"],
    electrochemicalPlan: ["有限锂全电池", "Li 对称电池", "Cu/Li CE", "长循环", "自放电测试"],
    dftPlan: ["LiPS 与保护层相互作用", "Li 吸附能", "Li 扩散能垒", "SEI 组分稳定性"],
    expectedInnovation: ["从单独硫正极优化转向正负极协同", "解释 LiPS 穿梭与锂负极失稳耦合机制"],
    risks: ["体系复杂，变量过多", "正负极贡献难以拆分"],
    fallbackStrategies: ["使用对照组分离正极/负极作用", "采用有限锂强化负极差异"]
  },
  {
    id: "operando-lips-tracking",
    title: "原位 Raman/XAS 追踪 LiPS 和催化剂动态演化",
    targetGap: "真实工况机理表征",
    scientificQuestion: "催化剂在充放电过程中是否真正改变 LiPS 演化路径和自身价态？",
    hypothesis: "有效催化剂应表现出可逆价态/配位变化，并与 LiPS 信号衰减和 Li2S 可逆沉积同步。",
    materialStrategy: ["选择有明确谱学指纹的金属中心", "构建透明或同步辐射兼容原位电池", "设计高载量与低 E/S 对照"],
    characterizationPlan: ["原位 Raman 监测 LiPS", "原位 XAS 监测价态/配位", "循环后 XPS/SEM 验证", "SOC 分段取样"],
    electrochemicalPlan: ["同步 GCD", "不同放电深度保持", "EIS-SOC 联用", "高载量验证"],
    dftPlan: ["不同价态催化剂吸附模型", "LiPS 谱峰辅助归属", "反应路径自由能"],
    expectedInnovation: ["将机制推断升级为动态证据链", "识别催化剂是否在循环中重构或钝化"],
    risks: ["原位电池与真实电池结构差异", "信号弱或谱峰重叠"],
    fallbackStrategies: ["采用非原位分段 + 冷冻转移", "联合 UV-vis/EIS 增强证据链"]
  },
  {
    id: "dft-ml-moderate-adsorption",
    title: "DFT + 机器学习筛选适度吸附催化剂",
    targetGap: "DFT 模型局限与开放数据",
    scientificQuestion: "哪些描述符能同时预测适度吸附、低能垒和抗 Li2S 覆盖能力？",
    hypothesis: "结合吸附能、脱附能、Li2S 覆盖稳定性、COHP 和电荷转移的复合描述符比单一吸附能更可靠。",
    materialStrategy: ["建立多体系候选库", "统一 slab/缺陷/溶剂化模型", "选择可合成候选进行实验验证"],
    characterizationPlan: ["XPS/XAS 验证位点", "LiPS 吸附和 Li2S 成核", "循环后位点保持性"],
    electrochemicalPlan: ["标准化扣式电池", "E/S 与载量矩阵", "外部验证样品"],
    dftPlan: ["高通量吸附能", "NEB 能垒", "COHP/Bader/DOS", "主动学习与不确定性评估"],
    expectedInnovation: ["从经验筛选转向可迁移描述符", "避免吸附越强越好的单指标偏差"],
    risks: ["训练数据量不足", "计算模型与实验结构不一致"],
    fallbackStrategies: ["缩小材料域", "引入实验元数据", "用外部验证集限制结论范围"]
  },
  {
    id: "solid-state-interface",
    title: "固态/准固态 Li-S 界面工程",
    targetGap: "固态/准固态 Li-S 空白",
    scientificQuestion: "固态体系中如何构建连续电子/离子/硫反应三相界面并降低界面阻抗？",
    hypothesis: "柔性准固态电解质和混合离子-电子导电正极可改善固-固接触并降低硫转化极化。",
    materialStrategy: ["复合聚合物/凝胶电解质", "混合导电硫正极", "锂负极人工界面层"],
    characterizationPlan: ["截面 SEM", "离子电导", "界面接触表征", "原位压力/阻抗"],
    electrochemicalPlan: ["压力依赖循环", "温度依赖 EIS", "固态全电池", "Li 对称电池"],
    dftPlan: ["固态电解质/硫界面粘附能", "Li 迁移能垒", "MD 离子传导", "界面稳定性"],
    expectedInnovation: ["把固态 Li-S 空白落到三相界面设计", "说明安全性与动力学之间的权衡"],
    risks: ["室温离子电导低", "界面接触随循环恶化"],
    fallbackStrategies: ["准固态凝胶过渡方案", "引入柔性界面层", "优化压力与温度窗口"]
  }
];

export const researchGapPitfalls: GapPitfall[] = [
  {
    id: "generic-future",
    wrongStatement: "未来需要开发更高性能材料。",
    rigorousStatement: "未来需要在高硫载量、低 E/S、有限锂和高面积容量条件下验证材料是否仍有效。",
    explanation: "研究空白必须落到具体测试条件和科学问题，不能停留在口号。"
  },
  {
    id: "shuttle-only",
    wrongStatement: "只要解决穿梭效应就能实现实用化。",
    rigorousStatement: "实用化还需要解决贫电解液、厚电极、锂负极失稳、催化剂钝化和工程放大问题。",
    explanation: "Li-S 电池失效是多因素耦合问题。"
  },
  {
    id: "strong-adsorption",
    wrongStatement: "吸附能越负，催化剂越好。",
    rigorousStatement: "理想催化剂需要适度吸附和快速转化，过强吸附可能导致钝化。",
    explanation: "强相互作用可能造成活性位点覆盖或中间体脱附困难。"
  },
  {
    id: "coin-cell-commercial",
    wrongStatement: "扣式电池高容量说明可以商用。",
    rigorousStatement: "需要在高硫载量、低 E/S、有限锂、软包或接近实际条件下验证。",
    explanation: "扣式电池温和条件可能高估实际应用潜力。"
  },
  {
    id: "dft-proof",
    wrongStatement: "DFT 已经证明该材料一定高性能。",
    rigorousStatement: "DFT 提供原子尺度机制解释，需要实验、原位表征和实际工况验证。",
    explanation: "常规 DFT 模型通常是简化近似。"
  },
  {
    id: "ignore-anode",
    wrongStatement: "只优化硫正极即可。",
    rigorousStatement: "LiPS 穿梭和锂负极副反应耦合，正负极需要协同优化。",
    explanation: "过量锂条件会掩盖真实负极失稳。"
  },
  {
    id: "ignore-parameters",
    wrongStatement: "不同论文容量可以直接比较。",
    rigorousStatement: "必须比较硫载量、E/S、N/P、电流密度、电压窗口和电芯类型。",
    explanation: "测试条件差异会显著改变容量、极化和循环寿命。"
  }
];

export const researchGapScientificChecks = [
  "每个研究空白必须说明为什么目前仍未解决。",
  "每个研究方向必须包含实验、DFT 和电化学验证建议。",
  "不能写空泛未来展望。",
  "不能只把穿梭效应作为唯一问题。",
  "必须强调高硫载量、低 E/S、有限锂和面积容量。",
  "必须强调吸附-催化平衡和催化剂钝化。",
  "必须强调正极和锂负极耦合。",
  "必须说明 DFT 模型局限。",
  "必须强调原位/工况表征的重要性。",
  "必须强调标准化评价和开放数据的重要性。"
];
