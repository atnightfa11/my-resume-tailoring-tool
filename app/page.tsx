'use client';

import { useState } from 'react';
import ResumeInput from '@/components/ResumeInput';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import Results from '@/components/Results';

const Page = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/tailorResume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription })
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Resume Tailoring Tool</h1>
      <form onSubmit={handleSubmit}>
        <ResumeInput resumeText={resumeText} setResumeText={setResumeText} />
        <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading || !resumeText || !jobDescription}
        >
          {loading ? 'Processing...' : 'Get Tailored Resume'}
        </button>
      </form>
      {result && <Results tailoredContent={result} />}
    </div>
  );
};

export default Page; 