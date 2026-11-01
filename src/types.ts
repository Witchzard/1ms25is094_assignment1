/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SummarySection {
  executiveSummary: string;
  objective: string;
  methodology: string;
  findings: string;
  conclusion: string;
}

export interface KeyResult {
  metricOrFinding: string;
  valueOrEvidence: string;
  significance: string;
}

export interface TechnologyStack {
  frameworksAndTools: string[];
  modelsOrBaselines: string[];
  datasets: string[];
  hardwareOrEnvironments: string[];
}

export interface MethodologyDetail {
  approach: string;
  architectureOrDesign: string;
  dataCollection: string;
}

export interface KeyExtraction {
  title: string;
  authors?: string;
  problem: string;
  objectives: string[];
  methodologyDetail: MethodologyDetail;
  technologies: TechnologyStack;
  keyResults: KeyResult[];
}

export interface ResearchGaps {
  statedLimitations: string[];
  unaddressedGaps: string[];
  futureDirections: string[];
}

export interface KeywordGlossaryItem {
  term: string;
  plainExplanation: string;
  academicDefinition: string;
  category: 'Architecture' | 'Algorithm' | 'Dataset' | 'Metric' | 'Concept' | 'Hardware';
}

export interface StructuredFewShotSummary {
  objective: string;
  methodology: string;
  findings: string;
  researchGap: string;
}

export interface PaperAnalysis {
  id: string;
  analyzedAt: string;
  title: string;
  wordCount: number;
  readingTimeMinutes: number;
  structuredSummary: StructuredFewShotSummary;
  summary: SummarySection;
  keyExtraction: KeyExtraction;
  researchGaps: ResearchGaps;
  keywords: KeywordGlossaryItem[];
}

export interface QnAMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundedCitations?: string[];
  confidence?: 'high' | 'partial' | 'not_in_paper';
}

export interface SamplePaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  category: string;
  abstract: string;
  fullText: string;
  precomputedAnalysis: PaperAnalysis;
}
