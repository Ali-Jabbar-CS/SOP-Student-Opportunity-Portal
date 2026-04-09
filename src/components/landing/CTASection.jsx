import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CTASection({ theme }) {
  const navigate = useNavigate()

  return (
    <section style={{ padding: '80px 32px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
      <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: 'rgba(20,184,166,0.1)', borderRadius: '50%' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: 44, fontWeight: 800, color: '#fff', marginBottom: 18 }}>
          Ready to take the next step?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', marginBottom: 36, lineHeight: 1.7 }}>
          Join thousands of students and advisors already using SOP to build meaningful connections and advance careers.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/signup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#2563eb', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Create Student Account <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/signup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
            Register as Advisor
          </button>
        </motion.div>
      </div>
    </section>
  )
}