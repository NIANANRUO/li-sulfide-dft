import { AtomBall, FigureProps, FigureShell, Pill } from "./FigurePrimitives";

export function MultiCenterClusterFigure({ compact }: FigureProps) {
  const steps = ["S8", "Li2S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"];
  return (
    <FigureShell compact={compact} title="多中心协同催化路径">
      <g transform="translate(90 210)">
        <AtomBall x={130} y={40} r={27} fill="#2563eb" label="M1" />
        <AtomBall x={205} y={-28} r={27} fill="#7c3aed" label="M2" />
        <AtomBall x={285} y={40} r={27} fill="#0891b2" label="M3" />
        <path d="M130 40 L205 -28 L285 40 Z" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 8" />
        <text x="122" y="96" fill="#bfdbfe" fontSize="15" fontWeight="700">Li 端吸附</text>
        <text x="165" y="-72" fill="#e9d5ff" fontSize="15" fontWeight="700">S 端活化</text>
        <text x="270" y="96" fill="#a5f3fc" fontSize="15" fontWeight="700">Li2S 成核</text>
      </g>
      <g transform="translate(55 92)">
        {steps.map((step, i) => (
          <g key={step} transform={`translate(${i * 112} 0)`}>
            <circle cx="0" cy="0" r={compact ? 18 : 23} fill={i === steps.length - 1 ? "#fde68a" : "#facc15"} stroke="#fff7ed" strokeOpacity=".55" />
            <text x="0" y="5" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="900">{step}</text>
            {i < steps.length - 1 && <path d="M26 0 H88" stroke="#67e8f9" strokeWidth="3" markerEnd="url(#arrowCyan)" strokeDasharray="8 7"><animate attributeName="stroke-dashoffset" values="0;-30" dur="1.8s" repeatCount="indefinite" /></path>}
          </g>
        ))}
      </g>
      {!compact && (
        <>
          <Pill x={82} y={335} text="多电子 / 多步反应" />
          <Pill x={428} y={335} text="类酶式多位点路径" fill="rgba(124,58,237,.18)" stroke="#a78bfa" />
        </>
      )}
    </FigureShell>
  );
}

