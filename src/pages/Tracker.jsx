import { useState } from 'react'
import { KANBAN_DATA } from '../data/mockData'

const COL_META = {
  interested: { label: 'Interested', color: 'var(--blue)' },
  applying:   { label: 'Applying',   color: 'var(--amber)' },
  submitted:  { label: 'Submitted',  color: 'var(--teal)' },
  results:    { label: 'Results',    color: 'var(--purple)' },
}

export default function Tracker() {
  const [columns] = useState(KANBAN_DATA)

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
              Application Tracker
            </h2>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'var(--amber-light)', color: 'var(--amber)',
              border: '1px solid rgba(252,211,77,0.3)',
              fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
            }}>✦ Smart Reminders On</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>
            Track every application in one place
          </p>
        </div>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--blue)', color: '#fff',
          border: 'none', padding: '9px 18px', borderRadius: 9,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          + Add Application
        </button>
      </div>

      {/* Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {Object.entries(columns).map(([colKey, cards]) => {
          const meta = COL_META[colKey]
          return (
            <div key={colKey} style={{ background: 'var(--surface3)', borderRadius: 14, padding: 13 }}>

              {/* Column Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 700, color: meta.color }}>
                  {meta.label}
                </span>
                <span style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, color: 'var(--text2)',
                }}>{cards.length}</span>
              </div>

              {/* Cards */}
              {cards.map(card => (
                <div
                  key={card.id}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: 13, marginBottom: 9, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'var(--card-hover-border)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {/* Org Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, background: card.logo, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
                    }}>{card.initials}</div>
                    <span style={{ fontSize: 10, color: 'var(--text2)', fontWeight: 600 }}>{card.org}</span>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 700,
                    color: 'var(--text)', marginBottom: 7,
                  }}>{card.title}</div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                    {card.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
                        background: 'var(--blue-light)', color: 'var(--blue)',
                      }}>{t}</span>
                    ))}
                    {card.status === 'interview' && (
                      <span style={{
                        fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
                        background: 'var(--purple-light)', color: 'var(--purple)',
                      }}>Interview!</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: 10, color: card.urgent ? 'var(--coral)' : 'var(--text3)',
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>🕐 {card.deadline}</span>
                    {card.daysLeft && (
                      <span style={{
                        fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
                        background: card.urgent ? 'var(--red-light)' : 'var(--green-light)',
                        color: card.urgent ? 'var(--red)' : 'var(--green)',
                      }}>{card.daysLeft}d left</span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ height: 3, borderRadius: 2, background: 'var(--border)', marginTop: 10, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2, transition: 'width 0.3s',
                      background: card.progress === 100 ? meta.color : 'var(--green)',
                      width: `${card.progress}%`,
                    }} />
                  </div>
                </div>
              ))}

              {/* Add Button */}
              <button
                style={{
                  width: '100%', padding: 9, borderRadius: 9,
                  border: '1.5px dashed var(--border)', background: 'transparent',
                  color: 'var(--text3)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)' }}
              >
                + Add
              </button>
            </div>
          )
        })}
      </div>

      {/* Recent Scholarships */}
      <div style={{ marginTop: 28 }}>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Recent Scholarships
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { name: 'Gates Scholarship',     amount: '$10,000/yr',   deadline: 'May 15',  status: 'New',       color: 'var(--green)' },
            { name: 'Dell Scholars Program', amount: '$20,000',       deadline: 'Dec 1',   status: 'Recurring', color: 'var(--blue)'  },
            { name: 'UNCF Scholarships',     amount: 'Up to $5,000', deadline: 'Rolling', status: 'Open',      color: 'var(--amber)' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                  {s.name}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                  background: 'var(--green-light)', color: s.color,
                }}>{s.status}</span>
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
                {s.amount}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text2)' }}>🕐 {s.deadline}</span>
                <button style={{
                  background: 'var(--navy)', color: 'var(--bg)',
                  border: 'none', padding: '6px 14px', borderRadius: 8,
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Track</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}