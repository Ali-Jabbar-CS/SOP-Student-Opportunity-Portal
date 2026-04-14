import { useState } from 'react'
import { useUser } from '../context/UserContext'

const STAGES = [
  { k: 'cover letter',   icon: '📝', name: 'Cover Letter',  desc: 'Standard application' },
  { k: 'cold email',     icon: '✉️', name: 'Cold Email',     desc: 'Direct outreach' },
  { k: 'personal essay', icon: '🎓', name: 'Personal Essay', desc: 'Scholarship focus' },
  { k: 'LinkedIn note',  icon: '💼', name: 'LinkedIn Note',  desc: 'Short & punchy' },
]

export default function CoverLetterBuilder({ opp }) {
  const { profile } = useUser()
  const [stage, setStage]         = useState('cover letter')
  const [tone, setTone]           = useState(60)
  const [generating, setGen]      = useState(false)
  const [generated, setGenerated] = useState(false)
  const [letter, setLetter]       = useState('')
  const [error, setError]         = useState(null)
  const [copied, setCopied]       = useState(false)

  const toneLabel =
    tone < 30 ? 'Formal & Professional' :
    tone < 55 ? 'Balanced' :
    tone < 80 ? 'Warm & Conversational' : 'Casual & Friendly'

 const selectedOpp = opp || {
  title: 'General Opportunity',
  org: 'Your Target Organization',
  location: 'Various',
  type: 'internship',
}

  const generate = async () => {
    setGen(true)
    setGenerated(false)
    setError(null)
    setLetter('')

    try {
      const res = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: profile || {},
          opp: selectedOpp,
          tone,
          stage,
        }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setLetter(data.letter)
        setGenerated(true)
      }
    } catch (err) {
      setError('Failed to generate letter. Please try again.')
    }

    setGen(false)
  }

  const copyLetter = () => {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
            AI Cover Letter Builder
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
            Generating for: <strong>{selectedOpp.title}</strong> at {selectedOpp.org}
          </p>
        </div>
        <span style={{
          marginLeft: 'auto',
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'var(--amber-light)', color: 'var(--amber)',
          border: '1px solid rgba(252,211,77,0.3)',
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
        }}>Powered by Claude AI</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Left Form */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden', position: 'sticky', top: 80,
        }}>
          <div style={{ padding: '18px 20px', background: 'linear-gradient(130deg, #1A2B4A, #243659)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2, fontFamily: 'Sora, sans-serif' }}>
              Customize Your Letter
            </h3>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
              Profile auto-loaded: {profile?.name || 'Complete your profile for better results'}
            </p>
          </div>

          <div style={{ padding: '18px 20px' }}>

            {/* Document Type */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>
                Document Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {STAGES.map(s => (
                  <button key={s.k} onClick={() => setStage(s.k)}
                    style={{
                      padding: '10px 12px', borderRadius: 10, textAlign: 'left',
                      cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                      border: stage === s.k ? '1.5px solid var(--amber)' : '1.5px solid var(--border)',
                      background: stage === s.k ? 'var(--amber-light)' : 'var(--surface)',
                      transition: 'all 0.15s',
                    }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text2)' }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Slider */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                Writing Tone
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600 }}>Formal</span>
                <span style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 700 }}>{toneLabel}</span>
                <span style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600 }}>Casual</span>
              </div>
              <input
                type="range" min="0" max="100" value={tone}
                onChange={e => setTone(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--amber)', cursor: 'pointer' }}
              />
            </div>

            {/* Opportunity Info */}
            <div style={{ marginBottom: 18, background: 'var(--surface3)', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Applying for:</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{selectedOpp.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{selectedOpp.org}</div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={generating}
              style={{
                width: '100%', padding: '10px 0', borderRadius: 9,
                background: generating ? 'var(--border)' : 'var(--amber)',
                color: generating ? 'var(--text3)' : '#fff', border: 'none',
                fontSize: 13, fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
              {generating ? 'Claude is writing...' : 'Generate Letter'}
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              Letter Preview
            </h3>
            {generated && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'var(--amber-light)', color: 'var(--amber)',
                border: '1px solid rgba(252,211,77,0.3)',
                fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
              }}>AI Generated</span>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              margin: 20, padding: '12px 16px', borderRadius: 10,
              background: 'var(--red-light)', color: 'var(--red)',
              fontSize: 12, fontWeight: 600,
              border: '1px solid rgba(248,113,113,0.3)',
            }}>
              Error: {error}
            </div>
          )}

          {/* Generating spinner */}
          {generating && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 12, padding: '80px 20px', color: 'var(--text2)', fontSize: 13,
            }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: '2px solid var(--border)', borderTopColor: 'var(--amber)',
                animation: 'spin 0.7s linear infinite', flexShrink: 0,
              }} />
              Claude is writing your {stage}...
            </div>
          )}

          {/* Generated letter */}
          {generated && !generating && (
            <>
              <div style={{ padding: 24, fontSize: 13, lineHeight: 1.9, color: 'var(--text2)', minHeight: 420, whiteSpace: 'pre-wrap' }}>
                {letter}
              </div>
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <button
                  onClick={copyLetter}
                  style={{
                    padding: '8px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', border: 'none',
                    background: copied ? 'var(--green)' : 'var(--blue)', color: '#fff',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'background 0.2s',
                  }}>
                  {copied ? 'Copied!' : 'Copy Letter'}
                </button>
                <button
                  onClick={generate}
                  style={{
                    padding: '8px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', border: '1.5px solid var(--border)',
                    background: 'transparent', color: 'var(--text2)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}>
                  Regenerate
                </button>
              </div>
            </>
          )}

          {/* Empty state */}
          {!generating && !generated && !error && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>✍️</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Ready to write
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', maxWidth: 260, lineHeight: 1.6 }}>
                Choose your settings on the left and hit Generate — Claude will write your personalized letter in seconds.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}