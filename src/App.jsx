import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Opportunities from './pages/Opportunities'
import Tracker from './pages/Tracker'
import Recruiters from './pages/Recruiters'
import Notifications from './pages/Notifications'
import CoverLetterBuilder from './pages/CoverLetterBuilder'
import LegitChecker from './pages/LegitChecker'
import Login from './pages/Login'
import Signup from './pages/Signup'

function ProtectedLayout({ theme, toggleTheme }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ marginLeft: 248, flex: 1 }}>
        <Topbar />
        <Routes>
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/tracker"       element={<Tracker />} />
          <Route path="/recruiters"    element={<Recruiters />} />
          <Route path="/cover-letter"  element={<CoverLetterBuilder />} />
          <Route path="/legit-check"   element={<LegitChecker />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*"              element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  const [theme, setTheme]     = useState('light')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')

    // Check if a session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for login / logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  // Blank spinner while we check auth state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '3px solid var(--border)', borderTopColor: 'var(--amber)',
          animation: 'spin 0.7s linear infinite',
        }} />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes — redirect to dashboard if already logged in */}
      <Route path="/login"  element={session ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <Signup />} />

      {/* Protected routes — redirect to login if not signed in */}
      <Route
        path="/*"
        element={session
          ? <ProtectedLayout theme={theme} toggleTheme={toggleTheme} />
          : <Navigate to="/login" />
        }
      />
    </Routes>
  )
}