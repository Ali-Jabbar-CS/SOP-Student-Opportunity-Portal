import { useState } from 'react'
import { RECRUITERS } from '../data/mockData'

const FILTERS = ['All Companies', 'Visa Sponsors', 'OPT Friendly', 'Remote OK', 'Top Paying']

export default function Recruiters() {
  const [recs, setRecs]           = useState(RECRUITERS)
  const [activeFilter, setActive] = useState('All Companies')

  const toggle = (id) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, connected: !r.connected } : r))
  }

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Recruiter & Company Spotlight
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text2)' }}>
          Companies actively hiring STEM students — connect to get noticed
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 22, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: '7px 15px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `1.5px solid ${activeFilter === f ? 'var(--navy)' : 'var(--border)'}`,
              background: activeFilter === f ? 'var(--navy)' : 'var(--surface)',
              color: activeFilter === f ? 'var(--bg)' : 'var(--text2)',
              transition: 'all 0.15s',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Recruiter Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {recs.map(r => (
          <div
            key={r.id}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: 20, textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.borderColor = 'var(--card-hover-border)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            {/* Logo */}
            <div style={{
              width: 60, height: 60, borderRadius: 16, background: r.logo,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px', fontFamily: 'Sora, sans-serif',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>{r.initials}</div>

            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
              {r.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 12 }}>{r.sub}</div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 14 }}>
              {r.badges.map(b => (
                <span key={b} style={{
                  fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 20,
                  background: b.includes('Visa') || b.includes('OPT') ? 'var(--green-light)' : 'var(--blue-light)',
                  color: b.includes('Visa') || b.includes('OPT') ? 'var(--green)' : 'var(--blue)',
                }}>{b}</span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14, textAlign: 'left' }}>
              {[{ n: r.openings, l: 'Open Roles' }, { n: r.hires, l: 'STEM Hires' }].map((s, i) => (
                <div key={i} style={{ background: 'var(--surface3)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: 'var(--text2)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Connect Button */}
            <button
              onClick={e => { e.stopPropagation(); toggle(r.id) }}
              style={{
                width: '100%', padding: 9, borderRadius: 9,
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
                border: r.connected ? '1px solid var(--teal-border)' : 'none',
                background: r.connected ? 'var(--teal-light)' : 'var(--navy)',
                color: r.connected ? 'var(--teal)' : 'var(--bg)',
              }}>
              {r.connected ? '✓ Connected' : `Connect with ${r.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}