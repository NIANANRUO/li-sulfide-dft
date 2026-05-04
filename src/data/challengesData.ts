export const challengesTabs = [
  {
    id: "overview",
    label: "问题总览",
    title: "锂硫电池从理论优势到实际应用的关键障碍",
    description:
      "锂硫电池具有较高的理论比容量和理论能量密度，但实际应用受到多种耦合问题限制，包括多硫化物穿梭、转化动力学缓慢、低导电性、体积变化、锂负极不稳定以及实际高能量密度条件下的工程挑战。",
  },
  {
    id: "shuttle-effect",
    label: "穿梭效应",
    title: "多硫化物穿梭效应如何导致容量衰减？",
    description:
      "可溶性长链 LiPS 在电解液中迁移并与锂负极发生副反应，导致活性硫损失、库伦效率降低、锂负极钝化和容量衰减。",
  },
  {
    id: "slow-kinetics",
    label: "动力学缓慢",
    title: "为什么多硫化物转化动力学缓慢？",
    description:
      "锂硫反应涉及多步固-液-固转化，LiPS 转化、Li2S 成核沉积和 Li2S 分解过程通常存在较大动力学阻力。",
  },
  {
    id: "low-conductivity",
    label: "低导电性与极化",
    title: "为什么硫和 Li2S 的低导电性会限制容量释放？",
    description:
      "硫和 Li2S / Li2S2 的电子导电性较差，可能导致活性物质利用率低、界面电荷转移受限和电极极化增大。",
  },
  {
    id: "volume-expansion",
    label: "体积膨胀与结构失稳",
    title: "硫转化为 Li2S 时为什么会造成电极结构问题？",
    description:
      "硫在转化为 Li2S 的过程中伴随明显体积变化，可能引发电极结构应力、导电网络断裂和孔道堵塞。",
  },
  {
    id: "lithium-anode",
    label: "锂负极不稳定",
    title: "锂金属负极为什么会限制锂硫电池寿命和安全性？",
    description:
      "锂金属负极存在不均匀沉积、枝晶生长、不稳定 SEI 和副反应问题，穿梭来的 LiPS 会进一步加剧界面失稳。",
  },
  {
    id: "practical-conditions",
    label: "实际工况挑战",
    title: "为什么实验室高性能不一定代表实际高能量密度？",
    description:
      "高硫载量、贫电解液、有限锂负极和厚电极条件会放大传质、导电、穿梭、体积变化和界面稳定性问题。",
  },
  {
    id: "strategy-map",
    label: "问题-策略映射",
    title: "关键问题如何引出材料设计、实验表征和 DFT 计算？",
    description:
      "通过建立问题、后果、材料策略、实验验证和 DFT 分析之间的映射，可以清晰展示锂硫电池催化剂研究的逻辑链。",
  },
];

export const challengeCards = [
  {
    id: "shuttle-effect",
    title: "多硫化物穿梭效应",
    shortTitle: "穿梭效应",
    severity: "核心问题",
    summary:
      "可溶性长链 LiPS 从正极迁移至锂负极，引发活性物质损失、副反应和低库伦效率。",
    origin:
      "放电过程中生成的 Li2S8、Li2S6 和 Li2S4 等长链多硫化物在电解液中具有较强溶解倾向。",
    consequences: ["活性硫损失", "库伦效率降低", "锂负极钝化", "容量快速衰减", "循环寿命缩短"],
    relatedExperiments: ["UV-vis Li2S6 吸附实验", "H 型扩散池", "循环性能", "库伦效率", "原位/非原位 Raman", "XPS"],
    relatedDFT: ["吸附能", "Bader 电荷", "差分电荷", "DOS / PDOS", "COHP"],
    relatedStrategies: ["极性吸附材料", "催化宿主", "功能隔膜", "电解液调控"],
  },
  {
    id: "slow-kinetics",
    title: "氧化还原动力学缓慢",
    shortTitle: "动力学缓慢",
    severity: "核心问题",
    summary:
      "LiPS 转化、Li2S 成核沉积和 Li2S 充电分解过程动力学较慢，导致极化和倍率性能下降。",
    origin:
      "硫正极反应涉及多步固-液-固转化，包含电子传输、Li+ 传输、吸附/脱附、S-S 键断裂和 Li2S 成核等过程。",
    consequences: ["极化增大", "倍率性能下降", "容量释放不足", "LiPS 停留时间延长", "穿梭效应加剧"],
    relatedExperiments: ["CV", "EIS", "对称电池 CV", "Li2S 成核测试", "Tafel 分析", "GITT"],
    relatedDFT: ["吉布斯自由能", "NEB 能垒", "吸附能", "DOS / PDOS", "COHP / ICOHP"],
    relatedStrategies: ["电催化剂", "单原子/双原子位点", "异质结", "缺陷工程"],
  },
  {
    id: "low-conductivity",
    title: "低导电性与电极极化",
    shortTitle: "低导电性",
    severity: "重要问题",
    summary: "硫和 Li2S / Li2S2 导电性差，会限制电子传输并增加电极极化。",
    origin:
      "硫和放电终产物 Li2S / Li2S2 属于电子绝缘或低导电性物种，反应过程依赖导电宿主和连续电子通路。",
    consequences: ["硫利用率降低", "电荷转移阻抗增大", "充放电平台极化增大", "倍率性能下降", "Li2S 沉积覆盖活性位点"],
    relatedExperiments: ["EIS", "GCD", "CV", "倍率性能", "SEM/TEM", "电导率测试"],
    relatedDFT: ["DOS", "PDOS", "LDOS", "差分电荷", "COHP"],
    relatedStrategies: ["导电碳骨架", "MXene", "导电聚合物", "复合导电网络"],
  },
  {
    id: "volume-expansion",
    title: "体积膨胀与结构失稳",
    shortTitle: "体积膨胀",
    severity: "结构问题",
    summary: "S8 向 Li2S 转化伴随明显体积变化，可能破坏正极结构和导电网络。",
    origin: "充放电过程中硫物种相态和密度发生变化，电极经历反复膨胀与收缩。",
    consequences: ["电极颗粒破裂", "导电网络断裂", "孔道堵塞", "催化位点被覆盖", "活性物质失联", "循环稳定性下降"],
    relatedExperiments: ["SEM/TEM", "截面 SEM", "XRD", "Raman", "循环后形貌分析", "长循环性能"],
    relatedDFT: ["界面结合能", "Li2S 成核趋势", "吸附能", "差分电荷", "多尺度模拟提示"],
    relatedStrategies: ["多孔宿主", "空心结构", "柔性框架", "弹性粘结剂"],
  },
  {
    id: "lithium-anode-instability",
    title: "锂金属负极不稳定",
    shortTitle: "锂负极",
    severity: "安全与寿命问题",
    summary: "锂负极存在枝晶、不稳定 SEI 和副反应问题，LiPS 穿梭会进一步加剧界面失稳。",
    origin: "Li plating/stripping 不均匀、SEI 反复破裂重构，以及 LiPS 与锂金属发生副反应。",
    consequences: ["枝晶生长", "活性锂损失", "电解液消耗", "SEI 增厚", "安全风险", "循环寿命下降"],
    relatedExperiments: ["锂对称电池", "SEM", "XPS", "EIS", "库伦效率测试", "全电池长循环"],
    relatedDFT: ["Li 吸附能", "Li 扩散能垒", "LiPS 与保护层相互作用", "界面结合能", "差分电荷"],
    relatedStrategies: ["人工 SEI", "负极保护层", "电解液添加剂", "均匀 Li+ 通量设计"],
  },
  {
    id: "practical-conditions",
    title: "实际高能量密度工况挑战",
    shortTitle: "实际工况",
    severity: "工程放大问题",
    summary: "高硫载量、贫电解液和有限锂负极条件会放大传质、导电、穿梭和结构稳定性问题。",
    origin: "实际电芯要求高面积容量和高能量密度，因此不能长期依赖低硫载量、过量电解液和过量锂负极。",
    consequences: ["厚电极传质困难", "电子通路不足", "LiPS 转化不充分", "局部浓差极化", "循环寿命下降", "实际能量密度不足"],
    relatedExperiments: ["硫载量 mg cm-2", "面积容量 mAh cm-2", "E/S 比", "N/P 比", "厚电极循环", "软包电池测试"],
    relatedDFT: ["吸附与转化机制解释", "界面作用分析", "不能替代电芯级工程评价"],
    relatedStrategies: ["高硫载量电极设计", "贫电解液适配", "厚电极传输网络", "有限锂负极保护"],
  },
];

export const shuttleEffectMechanism = {
  title: "多硫化物穿梭效应机理",
  summary: "穿梭效应源于可溶性长链 LiPS 的生成、溶解、迁移和负极副反应，最终导致活性硫损失和循环性能下降。",
  steps: [
    { id: "formation", title: "长链 LiPS 生成", description: "放电早期，S8 被还原生成 Li2S8、Li2S6 和 Li2S4 等长链多硫化物。" },
    { id: "dissolution", title: "溶解进入电解液", description: "长链 LiPS 在液态电解液中具有较强溶解倾向，容易离开正极区域。" },
    { id: "migration", title: "跨隔膜迁移", description: "溶解态 LiPS 在浓度梯度和电场等因素影响下向锂负极迁移。" },
    { id: "anode-reaction", title: "负极副反应", description: "LiPS 到达锂金属负极后可能被进一步还原，并形成不溶性硫化锂沉积或副反应层。" },
    { id: "capacity-fade", title: "性能衰减", description: "活性硫损失、锂负极钝化和低库伦效率共同导致容量衰减和循环寿命缩短。" },
  ],
  catalystModeSteps: [
    { id: "adsorption", title: "吸附 LiPS", description: "极性或催化活性位点与 LiPS 发生相互作用，降低其自由扩散概率。" },
    { id: "conversion", title: "促进转化", description: "催化剂促进长链 LiPS 向短链物种或 Li2S 转化，缩短其在电解液中的停留时间。" },
    { id: "mitigation", title: "减弱穿梭", description: "迁移至锂负极的 LiPS 减少，副反应概率降低，硫利用率提升。" },
  ],
};

export const kineticsBottlenecks = [
  { id: "s8-activation", title: "S8 活化困难", description: "固态 S8 电子导电性差，初始还原过程依赖导电网络和反应界面。", experiment: ["CV 初始还原峰", "GCD 放电平台"], dft: ["吸附能", "电子结构", "S8 活化模型"] },
  { id: "lips-conversion", title: "长链 LiPS 转化缓慢", description: "Li2S8 / Li2S6 / Li2S4 之间的转化涉及多步电子与 Li+ 参与过程。", experiment: ["对称电池 CV", "UV-vis 转化实验", "EIS"], dft: ["自由能路径", "差分电荷", "DOS / PDOS"] },
  { id: "li2s-nucleation", title: "Li2S 成核和沉积困难", description: "放电后期 Li2S 的成核和沉积会影响容量释放和电极极化。", experiment: ["Li2S 成核测试", "沉积容量", "SEM 形貌"], dft: ["Li2S 吸附能", "成核趋势", "NEB 能垒"] },
  { id: "li2s-decomposition", title: "Li2S 充电分解困难", description: "Li2S 电子导电性差，充电分解过程可能需要较高过电位。", experiment: ["充电平台极化", "CV 氧化峰", "Tafel"], dft: ["Li2S 分解自由能", "NEB", "COHP"] },
];

export const conductivityIssues = [
  { id: "sulfur-insulation", title: "硫电子导电性差", description: "S8 难以直接参与高效电子传输，若缺少导电宿主会导致硫利用率降低。" },
  { id: "li2s-insulation", title: "Li2S / Li2S2 导电性差", description: "放电产物可能覆盖活性位点并阻碍电子传输，增加电极极化。" },
  { id: "poor-contact", title: "反应物与导电网络接触不足", description: "硫物种分布不均或导电网络不连续会导致局部反应不充分。" },
  { id: "polarization", title: "电极极化增大", description: "电子/离子传输受限和界面反应缓慢会表现为充放电电压差增加。" },
];

export const volumeExpansionIssues = [
  { id: "conversion-volume-change", title: "S8 到 Li2S 的体积变化", description: "硫物种在放电过程中发生相态和密度变化，导致正极局部膨胀与收缩。" },
  { id: "structural-cracking", title: "电极结构破裂", description: "反复循环中的应力变化可能导致颗粒破裂、电极粉化或结构塌陷。" },
  { id: "conductive-network-failure", title: "导电网络失效", description: "导电骨架断裂或活性物质脱离会降低电子传输效率。" },
  { id: "pore-blockage", title: "孔道堵塞", description: "Li2S 不均匀沉积可能堵塞孔道，影响 Li+ 传输和电解液浸润。" },
];

export const lithiumAnodeIssues = [
  { id: "dendrite-growth", title: "锂枝晶生长", description: "不均匀 Li 沉积会形成枝晶，可能带来安全风险和低循环效率。" },
  { id: "unstable-sei", title: "SEI 不稳定", description: "锂沉积/剥离过程导致 SEI 反复破裂和重构，持续消耗电解液和活性锂。" },
  { id: "polysulfide-corrosion", title: "多硫化物副反应", description: "穿梭至负极的 LiPS 会与锂金属发生反应，加剧负极钝化和活性锂损失。" },
  { id: "dead-lithium", title: "死锂形成", description: "部分锂沉积失去电子接触，形成不可逆死锂，降低循环寿命。" },
];

export const practicalConditionChallenges = [
  { id: "high-sulfur-loading", title: "高硫载量", metric: "mg cm-2", description: "高硫载量有利于提高面积容量，但会加剧厚电极电子和离子传输困难。", caution: "低硫载量下的高比容量不能直接代表实际高能量密度。" },
  { id: "high-sulfur-content", title: "高正极硫含量", metric: "wt%", description: "提高正极中硫比例有利于提升正极级能量密度，但会压缩导电剂和功能宿主比例。", caution: "过少导电/催化组分可能导致反应不充分。" },
  { id: "lean-electrolyte", title: "贫电解液", metric: "E/S ratio", description: "较低电解液/硫比有利于提高实际电芯能量密度，但会增加传质阻力并改变 LiPS 溶解/转化环境。", caution: "过量电解液条件下的结果不一定适用于实际贫电解液电池。" },
  { id: "limited-lithium", title: "有限锂负极", metric: "N/P ratio", description: "有限锂负极有利于提高实际能量密度，但对锂沉积/剥离稳定性要求更高。", caution: "过量锂负极会掩盖负极不稳定问题。" },
  { id: "thick-electrode", title: "厚电极", metric: "electrode thickness", description: "厚电极有利于提高面积容量，但会放大孔道、导电网络、传质和体积变化问题。", caution: "厚电极性能更能反映实际应用挑战。" },
];

export const problemStrategyMap = [
  { id: "shuttle-effect", problem: "穿梭效应", consequence: "活性物质损失、锂负极副反应、低库伦效率", materialStrategies: ["极性吸附材料", "催化宿主", "功能隔膜", "电解液调控"], experimentalValidation: ["UV-vis", "H 型扩散池", "循环性能", "库伦效率", "XPS", "Raman"], dftAnalysis: ["吸附能", "Bader 电荷", "差分电荷", "DOS", "COHP"] },
  { id: "slow-kinetics", problem: "动力学缓慢", consequence: "极化增大、倍率性能下降、Li2S 沉积/分解困难", materialStrategies: ["电催化剂", "单原子/双原子位点", "异质结", "缺陷工程"], experimentalValidation: ["CV", "EIS", "对称电池", "Li2S 成核", "Tafel", "GITT"], dftAnalysis: ["自由能", "NEB", "吸附能", "DOS", "COHP"] },
  { id: "low-conductivity", problem: "低导电性", consequence: "电子传输受限、硫利用率降低、极化增大", materialStrategies: ["导电碳骨架", "MXene", "导电聚合物", "复合导电网络"], experimentalValidation: ["EIS", "倍率性能", "电导率", "GCD 平台极化"], dftAnalysis: ["DOS", "PDOS", "LDOS", "电荷密度"] },
  { id: "volume-expansion", problem: "体积膨胀", consequence: "电极破裂、导电网络失效、孔道堵塞", materialStrategies: ["多孔宿主", "柔性框架", "空心结构", "弹性粘结剂"], experimentalValidation: ["SEM/TEM", "截面 SEM", "循环后形貌", "长循环"], dftAnalysis: ["界面结合", "Li2S 成核趋势", "多尺度模拟提示"] },
  { id: "lithium-anode-instability", problem: "锂负极不稳定", consequence: "枝晶、生死锂、副反应、安全风险", materialStrategies: ["人工 SEI", "保护层", "电解液添加剂", "均匀 Li+ 通量设计"], experimentalValidation: ["对称电池", "SEM", "XPS", "EIS", "库伦效率"], dftAnalysis: ["Li 吸附能", "扩散能垒", "界面结合能", "差分电荷"] },
];

export const experimentDFTChallengeMap = [
  { experimentalSignal: "UV-vis 中 Li2S6 溶液颜色变浅", possibleMeaning: "材料可能对 LiPS 具有吸附作用", dftSupport: "LiPS 吸附能、Bader 电荷、差分电荷", caution: "颜色变浅不能单独证明催化转化，只能作为吸附能力的辅助证据。" },
  { experimentalSignal: "CV 峰间距减小", possibleMeaning: "电极极化降低，氧化还原可逆性改善", dftSupport: "自由能路径、NEB 能垒、DOS", caution: "CV 受扫描速率、电极负载和电解液条件影响，需要对比分析。" },
  { experimentalSignal: "EIS 中 Rct 降低", possibleMeaning: "界面电荷转移更容易", dftSupport: "DOS / PDOS、差分电荷、界面电子结构", caution: "EIS 拟合模型需要合理，不能过度解读单一阻抗参数。" },
  { experimentalSignal: "Li2S 成核容量提高", possibleMeaning: "催化剂促进 Li2S 沉积", dftSupport: "Li2S 吸附能、成核自由能、NEB", caution: "需要结合沉积形貌和动力学测试共同判断。" },
  { experimentalSignal: "循环后锂负极硫物种减少", possibleMeaning: "穿梭副反应减弱", dftSupport: "LiPS 与宿主/保护层相互作用、吸附能", caution: "负极表面物种也受电解液和 SEI 成分影响。" },
];

export const challengesAnimations = [
  { id: "shuttle-problem-animation", name: "穿梭效应动画", component: "ShuttleProblemAnimation", targetTab: "shuttle-effect", requiredControls: ["播放", "暂停", "重播", "无催化剂 / 有催化剂切换", "步骤切换"] },
  { id: "kinetics-bottleneck-animation", name: "动力学瓶颈动画", component: "KineticsBottleneckAnimation", targetTab: "slow-kinetics", requiredControls: ["播放", "暂停", "步骤切换", "有无催化剂对比"] },
  { id: "volume-expansion-animation", name: "体积膨胀动画", component: "VolumeExpansionAnimation", targetTab: "volume-expansion", requiredControls: ["播放", "重播", "无缓冲结构 / 多孔宿主对比"] },
  { id: "lithium-anode-instability-animation", name: "锂负极失稳动画", component: "LithiumAnodeInstabilityAnimation", targetTab: "lithium-anode", requiredControls: ["播放", "暂停", "有无保护层对比"] },
];

export const challengesGlossary = [
  { term: "Shuttle Effect", chinese: "穿梭效应", definition: "可溶性多硫化物从正极迁移至负极并发生副反应，导致活性物质损失和循环性能下降的现象。" },
  { term: "Redox Kinetics", chinese: "氧化还原动力学", definition: "描述硫物种之间电子转移、Li+ 参与、吸附/脱附和相变等反应过程快慢的概念。" },
  { term: "Polarization", chinese: "电极极化", definition: "实际充放电电压偏离热力学平衡电压的现象，通常与电荷转移阻力、传质阻力和界面反应有关。" },
  { term: "Li2S nucleation", chinese: "Li2S 成核", definition: "放电后期 Li2S 从溶液或表面反应中形成固态沉积的过程，是判断催化转化能力的重要环节。" },
  { term: "SEI", chinese: "固态电解质界面膜", definition: "锂金属与电解液反应形成的界面层，其稳定性影响锂沉积/剥离效率和电池寿命。" },
  { term: "E/S ratio", chinese: "电解液/硫比", definition: "电解液用量与硫质量的比值，是影响实际锂硫电池能量密度和反应环境的重要参数。" },
];

export const challengesScientificChecks = [
  "不要把穿梭效应描述为唯一问题，需同时呈现动力学、导电性、体积变化和锂负极问题。",
  "不要写催化剂可以完全阻止穿梭，应写减弱穿梭、限制扩散、促进转化和降低副反应。",
  "不要写吸附越强越好，应强调适度吸附与快速转化协同。",
  "必须区分热力学允许与动力学缓慢，避免把自由能和能垒混为一谈。",
  "必须说明 DFT 主要解释原子尺度界面和反应机制，不能替代实际电芯工程评价。",
  "绘制电子和 Li+ 传输路径时，必须保证 Li+ 通过电解液，电子通过外电路或导电网络。",
  "实际高能量密度条件下必须关注硫载量、E/S 比、N/P 比、面积容量和厚电极结构。",
  "锂负极问题应作为锂硫电池实用化的重要瓶颈，而不是附属问题。",
];

export const challengeImpactPaths = [
  ["低导电性", "电子传输困难", "极化增大", "容量释放不足"],
  ["LiPS 溶解", "穿梭效应", "活性硫损失 / 锂负极副反应", "容量衰减"],
  ["动力学缓慢", "Li2S 成核/分解困难", "倍率性能差 / 充放电滞后"],
  ["体积变化", "电极结构破坏", "导电网络失效", "循环稳定性差"],
  ["锂负极不稳定", "枝晶 / 副反应", "安全风险 / 寿命下降"],
];

export const challengePanelDetails = {
  shuttle: {
    narrative:
      "在放电过程中，硫正极生成的长链多硫化物 Li2Sx，尤其是 Li2S8、Li2S6 和 Li2S4，容易溶解于电解液并在电极间迁移。当这些可溶性 LiPS 穿过隔膜到达锂金属负极时，可能被进一步还原并与锂金属发生副反应，造成活性硫损失、锂负极钝化、库伦效率降低和容量快速衰减。",
    chain: ["S8 放电生成长链 LiPS", "长链 LiPS 溶解进入电解液", "LiPS 从硫正极区域向锂负极迁移", "LiPS 在负极发生还原或副反应", "不溶性 Li2S / Li2S2 在负极或隔膜附近沉积", "活性物质损失、锂负极钝化、库伦效率降低", "容量衰减和循环寿命缩短"],
    experiments: ["UV-vis Li2S6 吸附实验：观察多硫化物溶液颜色变化，辅助判断材料对 LiPS 的吸附能力", "H 型扩散池实验：观察 LiPS 跨膜扩散速率", "循环性能：容量衰减速率反映穿梭和反应稳定性", "库伦效率：低库伦效率可能与穿梭和副反应有关", "原位/非原位 Raman：追踪多硫化物中间体变化", "XPS：分析循环后电极或负极表面的硫物种"],
    dft: ["吸附能：判断催化剂/宿主与 LiPS 的结合强度", "Bader 电荷：判断电子转移方向", "差分电荷：可视化界面电荷重排", "DOS / PDOS：分析吸附前后电子结构变化", "COHP：分析 M-S、Li-O、Li-N 等成键作用"],
    caution:
      "不要写完全阻止穿梭；应写减弱穿梭、降低 LiPS 扩散和副反应概率，以及通过吸附和催化转化协同缓解穿梭效应。",
  },
  kinetics: {
    narrative:
      "锂硫电池正极反应不是简单的单步反应，而是经历 S8、长链 LiPS、短链 LiPS、Li2S2 和 Li2S 等多种物种之间的连续转化。该过程包含固-液-固多相反应，涉及电子传输、Li+ 传输、吸附/脱附、S-S 键断裂和 Li2S 成核/沉积等步骤。若转化动力学缓慢，就会导致电极极化增大、倍率性能下降、容量释放不足以及 LiPS 在电解液中的停留时间延长，从而加剧穿梭效应。",
    chain: ["S8 活化困难", "长链 LiPS 转化缓慢", "Li2S4 向 Li2S2 / Li2S 转化受阻", "Li2S 成核和沉积困难", "充电时 Li2S 分解困难", "电极极化增大、倍率性能下降"],
    experiments: ["CV：氧化还原峰电位差越小，通常说明极化较低、反应可逆性较好", "对称电池 CV：可用于评价 LiPS 转化反应动力学", "EIS：电荷转移阻抗降低可说明界面反应动力学改善", "Li2S 成核测试：成核峰电流、沉积容量和成核时间可反映 Li2S 沉积动力学", "Tafel 分析：可辅助比较反应动力学", "GITT：可分析 Li+ 扩散相关行为"],
    dft: ["吉布斯自由能：判断不同反应步骤的热力学趋势和可能限速步骤", "NEB 能垒：评估具体反应路径或扩散/分解过程的动力学势垒", "吸附能：判断反应中间体是否能被有效固定和活化", "DOS / PDOS：判断费米能级附近电子态和轨道耦合", "COHP / ICOHP：分析 S-S 键削弱或 M-S / Li-O 键形成"],
    caution:
      "不要把动力学慢简单等同于反应不发生；应表达为反应热力学可能允许，但动力学阻力较大，需要催化剂降低转化能垒或促进电子/离子传输。",
  },
  volume: {
    narrative:
      "硫在放电过程中逐步转化为 Li2S，伴随密度和相态变化，会引起明显体积变化。电极在反复充放电过程中经历膨胀和收缩，可能导致硫正极颗粒破裂、导电网络断裂、孔道堵塞、催化位点被覆盖以及活性物质与集流体或导电骨架失去接触。这会降低硫利用率并加速容量衰减。",
    chain: ["S8 到 Li2S 转化", "体积变化", "正极结构应力增加", "导电网络断裂 / 孔道堵塞", "活性物质失联", "容量衰减和循环稳定性下降"],
    experiments: ["SEM/TEM：观察循环前后电极形貌", "截面 SEM：观察厚电极结构变化", "XRD/Raman：分析物相变化", "原位/非原位表征：追踪结构演变", "循环性能：观察长期容量衰减", "EIS：结构失稳可能导致阻抗上升"],
    dft: ["DFT 可用于分析 Li2S 与宿主表面的相互作用、成核倾向和界面结合", "吸附能、界面结合能和差分电荷可用于原子尺度解释", "更大尺度的体积膨胀和结构应力通常需要结合有限元、分子动力学或介观模型"],
    caution:
      "不要声称 DFT 可以直接完整模拟整个电极级体积膨胀；DFT 主要用于原子尺度界面作用、吸附和成核趋势分析。",
  },
  anode: {
    narrative:
      "锂金属负极虽然提供高容量锂源，但在循环过程中容易出现不均匀沉积、枝晶生长、不稳定 SEI 形成和副反应消耗。锂硫体系中穿梭来的多硫化物还会与锂金属发生反应，加剧锂负极钝化、活性锂损失和界面不稳定。因此，实用化锂硫电池不仅要解决硫正极问题，也必须关注锂金属负极保护。",
    chain: ["Li 不均匀沉积", "枝晶生长", "SEI 反复破裂和重构", "电解液持续消耗", "多硫化物副反应加剧", "活性锂损失、安全风险和循环寿命下降"],
    experiments: ["对称电池：评价 Li plating/stripping 稳定性", "SEM：观察锂枝晶和沉积形貌", "XPS：分析 SEI 成分和硫物种", "EIS：分析界面阻抗演变", "库伦效率测试：评价锂沉积/剥离效率", "全电池长循环：判断正负极协同稳定性"],
    dft: ["Li 吸附能：判断保护层对 Li 的亲和性", "Li 扩散能垒：分析 Li+ / Li 原子迁移行为", "LiPS 与负极/保护层相互作用：判断副反应倾向", "界面结合能和差分电荷：分析保护层与锂金属界面稳定性"],
    caution:
      "不要把锂硫电池所有衰减都归因于正极穿梭；正极 LiPS 穿梭与锂金属负极不稳定相互耦合，是实用化 Li-S 电池需要同步解决的问题。",
  },
};

export const conductivityPanelDetails = {
  chain: ["S8 活化困难", "电子传输受限", "Li2S 绝缘沉积层形成", "活性位点被覆盖", "电荷转移阻抗增大", "充放电平台极化增大", "容量释放不足和倍率性能下降"],
  experiments: ["EIS：电荷转移阻抗 Rct 变化", "GCD：充放电平台电压差和极化", "CV：峰间距和峰电流", "倍率性能：高电流密度下容量保持", "SEM/TEM：观察 Li2S 沉积形貌", "电导率测试：评价材料本征或复合电极导电性"],
  dft: ["DOS：费米能级附近态密度", "PDOS：金属 d 轨道、S p 轨道或催化位点轨道贡献", "LDOS：定位电子态空间分布", "差分电荷：观察界面电子重排", "COHP：分析关键化学键的成键/反键性质"],
  caution:
    "良好的电子传输有助于提高活性物质利用率，但仍需与吸附、催化活性、孔结构和质量负载平衡；不能简单写成导电性越高一定越好。",
};

export const practicalPanelDetails = {
  metrics: ["面积容量 mAh cm-2", "硫载量 mg cm-2", "电解液/硫比 uL mg-1", "正极硫含量 wt%", "N/P 比或锂负极厚度", "循环电流密度和温度", "软包/扣式电池条件差异"],
  caution:
    "单纯报告高比容量并不能代表实际高能量密度。应结合硫载量、E/S 比、N/P 比、面积容量和循环条件综合评价。",
  dftBoundary:
    "DFT 主要回答原子尺度机制问题，不应直接替代实际电芯工程评价。DFT 可辅助解释吸附、转化和界面作用，但高硫载量和贫电解液条件下的宏观传质、孔结构和电芯能量密度需要结合实验和多尺度模型。",
};
