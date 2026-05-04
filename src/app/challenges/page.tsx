import { ShuttleEffectAnimation } from "@/components/Animations";
import { GlassCard, PageShell, SectionTitle } from "@/components/UI";

const challenges = [
  ["多硫化物穿梭效应", "放电过程中生成的长链多硫化物容易溶解于电解液，并在正负极之间迁移，导致活性物质损失、库伦效率下降和锂负极副反应加剧。"],
  ["氧化还原动力学缓慢", "硫正极反应涉及多步固-液-固转化过程，Li2S 的成核、沉积和分解过程动力学缓慢，容易导致极化增大和容量衰减。"],
  ["体积膨胀", "硫转化为 Li2S 时会发生明显体积变化，可能破坏正极结构、削弱导电网络并降低循环稳定性。"],
  ["锂负极不稳定", "锂金属负极容易形成枝晶，并与多硫化物和电解液发生副反应，导致安全隐患和循环寿命下降。"]
];

export default function ChallengesPage() {
  return (
    <PageShell>
      <SectionTitle title="锂硫电池关键科学问题" subtitle="从穿梭、动力学、体积效应和锂负极稳定性理解催化剂设计的必要性。" />
      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map(([title, desc]) => (
          <GlassCard key={title}>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="mt-8">
        <ShuttleEffectAnimation />
      </div>
    </PageShell>
  );
}
