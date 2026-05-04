import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DFT 指导下的锂硫电池催化剂筛选与机理研究",
  description: "融合第一性原理计算、材料设计与电化学实验，展示锂硫电池催化剂筛选与机理研究流程。"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
