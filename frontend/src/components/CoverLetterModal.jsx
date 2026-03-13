import React, { useState } from 'react';
import { X, Copy, Download, Loader, FileText, Check, Mail, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';

const CoverLetterModal = ({ analysisId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLetter = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/resume/cover-letter/${analysisId}`);
      setCoverLetter(res.data.coverLetter);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Cover_Letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Download started!');
  };

  return (
    /* Full-screen backdrop — z-index high enough to sit above everything */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-8 px-4 pb-4"
      style={{ background: 'rgba(2, 6, 23, 0.75)', backdropFilter: 'blur(10px)' }}
    >
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Panel */}
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-brand-500/30">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Cover Letter Generator</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">AI-powered · Tailored to your target career</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">

          {/* LEFT COLUMN — always visible */}
          <div className="md:w-64 flex-shrink-0 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">How it works</p>
              {[
                { step: '01', text: 'AI reads your resume strengths and identified skill gaps' },
                { step: '02', text: 'Crafts a professional letter tailored to your target career' },
                { step: '03', text: 'Addresses gaps by highlighting your learning commitment' },
              ].map(item => (
                <div key={item.step} className="flex gap-3 items-start">
                  <span className="text-[9px] font-black text-brand-500 mt-0.5">{item.step}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 mt-auto">
              {!coverLetter ? (
                <button
                  onClick={generateLetter}
                  disabled={loading}
                  className="w-full py-3 bg-brand-500 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-600 hover:shadow-lg active:scale-95 transition-all disabled:opacity-70"
                >
                  {loading
                    ? <><Loader size={14} className="animate-spin" /> Generating...</>
                    : <><Sparkles size={14} /> Generate Letter</>
                  }
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCopy}
                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
                  >
                    <Download size={14} />
                    Download .txt
                  </button>
                  <button
                    onClick={() => { setCoverLetter(''); }}
                    className="w-full py-3 text-slate-400 hover:text-slate-500 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles size={14} />
                    Regenerate
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — letter content */}
          <div className="flex-1 overflow-y-auto p-8 no-scrollbar min-h-0">
            {!coverLetter && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-16">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-700 shadow-inner">
                  <FileText size={36} />
                </div>
                <div className="space-y-2 max-w-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ready to Create</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Click "Generate Letter" to create a professional cover letter tailored to your resume analysis.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-5 py-16">
                <div className="w-16 h-16 bg-brand-500/10 rounded-3xl flex items-center justify-center">
                  <Loader size={28} className="animate-spin text-brand-500" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Writing your letter...</p>
                  <p className="text-xs text-slate-400">This usually takes 5–10 seconds</p>
                </div>
                {/* Skeleton lines */}
                <div className="w-full max-w-md space-y-3 mt-4">
                  {[100, 90, 95, 80, 85, 70].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"
                      style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {coverLetter && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Letter Generated Successfully</span>
                </div>
                {/* Letter body styled like a real document */}
                <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-[1.9] whitespace-pre-line font-serif">
                    {coverLetter}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
