import { useState } from 'react'

const STAGES = [
  { k: 'letter',   icon: '📝', name: 'Cover Letter',  desc: 'Standard application' },
  { k: 'email',    icon: '✉️', name: 'Cold Email',     desc: 'Direct outreach' },
  { k: 'essay',    icon: '🎓', name: 'Personal Essay', desc: 'Scholarship focus' },
  { k: 'linkedin', icon: '💼', name: 'LinkedIn Note',  desc: 'Short & punchy' },
]

const SAMPLE_LETTER = `Dear NASA Jet Propulsion Lab Hiring Team,

I am writing to express my strong interest in the Software Engineering Intern position at NASA JPL. As a junior studying Computer Science at San Diego State University, I bring a combination of technical skills and lived experience that I believe will contribute meaningfully to your team.

Throughout my academic career, I have developed proficiency in Python, Java, and data structures, with hands-on experience in machine learning through research projects at SDSU's AI lab. As an international student navigating a new country while pursuing a STEM degree, I have developed exceptional adaptability, problem-solving under uncertainty, and the drive to excel in every opportunity I am given.

I am particularly drawn to NASA JPL's commitment to innovation and its welcoming environment for students from diverse backgrounds. The Software Engineering Intern role would allow me to apply my academic knowledge in a real-world setting while contributing fresh perspectives to your team.

I would be grateful for the opportunity to discuss how my background and skills align with NASA JPL's mission. Thank you for your time and consideration.

Warm regards,
Maria Rodriguez
maria@sdsu.edu | SDSU, Computer Science '26 | F-1 Student`

export default function CoverLetterBuilder() {
  const [stage, setStage]         = useState('letter')
  const [tone, setTone]           = useState(60)
  const [generating, setGen]      = useState(false)
  const [generated, setGenerated] = useState(false)

  const toneLabel =
    tone < 30 ? 'Formal & Professional' :
    tone < 55 ? 'Balanced' :
    tone < 80 ? 'Warm & Conversational' : 'Casual & Friendly'

  const generate = () => {
    setGen(true)
    setGenerated(false)
    setTimeout(() => { setGen(false); setGenerated(true) }, 2200)
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
            Your profile is auto-loaded — just pick a type and generate
          </p>
        </div>
        <span style={{
          marginLeft: 'auto',
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'var(--amber-light)', color: 'var(--amber)',
          border: '1px solid rgba(252,211,77,0.3)',
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
        }}>✦ Powered by Claude AI</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Left — Form */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden', position: 'sticky', top: 80,
        }}>
          <div style={{
            padding: '18px 20px',
            background: 'linear-gradient(130deg, #1A2B4A, #243659)',
            borderBottom: '1px solid var(--border)',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2, fontFamily: 'Sora, sans-serif' }}>
              Customize Your Letter
            </h3>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
              Profile auto-loaded from your SOP account
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
                  <button
                    key={s.k}
                    onClick={() => setStage(s.k)}
                    style={{
                      padding: '10px 12px', borderRadius: 10, textAlign: 'left',
                      cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                      border: `1.5px solid ${stage === s.k ? 'var(--amber)' : 'var(--border)'}`,
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

            {/* Highlight */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                Highlight (optional)
              </label>
              <textarea
                placeholder="Any specific projects, skills, or experiences to emphasize..."
                style={{
                  width: '100%', minHeight: 80, padding: '10px 13px',
                  border: '1.5px solid var(--border)', borderRadius: 9,
                  fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: 'var(--text)', background: 'var(--surface2)',
                  outline: 'none', resize: 'vertical', lineHeight: 1.6,
                }}
              />
            </div>

            {/* Language */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                Output Language
              </label>
              <select style={{
                width: '100%', padding: '9px 13px',
                border: '1.5px solid var(--border)', borderRadius: 9,
                fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: 'var(--text)', background: 'var(--surface)', cursor: 'pointer',
              }}>
                <option>English</option>
                <option>Spanish (bilingual)</option>
                <option>Formal Spanish</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              style={{
                width: '100%', padding: '10px 0', borderRadius: 9,
                background: 'var(--amber)', color: '#fff', border: 'none',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
              ✦ Generate Letter
            </button>
          </div>
        </div>

        {/* Right — Preview */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {/* Preview Header */}
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
              }}>✦ AI Generated</span>
            )}
          </div>

          {/* States */}
          {generating ? (
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
              Claude is writing your letter…
            </div>

          ) : generated ? (
            <>
              <div style={{ padding: 24, fontSize: 13, lineHeight: 1.9, color: 'var(--text2)', minHeight: 420 }}>
                {SAMPLE_LETTER.split('\n\n').map((p, i) => (
                  <p key={i} style={{ marginBottom: 14 }}>{p}</p>
                ))}
              </div>
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <button style={{
                  padding: '8px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: 'var(--blue)', color: '#fff', border: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>📋 Copy Letter</button>
                <button style={{
                  padding: '8px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: 'transparent', color: 'var(--text2)', border: '1.5px solid var(--border)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>⬇ Download PDF</button>
                <button
                  onClick={generate}
                  style={{
                    padding: '8px 16px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: 'transparent', color: 'var(--text2)', border: '1.5px solid var(--border)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}>↺ Regenerate</button>
                <button style={{
                  marginLeft: 'auto', padding: '8px 16px', borderRadius: 9,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  background: 'var(--teal)', color: '#fff', border: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Apply with This →</button>
              </div>
            </>

          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>✍️</div>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Ready to write
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', maxWidth: 260, lineHeight: 1.6 }}>
                Choose your settings on the left and hit Generate — your personalized letter will appear here in seconds.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}