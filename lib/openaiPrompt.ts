import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrompt = (resumeText: string, jobDescription: string) => `
You are an expert ATS-optimization specialist and professional resume writer. Analyze the resume and job description, then create a perfectly formatted, ATS-friendly resume.

1. First analyze the job description for:
   - Required skills and qualifications
   - Key responsibilities
   - Industry-specific keywords
   - Company culture indicators

2. Provide your response in this exact format:

## 💡 QUICK ANALYSIS
- Top 3 strength matches
- Top 2 missing qualifications
- Key ATS keywords to include

## 📄 OPTIMIZED RESUME

[FULL NAME]
[City, State] • [Phone] • [Email] • [LinkedIn]

PROFESSIONAL SUMMARY
[3 powerful sentences highlighting relevant experience, key achievements, and skills aligned with the job]

SKILLS & EXPERTISE
• Technical Skills: [List relevant technical skills, prioritized based on job requirements]
• Industry Knowledge: [List relevant domain expertise and methodologies]
• Soft Skills: [List relevant soft skills emphasized in job description]

PROFESSIONAL EXPERIENCE

[MOST RECENT COMPANY]                                                    [DATES]
[Job Title]                                                           [Location]
• [Action verb] [quantifiable achievement] by [specific action] resulting in [measurable outcome]
• [Action verb] [quantifiable achievement] through [specific method]
• [Action verb] [project or initiative] that [measurable result]

[PREVIOUS COMPANY]                                                       [DATES]
[Job Title]                                                           [Location]
• [Action verb] [quantifiable achievement] by [specific action]
• [Action verb] [quantifiable achievement] resulting in [measurable outcome]

EDUCATION
[Degree] in [Field]
[University Name]                                                        [Year]

## ✉️ COVER LETTER

Dear Hiring Manager,

[Opening: Enthusiastic introduction mentioning specific role and company]

[Body: Connect 2-3 of your strongest achievements to their needs, using metrics]

[Closing: Strong call to action and appreciation]

Best regards,
[Name]

Resume to optimize:
${resumeText}

Target job description:
${jobDescription}
`;

export async function getTailoredResume(resumeText: string, jobDescription: string) {
  const prompt = generatePrompt(resumeText, jobDescription);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: "You are a professional career coach and resume writer who always formats responses in well-structured markdown."
      },
      {
        role: "user",
        content: prompt
      }
    ],
  });

  return response.choices[0].message?.content;
}
