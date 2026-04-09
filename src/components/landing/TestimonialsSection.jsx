import { motion } from 'framer-motion'

const testimonials = [
  { quote: "SOP completely changed my job search. The visa filter alone saved me from applying to 20 positions I wasn't eligible for. Found my NASA internship in two weeks.", name: 'Maria Rodriguez',    role: 'CS Junior, SDSU — F-1 Student'          },
  { quote: "Managing student applications used to take hours. Now I can see every student's deadlines, send recommendations, and track their progress in one place.",         name: 'Dr. Patricia Nguyen', role: 'Career Advisor, Grossmont College'        },
  { quote: "The AI cover letter builder is incredible. It knew my background and the job description and wrote something way better than I could have on my own.",             name: 'Ahmed Hassan',        role: 'Mechanical Eng. Junior — F-1 Student'    },
]

export function TestimonialsSection({ theme }) {
  const dark = theme === 'dark'

  return (
    <section id="testimonials" style={{ padding: '80px 32px', background: dark ? '#060d1a' : '#f8fafc' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 36, fontWeight: 800, color: dark ? '#fff' : '#0f172a', marginBottom: 14 }}>
            Trusted by students and advisors
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 16, color: dark ? '#64748b' : '#475569' }}>
            Don't just take our word for it. Here's what our community has to say.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: dark ? '#0f1d32' : '#fff', borderRadius: 20, padding: 32, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }}>
              <p style={{ fontSize: 15, color: dark ? '#cbd5e1' : '#334155', lineHeight: 1.8, marginBottom: 24 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dark ? '#fff' : '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: dark ? '#64748b' : '#64748b' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}