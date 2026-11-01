/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Target,
  FlaskConical,
  Trophy,
  CheckCircle,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PaperAnalysis } from '../types.ts';

interface SummaryViewProps {
  analysis: PaperAnalysis;
  onNavigateToExtraction: () => void;
  onNavigateToQnA: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  analysis,
  onNavigateToExtraction,
  onNavigateToQnA,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections = [
    {
      id: 'objective',
      title: 'Main Objective',
      description: 'The fundamental research question and hypothesis guiding this work',
      icon: Target,
      content: analysis.summary.objective,
      color: 'blue',
    },
    {
      id: 'methodology',
      title: 'Methodology & System Design',
      description: 'Experimental procedures, algorithms, architectures, and analytical frameworks',
      icon: FlaskConical,
      content: analysis.summary.methodology,
      color: 'emerald',
    },
    {
      id: 'findings',
      title: 'Key Empirical Findings & Benchmarks',
      description: 'Empirical results, discoveries, baseline comparisons, and measured breakthroughs',
      icon: Trophy,
      content: analysis.summary.findings,
      color: 'amber',
    },
    {
      id: 'conclusion',
      title: 'Conclusion & Academic Impact',
      description: 'Significance, broad implications, and practical takeaways',
      icon: CheckCircle,
      content: analysis.summary.conclusion,
      color: 'purple',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Metadata */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono tabular-nums">
          <span>Paper Summary</span>
          <span aria-hidden="true">·</span>
          <span>{analysis.wordCount.toLocaleString()} words</span>
          <span aria-hidden="true">·</span>
          <span>~{analysis.readingTimeMinutes} min reading time</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {analysis.title}
        </h1>
        {analysis.keyExtraction.authors && (
          <p className="mt-1 text-xs text-slate-400">
            Authors: {analysis.keyExtraction.authors}
          </p>
        )}
      </div>

      {/* Executive Digest Callout */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Executive Summary
            </h2>
          </div>
          <button
            onClick={() => handleCopy(analysis.summary.executiveSummary, 'exec')}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            {copiedKey === 'exec' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {analysis.summary.executiveSummary}
        </p>
      </div>

      {/* Few-Shot Guided Structured Summary */}
      <div className="bg-[#0F172A] border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                Structured Core Summary
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 rounded">
                Few-Shot Guided
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Standardized 4-point extraction guided by peer-reviewed academic few-shot examples
            </p>
          </div>
          <button
            onClick={() => {
              const text = `- Objective: ${analysis.structuredSummary?.objective || analysis.summary.objective}\n- Methodology: ${analysis.structuredSummary?.methodology || analysis.summary.methodology}\n- Findings: ${analysis.structuredSummary?.findings || analysis.summary.findings}\n- Research gap: ${analysis.structuredSummary?.researchGap || analysis.researchGaps.statedLimitations[0] || 'Not specified'}`;
              handleCopy(text, 'few-shot');
            }}
            className="self-start sm:self-auto flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            {copiedKey === 'few-shot' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Core</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Structured Format</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3 font-sans text-xs">
          <div className="p-3 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="font-semibold text-blue-400 mr-2">Objective:</span>
            <span className="text-slate-200">
              {analysis.structuredSummary?.objective || analysis.summary.objective}
            </span>
          </div>

          <div className="p-3 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="font-semibold text-emerald-400 mr-2">Methodology:</span>
            <span className="text-slate-200">
              {analysis.structuredSummary?.methodology || analysis.summary.methodology}
            </span>
          </div>

          <div className="p-3 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="font-semibold text-amber-400 mr-2">Findings:</span>
            <span className="text-slate-200">
              {analysis.structuredSummary?.findings || analysis.summary.findings}
            </span>
          </div>

          <div className="p-3 bg-[#0B132B] border border-slate-800 rounded-lg">
            <span className="font-semibold text-rose-400 mr-2">Research gap:</span>
            <span className="text-slate-200">
              {analysis.structuredSummary?.researchGap || analysis.researchGaps.statedLimitations[0] || 'Information not available in the supplied research paper.'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Paper Summarisation */}
      <div className="space-y-5">
        <h2 className="text-base font-semibold text-white">
          Detailed Academic Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-white tracking-tight">
                        {sec.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(sec.content, sec.id)}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      aria-label={`Copy ${sec.title}`}
                    >
                      {copiedKey === sec.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    {sec.description}
                  </p>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Navigations */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onNavigateToExtraction}
          className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View Technical Key Extraction</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onNavigateToQnA}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <span>Ask Questions About This Paper</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
