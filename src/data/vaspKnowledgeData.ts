import { commandCategories, externalResources, toolResources, type CommandItem } from "./vaspLearningData";
import type { VaspDiagramId } from "@/components/vasp-learning/diagrams/VaspDiagrams";

export type VaspLevel = "入门" | "基础" | "进阶" | "高级" | "专题" | "排错";

export type VaspResourceType = "official" | "chinese" | "tool" | "tutorial";

export type VaspKnowledgeResource = {
  id: string;
  title: string;
  url: string;
  description: string;
  type: VaspResourceType;
  tags: string[];
};

export type VaspKnowledgeCommand = CommandItem & {
  id: string;
  category: string;
  tags?: string[];
};

export type VaspLearningSectionBlock = {
  title: string;
  items: string[];
};

export type LinuxCommandDoc = {
  name: string;
  meaning: string;
  purpose: string;
  syntax: string;
  options: string[];
  examples: { command: string; explanation: string }[];
  output: string;
  pitfalls: string[];
  danger?: string;
  tags: string[];
};

export type LinuxCommandGroup = {
  id: string;
  title: string;
  description: string;
  commands: LinuxCommandDoc[];
};

export type VaspKnowledgeTopic = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: VaspLevel;
  tags: string[];
  learningGoals: string[];
  concepts: string[];
  whenToUse: string[];
  workflow: string[];
  commands?: VaspKnowledgeCommand[];
  diagram?: VaspDiagramId;
  sections?: VaspLearningSectionBlock[];
  linuxCommandGroups?: LinuxCommandGroup[];
  practiceTasks?: { title: string; command: string; explanation: string }[];
  outputFiles?: { file: string; meaning: string; check: string }[];
  cautions: string[];
  tools?: string[];
  resources?: VaspKnowledgeResource[];
  relatedTopics?: string[];
};

export type VaspKnowledgeModule = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: VaspLevel;
  tags: string[];
  children: VaspKnowledgeTopic[];
};

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeResourceType = (tags: string[]): VaspResourceType => {
  if (tags.some((tag) => tag.includes("中文"))) return "chinese";
  if (tags.some((tag) => tag.includes("官方"))) return "official";
  if (tags.some((tag) => tag.includes("教程") || tag.includes("案例"))) return "tutorial";
  return "tool";
};

const normalizeCommand = (item: CommandItem, category: string, index: number): VaspKnowledgeCommand => ({
  ...item,
  id: `${toId(category)}-${index + 1}`,
  category,
  tags: item.keywords
});

export const vaspKnowledgeCommands: VaspKnowledgeCommand[] = commandCategories.flatMap((category) =>
  category.items.map((item, index) => normalizeCommand(item, category.title, index))
);

export const vaspKnowledgeResources: VaspKnowledgeResource[] = [...externalResources, ...toolResources].map((item) => ({
  id: toId(item.title),
  title: item.title,
  url: item.url,
  description: item.desc,
  type: normalizeResourceType(item.tags),
  tags: item.tags
}));

const commandsByKeyword = (keywords: string[], limit = 4) =>
  vaspKnowledgeCommands
    .filter((item) => {
      const text = [item.title, item.file, item.command, item.desc, item.category, ...item.keywords].join(" ").toLowerCase();
      return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    })
    .slice(0, limit);

const resourcesByTitle = (titles: string[]) => vaspKnowledgeResources.filter((item) => titles.some((title) => item.title.includes(title)));

const topic = (input: {
  id: string;
  title: string;
  description: string;
  category: string;
  level: VaspLevel;
  tags: string[];
  learningGoals?: string[];
  concepts?: string[];
  whenToUse?: string[];
  workflow?: string[];
  commands?: VaspKnowledgeCommand[];
  diagram?: VaspDiagramId;
  sections?: VaspLearningSectionBlock[];
  linuxCommandGroups?: LinuxCommandGroup[];
  practiceTasks?: { title: string; command: string; explanation: string }[];
  outputFiles?: { file: string; meaning: string; check: string }[];
  cautions?: string[];
  tools?: string[];
  resources?: VaspKnowledgeResource[];
  relatedTopics?: string[];
}): VaspKnowledgeTopic => ({
  learningGoals: [`掌握 ${input.title} 的核心判断逻辑。`, "能把对应数据整理为可复查的计算记录。"],
  concepts: ["输入设置、输出文件和后处理口径需要保持一致。"],
  whenToUse: ["搭建计算流程、检查结果或整理论文数据时使用。"],
  workflow: ["确认任务类型和输入文件。", "运行计算或定位已有输出。", "提取关键指标并记录判断标准。", "结合结构、能量和电子信息交叉验证。"],
  cautions: ["不同 VASP 版本和 INCAR 设置可能导致输出字段略有差异。"],
  ...input
});

const officialTopics: VaspKnowledgeTopic[] = [
  topic({
    id: "vasp-wiki",
    title: "VASP Wiki",
    description: "官方知识库，适合查询 INCAR 标签、输入输出文件、算法、功能说明和计算设置。",
    category: "官方学习资源",
    level: "基础",
    tags: ["官方", "Wiki", "参数查询"],
    learningGoals: ["知道遇到参数不确定时优先查询官方页面。", "能从 Wiki 中定位 INCAR 标签、输出文件和教程入口。"],
    concepts: ["VASP 标准计算围绕 INCAR、POSCAR、KPOINTS、POTCAR 展开。", "OUTCAR、OSZICAR、CONTCAR、DOSCAR、CHGCAR 等输出文件承担不同检查任务。"],
    whenToUse: ["确认 LORBIT、ISIF、IBRION、ICHARG、ISMEAR、EDIFFG 等标签含义。", "写论文计算方法部分时确认官方定义。"],
    resources: resourcesByTitle(["VASP Wiki"])
  }),
  topic({
    id: "vasp-manual",
    title: "VASP Manual",
    description: "官方手册入口，适合作为权威参数、理论背景和方法说明查询。",
    category: "官方学习资源",
    level: "进阶",
    tags: ["官方", "手册", "理论"],
    learningGoals: ["理解 DFT、PAW、平面波基组和主要任务的理论背景。", "避免只复制模板而不了解参数含义。"],
    concepts: ["DFT/PAW/平面波基组是 VASP 方法基础。", "结构优化、DOS、能带、振动、过渡态任务都对应特定输入输出逻辑。"],
    whenToUse: ["写论文方法部分。", "需要理解参数背后的物理或数值含义。"],
    resources: resourcesByTitle(["VASP Manual"])
  }),
  topic({
    id: "official-tutorials",
    title: "VASP Tutorials Latest",
    description: "官方案例集合，覆盖分子、体相、表面、过渡态和 NEB 等任务。",
    category: "官方学习资源",
    level: "入门",
    tags: ["官方", "案例", "教程"],
    learningGoals: ["按官方案例复现一个完整 VASP 任务。", "理解 atoms/molecules、bulk、surface 和 transition states 的差异。"],
    concepts: ["分子任务偏 Gamma 点和盒子大小。", "体相任务关注 k 点、晶胞优化和电子结构。", "表面和 NEB 与锂硫催化剂机制高度相关。"],
    resources: resourcesByTitle(["VASP Tutorials", "Surface", "Transition"])
  }),
  topic({
    id: "vasp-learn",
    title: "VASP Learn",
    description: "官方学习门户，适合寻找教程、视频和学习资料。",
    category: "官方学习资源",
    level: "入门",
    tags: ["官方", "学习入口"],
    resources: resourcesByTitle(["VASP Learn"])
  }),
  topic({
    id: "surface-tutorial",
    title: "官方表面计算教程",
    description: "学习 slab、表面弛豫、表面 DOS、吸附模型和可视化。",
    category: "官方学习资源",
    level: "专题",
    tags: ["表面", "吸附", "slab"],
    concepts: ["Slab 构型、真空层、固定层和吸附构型是表面任务核心。"],
    workflow: ["构建 slab。", "设置真空层和固定层。", "优化表面或吸附构型。", "分析吸附能、DOS 和电荷密度。"],
    resources: resourcesByTitle(["Surface"])
  }),
  topic({
    id: "neb-tutorial",
    title: "官方 NEB / Transition States 教程",
    description: "学习初末态、中间图像、NEB 路径优化、能垒曲线和过渡态判断。",
    category: "官方学习资源",
    level: "专题",
    tags: ["NEB", "过渡态", "能垒"],
    workflow: ["准备初态和终态。", "插值生成中间图像。", "运行 NEB 优化。", "提取相对能量和最高能垒。"],
    resources: resourcesByTitle(["Transition"])
  })
];

const chineseTopics: VaspKnowledgeTopic[] = [
  topic({
    id: "bigbro",
    title: "BigBro / Learn VASP The Hard Way",
    description: "中文 VASP 系统学习资源，适合输入、输出、任务处理、后处理和 Trouble Shooting。",
    category: "中文学习资源",
    level: "入门",
    tags: ["中文教程", "系统学习", "排错"],
    learningGoals: ["用中文材料快速建立 VASP 学习框架。", "把输入文件、输出文件和后处理任务串成完整流程。"],
    whenToUse: ["刚开始学习 VASP。", "需要中文解释辅助理解官方文档。"],
    resources: resourcesByTitle(["BigBro"])
  }),
  topic({
    id: "chinese-learning-map",
    title: "中文辅助资料组织方式",
    description: "将中文教程作为入门引导，官方文档作为最终核验依据。",
    category: "中文学习资源",
    level: "基础",
    tags: ["学习策略", "中文", "官方核验"],
    workflow: ["先用中文教程理解任务目标。", "再用官方 Wiki/Manual 确认参数含义。", "把个人模板整理为可复用计算清单。"],
    cautions: ["中文教程适合入门，但参数最终应以官方文档和当前 VASP 版本为准。"]
  })
];

const pathTopics: VaspKnowledgeTopic[] = [
  topic({
    id: "linux-basic",
    title: "Linux 基础命令",
    description: "文件操作、查看文件、搜索提取、批量处理、远程传输、作业查看和 VASP 输出文件查看。",
    category: "VASP 入门路线",
    level: "入门",
    tags: ["Linux", "grep", "awk", "服务器"],
    learningGoals: ["掌握查看、移动、复制、删除和搜索文件的能力。", "掌握查看 VASP 大文件输出的方法。", "掌握 grep、awk、sed、find 批量提取结果。"],
    concepts: ["Linux 是多数高性能计算平台的基础环境。", "VASP 输出文件通常很大，不能依赖图形界面逐页查看。", "结果提取的核心是先定位文件，再定位关键词，再提取目标列。"],
    workflow: ["进入计算目录并检查文件。", "用 less/tail 查看输出。", "用 grep 定位关键词。", "用 awk/sed 提取列或行。", "用 find 批量扫描子目录。"],
    commands: [
      {
        id: "linux-basic-1",
        title: "基础文件与目录操作",
        file: "shell",
        command: "pwd\nls -lh\ncd calc1\nmkdir run1\ncp CONTCAR POSCAR\nmv old new\nrm file",
        desc: "查看目录、进入目录、创建目录和整理 VASP 输入输出文件。",
        category: "Linux 基础命令",
        tags: ["Linux", "文件"],
        keywords: ["Linux", "pwd", "ls", "cp"]
      },
      {
        id: "linux-basic-2",
        title: "查看大文件输出",
        file: "OUTCAR / OSZICAR",
        command: "less OUTCAR\ntail -n 50 OUTCAR\ngrep \"TOTEN\" OUTCAR\ngrep -n \"E-fermi\" OUTCAR",
        desc: "快速查看大文件末尾和关键字段。",
        category: "Linux 基础命令",
        tags: ["OUTCAR", "grep"],
        keywords: ["OUTCAR", "grep", "TOTEN"]
      }
    ],
    outputFiles: [
      { file: "OUTCAR", meaning: "详细计算输出", check: "grep 关键词定位能量、费米能级、力和收敛信息" },
      { file: "OSZICAR", meaning: "电子步/离子步摘要", check: "tail -n 1 OSZICAR 快速检查最后一步" }
    ],
    cautions: ["删除文件前务必确认路径；批量命令建议先 echo 预览。"]
  }),
  topic({
    id: "server-job",
    title: "服务器与作业提交",
    description: "SSH、SCP/Rsync、Module、Slurm/PBS、作业脚本、日志查看和续算准备。",
    category: "VASP 入门路线",
    level: "入门",
    tags: ["服务器", "Slurm", "作业"],
    learningGoals: ["理解 VASP 通常在服务器或超算平台运行。", "掌握登录、上传、下载、提交任务、查看任务和取消任务。"],
    concepts: ["SSH 用于远程登录。", "SCP/Rsync 用于上传下载。", "Slurm/PBS 是作业调度系统。", "节点、核数、队列、墙时和内存决定资源申请。"],
    workflow: ["登录服务器。", "上传计算目录。", "加载 VASP/MPI 环境。", "提交 Slurm/PBS 脚本。", "查看队列与日志。"],
    commands: [
      {
        id: "server-job-1",
        title: "远程传输与作业查看",
        file: "shell / Slurm",
        command: "ssh username@server\nscp POSCAR username@server:/path/to/calc/\nrsync -av calc/ username@server:/path/to/calc/\nsqueue -u $USER\nscancel JOBID",
        desc: "常用服务器登录、传输和 Slurm 作业管理命令。",
        category: "服务器与作业提交",
        tags: ["Slurm", "SSH"],
        keywords: ["ssh", "squeue", "scp"]
      }
    ],
    cautions: ["作业脚本应遵循所在集群模板，不同平台的 VASP 可执行文件和并行参数可能不同。"]
  }),
  topic({
    id: "vasp-basic-concepts",
    title: "VASP 基本概念",
    description: "DFT、PAW、平面波、赝势、k 点、电子步、离子步、自洽、总能和主要输出。",
    category: "VASP 入门路线",
    level: "基础",
    tags: ["DFT", "PAW", "自洽"],
    concepts: ["DFT 用电子密度描述体系基态性质。", "PAW 是 VASP 常用赝势方法。", "ENCUT 控制平面波截断能，KPOINTS 控制布里渊区采样。", "电子步由 EDIFF/NELM 控制，离子步由 IBRION/NSW/ISIF 控制。"],
    workflow: ["先理解输入文件作用。", "再区分结构优化、静态自洽、DOS、能带和 NEB。", "最后建立输出文件检查清单。"],
    relatedTopics: ["四大输入文件", "结构优化", "静态自洽计算"]
  }),
  topic({
    id: "four-input-files",
    title: "四大输入文件",
    description: "INCAR、POSCAR、KPOINTS、POTCAR 的职责和依赖关系。",
    category: "VASP 入门路线",
    level: "基础",
    tags: ["INCAR", "POSCAR", "KPOINTS", "POTCAR"],
    concepts: ["INCAR 控制计算任务和算法。", "POSCAR 提供晶格、元素、原子数和坐标。", "KPOINTS 控制 k 点采样。", "POTCAR 提供赝势和价电子信息。"],
    workflow: ["建立计算目录。", "准备 POSCAR。", "按任务写 INCAR。", "设置 KPOINTS。", "按 POSCAR 元素顺序拼接 POTCAR。"],
    outputFiles: [{ file: "OUTCAR", meaning: "VASP 实际读取的参数和赝势信息", check: "检查 ENCUT、ZVAL、NKPTS 和元素顺序" }],
    cautions: ["POTCAR 顺序必须和 POSCAR 元素顺序一致。"]
  }),
  topic({
    id: "first-relaxation",
    title: "结构优化",
    description: "优化 bulk、slab 或吸附结构，理解电子收敛和离子收敛的区别。",
    category: "VASP 入门路线",
    level: "基础",
    tags: ["结构优化", "EDIFFG", "受力"],
    learningGoals: ["学会优化 bulk、slab 或吸附结构。", "知道如何判断结构优化是否成功。"],
    concepts: ["EDIFF 控制电子步收敛，EDIFFG 控制离子步力收敛。", "ISIF 控制是否优化晶胞。"],
    commands: commandsByKeyword(["reached required accuracy", "TOTAL-FORCE", "F="], 4),
    outputFiles: [
      { file: "CONTCAR", meaning: "优化后的结构", check: "复制为 POSCAR 后进入静态计算" },
      { file: "OUTCAR", meaning: "力、应力、体积和收敛信息", check: "检查 reached required accuracy 和最大受力" }
    ],
    cautions: ["吸附结构不应让 slab 底层无约束整体漂移。", "能量比较前需统一 ENCUT、KPOINTS 和泛函。"]
  }),
  topic({
    id: "static-scf",
    title: "静态自洽计算",
    description: "在优化结构基础上获得高精度总能、电荷密度和费米能级。",
    category: "VASP 入门路线",
    level: "基础",
    tags: ["静态", "CHGCAR", "费米能级"],
    concepts: ["静态计算通常不移动原子。", "常从优化后的 CONTCAR 复制为 POSCAR。"],
    workflow: ["cp CONTCAR POSCAR。", "设置 IBRION=-1、NSW=0。", "提高精度并输出 CHGCAR/WAVECAR。", "提取 TOTEN 和 E-fermi。"],
    commands: commandsByKeyword(["TOTEN", "E-fermi", "CHGCAR"], 4),
    outputFiles: [
      { file: "CHGCAR", meaning: "电荷密度", check: "用于 DOS、Bader、差分电荷密度或能带前置自洽" },
      { file: "OUTCAR", meaning: "总能和费米能级", check: "grep TOTEN / E-fermi" }
    ]
  }),
  topic({
    id: "dos-pdos-intro",
    title: "DOS / PDOS",
    description: "理解态密度、分波态密度、费米能级和轨道投影，导出数据并作图。",
    category: "VASP 入门路线",
    level: "进阶",
    tags: ["DOS", "PDOS", "LORBIT"],
    concepts: ["DOS 表示不同能量处电子态数量。", "PDOS 按元素、原子或轨道分解。", "费米能级通常作为能量零点。"],
    workflow: ["完成静态自洽。", "设置 LORBIT、NEDOS、ISMEAR/SIGMA。", "读取 DOSCAR/PROCAR。", "将能量移动到 E-Ef。"],
    commands: commandsByKeyword(["DOSCAR", "PDOS", "d-band"], 4),
    outputFiles: [{ file: "DOSCAR", meaning: "总 DOS 和 PDOS 数据", check: "第 6 行包含 NEDOS 和费米能级" }]
  }),
  topic({
    id: "band-intro",
    title: "能带计算",
    description: "沿高对称路径进行非自洽能带计算，并与 DOS 区分。",
    category: "VASP 入门路线",
    level: "进阶",
    tags: ["能带", "EIGENVAL", "KPATH"],
    workflow: ["结构优化。", "静态自洽生成 CHGCAR。", "准备 line-mode KPOINTS。", "设置 ICHARG=11 非自洽计算。", "读取 EIGENVAL/PROCAR/vasprun.xml 绘图。"],
    commands: commandsByKeyword(["EIGENVAL", "NBANDS", "E-fermi"], 3),
    outputFiles: [{ file: "EIGENVAL", meaning: "能带本征值", check: "读取 NELECT、NKPTS、NBANDS 和能量列" }]
  }),
  topic({
    id: "surface-adsorption-model",
    title: "表面与吸附模型",
    description: "构建 slab、设置真空层、固定底层、选择吸附位点并计算吸附能。",
    category: "VASP 入门路线",
    level: "专题",
    tags: ["slab", "吸附能", "Li2Sn"],
    concepts: ["Slab 是周期性表面模型。", "真空层用于避免表面周期镜像相互作用。", "吸附能比较复合体系、基底和分子能量。"],
    workflow: ["建立 bulk 并切表面。", "设置真空层和固定底层。", "放置吸附物并优化。", "提取 E_complex、E_slab、E_mol。", "计算 E_ads。"],
    commands: commandsByKeyword(["吸附能", "Li2S6", "lis_energy"], 4),
    resources: resourcesByTitle(["Surface"])
  }),
  topic({
    id: "bader-intro",
    title: "Bader 电荷",
    description: "从 CHGCAR/AECCAR/ACF.dat 中分析电荷转移。",
    category: "VASP 入门路线",
    level: "进阶",
    tags: ["Bader", "ACF.dat", "ZVAL"],
    workflow: ["静态计算输出 CHGCAR、AECCAR0、AECCAR2。", "合并参考电荷密度。", "运行 bader。", "提取 ACF.dat 中原子或原子组电荷。", "结合 ZVAL 计算电荷转移。"],
    commands: commandsByKeyword(["Bader", "ACF.dat", "ZVAL"], 5),
    tools: ["Bader", "VASPKIT", "pymatgen"]
  }),
  topic({
    id: "neb-intro",
    title: "NEB 反应路径",
    description: "准备初末态和中间图像，提取相对能量和反应能垒。",
    category: "VASP 入门路线",
    level: "专题",
    tags: ["NEB", "能垒", "VTST"],
    workflow: ["优化初态和终态。", "插值生成图像目录。", "运行 NEB。", "检查每个图像是否正常结束。", "提取 neb_relative.dat 和最高能垒。"],
    commands: commandsByKeyword(["NEB", "neb", "barrier"], 6),
    resources: resourcesByTitle(["Transition", "VTST"])
  }),
  topic({
    id: "paper-data",
    title: "数据整理与论文作图",
    description: "把能量、DOS、电荷、键长、能垒和自由能路径整理为论文图表数据。",
    category: "VASP 入门路线",
    level: "进阶",
    tags: ["CSV", "作图", "论文"],
    workflow: ["统一数据口径。", "导出 CSV。", "记录单位和公式。", "用 Python/Origin 绘图。", "保留脚本和原始输出以便复查。"],
    commands: commandsByKeyword(["CSV", "summary", "自由能"], 4),
    cautions: ["同一张图中的能量、展宽、泛函和结构优化标准必须一致。"]
  })
];

const inputTopics: VaspKnowledgeTopic[] = [
  topic({ id: "incar-basic", title: "INCAR 基础", description: "理解 INCAR 是控制计算任务、算法、收敛和输出的核心文件。", category: "输入文件详解", level: "基础", tags: ["INCAR", "参数"], concepts: ["INCAR 决定结构优化、静态、DOS、能带、NEB 等任务类型。"], commands: commandsByKeyword(["ENCUT", "EDIFF", "ISMEAR"], 3), cautions: ["不要把不同任务的 INCAR 模板混用而不检查参数。"] }),
  topic({ id: "incar-relax", title: "INCAR 结构优化参数", description: "IBRION、NSW、ISIF、EDIFFG、POTIM、ISMEAR 和 SIGMA 的优化设置。", category: "输入文件详解", level: "基础", tags: ["IBRION", "NSW", "ISIF", "EDIFFG"], commands: commandsByKeyword(["EDIFFG", "IBRION", "NSW"], 3), cautions: ["EDIFFG 为负数通常表示以最大受力作为收敛标准。"] }),
  topic({ id: "incar-static", title: "INCAR 静态计算参数", description: "在优化构型上进行高精度自洽，输出总能、电荷密度和费米能级。", category: "输入文件详解", level: "基础", tags: ["静态", "NSW=0", "CHGCAR"], workflow: ["设置 IBRION=-1。", "设置 NSW=0。", "必要时输出 LCHARG/LWAVE。"], commands: commandsByKeyword(["TOTEN", "E-fermi"], 3) }),
  topic({ id: "incar-dos", title: "INCAR DOS/PDOS 参数", description: "LORBIT、NEDOS、ISMEAR、SIGMA 和投影输出设置。", category: "输入文件详解", level: "进阶", tags: ["DOS", "PDOS", "LORBIT"], commands: commandsByKeyword(["DOSCAR", "PDOS"], 4), cautions: ["PDOS 列含义依赖 LORBIT、ISPIN 和 VASP 版本。"] }),
  topic({ id: "incar-magnetism", title: "INCAR 磁性参数", description: "ISPIN、MAGMOM 和局域磁矩输出的设置与检查。", category: "输入文件详解", level: "进阶", tags: ["ISPIN", "MAGMOM", "磁矩"], commands: commandsByKeyword(["magnetization", "ISPIN", "mag="], 4), cautions: ["MAGMOM 数量和顺序必须与 POSCAR 原子顺序一致。"] }),
  topic({ id: "incar-dftu", title: "INCAR DFT+U 参数", description: "LDAU、LDAUL、LDAUU、LDAUJ 的设置和实际读取检查。", category: "输入文件详解", level: "进阶", tags: ["DFT+U", "LDAU"], commands: commandsByKeyword(["LDAU"], 4), cautions: ["U 值比较必须保持同一文献口径或充分说明来源。"] }),
  topic({ id: "incar-dispersion", title: "INCAR 色散校正参数", description: "IVDW、LASPH 等参数用于吸附体系和弱相互作用修正。", category: "输入文件详解", level: "进阶", tags: ["IVDW", "色散", "吸附"], commands: commandsByKeyword(["IVDW", "LASPH"], 3), cautions: ["吸附能比较中是否使用色散校正必须保持一致。"] }),
  topic({ id: "poscar-format", title: "POSCAR 格式", description: "结构标题、缩放因子、晶格矢量、元素顺序、原子数和坐标格式。", category: "输入文件详解", level: "基础", tags: ["POSCAR", "CONTCAR", "结构"], commands: commandsByKeyword(["CONTCAR", "原子总数", "晶格"], 5), cautions: ["元素顺序必须与 POTCAR 保持一致。"] }),
  topic({ id: "kpoints-setting", title: "KPOINTS 设置", description: "Gamma、Monkhorst-Pack、slab 采样和能带 line-mode 路径。", category: "输入文件详解", level: "基础", tags: ["KPOINTS", "NKPTS", "能带"], commands: commandsByKeyword(["NKPTS", "K 点"], 3), cautions: ["slab 体系通常 z 方向 k 点取 1。"] }),
  topic({ id: "potcar-zval", title: "POTCAR 赝势与价电子", description: "核对 TITEL、VRHFIN、ZVAL、POMASS、ENMAX 和 OUTCAR 实际读取信息。", category: "输入文件详解", level: "基础", tags: ["POTCAR", "ZVAL", "ENMAX"], commands: commandsByKeyword(["POTCAR", "ZVAL", "ENMAX"], 7), cautions: ["同一项目内不要混用不同版本赝势。"] })
];

const taskTopics: VaspKnowledgeTopic[] = [
  ...["结构优化", "静态自洽计算", "DOS / PDOS", "能带计算", "表面吸附能计算", "Bader 电荷", "差分电荷密度", "d-band center", "NEB 反应路径", "频率与虚频", "AIMD", "Li2Sn 吸附与转化"].map((titleText) =>
    topic({
      id: `task-${toId(titleText)}`,
      title: titleText,
      description: `${titleText} 的目标、输入设置、关键输出和判断标准。`,
      category: "常见计算任务",
      level: titleText.includes("Li2Sn") || titleText.includes("NEB") ? "专题" : "进阶",
      tags: titleText.includes("Li2Sn") ? ["Li-S", "催化剂"] : titleText.includes("Bader") ? ["Bader", "电荷"] : titleText.includes("DOS") ? ["DOS", "PDOS"] : [titleText],
      commands: commandsByKeyword(titleText.includes("表面") ? ["吸附能"] : titleText.includes("d-band") ? ["d-band"] : titleText.includes("频率") ? ["f/i", "frequencies"] : titleText.includes("NEB") ? ["NEB"] : [titleText.split(" ")[0]], 4),
      relatedTopics: ["输入文件详解", "结果提取命令库"]
    })
  )
];

const commandTopics: VaspKnowledgeTopic[] = commandCategories.map((category) =>
  topic({
    id: `commands-${category.id}`,
    title: category.title,
    description: `集中查看“${category.title}”相关命令、适用文件、说明和注意事项。`,
    category: "结果提取命令库",
    level: "专题",
    tags: ["命令速查", category.title],
    learningGoals: ["能快速定位对应输出文件中的关键数据。", "能复制命令用于服务器批处理或结果汇总。"],
    concepts: ["grep 用于搜索关键词，awk 用于按列提取，find 用于批量扫描目录。"],
    workflow: ["选择分类。", "根据文件名和关键词搜索命令。", "复制命令到服务器执行。", "核对输出列和单位。"],
    commands: category.items.map((item, index) => normalizeCommand(item, category.title, index)),
    cautions: ["命令默认面向 Linux/bash 环境；PowerShell 需要改写。", "复杂三维网格数据不建议完全依赖 grep/awk 手动解析。"]
  })
);

const postTopics = ["DOS / PDOS 图", "能带图", "吸附能柱状图", "Bader 电荷柱状图", "差分电荷密度图", "ELF 图", "NEB 能垒曲线", "自由能路径图", "d-band center 图"].map((titleText) =>
  topic({
    id: `post-${toId(titleText)}`,
    title: titleText,
    description: `${titleText} 的数据来源、处理流程和作图口径。`,
    category: "后处理与数据可视化",
    level: "进阶",
    tags: titleText.includes("NEB") ? ["NEB", "作图"] : titleText.includes("Bader") ? ["Bader", "电荷"] : titleText.includes("DOS") ? ["DOS", "PDOS"] : ["后处理", "可视化"],
    workflow: ["确定原始输出文件。", "提取数据并保存为 dat/csv。", "统一能量零点或归一化口径。", "使用 Python、Origin、VASPKIT 或 VESTA 作图。"],
    commands: commandsByKeyword(titleText.includes("DOS") ? ["DOSCAR", "PDOS"] : titleText.includes("NEB") ? ["NEB"] : titleText.includes("Bader") ? ["Bader", "ACF.dat"] : titleText.includes("d-band") ? ["d-band"] : ["CSV"], 4),
    tools: titleText.includes("差分") || titleText.includes("ELF") ? ["VESTA", "VASPKIT", "pymatgen"] : ["VASPKIT", "pymatgen", "Python"]
  })
);

const liSTopics = [
  "Li2Sn 吸附能计算",
  "多硫化物吸附能对比",
  "吸附构型分析",
  "Bader 电荷转移",
  "差分电荷密度",
  "金属中心磁矩分析",
  "S-S 键长变化",
  "Li-S 键长与锚定方式",
  "d-band center 分析",
  "Li2S 分解 / 转化 NEB 能垒",
  "多步转化自由能图",
  "催化机制总结模板"
].map((titleText) =>
  topic({
    id: `lis-${toId(titleText)}`,
    title: titleText,
    description: `${titleText} 面向锂硫电池催化剂机制分析和论文图表整理。`,
    category: "锂硫电池 / 催化剂专用后处理",
    level: "专题",
    tags: ["Li-S", "催化剂", titleText.includes("NEB") ? "NEB" : titleText.includes("Bader") ? "Bader" : "后处理"],
    concepts: ["Li2Sn 吸附、键长变化、电荷转移、金属中心电子结构和反应能垒需要联合解释。"],
    workflow: ["准备基底、吸附物和复合体系计算。", "提取能量、电荷、磁矩、键长或 NEB 数据。", "按统一公式生成表格。", "结合构型图和电子结构解释催化机制。"],
    commands: commandsByKeyword(titleText.includes("Bader") ? ["Bader", "Li2Sn"] : titleText.includes("磁矩") ? ["磁矩", "金属中心"] : titleText.includes("键长") ? ["S-S", "ASE"] : titleText.includes("d-band") ? ["d-band"] : titleText.includes("NEB") ? ["NEB"] : ["Li2S6", "吸附能"], 4),
    tools: ["ASE", "Bader", "VASPKIT", "VESTA"]
  })
);

const troubleshootingTopics = [
  "结构优化不收敛",
  "电子步不收敛",
  "ZBRENT 报错",
  "BRMIX 警告",
  "too few bands",
  "POTCAR 顺序错误",
  "MAGMOM 设置问题",
  "KPOINTS 不合理",
  "ENCUT 未测试",
  "任务中断与续算",
  "内存与并行问题"
].map((titleText) =>
  topic({
    id: `trouble-${toId(titleText)}`,
    title: titleText,
    description: `${titleText} 的现象识别、排查步骤和常用检查命令。`,
    category: "错误排查与收敛问题",
    level: "排错",
    tags: ["排错", titleText],
    learningGoals: ["快速定位报错来源。", "区分输入错误、数值收敛、资源不足和任务中断。"],
    workflow: ["查看标准输出和 OUTCAR。", "搜索 error/warning/fatal 关键词。", "检查 INCAR、POTCAR、KPOINTS 和结构。", "按最小改动重启测试。"],
    commands: commandsByKeyword(titleText.includes("POTCAR") ? ["POTCAR", "ZVAL"] : titleText.includes("ENCUT") ? ["ENMAX", "ENCUT"] : titleText.includes("bands") ? ["NBANDS"] : titleText.includes("中断") ? ["General timing", "CONTCAR"] : ["error", "warning", "BRMIX", "ZBRENT"], 4),
    cautions: ["不要同时改动过多参数，否则难以判断问题来源。"]
  })
);

const toolTopics: VaspKnowledgeTopic[] = toolResources.map((resource) =>
  topic({
    id: `tool-${toId(resource.title)}`,
    title: resource.title,
    description: resource.desc,
    category: "常用工具与脚本",
    level: "专题",
    tags: resource.tags,
    learningGoals: ["知道该工具适合处理哪些 VASP 数据。", "能把工具纳入当前后处理流程。"],
    concepts: ["工具用于自动化解析、可视化或批量处理，不替代对原始输出的核对。"],
    workflow: ["确认输入文件格式。", "用工具生成或读取数据。", "导出 dat/csv/图片。", "回到 OUTCAR/DOSCAR/ACF.dat 核对关键数值。"],
    tools: [resource.title],
    resources: resourcesByTitle([resource.title])
  })
);

export const vaspKnowledgeModules: VaspKnowledgeModule[] = [
  {
    id: "official-resources",
    title: "官方学习资源",
    description: "VASP Wiki、官方手册、官方教程和专题案例入口，作为参数和理论核验的权威来源。",
    category: "资源",
    level: "基础",
    tags: ["官方", "文档", "教程"],
    children: officialTopics
  },
  {
    id: "chinese-resources",
    title: "中文学习资源",
    description: "中文系统学习资源和资料组织策略，帮助初学者快速建立 VASP 学习路线。",
    category: "资源",
    level: "入门",
    tags: ["中文", "入门", "学习策略"],
    children: chineseTopics
  },
  {
    id: "learning-path",
    title: "VASP 入门路线",
    description: "从 Linux、服务器、基本概念到 DOS、Bader、NEB 和论文作图的完整路线。",
    category: "学习路线",
    level: "入门",
    tags: ["路线", "VASP", "基础"],
    children: pathTopics
  },
  {
    id: "input-files",
    title: "输入文件详解",
    description: "INCAR、POSCAR、KPOINTS、POTCAR 的参数、格式、命令检查和常见错误。",
    category: "输入文件",
    level: "基础",
    tags: ["INCAR", "POSCAR", "KPOINTS", "POTCAR"],
    children: inputTopics
  },
  {
    id: "calculation-tasks",
    title: "常见计算任务",
    description: "结构优化、静态、DOS、能带、吸附能、Bader、NEB、AIMD 和 Li2Sn 转化任务。",
    category: "计算任务",
    level: "进阶",
    tags: ["DFT", "任务", "工作流"],
    children: taskTopics
  },
  {
    id: "command-library",
    title: "结果提取命令库",
    description: "按输出文件和数据类型组织的 VASP 结果提取命令，支持搜索、筛选和复制。",
    category: "命令库",
    level: "专题",
    tags: ["命令速查", "OUTCAR", "awk"],
    children: commandTopics
  },
  {
    id: "post-processing",
    title: "后处理与数据可视化",
    description: "DOS/PDOS、能带、吸附能、电荷、差分电荷密度、ELF、NEB 和自由能图。",
    category: "后处理",
    level: "进阶",
    tags: ["可视化", "数据整理", "作图"],
    children: postTopics
  },
  {
    id: "li-s-processing",
    title: "锂硫电池 / 催化剂专用后处理",
    description: "Li2Sn 吸附、Bader 电荷、磁矩、键长、d-band center、NEB 和自由能路径模板。",
    category: "Li-S 专题",
    level: "专题",
    tags: ["Li-S", "催化剂", "机制"],
    children: liSTopics
  },
  {
    id: "troubleshooting",
    title: "错误排查与收敛问题",
    description: "结构优化、电子步、ZBRENT、BRMIX、POTCAR、MAGMOM、KPOINTS、ENCUT 和续算排查。",
    category: "排错",
    level: "排错",
    tags: ["收敛", "报错", "检查"],
    children: troubleshootingTopics
  },
  {
    id: "tools",
    title: "常用工具与脚本",
    description: "VASPKIT、pymatgen、ASE、py4vasp、VESTA、Bader 和 VTST Scripts 的用途导航。",
    category: "工具",
    level: "专题",
    tags: ["工具", "脚本", "后处理"],
    children: toolTopics
  }
];

const linuxCmd = (
  name: string,
  meaning: string,
  purpose: string,
  syntax: string,
  options: string[],
  examples: { command: string; explanation: string }[],
  output: string,
  pitfalls: string[],
  tags: string[],
  danger?: string
): LinuxCommandDoc => ({ name, meaning, purpose, syntax, options, examples, output, pitfalls, tags, danger });

export const linuxCommandGroups: LinuxCommandGroup[] = [
  {
    id: "file-dir",
    title: "文件与目录操作",
    description: "管理 VASP 计算目录、输入文件和输出文件，所有服务器计算的第一层基本功。",
    commands: [
      linuxCmd("pwd", "显示当前所在目录。", "确认自己正在操作哪个计算目录，避免在错误目录中删除或覆盖文件。", "pwd", ["无常用参数。"], [{ command: "pwd", explanation: "显示当前路径，例如 /home/user/project/ads_Li2S6_FeN4_opt。" }], "输出当前工作目录的绝对路径。", ["不要只凭终端标题判断目录，批量操作前先 pwd。"], ["文件操作"]),
      linuxCmd("ls", "列出目录内容。", "检查 INCAR、POSCAR、KPOINTS、POTCAR、OUTCAR 等文件是否存在。", "ls [选项] [目录]", ["-l：长格式", "-h：可读文件大小", "-a：显示隐藏文件", "-t：按时间排序"], [{ command: "ls -lh", explanation: "查看当前目录文件大小，判断 OUTCAR/CHGCAR 是否生成。" }], "显示文件名、权限、大小和修改时间。", ["文件太多时可配合 less：ls -lh | less。"], ["文件操作", "查看文件"]),
      linuxCmd("cd", "切换目录。", "进入不同 VASP 任务目录，如优化、静态、DOS、Bader 或 NEB 目录。", "cd 目录名", ["..：上一级", "~：用户主目录", "-：回到上一个目录"], [{ command: "cd ads_Li2S6_FeN4", explanation: "进入 FeN4 位点吸附 Li2S6 的计算目录。" }], "成功时通常无输出；失败会提示目录不存在。", ["目录名包含空格时需要引号或转义。"], ["文件操作"]),
      linuxCmd("mkdir", "创建目录。", "为每个 VASP 任务建立独立目录，避免输出文件互相覆盖。", "mkdir [选项] 目录名", ["-p：递归创建多级目录"], [{ command: "mkdir -p project/{slab_opt,slab_static,bader,neb}", explanation: "一次创建常见项目子目录。" }], "成功时通常无输出。", ["不要把多个不同任务混在同一个目录中运行。"], ["文件操作"]),
      linuxCmd("touch", "创建空文件或更新时间戳。", "快速创建 run_vasp.sh、notes.txt 等辅助文件。", "touch 文件名", ["无常用参数。"], [{ command: "touch run_vasp.sh", explanation: "创建一个空的 Slurm 脚本文件。" }], "成功时通常无输出。", ["touch 不会写入内容，仍需编辑脚本。"], ["文件操作", "脚本"]),
      linuxCmd("cp", "复制文件或目录。", "把 CONTCAR 复制成下一步 POSCAR，或复制模板输入文件。", "cp [选项] 源 目标", ["-r：复制目录", "-i：覆盖前确认", "-p：保留时间和权限"], [{ command: "cp CONTCAR POSCAR", explanation: "将优化后的结构作为静态计算输入结构。" }], "成功时通常无输出。", ["默认会覆盖同名目标文件。"], ["文件操作", "危险命令"], "覆盖 POSCAR 前先确认是否需要备份，例如 cp POSCAR POSCAR.bak。"),
      linuxCmd("mv", "移动或重命名文件。", "重命名旧输出、移动计算目录或整理结果文件。", "mv [选项] 源 目标", ["-i：覆盖前确认", "-n：不覆盖已有文件"], [{ command: "mv OUTCAR OUTCAR.opt", explanation: "保留优化阶段 OUTCAR，避免被下一步覆盖。" }], "成功时通常无输出。", ["mv 到已有文件名会覆盖。"], ["文件操作", "危险命令"], "移动大目录或覆盖文件前先 ls 检查目标路径。"),
      linuxCmd("rm", "删除文件或目录。", "删除不需要的 WAVECAR、CHGCAR、临时输出或错误计算目录。", "rm [选项] 文件", ["-r：递归删除目录", "-f：强制删除", "-i：删除前确认"], [{ command: "rm -i WAVECAR CHGCAR", explanation: "逐个确认删除大文件。" }, { command: "echo rm -rf */WAVECAR", explanation: "批量删除前先预览匹配范围。" }], "成功时通常无输出，删除后通常无法恢复。", ["不要随意执行 rm -rf *。"], ["文件操作", "危险命令"], "rm 是高危命令，尤其是 -r、-f、通配符和项目根目录组合。"),
      linuxCmd("rmdir", "删除空目录。", "清理已经确认为空的计算目录。", "rmdir 目录名", ["-p：递归删除空父目录"], [{ command: "rmdir empty_calc", explanation: "删除空目录；目录非空时会失败。" }], "成功时无输出；非空会提示 Directory not empty。", ["它不能删除非空目录，非空目录不要急着 rm -r。"], ["文件操作"])
    ]
  },
  {
    id: "view-monitor",
    title: "文件查看与实时监控",
    description: "查看 OUTCAR、OSZICAR、vasp.out、slurm 输出等大文件，避免用编辑器硬开超大文件。",
    commands: [
      linuxCmd("cat", "一次性输出文件内容。", "查看很短的 INCAR、KPOINTS、提交脚本或小日志。", "cat 文件名", ["-n：显示行号"], [{ command: "cat INCAR", explanation: "查看当前任务使用的 INCAR 参数。" }], "把整个文件打印到终端。", ["不要 cat 巨大的 OUTCAR，容易刷屏。"], ["查看文件"]),
      linuxCmd("less", "分页查看文件。", "安全查看 OUTCAR、vasp.out 等大文件，支持搜索和翻页。", "less 文件名", ["/关键词：搜索", "n：下一个匹配", "q：退出"], [{ command: "less OUTCAR", explanation: "分页查看 OUTCAR，可输入 /E-fermi 搜索费米能级。" }], "进入分页界面。", ["退出 less 用 q。"], ["查看文件"]),
      linuxCmd("more", "简单分页查看文件。", "在 less 不可用时分页查看输出。", "more 文件名", ["空格：下一页", "q：退出"], [{ command: "more OSZICAR", explanation: "分页查看 OSZICAR。" }], "进入分页显示。", ["功能比 less 少，优先用 less。"], ["查看文件"]),
      linuxCmd("head", "查看文件开头。", "检查 POSCAR、CONTCAR、POTCAR 头部和结构信息。", "head [选项] 文件", ["-n N：显示前 N 行"], [{ command: "head -n 8 CONTCAR", explanation: "查看标题、晶格、元素和原子数。" }], "输出文件前若干行。", ["看 OUTCAR 结尾不要用 head。"], ["查看文件", "结构"]),
      linuxCmd("tail", "查看文件末尾。", "查看 OUTCAR、OSZICAR、vasp.out 的最新输出。", "tail [选项] 文件", ["-n N：显示末尾 N 行", "-f：实时跟踪"], [{ command: "tail -n 40 OUTCAR", explanation: "查看 OUTCAR 末尾是否正常结束。" }], "输出文件末尾若干行。", ["任务仍在写文件时，tail 只显示当前已有内容。"], ["查看文件"]),
      linuxCmd("tail -f", "实时监控文件追加内容。", "观察 VASP 标准输出、Slurm 日志是否持续运行。", "tail -f 文件名", ["Ctrl+C：停止跟踪"], [{ command: "tail -f vasp.out", explanation: "实时查看 VASP 输出是否继续更新。" }], "持续打印新追加的日志。", ["不要开太多 tail -f 占用终端。"], ["查看文件", "作业提交"]),
      linuxCmd("wc", "统计行数、词数和字节数。", "判断输出文件规模、检查 POSCAR 坐标行数或日志长度。", "wc [选项] 文件", ["-l：统计行数", "-c：字节数"], [{ command: "wc -l OSZICAR", explanation: "粗略查看优化走了多少步。" }], "输出统计值和文件名。", ["POSCAR 行数检查还要结合元素数量判断。"], ["查看文件"]),
      linuxCmd("file", "识别文件类型。", "判断脚本、压缩包、文本输出或二进制文件类型。", "file 文件名", ["无常用参数。"], [{ command: "file WAVECAR CHGCAR OUTCAR", explanation: "区分二进制/文本/大型网格文件。" }], "输出系统识别的文件类型。", ["不要用 grep 解析二进制 WAVECAR。"], ["查看文件"]),
      linuxCmd("stat", "查看文件详细元数据。", "确认 OUTCAR、CHGCAR 修改时间和文件大小是否还在变化。", "stat 文件名", ["无常用参数。"], [{ command: "stat OUTCAR", explanation: "查看 OUTCAR 的大小和最后修改时间。" }], "输出权限、大小、时间戳等信息。", ["不同系统 stat 输出格式可能不同。"], ["查看文件"])
    ]
  },
  {
    id: "text-extract",
    title: "搜索、筛选与文本提取",
    description: "从 OUTCAR、OSZICAR、DOSCAR、ACF.dat 等文本文件中提取能量、费米能级、受力、电荷和报错信息。",
    commands: [
      linuxCmd("grep", "搜索包含关键词的行。", "从 OUTCAR、OSZICAR、vasp.out 或 slurm 输出中查找能量、费米能级、报错和收敛信息。", "grep [选项] \"关键词\" 文件", ["-n：显示行号", "-i：忽略大小写", "-E：扩展正则", "-r：递归搜索", "-m 1：只取第一个"], [{ command: "grep \"free  energy   TOTEN\" OUTCAR", explanation: "查找 OUTCAR 中所有 TOTEN 能量行。" }, { command: "grep -i -n \"error\\|warning\\|fatal\" OUTCAR vasp.out slurm-*.out 2>/dev/null", explanation: "在多个输出文件中查找错误和警告。" }], "输出所有匹配行；配合 -n 会显示行号。", ["grep 只能可靠搜索文本文件；OUTCAR 很大时优先 grep/less/tail。"], ["搜索提取", "VASP 后处理"]),
      linuxCmd("awk", "按列、条件或模式处理文本。", "从匹配行中提取指定列，如 TOTEN 数值、费米能级、Bader 电荷。", "awk '条件{动作}' 文件", ["$1/$2：第 1/2 列", "NR：行号", "END：结束后执行"], [{ command: "grep \"free  energy   TOTEN\" OUTCAR | tail -n 1 | awk '{print $5}'", explanation: "输出最终 TOTEN 数值。" }], "输出 awk 动作指定的列或计算结果。", ["列号依赖文件格式，先看原始行再写 awk。"], ["搜索提取", "VASP 后处理"]),
      linuxCmd("sed", "按行编辑或替换文本。", "按行号查看片段、批量替换脚本模板中的路径或参数。", "sed [选项] '命令' 文件", ["-n：只输出匹配内容", "p：打印", "s/a/b/g：替换"], [{ command: "sed -n '2,7p' CONTCAR", explanation: "查看晶格、元素和原子数相关行。" }], "输出指定行或替换后的文本。", ["用 -i 原地修改文件前必须备份。"], ["搜索提取", "文件操作"]),
      linuxCmd("cut", "按分隔符切列。", "处理 CSV、简单表格或固定分隔符输出。", "cut -d 分隔符 -f 列 文件", ["-d：分隔符", "-f：字段编号", "-c：字符范围"], [{ command: "cut -d, -f1,2 adsorption_energy.csv", explanation: "提取吸附能表中的体系名和能量列。" }], "输出指定字段。", ["不适合空格数量变化复杂的 OUTCAR，OUTCAR 常用 awk。"], ["搜索提取"]),
      linuxCmd("sort", "排序文本行。", "按目录名、能量值或编号排序结果表。", "sort [选项] 文件", ["-n：数值排序", "-r：逆序", "-k：按列", "-V：版本号排序"], [{ command: "sort -V neb_energies.dat", explanation: "按 NEB 图像目录编号排序。" }], "输出排序后的行。", ["默认按字符排序，数字要用 -n 或 -V。"], ["搜索提取", "批量处理"]),
      linuxCmd("uniq", "合并相邻重复行。", "统计重复报错、元素标签或目录列表。", "uniq [选项] 文件", ["-c：计数", "-d：只显示重复"], [{ command: "grep -i warning OUTCAR | sort | uniq -c", explanation: "统计不同 warning 出现次数。" }], "输出去重后的行。", ["uniq 只合并相邻重复，通常先 sort。"], ["搜索提取"]),
      linuxCmd("column", "把文本按列对齐显示。", "美化 CSV/空格表格，便于终端快速检查。", "column [选项] 文件", ["-t：表格对齐", "-s：指定分隔符"], [{ command: "column -s, -t adsorption_energy.csv", explanation: "把吸附能 CSV 对齐显示。" }], "输出对齐后的表格。", ["只改变显示，不改变数据文件。"], ["搜索提取", "查看文件"]),
      linuxCmd("paste", "按列合并文件。", "把能量、键长、电荷等不同数据列合成一个表。", "paste 文件1 文件2", ["-d：指定分隔符"], [{ command: "paste systems.txt energies.txt > table.dat", explanation: "把体系名称和能量列合并。" }], "输出横向拼接后的行。", ["两个文件行数不一致会导致错位。"], ["搜索提取", "批量处理"])
    ]
  },
  {
    id: "batch",
    title: "批量查找与批量处理",
    description: "跨多个计算目录查找 OUTCAR、批量提取能量、批量清理临时文件，是做材料筛选和 Li-S 对比计算的核心能力。",
    commands: [
      linuxCmd("find", "按条件查找文件。", "递归查找所有 OUTCAR、CONTCAR、ACF.dat 或特定目录。", "find 路径 条件 动作", ["-name：按名称", "-type f/d：文件/目录", "-print0：安全输出"], [{ command: "find . -name OUTCAR -print0", explanation: "查找当前目录下所有 OUTCAR。" }], "输出匹配路径。", ["配合删除动作前先只打印检查。"], ["批量处理", "搜索提取"]),
      linuxCmd("xargs", "把标准输入转成命令参数。", "对 find/grep 输出的文件批量执行命令。", "命令1 | xargs 命令2", ["-0：配合 -print0", "-I{}：占位符"], [{ command: "find . -name OSZICAR -print0 | xargs -0 tail -n 1", explanation: "查看多个 OSZICAR 最后一行。" }], "对每个输入路径执行后续命令。", ["文件名含空格时用 find -print0 和 xargs -0。"], ["批量处理"]),
      linuxCmd("for 循环", "对列表逐项执行命令。", "批量进入多个吸附体系目录提取能量或检查完成状态。", "for x in 列表; do 命令; done", ["变量用 $x 引用", "可配合通配符"], [{ command: "for d in ads_*; do grep \"TOTEN\" \"$d/OUTCAR\" | tail -n 1; done", explanation: "批量查看吸附体系最终能量行。" }], "按循环体中的命令输出。", ["路径变量要加引号，避免特殊字符出错。"], ["批量处理"]),
      linuxCmd("*", "匹配任意长度字符的通配符。", "批量匹配 slurm-*.out、ads_* 目录或所有 WAVECAR。", "ls slurm-*.out", ["用于 shell 展开，不是命令参数"], [{ command: "grep -i error slurm-*.out", explanation: "在所有 Slurm 输出中搜索 error。" }], "由 shell 展开为匹配文件列表。", ["rm -rf * 极危险，先 echo 预览。"], ["批量处理", "危险命令"], "通配符删除可能一次性删掉整个计算目录。"),
      linuxCmd("?", "匹配单个字符的通配符。", "匹配 NEB 的 00、01、02 或单字符编号目录。", "ls 0?", ["用于 shell 展开"], [{ command: "for d in 0?; do tail -n 1 \"$d/OSZICAR\"; done", explanation: "查看 NEB 图像目录的 OSZICAR 末行。" }], "展开为匹配路径。", ["匹配范围比 * 窄，但仍要预览。"], ["批量处理"]),
      linuxCmd("{}", "花括号展开。", "快速创建多个目录或复制多个同类文件名。", "mkdir {opt,static,dos}", ["逗号列表", "范围：{1..5}"], [{ command: "mkdir -p {slab_opt,slab_static,Li2S6_opt,bader,neb}", explanation: "创建常见 VASP 工作流目录。" }], "shell 展开后执行命令。", ["花括号不会检查路径是否存在。"], ["批量处理", "文件操作"]),
      linuxCmd("$()", "命令替换。", "把一个命令的输出作为另一个命令的参数或变量值。", "var=$(命令)", ["常用于脚本变量"], [{ command: "e=$(grep \"TOTEN\" OUTCAR | tail -n 1 | awk '{print $5}')", explanation: "把最终能量保存到变量 e。" }], "替换为内部命令输出。", ["复杂命令要注意引号和空输出。"], ["批量处理", "脚本"])
    ]
  },
  {
    id: "redirect-pipe",
    title: "重定向与管道",
    description: "把命令连接起来，或把提取结果写入 CSV/dat 文件，是 VASP 后处理命令组合的基础。",
    commands: [
      linuxCmd("|", "管道，把前一个命令输出交给后一个命令。", "组合 grep、tail、awk 提取最终能量。", "命令1 | 命令2", ["可串联多个管道"], [{ command: "grep \"TOTEN\" OUTCAR | tail -n 1 | awk '{print $5}'", explanation: "筛选能量行、取最后一步、输出数值。" }], "输出最后一个命令的结果。", ["管道中任一步为空，后续也可能为空。"], ["搜索提取", "VASP 后处理"]),
      linuxCmd(">", "覆盖写入文件。", "把提取结果写入新的 CSV/dat 文件。", "命令 > 文件", ["覆盖目标文件"], [{ command: "grep \"TOTEN\" OUTCAR > toten.dat", explanation: "把所有 TOTEN 行写入文件。" }], "终端不显示，内容写入文件。", ["会覆盖已有文件。"], ["批量处理", "危险命令"], "写入重要结果前确认目标文件名，必要时用 >> 追加。"),
      linuxCmd(">>", "追加写入文件。", "循环中逐行追加结果。", "命令 >> 文件", ["追加到文件末尾"], [{ command: "echo \"ads1,-1.23\" >> adsorption_energy.csv", explanation: "向 CSV 末尾追加一行。" }], "内容追加到目标文件。", ["重复执行会重复追加，需要清空时用 > 重建表头。"], ["批量处理"]),
      linuxCmd("<", "从文件读取标准输入。", "给需要标准输入的程序或命令传入文件。", "命令 < 文件", ["较少用于 VASP 输出提取"], [{ command: "sort -n < values.dat", explanation: "从 values.dat 读入并排序。" }], "等价于命令读取该文件内容。", ["很多命令也可直接写文件名。"], ["批量处理"]),
      linuxCmd("2>", "重定向错误输出。", "把错误信息单独写入文件。", "命令 2> error.log", ["2 表示 stderr"], [{ command: "grep TOTEN missing.OUTCAR 2> grep.err", explanation: "把找不到文件的错误写入 grep.err。" }], "正常输出仍显示，错误写入文件。", ["不要把真正错误长期静默忽略。"], ["排错"]),
      linuxCmd("2>/dev/null", "丢弃错误输出。", "批量搜索时忽略不存在文件带来的干扰。", "命令 2>/dev/null", ["常用于 grep 多文件"], [{ command: "grep -i error OUTCAR vasp.out slurm-*.out 2>/dev/null", explanation: "忽略不存在的 slurm 输出文件报错。" }], "只显示正常匹配结果。", ["排错时不要过度隐藏错误。"], ["搜索提取"]),
      linuxCmd("&>", "同时重定向标准输出和错误输出。", "把脚本运行日志完整保存。", "命令 &> log", ["bash 支持"], [{ command: "bash extract.sh &> extract.log", explanation: "保存提取脚本的全部输出。" }], "stdout 和 stderr 都写入文件。", ["覆盖目标文件。"], ["脚本", "排错"]),
      linuxCmd("tee", "同时显示并写入文件。", "运行脚本时既看终端输出又保存日志。", "命令 | tee 文件", ["-a：追加"], [{ command: "grep \"TOTEN\" OUTCAR | tee toten.dat", explanation: "显示 TOTEN 行并保存。" }], "终端显示，同时写入文件。", ["默认覆盖，追加用 tee -a。"], ["批量处理", "查看文件"])
    ]
  },
  {
    id: "archive",
    title: "压缩与解压",
    description: "打包计算结果、传输大批目录、节省服务器空间。",
    commands: [
      linuxCmd("tar", "打包或解包目录。", "归档 VASP 项目目录，常与 gzip 组合。", "tar [选项] 包名 文件/目录", ["-c：创建", "-x：解包", "-z：gzip", "-f：文件名", "-v：显示过程"], [{ command: "tar -czf project_results.tar.gz OUTCAR CONTCAR OSZICAR", explanation: "打包关键结果文件。" }], "生成或解开 tar/tar.gz 文件。", ["解包前先 tar -tf 查看内容，避免覆盖。"], ["文件操作", "远程传输"]),
      linuxCmd("gzip", "压缩单个文件。", "压缩 OUTCAR、vasp.out 等大文本文件。", "gzip 文件", ["-k：保留原文件", "-d：解压"], [{ command: "gzip -k OUTCAR", explanation: "生成 OUTCAR.gz 并保留 OUTCAR。" }], "生成 .gz 文件。", ["默认会删除原文件，保留用 -k。"], ["文件操作"]),
      linuxCmd("gunzip", "解压 .gz 文件。", "恢复 OUTCAR.gz、DOSCAR.gz 等文件。", "gunzip 文件.gz", ["-k：保留压缩包"], [{ command: "gunzip -k OUTCAR.gz", explanation: "解压并保留压缩文件。" }], "生成解压后的文件。", ["同名文件存在时可能提示覆盖。"], ["文件操作"]),
      linuxCmd("zip", "创建 zip 压缩包。", "与 Windows 用户交换小型结果文件。", "zip [选项] 包名 文件", ["-r：递归目录"], [{ command: "zip -r figures_data.zip *.csv *.dat", explanation: "打包作图数据。" }], "生成 .zip 文件。", ["大量大文件优先 tar.gz。"], ["文件操作"]),
      linuxCmd("unzip", "解压 zip 文件。", "解压下载的脚本、数据或工具包。", "unzip 包名.zip", ["-l：列出内容", "-d：指定目录"], [{ command: "unzip -l data.zip", explanation: "先查看压缩包内容。" }], "解出文件或列出清单。", ["解压前确认不会覆盖当前文件。"], ["文件操作"])
    ]
  },
  {
    id: "permission-env",
    title: "权限、脚本与环境变量",
    description: "让提交脚本可执行、加载 VASP 环境、定位可执行文件和查看命令帮助。",
    commands: [
      linuxCmd("chmod", "修改权限。", "让 run_vasp.sh 或后处理脚本可执行。", "chmod [权限] 文件", ["+x：增加执行权限", "755：常见可执行权限"], [{ command: "chmod +x run_vasp.sh", explanation: "给提交脚本执行权限。" }], "成功无输出；ls -l 可检查 x 权限。", ["不要给不可信脚本执行权限。"], ["脚本", "作业提交"]),
      linuxCmd("bash", "用 bash 执行脚本。", "运行提取脚本或测试作业脚本。", "bash 脚本.sh", ["-x：显示执行过程"], [{ command: "bash extract_energy.sh", explanation: "运行能量提取脚本。" }], "显示脚本输出。", ["脚本错误时可用 bash -x 调试。"], ["脚本"]),
      linuxCmd("sh", "用 sh 执行脚本。", "执行兼容 POSIX shell 的简单脚本。", "sh 脚本.sh", ["无常用参数。"], [{ command: "sh check_done.sh", explanation: "运行简单检查脚本。" }], "显示脚本输出。", ["bash 专有语法在 sh 中可能失败。"], ["脚本"]),
      linuxCmd("source", "在当前 shell 中执行脚本。", "加载环境变量、别名或软件环境配置。", "source 文件", [". 文件：等价写法"], [{ command: "source ~/.bashrc", explanation: "重新加载用户环境配置。" }], "环境变量在当前终端生效。", ["不要 source 不可信脚本。"], ["环境变量"]),
      linuxCmd("export", "设置环境变量。", "设置 PATH、脚本路径或软件变量。", "export NAME=value", ["可配合 PATH"], [{ command: "export PATH=$PATH:/path/to/vtst", explanation: "把 VTST 脚本目录加入 PATH。" }], "成功无输出；echo $NAME 可查看。", ["临时 export 只对当前终端有效。"], ["环境变量"]),
      linuxCmd("echo", "打印文本或变量。", "检查变量、预览危险命令或输出表头。", "echo 内容", ["-e：解释转义"], [{ command: "echo $PATH", explanation: "查看 PATH 是否包含 VASP 或脚本目录。" }, { command: "echo rm -rf */WAVECAR", explanation: "预览批量删除命令。" }], "输出文本或变量值。", ["echo 只预览，不执行后续字符串。"], ["环境变量", "危险命令"]),
      linuxCmd("which", "查找命令路径。", "确认 vasp_std、vasp_gam、bader、vaspkit 是否可用。", "which 命令名", ["无常用参数。"], [{ command: "which vasp_std", explanation: "确认 vasp_std 是否在 PATH 中。" }], "输出可执行文件路径；无输出表示未找到。", ["module 未加载时可能找不到 VASP。"], ["环境变量", "作业提交"]),
      linuxCmd("module", "管理集群软件环境。", "加载 VASP、MPI、编译器或后处理工具。", "module 子命令 软件名", ["avail：可用模块", "load：加载", "list：已加载", "purge：清空"], [{ command: "module avail\nmodule load vasp\nmodule list", explanation: "查看、加载并确认 VASP 环境。" }], "显示模块列表或加载信息。", ["不同集群模块名不同，按平台文档为准。"], ["环境变量", "Slurm"]),
      linuxCmd("env", "显示环境变量。", "排查 PATH、LD_LIBRARY_PATH、VASP 运行环境。", "env", ["可配合 grep"], [{ command: "env | grep PATH", explanation: "查看路径相关环境变量。" }], "输出当前环境变量。", ["输出较多，常配合 grep。"], ["环境变量"]),
      linuxCmd("history", "查看历史命令。", "找回之前运行过的提取命令或提交命令。", "history", ["!编号：重复历史命令，慎用"], [{ command: "history | grep sbatch", explanation: "查找最近提交任务命令。" }], "输出历史命令编号和内容。", ["重复危险命令前必须确认。"], ["脚本", "危险命令"]),
      linuxCmd("man", "查看命令手册。", "学习不熟悉命令的参数和语法。", "man 命令名", ["q：退出", "/关键词：搜索"], [{ command: "man grep", explanation: "查看 grep 官方手册。" }], "打开手册页。", ["有些集群精简环境可能未安装完整 man page。"], ["帮助"])
    ]
  },
  {
    id: "remote",
    title: "远程连接与文件传输",
    description: "连接服务器、上传输入文件、下载结果和同步大目录。",
    commands: [
      linuxCmd("ssh", "远程登录服务器。", "进入超算或服务器运行 VASP。", "ssh [-p 端口] 用户名@服务器", ["-p：指定端口", "-X：X11 转发，少用"], [{ command: "ssh username@server_ip", explanation: "使用默认 22 端口登录。" }, { command: "ssh -p 22 username@server_ip", explanation: "显式指定端口。" }], "首次登录会提示 known_hosts 指纹确认。", ["登录失败常见原因：网络、用户名、端口、权限或密码/密钥错误。"], ["远程传输", "作业提交"]),
      linuxCmd("scp", "通过 SSH 复制文件。", "上传 POSCAR/INCAR，下载 OUTCAR/CONTCAR。", "scp 源 目标", ["-P：指定端口", "-r：复制目录"], [{ command: "scp POSCAR username@server:/path/to/calc/", explanation: "上传 POSCAR 到服务器目录。" }], "显示传输进度。", ["大目录频繁同步优先 rsync。"], ["远程传输"]),
      linuxCmd("rsync", "增量同步文件。", "同步整个计算目录，避免重复传输未变化文件。", "rsync [选项] 源 目标", ["-a：归档", "-v：显示过程", "-z：压缩", "--dry-run：预演"], [{ command: "rsync -av calc/ username@server:/path/to/calc/", explanation: "同步 calc 目录内容。" }], "显示新增、更新的文件列表。", ["带 --delete 会删除目标多余文件，慎用。"], ["远程传输", "批量处理"]),
      linuxCmd("sftp", "交互式文件传输。", "在受限环境中上传下载文件。", "sftp 用户名@服务器", ["put：上传", "get：下载", "ls/cd：浏览远端"], [{ command: "sftp username@server_ip", explanation: "进入交互式传输会话。" }], "进入 sftp 提示符。", ["不适合复杂批量同步，批量优先 rsync。"], ["远程传输"])
    ]
  },
  {
    id: "process",
    title: "进程与任务查看",
    description: "查看本机进程、后台脚本和长时间运行的后处理任务。",
    commands: [
      linuxCmd("ps", "查看进程快照。", "确认某个脚本、vaspkit、python 后处理是否仍在运行。", "ps [选项]", ["aux：全部用户详细进程", "-u USER：指定用户"], [{ command: "ps aux | grep vasp", explanation: "查找包含 vasp 的进程。" }], "输出进程 PID、CPU、内存和命令。", ["grep 本身也会出现在结果中。"], ["作业提交", "排错"]),
      linuxCmd("top", "动态查看进程资源。", "观察 CPU、内存占用，判断任务是否异常。", "top", ["q：退出", "P：按 CPU 排序", "M：按内存排序"], [{ command: "top", explanation: "动态查看节点当前资源使用。" }], "实时刷新进程列表。", ["集群计算节点上使用需遵守平台规则。"], ["排错"]),
      linuxCmd("htop", "增强版动态进程查看。", "更直观查看 CPU 核心、内存和进程树。", "htop", ["F3 搜索", "F9 结束进程"], [{ command: "htop", explanation: "交互式查看资源占用。" }], "打开交互界面。", ["不一定安装；结束进程要谨慎。"], ["排错"]),
      linuxCmd("kill", "发送信号结束进程。", "停止误运行的后处理脚本或本地任务。", "kill PID", ["-9：强制结束", "-15：默认温和结束"], [{ command: "kill 12345", explanation: "结束 PID 为 12345 的进程。" }], "成功通常无输出。", ["不要 kill 不属于自己的任务；Slurm 作业应用 scancel。"], ["危险命令", "排错"], "对 Slurm 队列中的 VASP 任务优先用 scancel，不要直接 kill 计算节点进程。"),
      linuxCmd("nohup", "忽略挂断运行命令。", "让小型后处理脚本在退出终端后继续运行。", "nohup 命令 &", ["输出默认到 nohup.out"], [{ command: "nohup python plot_dos.py &", explanation: "后台运行绘图脚本。" }], "返回后台任务号和 PID。", ["不适合替代 Slurm 运行正式 VASP。"], ["脚本"]),
      linuxCmd("screen", "终端会话保持工具。", "在断线后继续保留交互式会话。", "screen [选项]", ["-S：命名会话", "-r：恢复会话"], [{ command: "screen -S vasp_post", explanation: "创建名为 vasp_post 的会话。" }], "进入 screen 会话。", ["退出和 detach 操作要分清。"], ["远程传输", "脚本"]),
      linuxCmd("tmux", "终端复用工具。", "管理多个持久终端窗口，适合后处理和监控。", "tmux [命令]", ["new -s：新会话", "attach -t：恢复会话", "ls：列会话"], [{ command: "tmux new -s monitor", explanation: "创建监控会话。" }], "进入 tmux 会话。", ["快捷键需要学习，避免误关窗口。"], ["远程传输", "脚本"])
    ]
  },
  {
    id: "scheduler",
    title: "超算 / 集群作业系统常用命令",
    description: "Slurm 和 PBS 常用命令，用于提交、查看、取消和追踪 VASP 作业。",
    commands: [
      linuxCmd("sbatch", "提交 Slurm 作业。", "提交 run_vasp.sh 到队列。", "sbatch 脚本.sh", ["-J：任务名", "-p：队列", "-N：节点数", "-n：核数"], [{ command: "sbatch run_vasp.sh", explanation: "提交 VASP 作业脚本。" }], "返回 Submitted batch job JOBID。", ["脚本路径、队列名、核数需符合集群规则。"], ["Slurm", "作业提交"]),
      linuxCmd("squeue", "查看 Slurm 队列。", "查看作业是排队还是运行。", "squeue [选项]", ["-u $USER：当前用户", "-j JOBID：指定作业"], [{ command: "squeue -u $USER", explanation: "查看自己的作业状态。" }], "显示 JOBID、状态、节点和运行时间。", ["PENDING 不一定是错误，可能是资源排队。"], ["Slurm", "作业提交"]),
      linuxCmd("scancel", "取消 Slurm 作业。", "停止提交错误或不再需要的任务。", "scancel JOBID", ["无常用参数。"], [{ command: "scancel 123456", explanation: "取消指定作业。" }], "成功通常无输出。", ["取消前确认 JOBID，避免停错任务。"], ["Slurm", "危险命令"], "取消正在运行的 VASP 可能留下不完整 OUTCAR/CONTCAR，需要检查后再续算。"),
      linuxCmd("sacct", "查看历史作业记录。", "确认作业是否完成、超时、失败或被取消。", "sacct [选项]", ["-j JOBID：指定作业", "--format：指定列"], [{ command: "sacct -j 123456", explanation: "查看指定作业历史状态。" }], "输出 COMPLETED、FAILED、TIMEOUT、CANCELLED 等状态。", ["不同集群 sacct 数据可能有延迟。"], ["Slurm", "排错"]),
      linuxCmd("scontrol", "查看或控制 Slurm 作业详情。", "查看排队原因、节点分配和作业配置。", "scontrol show job JOBID", ["show job：作业详情"], [{ command: "scontrol show job 123456", explanation: "查看作业详细信息和排队原因。" }], "输出完整作业字段。", ["输出较长，关注 JobState、Reason、NumNodes。"], ["Slurm", "排错"]),
      linuxCmd("sinfo", "查看 Slurm 节点和分区状态。", "判断队列是否有空闲节点或维护状态。", "sinfo", ["-p：指定分区", "-N：按节点显示"], [{ command: "sinfo -p normal", explanation: "查看 normal 队列状态。" }], "显示分区、可用性和节点状态。", ["节点忙并不代表任务错误。"], ["Slurm"]),
      linuxCmd("qsub", "提交 PBS 作业。", "在 PBS 系统上提交 VASP 脚本。", "qsub 脚本.sh", ["不同平台参数不同"], [{ command: "qsub run_vasp.pbs", explanation: "提交 PBS 作业。" }], "返回 PBS 作业号。", ["PBS 与 Slurm 指令不能混用。"], ["PBS", "作业提交"]),
      linuxCmd("qstat", "查看 PBS 队列。", "查看 PBS 作业状态。", "qstat [作业号]", ["-u USER：指定用户"], [{ command: "qstat -u $USER", explanation: "查看自己的 PBS 作业。" }], "显示作业状态和队列信息。", ["状态字母需查平台说明。"], ["PBS"]),
      linuxCmd("qdel", "取消 PBS 作业。", "停止 PBS 队列中的任务。", "qdel JOBID", ["无常用参数。"], [{ command: "qdel 123456", explanation: "取消指定 PBS 作业。" }], "成功通常无输出。", ["确认作业号后再取消。"], ["PBS", "危险命令"])
    ]
  }
];

export const linuxPracticeTasks = [
  { title: "查看当前目录", command: "pwd", explanation: "确认当前所在计算路径。" },
  { title: "查看当前目录文件", command: "ls\nls -lh", explanation: "确认输入文件和输出文件是否齐全。" },
  { title: "进入计算目录", command: "cd ads_Li2S6_FeN4", explanation: "进入指定吸附体系计算目录。" },
  { title: "查看 OUTCAR 末尾", command: "tail OUTCAR", explanation: "快速查看最后输出信息。" },
  { title: "实时查看任务输出", command: "tail -f vasp.out", explanation: "监控 VASP 是否持续输出。" },
  { title: "提取最终能量", command: "grep \"free  energy   TOTEN\" OUTCAR | tail -n 1", explanation: "查看最终 TOTEN 行。" },
  { title: "提取费米能级", command: "grep \"E-fermi\" OUTCAR | tail -n 1", explanation: "查看最终费米能级。" },
  { title: "检查是否收敛", command: "grep \"reached required accuracy\" OUTCAR", explanation: "判断结构优化是否达到精度。" },
  { title: "查找报错", command: "grep -i -n \"error\\|warning\\|fatal\" OUTCAR vasp.out slurm-*.out 2>/dev/null", explanation: "在常见输出中定位错误和警告。" },
  {
    title: "批量提取多个目录能量",
    command: "find . -name OUTCAR -print0 | while IFS= read -r -d '' f; do\n  d=${f%/OUTCAR}\n  e=$(grep \"free  energy   TOTEN\" \"$f\" | tail -n 1 | awk '{print $5}')\n  printf \"%s,%s\\n\" \"$d\" \"$e\"\ndone > energies.csv",
    explanation: "递归扫描 OUTCAR 并生成 energies.csv。"
  }
];

const allTopics = () => vaspKnowledgeModules.flatMap((module) => module.children);
const byId = (id: string) => allTopics().find((item) => item.id === id);
const byTitle = (title: string) => allTopics().find((item) => item.title === title);

const enrich = (id: string, patch: Partial<VaspKnowledgeTopic>) => {
  const item = byId(id) ?? byTitle(id);
  if (item) Object.assign(item, patch);
};

const standardSections = (topicItem: VaspKnowledgeTopic): VaspLearningSectionBlock[] => [
  {
    title: "它是什么",
    items: [
      `${topicItem.title} 是 ${topicItem.category} 中的一个独立学习单元，关注输入设置、输出文件和结果判断之间的关系。`,
      "学习时不要只记模板命令，而要理解这个环节在完整 VASP 工作流中的位置。"
    ]
  },
  {
    title: "为什么 VASP 用户需要学它",
    items: [
      "它直接影响结构、能量、电子结构或后处理数据是否可信。",
      "科研对比要求计算口径一致，因此每一步都需要留下可复查的参数、文件和判断标准。"
    ]
  },
  {
    title: "涉及的文件、参数、公式或工具",
    items: [
      "常见输入文件：INCAR、POSCAR、KPOINTS、POTCAR。",
      "常见输出文件：OUTCAR、OSZICAR、CONTCAR、CHGCAR、DOSCAR、PROCAR、EIGENVAL、ACF.dat。",
      "常用工具：grep、awk、VASPKIT、pymatgen、ASE、py4vasp、VESTA、Bader 或 VTST Scripts。"
    ]
  },
  {
    title: "结果如何判断",
    items: [
      "先检查任务是否正常结束，再检查物理量是否满足预期。",
      "能量、受力、电荷、DOS、键长或能垒等指标需要结合结构可视化和参数一致性共同判断。"
    ]
  },
  {
    title: "常见错误与后续学习",
    items: [
      "常见问题包括文件顺序不一致、参数沿用错误、输出文件不完整、不同计算口径混比。",
      "后续应继续学习相关命令库、后处理工具和对应科研场景。"
    ]
  }
];

allTopics().forEach((item) => {
  if (!item.sections) item.sections = standardSections(item);
});

const learningModule = vaspKnowledgeModules.find((module) => module.id === "learning-path");
if (learningModule && !learningModule.children.some((item) => item.id === "vasp-overall-workflow")) {
  learningModule.children.unshift(
    topic({
      id: "vasp-overall-workflow",
      title: "VASP 总体学习与计算工作流",
      description: "从建模、四大输入文件、运行、输出、结果提取、后处理到 Li-S 催化机制和论文图表的全流程。",
      category: "VASP 入门路线",
      level: "入门",
      tags: ["工作流", "建模", "后处理"],
      diagram: "VaspWorkflowDiagram",
      learningGoals: ["建立完整 VASP 计算工作流视角。", "理解输入、运行、输出、后处理和科研解释之间的依赖关系。"],
      concepts: ["四大输入文件共同决定一次 VASP 计算。", "输出文件是后处理和论文图表的数据来源。", "Li-S 催化机制需要吸附、电荷、电子结构、键长和能垒证据链共同支持。"],
      workflow: ["准备结构模型。", "编写 INCAR、POSCAR、KPOINTS、POTCAR。", "提交 VASP 任务。", "检查 OUTCAR、OSZICAR、CONTCAR 等输出。", "用命令和工具提取结果。", "完成 DOS、Bader、NEB、差分电荷等后处理。", "整理为机制解释和论文图表。"],
      cautions: ["不要跳过收敛检查直接作图。", "后处理数据必须来自同一计算口径。"]
    })
  );
}

enrich("linux-basic", {
  diagram: "LinuxPipelineDiagram",
  linuxCommandGroups,
  practiceTasks: linuxPracticeTasks,
  sections: [
    { title: "模块定位", items: ["Linux 基础命令是 VASP 学习的入口。初学者需要能在服务器中定位目录、查看大文件、搜索关键字、批量提取结果和监控任务。", "本模块按真实 VASP 工作场景组织命令，而不是孤立罗列命令名称。"] },
    { title: "学习路径", items: ["先掌握文件与目录操作，保证不会在错误目录中运行或删除文件。", "再学习 less、tail、grep、awk、find 等查看和提取工具。", "最后学习管道、重定向、作业系统和远程传输，把命令组合成可复用脚本。"] },
    { title: "结果判断", items: ["能独立完成最终能量、费米能级、收敛信息和报错信息提取。", "能解释 grep | tail | awk 管道中每一步的作用。", "能识别 rm、mv、cp 覆盖和通配符删除等危险操作。"] }
  ],
  relatedTopics: ["服务器与作业提交", "结果提取命令库", "一键汇总脚本"]
});

enrich("server-job", {
  diagram: "SlurmJobFlowDiagram",
  sections: [
    { title: "SSH 登录服务器", items: ["ssh 用于通过加密连接登录远程服务器。username 是账户名，server_ip 是服务器地址，-p 用于指定非默认端口。", "第一次登录的 known_hosts 提示是在确认远程主机指纹，确认服务器地址无误后再接受。", "登录失败通常来自网络、端口、防火墙、用户名、密码、密钥或账号权限问题。"] },
    { title: "推荐目录结构", items: ["每个 VASP 任务应单独建目录，避免 OUTCAR、CONTCAR、WAVECAR 等文件互相覆盖。", "推荐结构：project/slab_opt、slab_static、Li2S6_opt、ads_Li2S6_FeN4_opt、ads_Li2S6_FeN4_static、bader、neb。"] },
    { title: "module 与可执行文件", items: ["module 是集群软件环境管理工具，用于加载编译好的 VASP、MPI 和编译器环境。", "常用命令：module avail、module load vasp、module list、which vasp_std。", "vasp_std 用于标准计算，vasp_gam 常用于 Gamma-only 大体系，vasp_ncl 用于非共线或 SOC 相关任务。"] },
    { title: "Slurm 作业脚本逐行理解", items: ["#SBATCH -J 设置任务名；-N 设置节点数；-n 设置总核数；-p 设置队列；-o 设置标准输出；-e 设置错误输出。", "module load vasp 加载环境，mpirun vasp_std 启动 VASP 标准版本。", "sbatch run_vasp.sh 提交；squeue -u $USER 查看；scancel JOBID 取消；sacct -j JOBID 查看历史；sinfo 查看节点状态。"] },
    { title: "运行状态与排错", items: ["PENDING 表示排队，RUNNING 表示运行，COMPLETED 表示完成，FAILED/TIMEOUT/CANCELLED 分别代表失败、超时、取消。", "应查看 slurm-*.out、vasp.out、vasp.err、OUTCAR、OSZICAR。", "常见错误包括 module 未加载、vasp_std 找不到、核数不合理、队列名错误、输出为空、OUTCAR 不完整。"] }
  ],
  commands: [
    ...commandsByKeyword(["ssh", "squeue", "sbatch"], 2),
    {
      id: "slurm-script-template",
      title: "典型 Slurm VASP 脚本",
      file: "run_vasp.sh",
      command: "#!/bin/bash\n#SBATCH -J vasp_job\n#SBATCH -N 1\n#SBATCH -n 32\n#SBATCH -p normal\n#SBATCH -o vasp.out\n#SBATCH -e vasp.err\n\nmodule load vasp\nmpirun vasp_std",
      desc: "标准 Slurm 脚本骨架，需要按实际集群队列、核数和 VASP 模块名调整。",
      category: "服务器与作业提交",
      tags: ["Slurm", "脚本"],
      keywords: ["sbatch", "Slurm", "vasp_std"],
      note: "不同集群的 module 名称、MPI 启动命令和队列名可能不同。"
    }
  ]
});

enrich("vasp-basic-concepts", {
  sections: [
    { title: "DFT 与 VASP 是什么", items: ["DFT 用电子密度描述体系基态性质，避免直接求解复杂多电子波函数。", "VASP 是基于平面波和 PAW 方法的第一性原理软件，常用于结构优化、电子结构、吸附、反应路径和分子动力学。", "材料、催化和电池研究常用 VASP 计算总能、结构、态密度、电荷分布和反应能。"] },
    { title: "PAW、POTCAR 与 ENCUT", items: ["赝势用于高效处理芯电子，POTCAR 提供 PAW 数据、ZVAL 和 ENMAX。", "ENCUT 控制平面波基组大小，越高通常越精确但越耗时。", "同一组能量对比必须使用一致的 POTCAR 和 ENCUT。"] },
    { title: "k 点、电子步与离子步", items: ["k 点用于布里渊区采样，bulk、slab、分子体系需求不同，slab 真空方向通常设为 1。", "电子步是每个结构上的自洽迭代，OSZICAR 中 DAV/RMM 反映电子收敛。", "离子步是原子或晶胞更新，OSZICAR 中 F= 反映离子步能量。"] },
    { title: "自洽、非自洽与总能比较", items: ["SCF 用于获得自洽电子密度，静态自洽常为 DOS、Bader、能带提供 CHGCAR/WAVECAR。", "非自洽能带通常读取已有 CHGCAR，沿高对称路径计算本征值。", "不同 ENCUT、KPOINTS、POTCAR、ISPIN、U 值下的能量不能随意混比。"] }
  ]
});

enrich("four-input-files", {
  id: "input-files-overview",
  diagram: "InputFilesRelationDiagram",
  sections: [
    { title: "四个文件分别控制什么", items: ["INCAR 控制怎么算，包括任务类型、收敛标准、自旋、DFT+U、色散和输出。", "POSCAR 控制算什么结构，包括晶格、元素、原子数、坐标和固定层。", "KPOINTS 控制布里渊区如何采样，影响能量精度、DOS、能带和成本。", "POTCAR 控制用什么赝势描述元素，元素顺序必须与 POSCAR 一致。"] },
    { title: "四者关系", items: ["POSCAR 的元素顺序决定 POTCAR 拼接顺序。", "POTCAR 的 ENMAX 影响 INCAR 中 ENCUT 设置。", "KPOINTS 和 ENCUT 共同影响能量精度。", "INCAR 中 LCHARG、LWAVE、LAECHG 决定 CHGCAR、WAVECAR、AECCAR 等后处理文件是否生成。"] }
  ]
});

enrich("poscar-format", {
  id: "poscar-guide",
  diagram: "PoscarStructureDiagram",
  sections: [
    { title: "逐行理解 POSCAR", items: ["第 1 行是标题，用于标记体系。第 2 行是缩放因子，通常为 1.0。第 3-5 行是三条晶格矢量，单位通常为 Å。", "第 6 行是元素顺序，第 7 行是每种元素数量，二者决定坐标行数和 POTCAR 拼接顺序。", "Selective Dynamics 是可选行，T/F 分别控制 x/y/z 方向是否放开优化。Direct/Cartesian 决定坐标类型。"] },
    { title: "VASP 场景", items: ["slab 底层常设置 F F F 固定，上层和吸附物通常 T T T 放开。", "真空层体现在 z 方向晶格矢量中，真空不足会导致周期镜像相互作用。", "Bader、电荷分析和原子编号都依赖 POSCAR 元素顺序和坐标顺序。"] },
    { title: "常见错误", items: ["元素顺序与 POTCAR 不一致。", "原子数与坐标行数不一致。", "Selective Dynamics 写法错位。", "Direct/Cartesian 写错导致结构严重错误。", "原子距离过近或分子放在周期边界。"] }
  ]
});

enrich("kpoints-setting", {
  id: "kpoints-guide",
  diagram: "KpointsSamplingDiagram",
  sections: [
    { title: "不同体系的 k 点", items: ["bulk 是三维周期体系，常用 Monkhorst-Pack 或 Gamma-centered 的 3D 网格，例如 5×5×5。", "slab 在 x/y 方向周期，z 方向是真空，常用 3×3×1 或类似设置。", "分子或团簇放在大真空盒中，通常使用 Gamma 点 1×1×1。"] },
    { title: "收敛测试", items: ["k 点过疏会影响总能、DOS、吸附能和能带。", "可逐步增加 k 点，观察总能或吸附能变化是否小于目标阈值。", "DOS 常需要比结构优化更密的 k 点来获得平滑曲线。"] },
    { title: "line-mode 能带", items: ["能带计算使用高对称路径，不同晶系路径不同。", "能带通常是读取静态自洽 CHGCAR 后进行非自洽计算。", "不要随意复制不适合当前晶体的 KPOINTS 路径。"] }
  ]
});

enrich("static-scf", { diagram: "StaticPostprocessFlowDiagram" });
enrich("task-静态自洽计算", { diagram: "StaticPostprocessFlowDiagram" });
enrich("dos-pdos-intro", { id: "dos-pdos", diagram: "DosPdosDiagram" });
enrich("task-dos-pdos", { diagram: "DosPdosDiagram" });
enrich("bader-intro", { id: "bader-charge", diagram: "BaderWorkflowDiagram" });
enrich("task-bader-电荷", { diagram: "BaderWorkflowDiagram" });
enrich("task-差分电荷密度", { id: "charge-density-difference", diagram: "ChargeDensityDifferenceDiagram" });
enrich("post-差分电荷密度图", { diagram: "ChargeDensityDifferenceDiagram" });
enrich("neb-intro", { id: "neb-path", diagram: "NebEnergyPathDiagram" });
enrich("task-neb-反应路径", { diagram: "NebEnergyPathDiagram" });
enrich("lis-催化机制总结模板", { id: "li-s-catalysis-mechanism", diagram: "LiSMechanismEvidenceDiagram" });
enrich("lis-li2s-分解-转化-neb-能垒", { diagram: "NebEnergyPathDiagram" });
enrich("post-neb-能垒曲线", { diagram: "NebEnergyPathDiagram" });

["incar-basic", "incar-relax", "incar-static", "incar-dos", "incar-magnetism", "incar-dftu", "incar-dispersion"].forEach((id) => {
  const item = byId(id);
  if (item) {
    item.sections = [
      { title: "参数组定位", items: [`${item.title} 不是孤立参数清单，而是服务于特定计算场景的控制逻辑。`, "每个参数都需要理解含义、常用取值、使用场景和对结果的影响。"] },
      { title: "关键理解", items: ["SYSTEM 标记任务；ENCUT/PREC/EDIFF/NELM/ALGO/LREAL 影响电子计算精度和效率。", "结构优化关注 IBRION、NSW、ISIF、EDIFFG、POTIM；静态计算关注 NSW=0、IBRION=-1、LCHARG、LWAVE、LAECHG、ICHARG。", "DOS/PDOS 关注 LORBIT、NEDOS、ISMEAR、SIGMA；磁性关注 ISPIN、MAGMOM、NUPDOWN；DFT+U 关注 LDAU 系列参数；色散关注 IVDW。"] },
      { title: "常见错误", items: ["把优化 INCAR 直接用于静态或 DOS。", "EDIFFG 正负含义混淆。", "MAGMOM、LDAUL、LDAUU 顺序没有对应 POSCAR/POTCAR。", "是否使用 DFT+U 或色散校正前后不一致。"] }
    ];
  }
});

enrich("potcar-zval", {
  sections: [
    { title: "POTCAR 是什么", items: ["VASP 用 POTCAR 描述元素 PAW 数据，用户通常不应手动编辑。", "POTCAR 与 POSCAR 元素顺序必须一致，否则结果可能完全无意义。"] },
    { title: "关键字段", items: ["TITEL 显示赝势名称，可用 grep \"TITEL\" POTCAR 查看。", "VRHFIN 显示元素标识，可用 grep \"VRHFIN\" POTCAR 核对。", "ZVAL 是价电子数，是 Bader 电荷转移的重要参考。", "ENMAX 是推荐截断能，ENCUT 通常参考所有元素中最大 ENMAX。", "POMASS 是原子质量，与频率和动力学任务相关。"] },
    { title: "常见错误", items: ["POSCAR 元素顺序和 POTCAR 顺序不一致。", "不同计算使用不同赝势。", "用错泛函版本 POTCAR。", "对比吸附能时基底和吸附体系赝势不一致。"] }
  ]
});

allTopics().forEach((item) => {
  if (item.category.includes("错误") || item.category.includes("排错")) {
    item.sections = [
      { title: "现象", items: [`${item.title} 通常会表现为输出中出现异常警告、任务提前中断、能量或受力无法稳定，或结果文件不完整。`] },
      { title: "可能原因", items: ["初始结构不合理、输入参数不匹配、电子步不收敛、资源设置错误、文件顺序错误或计算口径不一致。"] },
      { title: "排查顺序", items: ["先看 slurm/vasp.out，再看 OUTCAR 末尾和 OSZICAR。", "搜索 error、warning、fatal、ZBRENT、BRMIX、too few bands。", "检查 INCAR、POSCAR、KPOINTS、POTCAR 是否对应。"] },
      { title: "推荐处理与不建议做法", items: ["推荐一次只改一个关键因素，保留旧输出和参数。", "不建议盲目复制他人模板、同时大幅改动多个参数或忽略未收敛结构继续后处理。"] }
    ];
  }
});

export const findVaspKnowledgeModule = (id: string) => vaspKnowledgeModules.find((module) => module.id === id);

export const findVaspKnowledgeTopic = (moduleId: string, topicId: string) => findVaspKnowledgeModule(moduleId)?.children.find((topicItem) => topicItem.id === topicId);
