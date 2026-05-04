# DFT 指导下的锂硫电池催化剂筛选与机制研究

这是一个中文版锂硫电池科研知识平台，面向科研交流、研究生展示和方法学习。项目采用“大屏式 dashboard”结构：左侧一级导航、中间主内容区、顶部二级标签、面板内局部滚动。项目使用 Next.js、React、TypeScript、Tailwind CSS、Framer Motion 和 Recharts，当前所有科研与图表数据均为 mock data。

## 运行项目

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:3000`。

## 主要界面

- `/` 大屏总控台

当前推荐使用 `/` 作为主入口。旧路由仍保留用于兼容，但核心交互已经集中到 dashboard 内部模块。

## 兼容路由

- `/fundamentals` 锂硫电池基础
- `/challenges` 关键科学问题
- `/catalyst-systems` 催化剂体系库
- `/catalyst-systems/single-atom` 单原子催化剂
- `/catalyst-systems/dual-atom` 双原子催化剂
- `/catalyst-systems/heterostructure` 异质结催化剂
- `/catalyst-systems/metal-oxides` 金属氧化物催化剂
- `/catalyst-systems/metal-sulfides` 金属硫化物催化剂
- `/catalyst-systems/metal-nitrides` 金属氮化物催化剂
- `/catalyst-systems/mxenes` MXene 催化剂
- `/catalyst-systems/defect-carbon` 缺陷碳与杂原子掺杂碳
- `/experiments` 实验合成与表征方法库
- `/dft-screening` 第一性原理计算与 VASP 方法库
- `/performance` 电化学性能展示
- `/research-projects` 研究项目
- `/literature` 文献地图与研究进展
- `/about` 关于我

## 替换 mock 数据

核心内容集中在 `src/data`：

- `dashboardModules.ts`：dashboard 一级模块、二级标签和研究主线
- `fundamentalsData.ts`：锂硫基础模块的组成、理论优势、反应机理、多硫化物、穿梭动画和后续研究逻辑
- `catalystSystems.ts`：催化剂体系、详情页内容、证据链、DFT 模型建议
- `characterizationMethods.ts`：表征方法库
- `dftTasks.ts`：按计算任务组织的模型建议、输出文件、后处理和结果分析
- `dftWorkflows.ts`：DFT 工作流、结果分析表和模型构建建议
- `vaspTemplates.ts`：INCAR、KPOINTS 和后处理模板
- `performanceMockData.ts`：Recharts 图表数据
- `glossary.ts`：术语解释和 Tooltip 数据
- `experimentDftMap.ts`：实验表征结果与 DFT 分析结果之间的对应关系
- `literatureMockData.ts`：文献时间线和推荐阅读
- `researchProjects.ts`：研究项目模板

替换真实数据时，优先修改这些文件；页面和组件会自动读取更新。

## 扩展新的催化剂体系

1. 在 `src/data/catalystSystems.ts` 中新增一个对象。
2. 设置唯一 `id`，例如 `metal-phosphides`。
3. 设置 `route` 为 `/catalyst-systems/metal-phosphides`。
4. 补全 `keyQuestions`、`characterizationMethods`、`dftModels`、`evidenceChain` 等字段。
5. 动态详情页会自动生成对应路由。

## 扩展新的表征方法

1. 在 `src/data/characterizationMethods.ts` 中新增方法对象。
2. 填写方法原理、能证明什么、适用体系、图谱解读、常见误区和 DFT 对应关系。
3. 如需新增分类，把分类加入 `methodCategories`。

## 设计原则

- 所有主要文字使用中文，专业缩写保留英文。
- VASP 参数只作为展示模板，真实计算需做体系依赖的收敛测试。
- 表征部分强调证据链，避免单一表征直接下机制结论。
- DFT 部分强调模型构建、参数设置、后处理、结果解释和实验对应。
