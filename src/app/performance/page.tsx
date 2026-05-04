import { PerformanceCharts } from "@/components/Charts";
import { GlassCard, InfoList, PageShell, SectionTitle } from "@/components/UI";

export default function PerformancePage() {
  return (
    <PageShell>
      <SectionTitle title="电化学性能展示" subtitle="使用 mock data 展示循环、倍率、CV、EIS、GCD、Tafel、Li2S 沉积、对称电池和 GITT 等性能验证逻辑。" />
      <PerformanceCharts />
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">测试能证明什么</h2>
          <InfoList
            items={[
              "循环性能：评价电池长期稳定性和容量保持率。",
              "倍率性能：评价不同电流密度下的反应动力学。",
              "EIS：分析界面电荷转移阻抗和离子扩散行为。",
              "CV：分析氧化还原峰、电极极化和反应可逆性。",
              "Li2S 成核：验证催化剂对 Li2S 沉积过程的促进作用。"
            ]}
          />
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">待替换 mock 数据</h2>
          <InfoList
            items={[
              "Tafel 斜率：可加入 log(current)-overpotential mock 数据。",
              "对称电池 CV：可加入不同扫描速率下 LiPS 氧化还原峰。",
              "GITT：可加入准平衡电位和 Li+ 扩散系数趋势。",
              "所有图表数据集中在 performanceMockData.ts。"
            ]}
          />
        </GlassCard>
      </section>
    </PageShell>
  );
}
