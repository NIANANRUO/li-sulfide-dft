import { experimentDftMap } from "@/data/experimentDftMap";
import { GlassCard, Tag } from "./UI";

export function ExperimentDFTMap() {
  return (
    <GlassCard>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-cyan">Experiment ↔ DFT</p>
          <h2 className="text-xl font-semibold text-white">实验—计算对应关系</h2>
        </div>
        <Tag>机制互证</Tag>
      </div>
      <div className="grid gap-3">
        {experimentDftMap.map((item) => (
          <div key={item.experiment} className="grid gap-3 rounded-lg border border-slate-700/70 bg-slate-950/40 p-4 md:grid-cols-[.9fr_.9fr_1.4fr]">
            <div>
              <p className="text-xs text-slate-500">实验结果</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">{item.experiment}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">DFT 分析</p>
              <p className="mt-1 text-sm font-semibold text-cyan">{item.dft}</p>
            </div>
            <div>
              <p className="text-sm leading-6 text-slate-300">{item.interpretation}</p>
              <p className="mt-2 text-xs leading-5 text-amber-200/80">注意：{item.caution}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
