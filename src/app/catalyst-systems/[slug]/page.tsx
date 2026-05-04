import { notFound } from "next/navigation";
import { CatalystAdsorptionAnimation } from "@/components/Animations";
import { EvidenceChain, GlassCard, InfoList, PageShell, SectionTitle, Tag } from "@/components/UI";
import { catalystSystems } from "@/data/catalystSystems";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalystSystems.map((item) => ({ slug: item.id }));
}

export default function CatalystDetailPage({ params }: { params: { slug: string } }) {
  const system = catalystSystems.find((item) => item.id === params.slug);
  if (!system) notFound();

  const isSingleAtom = system.id === "single-atom";
  const isDualAtom = system.id === "dual-atom";
  const isOxide = system.id === "metal-oxides";

  return (
    <PageShell>
      <SectionTitle title={system.name} subtitle={system.summary} />
      <div className="mb-6 flex flex-wrap gap-2">
        {system.activeSites.slice(0, 6).map((site) => (
          <Tag key={site}>{site}</Tag>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">核心科学问题</h2>
          <InfoList items={system.keyQuestions} />
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">结构特征与活性位点</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBlock title="结构特征" items={system.structureFeatures} />
            <InfoBlock title="活性位点" items={system.activeSites} />
          </div>
        </GlassCard>
      </div>

      <section className="mt-8">
        <h2 className="mb-5 text-2xl font-semibold text-white">实验表征证据链动画</h2>
        <EvidenceChain items={system.evidenceChain} />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">推荐表征方法</h2>
          <InfoList items={system.characterizationMethods} />
          <div className="mt-5 rounded-lg border border-slate-700/70 bg-slate-950/40 p-4">
            <p className="text-sm leading-7 text-slate-300">
              每种方法都应回答三个问题：它能证明什么、不能证明什么、如何与其它证据互补。单一表征通常不足以直接得出机制结论。
            </p>
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">DFT 建模建议</h2>
          <InfoList items={system.dftModels} />
          <h3 className="mb-3 mt-5 text-sm font-semibold text-cyan">LiPS 吸附方式</h3>
          <InfoList items={system.adsorptionModes} />
        </GlassCard>
      </section>

      <section className="mt-8">
        <CatalystAdsorptionAnimation />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">优势</h2>
          <InfoList items={system.advantages} />
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">局限</h2>
          <InfoList items={system.limitations} />
        </GlassCard>
      </section>

      {(isSingleAtom || isDualAtom || isOxide) && (
        <section className="mt-8">
          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold text-white">页面重点提示</h2>
            {isSingleAtom && (
              <InfoList
                items={[
                  "单原子催化剂的核心是证明金属原子以孤立单原子形式存在，并确认局域配位环境、电子结构和催化作用。",
                  "XRD 无颗粒峰只是辅助证据，必须结合 AC-HAADF-STEM、XANES、EXAFS、WT-EXAFS 和 XPS。",
                  "DFT 模型可从 M-N4/C、M-N3/C、M-N2/C、M-S4/C 和空位碳锚定模型开始比较。"
                ]}
              />
            )}
            {isDualAtom && (
              <InfoList
                items={[
                  "双原子催化剂应比较 LiPS 只吸附在 M1、只吸附在 M2、桥连 M1-M2、S 端靠近金属以及 Li 端靠近 N/O/S 位点。",
                  "EXAFS 拟合和 WT-EXAFS 是判断 M1-M2 配位与轻元素配位的重要证据。",
                  "DFT 需要比较同核和异核双原子位点，避免只展示最优构型。"
                ]}
              />
            )}
            {isOxide && (
              <InfoList
                items={[
                  "氧空位证据链建议由 XPS O 1s 缺陷氧峰、EPR 信号、Raman 峰位或峰宽变化和 DFT 吸附能增强共同支撑。",
                  "TiO2、MnO2、Co3O4、Fe2O3 等体系通常需要关注 DFT+U、自旋极化、表面弛豫和氧空位模型。",
                  "氧化物导电性短板应通过电导率、EIS 或复合导电骨架进行说明。"
                ]}
              />
            )}
          </GlassCard>
        </section>
      )}
    </PageShell>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-cyan">{title}</h3>
      <InfoList items={items} />
    </div>
  );
}
