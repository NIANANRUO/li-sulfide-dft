export type DftTask = {
  id: string;
  name: string;
  purpose: string;
  modelAdvice: string[];
  vaspTemplateIds: string[];
  outputFiles: string[];
  postProcessing: string[];
  analysis: string[];
  pitfalls: string[];
};

export const dftTasks: DftTask[] = [
  {
    id: "adsorption-energy",
    name: "吸附能",
    purpose: "量化 LiPS 与催化剂之间的相互作用强弱，评价抑制穿梭和捕获中间体的能力。",
    modelAdvice: ["分别优化催化剂、孤立 LiPS 和吸附体系。", "比较 Li 端、S 端、平躺、垂直和桥式吸附构型。", "能量比较必须使用一致 ENCUT、KPOINTS、赝势和收敛标准。"],
    vaspTemplateIds: ["relax", "static", "kpoints"],
    outputFiles: ["OUTCAR", "OSZICAR", "CONTCAR"],
    postProcessing: ["提取 TOTEN", "计算 E_ads = E(catalyst + LiPS) - E(catalyst) - E(LiPS)", "绘制不同 LiPS 物种吸附能对比图"],
    analysis: ["吸附过弱不利于抑制穿梭。", "吸附过强可能阻碍后续转化。", "应结合键长、电荷转移和自由能判断催化效果。"],
    pitfalls: ["只比较一个初始吸附构型。", "孤立分子和吸附体系计算标准不一致。", "把吸附越强简单等同于催化越好。"]
  },
  {
    id: "bader",
    name: "Bader 电荷",
    purpose: "判断吸附前后电荷转移方向和数量，解释催化剂—LiPS 界面电子调控。",
    modelAdvice: ["基于优化后的吸附结构做静态电荷密度计算。", "对吸附前后的金属、S、Li 和配位原子做电荷差值比较。"],
    vaspTemplateIds: ["bader", "static"],
    outputFiles: ["CHGCAR", "AECCAR0", "AECCAR2", "ACF.dat"],
    postProcessing: ["chgsum.pl AECCAR0 AECCAR2", "bader CHGCAR -ref CHGCAR_sum", "提取关键原子 Bader 电荷变化"],
    analysis: ["若金属中心失去电子而 LiPS 获得电子，可支持催化剂向多硫化物供电子。", "电荷转移方向需与 XPS 结合能偏移和差分电荷互证。"],
    pitfalls: ["把 Bader 电荷绝对值当形式价态。", "未使用 AECCAR 参考电荷。", "忽略网格一致性。"]
  },
  {
    id: "charge-density",
    name: "差分电荷",
    purpose: "可视化 LiPS 与催化剂界面处电荷积累和耗尽的空间分布。",
    modelAdvice: ["吸附体系、催化剂片段和 LiPS 片段必须保持相同晶胞、FFT 网格和坐标框架。", "片段结构不要重新弛豫。"],
    vaspTemplateIds: ["static"],
    outputFiles: ["CHGCAR_ads", "CHGCAR_catalyst", "CHGCAR_LiPS", "CHGCAR_diff"],
    postProcessing: ["chgdiff.pl 或脚本相减", "VESTA/OVITO 可视化", "统一等值面和颜色标尺"],
    analysis: ["活性位与 LiPS 之间出现电荷积累说明界面相互作用明显。", "与 Bader 电荷和 XPS 位移配合解释电子转移。"],
    pitfalls: ["片段坐标框架不一致。", "等值面选择随意导致视觉误判。"]
  },
  {
    id: "dos",
    name: "DOS / PDOS",
    purpose: "分析电子结构、费米能级附近态密度和金属 d 轨道与 S p 轨道耦合。",
    modelAdvice: ["基于优化结构进行高精度静态 DOS 计算。", "对金属 d、S p、N/O p 等轨道做投影。"],
    vaspTemplateIds: ["dos", "static"],
    outputFiles: ["DOSCAR", "PROCAR", "vasprun.xml"],
    postProcessing: ["vaspkit / pymatgen 提取 DOS", "对齐费米能级", "绘制吸附前后 PDOS 对比"],
    analysis: ["费米能级附近 DOS 提升通常支持电子传输改善。", "轨道重叠可说明化学耦合和键合作用。"],
    pitfalls: ["未对齐费米能级。", "忽略自旋通道。", "用 DOS 单独证明催化活性。"]
  },
  {
    id: "cohp",
    name: "COHP / ICOHP",
    purpose: "分析 M-S、Li-O、Li-N、S-S 等关键键的成键/反键强度。",
    modelAdvice: ["使用优化后结构做静态计算并保留 WAVECAR。", "选择机制相关的原子对，而不是机械列出所有键。"],
    vaspTemplateIds: ["cohp"],
    outputFiles: ["WAVECAR", "CHGCAR", "COHPCAR.lobster", "ICOHPLIST.lobster"],
    postProcessing: ["运行 LOBSTER", "提取 -COHP 和 ICOHP", "比较吸附前后关键键强度"],
    analysis: ["M-S 或 Li-O 键 ICOHP 绝对值增大可支持化学吸附增强。", "S-S 键削弱可解释 LiPS 转化加速。"],
    pitfalls: ["基组不合适。", "未检查 charge spilling。", "把所有 ICOHP 差异都过度解释为机制。"]
  },
  {
    id: "free-energy",
    name: "吉布斯自由能",
    purpose: "评估 S8 到 Li2S 多步转化的热力学趋势，识别最高上坡步骤。",
    modelAdvice: ["建立 S8 -> Li2S8 -> Li2S6 -> Li2S4 -> Li2S2 -> Li2S 路径。", "对关键吸附态进行静态能量和必要振动修正。"],
    vaspTemplateIds: ["static", "relax"],
    outputFiles: ["OUTCAR", "freq 输出", "自由能汇总表"],
    postProcessing: ["ΔG = ΔE_DFT + ΔZPE - TΔS", "绘制自由能路径", "标出限速步骤"],
    analysis: ["最高上坡自由能差用于判断热力学限速步骤。", "不同催化剂曲线变化可比较转化趋势。"],
    pitfalls: ["把自由能路径当作动力学能垒。", "不同中间体能量标准不一致。"]
  },
  {
    id: "neb",
    name: "NEB 能垒",
    purpose: "计算 Li2S 分解、Li 扩散、S-S 键断裂或 LiPS 表面迁移的动力学能垒。",
    modelAdvice: ["先分别优化初态和终态。", "插入合理中间 images 并检查结构连续性。", "对比不同催化剂下最高能点与初态能量差。"],
    vaspTemplateIds: ["neb"],
    outputFiles: ["各 image OUTCAR", "neb.dat", "路径结构文件"],
    postProcessing: ["nebmake.pl / VTST 插值", "nebresults.pl 提取能量", "绘制反应能垒曲线"],
    analysis: ["能垒降低可支持催化剂提升反应动力学。", "应与 Li2S 成核、对称电池 CV 和 Tafel 斜率互证。"],
    pitfalls: ["初态终态没有充分优化。", "路径不连续。", "image 数量不足导致能垒不可靠。"]
  }
];

export const catalystModelAdvice: Record<string, string[]> = {
  "single-atom": ["构建 M-N4/C、M-N3/C、M-N2/C 或 M-S4/C。", "检查金属原子是否偏离空位或形成不合理键长。", "比较 Li 端和 S 端吸附构型。"],
  "dual-atom": ["构建 M1-M2-N6/C、M2-N5/C 或空位嵌入双金属位点。", "比较 M1、M2 和 M1-M2 桥连吸附。", "关注异核位点电荷不对称性。"],
  heterostructure: ["选择低指数晶面并控制晶格失配。", "计算界面结合能、功函数和差分电荷。", "在界面区域放置 LiPS 比单相表面更能体现协同。"],
  "metal-oxides": ["选择 TiO2 (101)、MnO2 (110)、Co3O4 (111) 等代表晶面。", "考虑 DFT+U、自旋极化和氧空位模型。", "比较完美表面与缺陷表面吸附。"],
  "metal-sulfides": ["构建边缘位、硫空位和低配位金属位。", "关注 M-S 与 S-S 键变化。", "用 COHP 辅助解释亲硫作用。"],
  "metal-nitrides": ["构建金属位、N 位和氮空位模型。", "结合 DOS 判断高导电性。", "比较 Li-N 与 S-M 吸附模式。"],
  mxenes: ["比较 Ti3C2、Ti3C2O2、Ti3C2F2 和 Ti3C2(OH)2。", "上下表面不对称时考虑偶极校正。", "分析终止基对 LiPS 吸附的影响。"],
  "defect-carbon": ["构建单空位、双空位、N/S/P/B 掺杂和边缘缺陷模型。", "避免用单一模型代表所有真实缺陷。", "重点分析局域电荷与 LiPS 吸附的关联。"]
};
