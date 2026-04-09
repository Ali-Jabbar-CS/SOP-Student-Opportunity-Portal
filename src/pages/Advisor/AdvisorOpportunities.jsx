import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const STUDENTS = [
  { name: 'Maria Rodriguez', initials: 'MR', color: '#2563EB', visa: 'F-1'  },
  { name: 'James Okafor',    initials: 'JO', color: '#0D9488', visa: 'F-1'  },
  { name: 'Sofia Chen',      initials: 'SC', color: '#7C3AED', visa: 'J-1'  },
  { name: 'Ahmed Hassan',    initials: 'AH', color: '#EA580C', visa: 'F-1'  },
  { name: 'Priya Patel',     initials: 'PP', color: '#16A34A', visa: 'OPT'  },
  { name: 'Luis Morales',    initials: 'LM', color: '#D97706', visa: 'DACA' },
]

const VISA_FILTERS = {
  all:   'All Opportunities',
  ok:    'International OK',
  maybe: 'Requires CPT/OPT',
  warn:  'US Citizens Only',
}

export default function AdvisorOpportunities() {
  const [opps, setOpps]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [typeFilter, setTypeFilter] = useState('all')
  const [visaFilter, setVisaFilter] = useState('all')
  const [query, setQuery]           = useState('')
  const [recommending, setRec]      = useState(null)
  const [selectedStudents, setSel]  = useState([])
  const [note, setNote]             = useState('')
  const [sent, setSent]             = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      if (!error) setOpps(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = opps.filter(o =>
    (typeFilter === 'all' || o.type === typeFilter) &&
    (visaFilter === 'all' || o.visa_status === visaFilter) &&
    (!query ||
      o.title.toLowerCase().includes(query.toLowerCase()) ||
      o.org.toLowerCase().includes(query.toLowerCase()))
  )

  const toggleStudent = (name) => {
    setSel(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name])
  }

  const sendRec = () => {
    setSent(true)
    setTimeout(() => { setSent(false); setRec(null); setSel([]); setNote('') }, 2000)
  }

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Opportunity Browser
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text2)' }}>
          Browse and recommend opportunities directly to your students
        </p>
      </div>

      {/* Visa Filter */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: 16, marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16 }}>🛂</span>
          <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
            Filter by Visa Eligibility
          </h4>
          <span style={{
            marginLeft: 'auto', fontSize: 11, fontWeight: 700,
            background: 'var(--green-light)', color: 'var(--green)',
            padding: '3px 10px', borderRadius: 20,
          }}>Advisor View — All Statuses</span>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {Object.entries(VISA_FILTERS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setVisaFilter(key)}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                border: `1.5px solid ${visaFilter === key ? '#0F2D1F' : 'var(--border)'}`,
                background: visaFilter === key ? '#0F2D1F' : 'var(--surface)',
                color: visaFilter === key ? '#fff' : 'var(--text2)',
                transition: 'all 0.15s',
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Type Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search opportunities, orgs..."
            style={{
              width: '100%', padding: '8px 14px 8px 34px',
              borderRadius: 9, border: '1.5px solid var(--border)',
              fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
              background: 'var(--surface)', color: 'var(--text)', outline: 'none',
            }}
          />
        </div>
        {['all', 'internship', 'scholarship', 'grant', 'volunteering'].map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{
              padding: '7px 15px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `1.5px solid ${typeFilter === t ? '#0F2D1F' : 'var(--border)'}`,
              background: typeFilter === t ? '#0F2D1F' : 'var(--surface)',
              color: typeFilter === t ? '#fff' : 'var(--text2)',
              transition: 'all 0.15s',
            }}>
            {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'var(--amber-light)', color: 'var(--amber)',
          border: '1px solid rgba(252,211,77,0.3)',
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
        }}>✦ {loading ? '...' : `${filtered.length} opportunities`}</span>
        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Live from database</span>
      </div>

      {/* Opportunity Cards */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: 18, height: 180,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}>
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
              <div style={{ width: '60%', height: 14, background: 'var(--border)', borderRadius: 7, marginBottom: 10 }} />
              <div style={{ width: '40%', height: 10, background: 'var(--border)', borderRadius: 5 }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {filtered.map((o, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)', border: `1.5px solid ${recommending?.id === o.id ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 16, padding: 18, transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (recommending?.id !== o.id) e.currentTarget.style.borderColor = 'var(--card-hover-border)' }}
              onMouseLeave={e => { if (recommending?.id !== o.id) e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: o.logo_color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif', flexShrink: 0,
                  }}>{o.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'Sora, sans-serif' }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>{o.org} • {o.location}</div>
                  </div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, flexShrink: 0,
                  background: o.visa_status === 'ok' ? 'var(--green-light)' : o.visa_status === 'maybe' ? 'var(--amber-light)' : 'var(--red-light)',
                  color: o.visa_status === 'ok' ? 'var(--green)' : o.visa_status === 'maybe' ? 'var(--amber)' : 'var(--red)',
                }}>🛂 {o.visa_label}</span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {(o.tags || []).map((t, ti) => (
                  <span key={ti} style={{
                    padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                    background: ti === 0 ? 'var(--blue-light)' : ti === 1 ? 'var(--green-light)' : 'var(--amber-light)',
                    color: ti === 0 ? 'var(--blue)' : ti === 1 ? 'var(--green)' : 'var(--amber)',
                  }}>{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  🕐 Due {o.deadline} • {o.stipend}
                </div>
                <button
                  onClick={() => setRec(recommending?.id === o.id ? null : o)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', border: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif',
                    background: recommending?.id === o.id ? 'var(--green)' : '#0F2D1F',
                    color: '#fff', transition: 'background 0.15s',
                  }}>
                  {recommending?.id === o.id ? '✓ Recommending' : '📨 Recommend'}
                </button>
              </div>

              {/* Recommend Panel — expands inline */}
              {recommending?.id === o.id && (
                <div style={{
                  marginTop: 14, padding: 14,
                  background: 'var(--surface3)', borderRadius: 10,
                  border: '1px solid var(--border)',
                }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                    Select students to recommend this to:
                  </p>

                  {/* Student Selector */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
                    {STUDENTS.map(s => (
                      <button
                        key={s.name}
                        onClick={() => toggleStudent(s.name)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                          border: `1.5px solid ${selectedStudents.includes(s.name) ? s.color : 'var(--border)'}`,
                          background: selectedStudents.includes(s.name) ? s.color + '22' : 'var(--surface)',
                          color: selectedStudents.includes(s.name) ? s.color : 'var(--text2)',
                          transition: 'all 0.15s',
                        }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', background: s.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0,
                        }}>{s.initials}</div>
                        {s.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Note */}
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Add a personal note (optional)..."
                    style={{
                      width: '100%', minHeight: 60, padding: '9px 12px', marginBottom: 10,
                      border: '1.5px solid var(--border)', borderRadius: 9,
                      fontSize: 11, fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: 'var(--text)', background: 'var(--surface)',
                      outline: 'none', resize: 'vertical', lineHeight: 1.6,
                    }}
                  />

                  {/* Send */}
                  <button
                    onClick={sendRec}
                    disabled={selectedStudents.length === 0}
                    style={{
                      width: '100%', padding: '9px 0', borderRadius: 9, border: 'none',
                      fontSize: 12, fontWeight: 700, cursor: selectedStudents.length === 0 ? 'not-allowed' : 'pointer',
                      background: sent ? 'var(--green)' : selectedStudents.length === 0 ? 'var(--border)' : '#0F2D1F',
                      color: selectedStudents.length === 0 ? 'var(--text3)' : '#fff',
                      fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'background 0.2s',
                    }}>
                    {sent
                      ? `✓ Sent to ${selectedStudents.length} student${selectedStudents.length > 1 ? 's' : ''}!`
                      : selectedStudents.length === 0
                        ? 'Select at least one student'
                        : `📨 Send to ${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''}`
                    }
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}