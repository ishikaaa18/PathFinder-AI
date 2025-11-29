import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Award, ChevronRight } from 'lucide-react';
import api from '../services/api';

const QuizModal = ({ skill, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [skill]);

  const fetchQuiz = async () => {
    try {
      const res = await api.post('/quiz/generate', { skill });
      setQuestions(res.data.questions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
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
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-scale-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Generating quiz for {skill}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="text-primary-500" /> {skill} Quiz
            </h2>
            {!showResult && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {questions.length === 0 ? (
            <div className="text-center py-10">
              <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load quiz</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                There was an error generating the quiz. Please try again later.
              </p>
              <button 
                onClick={onClose}
                className="btn-gradient text-white px-6 py-2 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          ) : showResult ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award size={48} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                You scored <span className="font-bold text-primary-600 dark:text-primary-400">{score}</span> out of {questions.length}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <p className="text-gray-700 dark:text-gray-200">
                  {score >= 4 ? "Excellent! You have a strong command of this skill." : 
                   score >= 3 ? "Good job! You have a solid understanding." : 
                   "Keep learning! Review the concepts and try again."}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="btn-gradient text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Close Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white leading-relaxed">
                {questions[currentQuestion]?.question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                      isAnswered
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : index === selectedAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 opacity-50'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isAnswered && index === questions[currentQuestion].correctAnswer && (
                        <CheckCircle size={20} className="text-green-500" />
                      )}
                      {isAnswered && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                        <AlertCircle size={20} className="text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 animate-fade-in">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <span className="font-bold">Explanation:</span> {questions[currentQuestion].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showResult && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="btn-gradient text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
