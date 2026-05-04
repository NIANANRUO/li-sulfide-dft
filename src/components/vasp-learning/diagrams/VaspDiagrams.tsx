"use client";

import type { ComponentType } from "react";
import { ResearchDemoFrame } from "@/components/ResearchDemoFrame";

export type VaspDiagramId =
  | "VaspWorkflowDiagram"
  | "InputFilesRelationDiagram"
  | "PoscarStructureDiagram"
  | "KpointsSamplingDiagram"
  | "LinuxPipelineDiagram"
  | "SlurmJobFlowDiagram"
  | "StaticPostprocessFlowDiagram"
  | "DosPdosDiagram"
  | "BaderWorkflowDiagram"
  | "ChargeDensityDifferenceDiagram"
  | "NebEnergyPathDiagram"
  | "LiSMechanismEvidenceDiagram";

const box = "fill-[#08182f] stroke-cyan/60";
const text = "fill-slate-100 text-[13px] font-bold";
const sub = "fill-slate-400 text-[11px]";
const line = "stroke-cyan/55";

function DiagramShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ResearchDemoFrame title={title} compact minHeight="12rem" className="p-3">
    <div className="overflow-x-auto dft-scrollbar">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-cyan">{title}</p>
      {children}
    </div>
    </ResearchDemoFrame>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <path d={`M${x1} ${y1} L${x2} ${y2}`} className={`${line} demo-flow`} strokeWidth="1.8" markerEnd="url(#arrow)" />;
}

function SvgDefs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="rgb(34 211 238 / .7)" />
      </marker>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function Node({ x, y, w = 128, h = 58, title, note }: { x: number; y: number; w?: number; h?: number; title: string; note?: string }) {
  return (
    <g className="demo-fade transition hover:brightness-125">
      <rect x={x} y={y} width={w} height={h} rx="14" className={box} strokeWidth="1.2" filter="url(#glow)" />
      <text x={x + w / 2} y={y + 25} textAnchor="middle" className={text}>
        {title}
      </text>
      {note && (
        <text x={x + w / 2} y={y + 43} textAnchor="middle" className={sub}>
          {note}
        </text>
      )}
    </g>
  );
}

export function VaspWorkflowDiagram() {
  const nodes = [
    ["建模 / 结构准备", "POSCAR 初稿"],
    ["四大输入文件", "INCAR/POSCAR/KPOINTS/POTCAR"],
    ["VASP 运行", "vasp_std / vasp_gam"],
    ["输出文件", "OUTCAR/OSZICAR/CHGCAR"],
    ["结果提取", "grep/awk/Python"],
    ["后处理分析", "DOS/Bader/NEB"],
    ["Li-S 催化机制", "吸附/转化/证据链"],
    ["论文图表", "CSV/作图/图注"]
  ];
  return (
    <DiagramShell title="VASP 总体学习与计算工作流">
      <svg role="img" aria-label="VASP 总体学习与计算工作流" width="1120" height="150" viewBox="0 0 1120 150">
        <SvgDefs />
        {nodes.map(([title, note], i) => (
          <Node key={title} x={20 + i * 136} y={42} w={118} title={title} note={note} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <Arrow key={i} x1={138 + i * 136} y1={71} x2={156 + i * 136} y2={71} />
        ))}
      </svg>
    </DiagramShell>
  );
}

export function InputFilesRelationDiagram() {
  return (
    <DiagramShell title="四大输入文件关系图">
      <svg role="img" aria-label="四大输入文件关系图" width="820" height="310" viewBox="0 0 820 310">
        <SvgDefs />
        <Node x={330} y={128} w={160} title="VASP 计算" note="四类输入共同决定" />
        <Node x={55} y={35} w={180} title="POSCAR" note="算什么结构" />
        <Node x={55} y={205} w={180} title="POTCAR" note="赝势 / ZVAL / ENMAX" />
        <Node x={585} y={35} w={180} title="INCAR" note="怎么算 / 输出什么" />
        <Node x={585} y={205} w={180} title="KPOINTS" note="k 点采样" />
        <Arrow x1={235} y1={64} x2={330} y2={148} />
        <Arrow x1={235} y1={234} x2={330} y2={178} />
        <Arrow x1={585} y1={64} x2={490} y2={148} />
        <Arrow x1={585} y1={234} x2={490} y2={178} />
        <path d="M145 93 C145 150 145 160 145 205" className="stroke-amber-300/70" strokeDasharray="5 5" fill="none" />
        <text x="155" y="152" className={sub}>
          元素顺序必须一致
        </text>
        <text x="530" y="154" className={sub}>
          ENCUT / LCHARG / LWAVE 影响后处理
        </text>
      </svg>
    </DiagramShell>
  );
}

export function PoscarStructureDiagram() {
  const rows = ["Li-S catalyst slab", "1.0", "12.40 0.00 0.00", "0.00 12.40 0.00", "0.00 0.00 24.00", "C N Fe Li S", "36 4 1 2 6", "Selective Dynamics", "Direct", "0.125 0.250 0.460 T T T"];
  const labels = ["标题", "缩放因子", "晶格矢量 a", "晶格矢量 b", "晶格矢量 c / 真空层", "元素顺序", "原子数量", "可选固定标记", "坐标类型", "坐标 + T/F"];
  return (
    <DiagramShell title="POSCAR 结构拆解图">
      <svg role="img" aria-label="POSCAR 结构拆解图" width="920" height="390" viewBox="0 0 920 390">
        <SvgDefs />
        <rect x="30" y="25" width="420" height="330" rx="12" className="fill-slate-950/80 stroke-cyan/40" />
        {rows.map((row, i) => (
          <g key={row}>
            <text x="55" y={58 + i * 30} className="fill-blue-100 text-[13px] font-mono">
              {String(i + 1).padStart(2, "0")}  {row}
            </text>
            <path d={`M455 ${53 + i * 30} C510 ${53 + i * 30} 510 ${53 + i * 30} 558 ${53 + i * 30}`} className="stroke-cyan/35" fill="none" />
            <rect x="565" y={37 + i * 30} width="250" height="24" rx="7" className="fill-cyan/10 stroke-cyan/30" />
            <text x="580" y={54 + i * 30} className={sub}>
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </DiagramShell>
  );
}

export function KpointsSamplingDiagram() {
  const cells = [
    ["bulk", "三维周期", "5 x 5 x 5"],
    ["slab", "x/y 周期，z 真空", "3 x 3 x 1"],
    ["molecule", "大真空盒", "1 x 1 x 1"]
  ];
  return (
    <DiagramShell title="KPOINTS 采样图">
      <svg role="img" aria-label="KPOINTS 采样图" width="820" height="260" viewBox="0 0 820 260">
        <SvgDefs />
        {cells.map(([name, note, mesh], i) => {
          const x = 55 + i * 250;
          return (
            <g key={name}>
              <rect x={x} y="38" width="190" height="150" rx="14" className="fill-[#08182f] stroke-cyan/50" />
              <text x={x + 95} y="68" textAnchor="middle" className={text}>
                {name}
              </text>
              <text x={x + 95} y="91" textAnchor="middle" className={sub}>
                {note}
              </text>
              {Array.from({ length: name === "molecule" ? 1 : name === "slab" ? 9 : 25 }).map((_, p) => (
                <circle key={p} cx={x + 55 + (p % 5) * 20} cy={name === "molecule" ? 130 : 115 + Math.floor(p / 5) * 14} r="3.2" className="fill-cyan" opacity={name === "slab" && p > 8 ? 0 : 0.85} />
              ))}
              <text x={x + 95} y="170" textAnchor="middle" className="fill-amber-100 text-[13px] font-bold">
                {mesh}
              </text>
            </g>
          );
        })}
        <text x="410" y="225" textAnchor="middle" className={sub}>
          z 方向为真空层时，通常不需要密集 k 点采样。
        </text>
      </svg>
    </DiagramShell>
  );
}

export function LinuxPipelineDiagram() {
  const nodes = [
    ["OUTCAR", "原始输出"],
    ['grep "TOTEN"', "筛出能量行"],
    ["tail -n 1", "取最后一步"],
    ["awk '{print $5}'", "取第 5 列"],
    ["Energy value", "输出 eV"]
  ];
  return (
    <DiagramShell title="Linux 管道命令图">
      <svg role="img" aria-label="Linux 管道命令图" width="820" height="205" viewBox="0 0 820 205">
        <SvgDefs />
        {nodes.map(([title, note], i) => (
          <Node key={title} x={35 + i * 154} y={52} w={128} title={title} note={note} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <Arrow key={i} x1={163 + i * 154} y1={81} x2={189 + i * 154} y2={81} />
        ))}
        <text x="410" y="160" textAnchor="middle" className="fill-blue-100 text-[13px] font-mono">
          grep "free  energy   TOTEN" OUTCAR | tail -n 1 | awk '&#123;print $5&#125;'
        </text>
      </svg>
    </DiagramShell>
  );
}

export function SlurmJobFlowDiagram() {
  const nodes = [["输入文件"], ["run_vasp.sh"], ["sbatch"], ["PENDING"], ["RUNNING"], ["vasp.out"], ["OUTCAR/OSZICAR"], ["结束 / 报错 / 续算"]];
  return (
    <DiagramShell title="Slurm 作业生命周期图">
      <svg role="img" aria-label="Slurm 作业生命周期图" width="1030" height="155" viewBox="0 0 1030 155">
        <SvgDefs />
        {nodes.map(([title], i) => (
          <Node key={title} x={22 + i * 124} y={42} w={108} title={title} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <Arrow key={i} x1={130 + i * 124} y1={71} x2={146 + i * 124} y2={71} />
        ))}
        <text x="515" y="125" textAnchor="middle" className={sub}>
          常用命令：sbatch / squeue / scancel / sacct / tail -f vasp.out
        </text>
      </svg>
    </DiagramShell>
  );
}

export function StaticPostprocessFlowDiagram() {
  const nodes = [["结构优化 opt", "得到合理结构"], ["CONTCAR", "优化结构"], ["POSCAR", "下一步输入"], ["静态自洽", "高精度能量/电荷"], ["CHGCAR/WAVECAR/OUTCAR", "后处理基础"], ["DOS / Bader / 差分 / 能带", "机制分析"]];
  return (
    <DiagramShell title="结构优化到静态后处理流程图">
      <svg role="img" aria-label="结构优化到静态后处理流程图" width="920" height="160" viewBox="0 0 920 160">
        <SvgDefs />
        {nodes.map(([title, note], i) => (
          <Node key={title} x={25 + i * 148} y={45} w={132} title={title} note={note} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <Arrow key={i} x1={157 + i * 148} y1={74} x2={173 + i * 148} y2={74} />
        ))}
      </svg>
    </DiagramShell>
  );
}

export function DosPdosDiagram() {
  return (
    <DiagramShell title="DOS / PDOS 图示">
      <svg role="img" aria-label="DOS 和 PDOS 图示" width="720" height="330" viewBox="0 0 720 330">
        <SvgDefs />
        <line x1="80" y1="265" x2="650" y2="265" className="stroke-slate-500" />
        <line x1="80" y1="45" x2="80" y2="265" className="stroke-slate-500" />
        <line x1="365" y1="45" x2="365" y2="265" className="stroke-amber-300" strokeDasharray="5 5" />
        <path d="M95 245 C145 160 185 210 230 110 C285 30 320 210 365 125 C420 50 455 190 505 115 C555 70 600 185 635 98" fill="none" className="stroke-cyan" strokeWidth="3" />
        <path d="M95 252 C160 225 210 230 245 175 C290 120 325 208 365 180 C420 118 455 185 520 150 C580 130 605 170 635 160" fill="none" className="stroke-blue-300" strokeWidth="2" />
        <path d="M95 258 C160 250 215 240 265 225 C310 205 335 238 365 230 C410 210 470 226 540 215 C585 205 610 220 635 210" fill="none" className="stroke-fuchsia-300" strokeWidth="2" />
        <text x="365" y="285" textAnchor="middle" className="fill-amber-100 text-[12px] font-bold">
          E_F = 0 eV
        </text>
        <text x="360" y="315" textAnchor="middle" className={sub}>
          横轴：E - E_F
        </text>
        <text x="26" y="155" transform="rotate(-90 26 155)" className={sub}>
          纵轴：DOS
        </text>
        <text x="535" y="65" className="fill-cyan text-[12px] font-bold">
          TDOS
        </text>
        <text x="535" y="86" className="fill-blue-300 text-[12px] font-bold">
          Metal-d
        </text>
        <text x="535" y="107" className="fill-fuchsia-300 text-[12px] font-bold">
          S-p / Li-s
        </text>
      </svg>
    </DiagramShell>
  );
}

export function BaderWorkflowDiagram() {
  const nodes = [["静态 + LAECHG"], ["CHGCAR"], ["AECCAR0 + AECCAR2"], ["chgsum.pl"], ["CHGCAR_sum"], ["bader -ref"], ["ACF.dat"], ["Δq = ZVAL - Q"]];
  return (
    <DiagramShell title="Bader 电荷分析流程图">
      <svg role="img" aria-label="Bader 电荷分析流程图" width="1060" height="155" viewBox="0 0 1060 155">
        <SvgDefs />
        {nodes.map(([title], i) => (
          <Node key={title} x={20 + i * 128} y={45} w={112} title={title} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <Arrow key={i} x1={132 + i * 128} y1={74} x2={148 + i * 128} y2={74} />
        ))}
        <text x="530" y="128" textAnchor="middle" className={sub}>
          ZVAL 来自 POTCAR；Q_bader 来自 ACF.dat。
        </text>
      </svg>
    </DiagramShell>
  );
}

export function ChargeDensityDifferenceDiagram() {
  return (
    <DiagramShell title="差分电荷密度图示">
      <svg role="img" aria-label="差分电荷密度图示" width="780" height="245" viewBox="0 0 780 245">
        <SvgDefs />
        <Node x={35} y={72} w={145} title="ρ_adsorbed" note="吸附体系" />
        <text x="205" y="106" className="fill-slate-200 text-[24px] font-bold">
          -
        </text>
        <Node x={240} y={72} w={145} title="ρ_substrate" note="单独基底" />
        <text x="410" y="106" className="fill-slate-200 text-[24px] font-bold">
          -
        </text>
        <Node x={445} y={72} w={145} title="ρ_adsorbate" note="单独吸附物" />
        <text x="615" y="106" className="fill-slate-200 text-[24px] font-bold">
          =
        </text>
        <Node x={650} y={72} w={95} title="Δρ" note="差分" />
        <circle cx="315" cy="180" r="14" className="fill-cyan/70" />
        <text x="340" y="185" className={sub}>
          电荷积累区
        </text>
        <circle cx="470" cy="180" r="14" className="fill-amber-300/70" />
        <text x="495" y="185" className={sub}>
          电荷耗尽区
        </text>
      </svg>
    </DiagramShell>
  );
}

export function NebEnergyPathDiagram() {
  const points = [
    [80, 230],
    [180, 185],
    [280, 138],
    [380, 72],
    [480, 118],
    [580, 172],
    [680, 205]
  ];
  return (
    <DiagramShell title="NEB 反应路径能垒图">
      <svg role="img" aria-label="NEB 反应路径能垒图" width="760" height="320" viewBox="0 0 760 320">
        <SvgDefs />
        <line x1="65" y1="250" x2="700" y2="250" className="stroke-slate-500" />
        <line x1="65" y1="55" x2="65" y2="250" className="stroke-slate-500" />
        <path d={`M ${points.map(([x, y]) => `${x} ${y}`).join(" L ")}`} fill="none" className="stroke-cyan" strokeWidth="3" filter="url(#glow)" />
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" className={i === 3 ? "fill-amber-300" : "fill-cyan"} />
            <text x={x} y={y + 24} textAnchor="middle" className={sub}>
              {String(i).padStart(2, "0")}
            </text>
          </g>
        ))}
        <line x1="80" y1="230" x2="380" y2="72" className="stroke-amber-300" strokeDasharray="5 5" />
        <text x="238" y="126" className="fill-amber-100 text-[12px] font-bold">
          Energy barrier
        </text>
        <text x="365" y="302" textAnchor="middle" className={sub}>
          Reaction coordinate
        </text>
        <text x="22" y="165" transform="rotate(-90 22 165)" className={sub}>
          Relative energy / eV
        </text>
      </svg>
    </DiagramShell>
  );
}

export function LiSMechanismEvidenceDiagram() {
  const rows = [
    ["Li2Sn 吸附能", "证明多硫化物锚定能力"],
    ["Bader + 差分电荷", "证明界面电子转移"],
    ["DOS / PDOS / d-band", "解释金属位点电子结构调控"],
    ["S-S / Li-S 键长", "证明多硫化物活化"],
    ["NEB + 自由能路径", "证明转化动力学改善"]
  ];
  return (
    <DiagramShell title="锂硫电池催化机制证据链图">
      <svg role="img" aria-label="锂硫电池催化机制证据链图" width="900" height="360" viewBox="0 0 900 360">
        <SvgDefs />
        {rows.map(([title, note], i) => (
          <g key={title}>
            <Node x={60} y={32 + i * 58} w={190} h={44} title={title} />
            <Arrow x1={250} y1={54 + i * 58} x2={315} y2={54 + i * 58} />
            <rect x={325} y={32 + i * 58} width="310" height="44" rx="11" className="fill-blue-500/10 stroke-blue-300/40" />
            <text x="480" y={59 + i * 58} textAnchor="middle" className={sub}>
              {note}
            </text>
          </g>
        ))}
        <rect x="675" y="90" width="170" height="120" rx="16" className="fill-amber-300/10 stroke-amber-300/50" />
        <text x="760" y="132" textAnchor="middle" className="fill-amber-100 text-[13px] font-bold">
          最终结论
        </text>
        <text x="760" y="158" textAnchor="middle" className={sub}>
          促进吸附、活化与转化
        </text>
        <text x="760" y="180" textAnchor="middle" className={sub}>
          抑制穿梭并提升动力学
        </text>
      </svg>
    </DiagramShell>
  );
}

export const vaspDiagramMap: Record<VaspDiagramId, ComponentType> = {
  VaspWorkflowDiagram,
  InputFilesRelationDiagram,
  PoscarStructureDiagram,
  KpointsSamplingDiagram,
  LinuxPipelineDiagram,
  SlurmJobFlowDiagram,
  StaticPostprocessFlowDiagram,
  DosPdosDiagram,
  BaderWorkflowDiagram,
  ChargeDensityDifferenceDiagram,
  NebEnergyPathDiagram,
  LiSMechanismEvidenceDiagram
};
