import React, { useState, useCallback } from 'react';
import { usePdfParser } from './hooks/usePdfParser';
import { getAnswerFromPdfContext } from './services/geminiService';
import { PdfUploader } from './components/PdfUploader';
import { QuestionForm } from './components/QuestionForm';
import { AnswerDisplay } from './components/AnswerDisplay';
import { Illustration } from './components/Illustration';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { text: pdfText, isParsing, error: parseError, pageCount, parsePdf, reset: resetParser } = usePdfParser();
  
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [askError, setAskError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setAnswer('');
    setAskError(null);
    setQuestion('');
    parsePdf(selectedFile);
  }, [parsePdf]);

  const handleFileReset = useCallback(() => {
    setFile(null);
    setAnswer('');
    setAskError(null);
    setQuestion('');
    resetParser();
  }, [resetParser]);

  const handleQuestionSubmit = async (submittedQuestion: string) => {
    if (!pdfText) {
      setAskError("The PDF content has not been processed yet. Please wait or try re-uploading the file.");
      return;
    }
    setQuestion(submittedQuestion);
    setIsAsking(true);
    setAnswer('');
    setAskError(null);
    
    try {
      const result = await getAnswerFromPdfContext(pdfText, submittedQuestion);
      setAnswer(result);
    } catch (e) {
      if (e instanceof Error) {
        setAskError(e.message);
      } else {
        setAskError("An unknown error occurred.");
      }
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Background*/}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-400/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-orange-400/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <header className="container mx-auto flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-white">NextSum PDF</h1>
      </header>

      <main className="container mx-auto grid md:grid-cols-2 gap-16 items-center mt-10 md:mt-20">
        <div className="z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Unlock Insights <br /> from Your PDFs
          </h2>
          <p className="mt-4 text-slate-300 max-w-lg relative pl-4 border-l-2 border-[#F9A826]">
            Instantly summarize and ask questions about your PDF documents. Get the key information you need without the lengthy reading.
          </p>
          
          <div className="mt-8 space-y-6">
            <section>
              <PdfUploader 
                onFileSelect={handleFileSelect}
                isParsing={isParsing}
                parseError={parseError}
                pageCount={pageCount}
                file={file}
                onFileReset={handleFileReset}
              />
            </section>
            
            {file && (
              <>
                <section>
                  <QuestionForm
                    onSubmit={handleQuestionSubmit}
                    isLoading={isAsking}
                    disabled={!pdfText || isParsing}
                  />
                </section>

                <section>
                  <AnswerDisplay 
                    answer={answer}
                    error={askError}
                    isLoading={isAsking}
                  />
                </section>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <Illustration />
        </div>
      </main>
    </div>
  );
};

export default App;