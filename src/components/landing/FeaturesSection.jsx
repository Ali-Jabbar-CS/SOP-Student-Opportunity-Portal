import { motion } from 'framer-motion'
import { Target, Compass, LineChart, ShieldCheck, Zap, Network } from 'lucide-react'

const features = [
  { icon: Target,     title: 'AI-Powered Matching',      description: 'Claude AI connects students with opportunities that match their major, visa status, and background — with a match score explaining exactly why.',          for: 'Student' },
  { icon: Network,    title: 'Visa Compatibility Filter', description: 'Automatically filters out opportunities that don\'t accept your visa type — saving international students hours of heartbreak.',                         for: 'Student' },
  { icon: LineChart,  title: 'Application Tracker',       description: 'A full Kanban board to track every application from Interested to Results, with deadline reminders and progress bars.',                                    for: 'Student' },
  { icon: Compass,    title: 'Student Roster',            description: 'Manage your full student roster, view each student\'s visa status, applications, and urgent deadlines in one place.',                                       for: 'Advisor' },
  { icon: ShieldCheck, title: '"Is This Legit?" Checker', description: 'AI-powered scam detection that cross-references postings against verified databases — especially important for international students.',                    for: 'Advisor' },
  { icon: Zap,        title: 'Direct Recommendations',    description: 'Browse all opportunities and send personalized recommendations to individual students or your entire roster with a personal note.',                         for: 'Advisor' },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful tools for both sides of the journey
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400">
            Whether you're a student looking for your next big break, or an advisor seeking to guide the next generation, SOP has you covered.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-8 border border-slate-200 dark:border-navy-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-light dark:bg-brand-blue/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${f.for === 'Student'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'}`}>
                  For {f.for}s
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}