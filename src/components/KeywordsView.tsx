/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  BookOpen,
  Sparkles,
  GraduationCap,
  Copy,
  Check,
} from 'lucide-react';
import { PaperAnalysis, KeywordGlossaryItem } from '../types.ts';

interface KeywordsViewProps {
  analysis: PaperAnalysis;
  onNavigateToExport: () => void;
}

export const KeywordsView: React.FC<KeywordsViewProps> = ({
  analysis,
  onNavigateToExport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = ['All', 'Architecture', 'Algorithm', 'Dataset', 'Metric', 'Concept', 'Hardware'];

  const filteredKeywords = analysis.keywords.filter((kw) => {
    const matchesSearch =
      kw.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.plainExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.academicDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || kw.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (text: string, term: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Student Learning Hub</span>
          <span aria-hidden="true">·</span>
          <span>Demystifying Academic Terminology</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Technical Keywords & Plain-Language Glossary
        </h1>
        <p className="mt-2 text-xs text-slate-300">
          Complex academic terms explained with plain-language analogies for undergraduate students, alongside formal definitions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords or definitions..."
            className="w-full bg-[#0B132B] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Keywords Grid */}
      {filteredKeywords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredKeywords.map((kw, idx) => (
            <div
              key={idx}
              className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Term title and category text */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      {kw.term}
                    </h2>
                    {/* Zero-pill metadata text */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="text-blue-400 font-medium">{kw.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Concept {idx + 1}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(`${kw.term}: ${kw.plainExplanation} (Formal: ${kw.academicDefinition})`, kw.term)
                    }
                    className="text-slate-400 hover:text-white p-1 transition-colors"
                    title="Copy keyword explanation"
                  >
                    {copiedTerm === kw.term ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Plain-Language Explanation */}
                <div className="p-3.5 bg-[#0B132B] border border-slate-800/80 rounded-lg mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plain English Analogy (For Students)</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {kw.plainExplanation}
                  </p>
                </div>

                {/* Academic Definition */}
                <div className="p-3.5 bg-[#0B132B]/60 border border-slate-800/60 rounded-lg">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                    <span>Academic Definition</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {kw.academicDefinition}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-12 text-center text-xs text-slate-400">
          No keywords match your query "{searchQuery}".
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onNavigateToExport}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Proceed to Export & Download Report →
        </button>
      </div>
    </div>
  );
};
