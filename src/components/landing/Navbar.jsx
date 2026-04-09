import { useState } from 'react'
import { Moon, Sun, Menu, X, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const dark = theme === 'dark'

  const navLinks = [
    { name: 'Features',     href: '#features'     },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    background: dark ? 'rgba(10,22,40,0.85)' : 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`,
    transition: 'all 0.25s',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: '#3b82f6', padding: 8, borderRadius: 8 }}>
            <GraduationCap size={20} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: dark ? '#fff' : '#0f172a' }}>SOP</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {navLinks.map(link => (
              <a key={link.name} href={link.href}
                style={{ fontSize: 14, fontWeight: 500, color: dark ? '#94a3b8' : '#475569', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.color = dark ? '#94a3b8' : '#475569'}>
                {link.name}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24, borderLeft: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }}>
            <button onClick={toggleTheme}
              style={{ padding: 8, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: dark ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center' }}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => navigate('/login')}
              style={{ fontSize: 14, fontWeight: 500, color: dark ? '#cbd5e1' : '#374151', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Log in
            </button>
            <button onClick={() => navigate('/signup')}
              style={{ background: '#3b82f6', color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}