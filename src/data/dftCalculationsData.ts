export type DFTTaskCategory =
  | "model-building"
  | "adsorption-energy"
  | "charge-analysis"
  | "electronic-structure"
  | "bonding-analysis"
  | "free-energy"
  | "neb"
  | "vasp-template"
  | "post-processing";

export interface DFTCalculationTask {
  id: string;
  name: string;
  category: DFTTaskCategory;
  purpose: string;
  inputFiles: string[];
  outputFiles: string[];
  workflow: string[];
  formulas?: string[];
  analysisGuide: string[];
  commonPitfalls: string[];
  experimentCorrelation: string[];
}

export interface CatalystModelGuide {
  id: string;
  systemName: string;
  representativeModels: string[];
  modelBuildingSteps: string[];
  keyApproximation: string[];
  recommendedTasks: string[];
  cautions: string[];
}

export interface VASPTemplate {
  id: string;
  name: string;
  purpose: string;
  incar: string;
  explanation: string[];
  cautions: string[];
}

export interface ExperimentDFTMap {
  id: string;
  experimentalObservation: string;
  dftAnalysis: string[];
  interpretation: string;
  caution: string;
}

export const dftTabs = [
  {
    id: "overview",
    label: "计算总览",
    title: "DFT 在锂硫电池催化剂研究中能做什么？",
    description:
      "DFT 可从原子尺度解释催化剂与 LiPS 的吸附、电荷转移、电子结构、成键特征和反应路径，但不能直接替代真实电池实验。"
  },
  {
    id: "workflow",
    label: "计算流程",
    title: "锂硫电池催化剂 DFT 计算的标准工作流",
    description:
      "完整计算流程包括科学问题定义、催化剂模型构建、LiPS 模型构建、吸附构型优化、静态能计算、后处理分析和实验对应。"
  },
  {
    id: "model-building",
    label: "模型构建",
    title: "不同催化剂体系如何构建 DFT 模型？",
    description:
      "不同催化剂体系需要不同模型，如 M-N4/C、M1-M2-N6/C、金属氧化物 slab、异质结界面、MXene 终止基和缺陷碳模型。"
  },
  {
    id: "lips-adsorption-model",
    label: "LiPS 吸附模型",
    title: "LiPS 吸附体系如何构建？",
    description:
      "LiPS 吸附构型需要比较多个初始构型，包括 Li 端、S 端、桥连、界面和空位吸附，不能凭直觉确定。"
  },
  {
    id: "adsorption-energy",
    label: "吸附能计算",
    title: "如何计算和解读 LiPS 吸附能？",
    description:
      "吸附能用于比较催化剂与 LiPS 的相互作用强弱，但理想催化剂需要适度吸附，而不是吸附越强越好。"
  },
  {
    id: "free-energy",
    label: "吉布斯自由能路径",
    title: "如何用自由能路径分析 LiPS 转化趋势？",
    description:
      "自由能路径可用于比较不同催化剂对 LiPS 转化热力学趋势和可能限速步骤的影响。"
  },
  {
    id: "bader",
    label: "Bader 电荷",
    title: "如何用 Bader 电荷分析界面电子转移？",
    description:
      "Bader 电荷可辅助分析吸附前后关键原子的电荷变化和界面电子转移方向。"
  },
  {
    id: "charge-density-difference",
    label: "差分电荷",
    title: "如何用差分电荷观察界面电子重排？",
    description:
      "差分电荷可视化吸附前后电子密度积累和耗尽区域，用于解释界面相互作用。"
  },
  {
    id: "dos-pdos-ldos",
    label: "DOS / PDOS / LDOS",
    title: "如何用态密度分析电子结构和催化活性？",
    description:
      "DOS、PDOS 和 LDOS 可用于分析费米能级附近电子态、轨道耦合和吸附前后电子结构变化。"
  },
  {
    id: "cohp",
    label: "COHP / ICOHP",
    title: "如何用 COHP 分析催化剂-LiPS 成键作用？",
    description:
      "COHP 和 ICOHP 可用于分析特定键的成键/反键相互作用，如 M-S、Li-O、Li-N 和 S-S 键。"
  },
  {
    id: "neb",
    label: "NEB 能垒",
    title: "如何用 NEB 计算 LiPS 转化或 Li2S 分解能垒？",
    description:
      "NEB 用于分析已知初态和终态之间的最低能量路径和动力学能垒。"
  },
  {
    id: "vasp-templates",
    label: "VASP 输入模板",
    title: "VASP 输入文件如何设置？",
    description:
      "VASP 输入模板包括结构优化、静态计算、DOS、Bader、DFT+U、slab 偶极修正和 KPOINTS 等，但所有参数都必须根据具体体系测试。"
  },
  {
    id: "post-processing",
    label: "后处理与可视化",
    title: "DFT 计算结果如何后处理和可视化？",
    description:
      "后处理工具包括 VESTA、VASPKIT、pymatgen、ASE、Bader、LOBSTER、VTST tools 和 Python 绘图。"
  },
  {
    id: "experiment-dft",
    label: "实验-DFT 对应关系",
    title: "DFT 结果如何与实验表征相互验证？",
    description:
      "DFT 结果应与 XPS、EXAFS、Raman、EIS、CV、Li2S 成核等实验结果相互支撑。"
  },
  {
    id: "pitfalls",
    label: "常见误区与严谨性检查",
    title: "DFT 计算中最容易出现哪些不严谨结论？",
    description:
      "必须避免用单一吸附能或单一电子结构结果过度解释完整催化机制。"
  }
];

export const catalystSystemOptions = [
  "单原子催化剂",
  "双原子催化剂",
  "异质结催化剂",
  "金属氧化物",
  "金属硫化物",
  "金属氮化物",
  "金属磷化物/碳化物",
  "MXene",
  "缺陷碳与杂原子掺杂碳",
  "多组分/高熵体系"
];

export const lipsSpeciesOptions = ["S8", "Li2S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"];

export const calculationTaskOptions = [
  "模型构建",
  "吸附能",
  "Bader 电荷",
  "差分电荷",
  "DOS / PDOS",
  "COHP / ICOHP",
  "吉布斯自由能",
  "NEB 能垒",
  "VASP 模板",
  "结果解读"
];

export const overviewCards = [
  ["吸附分析", "比较 LiPS 在不同催化剂表面的吸附能、吸附构型、键长和电荷转移。"],
  ["电子结构分析", "通过 DOS、PDOS、LDOS 判断导电性、活性位点轨道贡献和吸附前后电子结构变化。"],
  ["电荷转移分析", "通过 Bader 电荷和差分电荷分析界面电子重排和电子转移方向。"],
  ["成键分析", "通过 COHP / ICOHP 分析 M-S、Li-O、Li-N、S-S 等键的成键/反键相互作用。"],
  ["反应路径分析", "通过吉布斯自由能路径比较 S8 到 Li2S 或 Li2S4 到 Li2S2 到 Li2S 的热力学趋势。"],
  ["能垒分析", "通过 NEB 分析 Li2S 分解、LiPS 转化、Li 扩散或关键反应步骤的动力学能垒。"]
];

export const workflowSteps = [
  {
    name: "明确科学问题",
    input: "实验假设、对照体系",
    output: "可计算任务",
    goal: "确定比较金属中心、氧空位、异质界面或 Li2S 分解能垒。"
  },
  {
    name: "构建催化剂模型",
    input: "CIF、文献结构、表面晶面",
    output: "POSCAR",
    goal: "构建 M-N4/C、M1-M2-N6/C、slab、MXene、异质结或缺陷碳模型。"
  },
  {
    name: "构建 LiPS 模型",
    input: "S8、Li2S8、Li2S6、Li2S4、Li2S2、Li2S",
    output: "孤立分子能量",
    goal: "在大盒子中优化 LiPS，保存一致参考态。"
  },
  {
    name: "吸附初始构型",
    input: "催化剂 POSCAR + LiPS",
    output: "多组初态",
    goal: "比较 Li 端、S 端、平躺、桥连、空位和界面吸附。"
  },
  {
    name: "结构优化",
    input: "INCAR、KPOINTS、POTCAR、POSCAR",
    output: "CONTCAR、OUTCAR、OSZICAR",
    goal: "获得稳定吸附构型和关键键长。"
  },
  {
    name: "静态能计算",
    input: "优化后结构",
    output: "更精确总能、CHGCAR、WAVECAR",
    goal: "为吸附能、电荷、DOS、COHP 和自由能提供一致能量。"
  },
  {
    name: "目标任务计算",
    input: "静态结果与特定设置",
    output: "DOSCAR、ACF.dat、COHPCAR、NEB 路径",
    goal: "回答吸附、电荷、成键、热力学和动力学问题。"
  },
  {
    name: "后处理与可视化",
    input: "VASP 输出文件",
    output: "图表、等值面、路径图",
    goal: "使用 VESTA、VASPKIT、pymatgen、ASE、Bader、LOBSTER、VTST 和 Python。"
  },
  {
    name: "与实验对应",
    input: "理论趋势 + 表征结果",
    output: "机制证据链",
    goal: "与 XPS、EXAFS、Raman、EIS、CV、Li2S 成核等结果互证。"
  }
];

export const dftCalculationTasks: DFTCalculationTask[] = [
  {
    id: "adsorption-energy",
    name: "吸附能计算",
    category: "adsorption-energy",
    purpose: "比较不同催化剂表面对 LiPS 的吸附强度和相互作用趋势。",
    inputFiles: ["POSCAR", "INCAR", "KPOINTS", "POTCAR"],
    outputFiles: ["OUTCAR", "OSZICAR", "CONTCAR"],
    workflow: ["优化孤立 LiPS 分子", "优化裸催化剂模型", "构建多个 LiPS 初始吸附构型", "优化吸附体系", "提取三类体系总能", "计算 E_ads", "比较不同构型和不同催化剂"],
    formulas: ["E_ads = E(catalyst + LiPS) - E(catalyst) - E(LiPS)"],
    analysisGuide: ["吸附能为负通常表示吸附放热", "应比较多个初始构型", "应结合键长、电荷转移和电子结构分析", "吸附能不是越负越好"],
    commonPitfalls: ["只比较一个吸附构型", "不同体系使用不同参数", "将吸附能越负直接解释为催化越好", "没有优化孤立 LiPS"],
    experimentCorrelation: ["UV-vis LiPS 吸附实验", "H 型扩散池", "吸附后 XPS", "Raman"]
  },
  {
    id: "bader-charge",
    name: "Bader 电荷分析",
    category: "charge-analysis",
    purpose: "分析吸附前后关键原子的电荷变化和界面电子转移方向。",
    inputFiles: ["CHGCAR", "AECCAR0", "AECCAR2"],
    outputFiles: ["ACF.dat", "BCF.dat", "AVF.dat"],
    workflow: ["设置 LCHARG = .TRUE.", "设置 LAECHG = .TRUE.", "静态计算生成 CHGCAR、AECCAR0、AECCAR2", "运行 chgsum.pl AECCAR0 AECCAR2", "运行 bader CHGCAR -ref CHGCAR_sum", "读取 ACF.dat", "比较吸附前后关键原子电荷"],
    analysisGuide: ["关注金属中心、Li、S、O/N 位点电荷变化", "结合 XPS 结合能偏移解释电子环境变化", "注意 ACF.dat 中 CHARGE 的物理含义"],
    commonPitfalls: ["直接把 Bader 数值当实验电荷", "FFT 网格不够细", "未使用 all-electron reference", "没有统一参考态"],
    experimentCorrelation: ["XPS 结合能偏移", "XANES 价态变化", "差分电荷图"]
  },
  {
    id: "charge-density-difference",
    name: "差分电荷分析",
    category: "charge-analysis",
    purpose: "可视化吸附前后界面电子积累和耗尽区域。",
    inputFiles: ["CHGCAR of total system", "CHGCAR of catalyst", "CHGCAR of LiPS"],
    outputFiles: ["charge density difference file", "cube/vasp charge grid"],
    workflow: ["优化吸附体系", "保持相同晶格和几何参考", "分别计算整体、催化剂和 LiPS 电荷密度", "执行电荷密度相减", "使用 VESTA 绘制等值面", "分析电子积累和耗尽区域"],
    formulas: ["Δρ = ρ(catalyst + LiPS) - ρ(catalyst) - ρ(LiPS)"],
    analysisGuide: ["黄色区域表示电子积累", "青色区域表示电子耗尽", "关注活性位点与 LiPS 接触区域", "与 Bader 和 XPS 结合解释"],
    commonPitfalls: ["不同几何结构相减", "不同网格相减", "只展示图不解释", "过度定量化差分电荷图"],
    experimentCorrelation: ["XPS 结合能偏移", "Bader 电荷", "界面电子转移"]
  },
  {
    id: "dos-pdos",
    name: "DOS / PDOS 分析",
    category: "electronic-structure",
    purpose: "分析催化剂电子结构、费米能级附近态密度和吸附前后轨道耦合变化。",
    inputFiles: ["POSCAR", "INCAR", "KPOINTS", "POTCAR", "CHGCAR"],
    outputFiles: ["DOSCAR", "PROCAR", "vasprun.xml"],
    workflow: ["完成结构优化", "完成静态自洽计算", "使用更密 k 点进行 DOS 计算", "设置 LORBIT", "提取总 DOS 和投影 DOS", "绘制吸附前后对比图"],
    analysisGuide: ["关注费米能级附近态密度", "分析金属 d 轨道与 S p 轨道耦合", "比较吸附前后峰位和强度变化", "结合 COHP 判断成键性质"],
    commonPitfalls: ["k 点太稀导致 DOS 不平滑", "只看 DOS 不结合结构和能量", "将 DOS 高直接等同催化活性高"],
    experimentCorrelation: ["EIS 电荷转移阻抗", "XPS 电子环境变化", "电导率趋势"]
  },
  {
    id: "cohp",
    name: "COHP / ICOHP 成键分析",
    category: "bonding-analysis",
    purpose: "分析 M-S、Li-O、Li-N、Li-S、S-S 等特定原子对的成键和反键相互作用。",
    inputFiles: ["WAVECAR", "CHGCAR", "POSCAR", "POTCAR", "lobsterin"],
    outputFiles: ["COHPCAR.lobster", "ICOHPLIST.lobster", "lobsterout"],
    workflow: ["完成 VASP 静态计算", "准备 LOBSTER 基组和 lobsterin", "运行 LOBSTER", "检查 charge spilling", "提取 COHP/ICOHP", "与键长、吸附能、电荷共同分析"],
    analysisGuide: ["关注费米能级以下成键/反键占据", "ICOHP 可比较键强趋势", "S-S 键弱化需要结合键长和 COHP", "COHP 不能单独证明完整催化机制"],
    commonPitfalls: ["只看 ICOHP 数值不看曲线", "不检查 charge spilling", "基组选择不合理", "脱离结构和电荷分析"],
    experimentCorrelation: ["Raman 键振动变化", "XPS 化学态变化", "EXAFS 键长趋势"]
  },
  {
    id: "free-energy",
    name: "吉布斯自由能路径",
    category: "free-energy",
    purpose: "比较 LiPS 转化过程中不同中间体的热力学趋势和可能限速步骤。",
    inputFiles: ["Optimized structures", "OUTCAR", "vibrational data if available"],
    outputFiles: ["free energy table", "free energy pathway plot"],
    workflow: ["确定反应路径", "优化各中间体吸附结构", "提取 DFT 总能", "加入 ZPE 和熵修正", "计算各步 ΔG", "绘制自由能路径", "识别最高上坡步骤"],
    formulas: ["ΔG = ΔE_DFT + ΔZPE - TΔS"],
    analysisGuide: ["比较不同催化剂对限速步骤的影响", "自由能路径说明热力学趋势", "需结合 NEB 判断动力学能垒"],
    commonPitfalls: ["将自由能路径等同反应速率", "忽略修正项近似", "参考态不清楚", "只算单一步骤就解释完整路径"],
    experimentCorrelation: ["CV 峰位", "对称电池", "Li2S 成核", "Raman 中间体变化"]
  },
  {
    id: "neb",
    name: "NEB 能垒计算",
    category: "neb",
    purpose: "计算关键反应、扩散或分解过程的最低能量路径和动力学能垒。",
    inputFiles: ["Initial POSCAR", "Final POSCAR", "INCAR", "KPOINTS", "POTCAR"],
    outputFiles: ["OUTCAR for each image", "CONTCAR for each image", "energy profile"],
    workflow: ["优化初态", "优化终态", "确保初态终态原子顺序一致", "插入中间 images", "设置 IMAGES", "运行 NEB", "检查每个 image 力收敛", "绘制能量路径"],
    analysisGuide: ["能垒越低通常说明动力学更有利", "必须检查路径合理性", "可比较不同催化剂能垒"],
    commonPitfalls: ["初态终态未优化", "原子顺序不一致", "images 太少", "中间路径不合理", "将 NEB 与自由能路径混淆"],
    experimentCorrelation: ["Li2S 分解过电位", "Li2S 成核测试", "CV 极化", "对称电池动力学"]
  }
];

export const catalystModelGuides: CatalystModelGuide[] = [
  {
    id: "single-atom",
    systemName: "单原子催化剂",
    representativeModels: ["M-N4/C", "M-N3/C", "M-N2/C", "M-S4/C", "M embedded in graphene vacancy", "M anchored on N-doped graphene"],
    modelBuildingSteps: ["构建石墨烯或缺陷碳超胞", "引入 N 掺杂或空位", "锚定单个金属原子", "保证足够大超胞和真空层", "必要时考虑自旋极化", "构建多个 LiPS 吸附构型"],
    keyApproximation: ["M-N4/C 是局部位点简化模型", "真实材料可能存在多种配位环境", "忽略复杂孔结构、电解液和长程无序"],
    recommendedTasks: ["吸附能", "Bader 电荷", "差分电荷", "DOS/PDOS", "COHP", "自由能", "NEB"],
    cautions: ["需要保证金属位点周期性距离足够大", "过渡金属需考虑自旋和 MAGMOM", "不要用单一构型代表所有吸附方式"]
  },
  {
    id: "dual-atom",
    systemName: "双原子催化剂",
    representativeModels: ["M1-M2-N6/C", "M2-N5/C", "M1M2 embedded in graphene vacancy", "homonuclear dual atom", "heteronuclear dual atom"],
    modelBuildingSteps: ["构建双金属嵌入缺陷碳模型", "控制 M1-M2 距离和配位数", "比较同核与异核位点", "构建单点吸附和桥连吸附", "优化多个初始构型"],
    keyApproximation: ["双原子位点不是两个远离的单原子", "真实样品中双金属距离和配位可能分布很宽"],
    recommendedTasks: ["桥连吸附", "COHP/ICOHP", "Bader", "自由能", "NEB"],
    cautions: ["需避免把孤立单原子结论直接套到双原子位点", "需关注金属间距和协同位点的稳定性"]
  },
  {
    id: "heterojunction",
    systemName: "异质结催化剂",
    representativeModels: ["oxide/sulfide interface", "oxide/carbon interface", "MXene/metal compound interface", "MoS2/Mo2C", "TiO2/Ti3C2", "CoS2/CoO"],
    modelBuildingSteps: ["选择两相晶面", "进行晶格匹配并控制失配率", "构建界面超胞", "设置真空层和界面终止", "比较 LiPS 在相 A、相 B 和界面的吸附"],
    keyApproximation: ["异质结模型对晶面选择、应变和终止方式非常敏感", "界面缺陷和真实粗糙度通常被简化"],
    recommendedTasks: ["界面电荷转移", "吸附能", "DOS/PDOS", "差分电荷", "自由能"],
    cautions: ["需报告失配率和界面应变", "不同界面模型不宜随意横向比较总能"]
  },
  {
    id: "metal-oxide",
    systemName: "金属氧化物",
    representativeModels: ["TiO2(101)", "MnO2(110)", "Co3O4(111)", "Fe2O3(001)", "V2O5 surface", "oxygen vacancy surface"],
    modelBuildingSteps: ["选择晶相和低指数晶面", "构建 slab 并固定底层原子", "加入真空层", "比较有无氧空位", "考虑 DFT+U、磁性和自旋", "吸附 LiPS 并分析 Li-O / M-S 作用"],
    keyApproximation: ["slab 模型代表特定晶面", "氧空位位置和浓度是简化处理", "实际材料可能存在多晶面和无序缺陷"],
    recommendedTasks: ["吸附能", "氧空位对比", "Bader", "差分电荷", "DOS", "DFT+U", "自由能"],
    cautions: ["可能需要 DFT+U", "需要考虑磁性", "导电性不足需结合 DOS 和实验 EIS 分析"]
  },
  {
    id: "metal-sulfide",
    systemName: "金属硫化物",
    representativeModels: ["MoS2 basal plane", "MoS2 edge", "CoS2 surface", "VS2 surface", "sulfur vacancy surface"],
    modelBuildingSteps: ["区分基面、边缘和空位位点", "区分晶格硫和 LiPS 中硫", "比较 S 端靠近金属位点与 Li 端靠近硫位点", "分析 S-S 键和 M-S 键变化"],
    keyApproximation: ["边缘模型和空位浓度是局部近似", "实际硫化物表面可能被氧化或重构"],
    recommendedTasks: ["吸附能", "COHP", "Bader", "DOS", "NEB"],
    cautions: ["不要把基面吸附结论泛化到边缘位点", "需说明空位浓度和超胞大小"]
  },
  {
    id: "mxene",
    systemName: "MXene",
    representativeModels: ["Ti3C2", "Ti3C2O2", "Ti3C2(OH)2", "Ti3C2F2", "mixed termination model"],
    modelBuildingSteps: ["构建 MXene 层状结构", "设置表面终止基", "加入真空层", "优化表面", "吸附 LiPS", "比较不同终止基对吸附、电荷转移和 DOS 的影响"],
    keyApproximation: ["纯 -O、-OH、-F 模型是 DFT 简化", "真实 MXene 通常具有混合终止基", "忽略层间水和复杂表面氧化"],
    recommendedTasks: ["吸附能", "Bader", "差分电荷", "DOS", "功函数", "Li+ 扩散"],
    cautions: ["不要直接把纯 -O 模型等同真实样品", "需要说明终止基模型近似", "注意层间堆叠影响"]
  },
  {
    id: "defect-carbon",
    systemName: "缺陷碳与掺杂碳",
    representativeModels: ["pristine graphene", "vacancy graphene", "pyridinic N-doped graphene", "graphitic N-doped graphene", "S/P/B-doped graphene", "edge carbon model", "M-N-C site"],
    modelBuildingSteps: ["比较本征碳、缺陷碳和掺杂碳", "构建空位、边缘或杂原子位点", "分析 LiPS 在缺陷位点和掺杂位点的吸附", "结合电荷和 DOS 判断位点极性"],
    keyApproximation: ["无序碳材料不能被过度简化为单一石墨烯模型", "孔结构和官能团分布通常未被完整模拟"],
    recommendedTasks: ["吸附能", "Bader", "差分电荷", "DOS", "模型对照"],
    cautions: ["需要把模型近似写清楚", "缺陷浓度和超胞尺寸需要收敛检查"]
  }
];

export const vaspTemplates: VASPTemplate[] = [
  {
    id: "geometry-optimization",
    name: "结构优化 INCAR 模板",
    purpose: "用于优化催化剂、LiPS 和吸附体系结构。",
    incar: `SYSTEM = Li-S catalyst optimization
ENCUT = 500
EDIFF = 1E-5
EDIFFG = -0.02
IBRION = 2
NSW = 200
ISIF = 2
ISMEAR = 0
SIGMA = 0.05
PREC = Accurate
LWAVE = .FALSE.
LCHARG = .FALSE.
ISPIN = 2`,
    explanation: ["ENCUT 需要根据 POTCAR 和收敛测试决定", "EDIFFG = -0.02 表示以力作为收敛标准", "ISIF = 2 常用于固定晶胞优化离子位置", "slab 模型通常不优化晶胞", "过渡金属体系通常需要考虑自旋"],
    cautions: ["该模板不能直接适用于所有体系", "磁性体系需要设置 MAGMOM", "金属和半导体体系的 ISMEAR 需要分别考虑"]
  },
  {
    id: "static",
    name: "静态能计算 INCAR 模板",
    purpose: "用于获得更精确总能、CHGCAR 和 WAVECAR。",
    incar: `SYSTEM = static energy
ENCUT = 500
EDIFF = 1E-6
IBRION = -1
NSW = 0
ISMEAR = 0
SIGMA = 0.05
PREC = Accurate
LCHARG = .TRUE.
LWAVE = .TRUE.
ISPIN = 2`,
    explanation: ["静态计算通常在优化结构基础上进行", "用于吸附能、Bader、DOS 等后续分析", "需要保持参数一致"],
    cautions: ["不要混用不同 ENCUT 或不同泛函的能量", "需要检查电子步收敛"]
  },
  {
    id: "dos",
    name: "DOS 计算 INCAR 模板",
    purpose: "用于基于已收敛电荷密度计算 DOS / PDOS。",
    incar: `SYSTEM = DOS calculation
ENCUT = 500
EDIFF = 1E-6
IBRION = -1
NSW = 0
ICHARG = 11
LORBIT = 11
NEDOS = 2000
ISMEAR = -5
SIGMA = 0.05
LCHARG = .TRUE.
LWAVE = .TRUE.
ISPIN = 2`,
    explanation: ["DOS 需要更密 k 点", "ICHARG = 11 通常基于已收敛电荷密度做非自洽 DOS", "金属/半导体 smearing 设置需根据体系调整"],
    cautions: ["k 点、NEDOS 和 smearing 需要测试", "DOS 不能单独证明催化能垒降低"]
  },
  {
    id: "bader",
    name: "Bader 电荷 INCAR 模板",
    purpose: "生成 Bader 分析所需 CHGCAR、AECCAR0 和 AECCAR2。",
    incar: `SYSTEM = Bader charge
ENCUT = 500
EDIFF = 1E-6
IBRION = -1
NSW = 0
LCHARG = .TRUE.
LAECHG = .TRUE.
LWAVE = .FALSE.
ISPIN = 2`,
    explanation: ["LAECHG = .TRUE. 会输出 AECCAR0、AECCAR1、AECCAR2", "常用 AECCAR0 + AECCAR2 作为参考总电荷密度", "使用 bader CHGCAR -ref CHGCAR_sum 进行分析"],
    cautions: ["需要检查 FFT 网格", "需要统一参考态", "ACF.dat 结果要谨慎解释"]
  },
  {
    id: "dft-u",
    name: "DFT+U 模板",
    purpose: "用于含局域 d 电子的过渡金属氧化物、硫化物或氮化物体系。",
    incar: `LDAU = .TRUE.
LDAUTYPE = 2
LDAUL = 2 -1 -1
LDAUU = 4.0 0.0 0.0
LDAUJ = 0.0 0.0 0.0
LMAXMIX = 4`,
    explanation: ["U 值必须根据文献、线性响应或测试确定", "DFT+U 会影响总能、DOS、吸附能和反应路径", "不同 U 值下的能量不能随意横向比较"],
    cautions: ["必须说明 U 值来源", "不能把未加 U 和加 U 的能量混作同一参考", "磁性设置也需要一并检查"]
  },
  {
    id: "dipole",
    name: "Slab 偶极修正模板",
    purpose: "用于非对称 slab 的偶极修正。",
    incar: `LDIPOL = .TRUE.
IDIPOL = 3
DIPOL = 0.5 0.5 0.5`,
    explanation: ["非对称 slab 可能需要偶极修正", "IDIPOL 方向应对应表面法向", "DIPOL 中心需要根据模型设置"],
    cautions: ["偶极修正可能影响收敛", "需要检查真空层厚度和势能平台"]
  },
  {
    id: "kpoints",
    name: "KPOINTS 模板",
    purpose: "用于 slab 或大超胞的 Gamma-centered k 点网格。",
    incar: `Gamma-centered mesh:
0
Gamma
3 3 1
0 0 0`,
    explanation: ["slab 模型 z 方向通常为 1", "k 点需要根据超胞尺寸收敛测试", "大超胞可使用较稀疏 k 点", "DOS 计算需要更密 k 点"],
    cautions: ["不能直接把 3x3x1 用于所有 slab", "吸附能对 k 点密度变化需要检查"]
  },
  {
    id: "poscar",
    name: "POSCAR / CONTCAR 说明",
    purpose: "说明结构文件在优化、静态计算和后处理中的作用。",
    incar: `POSCAR: initial structure
CONTCAR: optimized structure
Common workflow:
1. optimize POSCAR
2. copy CONTCAR to POSCAR for static calculation
3. keep consistent cell and coordinates for charge-density difference`,
    explanation: ["POSCAR 包含晶格、元素、原子数和坐标", "CONTCAR 是优化后结构文件", "后续静态计算常将 CONTCAR 复制为 POSCAR", "真实结构展示必须基于 POSCAR、CONTCAR、CIF 或 XYZ 文件"],
    cautions: ["没有真实结构文件时只能展示机制示意图", "差分电荷需要相同晶格和一致几何参考"]
  }
];

export const postProcessingTools = [
  ["VESTA", "查看结构、绘制差分电荷、查看 CHGCAR/PARCHG、输出结构图片"],
  ["VASPKIT", "DOS 处理、能带、电荷密度、吸附能辅助、文件转换"],
  ["pymatgen", "结构处理、slab 构建、文件读取、批量分析、数据可视化"],
  ["ASE", "构建分子和表面、读写 POSCAR/XYZ/CIF、结构操作、NEB 插值"],
  ["Bader code", "Bader 电荷分析，输出 ACF.dat"],
  ["LOBSTER", "COHP / ICOHP 和成键分析"],
  ["VTST tools", "NEB 插值、NEB 路径分析、过渡态相关工具"],
  ["Python plotting", "绘制吸附能柱状图、自由能路径图、DOS/PDOS 图、Bader 电荷变化图"]
];

export const experimentDFTMaps: ExperimentDFTMap[] = [
  {
    id: "xps-bader",
    experimentalObservation: "XPS 结合能偏移",
    dftAnalysis: ["Bader 电荷", "差分电荷", "DOS"],
    interpretation: "XPS 反映表面电子环境变化，DFT 可辅助解释电子转移方向。",
    caution: "XPS 不能直接给出 Bader 电荷数值。"
  },
  {
    id: "exafs-model",
    experimentalObservation: "EXAFS 配位数和键长",
    dftAnalysis: ["M-N4/C 模型", "M-N3/C 模型", "M1-M2-N6/C 模型", "氧化物/硫化物 slab 模型"],
    interpretation: "EXAFS 提供局域配位信息，DFT 模型应尽量与实验配位环境一致。",
    caution: "EXAFS 拟合模型选择会影响结论，DFT 结构不能伪造真实样品结构。"
  },
  {
    id: "uv-vis-adsorption",
    experimentalObservation: "UV-vis LiPS 吸附实验",
    dftAnalysis: ["LiPS 吸附能", "差分电荷", "Bader 电荷"],
    interpretation: "UV-vis 支持吸附能力，DFT 解释吸附强弱和界面电子作用。",
    caution: "吸附能趋势不能单独证明转化动力学更快。"
  },
  {
    id: "raman-path",
    experimentalObservation: "Raman / 原位 Raman",
    dftAnalysis: ["LiPS 反应路径", "中间体稳定性", "自由能路径"],
    interpretation: "Raman 可跟踪中间体或键振动变化，自由能路径可辅助解释转化趋势。",
    caution: "振动峰归属需要实验和理论共同约束。"
  },
  {
    id: "eis-cv",
    experimentalObservation: "EIS / CV / 对称电池",
    dftAnalysis: ["DOS/PDOS", "自由能", "NEB", "COHP"],
    interpretation: "电化学动力学改善可与电子结构、热力学和能垒趋势相互支撑。",
    caution: "EIS 和 CV 受电极结构、电解液、载量等宏观因素影响。"
  },
  {
    id: "li2s-nucleation-neb",
    experimentalObservation: "Li2S 成核测试",
    dftAnalysis: ["Li2S 吸附", "Li2S 成核自由能", "Li2S 分解 NEB", "界面电荷转移"],
    interpretation: "实验支持 Li2S 沉积/分解动力学改善，DFT 可分析能垒和界面作用。",
    caution: "需要结合沉积形貌、过电位和对照实验。"
  }
];

export const dftScientificChecks = [
  "所有 VASP 参数都必须标注为模板，不能当作通用最终参数。",
  "必须提醒用户做 ENCUT、k 点和真空层收敛测试。",
  "吸附能不是越负越好，必须强调适度吸附。",
  "必须比较多个 LiPS 初始吸附构型。",
  "DFT+U 参数必须说明来源，不同 U 值结果不能随意比较。",
  "差分电荷必须使用相同晶格和几何参考。",
  "Bader 电荷需要合理参考和足够细网格。",
  "DOS 不能单独证明催化能垒降低。",
  "自由能路径不等于动力学能垒。",
  "NEB 初态和终态必须充分优化且原子顺序一致。",
  "DFT 是原子尺度简化模型，不能直接替代真实电池实验。"
];

export const pitfalls = [
  ["只比较一个吸附构型", "比较多个初始吸附构型，并选择优化后最低能构型。"],
  ["吸附能越负越好", "强调适度吸附与快速转化平衡。"],
  ["用一个 Li2S6 代表所有 LiPS", "至少比较 Li2S8、Li2S6、Li2S4、Li2S2、Li2S 中的代表性物种。"],
  ["只算吸附能就声称催化活性高", "结合自由能、NEB、DOS、Bader、差分电荷和实验动力学。"],
  ["没有做 ENCUT / k 点收敛测试", "展示收敛测试流程并报告收敛标准。"],
  ["DFT+U 值随意选择", "说明 U 值来源，并避免不同 U 值总能直接比较。"],
  ["忽略自旋极化", "过渡金属、缺陷、自由基或磁性体系需考虑 ISPIN 和 MAGMOM。"],
  ["差分电荷使用不同几何结构相减", "必须使用相同晶格和一致几何参考。"],
  ["Bader 电荷直接等同实验电荷", "作为理论电荷划分结果，需与 XPS 等实验相互印证。"],
  ["NEB 初态终态未优化", "初态和终态必须充分优化，原子顺序一致，中间路径合理。"],
  ["把 DFT 模型当成真实电池环境", "明确 DFT 是简化原子尺度模型，需结合实验和多尺度分析。"]
];

export const adsorptionEnergyMockData = [
  { species: "Li2S8", "Fe-N4/C": -1.42, "Co-N4/C": -1.28, "TiO2-x": -1.76, "Ti3C2O2": -2.05, "MoS2-edge": -1.58 },
  { species: "Li2S6", "Fe-N4/C": -1.68, "Co-N4/C": -1.46, "TiO2-x": -2.05, "Ti3C2O2": -2.31, "MoS2-edge": -1.82 },
  { species: "Li2S4", "Fe-N4/C": -1.91, "Co-N4/C": -1.63, "TiO2-x": -2.18, "Ti3C2O2": -2.48, "MoS2-edge": -2.01 },
  { species: "Li2S2", "Fe-N4/C": -2.12, "Co-N4/C": -1.86, "TiO2-x": -2.38, "Ti3C2O2": -2.78, "MoS2-edge": -2.22 },
  { species: "Li2S", "Fe-N4/C": -2.24, "Co-N4/C": -1.92, "TiO2-x": -2.44, "Ti3C2O2": -2.95, "MoS2-edge": -2.35 }
];

export const freeEnergyMockData = [
  { step: "S8", "Fe-N4/C": 0, "TiO2-x": 0, "MoS2-edge": 0 },
  { step: "Li2S8", "Fe-N4/C": -0.18, "TiO2-x": -0.28, "MoS2-edge": -0.14 },
  { step: "Li2S6", "Fe-N4/C": -0.42, "TiO2-x": -0.57, "MoS2-edge": -0.36 },
  { step: "Li2S4", "Fe-N4/C": -0.55, "TiO2-x": -0.72, "MoS2-edge": -0.48 },
  { step: "Li2S2", "Fe-N4/C": -0.31, "TiO2-x": -0.49, "MoS2-edge": -0.2 },
  { step: "Li2S", "Fe-N4/C": -0.66, "TiO2-x": -0.82, "MoS2-edge": -0.52 }
];

export const pdosMockData = [
  { energy: -4, metalD: 0.8, sP: 0.15, liS: 0.06 },
  { energy: -3, metalD: 1.4, sP: 0.42, liS: 0.1 },
  { energy: -2, metalD: 1.1, sP: 0.9, liS: 0.18 },
  { energy: -1, metalD: 1.8, sP: 1.22, liS: 0.28 },
  { energy: 0, metalD: 2.2, sP: 1.45, liS: 0.35 },
  { energy: 1, metalD: 1.2, sP: 0.95, liS: 0.18 },
  { energy: 2, metalD: 0.6, sP: 0.5, liS: 0.12 }
];

export const nebMockData = [
  { image: "IS", energy: 0 },
  { image: "01", energy: 0.22 },
  { image: "02", energy: 0.48 },
  { image: "03", energy: 0.71 },
  { image: "04", energy: 0.54 },
  { image: "FS", energy: 0.18 }
];
