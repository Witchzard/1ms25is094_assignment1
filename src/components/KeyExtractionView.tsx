/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Layers,
  HelpCircle,
  Cpu,
  BarChart3,
  Database,
  Terminal,
  Server,
  Crosshair,
  FileCheck,
} from 'lucide-react';
import { PaperAnalysis } from '../types.ts';

interface KeyExtractionViewProps {
  analysis: PaperAnalysis;
  onNavigateToGaps: () => void;
}

export const KeyExtractionView: React.FC<KeyExtractionViewProps> = ({
  analysis,
  onNavigateToGaps,
}) => {
  const { keyExtraction } = analysis;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Key Information Extraction</span>
          <span aria-hidden="true">·</span>
          <span>Structured Technical Spec</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Technical Parameters & Experimental Results
        </h1>
        <p className="mt-2 text-xs text-slate-300">
          Core research problem, formal objectives, methodological pipeline, technologies used, and quantitative benchmarks.
        </p>
      </div>

      {/* 1. Research Problem & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Research Problem */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-2">
              <Crosshair className="w-4 h-4" />
              <span>Research Problem</span>
            </div>
            <h2 className="text-sm font-semibold text-white mb-2">
              Core Technical Friction & Gap in Prior Art
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {keyExtraction.problem}
            </p>
          </div>
        </div>

        {/* Research Objectives */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
            <FileCheck className="w-4 h-4" />
            <span>Formal Objectives</span>
          </div>
          <h2 className="text-sm font-semibold text-white mb-3">
            Specific Hypotheses & Targets
          </h2>
          <ul className="space-y-2.5">
            {keyExtraction.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="font-mono text-slate-400 font-semibold shrink-0 mt-0.5">
                  0{i + 1}.
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Methodology Breakdown */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
          <Layers className="w-4 h-4" />
          <span>Methodology & Design Architecture</span>
        </div>
        <h2 className="text-sm font-bold text-white">
          Structural Engineering & Experimental Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Theoretical Approach
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {keyExtraction.methodologyDetail.approach}
            </p>
          </div>

          <div className="p-4 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Architecture & Modeling
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {keyExtraction.methodologyDetail.architectureOrDesign}
            </p>
          </div>

          <div className="p-4 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Data Collection / Corpus
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {keyExtraction.methodologyDetail.dataCollection}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Technologies & Environment Grid */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
          <Cpu className="w-4 h-4" />
          <span>Technology & Infrastructure Stack</span>
        </div>
        <h2 className="text-sm font-bold text-white">
          Frameworks, Baselines, Corpora, and Compute
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Frameworks & Tools */}
          <div className="p-3.5 bg-[#0B132B] border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Frameworks & Tools</span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-slate-300">
              {keyExtraction.technologies.frameworksAndTools.length > 0 ? (
                keyExtraction.technologies.frameworksAndTools.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-500 font-mono">·</span>
                    <span className="truncate">{t}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-500">Not specified</span>
              )}
            </div>
          </div>

          {/* Models & Baselines */}
          <div className="p-3.5 bg-[#0B132B] border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Comparative Baselines</span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-slate-300">
              {keyExtraction.technologies.modelsOrBaselines.length > 0 ? (
                keyExtraction.technologies.modelsOrBaselines.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-500 font-mono">·</span>
                    <span className="truncate">{m}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-500">Standard benchmarks</span>
              )}
            </div>
          </div>

          {/* Datasets */}
          <div className="p-3.5 bg-[#0B132B] border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>Datasets & Benchmarks</span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-slate-300">
              {keyExtraction.technologies.datasets.length > 0 ? (
                keyExtraction.technologies.datasets.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-500 font-mono">·</span>
                    <span className="truncate">{d}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-500">Experimental samples</span>
              )}
            </div>
          </div>

          {/* Hardware & Environments */}
          <div className="p-3.5 bg-[#0B132B] border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span>Hardware & Compute</span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-slate-300">
              {keyExtraction.technologies.hardwareOrEnvironments.length > 0 ? (
                keyExtraction.technologies.hardwareOrEnvironments.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-500 font-mono">·</span>
                    <span className="truncate">{h}</span>
                  </div>
                ))
              ) : (
                <span className="text-slate-500">Academic laboratory setup</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Important Results & Quantitative Evidence */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <BarChart3 className="w-4 h-4" />
            <span>Important Empirical Results</span>
          </div>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {keyExtraction.keyResults.length} Primary Benchmarks
          </span>
        </div>

        <div className="space-y-3">
          {keyExtraction.keyResults.map((res, i) => (
            <div
              key={i}
              className="p-4 bg-[#0B132B] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold text-white">
                  {res.metricOrFinding}
                </div>
                <div className="text-[11px] text-slate-400">
                  {res.significance}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="inline-block px-3 py-1 bg-blue-950/60 border border-blue-500/30 text-blue-300 rounded font-mono text-xs font-semibold tabular-nums">
                  {res.valueOrEvidence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onNavigateToGaps}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          View Limitations & Research Gaps →
        </button>
      </div>
    </div>
  );
};
