import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { usePdfParser } from '../hooks/usePdfParser';
import { PdfUploader } from '../components/PdfUploader';
import { QuestionForm } from '../components/QuestionForm';
import { AnswerDisplay } from '../components/AnswerDisplay';

const Home: React.FC = () => {
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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context: pdfText, question: submittedQuestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while fetching the answer.');
      }
      
      setAnswer(data.answer || '');
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
    <>
      <Head>
        <title>NextSum PDF</title>
        <meta name="description" content="Instantly summarize and ask questions about your PDF documents with NextSum PDF." />
      </Head>
      <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              NextSum PDF
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Instantly summarize and ask questions about your PDF documents. Get the key information you need without the lengthy reading.
            </p>
          </header>

          <main className="bg-white dark:bg-slate-800/50 shadow-lg rounded-xl p-6 md:p-8 space-y-6 border border-slate-200 dark:border-slate-700">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">1. Upload your PDF</h2>
              <PdfUploader 
                onFileSelect={handleFileSelect}
                onFileReset={handleFileReset}
                isParsing={isParsing}
                parseError={parseError}
                pageCount={pageCount}
                file={file}
              />
            </section>

            <div className="border-t border-slate-200 dark:border-slate-700"></div>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">2. Ask a Question</h2>
              <QuestionForm
                onSubmit={handleQuestionSubmit}
                isLoading={isAsking}
                disabled={!pdfText || isParsing}
              />
            </section>

            {(isAsking || answer || askError) && (
               <div className="border-t border-slate-200 dark:border-slate-700"></div>
            )}

            <section>
              <AnswerDisplay 
                answer={answer}
                error={askError}
                isLoading={isAsking}
              />
            </section>
          </main>
          
          <footer className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Powered by Google Gemini API. Your PDF is processed in your browser, and questions are sent to our secure backend for processing. We do not store your data.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;