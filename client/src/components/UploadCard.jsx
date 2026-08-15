import { UploadCloud, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function UploadCard({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert('Please upload a resume and paste a job description');
      return;
    }
    onSubmit(file, jobDescription);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 shadow-lg shadow-blue-500/20">
          <Sparkles className="text-blue-400" size={30} />
        </div>
        <h2 className="text-3xl font-bold text-white">Analyze Your Resume</h2>
        <p className="mt-2 text-slate-400">Upload a PDF resume and compare it with a job description using AI.</p>
      </div>

      <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 p-10 transition hover:border-blue-400 hover:bg-slate-900/60">
        <UploadCloud className="mb-3 text-blue-400" size={42} />
        <span className="font-medium text-slate-200">Click to upload PDF resume</span>
        <span className="mt-1 text-sm text-slate-500">Only PDF files are supported</span>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
          <FileText className="text-blue-300" />
          <span className="text-sm text-blue-100">{file.name}</span>
        </div>
      )}

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={8}
        placeholder="Paste the job description here..."
        className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/40"
      >
        Analyze Resume
      </motion.button>
    </motion.form>
  )
}