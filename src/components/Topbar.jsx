import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const PAGE_META = {
  '/dashboard':     { title: 'Dashboard',            sub: 'Welcome back, Maria' },
  '/opportunities': { title: 'Opportunities',         sub: '47 AI-matched results for your profile' },
  '/tracker':       { title: 'Application Tracker',   sub: '6 active applications' },
  '/recruiters':    { title: 'Recruiters',             sub: 'Companies looking for students like you' },
  '/cover-letter':  { title: 'Cover Letter AI',        sub: 'Generate tailored letters in seconds' },
  '/legit-check':   { title: '"Is This Legit?" Checker', sub: 'AI-powered scam & fraud detection' },
  '/notifications': { title: 'Notifications',          sub: 'Manage your alerts and followed orgs' },
}

export default function Topbar() {
  const { profile } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const meta = PAGE_META[location.pathname] || { title: 'SOP', sub: '' }

  return (
    <div style={{
      background: 'var(--topbar-bg)',
      borderBottom: '1px solid var(--border)',
      padding: '13px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0, zIndex: 50,
      transition: 'background 0.25s, border-color 0.25s',
    }}>
      <div>
        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
          {meta.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 1 }}>{meta.sub}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => navigate('/notifications')}
          style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'var(--surface3)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
          }}>
          🔔
          <div style={{
            position: 'absolute', top: 7, right: 7,
            width: 7, height: 7,
            background: '#EF4444', borderRadius: '50%',
            border: '2px solid var(--topbar-bg)',
          }} />
        </button>

        <div style={{
  width: 36, height: 36, borderRadius: 10,
  background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 12, fontWeight: 800, color: '#fff', cursor: 'pointer',
  fontFamily: 'Sora, sans-serif',
}}>
  {profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??'}
</div>
      </div>
    </div>
  )
}