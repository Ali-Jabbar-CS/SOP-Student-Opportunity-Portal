import { motion } from 'framer-motion'
import { Target, Compass, LineChart, ShieldCheck, Zap, Network } from 'lucide-react'

const features = [
  { icon: Target,      title: 'AI-Powered Matching',       description: 'Claude AI connects students with opportunities that match their major, visa status, and background — with a match score explaining exactly why.',       for: 'Student' },
  { icon: Network,     title: 'Visa Compatibility Filter',  description: "Automatically filters out opportunities that don't accept your visa type — saving international students hours of heartbreak.",                          for: 'Student' },
  { icon: LineChart,   title: 'Application Tracker',        description: 'A full Kanban board to track every application from Interested to Results, with deadline reminders and progress bars.',                                   for: 'Student' },
  { icon: Compass,     title: 'Student Roster',             description: "Manage your full student roster, view each student's visa status, applications, and urgent deadlines in one place.",                                      for: 'Advisor' },
  { icon: ShieldCheck, title: '"Is This Legit?" Checker',   description: 'AI-powered scam detection that cross-references postings against verified databases — especially important for international students.',                   for: 'Advisor' },
  { icon: Zap,         title: 'Direct Recommendations',     description: 'Browse all opportunities and send personalized recommendations to individual students or your entire roster with a personal note.',                        for: 'Advisor' },
]

export function FeaturesSection({ theme }) {
  const dark = theme === 'dark'

  return (
    <section id="features" style={{ padding: '80px 32px', background: dark ? '#060d1a' : '#f8fafc' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 36, fontWeight: 800, color: dark ? '#fff' : '#0f172a', marginBottom: 14 }}>
            Powerful tools for both sides of the journey
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontSize: 16, color: dark ? '#64748b' : '#475569', lineHeight: 1.7 }}>
            Whether you're a student looking for your next big break, or an advisor seeking to guide the next generation, SOP has you covered.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: dark ? '#0f1d32' : '#fff', borderRadius: 20, padding: 32, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: dark ? 'rgba(59,130,246,0.1)' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <f.icon size={22} color="#3b82f6" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: f.for === 'Student' ? 'rgba(59,130,246,0.1)' : 'rgba(20,184,166,0.1)', color: f.for === 'Student' ? '#3b82f6' : '#14b8a6' }}>
                  For {f.for}s
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: dark ? '#fff' : '#0f172a', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: dark ? '#64748b' : '#475569', lineHeight: 1.7 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}