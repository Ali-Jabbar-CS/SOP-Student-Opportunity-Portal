import { useState } from 'react'

export default function OppCard({ opp, onShare, onCoverLetter }) {
  const [saved, setSaved] = useState(false)

  const visaColors = {
    ok:    { bg: 'var(--green-light)',  color: 'var(--green)' },
    maybe: { bg: 'var(--amber-light)', color: 'var(--amber)' },
    warn:  { bg: 'var(--red-light)',   color: 'var(--red)'   },
  }

  const tagColors = ['var(--blue-light)', 'var(--green-light)', 'var(--amber-light)']
  const tagText   = ['var(--blue)',       'var(--green)',       'var(--amber)'      ]

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 16, padding: 18, cursor: 'pointer', transition: 'all 0.2s',
      position: 'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--card-hover-border)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: opp.logo, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
          }}>{opp.initials}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'Sora, sans-serif' }}>{opp.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)' }}>{opp.org} • {opp.location}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            background: 'var(--teal-light)', color: 'var(--teal)',
            border: '1px solid var(--teal-border)',
            fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
          }}>◎ {opp.match}%</span>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
            background: visaColors[opp.visaStatus]?.bg,
            color: visaColors[opp.visaStatus]?.color,
          }}>🛂 {opp.visaLabel}</span>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
        {opp.tags.map((t, i) => (
          <span key={t} style={{
            padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
            background: tagColors[i % tagColors.length],
            color: tagText[i % tagText.length],
          }}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 11, fontWeight: 500,
          color: opp.urgent ? 'var(--coral)' : 'var(--text3)',
        }}>
          🕐 Due {opp.deadline}
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <button
            onClick={e => { e.stopPropagation(); setSaved(!saved) }}
            style={{
              width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
              border: `1px solid ${saved ? 'rgba(252,211,77,0.4)' : 'var(--border)'}`,
              background: saved ? 'var(--amber-light)' : 'var(--surface)',
              color: saved ? 'var(--amber)' : 'var(--text2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>
            {saved ? '🔖' : '🔖'}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onShare && onShare(opp) }}
            style={{
              width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>
            ↗
          </button>
          <button
            onClick={e => { e.stopPropagation(); onCoverLetter && onCoverLetter(opp) }}
            style={{
              width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
              border: '1px solid var(--amber)', background: 'var(--surface)',
              color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>
            ✎
          </button>
          <button
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--navy)', color: 'var(--bg)',
              border: 'none', padding: '6px 14px', borderRadius: 8,
              fontSize: 11, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}