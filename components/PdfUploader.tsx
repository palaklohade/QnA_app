
import React, { useRef, useCallback } from 'react';
import { FileIcon } from './icons';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  onFileReset: () => void;
  isParsing: boolean;
  parseError: string | null;
  pageCount: number;
  file: File | null;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ onFileSelect, onFileReset, isParsing, parseError, pageCount, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      onFileSelect(selectedFile);
    }
  };

  const resetFile = useCallback(() => {
    onFileReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileReset]);

  return (
    <div className="w-full">
      {!file ? (
        <div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-[#F9A826] text-[#0A252C] font-bold rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A252C] focus:ring-yellow-500"
          >
            Upload PDF
          </button>
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
        </div>
      ) : (
        <div className="p-4 border border-slate-700 rounded-lg bg-black/20 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center space-x-3 overflow-hidden">
            <FileIcon className="w-8 h-8 text-sky-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-100 truncate">{file.name}</p>
              <p className="text-sm text-slate-400">
                {isParsing ? `Parsing...` : (pageCount > 0 ? `${pageCount} pages` : `Ready to ask questions`)}
              </p>
            </div>
          </div>
          <button
            onClick={resetFile}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {isParsing && (
        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
          <div className="bg-sky-500 h-1.5 rounded-full animate-pulse"></div>
        </div>
      )}
      {parseError && <p className="mt-2 text-sm text-red-400">{parseError}</p>}
    </div>
  );
};
