export type CatalystSystem = {
  id: string;
  name: string;
  shortName: string;
  route: string;
  summary: string;
  keyQuestions: string[];
  structureFeatures: string[];
  activeSites: string[];
  characterizationMethods: string[];
  dftMethods: string[];
  dftModels: string[];
  adsorptionModes: string[];
  advantages: string[];
  limitations: string[];
  evidenceChain: string[];
};

export const catalystSystems: CatalystSystem[] = [
  {
    id: "single-atom",
    name: "单原子催化剂 SACs",
    shortName: "SACs",
    route: "/catalyst-systems/single-atom",
    summary:
      "以孤立金属原子作为活性中心，通过 M-N、M-S 或缺陷碳配位调控 LiPS 吸附、电荷转移和转化动力学。",
    keyQuestions: [
      "金属是否以单原子形式存在？",
      "是否存在金属颗粒、团簇或氧化物杂相？",
      "金属原子的局域配位环境是什么？",
      "单原子位点是否参与 LiPS 吸附与转化？"
    ],
    structureFeatures: ["原子级分散", "明确 M-Nx 或 M-Sx 配位", "高金属利用率", "依赖碳缺陷锚定"],
    activeSites: ["M-N4", "M-N3", "M-N2", "M-S4", "空位碳锚定位点"],
    characterizationMethods: ["AC-HAADF-STEM", "XANES", "EXAFS", "WT-EXAFS", "XPS", "ICP-OES/MS", "XRD", "Raman", "EDS mapping"],
    dftMethods: ["吸附能", "Bader 电荷", "差分电荷", "DOS/PDOS", "COHP/ICOHP", "吉布斯自由能", "NEB"],
    dftModels: ["M-N4/C", "M-N3/C", "M-N2/C", "M-S4/C", "M anchored on defect graphene", "M anchored on vacancy carbon"],
    adsorptionModes: ["Li 端靠近金属位点", "S 端与金属配位", "Li-S 同时与 M-N 位点耦合", "平躺吸附"],
    advantages: ["活性位点明确", "金属利用率高", "便于建立结构-性能关联", "适合 DFT 精细建模"],
    limitations: ["合成稳定性要求高", "金属负载量有限", "需要强证据链排除团簇", "模型与真实缺陷分布可能有差异"],
    evidenceChain: ["XRD 排除金属颗粒", "HAADF-STEM 观察孤立亮点", "XANES 判断价态", "EXAFS 排除 M-M 配位", "XPS 分析电子转移", "DFT 解释活性位点"]
  },
  {
    id: "dual-atom",
    name: "双原子催化剂 DACs",
    shortName: "DACs",
    route: "/catalyst-systems/dual-atom",
    summary:
      "通过同核或异核双金属位点提供协同吸附与多中心反应通道，适合解释 LiPS 桥连吸附和 S-S 键活化。",
    keyQuestions: ["两个金属原子是否相邻？", "是同核还是异核双原子？", "是否存在 M1-M2 相互作用？", "双金属位点是否协同催化 LiPS？"],
    structureFeatures: ["相邻双金属中心", "M1-M2 电子耦合", "可形成桥连吸附", "配位环境更复杂"],
    activeSites: ["M1-M2-N6", "M2-N5", "M1M2 空位嵌入位点", "同核双原子位点", "异核双原子位点"],
    characterizationMethods: ["AC-HAADF-STEM", "EXAFS", "WT-EXAFS", "XANES", "XPS", "EELS", "STEM-EDS", "ICP", "XRD"],
    dftMethods: ["吸附构型比较", "差分电荷", "Bader 电荷", "PDOS", "COHP", "NEB"],
    dftModels: ["M1-M2-N6/C", "M2-N5/C", "M1M2 embedded in graphene vacancy", "homonuclear dual atom site", "heteronuclear dual atom site"],
    adsorptionModes: ["LiPS 只吸附在 M1", "LiPS 只吸附在 M2", "LiPS 桥连 M1-M2", "S 端靠近金属", "Li 端靠近 N/O/S 位点"],
    advantages: ["协同效应强", "可调控电子结构", "适合降低多步反应能垒", "吸附构型更丰富"],
    limitations: ["结构证明难度高", "双原子距离和构型易分布不均", "DFT 构型空间大", "合成可重复性需要验证"],
    evidenceChain: ["HAADF-STEM 观察相邻亮点", "EXAFS 拟合 M1-M2 配位", "WT-EXAFS 区分 M-N 与 M-M", "XPS/XANES 判断电子结构", "DFT 比较桥连吸附", "NEB 验证能垒降低"]
  },
  {
    id: "heterostructure",
    name: "异质结催化剂",
    shortName: "异质结",
    route: "/catalyst-systems/heterostructure",
    summary:
      "利用两相界面的电子重分布、内建电场和多位点协同作用，促进 LiPS 捕获、转化和 Li2S 沉积/分解。",
    keyQuestions: ["是否真正形成异质界面？", "界面是否存在电子重分布？", "是否形成内建电场？", "界面是否促进 LiPS 转化？"],
    structureFeatures: ["两相晶格界面", "界面电荷重排", "功函数差异", "可能存在界面应力"],
    activeSites: ["界面金属位", "界面缺陷", "极性表面", "内建电场区域"],
    characterizationMethods: ["XRD", "HRTEM", "SAED", "STEM-EDS mapping", "XPS", "Raman", "UPS", "Kelvin probe", "Mott-Schottky", "原位 Raman"],
    dftMethods: ["界面结合能", "差分电荷", "功函数", "吸附能", "内建电场", "NEB"],
    dftModels: ["低指数晶面匹配", "界面超胞", "含真空层 slab", "界面 LiPS 吸附模型"],
    adsorptionModes: ["界面桥式吸附", "Li 端靠近阴离子位点", "S 端靠近金属位点", "跨界面双位点吸附"],
    advantages: ["界面协同明显", "可兼顾吸附与导电", "适合构建内建电场", "反应路径可设计"],
    limitations: ["界面结构复杂", "晶格失配影响模型", "真实界面难以完全表征", "合成相纯度需要控制"],
    evidenceChain: ["XRD 证明两相共存", "HRTEM 观察异质界面", "XPS/UPS 显示电子转移", "Mott-Schottky 支持界面电性", "DFT 差分电荷显示内建电场", "LiPS 吸附/转化实验验证"]
  },
  {
    id: "metal-oxides",
    name: "金属氧化物催化剂",
    shortName: "氧化物",
    route: "/catalyst-systems/metal-oxides",
    summary:
      "金属氧化物具有强极性表面和可调氧空位，常用于增强 LiPS 化学吸附，但导电性短板需要结构复合解决。",
    keyQuestions: ["晶相是什么？", "金属价态是什么？", "是否存在氧空位？", "氧空位是否增强 LiPS 吸附？", "导电性是否不足？"],
    structureFeatures: ["极性 M-O 表面", "多价态金属中心", "氧空位", "晶面依赖性强"],
    activeSites: ["金属阳离子", "氧空位", "低配位氧", "暴露晶面"],
    characterizationMethods: ["XRD", "XPS", "Raman", "EPR", "HRTEM", "BET", "XAS", "UV-vis Li2S6 吸附实验", "电导率测试"],
    dftMethods: ["DFT+U", "自旋极化", "氧空位形成能", "吸附能", "差分电荷", "DOS"],
    dftModels: ["TiO2 (101)", "MnO2 (110)", "Co3O4 (111)", "Fe2O3 (001)", "含氧空位氧化物表面", "掺杂氧化物表面"],
    adsorptionModes: ["Li-O 相互作用", "S-M 配位", "氧空位捕获 S 端", "表面平躺吸附"],
    advantages: ["极性吸附强", "价态可调", "缺陷工程成熟", "表征证据丰富"],
    limitations: ["导电性通常不足", "强吸附可能阻碍脱附", "DFT+U 参数敏感", "氧空位定量困难"],
    evidenceChain: ["XPS O 1s 缺陷氧峰增强", "EPR 氧空位信号", "Raman 峰位或峰宽变化", "DFT 显示氧空位附近吸附能增强"]
  },
  {
    id: "metal-sulfides",
    name: "金属硫化物催化剂",
    shortName: "硫化物",
    route: "/catalyst-systems/metal-sulfides",
    summary:
      "硫化物具有亲硫表面、边缘活性位和可调硫空位，可通过 M-S 键和缺陷位点促进多硫化物转化。",
    keyQuestions: ["晶相和暴露晶面是否明确？", "是否存在硫空位？", "金属-S 键如何参与 LiPS 吸附？", "边缘位点是否为主要活性中心？"],
    structureFeatures: ["金属-S 骨架", "层状或纳米片结构", "硫空位", "边缘位点"],
    activeSites: ["低配位金属", "硫空位", "边缘 S 位", "金属-S 键"],
    characterizationMethods: ["XRD", "XPS S 2p", "HRTEM", "Raman", "EPR", "TEM", "Li2S6 吸附实验"],
    dftMethods: ["硫空位模型", "吸附能", "COHP", "DOS", "NEB"],
    dftModels: ["MoS2 edge", "CoS2 (200)", "NiS2 surface", "含硫空位表面", "金属硫化物/碳复合模型"],
    adsorptionModes: ["S 端靠近金属位", "Li 端靠近表面 S", "边缘桥式吸附", "空位捕获 LiPS"],
    advantages: ["亲硫性好", "反应界面匹配", "缺陷位点可调", "适合解释 S-S 键活化"],
    limitations: ["部分硫化物稳定性不足", "多相硫化物容易混杂", "硫空位证据需要交叉验证", "导电性差异较大"],
    evidenceChain: ["XRD 确认晶相", "XPS S 2p 显示硫化物和缺陷态", "HRTEM 观察晶面/边缘", "EPR 支持硫空位", "DFT 比较完美与缺陷表面"]
  },
  {
    id: "metal-nitrides",
    name: "金属氮化物催化剂",
    shortName: "氮化物",
    route: "/catalyst-systems/metal-nitrides",
    summary:
      "金属氮化物兼具较高导电性和极性 M-N 表面，适合加速电荷转移和 LiPS 氧化还原反应。",
    keyQuestions: ["氮化物相是否纯净？", "M-N 键是否稳定？", "高导电性是否提升动力学？", "表面氮位与金属位如何协同吸附？"],
    structureFeatures: ["M-N 共价/离子混合键", "高导电性", "表面极性", "纳米颗粒或片层结构"],
    activeSites: ["金属位", "N 位", "金属-N 边界", "缺陷位"],
    characterizationMethods: ["XRD", "XPS N 1s", "TEM", "HRTEM", "电导率", "EIS", "XAS"],
    dftMethods: ["吸附能", "DOS", "差分电荷", "Bader 电荷", "NEB"],
    dftModels: ["VN surface", "TiN (200)", "Co4N surface", "Mo2N surface", "氮空位模型"],
    adsorptionModes: ["Li-N 相互作用", "S-M 配位", "表面平躺吸附", "缺陷位捕获"],
    advantages: ["导电性好", "极性表面利于吸附", "电化学极化低", "适合高倍率体系"],
    limitations: ["表面氧化需控制", "部分氮化物制备温度高", "氮空位表征不易", "真实表面终止复杂"],
    evidenceChain: ["XRD 确认氮化物相", "XPS N 1s 分析 M-N 键", "电导率/EIS 证明传输优势", "Li2S6 吸附和对称电池验证转化", "DFT DOS 和吸附能解释机制"]
  },
  {
    id: "mxenes",
    name: "MXene 催化剂",
    shortName: "MXene",
    route: "/catalyst-systems/mxenes",
    summary:
      "MXene 具有二维导电骨架和可调表面终止基，Ti-O/Ti-F/Ti-OH 等位点显著影响 LiPS 吸附和电荷转移。",
    keyQuestions: ["片层是否成功剥离？", "表面终止基是什么？", "(002) 峰移动说明了什么？", "终止基如何影响 LiPS 吸附？"],
    structureFeatures: ["二维片层", "高导电性", "可调终止基", "层间距可调"],
    activeSites: ["Ti 位", "O 终止基", "F 终止基", "OH 终止基", "层间位点"],
    characterizationMethods: ["XRD (002)", "SEM/TEM", "AFM", "XPS", "Raman", "BET", "Zeta potential", "Li2S6 吸附实验"],
    dftMethods: ["终止基模型", "吸附能", "差分电荷", "功函数", "DOS", "偶极校正"],
    dftModels: ["Ti3C2", "Ti3C2O2", "Ti3C2F2", "Ti3C2(OH)2", "V2C", "Mo2C", "Nb2C"],
    adsorptionModes: ["Li-O 相互作用", "S-Ti 配位", "层间吸附", "表面平躺吸附"],
    advantages: ["导电性高", "片层结构利于电子/离子传输", "终止基可调", "适合界面工程"],
    limitations: ["易氧化", "终止基分布复杂", "片层堆叠影响活性", "非对称终止需考虑偶极校正"],
    evidenceChain: ["XRD 观察 (002) 峰移动", "SEM/TEM/AFM 确认片层", "XPS 分析 Ti-C/Ti-O/Ti-F/Ti-OH", "Zeta 和 Li2S6 吸附验证界面作用", "DFT 比较不同终止基吸附能"]
  },
  {
    id: "defect-carbon",
    name: "缺陷碳 / 杂原子掺杂碳",
    shortName: "缺陷碳",
    route: "/catalyst-systems/defect-carbon",
    summary:
      "通过空位、边缘和 N/S/P/B 掺杂调控碳骨架电子结构，构建轻元素活性位点并提升 LiPS 物理限域与化学吸附。",
    keyQuestions: ["缺陷类型与浓度如何证明？", "杂原子配位类型是什么？", "缺陷是否提供真实活性位点？", "孔结构如何影响扩散和硫负载？"],
    structureFeatures: ["石墨化碳骨架", "空位缺陷", "边缘缺陷", "杂原子掺杂", "多级孔结构"],
    activeSites: ["吡啶 N", "石墨 N", "S/P/B 掺杂位", "单空位", "边缘位点"],
    characterizationMethods: ["Raman D/G", "XPS", "BET", "TEM", "XRD", "EPR", "元素分析"],
    dftMethods: ["缺陷石墨烯模型", "吸附能", "Bader 电荷", "DOS", "差分电荷"],
    dftModels: ["石墨烯", "单空位石墨烯", "双空位石墨烯", "N 掺杂石墨烯", "S/P/B 掺杂石墨烯", "边缘缺陷碳模型"],
    adsorptionModes: ["Li 端靠近掺杂位", "S 端靠近缺陷位", "平躺限域吸附", "孔壁多点吸附"],
    advantages: ["轻元素体系稳定", "导电骨架好", "孔结构易设计", "成本较低"],
    limitations: ["活性位点分布不均", "化学吸附通常较弱", "缺陷定量困难", "DFT 模型代表性需谨慎"],
    evidenceChain: ["Raman D/G 说明缺陷程度", "XPS 区分 N/S/P/B 配位", "BET 分析孔结构", "EPR 支持缺陷电子", "DFT 建立缺陷位点与吸附强度关联"]
  }
];

export const extraCatalystCards = [
  {
    id: "metal-phosphides",
    name: "金属磷化物催化剂",
    summary: "以 M-P 极性键和较高导电性促进 LiPS 吸附与转化，适合与碳骨架复合。",
    route: "/catalyst-systems"
  },
  {
    id: "metal-carbides",
    name: "金属碳化物催化剂",
    summary: "具有金属态导电性和可调表面电子结构，可作为 Li2S 沉积/分解催化界面。",
    route: "/catalyst-systems"
  }
];
