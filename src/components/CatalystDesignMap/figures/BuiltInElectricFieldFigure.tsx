import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function BuiltInElectricFieldFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="内建电场异质界面">
      <g transform="translate(70 105)">
        <path d="M30 35 H250 V235 H30 Z" fill="rgba(37,99,235,.34)" stroke="#60a5fa" strokeWidth="2" />
        <path d="M250 35 H470 V235 H250 Z" fill="rgba(124,58,237,.3)" stroke="#a78bfa" strokeWidth="2" />
        <text x="125" y="68" textAnchor="middle" fill="#dbeafe" fontSize="17" fontWeight="800">A 相</text>
        <text x="360" y="68" textAnchor="middle" fill="#e9d5ff" fontSize="17" fontWeight="800">B 相</text>
        <path d="M250 35 V235" stroke="#fbbf24" strokeWidth="4" strokeDasharray="10 7" />
        {Array.from({ length: 6 }).map((_, i) => (
          <text key={i} x={220} y={98 + i * 22} fill="#67e8f9" fontSize="15">δ+</text>
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <text key={i} x={268} y={98 + i * 22} fill="#fbbf24" fontSize="15">δ-</text>
        ))}
        <path d="M92 152 H230" stroke="#67e8f9" strokeWidth="4" markerEnd="url(#arrowCyan)" strokeDasharray="10 8">
          <animate attributeName="stroke-dashoffset" values="0;-36" dur="2s" repeatCount="indefinite" />
        </path>
        <AtomBall x={82} y={152} r={16} fill="#facc15" label="LiPS" labelColor="#111827" />
        <Pill x={162} y={112} text="内建电场" />
      </g>
      <g transform="translate(545 104)">
        <rect width="120" height="236" rx="16" fill="rgba(15,23,42,.76)" stroke="#38bdf8" strokeOpacity=".5" />
        <text x="60" y="30" textAnchor="middle" fill="#e0f2fe" fontSize="14" fontWeight="800">能带对齐</text>
        <path d="M22 160 C48 108 72 112 98 68" stroke="#60a5fa" strokeWidth="4" fill="none" />
        <path d="M22 198 C50 150 75 151 98 110" stroke="#a78bfa" strokeWidth="4" fill="none" />
        <path d="M18 136 H104" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 5" />
        <text x="76" y="130" fill="#fde68a" fontSize="12">EF</text>
      </g>
      {!compact && <Pill x={210} y={356} text="LiPS 向界面迁移富集" fill="rgba(245,158,11,.17)" stroke="#f59e0b" />}
    </FigureShell>
  );
}

