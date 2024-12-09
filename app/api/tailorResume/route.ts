import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generatePrompt } from '@/lib/openaiPrompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
    }

    const prompt = generatePrompt(resumeText, jobDescription);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ 
      result: response.choices[0].message.content 
    });
    
  } catch (error) {
    console.error('Error in tailorResume:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}