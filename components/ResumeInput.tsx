interface ResumeInputProps {
  resumeText: string;
  setResumeText: (text: string) => void;
}

const ResumeInput = ({ resumeText, setResumeText }: ResumeInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="resume" className="block mb-2 font-medium">
        Paste Your Resume
      </label>
      <textarea
        id="resume"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        className="w-full h-48 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
          focus:outline-none resize-none"
        placeholder="Paste your resume text here..."
      />
    </div>
  );
};

export default ResumeInput; 