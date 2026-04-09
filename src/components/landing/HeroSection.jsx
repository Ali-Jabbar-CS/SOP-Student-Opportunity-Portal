import { motion } from 'framer-motion'
import { Sparkles, Users, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light dark:bg-navy-800 text-brand-blue text-sm font-semibold mb-8 border border-brand-blue/10 dark:border-brand-blue/20">
            <Sparkles className="w-4 h-4" />
            <span>The premier network for ambitious students</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
            Your Gateway to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
              Meaningful Opportunity
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connecting driven students with the right opportunities, and empowering advisors to guide the next generation of leaders.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/signup')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:shadow-brand-blue/25 hover:-translate-y-0.5">
              <Users className="w-5 h-5" /> Get Started as Student
            </button>
            <button onClick={() => navigate('/signup')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700 text-slate-900 dark:text-white border border-slate-200 dark:border-navy-600 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5">
              <Briefcase className="w-5 h-5" /> Get Started as Advisor
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 shadow-2xl overflow-hidden">
            <div className="h-12 border-b border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-900/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="aspect-[16/9] bg-slate-100 dark:bg-navy-900 p-8 flex flex-col gap-6">
              <div className="flex gap-6 h-full">
                <div className="w-64 hidden md:flex flex-col gap-4">
                  <div className="h-8 w-32 bg-slate-200 dark:bg-navy-800 rounded-md" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-navy-800 rounded-md mt-4" />
                  <div className="h-4 w-5/6 bg-slate-200 dark:bg-navy-800 rounded-md" />
                  <div className="h-4 w-4/6 bg-slate-200 dark:bg-navy-800 rounded-md" />
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div className="h-32 w-full bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 shadow-sm" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 shadow-sm" />
                    <div className="bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}