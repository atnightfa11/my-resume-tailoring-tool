// In Results.tsx
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface ResultsProps {
  tailoredContent: string;
}

const Results = ({ tailoredContent }: ResultsProps) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async (section: string) => {
    try {
      await navigator.clipboard.writeText(section);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch {
      setCopySuccess('Failed to copy');
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tailored Results</h2>
        <button
          onClick={() => handleCopy(tailoredContent)}
          className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-sm flex items-center gap-2 transition-colors"
        >
          {copySuccess || 'Copy All'}
          {!copySuccess && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      <div className="prose max-w-none dark:prose-invert">
        <ReactMarkdown>{tailoredContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Results;
