import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/20 p-2 shadow-lg shadow-blue-500/20">
            <Sparkles className="text-blue-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AI Resume Analyzer
            </h1>
            <p className="text-xs text-slate-400">ATS + AI Career Insights</p>
          </div>
        </div>

        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#upload" className="hover:text-white transition">Analyze</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#history" className="hover:text-white transition">History</a>
        </div>
      </div>
    </motion.nav>
  )
}