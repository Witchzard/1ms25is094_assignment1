/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileText,
  Trash2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { SamplePaper, PaperAnalysis } from '../types.ts';

interface PaperInputViewProps {
  paperText: string;
  onChangeText: (text: string) => void;
  paperTitle: string;
  onChangeTitle: (title: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  analysisError: string | null;
  samples: SamplePaper[];
  onSelectSample: (sample: SamplePaper) => void;
  activeSampleId?: string;
  analysis: PaperAnalysis | null;
  onNavigateToSummary: () => void;
}

export const PaperInputView: React.FC<PaperInputViewProps> = ({
  paperText,
  onChangeText,
  paperTitle,
  onChangeTitle,
  onAnalyze,
  isAnalyzing,
  analysisError,
  samples,
  onSelectSample,
  activeSampleId,
  analysis,
  onNavigateToSummary,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const wordCount = paperText.trim() ? paperText.trim().split(/\s+/).length : 0;
  const charCount = paperText.length;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 220));

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!file.name.endsWith('.txt') && file.type !== 'text/plain') {
      alert('Please upload a plain text (.txt) research paper file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        onChangeText(content);
        setUploadFileName(file.name);
        if (!paperTitle) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          onChangeTitle(cleanName);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    onChangeText('');
    onChangeTitle('');
    setUploadFileName(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title & Introduction */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Research Paper Input & Analysis
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Paste the full text or excerpts of an academic research paper, or upload a TXT file.
          The AI will extract key methodologies, summarize findings, detect research gaps, and answer questions.
        </p>
      </div>

      {/* Quick-Start Sample Papers Strip */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Quick-Start With Peer-Reviewed Benchmark Papers
          </div>
          <span className="text-xs text-slate-400">One-click instant analysis</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {samples.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className={`text-left p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-semibold text-white leading-snug">
                    {sample.title}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {sample.authors.split(',')[0]} et al. ({sample.year})
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 mt-2 font-medium">
                  <span>{sample.category.split('&')[0].trim()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sample.venue.split('(')[0].trim()}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Text & Title Input (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Optional Title Input */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
            <label htmlFor="paper-title-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Research Paper Title (Optional)
            </label>
            <input
              id="paper-title-input"
              type="text"
              value={paperTitle}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="e.g. Attention Is All You Need, or leave blank to auto-detect"
              className="w-full bg-[#0B132B] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Text Area Input */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col min-h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-semibold text-slate-300">
                Paper Content (Abstract, Methodology, Results)
              </span>
              <div className="flex items-center gap-3">
                {uploadFileName && (
                  <span className="text-[11px] text-blue-400 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    {uploadFileName}
                  </span>
                )}
                {paperText && (
                  <button
                    onClick={handleClear}
                    className="text-slate-400 hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={paperText}
              onChange={(e) => onChangeText(e.target.value)}
              placeholder="Paste research paper text here... (Include Title, Abstract, Introduction, Methodology, Results, and Discussion for best extraction results)"
              className="w-full flex-1 mt-3 bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none resize-none font-mono leading-relaxed"
              rows={14}
            />

            {/* Footer metrics bar */}
            <div className="pt-3 mt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-3 font-mono tabular-nums">
                <span>{wordCount.toLocaleString()} words</span>
                <span aria-hidden="true">·</span>
                <span>{charCount.toLocaleString()} characters</span>
                <span aria-hidden="true">·</span>
                <span>~{readTimeMin} min read</span>
              </div>
              {wordCount > 0 && wordCount < 50 && (
                <span className="text-amber-400 text-[11px]">
                  Provide at least 50 words for thorough analysis
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Upload Dropzone & Action Panel (1 Col) */}
        <div className="space-y-4">
          {/* File Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[200px] ${
              isDragging
                ? 'border-blue-500 bg-blue-950/20'
                : 'border-slate-800 bg-[#0F172A] hover:border-slate-700 hover:bg-slate-800/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,text/plain"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="text-xs font-semibold text-white">
              Upload Research Paper (.TXT)
            </div>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
              Drag and drop your paper file here, or click to browse
            </p>
          </div>

          {/* Action Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <div className="text-xs font-semibold text-white">
                Execute AI Synthesis
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Generates 4-part summary, key information extraction, limitations, research gaps, and student keywords.
              </p>
            </div>

            {analysisError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{analysisError}</span>
              </div>
            )}

            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || wordCount < 20}
              className={`w-full py-3 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isAnalyzing
                  ? 'bg-blue-700 text-white cursor-wait opacity-80'
                  : wordCount < 20
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Paper With Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Research Paper</span>
                </>
              )}
            </button>

            {/* Active Analysis Shortcut */}
            {analysis && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Analysis Ready</span>
                </div>
                <button
                  onClick={onNavigateToSummary}
                  className="w-full flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span className="truncate font-medium">{analysis.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-blue-400 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
