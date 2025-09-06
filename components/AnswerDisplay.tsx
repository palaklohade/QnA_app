import React from 'react';

interface AnswerDisplayProps {
  answer: string;
  error: string | null;
  isLoading: boolean;
}

const GeminiLogo: React.FC = () => (
    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-sky-500 mr-4 flex-shrink-0">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.75L15.3536 6.10355L18.7071 9.45711L15.3536 12.8107L12 16.1642L8.64645 12.8107L5.29289 9.45711L8.64645 6.10355L12 2.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.75 12L6.10355 15.3536L9.45711 18.7071L6.10355 22.0607L2.75 18.7071L6.10355 15.3536" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.25 12L17.8964 15.3536L14.5429 18.7071L17.8964 22.0607L21.25 18.7071L17.8964 15.3536" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

/**
 * Removes markdown-style asterisks for bold and italic formatting from a string.
 * @param text The input string.
 * @returns The cleaned string.
 */
const stripMarkdownAsterisks = (text: string) => {
    if (!text) return '';
    // The order is important: remove the longest markers first (***)
    // to avoid leaving stray asterisks. The non-greedy `.*?` ensures
    // it matches the shortest possible string between markers.
    return text
      .replace(/\*\*\*(.*?)\*\*\*/g, '$1') // bold-italic
      .replace(/\*\*(.*?)\*\*/g, '$1')   // bold
      .replace(/\*(.*?)\*/g, '$1');      // italic
};


export const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer, error, isLoading }) => {
  if (!isLoading && !error && !answer) {
    return null;
  }

  return (
    <div>
        <h3 className="text-lg font-semibold mb-2 text-white">Answer</h3>
        <div className="w-full p-4 min-h-[120px] bg-black/20 rounded-lg border border-slate-700 backdrop-blur-sm">
        {isLoading && (
            <div className="flex items-center animate-pulse">
                <div className="w-7 h-7 rounded-full bg-slate-700 mr-4 flex-shrink-0"></div>
                <div className="flex-grow space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                </div>
            </div>
        )}
        {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-red-300 font-medium">Error:</p>
                <p className="text-red-400">{error}</p>
            </div>
        )}
        {answer && !isLoading && (
            <div className="flex">
                <GeminiLogo />
                <div>
                    <div className="prose prose-slate prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
                        {stripMarkdownAsterisks(answer)}
                    </div>
                </div>
            </div>
        )}
        </div>
    </div>
  );
};