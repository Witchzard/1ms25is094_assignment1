/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  FileText,
  BookOpen,
  Layers,
  HelpCircle,
  AlertTriangle,
  Bookmark,
  Download,
  Upload,
  X,
  FileCheck2,
} from 'lucide-react';
import { SamplePaper, PaperAnalysis } from '../types.ts';

export type ActiveTab =
  | 'input'
  | 'summary'
  | 'extraction'
  | 'qna'
  | 'gaps'
  | 'keywords'
  | 'export';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  analysis: PaperAnalysis | null;
  samples: SamplePaper[];
  onSelectSample: (sample: SamplePaper) => void;
  activeSampleId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  analysis,
  samples,
  onSelectSample,
  activeSampleId,
}) => {
  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ElementType; badge?: string }> = [
    { id: 'input', label: 'Paper Input & Upload', icon: Upload },
    { id: 'summary', label: 'Paper Summary', icon: BookOpen, badge: analysis ? 'Ready' : undefined },
    { id: 'extraction', label: 'Key Extraction', icon: Layers, badge: analysis ? `${analysis.keyExtraction.keyResults.length} Results` : undefined },
    { id: 'qna', label: 'Grounded Q&A', icon: HelpCircle },
    { id: 'gaps', label: 'Research Gaps', icon: AlertTriangle },
    { id: 'keywords', label: 'Keywords & Glossary', icon: Bookmark, badge: analysis ? `${analysis.keywords.length}` : undefined },
    { id: 'export', label: 'Export & Report', icon: Download },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B132B] border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-white block">
                Research Paper AI
              </span>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                Academic Assistant
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Sample Papers Library */}
          <div className="pt-6">
            <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              <span>Sample Research Papers</span>
            </div>
            <div className="space-y-1">
              {samples.map((sample) => {
                const isCurrent = activeSampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSample(sample);
                      onCloseMobile();
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors border ${
                      isCurrent
                        ? 'bg-slate-800/90 border-blue-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <div className="font-medium truncate text-white">{sample.title}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <span>{sample.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{sample.category.split('&')[0].trim()}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Paper Status Summary Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#090F21]">
          {analysis ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Active Paper</span>
                <span className="text-emerald-400 font-medium">Loaded</span>
              </div>
              <div className="text-xs font-medium text-slate-200 truncate" title={analysis.title}>
                {analysis.title}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono tabular-nums">
                <span>{analysis.wordCount.toLocaleString()} words</span>
                <span aria-hidden="true">·</span>
                <span>~{analysis.readingTimeMinutes} min read</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 text-center py-1">
              No paper loaded yet. Paste or upload text to begin.
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
