import { motion } from 'framer-motion'

const stats = [
  { label: 'Active Students', value: '10,000+' },
  { label: 'Opportunities',   value: '5,000+'  },
  { label: 'Expert Advisors', value: '500+'    },
  { label: 'Success Rate',    value: '95%'     },
]

export function StatsBar({ theme }) {
  const dark = theme === 'dark'
  return (
    <section style={{ padding: '48px 32px', borderTop: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, borderBottom: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, background: dark ? '#0a1628' : '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: dark ? '#fff' : '#0f172a', marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: dark ? '#64748b' : '#64748b' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}