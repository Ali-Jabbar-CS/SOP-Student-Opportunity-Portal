import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OPPS } from '../data/mockData'
import OppCard from '../components/OppCard'

const VISA_FILTERS = {
  all:   'All Opportunities',
  ok:    'F-1 / International OK',
  maybe: 'Requires CPT / OPT',
  warn:  'US Citizens Only',
}

const SIMILAR = [
  { title: 'Gates Millennium Scholars', org: 'Gates Foundation', match: 94, logo: '#0D9488', type: 'Scholarship', visa: 'ok' },
  { title: 'INROADS Internship',        org: 'INROADS',          match: 91, logo: '#7C3AED', type: 'Internship', visa: 'ok' },
  { title: 'HACU National Internship',  org: 'HACU',             match: 96, logo: '#EA580C', type: 'Internship', visa: 'ok' },
  { title: 'UNCF Scholarship',          org: 'UNCF',             match: 89, logo: '#D97706', type: 'Scholarship', visa: 'ok' },
  { title: 'Cisco ThingQbator',         org: 'Cisco',            match: 83, logo: '#0284C7', type: 'Fellowship',  visa: 'maybe' },
]

export default function Opportunities() {
  const navigate = useNavigate()
  const [typeFilter, setTypeFilter]  = useState('all')
  const [visaFilter, setVisaFilter]  = useState('all')
  const [query, setQuery]            = useState('')

  const filtered = OPPS.filter(o =>
    (typeFilter === 'all' || o.type === typeFilter) &&
    (visaFilter === 'all' || o.visaStatus === visaFilter) &&
    (!query || o.title.toLowerCase().includes(query.toLowerCase()) ||
               o.org.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Visa Filter Section */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: 16, marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16 }}>🛂</span>
          <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
            Visa Compatibility Filter
          </h4>
          <span style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'var(--amber-light)', color: 'var(--amber)',
            border: '1px solid rgba(252,211,77,0.3)',
            fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
          }}>✦ Auto-detected: F-1 Student</span>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {Object.entries(VISA_FILTERS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setVisaFilter(key)}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                border: `1.5px solid ${visaFilter === key ? 'var(--green)' : 'var(--border)'}`,
                background: visaFilter === key ? 'var(--green)' : 'var(--surface)',
                color: visaFilter === key ? '#fff' : 'var(--text2)',
                transition: 'all 0.15s',
              }}>
              {label}
            </button>
          ))}
        </div>
        {visaFilter === 'ok' && (
          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>
            ✓ Showing only opportunities that explicitly accept international / F-1 students
          </div>
        )}
        {visaFilter === 'warn' && (
          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--red)', fontWeight: 600 }}>
            ⚠ These require US citizenship — shown for reference only
          </div>
        )}
      </div>

      {/* Search + Type Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
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
              border: `1.5px solid ${typeFilter === t ? 'var(--navy)' : 'var(--border)'}`,
              background: typeFilter === t ? 'var(--navy)' : 'var(--surface)',
              color: typeFilter === t ? 'var(--bg)' : 'var(--text2)',
              transition: 'all 0.15s',
            }}>
            {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'var(--amber-light)', color: 'var(--amber)',
          border: '1px solid rgba(252,211,77,0.3)',
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
        }}>✦ {filtered.length} matched results</span>
        <span style={{ fontSize: 11, color: 'var(--text3)' }}>Sorted by match %</span>
        {visaFilter !== 'all' && (
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
            background: 'var(--green-light)', color: 'var(--green)',
          }}>Visa filter active</span>
        )}
      </div>

      {/* Opportunity Cards Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {filtered.map(o => (
            <OppCard
              key={o.id}
              opp={o}
              onCoverLetter={() => navigate('/cover-letter')}
            />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--text2)', fontSize: 14,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔎</div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
            No results found
          </div>
          <div style={{ fontSize: 12 }}>Try adjusting your filters or search term</div>
        </div>
      )}

      {/* Similar Opportunities Strip */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
            Similar to What You Viewed
          </h3>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'var(--amber-light)', color: 'var(--amber)',
            border: '1px solid rgba(252,211,77,0.3)',
            fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
          }}>✦ AI Suggestions</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {SIMILAR.map((s, i) => (
            <div
              key={i}
              style={{
                minWidth: 200, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: 13, cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--card-hover-border)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, background: s.logo, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
                }}>{s.org.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)' }}>{s.org}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                  background: 'var(--blue-light)', color: 'var(--blue)',
                }}>{s.type}</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                    background: s.visa === 'ok' ? 'var(--green-light)' : 'var(--amber-light)',
                    color: s.visa === 'ok' ? 'var(--green)' : 'var(--amber)',
                  }}>{s.visa === 'ok' ? 'Visa OK' : 'CPT Req'}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'var(--teal-light)', color: 'var(--teal)',
                    fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20,
                  }}>{s.match}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}