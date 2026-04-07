import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STEPS = ['Account', 'Academic', 'Background']

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [data, setData]       = useState({
    name: '', email: '', password: '',
    school: '', major: '', year: '', visa_status: '',
    ethnicity: [], interests: [],
  })

  const toggle = (field, val) => {
    setData(d => ({
      ...d,
      [field]: d[field].includes(val)
        ? d[field].filter(x => x !== val)
        : [...d[field], val]
    }))
  }

  const handleSignup = async () => {
  setLoading(true)
  setError(null)

  // 1. Create the auth user — trigger auto-creates the profile row
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (authError) {
    setError(authError.message)
    setLoading(false)
    return
  }

  // 2. Update the profile row with their full info
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      name:        data.name,
      school:      data.school,
      major:       data.major,
      year:        data.year,
      visa_status: data.visa_status,
      ethnicity:   data.ethnicity,
      interests:   data.interests,
    })
    .eq('id', authData.user.id)

  if (profileError) {
    setError(profileError.message)
    setLoading(false)
    return
  }

  navigate('/dashboard')
}

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid var(--border)', borderRadius: 10,
    fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: 'var(--text)', background: 'var(--surface2)', outline: 'none',
    transition: 'border 0.15s',
  }

  const chipStyle = (selected) => ({
    padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
    border: `1.5px solid ${selected ? '#1A2B4A' : 'var(--border)'}`,
    background: selected ? '#1A2B4A' : 'var(--surface)',
    color: selected ? '#fff' : 'var(--text2)',
    transition: 'all 0.15s',
  })

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)', padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff',
          }}>S</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>
            Find opportunities built for students like you
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 20, padding: 32,
        }}>

          {/* Step Indicators */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{
                  height: 3, borderRadius: 2, marginBottom: 4, transition: 'background 0.3s',
                  background: i < step ? 'var(--teal)' : i === step ? 'var(--amber)' : 'var(--border)',
                }} />
                <div style={{
                  fontSize: 9, fontWeight: 600,
                  color: i <= step ? 'var(--text2)' : 'var(--text3)',
                }}>{s}</div>
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--red-light)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16,
              fontSize: 12, color: 'var(--red)', fontWeight: 600,
            }}>⚠ {error}</div>
          )}

          {/* Step 0 — Account */}
          {step === 0 && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input
                  style={inputStyle} placeholder="First & Last Name"
                  value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Email</label>
                <input
                  style={inputStyle} type="email" placeholder="you@university.edu"
                  value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Password</label>
                <input
                  style={inputStyle} type="password" placeholder="Min 6 characters"
                  value={data.password} onChange={e => setData({ ...data, password: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 1 — Academic */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>University</label>
                <input
                  style={inputStyle} placeholder="San Diego State University"
                  value={data.school} onChange={e => setData({ ...data, school: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Major</label>
                <input
                  style={inputStyle} placeholder="Computer Science"
                  value={data.major} onChange={e => setData({ ...data, major: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Year</label>
                  <select
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={data.year} onChange={e => setData({ ...data, year: e.target.value })}>
                    <option value="">Select...</option>
                    {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(y => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Visa Status</label>
                  <select
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={data.visa_status} onChange={e => setData({ ...data, visa_status: e.target.value })}>
                    <option value="">Select...</option>
                    {['US Citizen', 'Permanent Resident', 'F-1 International', 'J-1 Exchange', 'OPT/STEM OPT', 'CPT', 'DACA'].map(v => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Background */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 10 }}>
                  Ethnicity / Background
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {['Hispanic/Latinx', 'Black/African American', 'Asian/Pacific Islander', 'Native American', 'Middle Eastern', 'Multiracial', 'Prefer not to say'].map(e => (
                    <button key={e} style={chipStyle(data.ethnicity.includes(e))} onClick={() => toggle('ethnicity', e)}>{e}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 10 }}>
                  What are you looking for?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {['Internships', 'Scholarships', 'Grants', 'Research', 'Volunteering', 'Fellowships'].map(i => (
                    <button key={i} style={chipStyle(data.interests.includes(i))} onClick={() => toggle('interests', i)}>{i}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{
                  padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid var(--border)',
                  background: 'transparent', color: 'var(--text2)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>← Back</button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                style={{
                  padding: '9px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', border: 'none',
                  background: '#1A2B4A', color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Next →</button>
            ) : (
              <button
                onClick={handleSignup}
                disabled={loading}
                style={{
                  padding: '9px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer', border: 'none',
                  background: loading ? 'var(--border)' : 'var(--teal)', color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>{loading ? 'Creating account…' : '✓ Create Account'}</button>
            )}
          </div>
        </div>

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}