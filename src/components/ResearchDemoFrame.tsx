"use client";

import type React from "react";

type ResearchDemoFrameProps = {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  minHeight?: string;
  title?: string;
};

type DemoNodeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "cyan" | "blue" | "amber" | "violet" | "emerald" | "slate";
};

export function ResearchDemoFrame({
  children,
  className = "",
  compact = false,
  minHeight,
  title
}: ResearchDemoFrameProps) {
  const hasCustomPadding = /\bp-\d|\bpx-|\bpy-|\bpt-|\bpr-|\bpb-|\bpl-/.test(className);
  const paddingClass = hasCustomPadding ? "" : compact ? "p-3" : "p-4 md:p-5";

  return (
    <div
      aria-label={title}
      className={`research-demo-frame relative overflow-hidden rounded-[22px] border border-cyan/25 bg-[#020617] shadow-[0_0_42px_rgba(56,189,248,.18),inset_0_0_34px_rgba(14,165,233,.08)] ${paddingClass} ${className}`}
      style={{ minHeight: minHeight ?? (compact ? "150px" : "310px") }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(14,165,233,.24),rgba(30,58,138,.08)_55%,rgba(2,6,23,.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,.42)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.42)_1px,transparent_1px)] [background-size:52px_54px]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_0%,rgba(103,232,249,.10)_45%,transparent_58%)] research-demo-sweep" />
      <div className="pointer-events-none absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-cyan/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-transparent via-blue-400/35 to-transparent" />
      <div className="pointer-events-none absolute inset-px rounded-[21px] border border-white/5" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function ResearchDemoPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`demo-card rounded-xl border border-cyan/25 bg-slate-950/58 p-3 shadow-[inset_0_0_18px_rgba(14,165,233,.08)] ${className}`}>
      {children}
    </div>
  );
}

export function ResearchDemoNode({ children, className = "", tone = "cyan" }: DemoNodeProps) {
  const tones = {
    cyan: "border-cyan/45 bg-cyan/10 text-cyan shadow-[0_0_22px_rgba(34,211,238,.18)]",
    blue: "border-blue-300/45 bg-blue-500/10 text-blue-100 shadow-[0_0_22px_rgba(59,130,246,.16)]",
    amber: "border-amber-300/45 bg-amber-300/10 text-amber-100 shadow-[0_0_22px_rgba(251,191,36,.14)]",
    violet: "border-violet-300/45 bg-violet-400/10 text-violet-100 shadow-[0_0_22px_rgba(167,139,250,.16)]",
    emerald: "border-emerald-300/45 bg-emerald-400/10 text-emerald-100 shadow-[0_0_22px_rgba(52,211,153,.14)]",
    slate: "border-slate-500/55 bg-slate-900/62 text-slate-100"
  };

  return <div className={`demo-node rounded-xl border px-3 py-2 text-center text-sm font-semibold leading-5 ${tones[tone]} ${className}`}>{children}</div>;
}

export function ResearchDemoLabel({ children, className = "", tone = "cyan" }: DemoNodeProps) {
  const tones = {
    cyan: "border-cyan/35 bg-cyan/10 text-cyan",
    blue: "border-blue-300/35 bg-blue-500/10 text-blue-100",
    amber: "border-amber-300/35 bg-amber-300/10 text-amber-100",
    violet: "border-violet-300/35 bg-violet-400/10 text-violet-100",
    emerald: "border-emerald-300/35 bg-emerald-400/10 text-emerald-100",
    slate: "border-slate-600/70 bg-slate-950/65 text-slate-200"
  };

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

export function ResearchDemoSvgDefs() {
  return (
    <defs>
      <radialGradient id="figGlow" cx="50%" cy="48%" r="60%">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.24" />
        <stop offset="55%" stopColor="#1e3a8a" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
      </radialGradient>
      <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#67e8f9" />
        <stop offset="1" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="amberLine" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#fde68a" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
      <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#67e8f9" />
      </marker>
      <marker id="arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
      </marker>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function ResearchDemoSvgBackground() {
  return (
    <>
      <rect width="720" height="430" rx="22" fill="#020617" />
      <rect width="720" height="430" rx="22" fill="url(#figGlow)" />
      <g opacity="0.22" stroke="#38bdf8" strokeWidth="0.8">
        {Array.from({ length: 15 }).map((_, i) => (
          <path key={`v-${i}`} d={`M ${i * 52} 0 V 430`} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={`h-${i}`} d={`M 0 ${i * 54} H 720`} />
        ))}
      </g>
      <rect x="1" y="1" width="718" height="428" rx="21" fill="none" stroke="#38bdf8" strokeOpacity="0.24" />
    </>
  );
}
