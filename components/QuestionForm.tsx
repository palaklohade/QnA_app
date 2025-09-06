
import React, { useState } from 'react';
import { PaperAirplaneIcon, SpinnerIcon } from './icons';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, isLoading, disabled }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading && !disabled) {
      onSubmit(question);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="question-input" className="block text-lg font-semibold mb-2 text-white">Ask a Question</label>
      <div className="relative">
        <textarea
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., What is the main conclusion of the document?"
          rows={3}
          disabled={disabled || isLoading}
          className="w-full p-4 pr-16 text-slate-100 bg-black/20 border border-slate-700 rounded-lg focus:ring-2 focus:ring-[#F9A826] focus:border-[#F9A826] focus:outline-none transition-shadow disabled:opacity-50 disabled:cursor-not-allowed resize-none backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !question.trim()}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-[#F9A826] text-[#0A252C] hover:bg-yellow-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          aria-label="Submit question"
        >
          {isLoading ? <SpinnerIcon className="w-5 h-5" /> : <PaperAirplaneIcon className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};
