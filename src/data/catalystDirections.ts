export type CatalystDirection = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  priority: string;
  difficulty: "入门可做" | "中等创新" | "高风险高回报" | "理论优先" | "实验优先";
  tagline: string;
  coreQuestion: string;
  systems: string[];
  innovations: string[];
  experimentRoute: string[];
  dftRoute: string[];
  risks: string[];
  theoryFigureTitle: string;
  theoryFigureCaption: string;
  theoryExplanation: string;
  figureType:
    | "bridge-dual-atom"
    | "multi-center-cluster"
    | "rare-earth-single-atom"
    | "p-band-catalyst"
    | "built-in-electric-field"
    | "passivation-regeneration"
    | "sulfide-edge-vacancy"
    | "mxene-metal"
    | "high-entropy-local-sites"
    | "redox-mediator-cycle"
    | "external-field-grid"
    | "ml-descriptor-flow";
  overviewTitle: string;
  overviewSubtitle: string;
  visualFocus: string[];
  mechanismTags: string[];
  keywords: string[];
};

export const catalystDirections: CatalystDirection[] = [
  {
    id: "dual-atom-bridge-adsorption",
    title: "异核双原子催化剂：M1–M2 协同调控 LiPS 桥联吸附与转化",
    shortTitle: "异核双原子",
    category: "原子级催化",
    priority: "★★★★★",
    difficulty: "中等创新",
    tagline: "双位点桥联吸附，实现“吸附 + 转化”的功能分离与协同。",
    coreQuestion: "双原子位点是否能同时解决 LiPS 吸附和转化问题？M1 负责吸附，M2 负责促进 S–S 键断裂或 Li2S 分解，是否优于单原子？",
    systems: ["Fe–Co–N6/C", "Fe–Ni–N6/C", "Co–Mo–N6/C", "Fe–Mn–N6/C", "Co–Zn–N6/C", "V–Co–N6/C"],
    innovations: ["设计相邻异核双原子桥联吸附位点", "实现 LiPS 吸附位点与转化位点的功能分离", "比较同核双原子、异核双原子与单原子催化差异", "建立 M1–M2 距离、电子结构和 LiPS 吸附强度之间的关系"],
    experimentRoute: ["MOF/COF 前驱体热解", "双金属盐限域合成", "氮掺杂碳锚定双金属位点", "HAADF-STEM", "EXAFS / WT-EXAFS / XANES", "Li2S 成核实验", "对称电池测试", "高硫载量循环测试"],
    dftRoute: ["构建 M1–M2–N6/C 模型", "比较 Li2S6、Li2S4、Li2S2、Li2S 在 M1、M2 和桥位的吸附", "Bader 电荷分析", "差分电荷密度", "PDOS / COHP", "Li2S 分解 NEB"],
    risks: ["双原子相邻结构证明难度较高", "容易被质疑为两种金属共存而非真正相邻双原子", "需要 EXAFS、WT-EXAFS 与多区域 HAADF-STEM 共同支撑"],
    theoryFigureTitle: "异核双原子桥联吸附与协同催化机理示意图",
    theoryFigureCaption: "M1 主吸附，M2 主催化，LiPS 在双位点间形成桥联构型，从而降低转化能垒。",
    theoryExplanation: "图中展示 N 掺杂碳载体上的两个相邻金属位点 M1/M2，Li2S6 分子以桥联方式吸附在两个位点之间。M1 用于锚定 LiPS，M2 用于促进 S–S 键活化或 Li2S 分解；右侧能垒对比突出双原子协同催化优势。",
    figureType: "bridge-dual-atom",
    overviewTitle: "桥联吸附",
    overviewSubtitle: "M1 吸附，M2 活化",
    visualFocus: ["双金属位点", "LiPS 桥联", "能垒下降", "S–S 活化"],
    mechanismTags: ["双原子", "桥联吸附", "Li2S 分解"],
    keywords: ["异核双原子", "LiPS", "桥联吸附", "NEB", "COHP"]
  },
  {
    id: "multi-atom-cluster-catalyst",
    title: "三原子 / 多原子团簇催化剂：从单点催化到多中心协同催化",
    shortTitle: "多原子团簇",
    category: "原子级催化",
    priority: "★★★★☆",
    difficulty: "高风险高回报",
    tagline: "多中心连续催化，更贴近 LiPS 多电子、多步转化本质。",
    coreQuestion: "LiPS 转化是多电子、多步反应，单原子或双原子位点是否不足？三原子或亚纳米团簇能否提供更接近酶催化的多位点路径？",
    systems: ["Fe3–Nx/C", "Co3–Nx/C", "FeCoNi–Nx/C", "Mo–Fe–Co cluster/N-C", "M3 cluster anchored on graphene vacancy"],
    innovations: ["由单中心催化升级为多中心协同催化", "分别设计 Li 端吸附、S 端活化和 Li2S 成核位点", "模拟类酶式多位点转化路径", "比较单原子、双原子与三原子团簇的催化差异"],
    experimentRoute: ["MOF 限域构筑原子簇", "缺陷碳锚定多原子团簇", "配位聚合物热解", "AC-STEM", "EXAFS / XANES", "循环前后结构稳定性测试"],
    dftRoute: ["构建 M3–Nx/C 模型", "对比单原子、双原子和三原子模型", "分析 LiPS 多点吸附构型", "计算逐步转化自由能变化", "通过 NEB 分析 Li2S 分解路径"],
    risks: ["三原子位点更难直接证明", "真实样品中可能同时存在单原子、双原子和团簇", "理论模型应表述为代表性局部位点而非完整真实结构"],
    theoryFigureTitle: "多中心协同催化路径图",
    theoryFigureCaption: "多个相邻活性位点分别承担 Li 吸附、S 活化和 Li2S 成核功能。",
    theoryExplanation: "图中绘制 M1、M2、M3 三个相邻活性位点，并将 S8 → Li2S8 → Li2S6 → Li2S4 → Li2S2 → Li2S 的连续转化路径串联展示。不同颜色强调 Li 端吸附、S–S 键活化和 Li2S 成核分工。",
    figureType: "multi-center-cluster",
    overviewTitle: "多中心协同",
    overviewSubtitle: "吸附、活化、成核分工",
    visualFocus: ["三原子位点", "逐步转化", "多电子反应", "Li2S 成核"],
    mechanismTags: ["多原子", "团簇", "连续转化"],
    keywords: ["三原子", "团簇", "多中心协同", "Li2S 成核"]
  },
  {
    id: "rare-earth-single-atom",
    title: "稀土单原子催化剂：利用 4f/5d 轨道和可变价态调控硫转化",
    shortTitle: "稀土单原子",
    category: "单原子催化",
    priority: "★★★★★",
    difficulty: "高风险高回报",
    tagline: "用稀土 4f/5d 电子态和可变价态探索区别于过渡金属的新机制。",
    coreQuestion: "稀土元素的 4f/5d 轨道和可变价态是否能提供区别于过渡金属的 LiPS 吸附与转化机制？",
    systems: ["Ce–N4/C", "La–N4/C", "Y–N4/C", "Lu–N4/C", "CeO2-x/C", "La-doped CeO2"],
    innovations: ["引入稀土 4f/5d 轨道参与 LiPS 转化", "利用 Ce3+ / Ce4+ 可逆价态调控硫氧化还原", "区别于传统 Fe/Co/Ni/Mn 过渡金属催化", "可结合氧空位和稀土单原子协同设计"],
    experimentRoute: ["稀土单原子负载 N 掺杂碳", "CeO2-x 与导电碳或 MXene 复合", "稀土掺杂金属氧化物", "XAS / XANES / EXAFS", "原位 Raman", "原位 EIS-DRT"],
    dftRoute: ["构建 Ce–N4/C、La–N4/C、Lu–N4/C 模型", "构建 CeO2 与 CeO2-x slab 模型", "分析 4f/5d 态、Bader 电荷和 PDOS", "计算 LiPS 吸附能", "计算 Li2S 分解能垒", "必要时采用 DFT+U 修正稀土 f 电子"],
    risks: ["稀土元素价态复杂", "DFT+U 参数选择需要谨慎", "稀土单原子结构表征要求较高", "导电性和实际负载稳定性需要验证"],
    theoryFigureTitle: "稀土单原子 4f/5d 轨道参与 LiPS 转化示意图",
    theoryFigureCaption: "稀土位点借助 4f/5d 态与可变价态调控双向硫转化。",
    theoryExplanation: "图中绘制 Ce–N4 单原子位点，并展示简化 4f/5d 能级。Ce3+ ↔ Ce4+ 箭头表示可逆价态变化，双向箭头对应放电 SRR 与充电 SER 过程。",
    figureType: "rare-earth-single-atom",
    overviewTitle: "4f/5d 调控",
    overviewSubtitle: "Ce3+ ↔ Ce4+ 双向促进",
    visualFocus: ["Ce–N4 位点", "4f/5d 能级", "价态变化", "双向转化"],
    mechanismTags: ["稀土", "单原子", "可变价态"],
    keywords: ["稀土单原子", "Ce", "4f", "5d", "Ce3+", "Ce4+"]
  },
  {
    id: "p-block-main-group-catalyst",
    title: "p 区 / 主族元素催化剂：跳出传统 d 轨道催化",
    shortTitle: "p 区主族催化",
    category: "电子结构调控",
    priority: "★★★★☆",
    difficulty: "理论优先",
    tagline: "构建 p-band center 理论，拓展 Li-S 催化的电子结构描述框架。",
    coreQuestion: "是否可以利用 p 区元素的空 p 轨道、孤对电子、软硬酸碱特征和极化能力来调控 LiPS？",
    systems: ["Bi single atom / N-C", "SnO2-x / carbon", "Sb2S3 / graphene", "In2O3-x / MXene", "Bi2O3 / carbon", "SnS2 / graphene"],
    innovations: ["跳出传统过渡金属 d-band 理论", "提出 p-band center 或 p-orbital descriptor", "利用主族元素空 p 轨道和孤对电子调控 LiPS", "建立主族元素与 Li/S 端相互作用规律"],
    experimentRoute: ["制备主族金属氧化物、硫化物或硒化物", "构筑主族元素低配位位点或单原子位点", "XPS / XAS / Raman", "LiPS 吸附实验", "Li2S 成核实验", "对称电池动力学测试"],
    dftRoute: ["构建 Bi/Sn/Sb/In–N4/C 模型", "构建主族金属氧化物或硫化物 slab", "计算 p-band center", "分析 Li–O、Li–S、M–S 相互作用", "通过 COHP 判断成键强度", "建立 p 轨道描述符与吸附能的关联"],
    risks: ["Li-S 领域相关文献基础相对较少", "部分主族化合物导电性较差", "p 轨道催化机理需要更强理论支撑", "部分元素存在毒性或成本问题"],
    theoryFigureTitle: "p 轨道中心调控 LiPS 吸附与活化示意图",
    theoryFigureCaption: "主族元素通过 p 轨道电子结构调节 LiPS 吸附强度与 S–S 键活化能力。",
    theoryExplanation: "图中展示 Bi、Sn、Sb 或 In 等主族元素位点与 LiPS 的相互作用，并加入 p-band center 能级示意。下方三段式展示吸附过弱、适度吸附和吸附过强，强调最优吸附区间。",
    figureType: "p-band-catalyst",
    overviewTitle: "p-band 描述符",
    overviewSubtitle: "主族元素调节吸附强度",
    visualFocus: ["p 轨道", "主族元素", "适度吸附", "LiPS 活化"],
    mechanismTags: ["p 区元素", "p-band", "适度吸附"],
    keywords: ["Bi", "Sn", "Sb", "In", "p-band center", "主族元素"]
  },
  {
    id: "built-in-electric-field-heterostructure",
    title: "内建电场异质结：利用 p–n 结 / Mott-Schottky 界面定向驱动 LiPS 转化",
    shortTitle: "内建电场异质结",
    category: "界面工程",
    priority: "★★★★★",
    difficulty: "中等创新",
    tagline: "异质界面内建电场可定向富集 LiPS 并促进界面电子转移。",
    coreQuestion: "能否利用异质结内建电场引导 LiPS 定向迁移、界面富集和逐步转化？",
    systems: ["NiO/Co9S8", "CoS2/ZnS", "Co3O4/TiO2", "TiO2/MoS2", "Ti3C2/TiO2", "Mo2C/MoS2", "VN/TiO2"],
    innovations: ["将异质结构从简单复合提升为界面电场调控", "通过界面电荷重分布引导 LiPS 定向迁移", "利用能带对齐增强界面电子转移", "适合与高硫载量和贫电解液条件结合"],
    experimentRoute: ["原位生长异质结构", "HRTEM 观察异质界面", "XPS 结合能偏移分析", "Kelvin probe / UPS 测量功函数", "原位 Raman 追踪 LiPS 转化", "高硫载量电化学测试"],
    dftRoute: ["构建异质界面模型", "计算界面差分电荷密度", "计算功函数和电势分布", "比较 LiPS 在 A 相、B 相和界面的吸附能", "通过 NEB 分析 Li2S 分解路径"],
    risks: ["异质结不能只是物理混合", "需要证明真实界面和电荷重分布", "界面 DFT 模型存在晶格匹配和计算量问题"],
    theoryFigureTitle: "异质界面内建电场驱动 LiPS 定向迁移与转化机理图",
    theoryFigureCaption: "内建电场推动 LiPS 向界面迁移富集，并促进电子转移和连续转化。",
    theoryExplanation: "图中绘制两相接触形成异质界面，界面处出现电荷重分布，并用箭头标明内建电场方向。LiPS 在电场作用下向界面迁移富集，右侧能带图展示费米能级对齐和内建电势形成。",
    figureType: "built-in-electric-field",
    overviewTitle: "界面电场",
    overviewSubtitle: "LiPS 定向迁移富集",
    visualFocus: ["异质界面", "内建电场", "电荷重分布", "能带对齐"],
    mechanismTags: ["异质结", "内建电场", "界面转化"],
    keywords: ["p-n 结", "Mott-Schottky", "内建电场", "LiPS 富集"]
  },
  {
    id: "catalyst-passivation-regeneration",
    title: "催化剂抗钝化设计：从强吸附转向适度吸附 + 可再生活性位点",
    shortTitle: "抗钝化设计",
    category: "稳定性机制",
    priority: "★★★★★",
    difficulty: "高风险高回报",
    tagline: "真正优异的催化剂应避免被 Li2S/Li2S2 长期覆盖而失活。",
    coreQuestion: "Li2S/Li2S2 沉积是否会覆盖活性位点？催化剂长期循环后是否失活？",
    systems: ["Fe–N/C + surface-cleaning additive", "Co–N/C with weak desorption pathway", "dual-site catalyst with adsorption site + conversion site", "MXene/oxide heterostructure with Li2S migration pathway", "redox mediator + solid catalyst cooperative system"],
    innovations: ["反驳“吸附越强越好”的简单设计逻辑", "将催化剂失活、表面覆盖和活性再生纳入设计框架", "建立适度吸附火山关系", "强调催化剂长期周转能力"],
    experimentRoute: ["循环前后 XPS / XAS 对比", "对称电池循环前后动力学测试", "Li2S 沉积前后活性恢复测试", "原位 Raman / 原位 XAS", "表面清洁电解液添加剂实验", "长期循环后活性位点稳定性分析"],
    dftRoute: ["构建 Li2S 覆盖活性位点模型", "计算 Li2S 脱附能", "计算 Li2S 分解 NEB", "比较覆盖前后 DOS / COHP", "建立吸附强度与催化活性的火山关系"],
    risks: ["不能只用循环性能证明抗钝化", "需要直接证明 Li2S 覆盖和活性再生", "实验设计需要区分结构稳定性和催化再生机制"],
    theoryFigureTitle: "催化剂表面钝化—再生机理与适度吸附火山关系图",
    theoryFigureCaption: "过强吸附会导致 Li2S 覆盖失活，最优催化剂应具备适度吸附与可再生活性位点。",
    theoryExplanation: "图中包含初始活性位点、Li2S/Li2S2 沉积覆盖和再生恢复过程，并用火山关系展示催化性能与 LiPS 吸附强度之间的关系：过弱无法锚定，适度最优，过强导致钝化。",
    figureType: "passivation-regeneration",
    overviewTitle: "钝化—再生",
    overviewSubtitle: "适度吸附优于过强吸附",
    visualFocus: ["Li2S 覆盖", "活性位点再生", "火山关系", "长期稳定性"],
    mechanismTags: ["抗钝化", "适度吸附", "位点再生"],
    keywords: ["催化剂钝化", "Li2S 覆盖", "火山关系", "再生"]
  },
  {
    id: "metal-sulfide-edge-vacancy",
    title: "金属硫化物边缘 / 空位催化：区分晶格硫与 LiPS 硫",
    shortTitle: "硫化物边缘空位",
    category: "缺陷工程",
    priority: "★★★★☆",
    difficulty: "入门可做",
    tagline: "边缘位点和空位往往比惰性基面更关键。",
    coreQuestion: "金属硫化物中的金属位点、晶格硫、边缘位点和硫空位分别如何影响 LiPS 转化？",
    systems: ["MoS2 edge", "VS2", "CoS2", "NiS2", "FeS2", "SnS2", "MoS2-x", "CoS2/ZnS heterostructure"],
    innovations: ["区分基面、边缘和空位位点的催化差异", "区分晶格硫和 LiPS 硫的作用", "从缺陷位点角度解释金属硫化物活性", "结合空位形成能与 LiPS 吸附能分析结构-性能关系"],
    experimentRoute: ["XRD 分析物相", "HRTEM 观察边缘结构", "XPS S 2p 解峰", "EPR 或 Raman 证明硫空位", "LiPS 吸附实验", "Li2S 成核实验", "循环后表面重构表征"],
    dftRoute: ["构建基面、边缘和硫空位模型", "计算 Li2S6 / Li2S4 / Li2S 吸附能", "分析 S–S 键长变化", "计算 M–S COHP", "计算硫空位形成能"],
    risks: ["S 2p 解峰复杂", "硫空位证据需要多种表征支撑", "金属硫化物循环中可能发生表面重构"],
    theoryFigureTitle: "金属硫化物基面-边缘-空位位点催化差异示意图",
    theoryFigureCaption: "基面、边缘和空位位点具有不同的 LiPS 吸附与催化活性。",
    theoryExplanation: "图中绘制层状金属硫化物片层，并分区标出基面、边缘和硫空位。在每类位点附近放置 LiPS 分子，用颜色和活性条形图表示吸附能力和催化活性差异。",
    figureType: "sulfide-edge-vacancy",
    overviewTitle: "边缘 / 空位活性",
    overviewSubtitle: "基面、边缘、空位差异",
    visualFocus: ["MoS2 片层", "边缘位点", "硫空位", "晶格硫"],
    mechanismTags: ["硫化物", "硫空位", "边缘位点"],
    keywords: ["MoS2", "硫空位", "边缘位点", "晶格硫"]
  },
  {
    id: "mxene-metal-lean-electrolyte",
    title: "MXene@金属催化剂：贫电解液下的高导电极性平台",
    shortTitle: "MXene@金属",
    category: "二维载体",
    priority: "★★★★★",
    difficulty: "入门可做",
    tagline: "兼具高导电性、极性表面和可负载活性位点，适合贫电解液体系。",
    coreQuestion: "MXene 的导电性、极性终止基和二维层状结构能否与金属活性位点协同，在贫电解液下仍维持 LiPS 转化？",
    systems: ["Ti3C2Tx@CoS2", "Ti3C2Tx@TiO2", "Ti3C2Tx@MoS2", "Ti3C2Tx@single atom Fe", "Ti3C2O2 with metal atoms", "V2C / Nb2C MXene heterostructures"],
    innovations: ["MXene 作为高导电二维极性平台", "利用 -O / -OH / -F 终止基调控 LiPS 吸附", "负载金属单原子、氧化物或硫化物催化位点", "面向高硫载量和贫电解液实际条件"],
    experimentRoute: ["MXene 刻蚀与剥离", "原位生长金属氧化物或硫化物", "XRD 分析层间距", "XPS 分析终止基", "AFM / TEM 观察片层结构", "贫电解液条件下电化学测试"],
    dftRoute: ["构建 Ti3C2O2、Ti3C2(OH)2、Ti3C2F2 模型", "构建金属单原子或金属团簇负载模型", "比较不同终止基的 LiPS 吸附能", "计算功函数和差分电荷密度", "分析电子传输和界面相互作用"],
    risks: ["MXene 易氧化", "真实终止基组成复杂", "DFT 理想终止基模型与真实体系存在差距", "片层堆叠可能影响活性位点暴露"],
    theoryFigureTitle: "MXene 终止基-金属活性位点协同催化示意图",
    theoryFigureCaption: "MXene 提供导电通道与极性吸附，金属位点负责 LiPS 催化转化。",
    theoryExplanation: "图中绘制 Ti3C2Tx MXene 片层，表面带有 -O、-OH、-F 终止基，并锚定金属单原子或金属硫化物位点。三条路径箭头分别表示电子传输、LiPS 极性吸附和金属位点催化转化。",
    figureType: "mxene-metal",
    overviewTitle: "二维导电平台",
    overviewSubtitle: "终止基吸附 + 金属催化",
    visualFocus: ["MXene 片层", "表面终止基", "金属位点", "贫电解液"],
    mechanismTags: ["MXene", "终止基", "贫电解液"],
    keywords: ["Ti3C2Tx", "MXene", "终止基", "贫电解液"]
  },
  {
    id: "high-entropy-catalyst",
    title: "高熵 / 中熵催化剂：多元素协同调控 LiPS 转化",
    shortTitle: "高熵催化剂",
    category: "多元素协同",
    priority: "★★★★☆",
    difficulty: "中等创新",
    tagline: "多元素构成丰富局域环境，可能突破单一金属催化限制。",
    coreQuestion: "多金属位点能否通过电子结构调节和多位点协同突破单一金属催化限制？",
    systems: ["high-entropy oxide", "high-entropy sulfide", "high-entropy phosphide", "PBA-derived high-entropy catalyst", "FeCoNiMnZn-based catalyst"],
    innovations: ["通过多元素诱导局域环境差异", "构建多种吸附与转化位点", "利用多金属电子结构耦合提升催化性能", "与 PBA 前驱体和高熵衍生物结合"],
    experimentRoute: ["PBA 前驱体合成", "高熵氧化物、硫化物或磷化物衍生", "XRD 判断单相或多相结构", "STEM-EDS 分析元素均匀性", "XPS / XAS 分析价态和配位", "LiPS 吸附与电化学动力学测试"],
    dftRoute: ["构建代表性局部位点模型", "分析不同金属邻域对 LiPS 吸附能的影响", "比较不同局部环境的电子结构", "必要时结合机器学习或簇展开方法", "评估多元素协同对 Li2S 分解能垒的影响"],
    risks: ["不能简单将多元素等同于高熵", "需要严格证明单相或合理多相结构", "DFT 难以直接模拟完整高熵体系", "结构复杂可能导致机理解释分散"],
    theoryFigureTitle: "高熵多位点局域环境协同催化示意图",
    theoryFigureCaption: "多元素构成的局域环境差异带来丰富活性位点和多条反应路径。",
    theoryExplanation: "图中绘制由 Fe、Co、Ni、Mn、Zn 等多种元素组成的晶格，并放大若干局部区域，展示不同邻近元素组合带来的吸附强度和电子结构差异。雷达图表示吸附、导电、极性和活化能力。",
    figureType: "high-entropy-local-sites",
    overviewTitle: "局域环境多样性",
    overviewSubtitle: "多元素、多位点、多路径",
    visualFocus: ["多元素晶格", "局部位点", "电子结构分布", "协同催化"],
    mechanismTags: ["高熵", "PBA", "多元素协同"],
    keywords: ["高熵", "中熵", "PBA", "多金属", "局域环境"]
  },
  {
    id: "redox-mediator-solid-catalyst",
    title: "红氧媒介体 + 固体催化剂协同：解决贫电解液下固-固转化难题",
    shortTitle: "红氧媒介体协同",
    category: "反应路径调控",
    priority: "★★★★☆",
    difficulty: "高风险高回报",
    tagline: "固体催化位点与可移动红氧媒介体协同，提高高载量贫电解液体系反应效率。",
    coreQuestion: "在贫电解液和高硫载量下，固体催化剂接触不到所有 S/Li2S，是否可以引入可移动的红氧媒介体？",
    systems: ["solid catalyst + soluble mediator", "iodide/bromide-based mediator", "organometallic mediator", "quinone-like mediator", "CoPcCl-like soluble single atom catalyst"],
    innovations: ["将固体催化和可溶媒介体协同结合", "利用可移动媒介体改善固-固转化受限问题", "适合高硫载量和贫电解液条件", "构建长程反应传递路径"],
    experimentRoute: ["构建固体宿主 + 可溶媒介体体系", "LiPS 转化动力学测试", "自放电测试", "穿梭效应评估", "负极副反应评估", "高载量贫电解液测试"],
    dftRoute: ["计算媒介体与 LiPS 的反应能", "估算媒介体氧化还原电位", "评估媒介体与锂金属副反应风险", "计算反应路径自由能变化", "比较有无媒介体条件下 LiPS 转化能垒"],
    risks: ["可溶媒介体可能加剧穿梭效应", "需要证明媒介体不是牺牲性添加剂", "长期稳定性和负极兼容性必须验证"],
    theoryFigureTitle: "可溶性红氧媒介体与固体催化剂协同催化循环图",
    theoryFigureCaption: "媒介体提供可移动反应通道，固体催化剂提供界面活性位点，两者协同促进 LiPS 转化。",
    theoryExplanation: "图中绘制固体硫正极、固定催化位点和电解液中的可溶性红氧媒介体。媒介体在电极和 LiPS 之间循环往返，承担电子/反应传递作用；固体催化剂提供表面吸附和转化位点。",
    figureType: "redox-mediator-cycle",
    overviewTitle: "可移动反应通道",
    overviewSubtitle: "媒介体 + 固体催化剂",
    visualFocus: ["固体催化位点", "可溶媒介体", "循环箭头", "贫电解液"],
    mechanismTags: ["红氧媒介体", "固-固转化", "高载量"],
    keywords: ["redox mediator", "贫电解液", "固体催化剂", "LiPS 转化"]
  },
  {
    id: "external-field-assisted-catalysis",
    title: "外场辅助催化：磁场、电场、光场 / 压电场调控 LiPS 动力学",
    shortTitle: "外场辅助催化",
    category: "外场调控",
    priority: "★★★★☆",
    difficulty: "高风险高回报",
    tagline: "通过外部或内生场改变电荷分离、传输与反应动力学。",
    coreQuestion: "是否可以利用外部磁场、内建电场、光生载流子或压电极化场，加速 LiPS 转化和 Li2S 分解？",
    systems: ["built-in electric field heterostructure", "external magnetic field + magnetic catalyst", "photothermal / photo-assisted catalyst", "piezoelectric catalyst", "ferroelectric host"],
    innovations: ["将电场、磁场、光场和压电场引入 Li-S 催化", "通过场效应调控 LiPS 迁移和电荷分布", "减轻 Li2S 钝化并降低极化", "拓展传统固体催化剂设计边界"],
    experimentRoute: ["构建场响应催化材料", "设计有场/无场对照测试", "搭建磁场、光照或压电测试装置", "分析极化、电荷转移阻抗和 Li+ 扩散", "计算表观活化能", "评估实际电池封装可行性"],
    dftRoute: ["计算外电场下 LiPS 吸附能变化", "分析磁性态与 LiPS 吸附关系", "模拟极化表面对 LiPS 的影响", "计算界面电势分布", "评估场效应对 Li2S 分解能垒的影响"],
    risks: ["实验装置复杂", "需要区分热效应、磁效应、电场效应和真实催化效应", "实际电池应用合理性需要谨慎论证"],
    theoryFigureTitle: "外场辅助 LiPS 转化动力学调控示意图",
    theoryFigureCaption: "不同类型的场通过调控电荷分布与迁移行为加快双向硫转化。",
    theoryExplanation: "图中使用四宫格结构，分别展示内建电场、外加磁场、压电极化场和光生载流子。每一格都有场方向、LiPS 转化箭头和动力学加速标识，突出外场对扩散、吸附和电子转移的调控作用。",
    figureType: "external-field-grid",
    overviewTitle: "场效应调控",
    overviewSubtitle: "电 / 磁 / 光 / 压电协同",
    visualFocus: ["四宫格", "场方向", "LiPS 加速", "极化调控"],
    mechanismTags: ["外场", "磁场", "压电场", "光辅助"],
    keywords: ["外场辅助", "磁场", "压电", "光生载流子", "电场"]
  },
  {
    id: "descriptor-machine-learning-screening",
    title: "描述符 + 机器学习筛选催化剂：从试错到可预测设计",
    shortTitle: "描述符 + 机器学习",
    category: "数据驱动设计",
    priority: "★★★★★",
    difficulty: "理论优先",
    tagline: "用反应描述符和机器学习实现高通量预测与实验验证闭环。",
    coreQuestion: "能否建立可迁移的 Li-S 催化剂描述符，用于预测 LiPS 吸附、Li2S 分解和催化活性？",
    systems: ["single atom catalysts", "dual atom catalysts", "metal oxides", "metal sulfides", "MXene-based catalysts", "heterostructures"],
    innovations: ["从经验试错转向可预测设计", "建立 LiPS 吸附和 Li2S 分解相关描述符", "结合 DFT 和机器学习筛选候选催化剂", "形成计算预测与实验验证闭环"],
    experimentRoute: ["基于高通量计算筛选候选体系", "选择 2–3 个高潜力催化剂实验验证", "建立计算-实验闭环数据库", "用 Li2S 成核、对称电池和高硫载量测试验证预测结果"],
    dftRoute: ["计算 E_ads(Li2S4)", "计算 E_ads(Li2S)", "计算 Li2S decomposition barrier", "提取 d-band center / p-band center", "计算 Bader charge", "计算 M–S ICOHP", "建立回归模型或分类模型", "分析描述符与催化性能之间的相关性"],
    risks: ["数据量不足可能导致模型泛化能力弱", "DFT 参数一致性要求高", "描述符可能只适用于特定材料体系", "实验验证成本较高"],
    theoryFigureTitle: "描述符驱动的高通量筛选与机器学习设计流程图",
    theoryFigureCaption: "从候选材料库到 DFT 描述符，再到机器学习筛选和实验验证，形成可预测设计闭环。",
    theoryExplanation: "图中绘制候选材料库 → DFT 计算 → 描述符提取 → 机器学习模型 → 优选催化剂 → 实验验证的完整流程，并用简化散点图表示描述符与性能指标之间的相关性。",
    figureType: "ml-descriptor-flow",
    overviewTitle: "数据驱动筛选",
    overviewSubtitle: "DFT 描述符 → ML → 实验验证",
    visualFocus: ["材料库", "DFT 描述符", "机器学习模型", "实验闭环"],
    mechanismTags: ["DFT", "机器学习", "描述符"],
    keywords: ["机器学习", "描述符", "高通量", "DFT", "NEB", "Bader", "ICOHP"]
  }
];

