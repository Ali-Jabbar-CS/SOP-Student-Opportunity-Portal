import { GraduationCap } from 'lucide-react'

export function Footer({ theme }) {
  const dark = theme === 'dark'

  return (
    <footer style={{ background: dark ? '#060d1a' : '#fff', borderTop: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}`, padding: '60px 32px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ background: '#3b82f6', padding: 8, borderRadius: 8 }}>
                <GraduationCap size={20} color="#fff" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: dark ? '#fff' : '#0f172a' }}>SOP</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
              Empowering the next generation of leaders by connecting driven students with the right opportunities and expert advisors.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                <a key={s} href="#" style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Platform', links: ['For Students', 'For Advisors', 'Browse Opportunities', 'Pricing'] },
            { title: 'Company',  links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal',    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: dark ? '#fff' : '#0f172a', marginBottom: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                      onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 24, borderTop: `1px solid ${dark ? '#1e3a5f' : '#e2e8f0'}` }}>
          <p style={{ fontSize: 13, color: '#64748b' }}>
            © {new Date().getFullYear()} Student Opportunity Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}