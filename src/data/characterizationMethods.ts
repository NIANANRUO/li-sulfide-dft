export type CharacterizationMethod = {
  id: string;
  name: string;
  category: string;
  principle: string;
  whatItProves: string;
  suitableSystems: string[];
  typicalInterpretation: string;
  commonMistakes: string;
  relationToDFT: string;
};

export const characterizationMethods: CharacterizationMethod[] = [
  {
    id: "xrd",
    name: "XRD",
    category: "结构表征",
    principle: "利用晶体对 X 射线的衍射峰位置和强度判断物相、结晶度和晶面信息。",
    whatItProves: "可确认氧化物、硫化物、氮化物和异质结的晶相，也可辅助排除金属颗粒或晶态杂相。",
    suitableSystems: ["单原子", "异质结", "金属氧化物", "金属硫化物", "金属氮化物", "MXene", "缺陷碳"],
    typicalInterpretation: "峰位对应晶相，峰宽反映晶粒尺寸或缺陷；MXene 中 (002) 峰移动可指示层间距变化。",
    commonMistakes: "单原子催化剂中无金属颗粒峰只能作为辅助证据，不能单独证明单原子结构。",
    relationToDFT: "与晶面模型、晶格常数、界面匹配和相稳定性计算对应。"
  },
  {
    id: "xps",
    name: "XPS",
    category: "元素与价态",
    principle: "通过光电子结合能分析元素组成、价态和表面电子结构。",
    whatItProves: "可观察金属价态、N 1s 配位类型、O 1s 缺陷氧、S 2p 化学状态和反应前后电子转移。",
    suitableSystems: ["全部体系"],
    typicalInterpretation: "结合能正移通常指向电子密度降低，负移指向电子富集；需结合峰型、标准样和其它证据判断。",
    commonMistakes: "不能仅凭峰位移动定量电荷转移，也不应过度拟合 O 1s 或 N 1s 峰。",
    relationToDFT: "与 Bader 电荷、差分电荷和态密度重排形成互证。"
  },
  {
    id: "xas",
    name: "XAS / XANES / EXAFS / WT-EXAFS",
    category: "元素与价态",
    principle: "利用吸收边和精细结构分析金属价态、局域配位、键长和配位数。",
    whatItProves: "XANES 判断价态和电子结构，EXAFS 确认 M-N、M-S、M-O 配位并排除 M-M 配位，WT-EXAFS 辅助区分散射路径。",
    suitableSystems: ["单原子", "双原子", "异质结", "金属氧化物"],
    typicalInterpretation: "单原子体系中缺少明显 M-M 峰且拟合出合理 M-N/M-S 配位，是关键证据之一。",
    commonMistakes: "EXAFS 拟合需要合理模型和误差评估，不能只看傅里叶变换峰位下结论。",
    relationToDFT: "DFT 优化结构提供键长、配位环境和模拟 XAS 的结构基础。"
  },
  {
    id: "stem",
    name: "AC-HAADF-STEM / TEM / HRTEM / SAED",
    category: "结构表征",
    principle: "利用电子显微成像和衍射直接观察形貌、晶格、界面和高 Z 原子亮点。",
    whatItProves: "可展示单原子亮点、双原子相邻亮点、异质界面、晶格条纹和元素空间分布。",
    suitableSystems: ["单原子", "双原子", "异质结", "硫化物", "氮化物", "MXene"],
    typicalInterpretation: "HAADF 亮点需与统计图、XAS 和 XPS 结合；HRTEM 晶格条纹可辅助确认晶面和界面。",
    commonMistakes: "单张 STEM 图不能代表整体样品，亮点也可能来自团簇投影或污染。",
    relationToDFT: "为模型中的原子位点、界面方向和晶面选择提供实验依据。"
  },
  {
    id: "raman",
    name: "Raman / 原位 Raman",
    category: "缺陷与电子结构",
    principle: "通过振动峰分析碳缺陷、晶格振动、硫物种变化和反应中间体。",
    whatItProves: "D/G 比反映碳缺陷程度，峰位变化可指示应力、缺陷和 LiPS 转化过程。",
    suitableSystems: ["缺陷碳", "MXene", "硫化物", "氧化物", "异质结"],
    typicalInterpretation: "原位 Raman 可追踪 S8、Li2Sx 和 Li2S 相关信号随电位变化的演化。",
    commonMistakes: "D/G 比不是单一缺陷类型的直接定量；峰归属需结合电位和对照样。",
    relationToDFT: "与振动模式、反应中间体稳定性和缺陷模型对应。"
  },
  {
    id: "epr",
    name: "EPR",
    category: "缺陷与电子结构",
    principle: "检测未成对电子信号，用于识别氧空位、硫空位、碳缺陷和自由基中间体。",
    whatItProves: "可支持空位缺陷或未成对电子存在，是氧空位/硫空位证据链的重要环节。",
    suitableSystems: ["金属氧化物", "金属硫化物", "缺陷碳"],
    typicalInterpretation: "g 值和信号强度变化可用于比较缺陷浓度或反应后电子态变化。",
    commonMistakes: "EPR 信号需要对照样和气氛/温度条件，不能孤立等同于某一种缺陷。",
    relationToDFT: "与缺陷态 DOS、自旋密度和电荷分布相互印证。"
  },
  {
    id: "bet",
    name: "BET / BJH / 孔径分布",
    category: "孔结构",
    principle: "通过气体吸附脱附曲线分析比表面积、孔容和孔径分布。",
    whatItProves: "说明硫负载、LiPS 扩散、电解液浸润和物理限域能力。",
    suitableSystems: ["缺陷碳", "氧化物复合物", "MXene", "硫宿主材料"],
    typicalInterpretation: "微孔有利于物理限域，介孔/大孔有利于传质和硫负载。",
    commonMistakes: "高比表面积不必然意味着高催化活性，需要与活性位点和电化学结果对应。",
    relationToDFT: "通常不直接对应单胞模型，但可解释扩散、负载和界面可接触性。"
  },
  {
    id: "electrochem",
    name: "CV / EIS / GCD / Tafel / GITT",
    category: "电化学测试",
    principle: "通过电流、电位、阻抗和时间响应评价反应可逆性、极化、阻抗和离子扩散。",
    whatItProves: "支持催化剂提升氧化还原动力学、降低极化、改善长循环和倍率性能。",
    suitableSystems: ["全部体系"],
    typicalInterpretation: "CV 峰间距减小、EIS 电荷转移阻抗降低、Tafel 斜率降低通常说明动力学改善。",
    commonMistakes: "电化学提升可能来自导电性、孔结构、硫负载或电解液条件，不能单独归因于催化活性。",
    relationToDFT: "与吸附能、自由能、NEB 能垒和 DOS 结果共同解释性能来源。"
  },
  {
    id: "reaction-validation",
    name: "UV-vis Li2S6 吸附 / 对称电池 / Li2S 成核 / 非原位 XPS",
    category: "反应验证",
    principle: "通过吸附颜色/光谱、电化学对称反应、沉积曲线和反应后化学态追踪 LiPS 转化。",
    whatItProves: "验证催化剂对 LiPS 捕获、氧化还原转化和 Li2S 沉积/分解的促进作用。",
    suitableSystems: ["全部体系"],
    typicalInterpretation: "Li2S6 UV-vis 吸收峰减弱说明吸附增强；对称电池电流更大说明反应更快。",
    commonMistakes: "颜色变浅可能受物理吸附、稀释和光散射影响，需要标准化浓度和对照。",
    relationToDFT: "直接对应吸附能、自由能路径和 NEB 能垒。"
  }
];

export const methodCategories = ["结构表征", "元素与价态", "缺陷与电子结构", "孔结构", "反应验证", "电化学测试"];
