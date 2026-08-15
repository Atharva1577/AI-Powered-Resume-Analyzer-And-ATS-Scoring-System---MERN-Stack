import { useState } from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import UploadCard from './components/UploadCard';
import LoadingOverlay from './components/LoadingOverlay';
import Result from './pages/Result';
import { analyzeResume } from './services/api';
import History from './pages/History';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async (file, jobDescription) => {
    try {
      setLoading(true);
      const data = await analyzeResume(file, jobDescription);
      setAnalysis(data.analysis);
    } catch (error) {
  console.error('FRONTEND ERROR:', error);
  alert(error.response?.data?.error || error.message);
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <Navbar />

      <section className="px-6 py-20 text-center">
        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          Get an <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">AI ATS Score</span> in Seconds
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Upload your resume, compare it with a job description, and receive instant AI-powered insights.
        </p>
      </section>

      <UploadCard onSubmit={handleAnalyze} />

      {analysis && <Result analysis={analysis} />}
      <History />

      {loading && <LoadingOverlay />}
    </div>
  )
}