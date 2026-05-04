import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function MxeneMetalFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="MXene 金属协同催化">
      <g transform="translate(92 118)">
        <path d="M38 130 L342 72 L510 138 L204 202 Z" fill="rgba(14,165,233,.2)" stroke="#67e8f9" strokeWidth="3" />
        <path d="M38 154 L204 226 L510 162" stroke="#2563eb" strokeWidth="3" opacity=".75" />
        {Array.from({ length: 18 }).map((_, i) => (
          <AtomBall key={i} x={92 + (i % 6) * 62} y={128 + Math.floor(i / 6) * 25 + (i % 2) * 9} r={10} fill={i % 3 ? "#38bdf8" : "#64748b"} />
        ))}
        {["-O", "-OH", "-F"].map((t, i) => <Pill key={t} x={96 + i * 110} y={38 + i * 4} text={t} fill="rgba(245,158,11,.14)" stroke="#f59e0b" />)}
        <AtomBall x={300} y={118} r={26} fill="#7c3aed" label="M" />
        <AtomBall x={376} y={66} r={18} fill="#facc15" label="LiPS" labelColor="#111827" />
        <path d="M90 224 H255" stroke="#67e8f9" strokeWidth="4" markerEnd="url(#arrowCyan)" strokeDasharray="9 7"><animate attributeName="stroke-dashoffset" values="0;-32" dur="1.7s" repeatCount="indefinite" /></path>
        <path d="M382 72 L322 106" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#arrowAmber)" />
        <path d="M300 118 C350 150 390 150 442 125" stroke="#a78bfa" strokeWidth="4" fill="none" markerEnd="url(#arrowCyan)" />
      </g>
      {!compact && (
        <>
          <Pill x={116} y={352} text="电子传输" />
          <Pill x={288} y={352} text="极性吸附" />
          <Pill x={456} y={352} text="催化转化" />
        </>
      )}
    </FigureShell>
  );
}

