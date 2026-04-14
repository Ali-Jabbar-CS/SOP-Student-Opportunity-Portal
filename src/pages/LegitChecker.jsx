import { useState } from 'react'

const RECENT_KEY = 'sop_recent_checks'

const STATUS_STYLES = {
  pass: { bg: 'var(--green-light)', color: 'var(--green)', icon: '✓' },
  warn: { bg: 'var(--amber-light)', color: 'var(--amber)', icon: '!' },
  fail: { bg: 'var(--red-light)',   color: 'var(--red)',   icon: '✗' },
}

const VERDICT_COLORS = {
  safe:    { bg: 'var(--green-light)', color: 'var(--green)' },
  warning: { bg: 'var(--amber-light)', color: 'var(--amber)' },
  danger:  { bg: 'var(--red-light)',   color: 'var(--red)'   },
}

export default function LegitChecker() {
  const [input, setInput]       = useState('')
  const [url, setUrl]           = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)
  const [recent, setRecent]     = useState([
    { name: 'NSF Graduate Fellowship',         score: 97, verdict: 'safe'    },
    { name: 'LinkedIn: "Remote STEM $500/wk"', score: 22, verdict: 'danger'  },
    { name: 'SHPE Annual Scholarship',         score: 94, verdict: 'safe'    },
  ])

  const check = async () => {
    if (!input && !url) return
    setChecking(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/check-legit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, url }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
        const name = input
          ? input.slice(0, 40) + (input.length > 40 ? '...' : '')
          : url
        setRecent(prev => [
          { name, score: data.score, verdict: data.verdict },
          ...prev.slice(0, 4),
        ])
      }
    } catch (err) {
      setError('Failed to analyze. Please try again.')
    }

    setChecking(false)
  }

  const verdictColor = result ? VERDICT_COLORS[result.verdict] || VERDICT_COLORS.warning : null

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
          Is This Legit? Checker
        </h2>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'var(--amber-light)', color: 'var(--amber)',
          border: '1px solid rgba(252,211,77,0.3)',
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
        }}>AI Powered by Claude</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 24, lineHeight: 1.6 }}>
        Paste an opportunity description, URL, or email to check if it is legitimate.
        Claude scans for red flags like fake scholarships, scam internships, and suspicious
        postings that target international students. Opportunities marked
        <strong style={{ color: 'var(--green)' }}> Verified Live</strong> on SOP have been
        manually confirmed on the organization's official website.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Left Input */}
        <div>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{ padding: '18px 20px', background: 'linear-gradient(130deg, #1A2B4A, #243659)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2, fontFamily: 'Sora, sans-serif' }}>
                Paste and Check
              </h3>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Description, email, or post text</p>
            </div>

            <div style={{ padding: '18px 20px' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste the opportunity description or email here..."
                style={{
                  width: '100%', minHeight: 140, padding: '12px 14px',
                  border: '1.5px solid var(--border)', borderRadius: 10,
                  fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: 'var(--text)', background: 'var(--surface2)',
                  outline: 'none', resize: 'vertical', lineHeight: 1.6,
                }}
              />

              <div style={{ textAlign: 'center', margin: '12px 0', position: 'relative' }}>
                <span style={{
                  background: 'var(--surface)', padding: '0 10px',
                  position: 'relative', zIndex: 1,
                  fontSize: 11, fontWeight: 600, color: 'var(--text3)',
                }}>or</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>🔗</span>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Paste a URL to scan..."
                  style={{
                    flex: 1, padding: '9px 13px',
                    border: '1.5px solid var(--border)', borderRadius: 9,
                    fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: 'var(--text)', background: 'var(--surface)', outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={check}
                disabled={checking || (!input && !url)}
                style={{
                  width: '100%', padding: '10px 0', borderRadius: 9, border: 'none',
                  fontSize: 13, fontWeight: 700,
                  cursor: checking || (!input && !url) ? 'not-allowed' : 'pointer',
                  background: checking || (!input && !url) ? 'var(--border)' : 'var(--blue)',
                  color: checking || (!input && !url) ? 'var(--text3)' : '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.15s',
                }}>
                {checking ? (
                  <>
                    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                      animation: 'spin 0.7s linear infinite',
                    }} />
                    Claude is analyzing...
                  </>
                ) : 'Run Legit Check'}
              </button>
            </div>
          </div>

          {/* Recent Checks */}
          <div>
            <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
              Recent Checks
            </h4>
            {recent.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 10,
                background: 'var(--surface3)', marginBottom: 7,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0, fontSize: 13,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: r.verdict === 'safe' ? 'var(--green-light)' : r.verdict === 'warning' ? 'var(--amber-light)' : 'var(--red-light)',
                  color: r.verdict === 'safe' ? 'var(--green)' : r.verdict === 'warning' ? 'var(--amber)' : 'var(--red)',
                }}>{r.verdict === 'safe' ? '✓' : r.verdict === 'warning' ? '!' : '✗'}</div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text2)' }}>Score: {r.score}/100</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 20, flexShrink: 0,
                  background: r.verdict === 'safe' ? 'var(--green-light)' : r.verdict === 'warning' ? 'var(--amber-light)' : 'var(--red-light)',
                  color: r.verdict === 'safe' ? 'var(--green)' : r.verdict === 'warning' ? 'var(--amber)' : 'var(--red)',
                }}>{r.verdict === 'safe' ? 'Safe' : r.verdict === 'warning' ? 'Caution' : 'Scam'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Result */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {checking ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '80px 20px', gap: 12,
              color: 'var(--text2)', fontSize: 13, minHeight: 420,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: '2px solid var(--border)', borderTopColor: 'var(--blue)',
                animation: 'spin 0.7s linear infinite',
              }} />
              Claude is scanning for red flags...
            </div>

          ) : error ? (
            <div style={{ padding: 24 }}>
              <div style={{
                padding: '12px 16px', borderRadius: 10,
                background: 'var(--red-light)', color: 'var(--red)',
                fontSize: 12, fontWeight: 600,
                border: '1px solid rgba(248,113,113,0.3)',
              }}>
                Error: {error}
              </div>
            </div>

          ) : result ? (
            <>
              {/* Score Banner */}
              <div style={{
                padding: '28px 24px', textAlign: 'center',
                background: verdictColor.bg,
                borderBottom: '1px solid ' + verdictColor.color + '22',
              }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 60, fontWeight: 800,
                  lineHeight: 1, marginBottom: 6, color: verdictColor.color,
                }}>{result.score}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>/100 legitimacy score</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: verdictColor.color }}>{result.label}</div>
                <div style={{ fontSize: 11, color: verdictColor.color, opacity: 0.75, marginTop: 3 }}>{result.sub}</div>
              </div>

              {/* Check List */}
              <div style={{ padding: '16px 20px' }}>
                {result.checks.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
                    borderBottom: i < result.checks.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: STATUS_STYLES[c.s]?.bg || 'var(--surface3)',
                      color: STATUS_STYLES[c.s]?.color || 'var(--text2)',
                      fontSize: 11,
                    }}>{STATUS_STYLES[c.s]?.icon || '?'}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <button style={{
                  padding: '7px 14px', borderRadius: 9, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid var(--border)',
                  background: 'transparent', color: 'var(--text2)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Report This Posting</button>
                {result.verdict === 'safe' && (
                  <button style={{
                    marginLeft: 'auto', padding: '7px 14px', borderRadius: 9,
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: 'var(--blue)', color: '#fff', border: 'none',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}>Save Opportunity</button>
                )}
              </div>
            </>

          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '80px 24px',
              textAlign: 'center', minHeight: 420,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>🔍</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Paste something to check
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', maxWidth: 260, lineHeight: 1.6, marginBottom: 20 }}>
                Drop in any scholarship email, LinkedIn post, or job description. Claude cross-references it against known scam patterns.
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Fake scholarship', 'Scam internship', 'Phishing email', 'Unverified org'].map(t => (
                  <span key={t} style={{
                    fontSize: 10, padding: '4px 10px', borderRadius: 20,
                    background: 'var(--surface3)', color: 'var(--text2)',
                    border: '1px solid var(--border)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}