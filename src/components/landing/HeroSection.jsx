import { motion } from 'framer-motion'
import { Sparkles, Users, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function HeroSection({ theme }) {
  const navigate = useNavigate()
  const dark = theme === 'dark'

  return (
    <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 999, background: dark ? '#0f1d32' : '#eff6ff', color: '#3b82f6', fontSize: 13, fontWeight: 600, marginBottom: 32, border: '1px solid rgba(59,130,246,0.2)' }}>
          <Sparkles size={14} />
          The premier network for ambitious students
        </motion.div>

        {/* Heading */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, color: dark ? '#fff' : '#0f172a', marginBottom: 28, letterSpacing: -1 }}>
          Your Gateway to{' '}
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Meaningful Opportunity
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: 18, color: dark ? '#94a3b8' : '#475569', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Connecting driven students with the right opportunities, and empowering advisors to guide the next generation of leaders.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/signup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}>
            <Users size={18} /> Get Started as Student
          </button>
          <button onClick={() => navigate('/signup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? '#0f1d32' : '#fff', color: dark ? '#fff' : '#0f172a', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
            <Briefcase size={18} /> Get Started as Advisor
          </button>
        </motion.div>

        {/* Browser mockup */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: 60, maxWidth: 900, margin: '60px auto 0' }}>
          <div style={{ borderRadius: 16, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, background: dark ? '#0f1d32' : '#fff', boxShadow: '0 25px 60px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
            <div style={{ height: 44, borderBottom: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, background: dark ? '#0a1628' : '#f8fafc', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f87171' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399' }} />
            </div>
            <div style={{ aspectRatio: '16/9', background: dark ? '#0a1628' : '#f1f5f9', padding: 28, display: 'flex', gap: 20 }}>
              <div style={{ width: 180, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 28, width: '70%', background: dark ? '#0f1d32' : '#e2e8f0', borderRadius: 6 }} />
                <div style={{ height: 12, width: '100%', background: dark ? '#0f1d32' : '#e2e8f0', borderRadius: 4, marginTop: 12 }} />
                <div style={{ height: 12, width: '80%', background: dark ? '#0f1d32' : '#e2e8f0', borderRadius: 4 }} />
                <div style={{ height: 12, width: '60%', background: dark ? '#0f1d32' : '#e2e8f0', borderRadius: 4 }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ height: 100, background: dark ? '#0f1d32' : '#fff', borderRadius: 12, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }} />
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: dark ? '#0f1d32' : '#fff', borderRadius: 12, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }} />
                  <div style={{ background: dark ? '#0f1d32' : '#fff', borderRadius: 12, border: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}