import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Search, Handshake, BookOpen, Users, Star } from 'lucide-react'

const steps = {
  student: [
    { icon: UserPlus,  title: 'Create Your Profile',      description: 'Fill in your major, visa status, ethnicity, and interests. SOP uses this to find opportunities built specifically for you.' },
    { icon: Search,    title: 'Discover Opportunities',    description: 'Browse AI-matched internships, scholarships, grants, and volunteering filtered by your visa eligibility.' },
    { icon: Handshake, title: 'Apply & Track Progress',    description: 'Apply directly, generate a personalized cover letter with AI, and track every application in your Kanban board.' },
  ],
  advisor: [
    { icon: BookOpen, title: 'Set Up Your Portal',         description: 'Sign up as an advisor, link to your institution, and add the students you work with to your roster.' },
    { icon: Users,    title: 'Monitor Your Students',      description: 'See each student\'s visa status, active applications, urgent deadlines, and overall progress at a glance.' },
    { icon: Star,     title: 'Recommend & Guide',          description: 'Browse all opportunities and send personalized recommendations with a personal note directly to your students.' },
  ],
}

export function HowItWorksSection() {
  const [tab, setTab] = useState('student')

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How SOP Works
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400">
            A streamlined process designed to make connections seamless and productive.
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 dark:bg-navy-800 p-1.5 rounded-xl inline-flex">
            {['student', 'advisor'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${tab === t
                  ? 'bg-white dark:bg-navy-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                For {t.charAt(0).toUpperCase() + t.slice(1)}s
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-8 relative z-10">
              {steps[tab].map((step, i) => (
                <div key={step.title} className="relative">
                  {i < 2 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-slate-200 dark:bg-navy-700" />}
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 border border-slate-200 dark:border-navy-700 shadow-sm relative z-10 h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-blue/20">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center mb-4 absolute -top-4 border-4 border-white dark:border-navy-800">
                      {i + 1}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}