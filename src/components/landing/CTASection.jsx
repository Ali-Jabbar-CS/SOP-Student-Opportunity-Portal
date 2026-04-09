import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-800 dark:from-navy-800 dark:to-navy-900" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to take the next step?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of students and advisors already using SOP to build meaningful connections and advance careers.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate('/signup')}
            className="w-full sm:w-auto bg-white text-brand-blue hover:bg-slate-50 px-8 py-4 rounded-xl text-base font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Create Student Account <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/signup')}
            className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/5 px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2">
            Register as Advisor
          </button>
        </motion.div>
      </div>
    </section>
  )
}