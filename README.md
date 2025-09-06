# NextSum PDF

Instantly summarize and ask questions about your PDF documents. Get the key information you need without the lengthy reading. This application provides a beautiful and intuitive interface to upload a PDF, parse its contents, and get intelligent answers from Google's Gemini API based on the document's context.

## Features

-   **Secure & Private**: PDFs are parsed directly in your browser using `pdf.js`. The document's text is sent to a secure backend API, ensuring your API keys and the core logic are never exposed on the client-side. The document content is not stored on the server.
-   **Effortless PDF Upload**: A simple and clean interface to select your PDF files.
-   **Intelligent Q&A**: Ask questions in natural language and receive concise, context-aware answers based *solely* on the document's content.
-   **Powered by Gemini**: Leverages Google's powerful `gemini-2.5-flash` model via a secure backend for fast and accurate responses.
-   **Modern & Responsive UI**: A clean and visually appealing interface built with Next.js, React, and Tailwind CSS.

## How It Works

This application is built using Next.js, featuring a robust client-server architecture.

1.  **PDF Parsing (Client-Side)**: When a user uploads a PDF, the application uses the [PDF.js](https://mozilla.github.io/pdf.js/) library to parse the document and extract its text content. This entire process happens locally within the user's browser.
2.  **API Request (Client-to-Server)**: When the user submits a question, the extracted text from the PDF and the user's question are sent to a dedicated backend API route (`/api/generate`) within the Next.js application.
3.  **Gemini API Call (Server-Side)**: The backend API route securely calls the Google Gemini API with the document context and the question. Your API key is safely stored on the server and is never exposed to the user's browser.
4.  **Displaying Answers (Client-Side)**: The AI's response is sent back from the backend to the client and displayed in the user interface.

## Tech Stack

-   **Full-Stack Framework**: [Next.js](https://nextjs.org/)
-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/)
-   **AI**: [Google Gemini API](https://ai.google.dev/)

## Getting Started

To run this project locally, you will need Node.js, npm (or yarn/pnpm), and a Google Gemini API key.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or newer recommended)
-   A **Google Gemini API key**. You can obtain one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nextsum-pdf.git
    cd nextsum-pdf
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set up your environment variables:**
    Create a new file named `.env.local` in the root of your project directory. Add your Gemini API key to this file:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    The Next.js application is configured to read your key from this file.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in browser:**
    Open your web browser and navigate to `http://localhost:3000`. You should now see the application running.

##  Project Structure

Here is an overview of the key files in this Next.js project:

```
.
├── pages/
│   ├── index.tsx           # The main page of the application (React component).
│   ├── _app.tsx            # Custom App component to initialize pages.
│   ├── _document.tsx       # Custom Document to augment <html> and <body> tags.
│   └── api/
│       └── generate.ts     # The backend API route that calls the Gemini API.
├── components/             # Contains all reusable React UI components.
│   ├── AnswerDisplay.tsx
│   ├── PdfUploader.tsx
│   └── QuestionForm.tsx
├── hooks/
│   └── usePdfParser.ts     # Custom React hook for client-side PDF parsing.
├── .env.local              # File for your local environment variables (API key).
└── package.json            # Project dependencies and scripts.
```



## Contributing

Contributions are welcome!  
If you’d like to improve this project, please follow these steps:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/your-feature-name`)  
3. Make your changes and commit (`git commit -m "Add some feature"`)  
4. Push to the branch (`git push origin feature/your-feature-name`)  
5. Open a Pull Request  

---


## Developed By

**Palak Lohade**  
 Passionate about building AI-powered applications and modern web experiences.  
