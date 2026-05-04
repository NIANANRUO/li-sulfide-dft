import { ReactionAnimation } from "@/components/Animations";
import { GlassCard, InfoList, PageShell, SectionTitle, Tag } from "@/components/UI";

const components = ["硫正极", "锂金属负极", "电解液", "隔膜", "导电骨架", "催化剂/宿主材料"];
const pathway = ["S8", "Li2S8", "Li2S6", "Li2S4", "Li2S2", "Li2S"];

export default function FundamentalsPage() {
  return (
    <PageShell>
      <SectionTitle
        title="锂硫电池基础"
        subtitle="理解硫正极多步转化反应、多硫化物中间体和锂硫电池高能量密度优势。"
      />
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">基本组成</h2>
          <InfoList items={components} />
          <p className="mt-5 text-sm leading-7 text-slate-400">
            硫正极提供高理论容量，导电骨架和催化剂负责电子传输、LiPS 捕获与转化；锂金属负极提供高比容量但也带来枝晶和副反应风险。
          </p>
        </GlassCard>
        <ReactionAnimation />
      </div>
      <section className="mt-8">
        <h2 className="mb-5 text-2xl font-semibold text-white">充放电反应路径</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pathway.map((item, index) => (
            <GlassCard key={item}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{item}</h3>
                <Tag>{index === 0 ? "初始硫" : index < 4 ? "可溶 LiPS" : "低阶固相"}</Tag>
              </div>
              <InfoList
                items={[
                  `所处阶段：${index === 0 ? "放电起点 / 充电终点" : index === 5 ? "放电终点" : "中间转化阶段"}`,
                  `溶解性：${index >= 1 && index <= 3 ? "较高，容易引发穿梭" : "较低，偏固相"}`,
                  `容量贡献：参与多电子转移，是容量释放和平台形成的重要部分。`,
                  `分析方式：Raman、XPS、UV-vis、吸附能、自由能和 NEB 可交叉验证。`
                ]}
              />
            </GlassCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
