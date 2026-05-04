"use client";

import Link from "next/link";
import { ChevronDown, Copy, Info } from "lucide-react";
import { useState } from "react";
import { glossaryMap } from "@/data/glossary";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="science-grid mx-auto max-w-7xl px-4 py-10 md:py-14">{children}</div>;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold text-white md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{subtitle}</p>}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  actions
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: { label: string; href: string; primary?: boolean }[];
}) {
  return (
    <section className="mb-8 max-w-4xl">
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{subtitle}</p>}
      {actions && (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`rounded px-4 py-2 text-sm font-semibold transition ${
                action.primary
                  ? "bg-cyan text-slate-950 hover:bg-cyan/90"
                  : "border border-slate-600 text-slate-100 hover:border-cyan/50 hover:text-cyan"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function GlassCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-lg p-5 ${className}`}>{children}</div>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-xs text-cyan">{children}</span>;
}

export function SideToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] rounded-lg border border-slate-700/70 bg-slate-950/40 p-4 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">页面目录</p>
      <nav className="grid gap-1">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="rounded px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan">
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Accordion({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-950/40">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-100"
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} size={18} />
      </button>
      {open && <div className="border-t border-slate-700/60 p-4">{children}</div>}
    </div>
  );
}

export function CodeBlock({ title, note, code }: { title: string; note?: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700/70 bg-slate-950/80">
      <div className="flex items-center justify-between border-b border-slate-700/70 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{title}</p>
          {note && <p className="mt-1 text-xs leading-5 text-amber-200/90">{note}</p>}
        </div>
        <button
          className="rounded p-2 text-slate-300 hover:bg-white/5"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          title="复制代码"
        >
          <Copy size={16} />
        </button>
      </div>
      <pre className="max-h-[28rem] overflow-auto p-4 text-xs leading-6 text-slate-200">
        <code>{code}</code>
      </pre>
      {copied && <p className="px-4 pb-3 text-xs text-cyan">已复制</p>}
    </div>
  );
}

export function GlossaryTooltip({ term }: { term: string }) {
  const item = glossaryMap[term];
  if (!item) return <span className="font-semibold text-cyan">{term}</span>;
  return (
    <span className="group relative inline-flex items-center gap-1 align-baseline font-semibold text-cyan">
      {term}
      <Info size={13} className="opacity-70" />
      <span className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-72 rounded-lg border border-slate-700 bg-slate-950 p-3 text-left text-xs font-normal leading-5 text-slate-200 shadow-xl group-hover:block">
        <span className="block font-semibold text-white">{item.fullName ? `${item.term} · ${item.fullName}` : item.term}</span>
        <span className="mt-1 block text-slate-300">{item.definition}</span>
        <span className="mt-2 block text-slate-400">{item.context}</span>
      </span>
    </span>
  );
}

export function GlossaryPanel() {
  const terms = Object.values(glossaryMap);
  return (
    <GlassCard>
      <h2 className="mb-4 text-xl font-semibold text-white">术语解释</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {terms.map((item) => (
          <div key={item.term} className="rounded border border-slate-700/70 bg-slate-950/40 p-3">
            <p className="text-sm font-semibold text-cyan">{item.fullName ? `${item.term} · ${item.fullName}` : item.term}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.definition}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function EvidenceChain({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item, index) => (
        <div key={item} className="relative rounded-lg border border-cyan/20 bg-cyan/[0.08] p-4">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-cyan/15 text-sm font-bold text-cyan">
            {index + 1}
          </div>
          <p className="text-sm leading-6 text-slate-200">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function SimpleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700/70">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-slate-900/80 text-slate-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-slate-700/70 px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")} className="odd:bg-white/[0.02]">
              {row.map((cell) => (
                <td key={cell} className="border-b border-slate-800 px-4 py-3 text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
