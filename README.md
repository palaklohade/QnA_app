

# NextSum PDF

**NextSum PDF** is a mini application built with **Next.js** that allows users to upload a PDF and ask questions based on its content.  
The application extracts text from PDFs, processes it with **Google's Gemini API**, and provides intelligent answers in real time.  

---

## Objective

This project was built as part of a technical task to demonstrate skills in:  
- Building a **Next.js full-stack application**.  
- Working with **APIs for Q&A on document content**.  
- Implementing **secure backend routes**.  
- Designing a **clean, responsive frontend UI**.  

The original task specified using OpenAI + embeddings + vector DB.  
This implementation instead leverages **Gemini API** directly with the PDF’s parsed text, skipping explicit embedding/vector DB steps.  
The overall flow and architecture remain consistent with the goal of **retrieval-based document Q&A**.

---

## Features

-   **Secure & Private**: PDFs are parsed directly in your browser using `pdf.js`. Only extracted text is sent securely to the backend.  
-   **Effortless PDF Upload**: A simple, intuitive interface for selecting and processing PDF files.  
-   **Intelligent Q&A**: Ask questions in plain English and receive context-aware answers based solely on the PDF content.  
-   **Powered by Gemini**: Uses Google’s `gemini-2.5-flash` model for fast and accurate responses.  
-   **Modern & Responsive UI**: Built with Next.js, React, and Tailwind CSS for a smooth user experience.  

---

## How It Works

1. **PDF Parsing (Client-Side)**  
   - The uploaded PDF is parsed locally in the browser using [PDF.js](https://mozilla.github.io/pdf.js/).  
   - Extracted text is prepared for Q&A.  

2. **API Request (Client → Server)**  
   - User’s question + extracted PDF text are sent to a secure backend API route (`/api/generate`).  

3. **Gemini API Call (Server-Side)**  
   - The backend securely calls the Gemini API with the question and document context.  
   - Your API key is stored safely on the server and never exposed to the client.  

4. **Answer Display (Client-Side)**  
   - The AI’s response is sent back to the frontend and displayed instantly.  

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)  
- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **PDF Parsing**: [PDF.js](https://mozilla.github.io/pdf.js/)  
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)  

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)  
- A **Google Gemini API key** → [Get it here](https://aistudio.google.com/app/apikey).  

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextsum-pdf.git
   cd nextsum-pdf

2. **Install dependencies**

   ```bash
   npm install
   ````

   or

   ```bash
   yarn install
   

3. **Set up environment variables**
   Create a `.env.local` file in the project root:

   ```env
   API_KEY=YOUR_GEMINI_API_KEY_HERE
   ````

4. **Run the development server**

   ```bash
   npm run dev
   ````

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000) to use the app.



## Project Structure

````
.
├── pages/
│   ├── index.tsx         # Main UI for PDF upload and Q&A
│   ├── _app.tsx          # Custom App setup
│   ├── _document.tsx     # Custom Document structure
│   └── api/
│       └── generate.ts   # Backend API route calling Gemini
├── components/
│   ├── PdfUploader.tsx   # Upload UI
│   ├── QuestionForm.tsx  # Input for questions
│   └── AnswerDisplay.tsx # Output for answers
├── hooks/
│   └── usePdfParser.ts   # Client-side PDF parsing hook
├── .env.local            # Local API key config
└── package.json          # Project dependencies



````
## Approach

* **Backend**

  * A single secure API route (`/api/generate`) handles all queries.
  * Instead of embeddings/vector DB, the Gemini API is directly used with the entire PDF content.
  * This simplifies the architecture while maintaining reliable Q\&A functionality.

* **Frontend**

  * Provides a minimal, user-friendly interface.
  * Upload PDFs → Ask Questions → View AI Answers.
  * Uses React hooks and Tailwind for smooth interactions.

---

## Contribution

Contributions are welcome! Fork the repo, make changes, and submit a pull request.

---

##  Author

**Palak Lohade**
 Passionate about building AI-powered applications and full-stack solutions.


