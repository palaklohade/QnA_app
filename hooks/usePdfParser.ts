
import { useState, useCallback } from 'react';

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export const usePdfParser = () => {
    const [text, setText] = useState<string>('');
    const [isParsing, setIsParsing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);

    const parsePdf = useCallback(async (file: File) => {
        if (!file) return;

        setIsParsing(true);
        setError(null);
        setText('');
        setPageCount(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPageCount(pdf.numPages);
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
            setText(fullText);
        } catch (e) {
            console.error("Error parsing PDF:", e);
            setError("Failed to parse the PDF file. Please ensure it's a valid PDF.");
        } finally {
            setIsParsing(false);
        }
    }, []);

    const reset = useCallback(() => {
        setText('');
        setError(null);
        setIsParsing(false);
        setPageCount(0);
    }, []);

    return { text, isParsing, error, pageCount, parsePdf, reset };
};
