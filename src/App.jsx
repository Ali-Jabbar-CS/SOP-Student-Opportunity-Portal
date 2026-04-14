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
import Profile from './pages/Profile'
import PageTransition from './components/PageTransition'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function StudentLayout({ theme, toggleTheme, selectedOpp, setSelectedOpp }) {
  const location = useLocation()
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ marginLeft: 248, flex: 1 }}>
        <Topbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="/opportunities" element={<Opportunities setSelectedOpp={setSelectedOpp} />} />
              <Route path="/tracker"       element={<Tracker />} />
              <Route path="/recruiters"    element={<Recruiters />} />
              <Route path="/cover-letter"  element={<CoverLetterBuilder opp={selectedOpp} />} />
              <Route path="/legit-check"   element={<LegitChecker />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile"       element={<Profile />} />
              <Route path="*"              element={<Navigate to="/dashboard" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StudentLayout({ theme, toggleTheme, selectedOpp, setSelectedOpp }) {
  const location = useLocation()
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ marginLeft: 248, flex: 1 }}>
        <Topbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="/opportunities" element={<Opportunities setSelectedOpp={setSelectedOpp} />} />
              <Route path="/tracker"       element={<Tracker />} />
              <Route path="/recruiters"    element={<Recruiters />} />
              <Route path="/cover-letter"  element={<CoverLetterBuilder opp={selectedOpp} />} />
              <Route path="/legit-check"   element={<LegitChecker />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile"       element={<Profile />} />
              <Route path="*"              element={<Navigate to="/dashboard" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function AuthenticatedApp({ theme, toggleTheme }) {
  const { profile, loading } = useUser()
  const [selectedOpp, setSelectedOpp] = useState(null)

  if (loading) return null

  if (profile?.role === 'advisor') {
    return <AdvisorLayout theme={theme} toggleTheme={toggleTheme} />
  }

  return <StudentLayout theme={theme} toggleTheme={toggleTheme} selectedOpp={selectedOpp} setSelectedOpp={setSelectedOpp} />
}

export default function App() {
  const [theme, setTheme]     = useState(() => localStorage.getItem('sop-theme') || 'light')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('sop-theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

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
    localStorage.setItem('sop-theme', next)
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