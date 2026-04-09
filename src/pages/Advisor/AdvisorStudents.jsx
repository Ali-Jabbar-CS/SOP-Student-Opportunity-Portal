import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STUDENTS = [
  { name: 'Maria Rodriguez', major: 'Computer Science',  visa: 'F-1',  year: 'Junior',    apps: 6, urgent: 2, initials: 'MR', color: '#2563EB', school: 'SDSU',       interests: ['Internships','Scholarships'],       status: 'active' },
  { name: 'James Okafor',    major: 'Electrical Eng.',   visa: 'F-1',  year: 'Senior',    apps: 3, urgent: 1, initials: 'JO', color: '#0D9488', school: 'SDSU',       interests: ['Internships','Research'],           status: 'active' },
  { name: 'Sofia Chen',      major: 'Data Science',      visa: 'J-1',  year: 'Sophomore', apps: 4, urgent: 0, initials: 'SC', color: '#7C3AED', school: 'UC San Diego', interests: ['Research','Fellowships'],          status: 'active' },
  { name: 'Ahmed Hassan',    major: 'Mechanical Eng.',   visa: 'F-1',  year: 'Junior',    apps: 2, urgent: 1, initials: 'AH', color: '#EA580C', school: 'SDSU',       interests: ['Internships','Co-ops'],             status: 'active' },
  { name: 'Priya Patel',     major: 'Biomedical Eng.',   visa: 'OPT',  year: 'Graduate',  apps: 7, urgent: 3, initials: 'PP', color: '#16A34A', school: 'SDSU',       interests: ['Research','Grants','Fellowships'],  status: 'active' },
  { name: 'Luis Morales',    major: 'Civil Eng.',        visa: 'DACA', year: 'Senior',    apps: 1, urgent: 0, initials: 'LM', color: '#D97706', school: 'Grossmont',  interests: ['Internships'],                     status: 'inactive' },
]

const VISA_COLORS = {
  'F-1':  { bg: 'var(--blue-light)',   color: 'var(--blue)'   },
  'J-1':  { bg: 'var(--purple-light)', color: 'var(--purple)' },
  'OPT':  { bg: 'var(--green-light)',  color: 'var(--green)'  },
  'DACA': { bg: 'var(--amber-light)',  color: 'var(--amber)'  },
}

export default function AdvisorStudents() {
  const navigate              = useNavigate()
  const [query, setQuery]     = useState('')
  const [visaFilter, setVisa] = useState('all')
  const [selected, setSelected] = useState(null)
  const [noteText, setNote]   = useState('')
  const [noteSent, setNoteSent] = useState(false)

  const filtered = STUDENTS.filter(s =>
    (visaFilter === 'all' || s.visa === visaFilter) &&
    (!query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.major.toLowerCase().includes(query.toLowerCase()))
  )

  const sendRecommendation = () => {
    setNoteSent(true)
    setTimeout(() => { setNoteSent(false); setSelected(null); setNote('') }, 2000)
  }

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            My Students
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text2)' }}>
            Manage your student roster and send opportunity recommendations
          </p>
        </div>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#0F2D1F', color: '#fff',
          border: 'none', padding: '9px 18px', borderRadius: 9,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>+ Add Student</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search students or majors..."
            style={{
              width: '100%', padding: '8px 14px 8px 34px',
              borderRadius: 9, border: '1.5px solid var(--border)',
              fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
              background: 'var(--surface)', color: 'var(--text)', outline: 'none',
            }}
          />
        </div>
        {['all', 'F-1', 'J-1', 'OPT', 'DACA'].map(v => (
          <button
            key={v}
            onClick={() => setVisa(v)}
            style={{
              padding: '7px 15px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: `1.5px solid ${visaFilter === v ? '#0F2D1F' : 'var(--border)'}`,
              background: visaFilter === v ? '#0F2D1F' : 'var(--surface)',
              color: visaFilter === v ? '#fff' : 'var(--text2)',
              transition: 'all 0.15s',
            }}>
            {v === 'all' ? 'All Students' : v}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>

        {/* Student List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((s, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected?.name === s.name ? null : s)}
              style={{
                background: 'var(--surface)', border: `1.5px solid ${selected?.name === s.name ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 16, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (selected?.name !== s.name) e.currentTarget.style.borderColor = 'var(--card-hover-border)' }}
              onMouseLeave={e => { if (selected?.name !== s.name) e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {/* Avatar */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: s.color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
              }}>{s.initials}</div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text2)' }}>
                  {s.major} • {s.year} • {s.school}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
                  {s.interests.map(int => (
                    <span key={int} style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                      background: 'var(--blue-light)', color: 'var(--blue)',
                    }}>{int}</span>
                  ))}
                </div>
              </div>

              {/* Visa */}
              <span style={{
                fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                background: VISA_COLORS[s.visa]?.bg,
                color: VISA_COLORS[s.visa]?.color,
                flexShrink: 0,
              }}>{s.visa}</span>

              {/* Stats */}
              <div style={{ textAlign: 'center', minWidth: 50, flexShrink: 0 }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{s.apps}</div>
                <div style={{ fontSize: 9, color: 'var(--text2)' }}>applications</div>
              </div>

              {/* Urgent */}
              {s.urgent > 0 ? (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                  background: 'var(--red-light)', color: 'var(--red)', flexShrink: 0,
                }}>{s.urgent} urgent</span>
              ) : (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                  background: 'var(--green-light)', color: 'var(--green)', flexShrink: 0,
                }}>On track</span>
              )}

              {/* Status */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: s.status === 'active' ? 'var(--green)' : 'var(--border)',
              }} />
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text2)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>👥</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                No students found
              </div>
              <div style={{ fontSize: 12 }}>Try adjusting your filters</div>
            </div>
          )}
        </div>

        {/* Student Detail Panel */}
        {selected && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, overflow: 'hidden', position: 'sticky', top: 80,
            alignSelf: 'start',
          }}>
            {/* Panel Header */}
            <div style={{
              padding: '20px', background: 'linear-gradient(130deg, #0F2D1F, #1A4731)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: selected.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
              }}>{selected.initials}</div>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff' }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{selected.major} • {selected.school}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginLeft: 'auto', background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18,
                }}>✕</button>
            </div>

            <div style={{ padding: '20px' }}>

              {/* Student Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18 }}>
                {[
                  { n: selected.apps,    l: 'Applications' },
                  { n: selected.urgent,  l: 'Urgent'       },
                  { n: '—',             l: 'Interviews'    },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'var(--surface3)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{stat.n}</div>
                    <div style={{ fontSize: 10, color: 'var(--text2)' }}>{stat.l}</div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div style={{ marginBottom: 18 }}>
                {[
                  { label: 'Year',         value: selected.year   },
                  { label: 'Visa Status',  value: selected.visa   },
                  { label: 'School',       value: selected.school },
                  { label: 'Looking For',  value: selected.interests.join(', ') },
                ].map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid var(--border)',
                    fontSize: 12,
                  }}>
                    <span style={{ color: 'var(--text2)', fontWeight: 500 }}>{d.label}</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Recommend Opportunity */}
              <div style={{
                background: 'var(--surface3)', borderRadius: 12, padding: 16, marginBottom: 14,
              }}>
                <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                  Send Recommendation
                </h4>
                <select style={{
                  width: '100%', padding: '9px 13px', marginBottom: 10,
                  border: '1.5px solid var(--border)', borderRadius: 9,
                  fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: 'var(--text)', background: 'var(--surface)', cursor: 'pointer',
                }}>
                  <option>Select an opportunity...</option>
                  <option>NASA JPL — Software Engineering Intern</option>
                  <option>NSF — STEM Diversity Fellowship</option>
                  <option>SHPE — Hispanic STEM Scholarship</option>
                  <option>Adobe — UX Design Intern</option>
                  <option>AAUW — Tech Trek Grant</option>
                </select>
                <textarea
                  value={noteText}
                  onChange={e => setNote(e.target.value)}
                  placeholder={`Add a personal note for ${selected.name.split(' ')[0]}...`}
                  style={{
                    width: '100%', minHeight: 80, padding: '10px 13px',
                    border: '1.5px solid var(--border)', borderRadius: 9,
                    fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: 'var(--text)', background: 'var(--surface)',
                    outline: 'none', resize: 'vertical', lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                />
                <button
                  onClick={sendRecommendation}
                  style={{
                    width: '100%', padding: '10px 0', borderRadius: 9,
                    background: noteSent ? 'var(--green)' : '#0F2D1F',
                    color: '#fff', border: 'none',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    transition: 'background 0.2s',
                  }}>
                  {noteSent ? '✓ Recommendation Sent!' : '📨 Send Recommendation'}
                </button>
              </div>

              {/* View Full Profile */}
              <button style={{
                width: '100%', padding: '9px 0', borderRadius: 9,
                border: '1.5px solid var(--border)', background: 'transparent',
                color: 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>View Full Application History</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}