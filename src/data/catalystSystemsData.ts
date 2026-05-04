export const catalystSystemTabs = [
  { id: "design-principles", label: "设计原则", title: "锂硫电池催化剂应该如何设计？", description: "锂硫电池催化剂设计的目标不是单纯提高某一个指标，而是协调 LiPS 吸附、催化转化、电子/离子传输、结构稳定性和实际工况适配。理想催化剂应能在正极区域固定可溶性 LiPS，促进长链 LiPS 向短链物种和 Li2S 转化，降低 Li2S 成核和分解阻力，同时保持良好的导电性和结构稳定性。" },
  { id: "overview", label: "体系总览", title: "锂硫电池催化剂体系全景图", description: "锂硫电池催化剂体系可以从活性位点尺度、材料组成、界面结构和功能机制等角度进行分类。不同体系并不是互相排斥的，例如单原子位点可以负载在缺陷碳或 MXene 上，异质结也可以结合金属氧化物、硫化物或氮化物。" },
  { id: "single-atom", label: "单原子催化剂", title: "单原子催化剂 SACs：原子级活性位点调控 LiPS 转化", description: "单原子催化剂通过孤立金属中心构建明确的活性位点，可用于研究金属配位环境、电子结构和 LiPS 转化机制。" },
  { id: "dual-atom", label: "双原子催化剂", title: "双原子催化剂 DACs：相邻双金属位点的协同催化", description: "双原子催化剂通过相邻同核或异核金属位点实现多点吸附和协同转化，但结构证明和模型构建难度较高。" },
  { id: "heterostructure", label: "异质结催化剂", title: "异质结催化剂：界面电荷重分布与协同催化", description: "异质结通过两相界面调控电子结构、功函数差异和界面极性，有助于 LiPS 吸附和转化。" },
  { id: "metal-oxides", label: "金属氧化物", title: "金属氧化物催化剂：极性吸附与氧空位调控", description: "金属氧化物通常具有较强极性，可与 LiPS 产生化学相互作用；氧空位和异质结构可进一步改善吸附和催化转化。" },
  { id: "metal-sulfides", label: "金属硫化物", title: "金属硫化物催化剂：极性位点与硫化物界面催化", description: "金属硫化物可通过金属位点、硫位点、边缘位点和硫空位参与 LiPS 吸附与转化。" },
  { id: "metal-nitrides", label: "金属氮化物", title: "金属氮化物催化剂：高导电性与金属-N 位点调控", description: "金属氮化物通常具有较好导电性和可调电子结构，有助于改善界面电荷转移和 LiPS 转化动力学。" },
  { id: "phosphides-carbides", label: "磷化物/碳化物", title: "金属磷化物与碳化物：电子结构调控与高导电催化", description: "金属磷化物和碳化物可通过较好导电性和金属中心电子结构调控促进 LiPS 转化。" },
  { id: "mxenes", label: "MXene 材料", title: "MXene 催化/宿主材料：二维导电骨架与表面终止基调控", description: "MXene 具有二维导电结构和可调表面终止基，可用于 LiPS 吸附、层间限域和异质结构构筑。" },
  { id: "defect-carbon", label: "缺陷碳与杂原子掺杂碳", title: "缺陷碳与杂原子掺杂碳：从物理限域到化学吸附", description: "缺陷碳和杂原子掺杂碳可提供导电网络、孔结构、极性位点和单原子锚定位点。" },
  { id: "multicomponent", label: "多组分/高熵催化体系", title: "多组分与高熵催化体系：复杂组成下的协同调控", description: "多组分或高熵体系通过复杂组成和多金属协同调控吸附与催化，但结构-活性关系更难解析。" },
  { id: "comparison-guide", label: "体系对比与选择指南", title: "如何根据研究目标选择催化剂体系？", description: "不同催化剂体系在吸附、催化、导电、结构明确性、表征难度和 DFT 建模难度上各有差异，需要根据研究目标选择。" }
];

export const catalystDesignPrinciples = [
  { id: "moderate-adsorption", title: "适度吸附", description: "催化剂需要与 LiPS 产生足够相互作用，以降低其自由扩散和穿梭概率。但吸附过强可能阻碍中间体迁移与后续转化，甚至导致活性位点被覆盖。", relatedDFT: ["吸附能", "Bader 电荷", "差分电荷", "COHP"], caution: "不要写成吸附越强越好。" },
  { id: "fast-conversion", title: "快速转化", description: "催化剂应促进 S8 / LiPS / Li2S 之间的多步转化，特别是 Li2S4 -> Li2S2 -> Li2S 和 Li2S 分解过程，降低电极极化。", relatedDFT: ["自由能", "NEB 能垒", "DOS / PDOS", "COHP"], caution: "应结合动力学测试与计算路径共同证明。" },
  { id: "electronic-conductivity", title: "良好导电性", description: "高效催化过程需要电子快速传输。金属化合物、MXene、导电碳骨架和异质结构常用于改善电荷传输。", relatedDFT: ["DOS", "PDOS", "LDOS"], caution: "导电性好不等于催化活性一定高。" },
  { id: "accessible-sites", title: "丰富可接近活性位点", description: "活性位点不仅要数量多，还要能被 LiPS 接触。埋藏在内部或被沉积产物覆盖的位点难以发挥作用。", relatedDFT: ["吸附构型", "表面暴露位点", "Li2S 成核模型"], caution: "需要结合结构表征和反应后表征。" },
  { id: "structural-stability", title: "结构稳定性", description: "催化剂需在反复充放电、多硫化物环境和电解液环境中保持结构稳定，避免溶解、团聚或钝化。", relatedDFT: ["结合能", "缺陷形成能", "界面稳定性"], caution: "高初始活性不代表长期稳定。" },
  { id: "practical-compatibility", title: "实际工况适配", description: "在高硫载量、贫电解液、厚电极和有限锂负极条件下，催化剂还需兼顾传质、孔结构、低添加量和可规模化制备。", relatedDFT: ["机制解释", "界面作用分析"], caution: "DFT 不能替代电芯级工程评价。" }
];

export const catalystRadarData = [
  { metric: "LiPS 吸附", SACs: 82, DACs: 86, 异质结: 78, 氧化物: 88, 硫化物: 82, 氮化物: 62, MXene: 78, 掺杂碳: 58 },
  { metric: "催化转化", SACs: 80, DACs: 88, 异质结: 84, 氧化物: 66, 硫化物: 82, 氮化物: 78, MXene: 68, 掺杂碳: 52 },
  { metric: "导电性", SACs: 72, DACs: 70, 异质结: 78, 氧化物: 45, 硫化物: 70, 氮化物: 88, MXene: 92, 掺杂碳: 86 },
  { metric: "位点可接近", SACs: 76, DACs: 68, 异质结: 72, 氧化物: 70, 硫化物: 75, 氮化物: 70, MXene: 76, 掺杂碳: 82 },
  { metric: "结构稳定", SACs: 62, DACs: 58, 异质结: 68, 氧化物: 78, 硫化物: 65, 氮化物: 70, MXene: 64, 掺杂碳: 82 },
  { metric: "工况适配", SACs: 62, DACs: 54, 异质结: 68, 氧化物: 62, 硫化物: 66, 氮化物: 68, MXene: 74, 掺杂碳: 86 }
];

export const catalystSystems = [
  {
    id: "single-atom", name: "单原子催化剂", abbreviation: "SACs",
    summary: "通过孤立金属原子构建原子级活性位点，常见结构包括 M-N4/C、M-N3/C、M-N2/C、M-S4/C 或金属原子锚定在碳空位/缺陷位点。",
    coreQuestions: ["金属是否真正以单原子形式存在？", "金属单原子的配位环境是什么？", "单原子位点是否稳定，是否会团聚或流失？", "单原子位点与 LiPS 的相互作用是通过 M-S、Li-N、Li-O 还是其他键合作用实现？", "单原子位点是否只是吸附 LiPS，还是能促进转化反应？"],
    representativeStructures: ["Fe-N4/C", "Co-N4/C", "Ni-N4/C", "Mn-N4/C", "M-N3/C", "M-N2/C", "M-S4/C", "M anchored on graphene vacancy", "M anchored on N-doped carbon vacancy"],
    activeSites: ["M-Nx 金属中心", "M-Sx 配位中心", "碳空位锚定位点", "邻近 N/S/O 配位原子"],
    mechanisms: ["适度化学吸附 LiPS", "促进界面电荷转移", "调控 S-S / Li-S 键强度", "降低 Li2S 成核和分解阻力"],
    advantages: ["金属利用率高", "活性位点结构相对明确", "便于建立 DFT 模型", "金属中心电子结构可调", "有利于研究结构-活性关系"],
    limitations: ["合成和稳定性要求高", "单原子容易在高温或循环过程中团聚", "仅凭 HAADF-STEM 局部图像不足以证明整体单原子结构", "单原子负载量过高可能导致团簇或颗粒", "活性位点可能被 Li2S 或硫物种覆盖而钝化"],
    recommendedCharacterization: ["AC-HAADF-STEM", "XANES", "EXAFS", "WT-EXAFS", "XPS", "ICP-OES/MS", "XRD", "EDS mapping", "Raman"],
    recommendedDFTModels: ["M-N4/C", "M-N3/C", "M-N2/C", "M embedded in graphene vacancy", "M anchored on N-doped defect graphene"],
    recommendedDFTAnalysis: ["Li2S6 / Li2S4 / Li2S 吸附能", "M-S 键长、Li-N 距离", "Bader 电荷转移", "差分电荷", "DOS / PDOS", "COHP / ICOHP", "Li2S4 -> Li2S2 -> Li2S 自由能路径", "Li2S 分解 NEB 能垒"],
    applicableQuestions: ["原子级活性位点机制", "金属中心调控", "结构-活性关系", "LiPS 转化路径"],
    caution: "HAADF-STEM 中看到孤立亮点并不能单独证明整个样品都是单原子催化剂。单原子结构需要结合 XAS、XPS、ICP、XRD 和多区域统计综合判断。"
  },
  {
    id: "dual-atom", name: "双原子催化剂", abbreviation: "DACs",
    summary: "通过构建相邻的同核或异核金属位点，实现比单原子更复杂的多位点吸附和协同催化，可能同时稳定 LiPS 的 Li 端和 S 端。",
    coreQuestions: ["两个金属原子是否相邻？", "是同核双原子还是异核双原子？", "是否存在 M1-M2 直接相互作用？", "双金属位点是否产生协同作用，而不是两个孤立单原子的简单叠加？", "LiPS 是吸附在单一金属位点，还是桥连双金属位点？"],
    representativeStructures: ["M1-M2-N6/C", "M2-N5/C", "Fe-Co dual atom site", "Co-Ni dual atom site", "Homonuclear M2 site", "Heteronuclear M1-M2 site", "Dual atom embedded in graphene vacancy"],
    activeSites: ["M1-M2 双金属中心", "桥连位点", "金属-N 配位环境", "异核电子差异位点"],
    mechanisms: ["多点吸附 LiPS", "桥连构型活化 S-S 键", "调控 Li-S 键和电荷转移", "降低特定反应路径能垒"],
    advantages: ["可实现多点吸附", "异核双金属可调控电子结构差异", "可能同时稳定 Li 端和 S 端", "有利于降低特定反应路径能垒"],
    limitations: ["结构证明难度高", "双原子距离和配位环境难以精确控制", "容易与单原子混合位点、团簇或纳米颗粒混淆", "DFT 模型选择较多，需避免过度拟合"],
    recommendedCharacterization: ["AC-HAADF-STEM 统计", "EXAFS 拟合", "WT-EXAFS", "XANES", "XPS", "EELS / STEM-EDS", "ICP", "XRD"],
    recommendedDFTModels: ["M1-M2-N6/C", "M2-N5/C", "M1M2 embedded in graphene vacancy", "Homonuclear dual atom model", "Heteronuclear dual atom model"],
    recommendedDFTAnalysis: ["LiPS 在 M1 / M2 / M1-M2 桥连构型吸附能", "S 端靠近金属与 Li 端靠近 N/O/S 位点比较", "M1/M2 Bader 电荷差异", "差分电荷", "PDOS", "COHP", "自由能路径比较单原子与双原子催化差异"],
    applicableQuestions: ["协同催化", "异核金属调控", "Li/S 双端吸附", "桥连吸附构型"],
    caution: "双原子催化剂的核心不是“有两个金属元素”，而是证明相邻双金属位点及其协同作用。"
  },
  {
    id: "heterostructure", name: "异质结催化剂", abbreviation: "Heterostructures",
    summary: "通过两种或多种不同材料之间的界面，实现电子结构调控、内建电场、界面极性增强和多位点协同催化。关键不是简单物理混合，而是界面作用。",
    coreQuestions: ["是否真正形成异质界面？", "两相是否只是物理混合，还是形成紧密界面？", "界面处是否存在电荷重分布？", "功函数差异或内建电场是否促进电子转移？", "LiPS 是吸附在单一相表面，还是异质界面区域？"],
    representativeStructures: ["Metal oxide / metal sulfide", "Metal sulfide / carbon", "Metal oxide / carbon", "MXene / metal compound", "MoS2 / Mo2C", "CoS2 / CoO", "TiO2 / TiN", "TiO2 / Ti3C2 MXene"],
    activeSites: ["异质界面", "两相边界金属位点", "界面缺陷", "内建电场区域"],
    mechanisms: ["界面电荷重分布", "功函数差异驱动电子转移", "协同吸附 Li 端和 S 端", "导电相与极性相互补"],
    advantages: ["可结合不同材料优点", "界面电子结构可调", "可能形成内建电场", "有利于 LiPS 吸附和转化协同", "可改善导电性与极性之间的矛盾"],
    limitations: ["结构复杂，界面证明难度高", "不同相比例和界面接触质量影响大", "DFT 界面模型构建复杂", "晶格匹配、应变和界面终止方式会影响计算结果"],
    recommendedCharacterization: ["XRD", "HRTEM", "SAED", "STEM-EDS mapping", "XPS", "Raman", "UPS / Kelvin probe", "Mott-Schottky", "原位/非原位 XPS/Raman"],
    recommendedDFTModels: ["两个低指数晶面的 slab", "晶格匹配界面超胞", "含真空层界面模型", "LiPS adsorbed at interface", "单相 A / 单相 B 对照表面"],
    recommendedDFTAnalysis: ["界面结合能", "界面差分电荷", "功函数变化", "Bader 电荷转移", "界面与单相吸附能比较", "DOS / PDOS 界面态", "自由能路径和 NEB 能垒", "内建电场方向示意"],
    applicableQuestions: ["界面工程", "电子结构调控", "导电-极性协同", "内建电场"],
    caution: "异质结不是两种材料简单混合。必须通过 HRTEM、XPS、元素映射和 DFT 界面电荷分析等证据说明界面作用。"
  },
  {
    id: "metal-oxides", name: "金属氧化物", abbreviation: "MOs",
    summary: "金属氧化物通常具有较强极性，能够与 LiPS 发生化学相互作用；部分过渡金属氧化物还可通过可变价态、氧空位和表面金属位点参与多硫化物转化。",
    coreQuestions: ["氧化物晶相是什么？", "金属价态是否可调？", "是否存在氧空位？", "氧空位是否增强 LiPS 吸附和转化？", "导电性不足如何弥补？", "吸附是否适中，是否会造成位点钝化？"],
    representativeStructures: ["TiO2", "MnO2", "Co3O4", "Fe2O3", "V2O5", "CeO2", "MoO3", "Defective metal oxides", "Oxygen-vacancy-rich oxides"],
    activeSites: ["表面金属位点", "晶格氧", "氧空位", "缺陷位点"],
    mechanisms: ["极性吸附 LiPS", "氧空位调控电子态", "可变价金属促进电荷转移", "与导电碳或 MXene 复合弥补导电短板"],
    advantages: ["极性强，有利于 LiPS 吸附", "可通过氧空位调控电子结构", "金属中心可参与电荷转移", "易与碳材料构建复合宿主"],
    limitations: ["部分氧化物导电性不足", "强吸附可能影响后续转化", "氧空位含量和稳定性需证明", "过多氧化物添加可能降低整体能量密度"],
    recommendedCharacterization: ["XRD", "XPS 金属价态和 O 1s", "EPR", "Raman", "HRTEM", "BET", "XAS", "UV-vis Li2S6 吸附实验", "电导率测试"],
    recommendedDFTModels: ["TiO2 (101)", "MnO2 (110)", "Co3O4 (111)", "Fe2O3 (001)", "含氧空位表面", "掺杂氧化物表面", "氧化物/碳复合界面"],
    recommendedDFTAnalysis: ["LiPS 在金属位点和氧位点的吸附构型", "氧空位前后吸附能变化", "Bader 电荷和差分电荷", "DOS 分析氧空位电子态", "DFT+U 处理提示", "自由能和 NEB 分析"],
    applicableQuestions: ["氧空位", "极性吸附", "金属价态调控", "低导电极性相复合"],
    caution: "氧空位不能仅凭 XPS O 1s 一个峰判断，最好结合 EPR、Raman、XAS 和 DFT 缺陷模型综合分析。"
  },
  {
    id: "metal-sulfides", name: "金属硫化物", abbreviation: "MSx",
    summary: "金属硫化物通常具有较强极性和较好的催化转化能力，金属中心和硫位点可与 LiPS 发生相互作用，促进 S-S 键活化和 Li2S 沉积/分解。",
    coreQuestions: ["金属硫化物的晶相和价态是什么？", "是否存在硫空位或边缘活性位点？", "金属-S 结构是否稳定？", "硫化物是否会与电池反应物发生不可逆副反应？", "其导电性是否足以支撑快速转化？"],
    representativeStructures: ["CoS2", "MoS2", "VS2", "NiS2", "FeS2", "TiS2", "SnS2", "Metal sulfide / carbon composites", "Sulfur vacancy-rich sulfides"],
    activeSites: ["金属位点", "硫位点", "硫空位", "边缘位点"],
    mechanisms: ["极性位点吸附 LiPS", "边缘/空位活化 S-S 键", "促进 Li2S 成核和分解", "与碳或 MXene 形成导电界面"],
    advantages: ["对 LiPS 有较强化学相互作用", "部分硫化物导电性较好", "边缘位点和硫空位可调控催化活性", "适合与碳材料、MXene 或异质结构复合"],
    limitations: ["结构稳定性需验证", "不同晶相性能差异大", "过强相互作用可能导致表面覆盖或钝化", "某些硫化物可能在电化学环境中发生结构演变"],
    recommendedCharacterization: ["XRD", "XPS 金属价态和 S 2p", "Raman", "HRTEM", "EPR", "XAS", "SEM/TEM", "UV-vis Li2S6 吸附实验", "对称电池和 Li2S 成核测试"],
    recommendedDFTModels: ["MoS2 basal plane", "MoS2 edge site", "CoS2 surface", "VS2 surface", "sulfur vacancy-rich sulfide surface", "sulfide/carbon interface", "sulfide/MXene interface"],
    recommendedDFTAnalysis: ["LiPS 在金属、硫、空位和边缘位点吸附", "硫空位前后吸附能变化", "S-S 键长变化", "Bader 和差分电荷", "DOS / PDOS", "COHP 分析 M-S 和 S-S 键", "Li2S 成核和分解路径"],
    applicableQuestions: ["硫空位", "边缘位点", "LiPS 转化", "硫化物界面催化"],
    caution: "金属硫化物中的硫元素与电池反应中的硫物种不同，表征和 DFT 分析中要区分材料晶格硫与电化学反应中间体。"
  },
  {
    id: "metal-nitrides", name: "金属氮化物", abbreviation: "MNx",
    summary: "金属氮化物通常具有较好的导电性和可调电子结构，可作为锂硫电池中的催化/导电功能材料，改善低导电性和转化动力学缓慢问题。",
    coreQuestions: ["金属氮化物是否具有足够导电性？", "表面金属位点和 N 位点如何与 LiPS 作用？", "氮化物是否稳定？", "金属-N 电子结构如何影响 LiPS 转化？", "是否需要与碳材料或其他极性材料复合？"],
    representativeStructures: ["TiN", "VN", "MoN", "CoN", "Ni3N", "FeNx", "Metal nitride / carbon composites", "Nitride heterostructures"],
    activeSites: ["表面金属位点", "N 位点", "金属-N 键", "缺陷位点"],
    mechanisms: ["提高界面电子传输", "金属-N 位点与 LiPS 相互作用", "降低电荷转移阻抗", "与极性位点协同"],
    advantages: ["导电性通常较好", "金属中心电子结构可调", "有利于界面电荷转移", "可与极性/催化位点协同"],
    limitations: ["部分氮化物表面极性或 LiPS 吸附能力有限", "合成条件较苛刻", "表面氧化或结构演变需关注", "单独使用时可能缺乏孔结构和硫负载能力"],
    recommendedCharacterization: ["XRD", "XPS 金属价态和 N 1s", "HRTEM", "电导率测试", "BET", "XAS", "EIS"],
    recommendedDFTModels: ["TiN surface", "VN surface", "Ni3N surface", "nitride/carbon interface", "nitride/oxide heterostructure"],
    recommendedDFTAnalysis: ["LiPS 在金属位点和 N 位点的吸附", "差分电荷和 Bader 电荷", "DOS / PDOS 分析导电性", "自由能路径分析 LiPS 转化", "COHP 分析界面成键"],
    applicableQuestions: ["导电催化", "金属-N 位点", "界面电荷转移", "低极化电极"],
    caution: "导电性好不等于催化活性一定高，需要结合 LiPS 吸附、反应路径和实验动力学测试综合判断。"
  },
  {
    id: "phosphides-carbides", name: "磷化物/碳化物", abbreviation: "MPx / MCx",
    summary: "金属磷化物和碳化物通常具有较好的电子导电性，并可通过金属-P 或金属-C 键调控金属中心电子结构，用于催化转化和导电增强。",
    coreQuestions: ["相结构是否清晰？", "表面是否氧化或重构？", "LiPS 作用位点是什么？", "是否促进转化而不只是导电增强？"],
    representativeStructures: ["CoP", "Ni2P", "FeP", "MoP", "Mo2C", "TiC", "WC", "Metal phosphide/carbon composites", "Metal carbide heterostructures"],
    activeSites: ["金属位点", "P 位点", "C 位点", "界面位点"],
    mechanisms: ["导电增强", "金属中心电子结构调控", "促进 LiPS 转化动力学", "降低电极极化"],
    advantages: ["导电性较好", "金属中心电子结构可调", "有利于电荷转移", "可与碳材料或异质结构复合"],
    limitations: ["与 LiPS 的相互作用需具体分析", "表面氧化或重构可能影响活性", "合成和相纯度控制重要", "过量无活性质量会降低电极能量密度"],
    recommendedCharacterization: ["XRD", "XPS P 2p、C 1s 和金属价态", "HRTEM", "Raman", "XAS", "电导率测试", "EIS", "CV", "Li2S 成核"],
    recommendedDFTModels: ["Metal phosphide surface", "Metal carbide surface", "Phosphide/carbon interface", "Carbide/carbon interface", "Defective phosphide/carbide surface"],
    recommendedDFTAnalysis: ["LiPS 吸附能", "电子转移和差分电荷", "DOS / PDOS", "COHP", "自由能路径", "Li2S 成核趋势"],
    applicableQuestions: ["高导电催化", "电子结构调控", "碳化物界面", "磷化物活性位点"],
    caution: "磷化物和碳化物常被强调导电性和电子结构优势，但仍需证明其对 LiPS 转化具有真实催化作用。"
  },
  {
    id: "mxenes", name: "MXene 材料", abbreviation: "MXenes",
    summary: "MXene 是二维过渡金属碳化物、氮化物或碳氮化物，具有较高导电性、层状结构和丰富表面终止基，可通过 -O、-OH、-F 等官能团调控 LiPS 吸附。",
    coreQuestions: ["MXene 是否成功剥离或构建层状结构？", "表面终止基是什么？", "层间距是否适合 Li+ 传输和硫物种固定？", "MXene 是否会堆叠，降低活性面积？", "表面终止基如何影响 LiPS 吸附和电子结构？"],
    representativeStructures: ["Ti3C2Tx", "Ti3C2O2", "Ti3C2(OH)2", "Ti3C2F2", "V2C", "Mo2C", "Nb2C", "MXene/metal oxide", "MXene/metal sulfide", "MXene/carbon composites"],
    activeSites: ["表面终止基", "Ti/V/Mo 金属位点", "层间空间", "异质界面"],
    mechanisms: ["二维导电骨架传输电子", "终止基与 Li 端相互作用", "层间限域硫物种", "与金属化合物形成异质界面"],
    advantages: ["导电性好", "二维结构有利于构建连续电子通路", "表面终止基可调", "可与金属化合物形成异质结构", "层间空间可用于限域硫物种"],
    limitations: ["容易层间堆叠", "表面终止基复杂且难以完全控制", "-F 终止基可能对 LiPS 吸附不一定有利", "氧化稳定性需关注", "实际样品通常是混合终止基，DFT 简化模型需谨慎解释"],
    recommendedCharacterization: ["XRD", "SEM/TEM", "AFM", "XPS", "Raman", "BET", "Zeta potential", "UV-vis Li2S6 吸附实验", "EIS"],
    recommendedDFTModels: ["Ti3C2", "Ti3C2O2", "Ti3C2(OH)2", "Ti3C2F2", "Mixed termination model", "MXene/oxide heterostructure", "MXene/sulfide heterostructure"],
    recommendedDFTAnalysis: ["不同终止基对 LiPS 吸附能的影响", "Li 端与 O/OH/F 位点相互作用", "差分电荷和 Bader 电荷", "DOS / PDOS", "表面功函数", "异质结界面电荷转移", "Li+ 扩散路径"],
    applicableQuestions: ["表面官能团", "层间限域", "异质界面", "二维导电骨架"],
    caution: "真实 MXene 通常具有混合终止基，DFT 中的纯 -O、-OH 或 -F 终止模型是简化近似，解释时必须说明。"
  },
  {
    id: "defect-carbon", name: "缺陷碳与杂原子掺杂碳", abbreviation: "Defect / Doped Carbon",
    summary: "碳材料常作为导电宿主和硫载体。通过引入缺陷、孔结构和 N/S/P/B 等杂原子掺杂，可提高极性、调控电子结构并增强 LiPS 相互作用。",
    coreQuestions: ["碳材料是主要提供导电/限域，还是具有真实化学吸附/催化作用？", "缺陷类型是什么？", "掺杂元素的化学状态是什么？", "吡啶 N、吡咯 N、石墨 N、M-N 配位分别起什么作用？", "孔结构是否适合硫负载和 LiPS 传输？"],
    representativeStructures: ["多孔碳", "石墨烯", "碳纳米管", "N 掺杂碳", "S 掺杂碳", "P 掺杂碳", "B 掺杂碳", "缺陷石墨烯", "M-N-C", "碳/金属化合物复合材料"],
    activeSites: ["缺陷位点", "吡啶 N", "吡咯 N", "石墨 N", "S/P/B 掺杂位点", "M-N 配位位点"],
    mechanisms: ["导电网络", "物理限域", "缺陷/掺杂引入极性位点", "作为单原子或双原子载体"],
    advantages: ["导电性好", "结构可设计性强", "比表面积和孔结构可调", "适合高硫负载", "可作为单原子或双原子载体"],
    limitations: ["非极性碳对 LiPS 化学吸附较弱", "高比表面积可能增加电解液消耗", "缺陷/掺杂位点难以精确定量", "单独碳材料催化活性有限"],
    recommendedCharacterization: ["Raman", "XPS", "BET", "TEM/SEM", "XRD", "EPR", "元素分析", "TGA", "UV-vis Li2S6 吸附实验"],
    recommendedDFTModels: ["pristine graphene", "vacancy graphene", "pyridinic N-doped graphene", "pyrrolic N-doped graphene", "graphitic N-doped graphene", "S/P/B doped graphene", "edge carbon model", "M-N-C active site"],
    recommendedDFTAnalysis: ["LiPS 在缺陷/掺杂位点的吸附能", "Li-N、Li-S、S-C 等相互作用", "Bader 电荷", "差分电荷", "DOS / PDOS", "Li+ 扩散路径", "与金属位点协同作用"],
    applicableQuestions: ["导电宿主", "缺陷调控", "单原子载体", "高硫负载"],
    caution: "碳材料的高比表面积和良好导电性有助于性能提升，但不能仅凭循环性能声称其具有催化作用。催化作用需要动力学测试和机理证据。"
  },
  {
    id: "multicomponent", name: "多组分/高熵催化体系", abbreviation: "Multicomponent / High-entropy",
    summary: "通过引入多种金属元素或复杂组成，利用多活性中心、可调电子结构和协同效应优化 LiPS 吸附与转化；但必须避免“元素越多越好”的解释。",
    coreQuestions: ["多元素是否均匀分布？", "是否形成单相、高熵结构或多相复合？", "不同金属中心分别承担什么作用？", "协同作用是否有实验和计算证据？", "复杂组成是否增加非活性质量或结构不稳定风险？"],
    representativeStructures: ["高熵氧化物", "高熵硫化物", "高熵合金/化合物", "PBA 衍生多金属材料", "多金属 MOF/COF 衍生催化剂", "多金属单原子/双原子复合体系"],
    activeSites: ["多金属中心", "局部畸变位点", "多相界面", "缺陷位点"],
    mechanisms: ["多金属协同", "复杂电子结构调控", "多活性中心分别吸附/转化", "高通量筛选结构-活性趋势"],
    advantages: ["电子结构可调空间大", "多种活性中心可能协同作用", "可调吸附强度和催化路径", "有利于构建复杂反应网络"],
    limitations: ["结构表征复杂", "活性来源难以归因", "DFT 模型复杂，难以完全对应真实材料", "多组分不一定带来更好性能", "可重复性和规模化制备需关注"],
    recommendedCharacterization: ["XRD", "STEM-EDS mapping", "XPS", "XAS", "ICP", "HRTEM", "Raman", "EPR"],
    recommendedDFTModels: ["代表性局部活性位点", "多金属表面模型", "不同金属位点组合模型", "简化 cluster/surface model", "说明模型与真实材料的近似关系"],
    recommendedDFTAnalysis: ["不同金属位点吸附能比较", "电荷分布", "局部 DOS", "自由能路径", "结构-活性趋势", "机器学习或高通量筛选扩展"],
    applicableQuestions: ["多金属协同", "高通量筛选", "复杂电子结构调控", "多因素耦合"],
    caution: "高熵或多组分体系不能只强调元素数量，必须证明相结构、元素分布和具体活性来源。"
  }
];

export const catalystComparisonMetrics = ["LiPS 吸附能力", "催化转化能力", "电子导电性", "结构明确性", "表征难度", "DFT 建模难度", "实际工况适配性", "常见风险"];

export const catalystComparisonRows = [
  { system: "单原子催化剂", adsorption: "中-强，需适度", catalysis: "强", conductivity: "依赖载体", clarity: "高", charDifficulty: "高", dftDifficulty: "中", compatibility: "中", advantage: "活性位点明确、金属利用率高、适合 DFT 建模", limitation: "结构证明难、稳定性和负载量受限", suitable: "活性位点机制、金属中心调控、结构-活性关系", risk: "局部亮点误判整体单原子" },
  { system: "双原子催化剂", adsorption: "构型丰富", catalysis: "强", conductivity: "依赖载体", clarity: "中", charDifficulty: "很高", dftDifficulty: "高", compatibility: "中", advantage: "多位点协同、吸附构型更丰富", limitation: "相邻双金属位点证明难，模型复杂", suitable: "协同催化、异核金属调控、Li/S 双端吸附", risk: "双金属共存不等于双原子" },
  { system: "异质结催化剂", adsorption: "界面可增强", catalysis: "强", conductivity: "可设计", clarity: "中", charDifficulty: "高", dftDifficulty: "很高", compatibility: "中-高", advantage: "界面电荷重分布、内建电场、协同吸附/催化", limitation: "界面结构复杂，DFT 晶格匹配难", suitable: "界面工程、电子结构调控、复合催化", risk: "物理混合冒充异质结" },
  { system: "金属氧化物", adsorption: "强", catalysis: "中", conductivity: "偏低", clarity: "中-高", charDifficulty: "中", dftDifficulty: "中", compatibility: "中", advantage: "极性强，适合 LiPS 吸附", limitation: "部分体系导电性不足", suitable: "氧空位、极性吸附、金属价态调控", risk: "强吸附导致钝化" },
  { system: "金属硫化物", adsorption: "中-强", catalysis: "中-强", conductivity: "中-高", clarity: "中", charDifficulty: "中", dftDifficulty: "中", compatibility: "中", advantage: "极性和催化活性较好", limitation: "结构演变和表面稳定性需关注", suitable: "硫空位、边缘位点、LiPS 转化", risk: "混淆晶格硫和反应硫" },
  { system: "金属氮化物", adsorption: "需验证", catalysis: "中-强", conductivity: "高", clarity: "中", charDifficulty: "中", dftDifficulty: "中", compatibility: "中", advantage: "导电性好，电荷转移快", limitation: "LiPS 吸附能力需具体证明", suitable: "导电催化、金属-N 位点、界面电子结构", risk: "把导电性等同催化性" },
  { system: "MXene", adsorption: "终止基决定", catalysis: "中", conductivity: "高", clarity: "中", charDifficulty: "中-高", dftDifficulty: "中-高", compatibility: "高", advantage: "二维导电骨架和终止基可调", limitation: "终止基复杂、易堆叠", suitable: "表面官能团、层间限域、异质界面", risk: "纯终止基模型过度外推" },
  { system: "缺陷碳/掺杂碳", adsorption: "弱-中", catalysis: "弱-中", conductivity: "高", clarity: "中", charDifficulty: "中", dftDifficulty: "低-中", compatibility: "高", advantage: "导电性好、结构可调、适合硫负载", limitation: "非极性碳吸附弱，催化证据需加强", suitable: "导电宿主、缺陷调控、单原子载体", risk: "用高比表面积替代机理证据" },
  { system: "多组分/高熵体系", adsorption: "可调", catalysis: "潜力强", conductivity: "可调", clarity: "低", charDifficulty: "很高", dftDifficulty: "很高", compatibility: "中", advantage: "组成空间大，协同调控潜力强", limitation: "活性来源归因困难", suitable: "多金属协同、高通量筛选、复杂电子结构调控", risk: "元素越多越好式解释" }
];

export const catalystSelectionGuide = [
  { researchGoal: "研究原子级活性位点", recommendedSystems: ["单原子催化剂", "双原子催化剂"], reason: "活性位点相对明确，适合结合 XAS 和 DFT 建立结构-活性关系。" },
  { researchGoal: "研究界面电荷转移", recommendedSystems: ["异质结催化剂", "MXene/金属化合物复合结构"], reason: "界面处可能产生电荷重分布、功函数差异和协同催化位点。" },
  { researchGoal: "研究极性吸附和氧空位", recommendedSystems: ["金属氧化物"], reason: "氧化物具有极性表面，氧空位可调控电子结构和 LiPS 吸附。" },
  { researchGoal: "研究导电催化", recommendedSystems: ["金属氮化物", "MXene", "金属硫化物", "金属碳化物"], reason: "这些体系通常具有更好的电子传输能力，有利于降低电极极化。" },
  { researchGoal: "研究高硫负载和结构支撑", recommendedSystems: ["多孔碳", "MXene", "碳/金属化合物复合宿主"], reason: "这些材料有助于构建导电网络、孔结构和硫负载空间。" },
  { researchGoal: "研究多因素协同", recommendedSystems: ["异质结构", "多组分体系", "高熵催化体系"], reason: "多组分和界面结构可同时调控吸附、催化、导电和稳定性。" }
];

export const catalystExperimentDFTMap = [
  { system: "单原子催化剂", keyExperiment: "HAADF-STEM + XANES/EXAFS", dftModel: "M-N4/C 或 M-N3/C", interpretation: "实验确认单原子分散和配位环境，DFT 分析金属中心与 LiPS 的吸附、电荷转移和反应路径。" },
  { system: "双原子催化剂", keyExperiment: "EXAFS + WT-EXAFS + STEM 统计", dftModel: "M1-M2-N6/C", interpretation: "实验验证相邻双金属位点，DFT 比较单点吸附和桥连吸附构型，判断协同作用。" },
  { system: "异质结催化剂", keyExperiment: "HRTEM + XPS + UPS/Kelvin probe", dftModel: "Heterointerface slab", interpretation: "实验确认界面和电子转移，DFT 分析界面结合能、差分电荷和界面吸附优势。" },
  { system: "金属氧化物", keyExperiment: "XRD + XPS O 1s + EPR", dftModel: "Oxide surface with/without oxygen vacancy", interpretation: "实验验证晶相和氧空位，DFT 比较氧空位前后 LiPS 吸附与电子结构变化。" },
  { system: "MXene", keyExperiment: "XRD + XPS + AFM", dftModel: "Ti3C2O2 / Ti3C2(OH)2 / Ti3C2F2", interpretation: "实验分析层间距和终止基，DFT 比较不同终止基对 LiPS 吸附和电荷转移的影响。" },
  { system: "缺陷碳/掺杂碳", keyExperiment: "Raman + XPS + BET", dftModel: "Vacancy / N-doped graphene", interpretation: "实验分析缺陷和掺杂类型，DFT 判断缺陷/掺杂位点与 LiPS 的相互作用。" }
];

export const catalystScientificChecks = [
  "不要写吸附越强越好，必须强调适度吸附与快速转化的平衡。",
  "不要把极性吸附等同于催化转化，必须区分吸附能力和催化动力学。",
  "不要把单一性能曲线作为催化机制证据，必须结合表征、动力学测试和 DFT。",
  "单原子催化剂必须强调 HAADF-STEM 不能单独证明整体单原子结构。",
  "双原子催化剂必须强调相邻双金属位点和协同作用的证明。",
  "异质结必须区分真正界面和简单物理混合。",
  "金属氧化物氧空位不能仅凭 XPS O 1s 证明，应结合 EPR、XAS、Raman 和 DFT。",
  "金属硫化物中要区分晶格硫和电化学反应中的多硫化物硫。",
  "MXene 的纯终止基 DFT 模型必须说明是简化近似。",
  "多组分/高熵体系不能仅用元素数量解释性能，需要证明结构和活性来源。",
  "DFT 模型用于原子尺度机制解释，不能直接替代实际电芯工况评价。"
];
