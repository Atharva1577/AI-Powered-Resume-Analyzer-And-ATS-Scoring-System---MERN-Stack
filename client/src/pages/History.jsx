import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getHistory } from '../services/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading history...
      </div>
    );
  }

  return (
    <section id="history" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Analysis History
        </h2>
        <p className="mt-3 text-slate-400">
          View all previously analyzed resumes stored in MongoDB.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400 backdrop-blur-xl">
          No analysis history found. Analyze a resume first.
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={16} />
                    <span className="text-sm">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                      <div className="mb-3 flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 size={18} />
                        <span className="font-semibold">Matched Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.matchedSkills?.slice(0, 6).map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-4">
                      <div className="mb-3 flex items-center gap-2 text-rose-300">
                        <AlertTriangle size={18} />
                        <span className="font-semibold">Missing Skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.missingSkills?.slice(0, 6).map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 px-6 py-5 text-center min-w-[140px]">
                  <div className="mb-2 flex items-center gap-2 text-blue-300">
                    <TrendingUp size={18} />
                    <span className="text-sm font-medium">ATS Score</span>
                  </div>
                  <div className="text-4xl font-black text-blue-200">
                    {Math.round(Number(item.atsScore) * 100)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}