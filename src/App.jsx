import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Opportunities from './pages/Opportunities'
import Tracker from './pages/Tracker'
import Recruiters from './pages/Recruiters'
import Notifications from './pages/Notifications'
import CoverLetterBuilder from './pages/CoverLetterBuilder'
import LegitChecker from './pages/LegitChecker'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ marginLeft: 248, flex: 1 }}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/recruiters" element={<Recruiters />} />
          <Route path="/cover-letter" element={<CoverLetterBuilder />} />
          <Route path="/legit-check" element={<LegitChecker />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  )
}

export default App