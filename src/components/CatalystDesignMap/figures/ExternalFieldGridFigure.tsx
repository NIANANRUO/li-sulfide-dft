import { AtomBall, FigureProps, FigureShell } from "./FigurePrimitives";

export function ExternalFieldGridFigure({ compact }: FigureProps) {
  const cells = [
    ["内建电场", "E", "#38bdf8"],
    ["外加磁场", "B", "#a78bfa"],
    ["压电极化场", "P", "#f59e0b"],
    ["光生载流子", "hν", "#22c55e"]
  ] as const;
  return (
    <FigureShell compact={compact} title="外场辅助催化四宫格">
      <g transform="translate(78 64)">
        {cells.map((cell, i) => {
          const x = (i % 2) * 284;
          const y = Math.floor(i / 2) * 154;
          return (
            <g key={cell[0]} transform={`translate(${x} ${y})`}>
              <rect width="246" height="126" rx="18" fill="rgba(15,23,42,.72)" stroke={cell[2]} strokeOpacity=".58" />
              <text x="24" y="30" fill="#f8fafc" fontSize="16" fontWeight="900">{cell[0]}</text>
              <text x="198" y="36" fill={cell[2]} fontSize="26" fontWeight="900">{cell[1]}</text>
              <AtomBall x={62} y={82} r={17} fill="#facc15" label="LiPS" labelColor="#111827" />
              <path d="M92 82 H178" stroke={cell[2]} strokeWidth="4" markerEnd={cell[2] === "#f59e0b" ? "url(#arrowAmber)" : "url(#arrowCyan)"} strokeDasharray="9 7">
                <animate attributeName="stroke-dashoffset" values="0;-32" dur="1.8s" repeatCount="indefinite" />
              </path>
              <text x="123" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="12">转化加速</text>
            </g>
          );
        })}
      </g>
      {!compact && <text x="360" y="390" textAnchor="middle" fill="#bfdbfe" fontSize="17" fontWeight="800">场方向调控扩散、吸附、电荷分离与 Li2S 分解</text>}
    </FigureShell>
  );
}

