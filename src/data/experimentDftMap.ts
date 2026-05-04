export const experimentDftMap = [
  {
    experiment: "XPS 结合能偏移",
    dft: "Bader 电荷 / 差分电荷",
    interpretation: "结合能正移通常指向电子密度降低，可与活性位 Bader 电荷减少和界面电荷耗尽区域互证。",
    caution: "峰位移动不能单独定量电荷转移，需要结合标准样、峰拟合和对照样。"
  },
  {
    experiment: "EXAFS 配位数和键长",
    dft: "优化结构 / 配位模型",
    interpretation: "M-N、M-S、M-O 或 M-M 配位可约束 DFT 初始模型，优化后键长应与拟合结果保持合理一致。",
    caution: "EXAFS 拟合模型不能任意选择，DFT 也不应脱离实验配位环境。"
  },
  {
    experiment: "WT-EXAFS 散射路径",
    dft: "单原子 / 双原子结构判定",
    interpretation: "轻元素配位和金属-金属配位在 WT 图中位置不同，可辅助判断 SACs 或 DACs 模型是否合理。",
    caution: "WT-EXAFS 是辅助证据，仍需 HAADF-STEM 和拟合结果配合。"
  },
  {
    experiment: "Raman 中间体演化",
    dft: "自由能路径 / NEB 能垒",
    interpretation: "原位 Raman 中 LiPS 信号出现和消失速度，可与自由能限速步骤和 NEB 动力学能垒对应。",
    caution: "Raman 峰归属需结合电位、时间和空白对照。"
  },
  {
    experiment: "EPR 空位信号",
    dft: "缺陷模型 / 缺陷态 DOS",
    interpretation: "氧空位或硫空位信号可支持构建缺陷表面模型，并用 DOS 和吸附能解释缺陷活性。",
    caution: "EPR 信号不能孤立等同于某一种缺陷类型。"
  },
  {
    experiment: "EIS / Tafel / 对称电池",
    dft: "DOS / 自由能 / NEB",
    interpretation: "低阻抗、低 Tafel 斜率和更强对称电池响应可与更高 DOS、更低自由能上坡和更低 NEB 能垒互证。",
    caution: "电化学提升也可能来自孔结构、导电性和硫负载差异。"
  }
];
