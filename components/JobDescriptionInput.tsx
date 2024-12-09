interface JobDescriptionInputProps {
    jobDescription: string;
    setJobDescription: (text: string) => void;
  }
  
  const JobDescriptionInput = ({ jobDescription, setJobDescription }: JobDescriptionInputProps) => {
    return (
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block mb-2 font-medium">
          Paste Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-48 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
            focus:outline-none resize-none"
          placeholder="Paste the job description here..."
        />
      </div>
    );
  };
  
  export default JobDescriptionInput;