import {
  Atom,
  BatteryCharging,
  BookOpen,
  FlaskConical,
  Gauge,
  GitBranch,
  Home,
  Layers3,
  Map,
  Zap
} from "lucide-react";
import { challengesTabs } from "./challengesData";
import { catalystSystemTabs } from "./catalystSystemsData";
import { characterizationTabs } from "./experimentalCharacterizationData";
import { fundamentalsTabs } from "./fundamentalsData";
import { dftTabs } from "./dftCalculationsData";
import { electrochemicalTabs } from "./electrochemicalPerformanceData";
import { researchGapTabs } from "./researchGapsData";

export type DashboardModuleId =
  | "home"
  | "fundamentals"
  | "challenges"
  | "catalysts"
  | "experiments"
  | "dft"
  | "performance"
  | "research-gaps"
  | "catalyst-design-map"
  | "projects";

export type DashboardModule = {
  id: DashboardModuleId;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Home;
  tabs: string[];
};

export const dashboardModules: DashboardModule[] = [
  {
    id: "home",
    title: "总控首页",
    shortTitle: "首页",
    description: "研究全景、模块入口和锂硫电池机理示意。",
    icon: Home,
    tabs: ["总览", "研究主线", "机理示意"]
  },
  {
    id: "fundamentals",
    title: "锂硫基础",
    shortTitle: "锂硫基础",
    description: "电池组成、反应机理和多硫化物转化路径。",
    icon: BatteryCharging,
    tabs: fundamentalsTabs.map((item) => item.label)
  },
  {
    id: "challenges",
    title: "关键问题",
    shortTitle: "关键问题",
    description: "穿梭效应、动力学、低导电性、结构失稳、锂负极和实际工况挑战。",
    icon: Zap,
    tabs: challengesTabs.map((item) => item.label)
  },
  {
    id: "catalysts",
    title: "催化剂体系",
    shortTitle: "催化剂体系",
    description: "不同催化剂体系的结构、活性位点与机制逻辑。",
    icon: Atom,
    tabs: catalystSystemTabs.map((item) => item.label)
  },
  {
    id: "experiments",
    title: "实验表征",
    shortTitle: "实验表征",
    description: "按体系和方法组织证据链，连接实验表征与 DFT 机制解释。",
    icon: FlaskConical,
    tabs: characterizationTabs
  },
  {
    id: "dft",
    title: "DFT 计算",
    shortTitle: "DFT 计算",
    description: "DFT/VASP 方法库、任务选择器和可视化分析工作台。",
    icon: Layers3,
    tabs: dftTabs.map((item) => item.label)
  },
  {
    id: "performance",
    title: "电化学性能",
    shortTitle: "电化学性能",
    description: "容量、倍率、循环、CV、EIS、Li2S 成核、实际工况和性能-机制对应的科研评价工作台。",
    icon: Gauge,
    tabs: electrochemicalTabs.map((item) => item.label)
  },
  {
    id: "research-gaps",
    title: "研究空白",
    shortTitle: "研究空白",
    description: "研究空白地图、课题方向生成器和实验-DFT-电化学证据链规划器。",
    icon: GitBranch,
    tabs: researchGapTabs.map((item) => item.label)
  },
  {
    id: "catalyst-design-map",
    title: "催化剂设计项目库",
    shortTitle: "项目库",
    description: "12 个锂硫电池催化剂设计方向、原创理论机理图、实验路线与 DFT 路线总览。",
    icon: Map,
    tabs: ["理论图片总览"]
  },
  {
    id: "projects",
    title: "VASP 学习",
    shortTitle: "VASP 学习",
    description: "VASP 入门、结果提取、后处理分析与锂硫电池催化剂计算学习中心。",
    icon: BookOpen,
    tabs: ["VASP 学习专题"]
  },
];

export const researchPipeline = ["科学问题", "催化剂设计", "DFT 计算筛选", "实验表征验证", "电化学性能提升"];

export const lisAdvantages = ["高理论比容量", "高理论能量密度", "硫资源丰富", "成本低", "适合高能量密度储能体系"];
