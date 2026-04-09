import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useUser } from '../../context/UserContext'

const VISA_COLORS = {
  'F-1 International': { bg: 'var(--blue-light)',   color: 'var(--blue)'   },
  'J-1 Exchange':      { bg: 'var(--purple-light)', color: 'var(--purple)' },
  'OPT/STEM OPT':      { bg: 'var(--green-light)',  color: 'var(--green)'  },
  'DACA':              { bg: 'var(--amber-light)',   color: 'var(--amber)'  },
  'US Citizen':        { bg: 'var(--teal-light)',    color: 'var(--teal)'   },
}

export default function AdvisorStudents() {
  const { user } = useUser()
  const [students, setStudents]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [query, setQuery]           = useState('')
  const [visaFilter, setVisa]       = useState('all')
  const [selected, setSelected]     = useState(null)
  const [noteText, setNote]         = useState('')
  const [noteSent, setNoteSent]     = useState(false)
  const [selectedOpp, setSelectedOpp] = useState('')

  useEffect(() => {
    if (!user) return
    const fetchStudents = async () => {
      setLoading(true)

      const { data: links } = await supabase
        .from('advisor_students')
        .select('student_id')
        .eq('advisor_id', user.id)

      if (!links || links.length === 0) {
        setStudents([])
        setLoading(false)
        return
      }

      const studentIds = links.map(l => l.student_id)

      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .in('id', studentIds)

      setStudents(profiles || [])
      setLoading(false)
    }

    fetchStudents()
  }, [user])

  const filtered = students.filter(s =>
    (visaFilter === 'all' || s.visa_status === visaFilter) &&
    (!query ||
      s.name?.toLowerCase().includes(query.toLowerCase()) ||
      s.major?.toLowerCase().includes(query.toLowerCase()))
  )

  const sendRecommendation = () => {
    setNoteSent(true)
    setTimeout(() => { setNoteSent(false); setSelected(null); setNote(''); setSelectedOpp('') }, 2000)
  }

  const getInitials = (name) => {
    if (!name) return '??'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  const getColor = (index) => {
    const colors = ['#2563EB', '#0D9488', '#7C3AED', '#EA580C', '#16A34A', '#D97706']
    return colors[index % colors.length]
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
            Students who linked your email during signup
          </p>
        </div>
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
        {['all', 'F-1 International', 'J-1 Exchange', 'OPT/STEM OPT', 'DACA', 'US Citizen'].map(v => (
          <button key={v} onClick={() => setVisa(v)}
            style={{
              padding: '7px 15px', borderRadius: 20, fontSize: 11, fontWeight: 600,
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

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text2)' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
          <div>Loading your students...</div>
        </div>

      ) : students.length === 0 ? (
        /* Empty State */
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, color: 'var(--text2)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            No students yet
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
            Students need to enter your email address during signup to appear here.
            Share your email <strong style={{ color: 'var(--text)' }}>{user?.email}</strong> with your students so they can link to you.
          </div>
          <div style={{
            marginTop: 20, padding: '12px 20px',
            background: 'var(--teal-light)', border: '1px solid var(--teal-border)',
            borderRadius: 10, display: 'inline-block',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)' }}>Your advisor email:</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--teal)', marginTop: 2 }}>{user?.email}</div>
          </div>
        </div>

      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>

          {/* Student List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setSelected(selected?.id === s.id ? null : s)}
                style={{
                  background: 'var(--surface)',
                  border: `1.5px solid ${selected?.id === s.id ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: 16, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (selected?.id !== s.id) e.currentTarget.style.borderColor = 'var(--card-hover-border)' }}
                onMouseLeave={e => { if (selected?.id !== s.id) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: getColor(i), flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
                }}>{getInitials(s.name)}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
                    {s.name || 'Unnamed Student'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>
                    {s.major || 'Major not set'} • {s.year || 'Year not set'} • {s.school || 'School not set'}
                  </div>
                  {s.interests && s.interests.length > 0 && (
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
                      {s.interests.map(int => (
                        <span key={int} style={{
                          fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                          background: 'var(--blue-light)', color: 'var(--blue)',
                        }}>{int}</span>
                      ))}
                    </div>
                  )}
                </div>

                {s.visa_status && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, flexShrink: 0,
                    background: VISA_COLORS[s.visa_status]?.bg || 'var(--surface3)',
                    color: VISA_COLORS[s.visa_status]?.color || 'var(--text2)',
                  }}>{s.visa_status}</span>
                )}

                <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: 'var(--green)' }} />
              </div>
            ))}

            {filtered.length === 0 && query && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
                No students match your search
              </div>
            )}
          </div>

          {/* Student Detail Panel */}
          {selected && (
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden', position: 'sticky', top: 80, alignSelf: 'start',
            }}>
              <div style={{ padding: '20px', background: 'linear-gradient(130deg, #0F2D1F, #1A4731)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: getColor(students.indexOf(selected)),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
                }}>{getInitials(selected.name)}</div>
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff' }}>
                    {selected.name || 'Unnamed Student'}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                    {selected.major} • {selected.school}
                  </div>
                </div>
                <button onClick={() => setSelected(null)}
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18 }}>✕</button>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: 18 }}>
                  {[
                    { label: 'Email',        value: selected.email       },
                    { label: 'Year',         value: selected.year        },
                    { label: 'Visa Status',  value: selected.visa_status },
                    { label: 'School',       value: selected.school      },
                    { label: 'Interests',    value: selected.interests?.join(', ') },
                  ].filter(d => d.value).map((d, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 12,
                    }}>
                      <span style={{ color: 'var(--text2)', fontWeight: 500 }}>{d.label}</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Recommend */}
                <div style={{ background: 'var(--surface3)', borderRadius: 12, padding: 16 }}>
                  <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                    Send Recommendation
                  </h4>
                  <select
                    value={selectedOpp}
                    onChange={e => setSelectedOpp(e.target.value)}
                    style={{
                      width: '100%', padding: '9px 13px', marginBottom: 10,
                      border: '1.5px solid var(--border)', borderRadius: 9,
                      fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: 'var(--text)', background: 'var(--surface)', cursor: 'pointer',
                    }}>
                    <option value="">Select an opportunity...</option>
                    <option>NASA JPL — Software Engineering Intern</option>
                    <option>NSF — STEM Diversity Fellowship</option>
                    <option>SHPE — Hispanic STEM Scholarship</option>
                    <option>Adobe — UX Design Intern</option>
                    <option>AAUW — Tech Trek Grant</option>
                  </select>
                  <textarea
                    value={noteText}
                    onChange={e => setNote(e.target.value)}
                    placeholder={`Add a personal note for ${selected.name?.split(' ')[0] || 'this student'}...`}
                    style={{
                      width: '100%', minHeight: 80, padding: '10px 13px',
                      border: '1.5px solid var(--border)', borderRadius: 9,
                      fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                      color: 'var(--text)', background: 'var(--surface)',
                      outline: 'none', resize: 'vertical', lineHeight: 1.6, marginBottom: 10,
                    }}
                  />
                  <button onClick={sendRecommendation}
                    style={{
                      width: '100%', padding: '10px 0', borderRadius: 9,
                      background: noteSent ? 'var(--green)' : '#0F2D1F',
                      color: '#fff', border: 'none', fontSize: 13, fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'background 0.2s',
                    }}>
                    {noteSent ? '✓ Recommendation Sent!' : '📨 Send Recommendation'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}