export type ModelAccuracyLevel =
  | "schematic"
  | "representative"
  | "real-dft-structure";

export type StructureFileFormat =
  | "cif"
  | "xyz"
  | "poscar"
  | "contcar"
  | "pdb"
  | "none";

export type VisualizationType =
  | "schematic"
  | "structure-file";

export type SchematicType =
  | "single-atom"
  | "dual-atom"
  | "heterostructure"
  | "metal-oxide-slab"
  | "metal-sulfide-slab"
  | "metal-nitride-slab"
  | "phosphide-carbide-slab"
  | "mxene-surface"
  | "defect-carbon"
  | "multicomponent"
  | "lips-adsorption"
  | "placeholder";

export interface CatalystModelData {
  id: string;
  name: string;
  category: string;
  accuracyLevel: ModelAccuracyLevel;
  visualizationType: VisualizationType;
  structureFile?: string;
  structureFileFormat: StructureFileFormat;
  isOptimizedStructure?: boolean;
  containsAdsorbate?: boolean;
  adsorbateSpecies?: string;
  schematicType: SchematicType;
  activeSiteDescription: string;
  modelDescription: string;
  scientificNotes: string[];
  limitations: string[];
  validationChecklist: string[];
}

const sharedValidation = [
  "未提供 POSCAR、CONTCAR、CIF、XYZ 或 PDB 时，不渲染真实原子坐标。",
  "机制示意图必须明确标注“不代表真实优化结构”。",
  "若用于论文或汇报中的 DFT 结构展示，必须替换为真实结构文件。",
  "吸附构型、键长、配位数和晶面指数只能来自真实结构或文献明确结构。"
];

export const catalystModelsData: CatalystModelData[] = [
  {
    id: "single-atom",
    name: "M-Nx/C 单原子位点机制示意",
    category: "单原子催化剂",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "single-atom",
    activeSiteDescription: "孤立金属中心与 N/S/O 或碳缺陷配位，常用代表性建模思路包括 M-N4/C、M-N3/C、M-N2/C 和缺陷石墨烯锚定位点。",
    modelDescription: "当前图只说明“孤立金属位点、配位环境、LiPS 接近方向、电子转移”这些机制关系，不描述真实键长、键角、孔结构或 DFT 优化构型。",
    scientificNotes: [
      "真实 SAC 结构必须通过 HAADF-STEM 统计、XANES/EXAFS、WT-EXAFS、XPS、ICP 和 XRD 综合证明。",
      "M-N4/C 等只是常见代表性 DFT 模型名称，具体坐标需要由 POSCAR/CIF/XYZ 文件确定。"
    ],
    limitations: [
      "不代表任意 Fe-N4/C、Co-N4/C 或 Ni-N4/C 的真实平面几何。",
      "不包含真实碳载体缺陷分布、边界效应、孔结构或 LiPS 吸附构型。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "dual-atom",
    name: "M1-M2 双原子协同机制示意",
    category: "双原子催化剂",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "dual-atom",
    activeSiteDescription: "相邻 M1-M2 位点可能形成桥连吸附、异核电荷差异和 Li/S 双端协同稳定。",
    modelDescription: "当前图只展示相邻双位点协同概念，不给出 M1-M2 距离、配位数或具体 M1-M2-N6/C 坐标。",
    scientificNotes: [
      "双原子催化剂的核心证据是相邻双金属位点，而不是两个金属元素同时存在。",
      "真实桥连吸附构型必须比较 M1、M2、M1-M2 桥连和 Li/S 端取向。"
    ],
    limitations: [
      "不代表同核或异核双原子位点的真实几何。",
      "不能用于判断 M-M 键、M-N 键长或 LiPS 桥连稳定性。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "heterostructure",
    name: "两相异质界面机制示意",
    category: "异质结催化剂",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "heterostructure",
    activeSiteDescription: "两相紧密界面、界面缺陷、功函数差异和电荷重分布区域。",
    modelDescription: "当前图展示界面电荷转移和 LiPS 优先靠近界面的机制，不代表真实晶格匹配、界面取向、应变或界面终止方式。",
    scientificNotes: [
      "异质结必须区分真正界面和简单物理混合。",
      "真实 DFT 界面模型需要明确两相晶面、超胞匹配、失配率、真空层和界面优化方式。"
    ],
    limitations: [
      "不显示任何真实晶体结构、晶格条纹或界面原子配位。",
      "不能用于推断内建电场方向或界面结合能数值。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "metal-oxides",
    name: "金属氧化物表面与氧空位机制示意",
    category: "金属氧化物",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "metal-oxide-slab",
    activeSiteDescription: "表面金属位点、晶格氧、氧空位和缺陷诱导电子态。",
    modelDescription: "当前图用于说明氧空位可能改变 LiPS 吸附和电子结构，不代表 TiO2(101)、MnO2(110)、Co3O4(111) 等真实 slab。",
    scientificNotes: [
      "氧空位不能只凭 XPS O 1s 峰判断，应结合 EPR、Raman、XAS 和缺陷 DFT 模型。",
      "过渡金属氧化物真实 DFT 计算通常需要审慎处理 DFT+U。"
    ],
    limitations: [
      "不包含真实晶相、晶面、表面重构或缺陷形成能。",
      "不能用于判断 Li-O、M-S 或 S-S 键长变化。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "metal-sulfides",
    name: "金属硫化物边缘/硫空位机制示意",
    category: "金属硫化物",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "metal-sulfide-slab",
    activeSiteDescription: "金属位点、晶格硫、硫空位和边缘位点。",
    modelDescription: "当前图说明晶格硫、硫空位和 LiPS 反应硫需要区分，不代表 MoS2 basal plane、MoS2 edge 或 CoS2 surface 的真实原子结构。",
    scientificNotes: [
      "材料晶格硫与电化学反应中间体中的硫不是同一类对象。",
      "真实硫化物模型需要明确晶相、晶面、边缘类型、空位位置和吸附构型。"
    ],
    limitations: [
      "不代表具体硫化物晶面或边缘结构。",
      "不能用于推断 S-S 活化程度或 M-S 键强。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "metal-nitrides",
    name: "金属氮化物导电表面机制示意",
    category: "金属氮化物",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "metal-nitride-slab",
    activeSiteDescription: "表面金属位点、N 位点、金属-N 电子结构和导电通路。",
    modelDescription: "当前图说明氮化物可能改善电荷转移，不代表 TiN、VN、Ni3N 等真实晶体表面。",
    scientificNotes: [
      "导电性好不等于催化活性一定高。",
      "真实模型需要验证 LiPS 吸附、自由能路径和实验动力学证据。"
    ],
    limitations: [
      "不包含真实氮化物晶面、表面氧化或结构重构。",
      "不能用于判断 LiPS 与 N 位点或金属位点的具体键合。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "phosphides-carbides",
    name: "磷化物/碳化物表面机制示意",
    category: "磷化物/碳化物",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "phosphide-carbide-slab",
    activeSiteDescription: "金属位点、P/C 位点、界面电荷转移和高导电相。",
    modelDescription: "当前图说明金属-P 或金属-C 键可调控电子结构，不代表 CoP、Ni2P、Mo2C、TiC 或 WC 的真实晶体结构。",
    scientificNotes: [
      "磷化物/碳化物需要证明对 LiPS 转化有真实催化作用，而不是只证明导电增强。",
      "真实结构应明确相纯度、表面氧化、晶面和吸附构型。"
    ],
    limitations: [
      "不包含真实晶相和表面重构。",
      "不能用于分析 M-P、M-C 或 LiPS 键合强度。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "mxenes",
    name: "MXene 表面终止基机制示意",
    category: "MXene 材料",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "mxene-surface",
    activeSiteDescription: "二维导电骨架、层间空间和 -O/-OH/-F 等混合终止基。",
    modelDescription: "当前图只说明 MXene 层状骨架与终止基调控 LiPS 的概念，不代表 Ti3C2O2、Ti3C2(OH)2 或 Ti3C2F2 的真实坐标。",
    scientificNotes: [
      "真实 MXene 通常具有混合终止基，纯终止基 DFT 模型是简化近似。",
      "真实结构需来自具体终止基比例、层间距和吸附构型文件。"
    ],
    limitations: [
      "不描述真实层间距、片层堆叠、缺陷和终止基分布。",
      "不能用于判断 -O、-OH、-F 对 LiPS 的吸附强弱排序。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "defect-carbon",
    name: "缺陷碳/杂原子掺杂碳机制示意",
    category: "缺陷碳与杂原子掺杂碳",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "defect-carbon",
    activeSiteDescription: "孔结构、碳缺陷、吡啶 N/石墨 N/S/P/B 掺杂位点和 M-N-C 锚定位点。",
    modelDescription: "当前图说明缺陷和掺杂如何从物理限域扩展到化学吸附，不代表真实石墨烯、CNT 或多孔碳结构。",
    scientificNotes: [
      "高比表面积和导电性不能直接证明催化作用。",
      "真实模型需要区分 pristine graphene、vacancy graphene、pyridinic/graphitic N-doped graphene 等。"
    ],
    limitations: [
      "不显示真实孔径、边缘结构、缺陷密度或掺杂位置。",
      "不能用于计算 Li-N、Li-S 或 S-C 相互作用。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "multicomponent",
    name: "多组分/高熵局部位点机制示意",
    category: "多组分/高熵催化体系",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    schematicType: "multicomponent",
    activeSiteDescription: "多金属中心、局部畸变位点、多相界面和缺陷位点。",
    modelDescription: "当前图说明复杂组成下的多位点协同概念，不代表高熵氧化物、硫化物或合金的真实晶体结构。",
    scientificNotes: [
      "多组分或高熵体系不能只强调元素数量。",
      "真实 DFT 常需选择代表性局部位点，并说明与真实材料之间的近似关系。"
    ],
    limitations: [
      "不包含真实元素分布、局部畸变、单相/多相信息。",
      "不能用于归因具体活性来源。"
    ],
    validationChecklist: sharedValidation
  },
  {
    id: "lips-adsorption",
    name: "LiPS 吸附与转化路径机制示意",
    category: "LiPS 吸附体系",
    accuracyLevel: "schematic",
    visualizationType: "schematic",
    structureFileFormat: "none",
    containsAdsorbate: true,
    adsorbateSpecies: "Li2S6 / Li2S4 / Li2S2 / Li2S",
    schematicType: "lips-adsorption",
    activeSiteDescription: "Li 端、S 端、催化位点、电子转移方向和 Li2S 成核/分解路径。",
    modelDescription: "当前图说明 LiPS 接近、适度吸附、转化和 Li2S 沉积/分解的关系，不代表任何已优化吸附构型。",
    scientificNotes: [
      "LiPS 吸附不能写成越强越好，应综合吸附能、自由能、NEB、Bader、DOS、COHP 和实验动力学。",
      "真实吸附构型必须来自具体优化结构，并检查键长、构型收敛和电荷态。"
    ],
    limitations: [
      "不包含真实 LiPS 分子构象或吸附几何。",
      "不能用于读取 Li-S、S-S 或催化剂-吸附物键长。"
    ],
    validationChecklist: sharedValidation
  }
];

export const catalystModelBySystemId = Object.fromEntries(
  catalystModelsData.map((model) => [model.id, model])
) as Record<string, CatalystModelData>;
