import type React from "react";
import { ResearchDemoSvgBackground, ResearchDemoSvgDefs } from "@/components/ResearchDemoFrame";

export type FigureProps = {
  compact?: boolean;
};

export function FigureShell({
  compact,
  children,
  title
}: FigureProps & {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <svg
      viewBox="0 0 720 430"
      role="img"
      aria-label={title}
      className={`h-full w-full ${compact ? "min-h-[150px]" : "min-h-[310px]"}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <ResearchDemoSvgDefs />
      <ResearchDemoSvgBackground />
      {children}
    </svg>
  );
}

export function AtomBall({ x, y, r, fill, label, labelColor = "#e0f2fe" }: { x: number; y: number; r: number; fill: string; label?: string; labelColor?: string }) {
  return (
    <g filter="url(#softGlow)">
      <circle cx={x} cy={y} r={r} fill={fill} stroke="#e0f2fe" strokeOpacity="0.55" strokeWidth="1.5" />
      {label && (
        <text x={x} y={y + 5} textAnchor="middle" fontSize={r > 18 ? 16 : 11} fontWeight="700" fill={labelColor}>
          {label}
        </text>
      )}
    </g>
  );
}

export function Pill({ x, y, text, fill = "rgba(14,165,233,.16)", stroke = "#38bdf8" }: { x: number; y: number; text: string; fill?: string; stroke?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={Math.max(58, text.length * 14)} height="28" rx="14" fill={fill} stroke={stroke} strokeOpacity="0.7" />
      <text x={x + Math.max(58, text.length * 14) / 2} y={y + 19} textAnchor="middle" fill="#dbeafe" fontSize="13" fontWeight="700">
        {text}
      </text>
    </g>
  );
}
