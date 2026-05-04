import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function PassivationRegenerationFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="钝化再生与火山关系">
      <g transform="translate(62 82)">
        {["初始活性位点", "Li2S 覆盖钝化", "位点再生"].map((label, i) => (
          <g key={label} transform={`translate(${i * 150} 0)`}>
            <rect width="118" height="150" rx="18" fill="rgba(15,23,42,.72)" stroke="#38bdf8" strokeOpacity=".45" />
            <AtomBall x={59} y={78} r={22} fill={i === 1 ? "#64748b" : "#2563eb"} label="M" />
            {i === 1 && <AtomBall x={59} y={43} r={24} fill="#facc15" label="Li2S" labelColor="#111827" />}
            {i === 2 && <path d="M30 42 C68 10 96 36 80 72" stroke="#fbbf24" strokeWidth="3" fill="none" markerEnd="url(#arrowAmber)" />}
            <text x="59" y="128" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="800">{label}</text>
            {i < 2 && <path d="M125 76 H145" stroke="#67e8f9" strokeWidth="3" markerEnd="url(#arrowCyan)" />}
          </g>
        ))}
      </g>
      <g transform="translate(470 100)">
        <rect width="178" height="190" rx="18" fill="rgba(15,23,42,.76)" stroke="#f59e0b" strokeOpacity=".48" />
        <text x="89" y="28" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="800">火山关系</text>
        <path d="M34 150 C70 72 108 72 146 150" stroke="#fbbf24" strokeWidth="5" fill="none" />
        <path d="M30 154 H155 M34 154 V46" stroke="#94a3b8" strokeWidth="2" />
        <text x="30" y="176" fill="#cbd5e1" fontSize="12">弱</text>
        <text x="75" y="72" fill="#fde68a" fontSize="13">适度</text>
        <text x="135" y="176" fill="#cbd5e1" fontSize="12">强</text>
      </g>
      {!compact && <Pill x={180} y={310} text="避免 Li2S/Li2S2 长期覆盖失活" />}
    </FigureShell>
  );
}

