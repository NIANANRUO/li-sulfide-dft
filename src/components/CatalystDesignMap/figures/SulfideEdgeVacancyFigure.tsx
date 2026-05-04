import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function SulfideEdgeVacancyFigure({ compact }: FigureProps) {
  const atoms = Array.from({ length: 24 }).map((_, i) => ({ x: 95 + (i % 8) * 42, y: 108 + Math.floor(i / 8) * 48, vacant: i === 11 }));
  return (
    <FigureShell compact={compact} title="硫化物边缘空位催化">
      <g transform="translate(60 64)">
        <path d="M48 55 L390 25 L444 205 L92 235 Z" fill="rgba(15,118,110,.22)" stroke="#22d3ee" strokeWidth="2" />
        {atoms.map((a, i) => a.vacant ? (
          <g key={i}>
            <circle cx={a.x} cy={a.y} r="16" fill="none" stroke="#fb7185" strokeWidth="3" strokeDasharray="6 4" />
            <text x={a.x} y={a.y + 5} textAnchor="middle" fill="#fecdd3" fontSize="12" fontWeight="800">空位</text>
          </g>
        ) : <AtomBall key={i} x={a.x} y={a.y} r={13} fill={i % 2 ? "#facc15" : "#38bdf8"} label={i % 2 ? "S" : "M"} labelColor={i % 2 ? "#111827" : "#082f49"} />)}
        <Pill x={124} y={248} text="基面位点" />
        <Pill x={372} y={88} text="边缘位点" fill="rgba(245,158,11,.18)" stroke="#f59e0b" />
        <AtomBall x={328} y={136} r={16} fill="#fde68a" label="LiPS" labelColor="#111827" />
      </g>
      <g transform="translate(545 95)">
        <rect width="112" height="210" rx="16" fill="rgba(15,23,42,.76)" stroke="#38bdf8" strokeOpacity=".5" />
        <text x="56" y="28" textAnchor="middle" fill="#e0f2fe" fontSize="14" fontWeight="800">活性差异</text>
        {["基面", "边缘", "空位"].map((label, i) => (
          <g key={label} transform={`translate(20 ${62 + i * 45})`}>
            <rect width={[38, 62, 76][i]} height="18" rx="9" fill={["#2563eb", "#22d3ee", "#f59e0b"][i]} />
            <text x="0" y="-7" fill="#cbd5e1" fontSize="12">{label}</text>
          </g>
        ))}
      </g>
    </FigureShell>
  );
}

