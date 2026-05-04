export const fundamentalsTabs = [
  {
    id: "components",
    label: "电池组成",
    title: "锂硫电池由什么组成？",
    description:
      "锂硫电池通常由硫正极、锂金属负极、电解液、隔膜和导电/催化宿主材料组成。硫正极提供主要容量来源，锂金属负极提供锂源，电解液负责 Li+ 传输，隔膜阻隔正负极直接接触，而导电宿主和催化剂则用于改善硫及放电产物的导电性、限制多硫化物扩散并促进其转化。"
  },
  {
    id: "advantages",
    label: "理论优势",
    title: "为什么锂硫电池具有高能量密度潜力？",
    description:
      "锂硫电池被认为是具有高能量密度潜力的下一代储能体系。其优势主要来自硫正极较高的理论比容量、锂硫反应较高的理论能量密度，以及硫资源丰富、成本较低和环境友好等特点。然而，理论优势并不等同于实际电芯性能。"
  },
  {
    id: "mechanism",
    label: "反应机理",
    title: "锂硫电池的充放电反应机理",
    description:
      "锂硫电池的放电过程本质上是硫从零价逐步被还原为 Li2S 的过程。该过程并不是一步完成，而是经过一系列长链和短链多硫化物中间体。充电过程则是 Li2S 被重新氧化为多硫化物并最终转化为 S8。"
  },
  {
    id: "gcd-curve",
    label: "充放电曲线",
    title: "锂硫电池经典充放电曲线如何解读？",
    description:
      "典型锂硫电池恒流充放电曲线通常包含两个放电平台和一个较宽的充电平台。高电压放电平台对应 S8 向长链多硫化物转化，低电压放电平台对应长链/中链 LiPS 进一步转化为 Li2S2 / Li2S。曲线平台位置、平台长度、电压滞后和容量贡献可以帮助理解反应机制、极化、硫利用率和动力学限制。"
  },
  {
    id: "polysulfide-conversion",
    label: "多硫化物转化",
    title: "多硫化物中间体如何生成与转化？",
    description:
      "多硫化物转化是锂硫电池反应机制的核心。S8 在放电过程中逐步转化为 Li2S8、Li2S6、Li2S4、Li2S2 并最终生成 Li2S。不同物种的溶解性、反应阶段和转化动力学决定了穿梭效应和容量释放行为。"
  },
  {
    id: "shuttle-animation",
    label: "穿梭效应动画",
    title: "多硫化物穿梭效应是如何产生的？",
    description:
      "在放电过程中，长链多硫化物容易溶解于电解液并向锂负极迁移，到达负极后可能发生副反应，导致活性硫损失、库伦效率降低和容量衰减。催化剂和功能宿主可通过吸附与催化转化减弱穿梭效应。"
  },
  {
    id: "research-link",
    label: "与后续研究的关系",
    title: "为什么基础机理会引出催化剂设计、实验表征和 DFT 计算？",
    description:
      "锂硫电池的基础机理直接引出后续研究逻辑：导电性差需要导电宿主，LiPS 易溶解需要吸附位点，转化动力学慢需要催化剂，Li2S 成核/分解困难需要电催化调控，而机制验证需要实验表征与 DFT 计算协同分析。"
  }
];

export const batteryComponents = [
  {
    id: "sulfur-cathode",
    name: "硫正极",
    shortName: "S Cathode",
    role: "容量来源",
    description:
      "硫正极是容量的主要来源。元素硫 S8 在放电过程中逐步被还原为多硫化物并最终转化为 Li2S。",
    keyIssue:
      "硫和最终放电产物 Li2S / Li2S2 的电子导电性较差，因此需要导电骨架改善电子传输。",
    visualHint: "黄色 S8 环状结构或硫颗粒"
  },
  {
    id: "lithium-anode",
    name: "锂金属负极",
    shortName: "Li Anode",
    role: "锂源",
    description: "锂金属负极提供锂源，并在放电过程中释放 Li+。",
    keyIssue:
      "锂金属具有高比容量，但存在枝晶生长、界面副反应和安全性问题，尤其会受到多硫化物穿梭的影响。",
    visualHint: "银灰色金属片或锂原子堆积"
  },
  {
    id: "electrolyte",
    name: "电解液",
    shortName: "Electrolyte",
    role: "Li+ 传输介质",
    description:
      "电解液负责传输 Li+，常见液态醚类电解液可以支持多硫化物反应。",
    keyIssue: "液态电解液也会溶解长链多硫化物，从而引发穿梭效应。",
    visualHint: "半透明蓝色区域，包含 Li+ 和 LiPS"
  },
  {
    id: "separator",
    name: "隔膜",
    shortName: "Separator",
    role: "物理隔离与离子传输",
    description: "隔膜用于阻隔正负极直接接触，同时允许 Li+ 通过。",
    keyIssue:
      "功能化隔膜或中间层可以通过物理阻隔、化学吸附或催化转化等方式减弱多硫化物穿梭。",
    visualHint: "位于正负极之间的半透明膜"
  },
  {
    id: "conductive-host",
    name: "导电骨架",
    shortName: "Conductive Host",
    role: "电子传输与结构支撑",
    description:
      "导电骨架通常由多孔碳材料或导电复合材料构成，用于提高硫正极电子传输能力。",
    keyIssue: "导电骨架还可分散硫物种、缓冲体积变化并提供反应界面。",
    visualHint: "多孔碳网络或导电框架"
  },
  {
    id: "catalyst-host",
    name: "催化剂/宿主材料",
    shortName: "Catalyst / Host",
    role: "吸附与催化转化",
    description:
      "催化剂或功能宿主材料可以吸附 LiPS、促进多硫化物转化、降低反应极化。",
    keyIssue: "理想催化剂应兼顾适度吸附、快速转化、良好导电性和结构稳定性。",
    visualHint: "蓝色或青色发光活性位点"
  }
];

export const theoreticalAdvantages = [
  {
    id: "capacity",
    label: "理论比容量",
    value: "约 1672–1675 mAh g⁻¹",
    explanation: "通常指基于硫活性物质质量的理论容量，对应 S8 完全转化为 Li2S。",
    caution:
      "该数值不是全电芯实际容量，不能忽略导电剂、粘结剂、集流体、电解液和锂负极等非活性组分。"
  },
  {
    id: "energy-density",
    label: "理论能量密度",
    value: "约 2600 Wh kg⁻¹",
    explanation: "锂硫体系常被报道具有很高的理论能量密度潜力。",
    caution:
      "实际电芯能量密度受硫载量、正极硫含量、电解液/硫比、锂负极过量、隔膜和封装质量等影响。"
  },
  {
    id: "resource-cost",
    label: "资源与成本",
    value: "硫资源丰富、成本较低",
    explanation: "硫元素储量丰富、成本相对较低，并具有一定环境友好优势。",
    caution:
      "材料低成本并不意味着电芯制造和系统成本一定低，仍需考虑电解液、锂负极、安全性和寿命。"
  },
  {
    id: "practical-gap",
    label: "理论与实际差距",
    value: "需工程化优化",
    explanation:
      "高理论性能需要通过高硫载量、贫电解液、稳定锂负极和高效催化正极共同实现。",
    caution: "科研展示中必须区分活性物质级、正极级和全电芯级性能指标。"
  }
];

export const practicalEnergyFactors = [
  { factor: "硫载量", score: 86 },
  { factor: "硫含量", score: 78 },
  { factor: "E/S 比", score: 68 },
  { factor: "N/P 比", score: 62 },
  { factor: "孔隙率", score: 56 },
  { factor: "非活性质量", score: 50 }
];

export const reactionMechanism = {
  dischargeOverall: "S8 + 16Li+ + 16e− → 8Li2S",
  chargeOverall: "8Li2S → S8 + 16Li+ + 16e−",
  simplifiedPathway: ["S8", "Li2S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"],
  stages: [
    {
      id: "stage-1",
      name: "阶段一：固态 S8 向长链多硫化物转化",
      simplifiedReaction: "S8 → Li2S8 / Li2S6",
      description:
        "S8 被还原后生成长链多硫化物。长链 LiPS 通常在醚类电解液中具有较高溶解性，因此与穿梭效应密切相关。",
      keyConcepts: ["长链 LiPS", "液相中间体", "穿梭效应来源"]
    },
    {
      id: "stage-2",
      name: "阶段二：长链多硫化物向中短链多硫化物转化",
      simplifiedReaction: "Li2S8 / Li2S6 → Li2S4",
      description:
        "这一阶段通常涉及液相多硫化物之间的转化，反应动力学会影响电极极化和容量释放。",
      keyConcepts: ["液相转化", "反应动力学", "电极极化"]
    },
    {
      id: "stage-3",
      name: "阶段三：短链多硫化物向固态 Li2S2 / Li2S 转化",
      simplifiedReaction: "Li2S4 → Li2S2 → Li2S",
      description:
        "放电后期逐渐形成难溶或不溶的 Li2S2 / Li2S。Li2S 的成核、沉积和后续充电分解通常动力学较慢。",
      keyConcepts: ["固相沉积", "Li2S 成核", "Li2S 分解", "动力学缓慢"]
    }
  ],
  caution:
    "S8 → Li2S8 → Li2S6 → Li2S4 → Li2S2 → Li2S 是常用的简化路径。实际电化学过程中，不同 LiPS 物种可能共存，并受到电解液组成、硫载量、电流密度、催化剂表面、温度和测试条件影响。"
};

export const chargeDischargeCurve = {
  dischargeData: [
    { capacity: 0, voltage: 2.42 },
    { capacity: 120, voltage: 2.38 },
    { capacity: 240, voltage: 2.35 },
    { capacity: 360, voltage: 2.31 },
    { capacity: 460, voltage: 2.23 },
    { capacity: 580, voltage: 2.12 },
    { capacity: 760, voltage: 2.08 },
    { capacity: 980, voltage: 2.05 },
    { capacity: 1180, voltage: 2.02 },
    { capacity: 1340, voltage: 1.92 },
    { capacity: 1450, voltage: 1.78 }
  ],
  chargeData: [
    { capacity: 0, voltage: 1.86 },
    { capacity: 160, voltage: 2.18 },
    { capacity: 340, voltage: 2.28 },
    { capacity: 620, voltage: 2.34 },
    { capacity: 880, voltage: 2.39 },
    { capacity: 1120, voltage: 2.45 },
    { capacity: 1320, voltage: 2.52 },
    { capacity: 1450, voltage: 2.58 }
  ],
  regions: [
    {
      id: "upper-plateau",
      label: "高电压放电平台",
      voltageRange: "约 2.3-2.4 V",
      capacityRegion: "放电前段",
      species: "S8 → Li2S8 / Li2S6 / Li2S4",
      interpretation:
        "主要对应固态 S8 被还原并生成可溶性长链多硫化物。该平台是否清晰与硫活化、导电接触和电解液浸润有关。",
      warning:
        "长链 LiPS 的生成也意味着穿梭效应风险开始出现。"
    },
    {
      id: "lower-plateau",
      label: "低电压放电平台",
      voltageRange: "约 2.0-2.1 V",
      capacityRegion: "主要容量贡献区",
      species: "Li2S4 → Li2S2 / Li2S",
      interpretation:
        "通常贡献更大容量，涉及液相 LiPS 向难溶/不溶 Li2S2 和 Li2S 的固相沉积转化。该阶段对催化转化、Li2S 成核和电子/离子传输非常敏感。",
      warning:
        "若平台缩短或明显下移，可能说明极化增大、Li2S 成核困难或活性硫利用不足。"
    },
    {
      id: "charge-plateau",
      label: "充电平台",
      voltageRange: "约 2.3-2.5 V",
      capacityRegion: "充电过程",
      species: "Li2S / Li2S2 → LiPS → S8",
      interpretation:
        "对应放电产物被氧化回多硫化物并最终形成硫。Li2S 分解通常需要较高过电位，是判断催化剂是否改善反应可逆性的重要窗口。",
      warning:
        "充电平台过高或拖尾明显，常提示 Li2S 分解阻力较大或界面极化较强。"
    }
  ],
  interpretationPoints: [
    {
      title: "两个放电平台",
      description:
        "高电压平台对应 S8 到长链 LiPS；低电压平台对应 LiPS 到 Li2S2 / Li2S，是锂硫电池经典 GCD 曲线的核心特征。"
    },
    {
      title: "平台容量贡献",
      description:
        "低电压平台通常承担更大的容量贡献，因此它的长度和稳定性常被用来判断 LiPS 深度转化和 Li2S 沉积是否充分。"
    },
    {
      title: "电压滞后与极化",
      description:
        "充电平台与放电平台之间的电压差反映电极极化。电压滞后越大，通常说明界面反应、传质或 Li2S 分解阻力越强。"
    },
    {
      title: "倍率与循环变化",
      description:
        "高电流密度或长循环后，平台下移、缩短、倾斜或消失，往往提示动力学变慢、导电网络失效、穿梭加剧或活性物质损失。"
    }
  ],
  researchConnections: [
    "与关键问题：平台极化直接连接低导电性、动力学缓慢和 Li2S 成核/分解困难。",
    "与催化剂体系：催化剂若有效，通常表现为平台更稳定、电压滞后降低、容量释放更充分。",
    "与实验表征：GCD 需要与 CV、EIS、Li2S 成核、Raman、XPS 等共同解释，不能单凭一条曲线下机制结论。",
    "与 DFT 计算：自由能路径、NEB 能垒、DOS/PDOS 和 COHP 可用于解释平台极化和转化动力学差异。"
  ],
  scientificNotes: [
    "经典平台电压会随电解液、硫载量、电流密度、温度和电极结构变化，不应写成固定不变。",
    "平台越长不一定总是越好，需要结合硫载量、E/S 比、面积容量和库伦效率综合判断。",
    "GCD 曲线能反映宏观电化学行为，但不能单独证明催化机制，必须与表征和计算形成证据链。"
  ]
};

export const polysulfideSpecies = [
  {
    id: "s8",
    formula: "S8",
    type: "固态硫单质",
    stage: "放电初始物种 / 充电最终产物",
    solubility: "低",
    description:
      "S8 是硫正极中的主要活性物质之一，但电子导电性较差，需要导电骨架提供电子传输路径。",
    relationToProblem: "硫利用率受导电网络、孔结构、电解液浸润和催化/吸附位点影响。",
    relationToExperiment: "可通过硫含量分析、TGA、XRD、Raman 等判断硫存在状态。",
    relationToDFT:
      "DFT 中一般不直接以大块硫作为唯一模型，而是常结合 LiPS 吸附和转化过程研究。",
    visualColor: "yellow",
    sulfurCount: 8,
    lithiumCount: 0,
    geometry: "ring"
  },
  {
    id: "li2s8",
    formula: "Li2S8",
    type: "长链多硫化物",
    stage: "放电早期产物",
    solubility: "较高",
    description: "Li2S8 是放电早期生成的长链多硫化物，通常具有较强溶解倾向。",
    relationToProblem: "容易进入电解液，是穿梭效应的重要来源之一。",
    relationToExperiment: "可用于多硫化物吸附实验和 UV-vis 吸附测试。",
    relationToDFT: "可作为长链 LiPS 的代表模型，用于吸附能、电荷转移和自由能分析。",
    visualColor: "orange",
    sulfurCount: 8,
    lithiumCount: 2,
    geometry: "chain"
  },
  {
    id: "li2s6",
    formula: "Li2S6",
    type: "长链多硫化物",
    stage: "放电早中期中间体",
    solubility: "较高",
    description: "Li2S6 可溶性较强，容易在电解液中迁移。",
    relationToProblem: "容易穿过隔膜向锂负极迁移，引发副反应和活性物质损失。",
    relationToExperiment: "常用于可视化吸附实验、UV-vis 吸附实验和对称电池测试。",
    relationToDFT: "常用于吸附能计算、Bader 电荷分析和差分电荷分析。",
    visualColor: "orange",
    sulfurCount: 6,
    lithiumCount: 2,
    geometry: "chain"
  },
  {
    id: "li2s4",
    formula: "Li2S4",
    type: "中链/短链过渡物种",
    stage: "液相向固相转化的关键中间体",
    solubility: "中等",
    description: "Li2S4 处于长链多硫化物向短链/固态产物转化的关键阶段。",
    relationToProblem:
      "其进一步转化为 Li2S2 / Li2S 的动力学会影响电极极化和容量释放。",
    relationToExperiment: "常用于吸附实验、对称电池和反应动力学验证。",
    relationToDFT:
      "Li2S4 是 DFT 吸附能计算、Bader 电荷分析、差分电荷分析和自由能路径中常用的代表性 LiPS 模型之一。",
    visualColor: "purple",
    sulfurCount: 4,
    lithiumCount: 2,
    geometry: "chain"
  },
  {
    id: "li2s2",
    formula: "Li2S2",
    type: "短链放电产物",
    stage: "放电后期",
    solubility: "较低",
    description: "Li2S2 溶解性降低，逐渐趋向固相沉积。",
    relationToProblem: "向 Li2S 转化过程与终产物沉积行为和反应动力学密切相关。",
    relationToExperiment: "可用于研究短链物种转化和 Li2S 成核前驱过程。",
    relationToDFT: "常用于短链 LiPS 转化路径、自由能和 NEB 能垒分析。",
    visualColor: "light-blue",
    sulfurCount: 2,
    lithiumCount: 2,
    geometry: "short-chain"
  },
  {
    id: "li2s",
    formula: "Li2S",
    type: "最终放电产物",
    stage: "放电末期",
    solubility: "难溶 / 不溶",
    description: "Li2S 是最终放电产物，通常以固态形式沉积，电子导电性差。",
    relationToProblem:
      "Li2S 成核、沉积和充电分解过程动力学较慢，容易导致极化增大和容量衰减。",
    relationToExperiment: "对应 Li2S 成核测试、Li2S 沉积曲线和充电分解分析。",
    relationToDFT: "对应自由能计算、Li2S 分解路径和 NEB 能垒计算。",
    visualColor: "white",
    sulfurCount: 1,
    lithiumCount: 2,
    geometry: "cluster"
  }
];

export const shuttleAnimationModes = [
  {
    id: "without-catalyst",
    label: "无催化剂",
    summary: "长链多硫化物溶解并迁移至锂负极，引发副反应和活性物质损失。",
    steps: [
      { id: "formation", title: "长链 LiPS 生成", description: "放电早期，硫正极区域生成 Li2S8、Li2S6 和 Li2S4 等长链多硫化物。" },
      { id: "dissolution", title: "LiPS 溶解", description: "长链多硫化物具有较强溶解倾向，容易进入电解液。" },
      { id: "migration", title: "向锂负极迁移", description: "溶解态 LiPS 在浓度梯度和电场等因素作用下向锂负极迁移。" },
      { id: "side-reaction", title: "锂负极副反应", description: "LiPS 到达锂负极后可能被进一步还原，并形成 Li2S2 / Li2S 沉积或副反应层。" },
      { id: "capacity-fade", title: "容量衰减", description: "活性硫损失、库伦效率降低和锂负极钝化共同导致循环性能下降。" }
    ]
  },
  {
    id: "with-catalyst",
    label: "有催化剂",
    summary: "催化剂通过吸附 LiPS 并促进其转化，减弱穿梭效应并改善反应动力学。",
    steps: [
      { id: "active-sites", title: "活性位点作用", description: "正极宿主表面的极性或催化活性位点与 LiPS 发生相互作用。" },
      { id: "adsorption", title: "LiPS 被吸附", description: "LiPS 被限制在正极附近，向锂负极迁移的概率降低。" },
      { id: "conversion", title: "加速转化", description: "催化位点促进长链 LiPS 向短链物种或 Li2S 转化。" },
      { id: "shuttle-mitigation", title: "穿梭减弱", description: "迁移到负极的 LiPS 数量减少，副反应被减弱。" },
      { id: "performance-improvement", title: "性能改善", description: "硫利用率提高，极化降低，循环稳定性和倍率性能得到改善。" }
    ]
  }
];

export const researchLinkLogic = [
  {
    id: "conductivity",
    problem: "硫和 Li2S / Li2S2 导电性差",
    consequence: "电子传输受限，活性物质利用率降低",
    researchDirection: "需要导电宿主、导电网络和催化位点",
    relatedModules: ["催化剂体系", "电化学性能"]
  },
  {
    id: "lips-solubility",
    problem: "长链 LiPS 易溶解",
    consequence: "产生穿梭效应，导致活性硫损失",
    researchDirection: "需要吸附位点、极性材料、功能隔膜或宿主结构限制穿梭",
    relatedModules: ["关键问题", "实验表征"]
  },
  {
    id: "slow-redox",
    problem: "LiPS 转化动力学慢",
    consequence: "电极极化增大，倍率性能下降",
    researchDirection: "需要催化剂降低反应能垒并促进多硫化物转化",
    relatedModules: ["催化剂体系", "DFT 计算"]
  },
  {
    id: "li2s-nucleation",
    problem: "Li2S 成核/分解困难",
    consequence: "放电末期和充电初期反应受限",
    researchDirection: "需要电催化活性位点调控 Li2S 沉积与分解",
    relatedModules: ["DFT 计算", "电化学性能"]
  },
  {
    id: "mechanism-validation",
    problem: "催化剂作用机制不易直接观察",
    consequence: "难以仅凭性能结果证明机制",
    researchDirection: "需要实验表征与 DFT 计算共同解释",
    relatedModules: ["实验表征", "DFT 计算"]
  }
];

export const nextModuleEntrances = [
  { id: "challenges", title: "关键问题", description: "进一步理解穿梭效应、反应动力学缓慢、体积膨胀和锂负极不稳定等问题。", targetModule: "关键问题" },
  { id: "catalyst-systems", title: "催化剂体系", description: "查看单原子、双原子、异质结、金属氧化物、MXene 和缺陷碳等催化剂设计策略。", targetModule: "催化剂体系" },
  { id: "experiments", title: "实验表征", description: "学习如何通过 XRD、XPS、XAS、TEM、Raman、EPR 和电化学测试建立结构与机制证据链。", targetModule: "实验表征" },
  { id: "dft", title: "DFT 计算", description: "学习如何通过吸附能、Bader 电荷、差分电荷、DOS、COHP、自由能和 NEB 解释催化机制。", targetModule: "DFT 计算" }
];

export const fundamentalsGlossary = [
  { term: "LiPS", fullName: "Lithium Polysulfides", chinese: "锂多硫化物", definition: "锂硫电池充放电过程中形成的中间体，通常写作 Li2Sx。长链 LiPS 如 Li2S8、Li2S6 和 Li2S4 容易溶解并引发穿梭效应。" },
  { term: "Shuttle Effect", fullName: "Polysulfide Shuttle Effect", chinese: "多硫化物穿梭效应", definition: "可溶性多硫化物从正极迁移至负极并发生副反应，导致活性物质损失、库伦效率降低和容量衰减的现象。" },
  { term: "E/S", fullName: "Electrolyte-to-Sulfur Ratio", chinese: "电解液/硫比", definition: "电解液用量与硫质量的比值，是影响实际锂硫电池能量密度的重要参数。" },
  { term: "Li2S nucleation", fullName: "Lithium Sulfide Nucleation", chinese: "Li2S 成核", definition: "放电后期 Li2S 从溶液或表面反应中形成固态沉积的过程，与反应动力学和催化剂活性密切相关。" }
];

export const fundamentalsScientificChecks = [
  "必须区分理论容量、理论能量密度和实际电芯能量密度。",
  "必须正确表达 Li+ 和电子传输路径：Li+ 通过电解液，电子通过外电路和导电网络。",
  "必须说明 S8 → Li2S8 → Li2S6 → Li2S4 → Li2S2 → Li2S 是简化路径，实际体系中多种 LiPS 可能共存。",
  "必须指出长链 LiPS 是穿梭效应的重要来源，但不要把所有问题都简单归因于穿梭效应。",
  "不要写成吸附越强越好，应为适度吸附与快速转化协同更合理。",
  "必须把 Li2S 成核/分解与反应动力学问题联系起来。",
  "动画必须服务于科学解释，不做无意义装饰。"
];
