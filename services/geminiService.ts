
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  
  console.error("API_KEY environment variable not set. Please set it in your environment.");
  
  throw new Error("API key is not configured. Please contact the administrator.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAnswerFromPdfContext = async (context: string, question: string): Promise<string> => {
  if (!context || !question) {
    throw new Error("PDF context and question must be provided.");
  }
  
  
  const maxContextLength = 300000; 
  const truncatedContext = context.length > maxContextLength ? context.substring(0, maxContextLength) : context;

  const prompt = `
    Based on the following document content, please provide a concise and accurate answer to the user's question.
    Your answer should be based solely on the information within the document.
    If the answer cannot be found in the document, explicitly state that the information is not available in the provided text.
    Do not use any external knowledge or make assumptions beyond the document's content.

    --- DOCUMENT CONTENT ---
    ${truncatedContext}
    --- END OF DOCUMENT ---

    USER'S QUESTION: "${question}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI. This might be due to a network issue or an API configuration problem. Details: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the AI.";
  }
};
