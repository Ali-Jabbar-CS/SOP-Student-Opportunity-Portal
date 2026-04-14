import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STUDENT_STEPS = ['Account', 'Academic', 'Background']
const ADVISOR_STEPS = ['Account', 'Institution']

const SCHOOLS = [
  'Grossmont College', 'San Diego State University', 'UC San Diego',
  'UC Los Angeles', 'UC Berkeley', 'USC', 'Cal Poly San Luis Obispo',
  'San Diego City College', 'Southwestern College', 'MiraCosta College',
  'Palomar College', 'Cuyamaca College', 'Point Loma Nazarene University',
  'University of San Diego', 'National University', 'Other',
]

const MAJORS = [
  'Computer Science', 'Computer Information Systems', 'Cybersecurity',
  'Data Science', 'Electrical Engineering', 'Mechanical Engineering',
  'Civil Engineering', 'Biomedical Engineering', 'Biology', 'Chemistry',
  'Mathematics', 'Physics', 'Environmental Science', 'Business Administration',
  'Finance', 'Accounting', 'Psychology', 'Sociology', 'Political Science',
  'Communications', 'Nursing', 'Pre-Medicine', 'Other',
]

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep]             = useState(0)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [emailSent, setEmailSent]   = useState(false)
  const [data, setData] = useState({
    name: '', email: '', password: '', role: 'student',
    school: '', major: '', year: '', visa_status: '',
    ethnicity: [], interests: [], advisor_email: '',
    institution: '', advisor_title: '',
  })

  const isAdvisor = data.role === 'advisor'
  const STEPS = isAdvisor ? ADVISOR_STEPS : STUDENT_STEPS

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

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        name:        data.name,
        school:      isAdvisor ? data.institution : data.school,
        major:       data.major,
        year:        data.year,
        visa_status: data.visa_status,
        ethnicity:   data.ethnicity,
        interests:   data.interests,
        role:        data.role,
      })
      .eq('id', authData.user.id)

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    if (data.advisor_email && !isAdvisor) {
      const { data: advisorProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', data.advisor_email.toLowerCase().trim())
        .eq('role', 'advisor')
        .single()

      if (advisorProfile) {
        await supabase
          .from('advisor_students')
          .insert({
            advisor_id: advisorProfile.id,
            student_id: authData.user.id,
          })
      }
    }

    setEmailSent(true)
    setLoading(false)
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

  // Email confirmation screen
  if (emailSent) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)', padding: '20px',
      }}>
        <div style={{ width: '100%', maxWidth: 460, textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'var(--green-light)', border: '2px solid rgba(74,222,128,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: 32,
          }}>
            📧
          </div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
            Check your email!
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
            We sent a confirmation link to <strong style={{ color: 'var(--text)' }}>{data.email}</strong>.
            Click the link in the email to verify your account and get started.
          </p>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '16px 20px', marginBottom: 20, textAlign: 'left',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              What to do next:
            </div>
            {[
              'Check your inbox for an email from SOP',
              'Click the confirmation link in the email',
              'Come back here and log in',
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--blue)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800,
                }}>{i + 1}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>{s}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/login')}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: 'var(--blue)', color: '#fff', border: 'none',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
            Go to Login
          </button>
          <p style={{ marginTop: 14, fontSize: 12, color: 'var(--text3)' }}>
            Didn't get the email? Check your spam folder.
          </p>
        </div>
      </div>
    )
  }

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
            }}>{error}</div>
          )}

          {/* Step 0 - Account */}
          {step === 0 && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input style={inputStyle} placeholder="First and Last Name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Email</label>
                <input style={inputStyle} type="email" placeholder="you@university.edu" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Password</label>
                <input style={inputStyle} type="password" placeholder="Min 6 characters" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
              </div>
              <div style={{ marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>I am a...</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { k: 'student', label: 'Student',        desc: 'Looking for opportunities' },
                    { k: 'advisor', label: 'Career Advisor', desc: 'Helping students succeed'  },
                  ].map(r => (
                    <button key={r.k} type="button" onClick={() => setData({ ...data, role: r.k })}
                      style={{
                        padding: '10px 12px', borderRadius: 10, textAlign: 'left',
                        cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                        border: `1.5px solid ${data.role === r.k ? '#1A2B4A' : 'var(--border)'}`,
                        background: data.role === r.k ? 'rgba(26,43,74,0.06)' : 'var(--surface)',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{r.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--text2)' }}>{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 - Academic (Student) */}
          {step === 1 && !isAdvisor && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>University / College</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.school} onChange={e => setData({ ...data, school: e.target.value })}>
                  <option value="">Select your school...</option>
                  {SCHOOLS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Major</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.major} onChange={e => setData({ ...data, major: e.target.value })}>
                  <option value="">Select your major...</option>
                  {MAJORS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Year</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.year} onChange={e => setData({ ...data, year: e.target.value })}>
                    <option value="">Select...</option>
                    {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Visa Status</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.visa_status} onChange={e => setData({ ...data, visa_status: e.target.value })}>
                    <option value="">Select...</option>
                    {['US Citizen', 'Permanent Resident', 'F-1 International', 'J-1 Exchange', 'OPT/STEM OPT', 'CPT', 'DACA'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Advisor Email (optional)</label>
                <input style={inputStyle} placeholder="advisor@college.edu" value={data.advisor_email} onChange={e => setData({ ...data, advisor_email: e.target.value })} />
                <div style={{ fontSize: 10, color: 'var(--text2)', marginTop: 4 }}>Connect with your career advisor so they can guide you</div>
              </div>
            </div>
          )}

          {/* Step 1 - Institution (Advisor) */}
          {step === 1 && isAdvisor && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Institution / College</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.institution} onChange={e => setData({ ...data, institution: e.target.value })}>
                  <option value="">Select your institution...</option>
                  {SCHOOLS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Your Title</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={data.advisor_title} onChange={e => setData({ ...data, advisor_title: e.target.value })}>
                  <option value="">Select your role...</option>
                  {['Career Advisor', 'Academic Counselor', 'Department Advisor', 'Financial Aid Advisor', 'International Student Advisor', 'Faculty Member', 'Program Coordinator', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{
                background: 'var(--teal-light)', border: '1px solid var(--teal-border)',
                borderRadius: 12, padding: '12px 16px', marginTop: 8,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', marginBottom: 4 }}>
                  How student linking works
                </div>
                <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.6 }}>
                  After signing up, share your email address with your students. When they sign up on SOP and enter your email, they'll appear in your student roster automatically.
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Background (Student only) */}
          {step === 2 && !isAdvisor && (
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
              <button onClick={() => setStep(s => s - 1)}
                style={{
                  padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid var(--border)',
                  background: 'transparent', color: 'var(--text2)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Back</button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)}
                style={{
                  padding: '9px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', border: 'none',
                  background: '#1A2B4A', color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>Next</button>
            ) : (
              <button onClick={handleSignup} disabled={loading}
                style={{
                  padding: '9px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer', border: 'none',
                  background: loading ? 'var(--border)' : 'var(--teal)', color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>{loading ? 'Creating account...' : 'Create Account'}</button>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}