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
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-white font-sans">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}