"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { catalystSystems, extraCatalystCards } from "@/data/catalystSystems";
import { GlassCard, Tag } from "./UI";

export function CatalystLibrary() {
  const [query, setQuery] = useState("");
  const [site, setSite] = useState("全部");
  const [method, setMethod] = useState("全部");
  const [dft, setDft] = useState("全部");
  const sites = ["全部", ...Array.from(new Set(catalystSystems.flatMap((item) => item.activeSites))).slice(0, 14)];
  const methods = ["全部", ...Array.from(new Set(catalystSystems.flatMap((item) => item.characterizationMethods))).slice(0, 14)];
  const dftMethods = ["全部", ...Array.from(new Set(catalystSystems.flatMap((item) => item.dftMethods))).slice(0, 14)];

  const filtered = useMemo(
    () =>
      catalystSystems.filter((item) => {
        const text = [item.name, item.summary, item.shortName].join(" ");
        return (
          text.toLowerCase().includes(query.toLowerCase()) &&
          (site === "全部" || item.activeSites.includes(site)) &&
          (method === "全部" || item.characterizationMethods.includes(method)) &&
          (dft === "全部" || item.dftMethods.includes(dft))
        );
      }),
    [query, site, method, dft]
  );

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="rounded border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan"
            placeholder="按体系筛选，例如 MXene"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select value={site} onChange={setSite} options={sites} label="按活性位点" />
          <Select value={method} onChange={setMethod} options={methods} label="按表征方法" />
          <Select value={dft} onChange={setDft} options={dftMethods} label="按 DFT 方法" />
        </div>
      </GlassCard>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <CatalystSystemCard key={item.id} item={item} />
        ))}
        {extraCatalystCards.map((item) => (
          <GlassCard key={item.id}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              <Tag>补充体系</Tag>
            </div>
            <p className="text-sm leading-7 text-slate-300">{item.summary}</p>
            <p className="mt-5 text-xs text-slate-500">当前作为库卡片预留，后续可按统一模板扩展详情页。</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="grid gap-1 text-xs text-slate-500">
      {label}
      <select
        className="rounded border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function CatalystSystemCard({ item }: { item: (typeof catalystSystems)[number] }) {
  return (
    <GlassCard className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">{item.name}</h3>
        <Tag>{item.shortName}</Tag>
      </div>
      <p className="text-sm leading-7 text-slate-300">{item.summary}</p>
      <div className="mt-4 grid gap-3 text-sm">
        <Mini label="代表结构" value={item.dftModels.slice(0, 2).join(" / ")} />
        <Mini label="主要活性位点" value={item.activeSites.slice(0, 3).join("、")} />
        <Mini label="推荐表征" value={item.characterizationMethods.slice(0, 4).join("、")} />
        <Mini label="DFT 分析" value={item.dftMethods.slice(0, 4).join("、")} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.advantages.slice(0, 2).map((adv) => (
          <Tag key={adv}>{adv}</Tag>
        ))}
      </div>
      <Link className="mt-auto pt-5 text-sm font-semibold text-cyan hover:text-cyan/80" href={item.route}>
        进入详情页
      </Link>
    </GlassCard>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-slate-200">{value}</p>
    </div>
  );
}
