import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Search, Handshake, BookOpen, Users, Star } from 'lucide-react'

const steps = {
  student: [
    { icon: UserPlus,  title: 'Create Your Profile',    description: 'Fill in your major, visa status, ethnicity, and interests. SOP uses this to find opportunities built specifically for you.' },
    { icon: Search,    title: 'Discover Opportunities',  description: 'Browse AI-matched internships, scholarships, grants, and volunteering filtered by your visa eligibility.' },
    { icon: Handshake, title: 'Apply & Track Progress',  description: 'Apply directly, generate a personalized cover letter with AI, and track every application in your Kanban board.' },
  ],
  advisor: [
    { icon: BookOpen, title: 'Set Up Your Portal',       description: 'Sign up as an advisor, link to your institution, and add the students you work with to your roster.' },
    { icon: Users,    title: 'Monitor Your Students',    description: "See each student's visa status, active applications, urgent deadlines, and overall progress at a glance." },
    { icon: Star,     title: 'Recommend & Guide',        description: 'Browse all opportunities and send personalized recommendations with a personal note directly to your students.' },
  ],
}

export function HowItWorksSection({ theme }) {
  const [tab, setTab] = useState('student')
  const dark = theme === 'dark'

  return (
    <section id="how-it-works" style={{ padding: '80px 32px', background: dark ? '#0a1628' : '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 36, fontWeight: 800, color: dark ? '#fff' : '#0f172a', marginBottom: 14 }}>
            How SOP Works
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 16, color: dark ? '#64748b' : '#475569', lineHeight: 1.7 }}>
            A streamlined process designed to make connections seamless and productive.
          </motion.p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{ background: dark ? '#0f1d32' : '#f1f5f9', padding: 6, borderRadius: 14, display: 'inline-flex', gap: 4 }}>
            {['student', 'advisor'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: '10px 28px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: tab === t ? (dark ? '#1e3a5f' : '#fff') : 'transparent',
                  color: tab === t ? (dark ? '#fff' : '#0f172a') : (dark ? '#64748b' : '#64748b'),
                  boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}>
                For {t.charAt(0).toUpperCase() + t.slice(1)}s
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {steps[tab].map((step, i) => (
              <div key={step.title} style={{ position: 'relative' }}>
                <div style={{ background: dark ? '#0f1d32' : '#fff', borderRadius: 20, padding: 32, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', width: 32, height: 32, borderRadius: '50%', background: dark ? '#1e3a5f' : '#f1f5f9', border: `4px solid ${dark ? '#0a1628' : '#fff'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: dark ? '#fff' : '#0f172a' }}>{i + 1}</div>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto 20px' }}>
                    <step.icon size={28} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: dark ? '#fff' : '#0f172a', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: dark ? '#64748b' : '#475569', lineHeight: 1.7 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}