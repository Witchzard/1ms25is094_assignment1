/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, Sparkles, Download, FilePlus } from 'lucide-react';
import { ActiveTab } from './Sidebar.tsx';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMobile: () => void;
  hasAnalysis: boolean;
  onNewPaper: () => void;
  isAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenMobile,
  hasAnalysis,
  onNewPaper,
  isAnalyzing,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
      {/* Zone 1: Brand title & Mobile Trigger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          Research Paper AI
        </span>
      </div>

      {/* Zone 2: 4-5 Clean single-line text links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
        <button
          onClick={() => onSelectTab('input')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'input' ? 'text-blue-400 font-semibold' : 'hover:text-white'
          }`}
        >
          Paper Input
        </button>
        <button
          onClick={() => onSelectTab('summary')}
          disabled={!hasAnalysis}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            !hasAnalysis ? 'opacity-40 cursor-not-allowed' : activeTab === 'summary' ? 'text-blue-400 font-semibold' : 'hover:text-white'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => onSelectTab('extraction')}
          disabled={!hasAnalysis}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            !hasAnalysis ? 'opacity-40 cursor-not-allowed' : activeTab === 'extraction' ? 'text-blue-400 font-semibold' : 'hover:text-white'
          }`}
        >
          Key Extraction
        </button>
        <button
          onClick={() => onSelectTab('qna')}
          disabled={!hasAnalysis}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            !hasAnalysis ? 'opacity-40 cursor-not-allowed' : activeTab === 'qna' ? 'text-blue-400 font-semibold' : 'hover:text-white'
          }`}
        >
          Q&A Assistant
        </button>
        <button
          onClick={() => onSelectTab('gaps')}
          disabled={!hasAnalysis}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            !hasAnalysis ? 'opacity-40 cursor-not-allowed' : activeTab === 'gaps' ? 'text-blue-400 font-semibold' : 'hover:text-white'
          }`}
        >
          Research Gaps
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        {hasAnalysis ? (
          <button
            onClick={() => onSelectTab('export')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        ) : (
          <button
            onClick={onNewPaper}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span>New Paper</span>
          </button>
        )}
      </div>
    </header>
  );
};
