import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', group: 'main', icon: '⊞' },
  { to: '/opportunities', label: 'Opportunities', group: 'main', badge: 12, icon: '⊕' },
  { to: '/tracker', label: 'My Applications', group: 'main', icon: '◫' },
  { to: '/recruiters', label: 'Recruiters', group: 'main', icon: '◉' },
  { to: '/cover-letter', label: 'Cover Letter AI', group: 'tools', badge: 'NEW', icon: '✎' },
  { to: '/legit-check', label: 'Legit Checker', group: 'tools', badge: 'NEW', icon: '⊛' },
  { to: '/notifications', label: 'Notifications', group: 'settings', badge: 3, icon: '◎' },
]

export default function Sidebar({ theme, toggleTheme }) {
  return (
    <nav style={{
      width: 248,
      background: 'var(--sidebar-bg)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      zIndex: 100,
      transition: 'background 0.25s',
    }}>

      {/* Logo */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--sidebar-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 800, color: '#fff',
          }}>S</div>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>SOP</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 1.8, textTransform: 'uppercase' }}>Student Opportunity Portal</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
        {['main', 'tools', 'settings'].map(group => (
          <div key={group}>
            <div style={{
              fontSize: 9, color: 'rgba(255,255,255,0.3)',
              letterSpacing: 1.5, textTransform: 'uppercase',
              padding: '12px 12px 4px', fontWeight: 600,
            }}>
              {group === 'main' ? 'Menu' : group === 'tools' ? 'New Tools' : 'Settings'}
            </div>
            {NAV.filter(n => n.group === group).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '9px 12px',
                  borderRadius: 9,
                  marginBottom: 2,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  transition: 'all 0.15s',
                })}
              >
                <span style={{ fontSize: 16, width: 18, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: typeof item.badge === 'string' ? '#10B981' : '#EA580C',
                    color: '#fff',
                    fontSize: 9, fontWeight: 800,
                    padding: '2px 6px', borderRadius: 20,
                    minWidth: 18, textAlign: 'center',
                  }}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom: theme toggle + profile */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--sidebar-border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 12px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 9, marginBottom: 9,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </span>
          <button onClick={toggleTheme} style={{
            width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
            background: theme === 'dark' ? '#FCD34D' : 'rgba(255,255,255,0.15)',
            position: 'relative', transition: 'background 0.25s',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: '#fff',
              position: 'absolute', top: 3,
              left: theme === 'dark' ? 25 : 3,
              transition: 'left 0.25s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11,
            }}>
              {theme === 'light' ? '☀️' : '🌙'}
            </div>
          </button>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 12px',
          background: 'rgba(255,255,255,0.05)', borderRadius: 9, cursor: 'pointer',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0,
            fontFamily: 'Sora, sans-serif',
          }}>MR</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Maria Rodriguez</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>CS Junior • SDSU • F-1</div>
          </div>
        </div>
      </div>
    </nav>
  )
}