import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff',
          }}>S</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>Sign in to your SOP account</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 20, padding: 32,
        }}>
          <form onSubmit={handleLogin}>

            {/* Error */}
            {error && (
              <div style={{
                background: 'var(--red-light)', border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                fontSize: 12, color: 'var(--red)', fontWeight: 600,
              }}>⚠ {error}</div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@university.edu"
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1.5px solid var(--border)', borderRadius: 10,
                  fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: 'var(--text)', background: 'var(--surface2)', outline: 'none',
                  transition: 'border 0.15s',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1.5px solid var(--border)', borderRadius: 10,
                  fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: 'var(--text)', background: 'var(--surface2)', outline: 'none',
                  transition: 'border 0.15s',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 10,
                background: loading ? 'var(--border)' : '#1A2B4A',
                color: loading ? 'var(--text3)' : '#fff',
                border: 'none', fontSize: 14, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
            <span style={{
              background: 'var(--surface)', padding: '0 12px',
              position: 'relative', zIndex: 1,
              fontSize: 11, color: 'var(--text3)', fontWeight: 600,
            }}>or</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Google */}
          <button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: 'http://localhost:5173/dashboard' }
              })
            }}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: 'var(--surface)', border: '1.5px solid var(--border)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <span style={{ fontSize: 16 }}>🔵</span> Continue with Google
          </button>
        </div>

        {/* Sign up link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>
            Sign up for free!
          </Link>
        </p>
      </div>
    </div>
  )
}