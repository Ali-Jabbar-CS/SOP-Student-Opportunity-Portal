import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useUser } from '../context/UserContext'

export default function OppCard({ opp, onShare, onCoverLetter }) {
  const { user } = useUser()
  const [saved, setSaved]       = useState(false)
  const [tracking, setTracking] = useState(false)
  const [added, setAdded]       = useState(false)
  const [status, setStatus]     = useState('interested')

  const visaColors = {
    ok:    { bg: 'var(--green-light)',  color: 'var(--green)' },
    maybe: { bg: 'var(--amber-light)', color: 'var(--amber)' },
    warn:  { bg: 'var(--red-light)',   color: 'var(--red)'   },
  }

  const tagColors = ['var(--blue-light)', 'var(--green-light)', 'var(--amber-light)']
  const tagText   = ['var(--blue)',       'var(--green)',       'var(--amber)'      ]

  const saveOpp = async () => {
    if (!user) return
    setSaved(true)
    await supabase.from('saved_opportunities').upsert({
      user_id:        user.id,
      opportunity_id: opp.id,
    })
  }

  const addToTracker = async () => {
    if (!user) return
    const { error } = await supabase
      .from('applications')
      .insert({
        user_id:  user.id,
        status:   status,
        progress: status === 'interested' ? 10 : status === 'applying' ? 45 : 80,
        notes:    opp.title + '||' + (opp.deadline || '') + '||Added from opportunities page||',
      })
    if (!error) {
      setAdded(true)
      setTracking(false)
      setTimeout(() => setAdded(false), 3000)
    }
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: added ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
        borderRadius: 16, padding: 18, transition: 'all 0.2s', position: 'relative',
      }}
      onMouseEnter={e => {
        if (!added) {
          e.currentTarget.style.borderColor = 'var(--card-hover-border)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        }
      }}
      onMouseLeave={e => {
        if (!added) {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {added && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'var(--green)', color: '#fff',
          fontSize: 11, fontWeight: 700, textAlign: 'center',
          padding: '6px 0', borderRadius: '14px 14px 0 0',
        }}>
          Added to your Application Tracker!
        </div>
      )}

      <div style={{ marginTop: added ? 24 : 0 }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: opp.logo, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Sora, sans-serif',
            }}>{opp.initials}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'Sora, sans-serif' }}>{opp.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{opp.org} - {opp.location}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{
              background: 'var(--teal-light)', color: 'var(--teal)',
              border: '1px solid var(--teal-border)',
              fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
            }}>{opp.match}% Match</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
              background: visaColors[opp.visaStatus] ? visaColors[opp.visaStatus].bg : 'var(--surface3)',
              color: visaColors[opp.visaStatus] ? visaColors[opp.visaStatus].color : 'var(--text2)',
            }}>{opp.visaLabel}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {opp.tags.map((t, i) => (
            <span key={t} style={{
              padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
              background: tagColors[i % tagColors.length],
              color: tagText[i % tagText.length],
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          {opp.verified ? (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
              background: 'var(--green-light)', color: 'var(--green)',
              border: '1px solid rgba(74,222,128,0.3)',
            }}>Verified Live</span>
          ) : (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
              background: 'var(--amber-light)', color: 'var(--amber)',
              border: '1px solid rgba(252,211,77,0.3)',
            }}>Unverified</span>
          )}
          
          {opp.sourceUrl && (
            <a>
              href={opp.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}
            
              View on Official Site
            </a>
          )}
        </div>

        {tracking && (
          <div style={{
            background: 'var(--surface3)', borderRadius: 10, padding: 12, marginBottom: 12,
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              Add to your tracker as:
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              {[
                { k: 'interested', label: 'Interested', color: 'var(--blue)'  },
                { k: 'applying',   label: 'Applying',   color: 'var(--amber)' },
                { k: 'submitted',  label: 'Submitted',  color: 'var(--teal)'  },
              ].map(s => (
                <button key={s.k} onClick={() => setStatus(s.k)}
                  style={{
                    padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                    border: status === s.k ? '1.5px solid ' + s.color : '1.5px solid var(--border)',
                    background: status === s.k ? s.color + '22' : 'var(--surface)',
                    color: status === s.k ? s.color : 'var(--text2)',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={addToTracker}
                style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', border: 'none', background: 'var(--blue)', color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                Add to Tracker
              </button>
              <button onClick={() => setTracking(false)}
                style={{
                  padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid var(--border)',
                  background: 'transparent', color: 'var(--text2)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: opp.urgent ? 'var(--coral)' : 'var(--text3)' }}>
            Due {opp.deadline}
          </div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <button
              onClick={e => { e.stopPropagation(); saveOpp() }}
              style={{
                width: 28, height: 28, borderRadius: 8, cursor: 'pointer',
                border: saved ? '1px solid rgba(252,211,77,0.4)' : '1px solid var(--border)',
                background: saved ? 'var(--amber-light)' : 'var(--surface)',
                color: saved ? 'var(--amber)' : 'var(--text2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              }}>
              {saved ? '★' : '☆'}
            </button>
            <button
              onClick={e => { e.stopPropagation(); onCoverLetter && onCoverLetter(opp) }}
              style={{
                padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
                border: '1px solid var(--amber)', background: 'var(--surface)',
                color: 'var(--amber)', fontSize: 11, fontWeight: 700,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              AI Letter
            </button>
            <button
              onClick={e => { e.stopPropagation(); setTracking(!tracking) }}
              style={{
                background: tracking ? 'var(--surface3)' : 'var(--navy)',
                color: tracking ? 'var(--text2)' : 'var(--bg)',
                border: 'none', padding: '6px 14px', borderRadius: 8,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              {tracking ? 'Cancel' : '+ Track'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}