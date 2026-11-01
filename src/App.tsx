/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { PaperInputView } from './components/PaperInputView.tsx';
import { SummaryView } from './components/SummaryView.tsx';
import { KeyExtractionView } from './components/KeyExtractionView.tsx';
import { QnAView } from './components/QnAView.tsx';
import { ResearchGapsView } from './components/ResearchGapsView.tsx';
import { KeywordsView } from './components/KeywordsView.tsx';
import { ExportView } from './components/ExportView.tsx';
import { SAMPLE_PAPERS } from './data/samplePapers.ts';
import { SamplePaper, PaperAnalysis } from './types.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('input');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [samples, setSamples] = useState<SamplePaper[]>(SAMPLE_PAPERS);

  // Initialize with the first sample paper for immediate interactive exploration
  const initialSample = SAMPLE_PAPERS[0];
  const [activeSampleId, setActiveSampleId] = useState<string | undefined>(initialSample.id);
  const [paperTitle, setPaperTitle] = useState(initialSample.title);
  const [paperText, setPaperText] = useState(initialSample.fullText);
  const [analysis, setAnalysis] = useState<PaperAnalysis | null>(initialSample.precomputedAnalysis);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Fetch sample papers list if backend provides additional papers
  useEffect(() => {
    fetch('/api/sample-papers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.papers) {
          // Keep current precomputed analyses attached
          const merged = SAMPLE_PAPERS;
          setSamples(merged);
        }
      })
      .catch((err) => {
        console.warn('Using client-bundled sample papers:', err);
      });
  }, []);

  const handleSelectSample = (sample: SamplePaper) => {
    setActiveSampleId(sample.id);
    setPaperTitle(sample.title);
    setPaperText(sample.fullText);
    setAnalysis(sample.precomputedAnalysis);
    setAnalysisError(null);
  };

  const handleNewPaper = () => {
    setActiveSampleId(undefined);
    setPaperTitle('');
    setPaperText('');
    setAnalysis(null);
    setAnalysisError(null);
    setActiveTab('input');
  };

  const handleAnalyze = async () => {
    if (!paperText || paperText.trim().length < 40) {
      setAnalysisError('Please enter at least 40 characters of paper text.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperText,
          paperTitle: paperTitle.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setAnalysis(result.data);
        if (result.data.title && !paperTitle) {
          setPaperTitle(result.data.title);
        }
        // Switch to summary tab to view results immediately
        setActiveTab('summary');
      } else {
        setAnalysisError(result.error || 'Failed to analyze paper.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Connection to analysis backend failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-sans">
      {/* Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
        analysis={analysis}
        samples={samples}
        onSelectSample={handleSelectSample}
        activeSampleId={activeSampleId}
      />

      {/* Main Workspace Frame (offset by sidebar width on lg screens) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenMobile={() => setIsOpenMobile(true)}
          hasAnalysis={Boolean(analysis)}
          onNewPaper={handleNewPaper}
          isAnalyzing={isAnalyzing}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'input' && (
            <PaperInputView
              paperText={paperText}
              onChangeText={(text) => {
                setPaperText(text);
                setActiveSampleId(undefined);
              }}
              paperTitle={paperTitle}
              onChangeTitle={setPaperTitle}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              analysisError={analysisError}
              samples={samples}
              onSelectSample={handleSelectSample}
              activeSampleId={activeSampleId}
              analysis={analysis}
              onNavigateToSummary={() => setActiveTab('summary')}
            />
          )}

          {activeTab === 'summary' && analysis && (
            <SummaryView
              analysis={analysis}
              onNavigateToExtraction={() => setActiveTab('extraction')}
              onNavigateToQnA={() => setActiveTab('qna')}
            />
          )}

          {activeTab === 'extraction' && analysis && (
            <KeyExtractionView
              analysis={analysis}
              onNavigateToGaps={() => setActiveTab('gaps')}
            />
          )}

          {activeTab === 'qna' && (
            <QnAView analysis={analysis} paperText={paperText} />
          )}

          {activeTab === 'gaps' && analysis && (
            <ResearchGapsView
              analysis={analysis}
              onNavigateToKeywords={() => setActiveTab('keywords')}
            />
          )}

          {activeTab === 'keywords' && analysis && (
            <KeywordsView
              analysis={analysis}
              onNavigateToExport={() => setActiveTab('export')}
            />
          )}

          {activeTab === 'export' && analysis && (
            <ExportView analysis={analysis} originalText={paperText} />
          )}
        </main>
      </div>
    </div>
  );
}
