import { useState } from 'react'
import { ORGS } from '../data/mockData'

const ALERT_PREFS = [
  { key: 'newOpp',    label: 'New Opportunity Alerts', sub: 'When followed orgs post something new' },
  { key: 'deadline',  label: 'Deadline Reminders',     sub: '7 days, 3 days, and 1 day before each deadline' },
  { key: 'match',     label: 'New AI Matches',         sub: 'When a new opportunity matches your profile' },
  { key: 'recruiter', label: 'Recruiter Activity',     sub: 'When a recruiter views your profile' },
  { key: 'weekly',    label: 'Weekly Digest',          sub: 'Sunday roundup of top opportunities' },
]

const DELIVERY = [
  { key: 'email', label: 'Email Notifications', sub: 'maria@sdsu.edu' },
  { key: 'push',  label: 'Push Notifications',  sub: 'Browser & Mobile app' },
  { key: 'sms',   label: 'SMS / Text Alerts',   sub: '+1 (619) 555-0192' },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 42, height: 24, borderRadius: 12, border: 'none',
        cursor: 'pointer', position: 'relative', flexShrink: 0,
        background: on ? 'var(--teal)' : 'var(--border2)',
        transition: 'background 0.2s',
      }}>
      <div style={{
        width: 18, height: 18, background: '#fff', borderRadius: '50%',
        position: 'absolute', top: 3,
        left: on ? 21 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
}

export default function Notifications() {
  const [prefs, setPrefs]     = useState({ newOpp: true, deadline: true, match: true, recruiter: false, weekly: true })
  const [delivery, setDel]    = useState({ email: true, push: false, sms: false })
  const [following, setFollowing] = useState(
    Object.fromEntries(ORGS.map((o, i) => [o.name, i < 3]))
  )

  return (
    <div style={{ padding: '26px 30px' }}>
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
        Notification Settings
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

        {/* Left Column */}
        <div>

          {/* Alert Preferences */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 20, marginBottom: 16,
          }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
              Alert Preferences
            </h3>
            <p style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 16 }}>
              Choose what triggers a notification
            </p>
            {ALERT_PREFS.map((item, i) => (
              <div key={item.key} style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '13px 0',
                borderBottom: i < ALERT_PREFS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>{item.sub}</div>
                </div>
                <Toggle on={prefs[item.key]} onChange={v => setPrefs(p => ({ ...p, [item.key]: v }))} />
              </div>
            ))}
          </div>

          {/* Delivery Method */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 20, marginBottom: 16,
          }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Delivery Method
            </h3>
            {DELIVERY.map((item, i) => (
              <div key={item.key} style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '13px 0',
                borderBottom: i < DELIVERY.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>{item.sub}</div>
                </div>
                <Toggle on={delivery[item.key]} onChange={v => setDel(d => ({ ...d, [item.key]: v }))} />
              </div>
            ))}
          </div>

          {/* Web Scan */}
          <div style={{
            background: 'var(--teal-light)', border: '1px solid var(--teal-border)',
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>🌐</span>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}>
                Web Scan Active
              </h3>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
              SOP is actively scanning the web for new opportunities matching your profile from trusted sources.
            </p>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
              {['LinkedIn', 'Handshake', 'NSF.gov', 'SHPE.org', 'Indeed', 'UNCF.org'].map(s => (
                <span key={s} style={{
                  fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
                  background: 'var(--green-light)', color: 'var(--green)',
                }}>{s}</span>
              ))}
            </div>
            <button style={{
              fontSize: 12, padding: '7px 14px', borderRadius: 9,
              border: '1.5px solid var(--teal)', color: 'var(--teal)',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600,
            }}>Edit Sources</button>
          </div>
        </div>

        {/* Right Column — Followed Orgs */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 20,
        }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
            Followed Organizations
          </h3>
          <p style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 16 }}>
            Get instant alerts when these orgs post new opportunities
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {ORGS.map(o => {
              const isFollowing = following[o.name]
              return (
                <div
                  key={o.name}
                  onClick={() => setFollowing(f => ({ ...f, [o.name]: !f[o.name] }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '11px 13px', borderRadius: 11, cursor: 'pointer', transition: 'all 0.15s',
                    border: `1.5px solid ${isFollowing ? 'var(--teal)' : 'var(--border)'}`,
                    background: isFollowing ? 'var(--teal-light)' : 'var(--surface)',
                  }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: o.logo, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
                  }}>{o.initials}</div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700, color: 'var(--text)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{o.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text2)' }}>{o.type}</div>
                  </div>
                  {isFollowing && <span style={{ color: 'var(--teal)', fontSize: 14, flexShrink: 0 }}>✓</span>}
                </div>
              )
            })}
          </div>

          <button style={{
            width: '100%', marginTop: 14, padding: '9px 0',
            border: '1.5px solid var(--border)', borderRadius: 9,
            background: 'transparent', color: 'var(--text2)',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>+ Browse More Organizations</button>
        </div>
      </div>
    </div>
  )
}