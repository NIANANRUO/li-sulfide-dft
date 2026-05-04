"use client";

import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Tag } from "@/components/UI";
import {
  calculationTasks,
  commandCategories,
  externalResources,
  inputFileCards,
  learningPath,
  liSProcessingCards,
  postProcessingCards,
  toolResources,
  troubleshootingCards,
  vaspLearningSections,
  type CommandItem,
  type ExternalResource,
  type TopicCard,
  type VaspLearningSectionId
} from "@/data/vaspLearningData";
import { vaspKnowledgeModules, type LinuxCommandDoc, type LinuxCommandGroup, type VaspKnowledgeModule, type VaspKnowledgeResource, type VaspKnowledgeTopic } from "@/data/vaspKnowledgeData";
import { vaspDiagramMap, type VaspDiagramId } from "./diagrams/VaspDiagrams";

const resourceSections: VaspLearningSectionId[] = ["official-resources", "chinese-resources", "tools"];
const overviewStats = [
  { label: "学习模块", value: vaspKnowledgeModules.length.toString() },
  { label: "专题单元", value: vaspKnowledgeModules.reduce((sum, item) => sum + item.children.length, 0).toString() },
  { label: "命令速查", value: commandCategories.reduce((sum, item) => sum + item.items.length, 0).toString() },
  { label: "外部资源", value: externalResources.length.toString() }
];

const overviewMilestones = [
  "Linux 与服务器操作",
  "四大输入文件",
  "结构优化与静态计算",
  "DOS / Bader / NEB",
  "Li-S 催化后处理",
  "论文数据整理"
];

export function VaspLearningWorkspace() {
  const [activeSection, setActiveSection] = useState<VaspLearningSectionId | "overview">("overview");
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const section = vaspKnowledgeModules.find((item) => item.id === activeSection);

  function selectSection(id: string) {
    setActiveSection(id as VaspLearningSectionId);
    setActiveTopicId(null);
  }

  return (
    <div className="space-y-5">
      <Hero onHome={() => setActiveSection("overview")} compact={activeSection !== "overview"} />
      {activeSection === "overview" ? (
        <Overview onSelect={selectSection} />
      ) : (
        <SectionView
          section={section}
          activeTopicId={activeTopicId}
          onSelectTopic={setActiveTopicId}
          onTopicBack={() => setActiveTopicId(null)}
          onBack={() => {
            setActiveSection("overview");
            setActiveTopicId(null);
          }}
        />
      )}
    </div>
  );
}

function Hero({ compact, onHome }: { compact: boolean; onHome: () => void }) {
  return (
    <section className="overflow-hidden rounded-xl border border-cyan/25 bg-[#041124]/82 shadow-[0_0_30px_rgba(56,189,248,.10)]">
      <div className="bg-[radial-gradient(circle_at_12%_0%,rgba(56,189,248,.18),transparent_20rem),radial-gradient(circle_at_88%_24%,rgba(124,58,237,.18),transparent_24rem),linear-gradient(135deg,rgba(3,10,26,.96),rgba(10,18,44,.88))] p-3 md:p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan">
            <Sparkles size={16} />
            VASP Learning Hub
          </div>
          {compact && (
            <button onClick={onHome} className="inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2 text-xs font-bold text-cyan transition hover:border-cyan hover:bg-cyan/15">
              <ArrowLeft size={15} />
              返回总览
            </button>
          )}
        </div>
        <h1 className="text-2xl font-black tracking-wide text-white md:text-3xl">VASP 学习专题</h1>
        <p className="mt-2 max-w-6xl text-sm leading-6 text-slate-300">
          从 VASP 入门、输入文件、常见计算任务到 OUTCAR 数据提取、Bader 电荷、DOS/PDOS、NEB 能垒和锂硫电池催化剂后处理的一站式学习导航。
        </p>
      </div>
    </section>
  );
}

function Overview({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <div className="columns-1 gap-3 md:columns-2 xl:columns-3 2xl:columns-4">
        {vaspKnowledgeModules.map((section) => (
          <LearningCard key={section.id} section={section} onClick={() => onSelect(section.id)} />
        ))}
      </div>
      <ResourceBand title="精选外部资源" desc="只提供资源摘要和学习用途说明，点击后在新标签页打开。" resources={externalResources} />
      <Notice />
    </>
  );
}

function LearningCard({ section, onClick }: { section: VaspKnowledgeModule; onClick: () => void }) {
  const Icon = vaspLearningSections.find((item) => item.id === section.id)?.icon ?? Sparkles;
  return (
    <button
      onClick={onClick}
      className="group mb-3 inline-flex w-full break-inside-avoid flex-col justify-between rounded-xl border border-[#24517b] bg-gradient-to-br from-[#071a32]/92 to-[#061124]/82 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan/80 hover:bg-[#0b2140]/90 hover:shadow-[0_0_28px_rgba(56,189,248,.22)]"
    >
      <span>
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan shadow-[0_0_22px_rgba(56,189,248,.18)]">
          <Icon size={22} />
        </span>
        <span className="block text-lg font-black text-white">{section.title}</span>
        <span className="mt-2 block text-sm leading-6 text-slate-300">{section.description}</span>
      </span>
      <span className="mt-4 flex flex-wrap items-center gap-2">
        {section.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <span className="rounded border border-blue-300/20 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-100">{section.children.length} 个专题</span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-cyan">
          进入学习
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

function SectionView({
  section,
  activeTopicId,
  onSelectTopic,
  onTopicBack,
  onBack
}: {
  section?: VaspKnowledgeModule;
  activeTopicId: string | null;
  onSelectTopic: (id: string) => void;
  onTopicBack: () => void;
  onBack: () => void;
}) {
  if (!section) return null;
  const activeTopic = activeTopicId ? section.children.find((item) => item.id === activeTopicId) : null;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[#24517b] bg-[#06152b]/86 p-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan">VASP 学习专题</p>
          <h2 className="mt-2 text-2xl font-black text-white">{section.title}</h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-300">{section.description}</p>
        </div>
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 bg-white/[0.03] px-3 py-2 text-sm font-bold text-slate-200 hover:border-cyan/60 hover:text-cyan">
          <ArrowLeft size={16} />
          总览
        </button>
      </div>
      {activeTopic ? (
        <TopicDetailPanel topic={activeTopic} onBack={onTopicBack} />
      ) : (
        <>
          <div className="columns-1 gap-3 md:columns-2 xl:columns-3 2xl:columns-4">
            {section.children.map((topicItem) => (
              <KnowledgeTopicCard key={topicItem.id} topic={topicItem} onClick={() => onSelectTopic(topicItem.id)} />
            ))}
          </div>
          {section.id === "command-library" && <CommandLibrary />}
        </>
      )}
      <Notice />
    </section>
  );
}

function KnowledgeTopicCard({ topic, onClick }: { topic: VaspKnowledgeTopic; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group mb-3 inline-flex w-full break-inside-avoid flex-col justify-between rounded-xl border border-[#24517b] bg-[#06152b]/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan/75 hover:bg-[#0b2140]/88 hover:shadow-[0_0_24px_rgba(56,189,248,.18)]">
      <span>
        <span className="mb-3 inline-flex rounded border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">{topic.level}</span>
        <span className="block text-lg font-black text-white">{topic.title}</span>
        <span className="mt-2 block text-sm leading-6 text-slate-300">{topic.description}</span>
      </span>
      <span className="mt-4 flex flex-wrap gap-2">
        {topic.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-cyan">
          查看详情
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

function TopicDetailPanel({ topic, onBack }: { topic: VaspKnowledgeTopic; onBack: () => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-cyan/25 bg-[#041124]/88 shadow-[0_0_34px_rgba(56,189,248,.10)]">
      <div className="border-b border-cyan/15 bg-[linear-gradient(135deg,rgba(8,24,48,.92),rgba(16,12,48,.86))] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">{topic.category}</span>
            <span className="rounded border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-100">{topic.level}</span>
          </div>
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 bg-white/[0.03] px-3 py-2 text-sm font-bold text-slate-200 hover:border-cyan/60 hover:text-cyan">
            <ArrowLeft size={16} />
            返回专题
          </button>
        </div>
        <h3 className="text-2xl font-black text-white">{topic.title}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">{topic.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {topic.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      {topic.diagram && (
        <div className="p-4 pb-0">
          <VaspTopicDiagram diagram={topic.diagram} />
        </div>
      )}
      {topic.linuxCommandGroups && (
        <div className="p-4 pb-0">
          <LinuxCommandLearning groups={topic.linuxCommandGroups} practiceTasks={topic.practiceTasks ?? []} />
        </div>
      )}
      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_minmax(300px,.72fr)] 2xl:grid-cols-[minmax(0,1fr)_minmax(340px,.62fr)]">
        <div className="columns-1 gap-4 2xl:columns-2">
          <DetailList title="学习目标" items={topic.learningGoals} />
          <DetailList title="核心知识点" items={topic.concepts} />
          <DetailList title="适用场景" items={topic.whenToUse} />
          <DetailList title="操作步骤" items={topic.workflow} ordered />
          {topic.sections && topic.sections.map((section) => <DetailList key={section.title} title={section.title} items={section.items} />)}
          {topic.commands && topic.commands.length > 0 && (
            <div className="mb-4 inline-block w-full break-inside-avoid space-y-3">
              <h4 className="text-lg font-black text-white">常用命令</h4>
              {topic.commands.map((command) => (
                <CommandCard key={command.id} item={command} category={command.category} />
              ))}
            </div>
          )}
        </div>
        <aside className="space-y-4">
          {topic.outputFiles && topic.outputFiles.length > 0 && <OutputFiles files={topic.outputFiles} />}
          <DetailList title="注意事项" items={topic.cautions} />
          {topic.tools && topic.tools.length > 0 && <DetailList title="相关工具" items={topic.tools} />}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && <DetailList title="相关专题" items={topic.relatedTopics} />}
          {topic.resources && topic.resources.length > 0 && <KnowledgeResourceGrid resources={topic.resources} />}
        </aside>
      </div>
    </article>
  );
}

function VaspTopicDiagram({ diagram }: { diagram: VaspDiagramId }) {
  const Diagram = vaspDiagramMap[diagram];
  if (!Diagram) return null;
  return <Diagram />;
}

function LinuxCommandLearning({ groups, practiceTasks }: { groups: LinuxCommandGroup[]; practiceTasks: { title: string; command: string; explanation: string }[] }) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const [tag, setTag] = useState("全部");

  const tags = useMemo(() => {
    const values = new Set<string>(["全部"]);
    groups.forEach((group) => group.commands.forEach((command) => command.tags.forEach((item) => values.add(item))));
    return Array.from(values);
  }, [groups]);

  const commands = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((group) => activeGroup === "all" || group.id === activeGroup)
      .flatMap((group) => group.commands.map((command) => ({ ...command, groupTitle: group.title })))
      .filter((command) => {
        const tagHit = tag === "全部" || command.tags.includes(tag);
        const text = [command.name, command.meaning, command.purpose, command.syntax, command.output, command.groupTitle, ...command.options, ...command.pitfalls, ...command.tags, ...command.examples.flatMap((example) => [example.command, example.explanation])].join(" ").toLowerCase();
        return tagHit && (!q || text.includes(q));
      });
  }, [activeGroup, groups, query, tag]);

  return (
    <section className="space-y-4 rounded-xl border border-cyan/25 bg-slate-950/35 p-4">
      <div>
        <h4 className="text-xl font-black text-white">Linux 指令详解学习模块</h4>
        <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">
          面向 VASP 初学者，按文件管理、查看监控、搜索提取、批量处理、管道、压缩、权限环境、远程传输、进程和集群作业组织常用 Linux 指令。
        </p>
      </div>
      <div className="grid gap-3 xl:grid-cols-[minmax(260px,360px)_1fr]">
        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-cyan/25 bg-slate-950/60 px-3 text-sm text-slate-300">
          <Search size={17} className="text-cyan" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 grep、rm、Slurm、能量、危险命令..." className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
        </label>
        <div className="flex flex-wrap gap-2">
          <CategoryButton active={activeGroup === "all"} onClick={() => setActiveGroup("all")}>
            全部分类
          </CategoryButton>
          {groups.map((group) => (
            <CategoryButton key={group.id} active={activeGroup === group.id} onClick={() => setActiveGroup(group.id)}>
              {group.title}
            </CategoryButton>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((item) => (
          <button key={item} onClick={() => setTag(item)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${tag === item ? "border-cyan bg-cyan/20 text-cyan" : "border-slate-600/70 bg-white/[0.03] text-slate-300 hover:border-cyan/50 hover:text-white"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="columns-1 gap-3 2xl:columns-2">
        {commands.map((command) => (
          <LinuxCommandCard key={`${command.groupTitle}-${command.name}`} command={command} />
        ))}
      </div>
      {commands.length === 0 && <div className="rounded-xl border border-dashed border-cyan/30 bg-cyan/5 p-8 text-center text-sm text-slate-300">没有匹配的 Linux 指令，请换一个关键词、分类或标签。</div>}
      {practiceTasks.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-black text-white">VASP 新手常用任务场景</h4>
          <div className="grid gap-3 xl:grid-cols-2">
            {practiceTasks.map((task) => (
              <PracticeTaskCard key={task.title} task={task} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function LinuxCommandCard({ command }: { command: LinuxCommandDoc & { groupTitle: string } }) {
  return (
    <article className={`mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-xl border bg-[#06152b]/82 ${command.danger ? "border-amber-300/45 shadow-[0_0_24px_rgba(251,191,36,.10)]" : "border-[#24517b]"}`}>
      <div className="border-b border-slate-700/60 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan">{command.groupTitle}</span>
          {command.danger && <span className="rounded border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-100">危险命令</span>}
          {command.tags.slice(0, 3).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <h5 className="text-xl font-black text-white">{command.name}</h5>
        <p className="mt-1 text-sm font-bold text-blue-100">{command.meaning}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{command.purpose}</p>
      </div>
      <div className="grid gap-3 p-4 lg:grid-cols-2">
        <MiniList title="基本语法" items={[command.syntax]} code />
        <MiniList title="常用参数" items={command.options} />
        <MiniList title="输出结果如何理解" items={[command.output]} />
        <MiniList title="常见误区" items={command.pitfalls} />
      </div>
      <div className="space-y-2 px-4 pb-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan">VASP 场景示例</p>
        {command.examples.map((example) => (
          <CopyCodeBlock key={example.command} code={example.command} explanation={example.explanation} warning={command.danger} />
        ))}
        {command.danger && <p className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-100">{command.danger}</p>}
      </div>
    </article>
  );
}

function PracticeTaskCard({ task }: { task: { title: string; command: string; explanation: string } }) {
  return (
    <div className="rounded-xl border border-[#24517b] bg-[#06152b]/82 p-4">
      <h5 className="font-black text-white">{task.title}</h5>
      <p className="mt-2 text-sm leading-6 text-slate-300">{task.explanation}</p>
      <div className="mt-3">
        <CopyCodeBlock code={task.command} explanation="点击复制后可在服务器终端中按需修改执行。" />
      </div>
    </div>
  );
}

function CopyCodeBlock({ code, explanation, warning = false }: { code: string; explanation: string; warning?: boolean | string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }
  return (
    <div className={`overflow-hidden rounded-lg border ${warning ? "border-amber-300/35 bg-amber-300/5" : "border-slate-700/70 bg-slate-950/55"}`}>
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-3 py-2">
        <p className="text-xs leading-5 text-slate-400">{explanation}</p>
        <button onClick={copy} className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-700 bg-white/[0.03] px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:border-cyan/60 hover:text-cyan">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre className="overflow-auto p-3 text-xs leading-6 text-blue-100 dft-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DetailList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <div className="mb-4 inline-block w-full break-inside-avoid rounded-xl border border-[#24517b] bg-[#06152b]/72 p-4">
      <h4 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-cyan">{title}</h4>
      <ListTag className={`${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5 text-sm leading-6 text-slate-300`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}

function OutputFiles({ files }: { files: { file: string; meaning: string; check: string }[] }) {
  return (
    <div className="rounded-xl border border-[#24517b] bg-[#06152b]/72 p-4">
      <h4 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-cyan">输出文件与判断标准</h4>
      <div className="space-y-3">
        {files.map((file) => (
          <div key={`${file.file}-${file.check}`} className="rounded-lg border border-slate-700/70 bg-slate-950/45 p-3">
            <p className="font-mono text-sm font-bold text-blue-100">{file.file}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{file.meaning}</p>
            <p className="mt-1 text-xs leading-5 text-amber-100/90">{file.check}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KnowledgeResourceGrid({ resources }: { resources: VaspKnowledgeResource[] }) {
  return (
    <div className="rounded-xl border border-[#24517b] bg-[#06152b]/72 p-4">
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
    </div>
  );
}

function ResourceBand({ title, desc, resources }: { title: string; desc: string; resources: ExternalResource[] }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">{desc}</p>
      </div>
      <div className="columns-1 gap-3 md:columns-2 xl:columns-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.url} resource={resource} />
        ))}
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: ExternalResource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-3 inline-flex w-full break-inside-avoid flex-col justify-between rounded-xl border border-[#24517b] bg-[#06152b]/80 p-4 transition hover:border-cyan/70 hover:bg-[#0b2140]/86 hover:shadow-[0_0_26px_rgba(56,189,248,.18)]"
    >
      <span>
        <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-300/25 bg-blue-400/10 text-cyan">
          <ExternalLink size={18} />
        </span>
        <span className="block text-lg font-black text-white">{resource.title}</span>
        <span className="mt-2 block text-sm leading-6 text-slate-300">{resource.desc}</span>
      </span>
      <span className="mt-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <span className="ml-auto text-xs font-bold text-cyan transition group-hover:translate-x-0.5">打开资源</span>
      </span>
    </a>
  );
}

function LearningPath() {
  return (
    <div className="rounded-xl border border-[#24517b] bg-[#06152b]/80 p-4">
      <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {learningPath.map((step, index) => (
          <div key={step.title} className="flex gap-3 rounded-lg border border-cyan/15 bg-cyan/[0.05] p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cyan/40 text-sm font-black text-cyan">{index + 1}</div>
            <div>
              <h3 className="font-black text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputFiles() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {inputFileCards.map((item) => (
        <div key={item.title} className="rounded-xl border border-[#24517b] bg-[#06152b]/80 p-4">
          <h3 className="text-xl font-black text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            <MiniList title="常查命令" items={item.commands} code />
            <MiniList title="常见错误" items={item.errors} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniList({ title, items, code = false }: { title: string; items: string[]; code?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-950/45 p-3">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-cyan">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <p key={item} className={`${code ? "font-mono text-[11px] text-blue-100" : "text-sm text-slate-300"} leading-5`}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function TopicGrid({ items }: { items: TopicCard[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <TopicTile key={item.title} item={item} />
      ))}
    </div>
  );
}

function TopicTile({ item }: { item: TopicCard }) {
  return (
    <div className="rounded-xl border border-[#24517b] bg-[#06152b]/80 p-4">
      <h3 className="text-lg font-black text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

function LiSProcessing() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-amber-300/25 bg-amber-300/10 p-4">
        <h3 className="text-xl font-black text-white">锂硫电池 / 催化剂专用后处理</h3>
        <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">
          面向 Li2Sn 吸附、金属单原子/双原子催化位点、Bader 电荷转移、S-S 键长、d-band center 和 NEB 转化路径的专用数据处理模板。
        </p>
      </div>
      <TopicGrid items={liSProcessingCards} />
    </section>
  );
}

function CommandLibrary() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const items = useMemo(() => {
    const selected = categoryId === "all" ? commandCategories : commandCategories.filter((category) => category.id === categoryId);
    const flat = selected.flatMap((category) => category.items.map((item) => ({ ...item, category: category.title })));
    const q = query.trim().toLowerCase();
    if (!q) return flat;
    return flat.filter((item) => [item.title, item.file, item.command, item.desc, item.note ?? "", item.category, ...item.keywords].join(" ").toLowerCase().includes(q));
  }, [categoryId, query]);

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-[#24517b] bg-[#06152b]/86 p-4">
        <h3 className="text-2xl font-black text-white">VASP 结果提取命令库</h3>
        <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-300">
          从 OUTCAR、OSZICAR、DOSCAR、POTCAR、ACF.dat 到论文数据表：快速提取能量、费米能级、受力、电荷、磁矩、DOS、NEB 和锂硫电池吸附能数据。
        </p>
        <div className="mt-4 grid gap-3">
          <label className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-cyan/25 bg-slate-950/55 px-3 text-sm text-slate-300">
            <Search size={17} className="text-cyan" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 TOTEN、费米、Bader、NEB、ZVAL、吸附能..." className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
          </label>
          <div className="flex max-w-full flex-wrap gap-2">
            <CategoryButton active={categoryId === "all"} onClick={() => setCategoryId("all")}>
              全部
            </CategoryButton>
            {commandCategories.map((category) => (
              <CategoryButton key={category.id} active={categoryId === category.id} onClick={() => setCategoryId(category.id)}>
                {category.title}
              </CategoryButton>
            ))}
          </div>
        </div>
      </div>
      <div className="columns-1 gap-3 xl:columns-2">
        {items.map((item) => (
          <CommandCard key={`${item.category}-${item.title}`} item={item} category={item.category} />
        ))}
      </div>
      {items.length === 0 && <div className="rounded-xl border border-dashed border-cyan/30 bg-cyan/5 p-8 text-center text-sm text-slate-300">没有匹配的命令，请换一个关键词或分类。</div>}
    </section>
  );
}

function CategoryButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-bold transition ${
        active ? "border-cyan bg-cyan/20 text-cyan shadow-[0_0_18px_rgba(56,189,248,.20)]" : "border-slate-600/70 bg-white/[0.03] text-slate-300 hover:border-cyan/50 hover:text-white"
      }`}
    >
      {children}
    </button>
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
    <article className="mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-xl border border-[#24517b] bg-[#06152b]/82">
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

function Notice() {
  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-950/45 p-4 text-sm leading-7 text-slate-300">
      不同 VASP 版本、INCAR 设置和输出精度可能导致输出格式略有差异；复杂 DOS/PDOS、CHGCAR、LOCPOT、ELFCAR 等三维数据建议结合 VASPKIT、pymatgen、ASE、py4vasp 或 VESTA 处理。
    </div>
  );
}
