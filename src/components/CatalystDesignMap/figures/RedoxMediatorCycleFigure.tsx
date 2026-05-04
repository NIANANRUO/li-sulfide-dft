import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function RedoxMediatorCycleFigure({ compact }: FigureProps) {
  return (
    <FigureShell compact={compact} title="红氧媒介体循环">
      <g transform="translate(92 88)">
        <rect x="0" y="70" width="160" height="190" rx="22" fill="rgba(245,158,11,.16)" stroke="#f59e0b" />
        <text x="80" y="104" textAnchor="middle" fill="#fde68a" fontSize="16" fontWeight="900">硫正极</text>
        <AtomBall x={80} y={166} r={28} fill="#2563eb" label="Cat" />
        <Pill x={24} y={214} text="固体催化" />
        <g transform="translate(264 20)">
          <path d="M122 34 C252 48 252 222 122 236 C-8 220 -8 50 122 34" fill="none" stroke="#67e8f9" strokeWidth="5" strokeDasharray="14 10" markerEnd="url(#arrowCyan)">
            <animate attributeName="stroke-dashoffset" values="0;-48" dur="2s" repeatCount="indefinite" />
          </path>
          {[0, 1, 2].map((i) => <AtomBall key={i} x={[86, 164, 118][i]} y={[64, 132, 212][i]} r={22} fill="#7c3aed" label="Medi" />)}
          <AtomBall x={122} y={132} r={24} fill="#facc15" label="LiPS" labelColor="#111827" />
          <text x="122" y="284" textAnchor="middle" fill="#dbeafe" fontSize="16" fontWeight="800">可移动电子 / 反应传递</text>
        </g>
        <path d="M160 166 H260" stroke="#fbbf24" strokeWidth="4" markerEnd="url(#arrowAmber)" />
      </g>
      {!compact && <Pill x={232} y={342} text="贫电解液下固体催化 + 可溶媒介体双通道" fill="rgba(124,58,237,.16)" stroke="#a78bfa" />}
    </FigureShell>
  );
}

