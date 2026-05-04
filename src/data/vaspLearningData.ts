import {
  AlertTriangle,
  Atom,
  BookOpen,
  Boxes,
  Braces,
  ChartSpline,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  GraduationCap,
  LineChart,
  LinkIcon,
  Route,
  SearchCheck,
  Settings2,
  TerminalSquare,
  Wrench
} from "lucide-react";

export type VaspLearningSectionId =
  | "official-resources"
  | "chinese-resources"
  | "learning-path"
  | "input-files"
  | "calculation-tasks"
  | "command-library"
  | "post-processing"
  | "li-s-processing"
  | "troubleshooting"
  | "tools";

export type VaspLearningSection = {
  id: VaspLearningSectionId;
  title: string;
  desc: string;
  tags: string[];
  icon: typeof BookOpen;
};

export type ExternalResource = {
  title: string;
  url: string;
  desc: string;
  tags: string[];
};

export type LearningStep = {
  title: string;
  desc: string;
};

export type InputFileCard = {
  title: string;
  desc: string;
  commands: string[];
  errors: string[];
};

export type TopicCard = {
  title: string;
  desc: string;
  tags: string[];
};

export type CommandItem = {
  title: string;
  file: string;
  command: string;
  desc: string;
  note?: string;
  keywords: string[];
};

export type CommandCategory = {
  id: string;
  title: string;
  items: CommandItem[];
};

export const vaspLearningSections: VaspLearningSection[] = [
  { id: "official-resources", title: "官方学习资源", desc: "VASP Wiki、官方手册、官方教程和专题案例入口。", tags: ["官方", "文档"], icon: LinkIcon },
  { id: "chinese-resources", title: "中文学习资源", desc: "面向初学者的中文系统学习、输出理解和问题排查资源。", tags: ["中文", "入门"], icon: GraduationCap },
  { id: "learning-path", title: "VASP 入门路线", desc: "从 Linux、输入文件到 DOS、NEB 和论文作图的学习路线图。", tags: ["路线", "入门"], icon: Route },
  { id: "input-files", title: "输入文件详解", desc: "INCAR、POSCAR、KPOINTS、POTCAR 的作用、常查命令和常见错误。", tags: ["输入文件", "基础"], icon: FileCode2 },
  { id: "calculation-tasks", title: "常见计算任务", desc: "结构优化、静态计算、DOS、能带、Bader、NEB、AIMD 等任务导航。", tags: ["任务", "DFT"], icon: Settings2 },
  { id: "command-library", title: "结果提取命令库", desc: "从 OUTCAR、OSZICAR、DOSCAR、ACF.dat 中快速提取论文数据。", tags: ["命令速查", "OUTCAR"], icon: TerminalSquare },
  { id: "post-processing", title: "后处理与数据可视化", desc: "DOS/PDOS、差分电荷密度、局域势、ELF、结构与图表处理。", tags: ["后处理", "可视化"], icon: ChartSpline },
  { id: "li-s-processing", title: "锂硫电池/催化剂专用后处理", desc: "Li2Sn 吸附、Bader 电荷、磁矩、键长、d-band center 与 NEB 模板。", tags: ["Li-S", "催化剂"], icon: Atom },
  { id: "troubleshooting", title: "错误排查与收敛问题", desc: "结构优化、电子步、ZBRENT、BRMIX、POTCAR、MAGMOM 等问题定位。", tags: ["排错", "收敛"], icon: AlertTriangle },
  { id: "tools", title: "常用工具与脚本", desc: "VASPKIT、pymatgen、ASE、py4vasp、VESTA、Bader 和 VTST 脚本。", tags: ["工具", "脚本"], icon: Wrench }
];

export const externalResources: ExternalResource[] = [
  {
    title: "VASP Wiki",
    url: "https://www.vasp.at/wiki/",
    desc: "VASP 官方 Wiki，适合查询 INCAR 标签、输入输出文件、算法、功能说明和计算设置。",
    tags: ["官方", "Wiki", "参数查询"]
  },
  {
    title: "VASP Manual",
    url: "https://www.vasp.at/wiki/index.php/The_VASP_Manual",
    desc: "VASP 官方手册入口，适合作为权威参数与理论背景查询。",
    tags: ["官方", "手册", "理论背景"]
  },
  {
    title: "VASP Tutorials Latest",
    url: "https://www.vasp.at/tutorials/latest/",
    desc: "VASP 官方教程集合，适合从 atoms/molecules、bulk、surface、transition states 等案例开始学习。",
    tags: ["官方", "教程", "案例"]
  },
  {
    title: "VASP Learn",
    url: "https://www.vasp.at/learn/",
    desc: "VASP 官方学习入口，包含教程和视频学习资源。",
    tags: ["官方", "视频", "学习入口"]
  },
  {
    title: "VASP Surface Tutorial",
    url: "https://www.vasp.at/tutorials/latest/surface/",
    desc: "官方表面计算教程，适合学习 slab、表面吸附、DOS、能带和 STM 模拟。",
    tags: ["表面", "吸附", "slab"]
  },
  {
    title: "VASP Transition States / NEB Tutorial",
    url: "https://www.vasp.at/tutorials/latest/transition_states/part1/",
    desc: "官方过渡态与 NEB 教程，适合学习反应路径和能垒计算。",
    tags: ["NEB", "过渡态", "能垒"]
  },
  {
    title: "Learn VASP The Hard Way / BigBro",
    url: "https://www.bigbrosci.com/",
    desc: "中文 VASP 系统学习资源，适合初学者学习输入、输出、任务处理、后处理和 Trouble Shooting。",
    tags: ["中文", "系统学习", "排错"]
  }
];

export const learningPath: LearningStep[] = [
  { title: "Linux 基础命令", desc: "掌握目录、文件、grep、awk、sed、作业提交和批处理脚本。" },
  { title: "VASP 基本概念", desc: "理解平面波、赝势、电子步、离子步、收敛标准和常见输出。" },
  { title: "四大输入文件", desc: "建立 INCAR、POSCAR、KPOINTS、POTCAR 的职责边界。" },
  { title: "结构优化", desc: "学习 ISIF、IBRION、NSW、EDIFFG、受力和应力判断。" },
  { title: "静态自洽计算", desc: "在优化结构上获得可靠总能、电荷密度和费米能级。" },
  { title: "DOS / PDOS", desc: "设置 NEDOS、LORBIT、ISMEAR，并完成费米能级对齐。" },
  { title: "能带计算", desc: "理解高对称路径、非自洽能带和能量零点处理。" },
  { title: "表面模型与吸附计算", desc: "构建 slab、真空层、吸附构型和吸附能公式。" },
  { title: "Bader 电荷与差分电荷密度", desc: "提取电荷转移并结合可视化判断界面相互作用。" },
  { title: "NEB 反应路径", desc: "组织图像目录、检查收敛并提取相对能垒。" },
  { title: "数据整理与论文作图", desc: "形成能量表、DOS 图、自由能路径和机制图数据闭环。" }
];

export const inputFileCards: InputFileCard[] = [
  {
    title: "INCAR",
    desc: "控制计算类型、收敛标准、电子步、离子步、泛函、磁性、DFT+U、色散校正等。",
    commands: ["grep -E \"ENCUT|EDIFF|EDIFFG|ISMEAR|SIGMA|ISPIN|IBRION|ISIF|NSW\" OUTCAR", "grep -E \"IVDW|LASPH|LDAU|LDAUL|LDAUU|LDAUJ\" OUTCAR"],
    errors: ["EDIFFG 符号误用", "ISMEAR 与体系类型不匹配", "MAGMOM 原子顺序不一致"]
  },
  {
    title: "POSCAR",
    desc: "结构文件，包含晶格、元素顺序、原子数量和坐标。",
    commands: ["head -n 8 POSCAR", "sed -n '2,7p' CONTCAR"],
    errors: ["元素顺序与 POTCAR 不一致", "Selective dynamics 坐标标记错位", "真空层不足"]
  },
  {
    title: "KPOINTS",
    desc: "k 点采样文件，影响能量、DOS、能带和计算精度。",
    commands: ["grep -m 1 \"NKPTS\" OUTCAR", "grep -m 1 \"irreducible k-points\" OUTCAR"],
    errors: ["slab 的 z 方向 k 点未设为 1", "能带路径与结构晶格不匹配", "k 点未做收敛测试"]
  },
  {
    title: "POTCAR",
    desc: "赝势文件，决定元素价电子数、赝势类型、推荐 ENMAX 等。",
    commands: ["grep \"TITEL\" POTCAR", "grep \"ZVAL\" POTCAR", "grep \"ENMAX\" POTCAR"],
    errors: ["元素顺序错误", "混用不同版本赝势", "ENCUT 低于推荐 ENMAX"]
  }
];

export const calculationTasks: TopicCard[] = [
  { title: "结构优化", desc: "获得合理晶格、坐标和受力，作为后续计算基准。", tags: ["IBRION", "EDIFFG"] },
  { title: "静态能量计算", desc: "在优化结构基础上提取可靠总能和电荷密度。", tags: ["TOTEN", "CHGCAR"] },
  { title: "DOS / PDOS", desc: "分析总态密度、元素贡献和活性位点轨道贡献。", tags: ["DOSCAR", "LORBIT"] },
  { title: "能带计算", desc: "沿高对称路径计算能带结构并与费米能级对齐。", tags: ["EIGENVAL", "KPATH"] },
  { title: "表面吸附能", desc: "比较基底、分子和复合体系能量差。", tags: ["slab", "Eads"] },
  { title: "Bader 电荷", desc: "量化吸附物、金属中心和基底之间的电荷转移。", tags: ["ACF.dat", "ZVAL"] },
  { title: "差分电荷密度", desc: "展示界面电荷积累和耗尽区域。", tags: ["CHGCAR", "VESTA"] },
  { title: "d-band center", desc: "提取金属 d 轨道中心并关联吸附强度。", tags: ["PDOS", "descriptor"] },
  { title: "NEB 反应路径", desc: "评估 Li2S 分解、多硫化物转化等能垒。", tags: ["NEB", "barrier"] },
  { title: "频率与虚频", desc: "验证稳定结构或过渡态特征。", tags: ["f/i", "OUTCAR"] },
  { title: "AIMD", desc: "考察有限温度下结构稳定性和界面动力学。", tags: ["MD", "temperature"] },
  { title: "锂硫电池 Li2Sn 吸附与转化", desc: "面向 Li2Sx 吸附、转化路径、键长和电荷转移的数据闭环。", tags: ["Li2Sn", "Li-S"] }
];

export const postProcessingCards: TopicCard[] = [
  { title: "DOS/PDOS 处理", desc: "提取总 DOS、原子 PDOS、轨道贡献并统一费米能级。", tags: ["DOSCAR", "PDOS"] },
  { title: "差分电荷密度", desc: "构造复合体系、基底和分子的 CHGCAR 差分数据。", tags: ["CHGCAR", "charge"] },
  { title: "局域势与功函数", desc: "基于 LOCPOT 获取平面平均势和真空能级。", tags: ["LOCPOT", "work function"] },
  { title: "ELF 分析", desc: "使用 ELFCAR 判断局域电子结构和成键特征。", tags: ["ELFCAR", "VESTA"] },
  { title: "结构批处理", desc: "用 ASE/pymatgen 读取 CONTCAR、计算键长和导出表格。", tags: ["ASE", "pymatgen"] },
  { title: "论文图表整理", desc: "将能量、费米能级、体积、最大受力等汇总为 CSV。", tags: ["CSV", "plot"] }
];

export const liSProcessingCards: TopicCard[] = [
  { title: "Li2Sn 吸附能计算", desc: "按 E_ads = E_slab+Li2Sn - E_slab - E_Li2Sn 统一口径提取。", tags: ["Eads", "Li2Sn"] },
  { title: "多硫化物吸附能对比", desc: "批量比较 Li2S4、Li2S6、Li2S8 在不同位点的吸附强度。", tags: ["LiPS", "batch"] },
  { title: "Bader 电荷转移分析", desc: "结合 ZVAL 和 ACF.dat 判断吸附物得失电子。", tags: ["Bader", "ZVAL"] },
  { title: "金属中心磁矩分析", desc: "提取单原子或双原子位点局域磁矩变化。", tags: ["magnetization", "active site"] },
  { title: "S-S 键长变化", desc: "比较吸附前后 S-S 键长，判断多硫化物活化程度。", tags: ["ASE", "bond"] },
  { title: "d-band center 分析", desc: "从金属 d-PDOS 中计算 d 带中心并关联吸附能。", tags: ["d-band", "descriptor"] },
  { title: "Li2S 分解 / 转化 NEB 能垒", desc: "提取 NEB 图像能量并形成相对能垒曲线。", tags: ["NEB", "Li2S"] },
  { title: "自由能路径图", desc: "将 ΔE、ΔZPE、TΔS 合并为 ΔG 并生成反应路径数据。", tags: ["free energy", "ZPE"] },
  { title: "吸附构型对比", desc: "比较 Li 端、S 端、桥位、多中心协同等构型稳定性。", tags: ["configuration", "site"] },
  { title: "论文图表数据整理", desc: "输出吸附能、电荷转移、键长、能垒和 DOS 描述符汇总表。", tags: ["paper", "table"] }
];

export const troubleshootingCards: TopicCard[] = [
  { title: "结构优化不收敛", desc: "检查初始结构、EDIFFG、POTIM、ISIF、约束和最大受力。", tags: ["geometry", "force"] },
  { title: "电子步不收敛", desc: "调整 ALGO、NELM、AMIX/BMIX、ISMEAR、SIGMA 和初始磁矩。", tags: ["SCF", "DAV"] },
  { title: "ZBRENT 报错", desc: "常与离子步搜索失败、结构畸变或 POTIM 过大有关。", tags: ["ZBRENT", "POTIM"] },
  { title: "BRMIX 警告", desc: "关注电荷混合、金属体系、自旋设置和初始电荷密度。", tags: ["BRMIX", "mixing"] },
  { title: "too few bands", desc: "提高 NBANDS，尤其注意自旋、空带和杂化泛函任务。", tags: ["NBANDS", "bands"] },
  { title: "POTCAR 顺序错误", desc: "核对 POSCAR 元素顺序、POTCAR TITEL 和 OUTCAR 中 ZVAL。", tags: ["POTCAR", "ZVAL"] },
  { title: "MAGMOM 设置问题", desc: "确保 MAGMOM 数量与原子顺序匹配，并给磁性元素合理初值。", tags: ["MAGMOM", "ISPIN"] },
  { title: "KPOINTS 不合理", desc: "slab 用 2D k 点，分子用 Gamma，能带路径需匹配晶格。", tags: ["KPOINTS", "slab"] },
  { title: "ENCUT 未测试", desc: "以 POTCAR ENMAX 为起点做截断能收敛测试。", tags: ["ENCUT", "convergence"] },
  { title: "任务中断与续算", desc: "结合 CONTCAR、WAVECAR、CHGCAR 和作业脚本判断是否可续算。", tags: ["restart", "WAVECAR"] }
];

export const toolResources: ExternalResource[] = [
  { title: "VASPKIT", url: "https://vaspkit.com/", desc: "常用 VASP 后处理工具，适合能带、DOS、结构、吸附能和电荷相关数据处理。", tags: ["后处理", "GUI/CLI"] },
  { title: "pymatgen", url: "https://pymatgen.org/", desc: "Python 材料计算分析库，适合结构读写、相图、VASP 输入输出解析和自动化流程。", tags: ["Python", "workflow"] },
  { title: "ASE", url: "https://wiki.fysik.dtu.dk/ase/", desc: "结构读写、建模和简单分析工具，适合批量计算键长、构型转换和脚本化处理。", tags: ["Python", "structure"] },
  { title: "py4vasp", url: "https://www.vasp.at/py4vasp/latest/", desc: "VASP 官方 Python 后处理接口，适合读取新版 VASP 输出并进行交互式分析。", tags: ["官方", "Python"] },
  { title: "VESTA", url: "https://jp-minerals.org/vesta/en/", desc: "结构、电荷密度、差分电荷密度和 ELF 可视化工具。", tags: ["可视化", "CHGCAR"] },
  { title: "Bader", url: "http://theory.cm.utexas.edu/henkelman/code/bader/", desc: "Bader 电荷分析工具，用于从电荷密度中划分原子电荷。", tags: ["Bader", "charge"] },
  { title: "VTST Scripts", url: "https://theory.cm.utexas.edu/vtsttools/", desc: "NEB、过渡态和反应路径相关脚本，适合能垒提取和路径分析。", tags: ["NEB", "VTST"] }
];

const c = (title: string, file: string, command: string, desc: string, keywords: string[] = [], note?: string): CommandItem => ({
  title,
  file,
  command,
  desc,
  keywords,
  note
});

export const commandCategories: CommandCategory[] = [
  {
    id: "finish",
    title: "任务是否完成与收敛判断",
    items: [
      c("判断 VASP 是否正常结束", "OUTCAR", `grep -n "General timing" OUTCAR`, "出现 General timing 通常说明 VASP 正常运行到结尾，但不等于结构优化一定收敛。", ["General timing", "完成"]),
      c("判断 VASP 是否正常结束，备选方式", "OUTCAR", `grep -n "Voluntary context switches" OUTCAR`, "OUTCAR 末尾出现该信息通常说明程序正常结束。", ["完成", "OUTCAR"]),
      c("判断结构优化是否达到精度", "OUTCAR", `grep -n "reached required accuracy" OUTCAR`, "常用于结构优化任务。静态计算、DOS 或能带计算可能不会出现该句。", ["结构优化", "收敛"]),
      c("查看 OSZICAR 最后一行", "OSZICAR", `tail -n 1 OSZICAR`, "快速查看最终离子步或电子步信息。", ["OSZICAR", "tail"]),
      c("查看所有离子步能量", "OSZICAR", `grep "F=" OSZICAR`, "用于查看结构优化过程中每个离子步的能量变化。", ["F=", "能量"]),
      c("查看电子步收敛过程", "OSZICAR", `grep -E "DAV:|RMM:" OSZICAR`, "查看电子自洽迭代过程。", ["DAV", "RMM", "电子步"]),
      c("查看电子步收敛过程，OUTCAR 版本", "OUTCAR", `grep -E "DAV:|RMM:" OUTCAR`, "从 OUTCAR 中查看电子步收敛信息。", ["DAV", "RMM"]),
      c("搜索常见报错和警告", "OUTCAR / vasp.out / slurm 输出", `grep -i -n "error\\|warning\\|fatal\\|ZBRENT\\|BRMIX\\|too few bands" OUTCAR vasp.out slurm-*.out 2>/dev/null`, "用于快速定位常见报错、警告和收敛问题。", ["error", "warning", "ZBRENT", "BRMIX", "too few bands"])
    ]
  },
  {
    id: "energy",
    title: "总能与自由能提取",
    items: [
      c("提取最终总能 TOTEN", "OUTCAR", `grep "free  energy   TOTEN" OUTCAR | tail -n 1`, "提取最终一步 free energy TOTEN。", ["TOTEN", "总能"]),
      c("只输出最终 TOTEN 数值", "OUTCAR", `grep "free  energy   TOTEN" OUTCAR | tail -n 1 | awk '{print $5}'`, "适合脚本化处理。", ["TOTEN", "awk"]),
      c("提取所有离子步 TOTEN", "OUTCAR", `grep "free  energy   TOTEN" OUTCAR | awk '{print NR, $5}'`, "查看结构优化过程中所有离子步能量变化。", ["TOTEN", "离子步"]),
      c("提取 energy without entropy", "OUTCAR", `grep "energy  without entropy" OUTCAR | tail -n 1`, "查看不含熵项的能量信息。", ["entropy", "能量"]),
      c("只输出 energy without entropy 数值", "OUTCAR", `grep "energy  without entropy" OUTCAR | tail -n 1 | awk '{print $4}'`, "用于提取不含熵项能量。", ["entropy", "awk"]),
      c("只输出 energy(sigma->0) 数值", "OUTCAR", `grep "energy  without entropy" OUTCAR | tail -n 1 | awk '{print $7}'`, "常用于比较能量时参考，具体采用哪一项需保持计算口径一致。", ["sigma", "能量"]),
      c("从 OSZICAR 提取最终 F 和 E0", "OSZICAR", `awk '/ F=/{f=$3; e0=$5} END{print "F=", f, "E0=", e0}' OSZICAR`, "快速提取最终 F 和 E0。", ["OSZICAR", "E0"]),
      c("批量提取所有子目录最终能量", "多个 OUTCAR", `printf "dir,toten_ev\\n" > energies.csv

find . -name OUTCAR -print0 | while IFS= read -r -d '' f; do
  d=\${f%/OUTCAR}
  e=$(grep "free  energy   TOTEN" "$f" | tail -n 1 | awk '{print $5}')
  printf "%s,%s\\n" "$d" "$e"
done >> energies.csv`, "递归扫描所有子目录 OUTCAR，并生成 energies.csv。", ["批量", "TOTEN", "CSV"], "在 Windows PowerShell 中需使用 WSL/Git Bash 或改写为 PowerShell 脚本。")
    ]
  },
  {
    id: "electronic",
    title: "费米能级、电子数、能带数、K 点信息",
    items: [
      c("提取费米能级", "OUTCAR", `grep "E-fermi" OUTCAR | tail -n 1`, "查看最终费米能级。", ["费米", "E-fermi"]),
      c("只输出费米能级数值", "OUTCAR", `grep "E-fermi" OUTCAR | tail -n 1 | awk '{print $3}'`, "适合 DOS/能带后处理时对齐费米能级。", ["费米", "DOS"]),
      c("提取总电子数 NELECT", "OUTCAR", `grep -m 1 "NELECT" OUTCAR`, "查看体系总电子数。", ["NELECT", "电子数"]),
      c("只输出 NELECT 数值", "OUTCAR", `grep -m 1 "NELECT" OUTCAR | awk '{print $3}'`, "脚本化提取总电子数。", ["NELECT"]),
      c("查看能带数 NBANDS", "OUTCAR", `grep -m 1 "NBANDS" OUTCAR`, "查看计算中使用的能带数。", ["NBANDS"]),
      c("查看 K 点数 NKPTS", "OUTCAR", `grep -m 1 "NKPTS" OUTCAR`, "查看 k 点数量。", ["NKPTS", "KPOINTS"]),
      c("查看自旋设置 ISPIN", "OUTCAR", `grep -m 1 "ISPIN" OUTCAR`, "确认是否为自旋极化计算。", ["ISPIN", "自旋"]),
      c("查看 EIGENVAL 基本信息", "EIGENVAL", `awk 'NR==6{print "NELECT="$1, "NKPTS="$2, "NBANDS="$3}' EIGENVAL`, "快速读取 EIGENVAL 中的电子数、k 点数和能带数。", ["EIGENVAL", "NBANDS"])
    ]
  },
  {
    id: "potcar",
    title: "POTCAR、赝势与价电子数",
    items: [
      c("查看赝势名称", "POTCAR", `grep "TITEL" POTCAR`, "查看 POTCAR 中各元素赝势名称。", ["TITEL", "赝势"]),
      c("查看元素信息", "POTCAR", `grep "VRHFIN" POTCAR`, "查看 POTCAR 中元素标识。", ["VRHFIN"]),
      c("查看价电子数 ZVAL", "POTCAR", `grep "ZVAL" POTCAR`, "查看各元素价电子数，是 Bader 电荷转移分析的重要依据。", ["ZVAL", "Bader"]),
      c("查看原子质量和价电子数", "POTCAR", `grep "POMASS" POTCAR`, "同时查看原子质量和 ZVAL 等信息。", ["POMASS", "ZVAL"]),
      c("查看推荐截断能 ENMAX", "POTCAR", `grep "ENMAX" POTCAR`, "用于确定 ENCUT 参考值。", ["ENMAX", "ENCUT"]),
      c("配对显示赝势和价电子信息", "POTCAR", `awk '/TITEL/{t=$0} /POMASS/{print t; print $0; print ""}' POTCAR`, "将 TITEL 与 POMASS/ZVAL 信息配对显示，便于核对元素赝势。", ["TITEL", "POMASS"]),
      c("从 OUTCAR 查看实际读取的 ZVAL", "OUTCAR", `grep -m 1 "ZVAL" OUTCAR`, "确认 VASP 实际读取的价电子信息。", ["OUTCAR", "ZVAL"])
    ]
  },
  {
    id: "incar",
    title: "INCAR 实际参数提取",
    items: [
      c("查看常用参数", "OUTCAR", `grep -E "ENCUT|EDIFF|EDIFFG|ISMEAR|SIGMA|ISPIN|IBRION|ISIF|NSW|LORBIT|IVDW|LASPH|LDAU" OUTCAR`, "检查 VASP 实际读取的关键参数。", ["INCAR", "参数"]),
      c("查看截断能 ENCUT", "OUTCAR", `grep -m 1 "ENCUT" OUTCAR`, "确认实际使用的平面波截断能。", ["ENCUT"]),
      c("查看泛函信息", "OUTCAR", `grep -m 1 "GGA" OUTCAR`, "查看泛函相关设置。", ["GGA", "泛函"]),
      c("查看色散校正设置", "OUTCAR", `grep -m 1 "IVDW" OUTCAR`, "确认是否使用 DFT-D 色散校正。", ["IVDW", "色散"]),
      c("查看 DFT+U 设置", "OUTCAR", `grep -E "LDAU|LDAUL|LDAUU|LDAUJ" OUTCAR`, "检查 DFT+U 相关参数。", ["DFT+U", "LDAU"])
    ]
  },
  {
    id: "structure",
    title: "结构、晶格、体积、受力和应力",
    items: [
      c("查看优化后的结构文件头部", "CONTCAR", `head -n 8 CONTCAR`, "快速查看结构文件标题、晶格、元素和原子数。", ["CONTCAR", "结构"]),
      c("查看 CONTCAR 晶格矢量", "CONTCAR", `sed -n '2,5p' CONTCAR`, "查看缩放因子和三行晶格矢量。", ["晶格", "CONTCAR"]),
      c("查看原子种类和数量", "CONTCAR", `sed -n '6,7p' CONTCAR`, "适用于 VASP 5/6 格式结构文件。", ["原子数"]),
      c("统计原子总数", "CONTCAR", `awk '
NR==6{
  allnum=1
  for(i=1;i<=NF;i++) if($i !~ /^[0-9]+$/) allnum=0
  if(allnum){for(i=1;i<=NF;i++)s+=$i; print s; exit}
}
NR==7{
  for(i=1;i<=NF;i++)s+=$i
  print s
  exit
}
' CONTCAR`, "兼容部分 VASP 4/5/6 格式，用于统计原子总数。", ["原子数", "awk"]),
      c("提取最终体积", "OUTCAR", `grep "volume of cell" OUTCAR | tail -n 1`, "查看最终晶胞体积。", ["体积", "volume"]),
      c("只输出最终体积数值", "OUTCAR", `grep "volume of cell" OUTCAR | tail -n 1 | awk '{print $5}'`, "适合汇总为表格。", ["体积", "CSV"]),
      c("提取最终晶格矢量", "OUTCAR", `grep -A 3 "direct lattice vectors" OUTCAR | tail -n 3`, "查看最终直接晶格矢量。", ["晶格矢量"]),
      c("提取最终坐标和受力", "OUTCAR", `awk '
/TOTAL-FORCE/{
  block=""
  getline
  while(getline && NF==6){
    block=block $0 ORS
  }
  last=block
}
END{printf "%s", last}
' OUTCAR`, "提取最后一次 TOTAL-FORCE 表。", ["TOTAL-FORCE", "受力"]),
      c("导出最终坐标和受力为 CSV", "OUTCAR", `awk '
BEGIN{print "x,y,z,fx,fy,fz"}
/TOTAL-FORCE/{
  block=""
  getline
  while(getline && NF==6){
    block=block $1","$2","$3","$4","$5","$6 ORS
  }
  last=block
}
END{printf "%s", last}
' OUTCAR > final_forces.csv`, "导出最终坐标和受力，便于 Excel/Python 分析。", ["CSV", "受力"]),
      c("提取最终最大受力", "OUTCAR", `awk '
/TOTAL-FORCE/{
  inside=1
  max=0
  getline
  next
}
inside && NF==6{
  f=sqrt($4*$4+$5*$5+$6*$6)
  if(f>max) max=f
}
inside && /total drift/{
  last=max
  inside=0
}
END{print last}
' OUTCAR`, "用于判断结构优化受力是否满足要求。", ["最大受力", "EDIFFG"]),
      c("查看最终应力张量", "OUTCAR", `grep "in kB" OUTCAR | tail -n 1`, "查看最终应力信息。", ["应力", "kB"]),
      c("查看外压", "OUTCAR", `grep "external pressure" OUTCAR | tail -n 1`, "查看 external pressure。", ["压力", "external pressure"])
    ]
  },
  {
    id: "charge",
    title: "电荷、磁矩和偶极矩",
    items: [
      c("查看总磁矩", "OSZICAR", `grep "mag=" OSZICAR | tail -n 1`, "适用于自旋极化计算。", ["磁矩", "mag"]),
      c("提取最终局域磁矩表", "OUTCAR", `awk '
/magnetization \\(x\\)/{cap=1; block=""}
cap{block=block $0 ORS}
cap && $1=="tot"{last=block; cap=0}
END{printf "%s", last}
' OUTCAR`, "提取最后一次 magnetization 表。", ["磁矩", "magnetization"]),
      c("提取最终局域电荷表", "OUTCAR", `awk '
/total charge/{cap=1; block=""}
cap{block=block $0 ORS}
cap && $1=="tot"{last=block; cap=0}
END{printf "%s", last}
' OUTCAR`, "提取最后一次 total charge 表。", ["电荷", "charge"]),
      c("查看偶极矩", "OUTCAR", `grep -i "dipolmoment" OUTCAR`, "查看偶极矩信息。", ["偶极矩", "dipolmoment"])
    ]
  },
  {
    id: "dos",
    title: "DOS 与 PDOS 数据提取",
    items: [
      c("查看 DOSCAR 中的费米能级", "DOSCAR", `awk 'NR==6{print $4}' DOSCAR`, "读取 DOSCAR 第 6 行中的费米能级。", ["DOSCAR", "费米"]),
      c("查看 NEDOS", "DOSCAR", `awk 'NR==6{print int($3)}' DOSCAR`, "读取 DOS 网格点数量。", ["NEDOS", "DOS"]),
      c("导出总态密度，并将能量零点移动到费米能级", "DOSCAR", `N=$(awk 'NR==6{print int($3)}' DOSCAR)
Ef=$(awk 'NR==6{print $4}' DOSCAR)

awk -v N="$N" -v Ef="$Ef" '
NR>6 && NR<=6+N{
  $1=$1-Ef
  print
}
' DOSCAR > TDOS_EminusEf.dat`, "生成以费米能级为零点的总态密度数据。", ["TDOS", "费米", "DOS"]),
      c("提取第 1 个原子的 PDOS", "DOSCAR", `N=$(awk 'NR==6{print int($3)}' DOSCAR)
Ef=$(awk 'NR==6{print $4}' DOSCAR)
ion=1

start=$((6 + N + (ion-1)*(N+1) + 2))
end=$((start + N - 1))

awk -v s="$start" -v e="$end" -v Ef="$Ef" '
NR>=s && NR<=e{
  $1=$1-Ef
  print
}
' DOSCAR > PDOS_atom1.dat`, "提取第 1 个原子的 PDOS。PDOS 列含义依赖 LORBIT、ISPIN 和 VASP 版本。", ["PDOS", "LORBIT"]),
      c("提取第 n 个原子的 PDOS", "DOSCAR", `ion=5

N=$(awk 'NR==6{print int($3)}' DOSCAR)
Ef=$(awk 'NR==6{print $4}' DOSCAR)

start=$((6 + N + (ion-1)*(N+1) + 2))
end=$((start + N - 1))

awk -v s="$start" -v e="$end" -v Ef="$Ef" '
NR>=s && NR<=e{
  $1=$1-Ef
  print
}
' DOSCAR > PDOS_atom\${ion}.dat`, "修改 ion 数值即可提取指定原子的 PDOS。", ["PDOS", "atom"]),
      c("根据 d-PDOS 计算 d-band center", "d_pdos.dat", `awk '
$1>=-10 && $1<=2{
  num+=$1*$2
  den+=$2
}
END{print num/den}
' d_pdos.dat`, "假设第一列为相对费米能级的能量，第二列为 d 态密度。", ["d-band", "d band center", "PDOS"])
    ]
  },
  {
    id: "bader",
    title: "Bader 电荷分析",
    items: [
      c("直接运行 Bader 分析", "CHGCAR", `bader CHGCAR`, "需要系统已安装 bader 程序。", ["Bader", "CHGCAR"]),
      c("使用 AECCAR0 + AECCAR2 作为参考电荷密度", "AECCAR0 / AECCAR2 / CHGCAR", `chgsum.pl AECCAR0 AECCAR2
bader CHGCAR -ref CHGCAR_sum`, "适用于更严谨的 Bader 电荷分析。", ["Bader", "AECCAR"]),
      c("提取每个原子的 Bader 电荷", "ACF.dat", `awk 'NR>2 && $1 ~ /^[0-9]+$/ {print $1, $5}' ACF.dat > bader_charge.dat`, "从 ACF.dat 中提取原子编号和 Bader 电荷。", ["ACF.dat", "Bader"]),
      c("查看 Bader 分析误差", "ACF.dat", `grep -E "VACUUM CHARGE|VACUUM VOLUME|NUMBER OF ELECTRONS" ACF.dat`, "检查 Bader 分析中的电荷统计信息。", ["Bader", "误差"]),
      c("提取某一组原子的 Bader 电荷总和", "ACF.dat", `awk -v a=37 -v b=44 '
NR>2 && $1 ~ /^[0-9]+$/ && $1>=a && $1<=b{
  q+=$5
}
END{print q}
' ACF.dat`, "示例中第 37 到 44 号原子为吸附的 Li2S6。", ["Bader", "Li2S6"]),
      c("计算电荷转移量", "手动输入 Zval_total 和 Q_bader", `awk -v z=44 -v q=42.6 'BEGIN{print z-q}'`, "Δq = Zval_total - Q_bader。Δq > 0 表示该原子组失电子，Δq < 0 表示该原子组得电子。", ["电荷转移", "ZVAL"])
    ]
  },
  {
    id: "grid",
    title: "CHGCAR、LOCPOT、ELFCAR 文件检查",
    items: [
      c("检查 CHGCAR", "CHGCAR", `ls -lh CHGCAR`, "确认电荷密度文件是否存在。", ["CHGCAR"]),
      c("检查 AECCAR 文件", "AECCAR0 / AECCAR2", `ls -lh AECCAR0 AECCAR2`, "Bader 参考电荷密度常用文件。", ["AECCAR", "Bader"]),
      c("检查 LOCPOT", "LOCPOT", `ls -lh LOCPOT`, "用于局域势、功函数等分析。", ["LOCPOT", "功函数"]),
      c("检查 ELFCAR", "ELFCAR", `ls -lh ELFCAR`, "用于电子局域函数分析。", ["ELFCAR", "ELF"])
    ]
  },
  {
    id: "neb",
    title: "NEB 反应路径与能垒提取",
    items: [
      c("提取所有 NEB 图像的最终能量", "各图像目录 OUTCAR", `for d in 0[0-9] [1-9][0-9]; do
  [ -f "$d/OUTCAR" ] || continue
  e=$(grep "free  energy   TOTEN" "$d/OUTCAR" | tail -n 1 | awk '{print $5}')
  echo "$d $e"
done | sort -V > neb_energies.dat`, "扫描 00、01、02 等 NEB 图像目录并提取最终能量。", ["NEB", "能垒", "TOTEN"]),
      c("转换为相对能量", "neb_energies.dat", `awk '
NR==1{e0=$2}
{print $1, $2-e0}
' neb_energies.dat > neb_relative.dat`, "以第一个图像能量为零点。", ["NEB", "相对能量"]),
      c("提取最高能垒图像", "neb_relative.dat", `awk '
NR==1{max=$2; img=$1}
$2>max{max=$2; img=$1}
END{print img, max}
' neb_relative.dat`, "找出相对能量最高的图像和对应能量。", ["NEB", "barrier"]),
      c("检查每个 NEB 图像是否正常结束", "各图像目录 OUTCAR", `for d in 0[0-9] [1-9][0-9]; do
  [ -f "$d/OUTCAR" ] || continue

  if grep -q "General timing" "$d/OUTCAR"; then
    echo "$d finished"
  else
    echo "$d unfinished"
  fi
done`, "批量检查每个图像是否运行完成。", ["NEB", "完成"]),
      c("VTST 脚本查看 NEB 结果", "VTST 环境", `nebresults.pl`, "需要安装 VTST 脚本。", ["VTST", "NEB"]),
      c("VTST 脚本查看 NEB 能垒", "VTST 环境", `nebbarrier.pl`, "需要安装 VTST 脚本。", ["VTST", "barrier"])
    ]
  },
  {
    id: "frequency",
    title: "频率和虚频提取",
    items: [
      c("查看所有实频", "OUTCAR", `grep "f  =" OUTCAR`, "查看频率计算中的实频。", ["频率", "f"]),
      c("查看虚频", "OUTCAR", `grep "f/i=" OUTCAR`, "查找虚频，常用于判断过渡态或结构稳定性。", ["虚频", "f/i"]),
      c("导出频率信息", "OUTCAR", `grep -E "f  =|f/i=" OUTCAR > frequencies.dat`, "将实频和虚频信息导出为 frequencies.dat。", ["频率", "frequencies.dat"])
    ]
  },
  {
    id: "lis",
    title: "锂硫电池 / 催化剂专用后处理命令",
    items: [
      c("批量提取 Li2Sn 吸附体系、基底、分子的能量", "多个 OUTCAR", `printf "system,toten_ev\\n" > lis_energy.csv

for d in slab Li2S6 ads_Li2S6_FeN4 ads_Li2S6_CoN4 ads_Li2S6_NiN4; do
  e=$(grep "free  energy   TOTEN" "$d/OUTCAR" | tail -n 1 | awk '{print $5}')
  printf "%s,%s\\n" "$d" "$e"
done >> lis_energy.csv`, "批量汇总不同体系能量。", ["Li2Sn", "吸附能", "TOTEN"]),
      c("计算单个位点 Li2S6 吸附能", "lis_energy.csv", `awk -F, '
$1=="ads_Li2S6_FeN4"{Ecomplex=$2}
$1=="slab"{Eslab=$2}
$1=="Li2S6"{Emol=$2}
END{print Ecomplex-Eslab-Emol}
' lis_energy.csv`, "计算 FeN4 位点上 Li2S6 的吸附能。公式：E_ads = E_slab+Li2S6 - E_slab - E_Li2S6。", ["Li2S6", "吸附能", "Eads"]),
      c("批量计算不同位点吸附能", "lis_energy.csv", `awk -F, '
$1=="slab"{Eslab=$2}
$1=="Li2S6"{Emol=$2}
$1 ~ /^ads_Li2S6_/ {E[$1]=$2}
END{
  print "site,Eads_eV"
  for(i in E){
    print i "," E[i]-Eslab-Emol
  }
}
' lis_energy.csv > adsorption_energy.csv`, "批量生成 adsorption_energy.csv。", ["吸附能", "批量"]),
      c("自由能修正", "手动输入 ΔE、ΔZPE、TΔS", `awk -v dE=-1.25 -v dZPE=0.08 -v TdS=0.20 'BEGIN{print dE+dZPE-TdS}'`, "用于反应路径自由能修正。公式：ΔG = ΔE + ΔZPE - TΔS。", ["自由能", "ΔG"]),
      c("计算 Li2Sn 吸附物 Bader 电荷总和", "ACF.dat", `awk -v a=37 -v b=44 '
NR>2 && $1 ~ /^[0-9]+$/ && $1>=a && $1<=b{
  q+=$5
}
END{print q}
' ACF.dat`, "示例中吸附物原子编号为 37 到 44。", ["Bader", "Li2Sn"]),
      c("提取金属活性中心 Bader 电荷", "ACF.dat", `awk '$1==12 {print $1, $5}' ACF.dat`, "示例中 Fe 是第 12 号原子。", ["金属中心", "Bader"]),
      c("提取金属中心局域磁矩", "OUTCAR", `awk '
/magnetization \\(x\\)/{cap=1; block=""}
cap{block=block $0 ORS}
cap && $1=="tot"{last=block; cap=0}
END{printf "%s", last}
' OUTCAR | awk '$1==12'`, "提取第 12 号原子的局域磁矩。", ["磁矩", "金属中心"]),
      c("计算 S-S 键长，ASE 版本", "CONTCAR", `python - <<'PY'
from ase.io import read

atoms = read("CONTCAR")

# ASE 原子编号从 0 开始
i, j = 36, 37

print(atoms.get_distance(i, j, mic=True))
PY`, "VASP/OUTCAR/ACF.dat 原子编号通常从 1 开始，ASE 原子编号从 0 开始。如果 VASP 中是第 37 和 38 号原子，ASE 中应写为 36 和 37。", ["S-S", "ASE", "键长"], "需要安装 ASE，并确认原子编号与当前结构一致。")
    ]
  },
  {
    id: "summary",
    title: "一键汇总脚本",
    items: [
      c("批量生成 VASP 结果汇总表", "多个 OUTCAR", `printf "dir,status,toten_ev,efermi_ev,volume_A3,max_force_evA\\n" > vasp_summary.csv

find . -name OUTCAR -print0 | while IFS= read -r -d '' f; do
  d=\${f%/OUTCAR}

  status=$(if grep -q "General timing" "$f"; then echo finished; else echo unfinished; fi)

  e=$(grep "free  energy   TOTEN" "$f" | tail -n 1 | awk '{print $5}')
  ef=$(grep "E-fermi" "$f" | tail -n 1 | awk '{print $3}')
  vol=$(grep "volume of cell" "$f" | tail -n 1 | awk '{print $5}')

  maxf=$(awk '
  /TOTAL-FORCE/{
    inside=1
    max=0
    getline
    next
  }
  inside && NF==6{
    f=sqrt($4*$4+$5*$5+$6*$6)
    if(f>max) max=f
  }
  inside && /total drift/{
    last=max
    inside=0
  }
  END{print last}
  ' "$f")

  printf "%s,%s,%s,%s,%s,%s\\n" "$d" "$status" "$e" "$ef" "$vol" "$maxf"
done >> vasp_summary.csv`, "递归扫描所有 OUTCAR，生成包含任务状态、总能、费米能级、体积和最大受力的汇总表。", ["汇总", "CSV", "TOTEN", "费米", "最大受力"])
    ]
  }
];
