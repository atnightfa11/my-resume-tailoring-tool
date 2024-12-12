'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Briefcase, Eye, Moon, Sun } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { BarChart } from './bar-chart'
import { highlightKeywords } from '@/app/utils/keyword-highlighter'

interface KeywordMatches {
  [key: string]: number;
}

export function ResumeTailoringTool() {
  const [step, setStep] = useState(1)
  const [matchPercentage, setMatchPercentage] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [tailoredResume, setTailoredResume] = useState('')
  const [keywordMatches, setKeywordMatches] = useState<KeywordMatches>({})

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleNextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, 3))
    if (step === 2) {
      // Simulate AI processing
      setTimeout(() => {
        setMatchPercentage(85)
        setTailoredResume(highlightKeywords(resume, jobDescription.split(' ')))
        setKeywordMatches({
          'Technical Skills': 90,
          'Work Experience': 80,
          'Education': 100,
          'Soft Skills': 70,
        })
      }, 1500)
    }
  }

  const handlePrevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1))
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setResume(result)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Resume Tailoring Tool</CardTitle>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <Progress value={(step / 3) * 100} className="w-full" />
        </div>
        <Tabs value={`step${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step1" disabled={step !== 1}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="step2" disabled={step !== 2}>
              <Briefcase className="mr-2 h-4 w-4" />
              Job Description
            </TabsTrigger>
            <TabsTrigger value="step3" disabled={step !== 3}>
              <Eye className="mr-2 h-4 w-4" />
              Review
            </TabsTrigger>
          </TabsList>
          <TabsContent value="step1">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <Label htmlFor="resume-upload" className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Drag and drop your resume here, or click to upload
                </Label>
                <Input id="resume-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Supported formats: PDF, DOC, DOCX, TXT</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="step2">
            <div className="space-y-4">
              <Label htmlFor="job-description">Paste the job description here:</Label>
              <Textarea 
                id="job-description" 
                placeholder="Enter the job description..." 
                className="min-h-[200px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="step3">
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-100 font-semibold">Match Percentage: {matchPercentage}%</p>
                <Progress value={matchPercentage} className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Original Resume</h3>
                  <div className="border rounded-lg p-4 h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{resume}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tailored Resume</h3>
                  <div className="border rounded-lg p-4 h-64 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: tailoredResume }} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Keyword Match Analysis</h3>
                <BarChart data={keywordMatches} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevStep} disabled={step === 1} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNextStep} disabled={step === 3}>
          {step === 3 ? 'Download Tailored Resume' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}

