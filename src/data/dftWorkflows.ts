export type DftWorkflow = {
  id: string;
  name: string;
  purpose: string;
  applicableSystems: string[];
  modelBuilding: string[];
  vaspInputs: string[];
  outputFiles: string[];
  postProcessing: string[];
  analysisGuide: string[];
  commonPitfalls: string[];
};

export const dftWorkflowSteps: DftWorkflow[] = [
  {
    id: "build-catalyst",
    name: "构建催化剂模型",
    purpose: "将实验结构抽象为可计算模型，明确晶面、缺陷、配位和活性位点。",
    applicableSystems: ["SACs", "DACs", "异质结", "氧化物", "硫化物", "氮化物", "MXene", "缺陷碳"],
    modelBuilding: ["选择晶相或碳骨架", "建立超胞或 slab", "加入缺陷/掺杂/金属位点", "设置真空层", "检查初始磁矩"],
    vaspInputs: ["POSCAR", "POTCAR", "INCAR-relax", "KPOINTS"],
    outputFiles: ["CONTCAR", "OUTCAR", "OSZICAR"],
    postProcessing: ["检查力收敛", "检查结构合理性", "比较关键键长"],
    analysisGuide: ["模型必须能对应实验表征证据。", "不同催化剂应保持合理且一致的计算标准。"],
    commonPitfalls: ["随意选择晶面", "真空层不足", "忽略自旋", "用不同 U 值混合比较能量"]
  },
  {
    id: "lips-model",
    name: "构建 LiPS 吸附模型",
    purpose: "比较 S8、Li2S8、Li2S6、Li2S4、Li2S2、Li2S 在不同活性位上的稳定性。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["优化孤立 LiPS 分子", "设置 Li 端、S 端、桥式和平躺吸附", "保持足够分子-镜像距离", "筛选多个初始构型"],
    vaspInputs: ["优化后 catalyst CONTCAR", "LiPS POSCAR", "INCAR-relax"],
    outputFiles: ["CONTCAR", "OUTCAR", "XDATCAR"],
    postProcessing: ["比较总能", "分析键长变化", "保存最低能吸附构型"],
    analysisGuide: ["吸附能越负说明相互作用越强，但过强可能阻碍转化。", "需同时比较结构畸变和电荷转移。"],
    commonPitfalls: ["只算单一构型", "未优化孤立 LiPS", "分子构型与吸附体系标准不一致"]
  },
  {
    id: "adsorption-energy",
    name: "吸附能计算",
    purpose: "量化催化剂与 LiPS 的相互作用强弱，判断抑制穿梭和捕获中间体的能力。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["E_ads = E(catalyst + LiPS) - E(catalyst) - E(LiPS)", "三者应保持一致计算参数"],
    vaspInputs: ["静态单点 INCAR", "KPOINTS", "POTCAR"],
    outputFiles: ["OUTCAR", "OSZICAR"],
    postProcessing: ["提取 TOTEN", "计算吸附能", "绘制不同 LiPS 的柱状图"],
    analysisGuide: ["吸附过弱不利于抑制穿梭；吸附过强可能阻碍后续转化。", "理想催化剂需兼顾适中吸附和低能垒。"],
    commonPitfalls: ["未保持同一赝势/ENCUT/K 点", "混用不同构型能量", "忽略零点能和熵修正在热力学路径中的影响"]
  },
  {
    id: "bader-charge",
    name: "Bader 电荷分析",
    purpose: "判断吸附前后电荷转移方向和数量，辅助解释界面电子调控。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["基于优化结构做静态计算", "开启 LAECHG 和 ADDGRID"],
    vaspInputs: ["INCAR-bader", "CHGCAR", "AECCAR0", "AECCAR2"],
    outputFiles: ["ACF.dat", "BCF.dat", "AVF.dat"],
    postProcessing: ["chgsum.pl AECCAR0 AECCAR2", "bader CHGCAR -ref CHGCAR_sum"],
    analysisGuide: ["若金属中心失去电子而 LiPS 获得电子，可说明催化剂向多硫化物供电子，有利于削弱 S-S 键。"],
    commonPitfalls: ["没有用 AECCAR 参考电荷", "未检查网格一致性", "把 Bader 电荷绝对值当形式价态"]
  },
  {
    id: "charge-density",
    name: "差分电荷分析",
    purpose: "可视化催化剂与 LiPS 之间电荷积累和耗尽的空间分布。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["Δρ = ρ(catalyst + LiPS) - ρ(catalyst) - ρ(LiPS)", "三个 CHGCAR 必须基于相同晶胞、FFT 网格和坐标框架"],
    vaspInputs: ["静态 CHGCAR", "相同晶胞的片段 CHGCAR"],
    outputFiles: ["CHGCAR_diff", "cube/vesta 文件"],
    postProcessing: ["chgdiff.pl", "VESTA 可视化", "设置统一等值面"],
    analysisGuide: ["电荷积累在 LiPS 与活性位之间说明存在明显界面相互作用。"],
    commonPitfalls: ["片段结构重新弛豫导致坐标不一致", "等值面设置随意导致视觉误判"]
  },
  {
    id: "dos-cohp",
    name: "DOS / PDOS / COHP 分析",
    purpose: "解释电子传输能力、轨道耦合和关键键的成键/反键贡献。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["基于优化结构做静态 DOS", "COHP 需要高质量 WAVECAR 并使用 LOBSTER"],
    vaspInputs: ["INCAR-dos", "INCAR-cohp", "LOBSTERIN"],
    outputFiles: ["DOSCAR", "PROCAR", "COHPCAR.lobster", "ICOHPLIST.lobster"],
    postProcessing: ["pymatgen/vaspkit 绘图", "LOBSTER 解析 ICOHP"],
    analysisGuide: ["费米能级附近 DOS 越高通常电子传输越好；金属 d 与 S p 重叠说明轨道耦合。"],
    commonPitfalls: ["未对齐费米能级", "忽略自旋通道", "COHP 基组不合适"]
  },
  {
    id: "free-energy-neb",
    name: "吉布斯自由能与 NEB 能垒",
    purpose: "评估反应热力学趋势和动力学能垒，识别限速步骤。",
    applicableSystems: ["全部体系"],
    modelBuilding: ["S8 -> Li2S8 -> Li2S6 -> Li2S4 -> Li2S2 -> Li2S", "或重点计算 Li2S4 -> Li2S2 -> Li2S"],
    vaspInputs: ["静态总能量", "振动频率", "NEB images"],
    outputFiles: ["OUTCAR", "freq.dat", "neb.dat"],
    postProcessing: ["ΔG = ΔE_DFT + ΔZPE - TΔS", "提取 NEB 最高能点"],
    analysisGuide: ["最高上坡自由能差可判断限速步骤；NEB 能垒降低说明催化剂提升转化动力学。"],
    commonPitfalls: ["未优化初态终态", "NEB image 插值不合理", "把自由能路径和动力学能垒混为一谈"]
  }
];

export const dftResultTable = [
  ["吸附能", "LiPS 与催化剂相互作用强弱", "证明抑制穿梭能力"],
  ["Bader 电荷", "电荷转移方向和数量", "证明界面电子调控"],
  ["差分电荷", "电荷积累/耗尽空间分布", "直观展示界面作用"],
  ["DOS / PDOS", "电子结构和轨道贡献", "解释导电性和轨道耦合"],
  ["LDOS", "局域电子态分布", "找到活性位点"],
  ["COHP / ICOHP", "成键/反键作用强弱", "解释 M-S、Li-O、S-S 键变化"],
  ["吉布斯自由能", "反应热力学趋势", "判断限速步骤"],
  ["NEB 能垒", "反应动力学", "判断催化剂是否降低转化能垒"],
  ["功函数", "电子转移能力", "解释异质结和界面电场"],
  ["界面结合能", "异质结构稳定性", "证明界面构筑合理"]
];

export const lipsSpecies = ["S8", "Li2S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"];

export const dftSystemGuides: Record<string, string[]> = {
  SACs: ["建立石墨烯或氮掺杂碳超胞", "引入单空位或双空位", "加入 N、S、P 等配位原子", "锚定单个金属原子", "优化 M-Nx 活性位点", "吸附 Li2Sx 分子"],
  DACs: ["构建 M1-M2-N6/C 或 M2-N5/C", "比较同核和异核位点", "检查 M1-M2 距离", "比较 M1、M2 和桥连吸附"],
  异质结: ["选择两个晶相低指数晶面", "进行晶格匹配", "控制晶格失配率", "构建界面超胞并加入真空层", "计算界面结合能、功函数和差分电荷"],
  MXene: ["比较 Ti3C2、Ti3C2O2、Ti3C2F2、Ti3C2(OH)2", "若上下表面不对称需考虑偶极校正", "比较 Li-O 与 S-Ti 吸附构型"],
  缺陷碳: ["构建石墨烯、单空位、双空位和 N/S/P/B 掺杂模型", "比较边缘缺陷和面内缺陷", "分析 DOS 与 Bader 电荷"]
};
