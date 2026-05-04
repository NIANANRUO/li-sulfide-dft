export type VaspTemplate = {
  id: string;
  title: string;
  note: string;
  code: string;
  explanation: string[];
};

export const commonVaspWarning =
  "以下参数仅为展示模板，真实计算需要根据具体体系进行 ENCUT、KPOINTS、真空层、U 值、自旋、收敛标准和赝势一致性测试。";

export const vaspTemplates: VaspTemplate[] = [
  {
    id: "relax",
    title: "结构优化 INCAR 模板",
    note: commonVaspWarning,
    code: `SYSTEM = Catalyst_LiPS_relax
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-5
EDIFFG = -0.02
ISPIN  = 2
MAGMOM = 根据体系设置
IBRION = 2
NSW    = 200
ISIF   = 2
ISMEAR = 0
SIGMA  = 0.05
LREAL  = Auto
ALGO   = Normal
LASPH  = .TRUE.
IVDW   = 12
LWAVE  = .TRUE.
LCHARG = .TRUE.`,
    explanation: [
      "ENCUT 需要收敛测试。",
      "ISPIN 对过渡金属、缺陷和单原子体系通常很重要。",
      "ISIF=2 常用于 slab 和吸附体系，只优化原子位置。",
      "IVDW 用于考虑范德华相互作用。"
    ]
  },
  {
    id: "kpoints",
    title: "KPOINTS 模板",
    note: "K 点不是固定值。小晶胞需要更密集 K 点；大超胞、分子和吸附体系可适当降低；最终能量比较必须使用一致标准。",
    code: `slab 模型:
Automatic mesh
0
Gamma
3 3 1
0 0 0

大超胞:
Automatic mesh
0
Gamma
2 2 1
0 0 0

孤立分子:
Automatic mesh
0
Gamma
1 1 1
0 0 0`,
    explanation: ["K 点密度与晶胞大小相关。", "吸附能比较应保持一致计算设置。"]
  },
  {
    id: "static",
    title: "静态单点能计算 INCAR",
    note: commonVaspWarning,
    code: `SYSTEM = Static_energy
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-6
ISPIN  = 2
IBRION = -1
NSW    = 0
ISMEAR = 0
SIGMA  = 0.05
LREAL  = .FALSE.
LASPH  = .TRUE.
IVDW   = 12
LWAVE  = .TRUE.
LCHARG = .TRUE.`,
    explanation: [
      "用于获取更准确的总能量、电荷密度和波函数文件。",
      "吸附能、差分电荷、Bader 电荷和 DOS 通常基于优化后结构进行静态计算。"
    ]
  },
  {
    id: "dftu",
    title: "DFT+U 模板",
    note: "DFT+U 常用于过渡金属氧化物、部分硫化物和强关联 d 电子体系。U 值应参考文献或测试，不同 U 值下的能量不应随意混合比较。",
    code: `LDAU      = .TRUE.
LDAUTYPE  = 2
LDAUL     = 2 -1 -1
LDAUU     = U值 0 0
LDAUJ     = 0 0 0
LMAXMIX   = 4`,
    explanation: ["LDAUL/LDAUU 顺序必须与 POTCAR 元素顺序一致。", "强关联体系建议报告 U 值来源。"]
  },
  {
    id: "bader",
    title: "Bader 电荷分析模板",
    note: commonVaspWarning,
    code: `SYSTEM = Bader_charge
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-6
IBRION = -1
NSW    = 0
LCHARG = .TRUE.
LAECHG = .TRUE.
ADDGRID = .TRUE.

后处理:
chgsum.pl AECCAR0 AECCAR2
bader CHGCAR -ref CHGCAR_sum`,
    explanation: ["查看 ACF.dat 提取原子电荷。", "比较吸附前后金属位、S 原子和 Li 原子电荷变化。"]
  },
  {
    id: "dos",
    title: "DOS / PDOS INCAR 模板",
    note: commonVaspWarning,
    code: `SYSTEM = DOS_PDOS
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-6
IBRION = -1
NSW    = 0
ISMEAR = -5
SIGMA  = 0.05
LORBIT = 11
NEDOS  = 2000
LWAVE  = .TRUE.
LCHARG = .TRUE.

LDOS / Partial charge:
LPARD  = .TRUE.
LSEPB  = .TRUE.
LSEPK  = .FALSE.
IBAND  = 根据目标能带设置

或者:
LPARD = .TRUE.
EINT  = -1.0 0.0`,
    explanation: ["费米能级附近 DOS 可辅助判断电子传输能力。", "金属 d 轨道与 S p 轨道重叠可说明轨道耦合。"]
  },
  {
    id: "cohp",
    title: "COHP / LOBSTER 输入示例",
    note: "COHP 建议使用 VASP + LOBSTER 后处理，用于分析 M-S、Li-O、Li-N、S-S 等键的成键/反键作用。",
    code: `SYSTEM = COHP_static
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-6
IBRION = -1
NSW    = 0
ISYM   = -1
LWAVE  = .TRUE.
LCHARG = .TRUE.
LORBIT = 11

LOBSTERIN:
basisSet pbeVaspFit2015
cohpbetween atom 1 and atom 25
cohpbetween atom 8 and atom 30`,
    explanation: ["-COHP 正值区域通常表示成键贡献。", "ICOHP 绝对值越大通常说明键合作用越强。"]
  },
  {
    id: "neb",
    title: "NEB 反应能垒 INCAR 示例",
    note: commonVaspWarning,
    code: `SYSTEM = NEB_Li2S_decomposition
ENCUT  = 500
PREC   = Accurate
EDIFF  = 1E-5
EDIFFG = -0.03
ISPIN  = 2
IBRION = 3
POTIM  = 0
IMAGES = 5
SPRING = -5
NSW    = 200
LCLIMB = .TRUE.`,
    explanation: ["先优化初态和终态，再插入中间 images。", "最高点与初态能量差近似为反应能垒。"]
  }
];
