/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertTriangle,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { PaperAnalysis } from '../types.ts';

interface ResearchGapsViewProps {
  analysis: PaperAnalysis;
  onNavigateToKeywords: () => void;
}

export const ResearchGapsView: React.FC<ResearchGapsViewProps> = ({
  analysis,
  onNavigateToKeywords,
}) => {
  const { researchGaps } = analysis;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Critical Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Peer Review Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Research Gaps, Limitations & Future Horizons
        </h1>
        <p className="mt-2 text-xs text-slate-300">
          Academic peer assessment highlighting methodological constraints acknowledged by the authors, unaddressed dimensions, and potential future research opportunities.
        </p>
      </div>

      {/* 3 Structured Columns / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Stated Limitations */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Stated Limitations</span>
            </div>
            <h2 className="text-sm font-semibold text-white mb-2">
              Author-Acknowledged Constraints
            </h2>
            <p className="text-[11px] text-slate-400 mb-4">
              Boundaries, complexities, or hardware thresholds specifically cited in the manuscript.
            </p>

            <ul className="space-y-3">
              {researchGaps.statedLimitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="font-mono text-amber-500/80 font-bold mt-0.5">·</span>
                  <span className="leading-relaxed">{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Unaddressed Gaps */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-2">
              <Search className="w-4 h-4" />
              <span>Unaddressed Gaps</span>
            </div>
            <h2 className="text-sm font-semibold text-white mb-2">
              Open Questions & Edge Cases
            </h2>
            <p className="text-[11px] text-slate-400 mb-4">
              Critical scientific or practical dimensions not explored or validated within this study.
            </p>

            <ul className="space-y-3">
              {researchGaps.unaddressedGaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="font-mono text-rose-500/80 font-bold mt-0.5">·</span>
                  <span className="leading-relaxed">{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Future Research Directions */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
              <Compass className="w-4 h-4" />
              <span>Future Work</span>
            </div>
            <h2 className="text-sm font-semibold text-white mb-2">
              High-Impact Follow-Up Directions
            </h2>
            <p className="text-[11px] text-slate-400 mb-4">
              Promising thesis topics, architectural extensions, or cross-domain applications.
            </p>

            <ul className="space-y-3">
              {researchGaps.futureDirections.map((dir, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="font-mono text-emerald-500/80 font-bold mt-0.5">·</span>
                  <span className="leading-relaxed">{dir}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Student Thesis Ideas Callout */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-2">
          Student Thesis & Research Project Inspiration
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          When writing a literature review or proposing a capstone thesis based on "{analysis.title}", 
          focus on resolving one of the unaddressed gaps above (such as testing low-compute approximations, 
          evaluating out-of-domain transfer, or creating hybrid architectural variants).
        </p>
        <div className="mt-4">
          <button
            onClick={onNavigateToKeywords}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Review Technical Keywords & Concepts</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
