import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import AdvisorDashboard from '../pages/Advisor/AdvisorDashboard'
import AdvisorStudents from '../pages/Advisor/AdvisorStudents'
import AdvisorOpportunities from '../pages/Advisor/AdvisorOpportunities'

const NAV = [
  { to: '/advisor/dashboard',      label: 'Overview',      icon: '⊞' },
  { to: '/advisor/students',       label: 'My Students',   icon: '◉', badge: null },
  { to: '/advisor/opportunities',  label: 'Opportunities', icon: '⊕' },
]

export default function AdvisorLayout({ theme, toggleTheme }) {
  const { profile, signOut } = useUser()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <nav style={{
        width: 248, background: '#0F2D1F',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #10B981, #0D9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 800, color: '#fff',
            }}>S</div>
            <div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 19, fontWeight: 800, color: '#fff' }}>SOP</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Advisor Portal
              </div>
            </div>
          </div>
        </div>

        {/* Advisor Badge */}
        <div style={{ padding: '12px 20px' }}>
          <div style={{
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 9, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>🎓</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Advisor Mode</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Career Center Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding: '8px 10px', flex: 1 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5, textTransform: 'uppercase', padding: '8px 12px 4px', fontWeight: 600 }}>
            Menu
          </div>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 12px', borderRadius: 9, marginBottom: 2,
                cursor: 'pointer', textDecoration: 'none',
                fontSize: 13, fontWeight: 500,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: isActive ? '#10B981' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(16,185,129,0.12)' : 'transparent',
                transition: 'all 0.15s',
              })}>
              <span style={{ fontSize: 16, width: 18, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Theme Toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 12px', background: 'rgba(255,255,255,0.05)',
            borderRadius: 9, marginBottom: 9,
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <button onClick={toggleTheme} style={{
              width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
              background: theme === 'dark' ? '#10B981' : 'rgba(255,255,255,0.15)',
              position: 'relative', transition: 'background 0.25s',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 3,
                left: theme === 'dark' ? 25 : 3,
                transition: 'left 0.25s', fontSize: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{theme === 'light' ? '☀️' : '🌙'}</div>
            </button>
          </div>

          {/* Profile */}
          <div
            onClick={async () => { await signOut(); navigate('/login') }}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '9px 12px', background: 'rgba(255,255,255,0.05)',
              borderRadius: 9, cursor: 'pointer',
            }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981, #0D9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0,
              fontFamily: 'Sora, sans-serif',
            }}>
              {profile?.name ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile?.name || 'Advisor'}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                {profile?.school || 'Career Center'}
              </div>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>Sign out</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ marginLeft: 248, flex: 1, background: 'var(--bg)' }}>
        {/* Topbar */}
        <div style={{
          background: 'var(--topbar-bg)', borderBottom: '1px solid var(--border)',
          padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
              Career Advisor Portal
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 1 }}>
              Helping your students find the right opportunities
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              background: 'var(--green-light)', color: 'var(--green)',
              border: '1px solid rgba(74,222,128,0.3)',
              fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 20,
            }}>🎓 Advisor Account</div>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #10B981, #0D9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: '#fff',
              fontFamily: 'Sora, sans-serif',
            }}>
              {profile?.name ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
            </div>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/advisor/dashboard"     element={<AdvisorDashboard />} />
          <Route path="/advisor/students"      element={<AdvisorStudents />} />
          <Route path="/advisor/opportunities" element={<AdvisorOpportunities />} />
          <Route path="*"                      element={<Navigate to="/advisor/dashboard" />} />
        </Routes>
      </div>
    </div>
  )
}