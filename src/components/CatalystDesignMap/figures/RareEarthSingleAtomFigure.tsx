import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function RareEarthSingleAtomFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="稀土单原子 4f 5d 调控">
      <g transform="translate(120 118)">
        <AtomBall x={160} y={110} r={34} fill="#7c3aed" label="Ce" />
        {[160, 160, 86, 234].map((x, i) => {
          const y = [28, 192, 110, 110][i];
          return <AtomBall key={i} x={x} y={y} r={18} fill="#22d3ee" label="N" />;
        })}
        <path d="M160 76 V46 M160 144 V174 M126 110 H104 M194 110 H216" stroke="#67e8f9" strokeWidth="3" />
        <path d="M70 50 C44 120 50 168 104 192" stroke="#fbbf24" strokeWidth="3" fill="none" markerEnd="url(#arrowAmber)" />
        <path d="M250 50 C302 114 292 170 226 196" stroke="#67e8f9" strokeWidth="3" fill="none" markerEnd="url(#arrowCyan)" />
        <text x="36" y="42" fill="#fde68a" fontSize="15" fontWeight="800">SRR</text>
        <text x="270" y="42" fill="#a5f3fc" fontSize="15" fontWeight="800">SER</text>
      </g>
      <g transform="translate(465 82)">
        <rect width="150" height="238" rx="18" fill="rgba(15,23,42,.76)" stroke="#a78bfa" strokeOpacity=".58" />
        <text x="75" y="30" textAnchor="middle" fill="#e9d5ff" fontSize="15" fontWeight="800">稀土能级</text>
        <path d="M35 168 H118" stroke="#fbbf24" strokeWidth="4" />
        <path d="M35 104 H118" stroke="#67e8f9" strokeWidth="4" />
        <text x="124" y="172" fill="#fde68a" fontSize="14">4f</text>
        <text x="124" y="108" fill="#a5f3fc" fontSize="14">5d</text>
        <path d="M76 154 V118" stroke="#f8fafc" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />
        <text x="75" y="215" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="800">Ce3+ ↔ Ce4+</text>
      </g>
      {!compact && <Pill x={236} y={330} text="可变价态调控双向硫转化" fill="rgba(245,158,11,.16)" stroke="#f59e0b" />}
    </FigureShell>
  );
}

