import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useUser } from '../../context/UserContext'

const MOCK_STATS = [
  { icon: '👥', bg: 'var(--blue-light)',   num: 12, label: 'Active Students',      delta: '+2 this month', up: true  },
  { icon: '📋', bg: 'var(--green-light)',  num: 34, label: 'Applications Tracked', delta: '8 submitted',   up: true  },
  { icon: '⏰', bg: 'var(--amber-light)',  num: 5,  label: 'Deadlines This Week',  delta: '2 urgent',      up: false },
  { icon: '✉️', bg: 'var(--purple-light)', num: 8,  label: 'Recommendations Sent', delta: '3 unopened',    up: false },
]

const MOCK_STUDENTS = [
  { name: 'Maria Rodriguez', major: 'Computer Science',    visa: 'F-1',  year: 'Junior',   apps: 6, urgent: 2, initials: 'MR', color: '#2563EB' },
  { name: 'James Okafor',    major: 'Electrical Eng.',     visa: 'F-1',  year: 'Senior',   apps: 3, urgent: 1, initials: 'JO', color: '#0D9488' },
  { name: 'Sofia Chen',      major: 'Data Science',        visa: 'J-1',  year: 'Sophomore', apps: 4, urgent: 0, initials: 'SC', color: '#7C3AED' },
  { name: 'Ahmed Hassan',    major: 'Mechanical Eng.',     visa: 'F-1',  year: 'Junior',   apps: 2, urgent: 1, initials: 'AH', color: '#EA580C' },
  { name: 'Priya Patel',     major: 'Biomedical Eng.',     visa: 'OPT',  year: 'Graduate', apps: 7, urgent: 3, initials: 'PP', color: '#16A34A' },
]

const MOCK_DEADLINES = [
  { student: 'Priya Patel',     opp: 'NSF Graduate Fellowship',  days: 3,  urgent: true  },
  { student: 'Maria Rodriguez', opp: 'NASA JPL Intern',           days: 8,  urgent: true  },
  { student: 'James Okafor',    opp: 'SHPE Scholarship',          days: 14, urgent: false },
  { student: 'Ahmed Hassan',    opp: 'Adobe Design Intern',       days: 19, urgent: false },
]

export default function AdvisorDashboard() {
  const navigate  = useNavigate()
  const { profile } = useUser()

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(130deg, #0F2D1F 0%, #1A4731 55%, #0F3D2A 100%)',
        borderRadius: 20, padding: '26px 30px', marginBottom: 22,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 5 }}>
            Good morning, {profile?.name?.split(' ')[0] || 'Advisor'} 👋
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            You have <strong style={{ color: '#34D399' }}>5 students</strong> with deadlines this week and{' '}
            <strong style={{ color: '#FCD34D' }}>3 unopened recommendations</strong>.
          </p>
          <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
            <button
              onClick={() => navigate('/advisor/students')}
              style={{
                background: '#fff', color: '#0F2D1F', fontSize: 12, fontWeight: 700,
                padding: '9px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>View Students</button>
            <button
              onClick={() => navigate('/advisor/opportunities')}
              style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 600,
                padding: '9px 18px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>Browse Opportunities</button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {MOCK_STATS.map((s, i) => (
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

        {/* Left — Student Roster */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
              Your Students
            </h3>
            <button
              onClick={() => navigate('/advisor/students')}
              style={{
                fontSize: 12, color: 'var(--green)', fontWeight: 700,
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>View All →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_STUDENTS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--card-hover-border)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Avatar */}
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', background: s.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0,
                  fontFamily: 'Sora, sans-serif',
                }}>{s.initials}</div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.major} • {s.year}</div>
                </div>

                {/* Visa Badge */}
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                  background: 'var(--green-light)', color: 'var(--green)',
                }}>{s.visa}</span>

                {/* Apps */}
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{s.apps}</div>
                  <div style={{ fontSize: 9, color: 'var(--text2)' }}>apps</div>
                </div>

                {/* Urgent */}
                {s.urgent > 0 && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                    background: 'var(--red-light)', color: 'var(--red)',
                  }}>{s.urgent} urgent</span>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                    background: '#0F2D1F', color: '#fff', border: 'none', cursor: 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}>Recommend</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Deadlines */}
        <div>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Upcoming Student Deadlines!
          </h3>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: 16, marginBottom: 18,
          }}>
            {MOCK_DEADLINES.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
                borderBottom: i < MOCK_DEADLINES.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                  background: d.urgent ? 'var(--coral)' : 'var(--green)',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{d.opp}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)', marginTop: 2 }}>{d.student}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                  background: d.urgent ? 'var(--red-light)' : 'var(--green-light)',
                  color: d.urgent ? 'var(--red)' : 'var(--green)',
                  flexShrink: 0,
                }}>{d.days}d</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🔍', label: 'Find F-1 Friendly Opps',    sub: 'Filter for international students',   path: '/advisor/opportunities' },
              { icon: '📨', label: 'Send Bulk Recommendation',  sub: 'Recommend to multiple students',      path: '/advisor/opportunities' },
              { icon: '👥', label: 'Add a Student',             sub: 'Link a new student to your roster',   path: '/advisor/students'      },
            ].map((a, i) => (
              <div
                key={i}
                onClick={() => navigate(a.path)}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 13px', borderRadius: 11,
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)', cursor: 'pointer', transition: 'border-color 0.15s',
                }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{a.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)' }}>{a.sub}</div>
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