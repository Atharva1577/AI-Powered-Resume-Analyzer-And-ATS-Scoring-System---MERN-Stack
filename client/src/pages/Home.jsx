import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';
import UploadCard from '../components/UploadCard';
import Result from './Result';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (file, jobDescription) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const res = await axios.post(
        'http://localhost:5000/api/analyze/upload',
        formData
      );

      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      alert('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <Navbar />

      <section className="px-6 py-16 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight md:text-7xl">
          Get an <span className="gradient-text">AI ATS Score</span> in Seconds
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Upload your resume, compare it with a job description, and receive instant AI-powered insights, skill-gap analysis, and recruiter-ready suggestions.
        </p>
      </section>

      <UploadCard onSubmit={handleSubmit} loading={loading} />

      {result && <Result analysis={result} />}
    </div>
  );
}