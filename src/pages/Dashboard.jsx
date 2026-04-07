import { useNavigate } from 'react-router-dom'
import { OPPS } from '../data/mockData'
import OppCard from '../components/OppCard'
import { useUser } from '../context/UserContext'


const DEADLINES = [
  { title: 'NASA JPL Intern', org: 'NASA JPL', days: 18, u: 'urgent' },
  { title: 'Hispanic STEM Scholar', org: 'SHPE', days: 23, u: 'soon' },
  { title: 'AAUW Tech Trek', org: 'AAUW', days: 27, u: 'soon' },
  { title: 'Spotify Co-op', org: 'Spotify', days: 43, u: 'ok' },
  { title: 'Sierra Club Research', org: 'Sierra Club', days: 34, u: 'ok' },
]

const NEW_FEATURES = [
  { icon: '🛂', label: 'Visa Compatibility Filter', sub: 'Auto-filter by your status', color: 'var(--green)', path: '/opportunities' },
  { icon: '✍️', label: 'AI Cover Letter Builder', sub: 'Generate in 30 seconds', color: 'var(--amber)', path: '/cover-letter' },
  { icon: '🔍', label: '"Is This Legit?" Checker', sub: 'Spot scam postings instantly', color: 'var(--blue)', path: '/legit-check' },
]

const urgencyColor = (u) => ({
  urgent: 'var(--coral)',
  soon:   'var(--amber)',
  ok:     'var(--green)',
}[u])

const urgencyBg = (u) => ({
  urgent: 'var(--red-light)',
  soon:   'var(--amber-light)',
  ok:     'var(--green-light)',
}[u])

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile } = useUser()

 

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(130deg, #1A2B4A 0%, #243659 55%, #1A3A5C 100%)',
        borderRadius: 20, padding: '26px 30px', marginBottom: 22, position: 'relative', overflow: 'hidden',
      }}>
       <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 5 }}>
  Good morning, {profile?.name?.split(' ')[0] || 'Student'} 👋
</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            You have <strong style={{ color: '#FCD34D' }}>3 upcoming deadlines</strong> this week and{' '}
            <strong style={{ color: '#2DD4BF' }}>12 new matches</strong> since your last visit.
          </p>
          <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
            <button
              onClick={() => navigate('/opportunities')}
              style={{
                background: '#fff', color: '#1A2B4A', fontSize: 12, fontWeight: 700,
                padding: '9px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              View Matches
            </button>
            <button
              onClick={() => navigate('/notifications')}
              style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 600,
                padding: '9px 18px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              🔔 Set Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { icon: '🎯', bg: 'var(--blue-light)',   num: 47, label: 'AI-Matched Opps',     delta: '+12 new',   up: true },
          { icon: '📋', bg: 'var(--green-light)',  num: 6,  label: 'Applications Active', delta: '2 due soon', up: false },
          { icon: '⭐', bg: 'var(--amber-light)',  num: 11, label: 'Saved for Later',      delta: '3 close',   up: false },
          { icon: '🏆', bg: 'var(--purple-light)', num: 2,  label: 'Interviews Booked',   delta: 'Up from 0!', up: true },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: s.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, marginBottom: 10,
            }}>{s.icon}</div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: 10, marginTop: 5, fontWeight: 700, color: s.up ? 'var(--green)' : 'var(--coral)' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>

        {/* Left — Top Matches */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
              Top Matches For You
            </h3>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'var(--amber-light)', color: 'var(--amber)',
              border: '1px solid rgba(252,211,77,0.3)',
              fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
            }}>✦ AI Powered</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {OPPS.slice(0, 4).map(o => <OppCard key={o.id} opp={o} />)}
          </div>
        </div>

        {/* Right — Deadlines + New Features */}
        <div>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Upcoming Deadlines
          </h3>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: 16, marginBottom: 18,
          }}>
            {DEADLINES.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 0',
                borderBottom: i < DEADLINES.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: urgencyColor(d.u),
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{d.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)' }}>{d.org}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                  background: urgencyBg(d.u), color: urgencyColor(d.u),
                }}>{d.days}d</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            New Features
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NEW_FEATURES.map((f, i) => (
              <div
                key={i}
                onClick={() => navigate(f.path)}
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