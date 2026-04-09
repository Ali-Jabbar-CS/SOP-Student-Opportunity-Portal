import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useUser } from './context/UserContext'
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
import AdvisorLayout from './components/AdvisorLayout'
import Landing from './pages/Landing'

function StudentLayout({ theme, toggleTheme }) {
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

function AuthenticatedApp({ theme, toggleTheme }) {
  const { profile, loading } = useUser()

  if (loading) return null

  if (profile?.role === 'advisor') {
    return <AdvisorLayout theme={theme} toggleTheme={toggleTheme} />
  }

  return <StudentLayout theme={theme} toggleTheme={toggleTheme} />
}

export default function App() {
  const [theme, setTheme]     = useState('light')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.remove('dark')

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)',
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
      <Route path="/"        element={session ? <Navigate to="/dashboard" /> : <Navigate to="/landing" />} />
      <Route path="/landing" element={<Landing theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/login"   element={session ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup"  element={session ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route
        path="/*"
        element={session
          ? <AuthenticatedApp theme={theme} toggleTheme={toggleTheme} />
          : <Navigate to="/landing" />
        }
      />
    </Routes>
  )
}