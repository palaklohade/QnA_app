import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI } from "@google/genai";

type ResponseData = {
  answer?: string;
  error?: string;
};

// This function is the handler for the API route.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { context, question } = req.body;

  if (!context || !question) {
    return res.status(400).json({ error: 'PDF context and question must be provided.' });
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error("API_KEY environment variable not set.");
    return res.status(500).json({ error: 'API key is not configured. Please contact the administrator.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // A generous but safe limit to avoid overly large payloads.
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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    res.status(200).json({ answer: response.text });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(500).json({ error: `An error occurred while communicating with the AI: ${errorMessage}` });
  }
}
