import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function BridgeDualAtomFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="异核双原子桥联吸附">
      <g stroke="#38bdf8" strokeOpacity="0.34" strokeWidth="2">
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M ${80 + i * 45} 238 l25 -42 h50 l25 42 l-25 42 h-50 z`} fill="rgba(15,23,42,.5)" />
        ))}
      </g>
      <AtomBall x={250} y={218} r={28} fill="#2563eb" label="M1" />
      <AtomBall x={350} y={218} r={28} fill="#7c3aed" label="M2" />
      {[205, 297, 397].map((x) => <AtomBall key={x} x={x} y={270} r={12} fill="#22d3ee" label="N" />)}
      <path d="M250 218 C285 168 318 168 350 218" stroke="url(#amberLine)" strokeWidth="4" fill="none" strokeDasharray="10 8" markerEnd="url(#arrowAmber)">
        <animate attributeName="stroke-dashoffset" values="0;-36" dur="2.1s" repeatCount="indefinite" />
      </path>
      {[280, 305, 330].map((x, i) => <AtomBall key={x} x={x} y={158 - i * 5} r={16} fill="#facc15" label={i === 1 ? "S" : ""} labelColor="#111827" />)}
      <AtomBall x={262} y={129} r={11} fill="#a7f3d0" label="Li" labelColor="#052e16" />
      <AtomBall x={348} y={129} r={11} fill="#a7f3d0" label="Li" labelColor="#052e16" />
      <path d="M370 176 C420 148 447 165 465 198" stroke="#67e8f9" strokeWidth="3" fill="none" markerEnd="url(#arrowCyan)" />
      <text x="410" y="145" fill="#bfdbfe" fontSize="16" fontWeight="700">S–S 活化</text>
      <g transform="translate(485 110)">
        <rect width="160" height="190" rx="18" fill="rgba(15,23,42,.78)" stroke="#38bdf8" strokeOpacity=".48" />
        <text x="80" y="32" textAnchor="middle" fill="#e0f2fe" fontSize="15" fontWeight="800">NEB 能垒对比</text>
        <path d="M24 145 C55 45 90 45 130 84" stroke="#fb7185" strokeWidth="5" fill="none" />
        <path d="M24 145 C56 92 93 92 132 124" stroke="#22d3ee" strokeWidth="5" fill="none" />
        <text x="38" y="55" fill="#fecdd3" fontSize="13">单原子</text>
        <text x="84" y="126" fill="#a5f3fc" fontSize="13">双原子</text>
      </g>
      {!compact && (
        <>
          <Pill x={92} y={92} text="N 掺杂碳载体" />
          <Pill x={226} y={310} text="桥联 LiPS" fill="rgba(245,158,11,.18)" stroke="#f59e0b" />
        </>
      )}
    </FigureShell>
  );
}

