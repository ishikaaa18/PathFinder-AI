// src/components/QuizModal.jsx
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, ChevronRight, Zap, Target, Loader2, Info } from 'lucide-react';
import api from '../services/api';

const QuizModal = ({ skill, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [skill]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/quiz/generate', { skill });
      if (res.data && Array.isArray(res.data.questions)) {
        setQuestions(res.data.questions);
      } else {
        throw new Error("Invalid assessment format.");
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError(err.message || 'Loading error.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center animate-edu-in max-w-xs w-full">
          <Loader2 className="animate-spin text-brand-500 mb-4" size={32} />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Loading {skill} quiz...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] w-full max-w-lg shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 flex flex-col mt-12 mb-12 animate-edu-in hover-glow transition-all duration-500">
        
        {/* Slim progress bar */}
        {!showResult && (
           <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 relative">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }} 
              />
           </div>
        )}

        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brand-500/10 dark:bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-500">
               <Zap size={16} fill="currentColor" />
            </div>
            <div className="leading-tight">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {skill} Quiz
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Focused Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {error ? (
            <div className="text-center py-10 space-y-4">
              <AlertCircle size={32} className="mx-auto text-rose-500" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">{error}</p>
              <button 
                onClick={onClose} 
                className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold uppercase"
              >
                Return
              </button>
            </div>
          ) : showResult ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/20">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Quiz Finished</h3>
              <div className="mt-6 mb-8 inline-block px-10 py-5 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Score</p>
                   <p className="text-4xl font-black text-brand-500 tracking-tighter">{score} <span className="text-xl text-slate-300">/ {questions.length}</span></p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic mb-10 max-w-xs mx-auto leading-relaxed">
                {score >= 4 ? "Great job! Your profile has been updated." : "Quiz completed. Your profile has been updated."}
              </p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-[0_15px_30px_-5px_rgba(240,101,67,0.3)]"
              >
                Save Results
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed tracking-tight">
                {questions[currentQuestion]?.question}
              </h3>
 
              <div className="space-y-3">
                {Array.isArray(questions[currentQuestion]?.options) && questions[currentQuestion]?.options.map((option, index) => {
                  const displayText = typeof option === 'string' ? option : Object.values(option)[0];
                  const isCorrect = index === questions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;
 
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full p-5 rounded-2xl text-left transition-all border flex items-center justify-between text-xs font-medium group ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold'
                            : isSelected
                              ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-300 font-bold'
                              : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-400'
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-brand-500/50 hover:bg-slate-50/50 hover:translate-x-1 shadow-sm'
                      }`}
                    >
                      <span className="pr-4 leading-relaxed">{displayText}</span>
                      {isAnswered && (
                        <div className="shrink-0">
                          {isCorrect ? <CheckCircle size={18} className="text-emerald-500" /> : isSelected ? <AlertCircle size={18} className="text-rose-500" /> : null}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
  
              {isAnswered && (
                <div className="bg-brand-50/30 dark:bg-brand-500/5 p-6 rounded-2xl border border-brand-100 dark:border-brand-500/10 space-y-2 animate-edu-in">
                  <div className="flex items-center gap-2 text-brand-500 font-bold text-[10px] uppercase tracking-widest">
                    <Info size={12} /> Explanation
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
 
        {/* Compact Footer */}
        {!showResult && (
          <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 transition-all hover:bg-brand-500 hover:text-white"
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
