"use client";

import { useMemo, useState } from "react";
import { catalystSystems } from "@/data/catalystSystems";
import { characterizationMethods } from "@/data/characterizationMethods";
import { EvidenceChain, GlassCard, InfoList, Tag } from "./UI";

export function MethodExplorer() {
  const [systemId, setSystemId] = useState(catalystSystems[0].id);
  const system = catalystSystems.find((item) => item.id === systemId) ?? catalystSystems[0];
  const methods = useMemo(
    () =>
      characterizationMethods.filter(
        (method) =>
          method.suitableSystems.includes("全部体系") ||
          method.suitableSystems.includes(system.shortName) ||
          method.suitableSystems.includes(system.name) ||
          method.suitableSystems.some((name) => system.name.includes(name) || system.shortName.includes(name)) ||
          system.characterizationMethods.includes(method.name) ||
          system.characterizationMethods.some((name) => method.name.includes(name) || name.includes(method.name.split(" ")[0]))
      ),
    [system]
  );

  return (
    <div className="space-y-5">
      <GlassCard>
        <label className="grid gap-2 text-sm text-slate-400 md:max-w-md">
          先选择催化剂体系
          <select
            className="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan"
            value={systemId}
            onChange={(event) => setSystemId(event.target.value)}
          >
            {catalystSystems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <GlassCard>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-white">{system.name}</h2>
            <Tag>{system.shortName}</Tag>
          </div>
          <p className="mb-5 text-sm leading-7 text-slate-300">{system.summary}</p>
          <h3 className="mb-3 text-sm font-semibold text-cyan">需要证明的结构特征</h3>
          <InfoList items={[...system.structureFeatures, ...system.keyQuestions.slice(0, 3)]} />
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">证据链路径</h2>
          <EvidenceChain items={system.evidenceChain} />
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {methods.map((method) => (
          <GlassCard key={method.id}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{method.name}</h3>
              <Tag>{method.category}</Tag>
            </div>
            <InfoList
              items={[
                `能证明什么：${method.whatItProves}`,
                `典型图谱如何解读：${method.typicalInterpretation}`,
                `常见误区：${method.commonMistakes}`,
                `与 DFT 对应：${method.relationToDFT}`
              ]}
            />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
