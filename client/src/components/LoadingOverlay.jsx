import { motion } from 'framer-motion';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center shadow-2xl"
      >
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <h3 className="mt-6 text-xl font-semibold text-white">Analyzing Resume</h3>
        <p className="mt-2 text-slate-400">AI is comparing your resume with the job description...</p>
      </motion.div>
    </div>
  )
}