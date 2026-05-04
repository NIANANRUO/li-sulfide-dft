"use client";

import { Filter, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { catalystDirections } from "@/data/catalystDirections";
import type { CatalystDirection } from "@/data/catalystDirections";
import { CatalystDirectionDetail } from "./CatalystDirectionDetail";
import { theoryFigureMap } from "./TheoryFigureMap";

const keywordFilters = ["单原子", "双原子", "异质结", "MXene", "抗钝化", "机器学习", "外场", "高熵"];
const priorityFilters = ["★★★★★", "★★★★☆"];
const categoryFilters = ["原子级催化", "单原子催化", "界面工程", "缺陷工程", "二维载体", "数据驱动设计", "外场调控"];

export function TheoryFigureOverview() {
  const [selectedId, setSelectedId] = useState(catalystDirections[0].id);
  const [keyword, setKeyword] = useState("全部");
  const [priority, setPriority] = useState("全部");
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return catalystDirections.filter((item) => {
      const text = [item.title, item.shortTitle, item.category, item.tagline, ...item.keywords, ...item.mechanismTags].join(" ").toLowerCase();
      const keywordHit = keyword === "全部" || text.includes(keyword.toLowerCase());
      const priorityHit = priority === "全部" || item.priority === priority;
      const categoryHit = category === "全部" || item.category === category;
      const searchHit = !lowerQuery || text.includes(lowerQuery);
      return keywordHit && priorityHit && categoryHit && searchHit;
    });
  }, [keyword, priority, category, query]);

  const selected = catalystDirections.find((item) => item.id === selectedId) ?? filtered[0] ?? catalystDirections[0];

  return (
    <section className="relative h-full min-h-[760px] overflow-hidden rounded-xl border border-[#1f5b9d]/50 bg-[#020817]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,.22),transparent_24rem),radial-gradient(circle_at_80%_16%,rgba(124,58,237,.22),transparent_28rem),linear-gradient(135deg,rgba(2,6,23,.96),rgba(8,18,44,.92))]" />
      <div className="absolute inset-0 science-grid opacity-35" />
      <div className="relative grid h-full min-h-0 gap-4 p-4 2xl:grid-cols-[minmax(0,1.46fr)_minmax(420px,.92fr)]">
        <div className="flex min-h-0 flex-col">
          <Header total={filtered.length} />
          <FilterBar
            keyword={keyword}
            priority={priority}
            category={category}
            query={query}
            onKeyword={setKeyword}
            onPriority={setPriority}
            onCategory={setCategory}
            onQuery={setQuery}
          />
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 dft-scrollbar">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
              {filtered.map((direction, index) => (
                <FigureCard
                  key={direction.id}
                  direction={direction}
                  active={direction.id === selected.id}
                  index={index}
                  onSelect={() => setSelectedId(direction.id)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-cyan/30 bg-cyan/5 text-slate-300">
                没有匹配的催化剂方向，请调整筛选条件。
              </div>
            )}
          </div>
        </div>
        <CatalystDirectionDetail direction={selected} />
      </div>
    </section>
  );
}

function Header({ total }: { total: number }) {
  return (
    <header className="rounded-xl border border-cyan/25 bg-[#041124]/78 p-3 shadow-[0_0_30px_rgba(56,189,248,.10)] backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
            <Sparkles size={16} />
            Catalyst Design Project Map
          </div>
          <h1 className="text-2xl font-black tracking-wide text-white md:text-3xl">催化剂设计项目库</h1>
          <p className="mt-1.5 max-w-5xl text-xs leading-5 text-slate-300 md:text-sm">以 12 张原创 SVG 理论机理图组织锂硫电池催化剂设计方向，覆盖原子级位点、界面电场、缺陷工程、MXene、外场调控和数据驱动筛选。</p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-1.5">
          <p className="text-base font-black text-amber-200">{total}</p>
          <p className="text-xs font-bold text-amber-100/80">当前方向</p>
        </div>
      </div>
    </header>
  );
}

function FilterBar({
  keyword,
  priority,
  category,
  query,
  onKeyword,
  onPriority,
  onCategory,
  onQuery
}: {
  keyword: string;
  priority: string;
  category: string;
  query: string;
  onKeyword: (value: string) => void;
  onPriority: (value: string) => void;
  onCategory: (value: string) => void;
  onQuery: (value: string) => void;
}) {
  return (
    <div className="mt-3 rounded-xl border border-[#24517b] bg-[#06152b]/86 p-3">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-black text-blue-100">
          <Filter size={16} className="text-cyan" />
          筛选
        </div>
        <label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-cyan/25 bg-slate-950/50 px-3 py-2 text-sm text-slate-300">
          <Search size={15} className="text-cyan" />
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="搜索关键词、材料、DFT 方法" className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
        </label>
      </div>
      <FilterGroup label="关键词" value={keyword} options={keywordFilters} onChange={onKeyword} />
      <FilterGroup label="推荐等级" value={priority} options={priorityFilters} onChange={onPriority} />
      <FilterGroup label="分类" value={category} options={categoryFilters} onChange={onCategory} />
    </div>
  );
}

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 last:mb-0">
      <span className="w-16 text-xs font-bold text-slate-400">{label}</span>
      {["全部", ...options].map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
            value === option ? "border-cyan bg-cyan/20 text-cyan shadow-[0_0_18px_rgba(56,215,255,.28)]" : "border-slate-600/70 bg-white/[0.03] text-slate-300 hover:border-cyan/50 hover:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function FigureCard({ direction, active, onSelect }: { direction: CatalystDirection; active: boolean; index: number; onSelect: () => void }) {
  const Figure = theoryFigureMap[direction.figureType];
  return (
    <button
      onClick={onSelect}
      className={`group min-h-[292px] rounded-xl border p-3 text-left transition duration-200 ${
        active
          ? "border-cyan bg-cyan/12 shadow-[0_0_32px_rgba(56,215,255,.32)]"
          : "border-[#24517b] bg-[#06152b]/78 hover:scale-[1.018] hover:border-cyan/75 hover:bg-[#0b2140]/88 hover:shadow-[0_0_30px_rgba(56,215,255,.22)]"
      }`}
    >
      <div className="overflow-hidden rounded-lg border border-cyan/20 bg-slate-950/72">
        <Figure compact />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">{direction.overviewTitle}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-300">{direction.overviewSubtitle}</p>
        </div>
        <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2 py-1 text-xs font-black text-amber-200">{direction.priority}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {direction.mechanismTags.map((tag) => (
          <span key={tag} className="rounded-md border border-blue-300/20 bg-blue-400/10 px-2 py-1 text-[11px] font-bold text-blue-100">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
