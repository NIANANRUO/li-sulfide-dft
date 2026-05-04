import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function PBandCatalystFigure({ compact }: FigureProps) {
  const zones = ["吸附过弱", "适度吸附", "吸附过强"];
  return (
    <FigureShell compact={compact} title="p 轨道中心调控">
      <g transform="translate(88 112)">
        <AtomBall x={160} y={110} r={38} fill="#0f766e" label="Bi" />
        {[88, 232, 160, 160].map((x, i) => <AtomBall key={i} x={x} y={[110, 110, 38, 182][i]} r={14} fill="#facc15" label={i < 2 ? "S" : "Li"} labelColor="#111827" />)}
        <path d="M102 110 H126 M194 110 H218 M160 76 V54 M160 144 V166" stroke="#67e8f9" strokeWidth="3" strokeDasharray="7 7" />
        <path d="M250 90 C315 70 336 95 362 124" stroke="#fbbf24" strokeWidth="4" fill="none" markerEnd="url(#arrowAmber)" />
        <text x="279" y="70" fill="#fde68a" fontSize="16" fontWeight="800">LiPS 活化</text>
      </g>
      <g transform="translate(455 80)">
        <rect width="150" height="180" rx="16" fill="rgba(15,23,42,.78)" stroke="#38bdf8" strokeOpacity=".5" />
        <text x="75" y="30" textAnchor="middle" fill="#e0f2fe" fontSize="15" fontWeight="800">p-band center</text>
        <path d="M38 132 H122" stroke="#64748b" strokeWidth="2" />
        <path d="M38 80 H122" stroke="#67e8f9" strokeWidth="5" />
        <path d="M80 128 V86" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowAmber)" />
        <text x="126" y="84" fill="#a5f3fc" fontSize="13">p 态</text>
      </g>
      <g transform="translate(120 318)">
        {zones.map((zone, i) => (
          <g key={zone} transform={`translate(${i * 168} 0)`}>
            <rect width="132" height="44" rx="14" fill={i === 1 ? "rgba(245,158,11,.22)" : "rgba(14,165,233,.12)"} stroke={i === 1 ? "#f59e0b" : "#38bdf8"} />
            <text x="66" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="800">{zone}</text>
          </g>
        ))}
      </g>
      {!compact && <Pill x={304} y={268} text="主族空 p 轨道 / 孤对电子" />}
    </FigureShell>
  );
}

