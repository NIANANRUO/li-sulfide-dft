import { CatalystLibrary } from "@/components/CatalystLibrary";
import { PageShell, SectionTitle } from "@/components/UI";

export default function CatalystSystemsPage() {
  return (
    <PageShell>
      <SectionTitle
        title="锂硫电池催化剂体系库"
        subtitle="从结构特征、活性位点、实验表征和 DFT 建模角度系统比较不同催化剂体系。"
      />
      <CatalystLibrary />
    </PageShell>
  );
}
