import { FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function MLDescriptorFlowFigure({ compact }: FigureProps) {
  const nodes = ["候选材料库", "DFT 计算", "描述符提取", "机器学习模型", "优选催化剂", "实验验证"];
  return (
    <FigureShell compact={compact} title="描述符机器学习筛选流程">
      <g transform="translate(56 88)">
        {nodes.map((node, i) => (
          <g key={node} transform={`translate(${(i % 3) * 205} ${Math.floor(i / 3) * 138})`}>
            <rect width="158" height="76" rx="18" fill={i === 4 ? "rgba(245,158,11,.2)" : "rgba(14,165,233,.14)"} stroke={i === 4 ? "#f59e0b" : "#38bdf8"} />
            <text x="79" y="45" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="900">{node}</text>
            {i < nodes.length - 1 && i !== 2 && <path d="M164 38 H196" stroke="#67e8f9" strokeWidth="3" markerEnd="url(#arrowCyan)" />}
            {i === 2 && <path d="M79 82 V128 H-252 V116" stroke="#67e8f9" strokeWidth="3" fill="none" markerEnd="url(#arrowCyan)" />}
          </g>
        ))}
      </g>
      <g transform="translate(468 250)">
        <rect width="160" height="104" rx="16" fill="rgba(15,23,42,.76)" stroke="#a78bfa" strokeOpacity=".55" />
        <text x="80" y="24" textAnchor="middle" fill="#e9d5ff" fontSize="13" fontWeight="800">描述符-性能相关</text>
        {[22, 44, 58, 86, 102, 128].map((x, i) => (
          <circle key={x} cx={x} cy={78 - i * 8 + (i % 2) * 10} r="5" fill={i > 3 ? "#f59e0b" : "#38bdf8"} />
        ))}
        <path d="M20 84 C54 72 92 52 132 28" stroke="#fbbf24" strokeWidth="3" fill="none" />
      </g>
      {!compact && (
        <>
          <Pill x={72} y={350} text="Eads / Bader / ICOHP / d-band / p-band" />
          <Pill x={438} y={80} text="计算-实验闭环" fill="rgba(245,158,11,.16)" stroke="#f59e0b" />
        </>
      )}
    </FigureShell>
  );
}

