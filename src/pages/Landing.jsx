import { Navbar }              from '../components/landing/Navbar'
import { HeroSection }         from '../components/landing/HeroSection'
import { StatsBar }            from '../components/landing/StatsBar'
import { FeaturesSection }     from '../components/landing/FeaturesSection'
import { HowItWorksSection }   from '../components/landing/HowItWorksSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { CTASection }          from '../components/landing/CTASection'
import { Footer }              from '../components/landing/Footer'

export default function Landing({ theme, toggleTheme }) {
  return (
    <div style={{ minHeight: '100vh', background: theme === 'dark' ? '#0a1628' : '#f8fafc', color: theme === 'dark' ? '#fff' : '#0f172a', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection theme={theme} />
        <StatsBar theme={theme} />
        <FeaturesSection theme={theme} />
        <HowItWorksSection theme={theme} />
        <TestimonialsSection theme={theme} />
        <CTASection theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  )
}