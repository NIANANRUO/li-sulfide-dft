import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function HighEntropyLocalSitesFigure({ compact }: FigureProps) {
  const metals = [
    ["Fe", "#2563eb"], ["Co", "#7c3aed"], ["Ni", "#0891b2"], ["Mn", "#f59e0b"], ["Zn", "#22c55e"]
  ] as const;
  return (
    <FigureShell compact={compact} title="高熵局域位点">
      <g transform="translate(70 72)">
        {Array.from({ length: 35 }).map((_, i) => {
          const item = metals[(i * 3 + Math.floor(i / 5)) % metals.length];
          return <AtomBall key={i} x={54 + (i % 7) * 46} y={60 + Math.floor(i / 7) * 42} r={16} fill={item[1]} label={item[0]} />;
        })}
        <circle cx="192" cy="144" r="72" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 7" />
        <path d="M246 178 C312 205 338 222 386 246" stroke="#fbbf24" strokeWidth="3" fill="none" markerEnd="url(#arrowAmber)" />
      </g>
      <g transform="translate(470 80)">
        <rect width="160" height="120" rx="18" fill="rgba(15,23,42,.78)" stroke="#f59e0b" strokeOpacity=".54" />
        <text x="80" y="30" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="800">局域环境放大</text>
        <AtomBall x={80} y={72} r={22} fill="#7c3aed" label="Co" />
        <AtomBall x={42} y={72} r={16} fill="#2563eb" label="Fe" />
        <AtomBall x={118} y={72} r={16} fill="#22c55e" label="Zn" />
      </g>
      <g transform="translate(488 245)">
        <path d="M62 0 L116 34 L95 96 L29 96 L8 34 Z" fill="rgba(14,165,233,.1)" stroke="#38bdf8" />
        <path d="M62 16 L96 38 L84 76 L38 78 L25 38 Z" fill="rgba(245,158,11,.22)" stroke="#f59e0b" strokeWidth="3" />
        {["吸附", "导电", "极性", "活化", "稳定"].map((t, i) => {
          const p = [[62,-8],[124,35],[98,112],[23,112],[0,35]][i];
          return <text key={t} x={p[0]} y={p[1]} textAnchor="middle" fill="#cbd5e1" fontSize="12">{t}</text>;
        })}
      </g>
      {!compact && <Pill x={156} y={345} text="多元素邻域形成多条 LiPS 转化路径" />}
    </FigureShell>
  );
}

