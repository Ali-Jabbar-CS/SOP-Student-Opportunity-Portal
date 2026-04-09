import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useUser } from '../context/UserContext'

export default function Profile() {
  const { user, profile } = useUser()
  const [loading, setLoading]       = useState(false)
  const [saved, setSaved]           = useState(false)
  const [error, setError]           = useState(null)
  const [advisorStatus, setAdvisorStatus] = useState(null)
  const [form, setForm] = useState({
    name:          '',
    school:        '',
    major:         '',
    year:          '',
    visa_status:   '',
    advisor_email: '',
  })

  useEffect(() => {
    if (!profile) return
    setForm({
      name:          profile.name || '',
      school:        profile.school || '',
      major:         profile.major || '',
      year:          profile.year || '',
      visa_status:   profile.visa_status || '',
      advisor_email: '',
    })
    // Check if already linked to an advisor
    checkAdvisor()
  }, [profile])

  const checkAdvisor = async () => {
    if (!user) return
    const { data } = await supabase
      .from('advisor_students')
      .select('advisor_id, profiles!advisor_students_advisor_id_fkey(name, email)')
      .eq('student_id', user.id)
      .single()

    if (data) {
      setAdvisorStatus(data.profiles)
    }
  }

  const saveProfile = async () => {
    setLoading(true)
    setError(null)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        name:        form.name,
        school:      form.school,
        major:       form.major,
        year:        form.year,
        visa_status: form.visa_status,
      })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    // Link to advisor if email provided
    if (form.advisor_email) {
      const { data: advisorProfile } = await supabase
        .from('profiles')
        .select('id, name, email')
        .eq('email', form.advisor_email.toLowerCase().trim())
        .eq('role', 'advisor')
        .single()

      if (!advisorProfile) {
        setError('No advisor account found with that email. Make sure your advisor has signed up on SOP.')
        setLoading(false)
        return
      }

      // Remove existing advisor link first
      await supabase
        .from('advisor_students')
        .delete()
        .eq('student_id', user.id)

      // Add new advisor link
      await supabase
        .from('advisor_students')
        .insert({
          advisor_id: advisorProfile.id,
          student_id: user.id,
        })

      setAdvisorStatus(advisorProfile)
      setForm(f => ({ ...f, advisor_email: '' }))
    }

    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const unlinkAdvisor = async () => {
    await supabase
      .from('advisor_students')
      .delete()
      .eq('student_id', user.id)
    setAdvisorStatus(null)
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid var(--border)', borderRadius: 10,
    fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: 'var(--text)', background: 'var(--surface2)', outline: 'none',
    transition: 'border 0.15s',
  }

  return (
    <div style={{ padding: '26px 30px', maxWidth: 700 }}>
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Profile Settings
      </h2>
      <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 24 }}>
        Update your information and manage your advisor connection
      </p>

      {error && (
        <div style={{
          background: 'var(--red-light)', border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 10, padding: '10px 14px', marginBottom: 16,
          fontSize: 12, color: 'var(--red)', fontWeight: 600,
        }}>⚠ {error}</div>
      )}

      {saved && (
        <div style={{
          background: 'var(--green-light)', border: '1px solid rgba(74,222,128,0.3)',
          borderRadius: 10, padding: '10px 14px', marginBottom: 16,
          fontSize: 12, color: 'var(--green)', fontWeight: 600,
        }}>✓ Profile saved successfully!</div>
      )}

      {/* Profile Info */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 24, marginBottom: 20,
      }}>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          Personal Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>University</label>
            <input style={inputStyle} value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} placeholder="Your school" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Major</label>
            <input style={inputStyle} value={form.major} onChange={e => setForm({ ...form, major: e.target.value })} placeholder="Your major" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Year</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
              <option value="">Select...</option>
              {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>Visa Status</label>
          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.visa_status} onChange={e => setForm({ ...form, visa_status: e.target.value })}>
            <option value="">Select...</option>
            {['US Citizen', 'Permanent Resident', 'F-1 International', 'J-1 Exchange', 'OPT/STEM OPT', 'CPT', 'DACA'].map(v => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advisor Connection */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 24, marginBottom: 20,
      }}>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          Advisor Connection
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 16 }}>
          Link your career advisor so they can see your profile and send you opportunity recommendations
        </p>

        {/* Current Advisor */}
        {advisorStatus && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', borderRadius: 12,
            background: 'var(--teal-light)', border: '1px solid var(--teal-border)',
            marginBottom: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981, #0D9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0,
            }}>
              {advisorStatus.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}>
                ✓ Connected to {advisorStatus.name || 'Advisor'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{advisorStatus.email}</div>
            </div>
            <button
              onClick={unlinkAdvisor}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: 'transparent', border: '1px solid var(--teal-border)',
                color: 'var(--teal)', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              Unlink
            </button>
          </div>
        )}

        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
            {advisorStatus ? 'Switch to a Different Advisor' : 'Link an Advisor'}
          </label>
          <input
            style={inputStyle}
            value={form.advisor_email}
            onChange={e => setForm({ ...form, advisor_email: e.target.value })}
            placeholder="Enter your advisor's SOP email address"
            type="email"
          />
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 6 }}>
            Your advisor must already have a SOP account. Ask them to sign up at this site first.
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 24, marginBottom: 24,
      }}>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          Account
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
          <span style={{ color: 'var(--text2)' }}>Email</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{user?.email}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
          <span style={{ color: 'var(--text2)' }}>Account Type</span>
          <span style={{ color: 'var(--text)', fontWeight: 600, textTransform: 'capitalize' }}>{profile?.role || 'Student'}</span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveProfile}
        disabled={loading}
        style={{
          width: '100%', padding: '12px 0', borderRadius: 10,
          background: loading ? 'var(--border)' : 'var(--blue)',
          color: loading ? 'var(--text3)' : '#fff',
          border: 'none', fontSize: 14, fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          transition: 'all 0.15s',
        }}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}