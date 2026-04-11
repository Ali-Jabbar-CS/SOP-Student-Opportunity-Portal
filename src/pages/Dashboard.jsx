import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useUser } from '../context/UserContext'
import OppCard from '../components/OppCard'

const NEW_FEATURES = [
  { icon: '🛂', label: 'Visa Compatibility Filter', sub: 'Auto-filter by your status',   color: 'var(--green)', path: '/opportunities' },
  { icon: '✍️', label: 'AI Cover Letter Builder',   sub: 'Generate in 30 seconds',       color: 'var(--amber)', path: '/cover-letter'  },
  { icon: '🔍', label: '"Is This Legit?" Checker',  sub: 'Spot scam postings instantly', color: 'var(--blue)',  path: '/legit-check'   },
]

const urgencyColor = u => ({ urgent: 'var(--coral)', soon: 'var(--amber)', ok: 'var(--green)' }[u])
const urgencyBg    = u => ({ urgent: 'var(--red-light)', soon: 'var(--amber-light)', ok: 'var(--green-light)' }[u])

export default function Dashboard() {
  const navigate      = useNavigate()
  const { profile, user } = useUser()
  const [opps, setOpps]           = useState([])
  const [apps, setApps]           = useState([])
  const [saved, setSaved]         = useState(0)
  const [loadingOpps, setLoadingOpps] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    fetchOpps()
    fetchStats()
  }, [user?.id])

  const fetchOpps = async () => {
    setLoadingOpps(true)
    const { data } = await supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4)

    if (data) setOpps(data)
    setLoadingOpps(false)
  }

  const fetchStats = async () => {
    const { data: appsData } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
    if (appsData) setApps(appsData)

    const { count } = await supabase
      .from('saved_opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
    if (count !== null) setSaved(count)
  }

  const mapOpp = (o) => ({
  id:         o.id,
  title:      o.title,
  org:        o.org,
  type:       o.type,
  match:      90,
  tags:       o.tags || [],
  deadline:   o.deadline,
  urgent:     o.deadline_date
    ? new Date(o.deadline_date) - new Date() < 7 * 24 * 60 * 60 * 1000
    : false,
  logo:       o.logo_color,
  initials:   o.initials,
  location:   o.location,
  stipend:    o.stipend,
  visaStatus: o.visa_status,
  visaLabel:  o.visa_label,
  sourceUrl:  o.source_url,
  verified:   o.verified,
})

  const activeApps    = apps.filter(a => a.status !== 'results').length
  const interviews    = apps.filter(a => a.status === 'results').length
  const urgentApps    = apps.filter(a => {
    const parts = (a.notes || '').split('||')
    const deadline = parts[1]
    if (!deadline) return false
    return new Date(deadline) - new Date() < 7 * 24 * 60 * 60 * 1000
  })

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(130deg, #1A2B4A 0%, #243659 55%, #1A3A5C 100%)',
        borderRadius: 20, padding: '26px 30px', marginBottom: 22,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 5 }}>
            Good morning, {profile?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            You have <strong style={{ color: '#FCD34D' }}>{activeApps} active applications</strong> and{' '}
            <strong style={{ color: '#2DD4BF' }}>{opps.length} new opportunities</strong> waiting for you.
          </p>
          <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
            <button onClick={() => navigate('/opportunities')}
              style={{ background: '#fff', color: '#1A2B4A', fontSize: 12, fontWeight: 700, padding: '9px 18px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              View Opportunities
            </button>
            <button onClick={() => navigate('/tracker')}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '9px 18px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              📋 My Applications
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { icon: '🎯', bg: 'var(--blue-light)',   num: opps.length,  label: 'Live Opportunities',    delta: 'From database',  up: true  },
          { icon: '📋', bg: 'var(--green-light)',  num: activeApps,   label: 'Applications Active',   delta: activeApps > 0 ? 'Keep going!' : 'Start applying!', up: true },
          { icon: '⭐', bg: 'var(--amber-light)',  num: saved,        label: 'Saved for Later',        delta: 'Bookmarked opps', up: true },
          { icon: '🏆', bg: 'var(--purple-light)', num: interviews,   label: 'Results Tracked',        delta: interviews > 0 ? 'Great progress!' : 'Stay focused!', up: true },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: 10, marginTop: 5, fontWeight: 700, color: s.up ? 'var(--green)' : 'var(--coral)' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>

        {/* Left — Top Opportunities */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
              Latest Opportunities
            </h3>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'var(--amber-light)', color: 'var(--amber)',
              border: '1px solid rgba(252,211,77,0.3)',
              fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
            }}>✦ Live from Database</span>
          </div>
          {loadingOpps ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>⏳</div>
              Loading opportunities...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {opps.map(o => <OppCard key={o.id} opp={mapOpp(o)} />)}
            </div>
          )}
        </div>

        {/* Right */}
        <div>

          {/* Urgent Deadlines */}
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Your Active Applications
          </h3>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 18 }}>
            {apps.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text2)', fontSize: 12 }}>
                No applications yet —{' '}
                <span onClick={() => navigate('/opportunities')} style={{ color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>
                  browse opportunities
                </span>
              </div>
            ) : (
              apps.slice(0, 5).map((a, i) => {
                const parts = (a.notes || '').split('||')
                const title = parts[0] || 'Application'
                const deadline = parts[1]
                const daysLeft = deadline ? Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null
                const u = daysLeft !== null ? (daysLeft <= 3 ? 'urgent' : daysLeft <= 10 ? 'soon' : 'ok') : 'ok'
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0',
                    borderBottom: i < Math.min(apps.length, 5) - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: urgencyColor(u) }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text2)', textTransform: 'capitalize' }}>{a.status}</div>
                    </div>
                    {daysLeft !== null && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                        background: urgencyBg(u), color: urgencyColor(u),
                      }}>{daysLeft}d</span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* New Features */}
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            New Features
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NEW_FEATURES.map((f, i) => (
              <div key={i} onClick={() => navigate(f.path)}
                onMouseEnter={e => e.currentTarget.style.borderColor = f.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 13px', borderRadius: 11,
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)', cursor: 'pointer', transition: 'border-color 0.15s',
                }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{f.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)' }}>{f.sub}</div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}