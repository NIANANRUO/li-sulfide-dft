"use client";

import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Tag } from "@/components/UI";
import { commandCategories, externalResources, learningPath, vaspLearningSections, type CommandItem, type VaspLearningSectionId } from "@/data/vaspLearningData";
import { vaspKnowledgeModules, type VaspKnowledgeModule, type VaspKnowledgeResource, type VaspKnowledgeTopic } from "@/data/vaspKnowledgeData";
import { vaspDiagramMap, type VaspDiagramId } from "./diagrams/VaspDiagrams";

const studioStats = [
  { label: "学习模块", value: vaspKnowledgeModules.length.toString() },
  { label: "专题单元", value: vaspKnowledgeModules.reduce((sum, item) => sum + item.children.length, 0).toString() },
  { label: "命令速查", value: commandCategories.reduce((sum, item) => sum + item.items.length, 0).toString() },
  { label: "精选资源", value: externalResources.length.toString() }
];

const quickStages = ["Linux 入门", "输入文件", "计算任务", "结果提取", "后处理", "论文作图"];

export function VaspLearningStudio() {
  const [activeModuleId, setActiveModuleId] = useState<VaspLearningSectionId | "overview">("overview");
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const activeModule = vaspKnowledgeModules.find((item) => item.id === activeModuleId);
  const activeTopic = activeModule && activeTopicId ? activeModule.children.find((item) => item.id === activeTopicId) : null;

  function openModule(id: string) {
    setActiveModuleId(id as VaspLearningSectionId);
    setActiveTopicId(null);
  }

  function backHome() {
    setActiveModuleId("overview");
    setActiveTopicId(null);
  }

  return (
    <div className="space-y-4">
      <StudioHero compact={activeModuleId !== "overview"} onHome={backHome} />
      {activeModuleId === "overview" ? (
        <OverviewDashboard onSelect={openModule} />
      ) : activeTopic ? (
        <TopicDetail topic={activeTopic} onBack={() => setActiveTopicId(null)} />
      ) : (
        <ModuleDashboard module={activeModule} query={query} setQuery={setQuery} onBack={backHome} onSelectTopic={setActiveTopicId} />
      )}
    </div>
  );
}

function StudioHero({ compact, onHome }: { compact: boolean; onHome: () => void }) {
  return (
    <section className="overflow-hidden rounded-xl border border-cyan/20 bg-[#041124]/90 shadow-[0_0_34px_rgba(56,189,248,.12)]">
      <div className="grid gap-4 bg-[radial-gradient(circle_at_14%_0%,rgba(56,189,248,.20),transparent_22rem),radial-gradient(circle_at_86%_18%,rgba(99,102,241,.18),transparent_24rem),linear-gradient(135deg,rgba(3,10,26,.98),rgba(8,22,45,.92))] p-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-cyan">
              <Sparkles size={15} />
              VASP Learning Hub
            </div>
            <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold text-blue-100">DFT / Li-S / Post-processing</span>
            {compact && (
              <button onClick={onHome} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2 text-xs font-bold text-cyan transition hover:border-cyan hover:bg-cyan/15">
                <ArrowLeft size={15} />
                返回总览
              </button>
            )}
          </div>
          <h1 className="text-3xl font-black tracking-wide text-white md:text-4xl">VASP 学习专题</h1>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-300 md:text-base">
            从 VASP 入门、输入文件、常见计算任务，到 OUTCAR 数据提取、Bader 电荷、DOS/PDOS、NEB 能垒和锂硫电池催化剂后处理，整理成一套可检索、可复用的学习工作台。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {studioStats.map((item) => (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewDashboard({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="space-y-4">
        <PanelTitle title="学习模块入口" desc="按真实 VASP 学习路径重新组织入口，先建立工作流，再进入专题和命令。" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {vaspKnowledgeModules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} onClick={() => onSelect(module.id)} />
          ))}
        </div>
      </section>
      <aside className="space-y-4">
        <section className="rounded-xl border border-[#24517b] bg-[#06152b]/86 p-4">
          <PanelTitle title="建议学习顺序" desc="先会操作，再理解参数，最后进入机制解释。" compact />
          <div className="mt-4 space-y-2">
            {quickStages.map((stage, index) => (
              <div key={stage} className="flex items-center gap-3 rounded-lg border border-cyan/15 bg-cyan/[0.05] p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/35 text-xs font-black text-cyan">{index + 1}</span>
                <span className="text-sm font-bold text-slate-100">{stage}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-[#24517b] bg-[#06152b]/86 p-4">
          <PanelTitle title="官方与中文资源" desc="优先查官方定义，再用中文资源补足操作细节。" compact />
          <div className="mt-4 grid gap-2">
            {externalResources.slice(0, 4).map((resource) => (
              <ResourceLink key={resource.url} resource={resource} />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function ModuleDashboard({
  module,
  query,
  setQuery,
  onBack,
  onSelectTopic
}: {
  module?: VaspKnowledgeModule;
  query: string;
  setQuery: (value: string) => void;
  onBack: () => void;
  onSelectTopic: (id: string) => void;
}) {
  const topics = useMemo(() => {
    if (!module) return [];
    const q = query.trim().toLowerCase();
    if (!q) return module.children;
    return module.children.filter((topic) => [topic.title, topic.description, topic.category, topic.level, ...topic.tags].join(" ").toLowerCase().includes(q));
  }, [module, query]);

  if (!module) return null;

  return (
    <section className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-[#24517b] bg-[#06152b]/88 p-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan hover:text-white">
            <ArrowLeft size={15} />
            返回模块总览
          </button>
          <h2 className="text-2xl font-black text-white">{module.title}</h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">{module.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {module.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <label className="flex h-12 items-center gap-2 self-end rounded-lg border border-cyan/25 bg-slate-950/60 px-3 text-sm text-slate-300">
          <Search size={17} className="text-cyan" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索专题、标签或任务..." className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
        </label>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} onClick={() => onSelectTopic(topic.id)} />
        ))}
      </div>
      {module.id === "command-library" && <CommandLibraryPreview />}
      {topics.length === 0 && <div className="rounded-xl border border-dashed border-cyan/30 bg-cyan/5 p-8 text-center text-sm text-slate-300">没有找到匹配专题，请换一个关键词。</div>}
    </section>
  );
}

function ModuleCard({ module, index, onClick }: { module: VaspKnowledgeModule; index: number; onClick: () => void }) {
  const Icon = vaspLearningSections.find((item) => item.id === module.id)?.icon ?? Sparkles;
  return (
    <button onClick={onClick} className="group flex min-h-[210px] flex-col justify-between rounded-xl border border-[#24517b] bg-[#06152b]/84 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan/70 hover:bg-[#0b2140]/90 hover:shadow-[0_0_28px_rgba(56,189,248,.20)]">
      <span>
        <span className="mb-4 flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
            <Icon size={21} />
          </span>
          <span className="font-mono text-xs font-bold text-slate-500">{String(index + 1).padStart(2, "0")}</span>
        </span>
        <span className="block text-lg font-black text-white">{module.title}</span>
        <span className="mt-2 block overflow-hidden text-sm leading-6 text-slate-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{module.description}</span>
      </span>
      <span className="mt-4 flex items-center gap-2">
        <span className="rounded border border-blue-300/20 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-100">{module.children.length} 个专题</span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-cyan">
          进入
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

function TopicCard({ topic, index, onClick }: { topic: VaspKnowledgeTopic; index: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-[#24517b] bg-[#06152b]/82 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan/70 hover:bg-[#0b2140]/90">
      <span>
        <span className="mb-3 flex items-center justify-between">
          <span className="rounded border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">{topic.level}</span>
          <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
        </span>
        <span className="block text-lg font-black text-white">{topic.title}</span>
        <span className="mt-2 block overflow-hidden text-sm leading-6 text-slate-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{topic.description}</span>
      </span>
      <span className="mt-4 flex flex-wrap items-center gap-2">
        {topic.tags.slice(0, 2).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-cyan">
          详情
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

function TopicDetail({ topic, onBack }: { topic: VaspKnowledgeTopic; onBack: () => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-cyan/20 bg-[#041124]/90 shadow-[0_0_34px_rgba(56,189,248,.10)]">
      <header className="border-b border-cyan/15 bg-[linear-gradient(135deg,rgba(8,24,48,.94),rgba(13,18,42,.90))] p-4">
        <button onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan hover:text-white">
          <ArrowLeft size={15} />
          返回专题列表
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">{topic.category}</span>
          <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-100">{topic.level}</span>
        </div>
        <h3 className="mt-3 text-2xl font-black text-white">{topic.title}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">{topic.description}</p>
      </header>
      {topic.diagram && (
        <div className="p-4 pb-0">
          <VaspTopicDiagram diagram={topic.diagram} />
        </div>
      )}
      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          <DetailList title="学习目标" items={topic.learningGoals} />
          <DetailList title="核心知识点" items={topic.concepts} />
          <DetailList title="适用场景" items={topic.whenToUse} />
          <DetailList title="操作步骤" items={topic.workflow} ordered />
          {topic.sections?.map((section) => <DetailList key={section.title} title={section.title} items={section.items} />)}
        </div>
        <aside className="space-y-4">
          <DetailList title="注意事项" items={topic.cautions} />
          {topic.tools && topic.tools.length > 0 && <DetailList title="相关工具" items={topic.tools} />}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && <DetailList title="相关专题" items={topic.relatedTopics} />}
          {topic.resources && topic.resources.length > 0 && <ResourceGrid resources={topic.resources} />}
        </aside>
      </div>
      {topic.commands && topic.commands.length > 0 && (
        <div className="border-t border-cyan/15 p-4">
          <PanelTitle title="常用命令" desc="命令块保留复制能力，适合直接整理到个人脚本库。" compact />
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            {topic.commands.map((command) => (
              <CommandCard key={command.id} item={command} category={command.category} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function VaspTopicDiagram({ diagram }: { diagram: VaspDiagramId }) {
  const Diagram = vaspDiagramMap[diagram];
  if (!Diagram) return null;
  return <Diagram />;
}

function CommandLibraryPreview() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = commandCategories.flatMap((category) => category.items.map((item) => ({ ...item, category: category.title })));
    if (!q) return all;
    return all.filter((item) => [item.title, item.file, item.command, item.desc, item.category, ...item.keywords].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="rounded-xl border border-[#24517b] bg-[#06152b]/86 p-4">
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
        <PanelTitle title="结果提取命令库" desc="把 OUTCAR、OSZICAR、DOSCAR、ACF.dat 等输出文件中的关键结果整理成可复制命令。" compact />
        <label className="flex h-12 items-center gap-2 rounded-lg border border-cyan/25 bg-slate-950/60 px-3 text-sm text-slate-300">
          <Search size={17} className="text-cyan" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 TOTEN、Bader、NEB..." className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
        </label>
      </div>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        {items.map((item) => (
          <CommandCard key={`${item.category}-${item.title}`} item={item} category={item.category} />
        ))}
      </div>
    </section>
  );
}

function CommandCard({ item, category }: { item: CommandItem; category: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(item.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <article className="overflow-hidden rounded-xl border border-[#24517b] bg-[#06152b]/84">
      <div className="border-b border-slate-700/60 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Tag>{category}</Tag>
          <span className="rounded border border-blue-300/20 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-100">{item.file}</span>
        </div>
        <h4 className="text-lg font-black text-white">{item.title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</p>
        {item.note && <p className="mt-2 rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-100">{item.note}</p>}
      </div>
      <div className="bg-slate-950/72">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">bash / awk / python</span>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-white/[0.03] px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan/60 hover:text-cyan">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        <pre className="max-h-72 overflow-auto p-4 text-xs leading-6 text-blue-100 dft-scrollbar">
          <code>{item.command}</code>
        </pre>
      </div>
    </article>
  );
}

function DetailList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <section className="rounded-xl border border-[#24517b] bg-[#06152b]/72 p-4">
      <h4 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-cyan">{title}</h4>
      <ListTag className={`${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5 text-sm leading-6 text-slate-300`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </section>
  );
}

function ResourceGrid({ resources }: { resources: VaspKnowledgeResource[] }) {
  return (
    <section className="rounded-xl border border-[#24517b] bg-[#06152b]/72 p-4">
      <h4 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-cyan">外部资源</h4>
      <div className="grid gap-2">
        {resources.map((resource) => (
          <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-700/70 bg-slate-950/45 p-3 transition hover:border-cyan/60 hover:text-cyan">
            <span className="flex items-center justify-between gap-2">
              <span className="font-bold text-white">{resource.title}</span>
              <ExternalLink size={15} />
            </span>
            <span className="mt-2 block text-xs leading-5 text-slate-400">{resource.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ResourceLink({ resource }: { resource: (typeof externalResources)[number] }) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group rounded-lg border border-slate-700/70 bg-slate-950/45 p-3 transition hover:border-cyan/60">
      <span className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-white">{resource.title}</span>
        <ExternalLink size={15} className="text-cyan" />
      </span>
      <span className="mt-2 block text-xs leading-5 text-slate-400">{resource.desc}</span>
    </a>
  );
}

function PanelTitle({ title, desc, compact = false }: { title: string; desc?: string; compact?: boolean }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan">VASP Studio</p>
      <h2 className={`${compact ? "mt-1 text-lg" : "mt-2 text-2xl"} font-black text-white`}>{title}</h2>
      {desc && <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>}
    </div>
  );
}
