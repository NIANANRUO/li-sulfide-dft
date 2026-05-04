"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";
import { ResearchDemoFrame } from "@/components/ResearchDemoFrame";
import {
  adsorptionEnergyData,
  cyclingData,
  cvData,
  dischargeCurveData,
  eisData,
  freeEnergyData,
  lisNucleationData,
  rateData,
  sampleNames
} from "@/data/performanceMockData";

const colors = ["#38d7ff", "#a78bfa", "#22c55e", "#f59e0b"];

function ChartFrame({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <ResearchDemoFrame title={title} minHeight="22rem">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {desc && <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>}
      </div>
      <div className="h-72">{children}</div>
    </ResearchDemoFrame>
  );
}

export function AdsorptionEnergyChart() {
  const [sample, setSample] = useState(sampleNames[0]);
  return (
    <ChartFrame title="LiPS 吸附能 mock 柱状图" desc="E_ads = E(catalyst + LiPS) - E(catalyst) - E(LiPS)。越负通常代表吸附越强，但需要避免过强吸附阻碍后续转化。">
      <div className="mb-3 flex flex-wrap gap-2">
        {sampleNames.map((name) => (
          <button
            key={name}
            className={`rounded px-3 py-1.5 text-xs soft-border ${sample === name ? "bg-cyan/15 text-cyan" : "text-slate-300"}`}
            onClick={() => setSample(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={adsorptionEnergyData}>
          <CartesianGrid stroke="rgba(148,163,184,.16)" />
          <XAxis dataKey="species" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" unit=" eV" />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
          <Bar dataKey={sample} fill="#38d7ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function FreeEnergyPathChart() {
  const samples = Object.keys(freeEnergyData);
  const [sample, setSample] = useState(samples[0]);
  const data = freeEnergyData[sample as keyof typeof freeEnergyData];
  const limiting = useMemo(() => {
    let maxRise = -Infinity;
    let label = "";
    for (let i = 1; i < data.length; i++) {
      const rise = data[i].energy - data[i - 1].energy;
      if (rise > maxRise) {
        maxRise = rise;
        label = `${data[i - 1].step} -> ${data[i].step}`;
      }
    }
    return { label, maxRise: Number(maxRise.toFixed(2)) };
  }, [data]);

  return (
    <ChartFrame title="吉布斯自由能路径动画" desc={`当前限速步骤 mock：${limiting.label}，ΔG = ${limiting.maxRise} eV。切换催化剂可比较热力学趋势。`}>
      <div className="mb-3 flex flex-wrap gap-2">
        {samples.map((name) => (
          <button
            key={name}
            className={`rounded px-3 py-1.5 text-xs soft-border ${sample === name ? "bg-violet/15 text-violet-200" : "text-slate-300"}`}
            onClick={() => setSample(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(148,163,184,.16)" />
          <XAxis dataKey="step" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" unit=" eV" />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
          <Line type="monotone" dataKey="energy" stroke="#a78bfa" strokeWidth={3} dot={{ fill: "#38d7ff", r: 5 }} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export const FreeEnergyChart = FreeEnergyPathChart;

export function PerformanceCharts() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ChartFrame title="循环性能" desc="用于评价长期稳定性和容量保持率，同时需要关注库伦效率是否接近稳定。">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cyclingData}>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="cycle" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Legend />
            <Line dataKey="SAC-FeN4" stroke={colors[0]} strokeWidth={2} dot={false} />
            <Line dataKey="DAC-CoFe" stroke={colors[1]} strokeWidth={2} dot={false} />
            <Line dataKey="TiO2-x" stroke={colors[2]} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="倍率性能" desc="用于评价不同电流密度下的反应动力学和电子/离子传输能力。">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rateData}>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="rate" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Legend />
            <Bar dataKey="SAC-FeN4" fill={colors[0]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="DAC-CoFe" fill={colors[1]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="TiO2-x" fill={colors[2]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="CV 曲线" desc="用于分析氧化还原峰、电极极化和反应可逆性。峰间距越小通常说明极化更低。">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cvData}>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="voltage" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Area dataKey="cathodic" stroke={colors[0]} fill="#38d7ff22" />
            <Area dataKey="anodic" stroke={colors[1]} fill="#a78bfa22" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="EIS Nyquist 图" desc="半圆直径可反映界面电荷转移阻抗，低频斜线与离子扩散行为相关。">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="zre" name="Z'" stroke="#94a3b8" />
            <YAxis dataKey="SAC-FeN4" name="-Z''" stroke="#94a3b8" />
            <ZAxis range={[36, 36]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Scatter name="SAC-FeN4" data={eisData} fill={colors[0]} line />
            <Scatter name="DAC-CoFe" data={eisData.map((d) => ({ zre: d.zre, "SAC-FeN4": d["DAC-CoFe"] }))} fill={colors[1]} line />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="充放电曲线 GCD" desc="用于分析放电平台、充电平台和电极极化，平台差越小通常说明催化动力学更好。">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dischargeCurveData}>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="capacity" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[1.6, 2.6]} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Line dataKey="voltage" stroke={colors[0]} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="Li2S 沉积曲线" desc="用于验证催化剂对 Li2S 成核和沉积过程的促进作用。曲线面积可近似比较沉积容量。">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lisNucleationData}>
            <CartesianGrid stroke="rgba(148,163,184,.16)" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.28)" }} />
            <Legend />
            <Line dataKey="SAC-FeN4" stroke={colors[0]} dot={false} />
            <Line dataKey="DAC-CoFe" stroke={colors[1]} dot={false} />
            <Line dataKey="TiO2-x" stroke={colors[2]} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}
