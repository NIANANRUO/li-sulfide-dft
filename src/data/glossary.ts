export type GlossaryTerm = {
  term: string;
  fullName?: string;
  definition: string;
  context: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "LiPS",
    fullName: "Lithium polysulfides",
    definition: "锂多硫化物，通常指 Li2Sx 中间体，例如 Li2S8、Li2S6 和 Li2S4。",
    context: "是穿梭效应和硫正极多步转化机制的核心对象。"
  },
  {
    term: "SACs",
    fullName: "Single-atom catalysts",
    definition: "单原子催化剂，金属原子以孤立单原子形式锚定在载体上。",
    context: "需要 HAADF-STEM、XAS、XPS 和 DFT 共同证明结构与活性位点。"
  },
  {
    term: "DACs",
    fullName: "Dual-atom catalysts",
    definition: "双原子催化剂，两个相邻金属原子形成同核或异核双金属活性中心。",
    context: "常用于解释桥连吸附、协同电荷转移和多中心反应路径。"
  },
  {
    term: "XANES",
    definition: "X 射线吸收近边结构，用于判断金属价态、电子结构和局域对称性。",
    context: "单原子和双原子催化剂中常与标准样对比分析价态。"
  },
  {
    term: "EXAFS",
    definition: "扩展 X 射线吸收精细结构，用于拟合配位数、键长和散射路径。",
    context: "可确认 M-N、M-S、M-O 配位并排除或识别 M-M 配位。"
  },
  {
    term: "Bader",
    definition: "基于电荷密度拓扑划分原子电荷的方法。",
    context: "用于比较 LiPS 吸附前后活性位和吸附物之间的电荷转移。"
  },
  {
    term: "COHP",
    fullName: "Crystal orbital Hamilton population",
    definition: "晶体轨道哈密顿布居分析，用于判断特定原子对之间的成键和反键贡献。",
    context: "锂硫体系中常分析 M-S、Li-O、Li-N 和 S-S 键。"
  },
  {
    term: "NEB",
    fullName: "Nudged elastic band",
    definition: "寻找初态到终态之间最小能量路径和反应能垒的计算方法。",
    context: "适合 Li2S 分解、Li 扩散、S-S 键断裂和表面迁移路径。"
  },
  {
    term: "DFT+U",
    definition: "在 DFT 中为强关联 d/f 电子引入 Hubbard U 修正的方法。",
    context: "过渡金属氧化物和部分硫化物中常用，但 U 值需要文献依据或测试。"
  }
];

export const glossaryMap = Object.fromEntries(glossaryTerms.map((item) => [item.term, item]));
