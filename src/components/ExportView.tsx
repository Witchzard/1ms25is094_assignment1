/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  FileText,
  FileCode,
  Copy,
  Check,
  Printer,
  Sparkles,
} from 'lucide-react';
import { PaperAnalysis } from '../types.ts';
import { generateTextReport, downloadFile } from '../utils/exportUtils.ts';

interface ExportViewProps {
  analysis: PaperAnalysis;
  originalText?: string;
}

export const ExportView: React.FC<ExportViewProps> = ({ analysis, originalText }) => {
  const [activePreviewFormat, setActivePreviewFormat] = useState<'txt' | 'json'>('txt');
  const [copied, setCopied] = useState(false);

  const txtContent = generateTextReport(analysis, originalText);
  const jsonContent = JSON.stringify(analysis, null, 2);

  const currentContent = activePreviewFormat === 'txt' ? txtContent : jsonContent;

  const handleDownloadTxt = () => {
    const slug = analysis.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    downloadFile(txtContent, `${slug}-research-analysis.txt`, 'text/plain');
  };

  const handleDownloadJson = () => {
    const slug = analysis.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    downloadFile(jsonContent, `${slug}-research-analysis.json`, 'application/json');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Export Center</span>
          <span aria-hidden="true">·</span>
          <span>Download & Archival</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Export & Download Research Analysis
        </h1>
        <p className="mt-2 text-xs text-slate-300">
          Save your complete research paper analysis as an academic text report or structured JSON dataset for literature reviews, citation managers, or thesis documentation.
        </p>
      </div>

      {/* Download Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* TXT Download */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Academic TXT Report
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Formatted plain-text document structured with clear academic sections, reading metrics, and student glossaries.
            </p>
          </div>
          <button
            onClick={handleDownloadTxt}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TXT File</span>
          </button>
        </div>

        {/* JSON Download */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <FileCode className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Structured JSON Dataset
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Machine-readable schema containing parsed objectives, quantitative metrics, methodology trees, and limitation arrays.
            </p>
          </div>
          <button
            onClick={handleDownloadJson}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .JSON File</span>
          </button>
        </div>

        {/* Print / Copy */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Printer className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Print / Save as PDF
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Format for standard academic printing or export directly to clean PDF using your system print dialog.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">
              Export Content Preview
            </span>
            <div className="flex items-center gap-1 p-0.5 bg-[#0B132B] rounded-lg border border-slate-800">
              <button
                onClick={() => setActivePreviewFormat('txt')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activePreviewFormat === 'txt'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TXT Format
              </button>
              <button
                onClick={() => setActivePreviewFormat('json')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activePreviewFormat === 'json'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JSON Schema
              </button>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Content</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 bg-[#0B132B] border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto max-h-[460px] leading-relaxed whitespace-pre-wrap">
          {currentContent}
        </pre>
      </div>
    </div>
  );
};
