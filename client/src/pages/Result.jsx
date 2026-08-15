import { Download, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { downloadReport } from '../services/pdfReport';

function SkillChip({ text, positive = true }) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium border ${
        positive
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20'
          : 'bg-rose-500/15 text-rose-300 border-rose-400/20'
      }`}
    >
      {text}
    </span>
  )
}

export default function Result({ analysis }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-12 max-w-6xl px-6 pb-20"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AI Analysis Result
            </h2>
            <p className="mt-2 text-slate-400">
              Your resume has been evaluated against the job description.
            </p>

            {/* Download Button */}
            <button
              onClick={() => downloadReport(analysis)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 hover:shadow-blue-500/40"
            >
              <Download size={18} />
              Download Report
            </button>
          </div>

          {/* ATS Score Circle */}
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 shadow-inner shadow-blue-500/10">
            <div className="absolute inset-2 rounded-full border border-blue-400/20" />
            <div className="text-center">
              <div className="text-5xl font-black text-blue-300">
                {Math.round(Number(analysis.atsScore) * 100)}
              </div>
              <div className="text-sm text-slate-400">ATS Score</div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Matched Skills */}
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-300" />
              <h3 className="text-xl font-semibold text-emerald-200">
                Matched Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {analysis.matchedSkills?.map((skill, i) => (
                <SkillChip key={i} text={skill} positive />
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="text-rose-300" />
              <h3 className="text-xl font-semibold text-rose-200">
                Missing Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {analysis.missingSkills?.map((skill, i) => (
                <SkillChip key={i} text={skill} positive={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-300" />
            <h3 className="text-xl font-semibold text-blue-100">
              AI Suggestions
            </h3>
          </div>

          <ul className="space-y-3 text-slate-200">
            {analysis.suggestions?.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}