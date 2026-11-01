/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { PaperAnalysis, QnAMessage } from '../types.ts';

interface QnAViewProps {
  analysis: PaperAnalysis | null;
  paperText: string;
}

export const QnAView: React.FC<QnAViewProps> = ({ analysis, paperText }) => {
  const [messages, setMessages] = useState<QnAMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        analysis
          ? `Hello! I have loaded "${analysis.title}". Ask me anything about its objectives, methodology, experiments, or limitations. My answers are strictly grounded in the paper's text.`
          : 'Please load or analyze a research paper first to start asking questions grounded in its content.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick questions
  const suggestedQuestions = [
    'What was the primary research problem this paper solved?',
    'What specific methodology or architecture is proposed?',
    'Which datasets were evaluated and what were the main metrics?',
    'What are the key limitations acknowledged by the authors?',
    'How does this approach improve upon prior baselines?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || isLoading || !paperText) return;

    const userMsg: QnAMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperText,
          question: q,
          conversationHistory: messages
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const result = await response.json();

      if (result.success) {
        const assistantMsg: QnAMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: result.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedCitations: result.groundedCitations,
          confidence: result.confidence,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: QnAMessage = {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content: `Unable to answer: ${result.error || 'Server error occurred.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: 'not_in_paper',
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const networkErrorMsg: QnAMessage = {
        id: `assistant-network-${Date.now()}`,
        role: 'assistant',
        content: `Connection error: ${err.message || 'Could not contact server.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, networkErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: analysis
          ? `Conversation reset. Ask any question regarding "${analysis.title}".`
          : 'Conversation reset.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Paper Q&A Assistant</span>
            <span aria-hidden="true">·</span>
            <span>Grounded Answers Only</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Ask Questions About This Paper
          </h1>
        </div>

        <button
          onClick={handleResetChat}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Suggested Questions Strip */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Suggested Academic Inquiries
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading || !paperText}
              className="text-xs text-left px-3 py-1.5 bg-[#0B132B] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 min-h-[440px] max-h-[600px] overflow-y-auto space-y-4 flex flex-col">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-[#0B132B] border border-slate-800 text-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-slate-700/50 text-[11px] opacity-75">
                  <span className="font-semibold">
                    {isUser ? 'You' : 'Research Assistant'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums">{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="hover:text-white transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Citations if available */}
                {msg.groundedCitations && msg.groundedCitations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300 block mb-1">
                      Referenced Text Passages:
                    </span>
                    <ul className="list-disc pl-4 space-y-1">
                      {msg.groundedCitations.map((cit, cIdx) => (
                        <li key={cIdx} className="italic text-slate-400">
                          "{cit}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Grounding Status badge if not in paper */}
                {msg.confidence === 'not_in_paper' && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-300">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Topic not covered in the provided paper text</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-[#0B132B] border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex items-center gap-3">
              <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span>Searching paper text and synthesizing grounded response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={
            paperText
              ? 'Ask a question about the research paper (e.g., What was the baseline error rate?)...'
              : 'Please load a paper first to ask questions.'
          }
          disabled={!paperText || isLoading}
          className="w-full bg-[#0F172A] border border-slate-800 rounded-xl pl-4 pr-12 py-3.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!paperText || !inputQuestion.trim() || isLoading}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors"
          aria-label="Send question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
