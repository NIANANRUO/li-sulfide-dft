import { GlassCard, Tag } from "@/components/UI";

export function PanelHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {desc && <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{desc}</p>}
      </div>
    </div>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string; note?: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <GlassCard key={item.label}>
          <p className="text-xs text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
          {item.note && <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>}
        </GlassCard>
      ))}
    </div>
  );
}

export function MiniCard({ title, desc, tags }: { title: string; desc: string; tags?: string[] }) {
  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
