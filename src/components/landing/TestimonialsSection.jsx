import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  { quote: 'SOP completely changed my job search. The visa filter alone saved me from applying to 20 positions I wasn\'t eligible for. Found my NASA internship in two weeks.', name: 'Maria Rodriguez', role: 'CS Junior, SDSU — F-1 Student',           type: 'Student' },
  { quote: 'Managing student applications used to take hours. Now I can see every student\'s deadlines, send recommendations, and track their progress in one place.', name: 'Dr. Patricia Nguyen', role: 'Career Advisor, Grossmont College', type: 'Advisor' },
  { quote: "The AI cover letter builder is incredible. It knew my background and the job description and wrote something way better than I could have on my own.", name: 'Ahmed Hassan', role: 'Mechanical Eng. Junior — F-1 Student',               type: 'Student' },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by students and advisors
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400">
            Don't just take our word for it. Here's what our community has to say.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-navy-800 rounded-2xl p-8 border border-slate-200 dark:border-navy-700 shadow-sm relative">
              <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-100 dark:text-navy-700" />
              <div className="relative z-10">
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}