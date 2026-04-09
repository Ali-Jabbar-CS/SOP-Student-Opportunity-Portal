import { useState } from 'react'
import { Moon, Sun, Menu, X, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Features',     href: '#features'      },
    { name: 'How It Works', href: '#how-it-works'  },
    { name: 'Testimonials', href: '#testimonials'  },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-navy-900/80 backdrop-blur-md border-b border-slate-200 dark:border-navy-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-blue p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SOP</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-brand-blue dark:text-slate-300 dark:hover:text-brand-blue transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-navy-700 pl-6">
              <button onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-navy-800 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => navigate('/login')}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                Log in
              </button>
              <button onClick={() => navigate('/signup')}
                className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Sign up
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600 dark:text-slate-300">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map(link => (
                <a key={link.name} href={link.href}
                  className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 rounded-md"
                  onClick={() => setMobileOpen(false)}>
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-slate-200 dark:border-navy-800">
                <button onClick={() => navigate('/login')}
                  className="w-full text-center px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-navy-700 rounded-lg">
                  Log in
                </button>
                <button onClick={() => navigate('/signup')}
                  className="w-full text-center px-4 py-3 text-base font-medium text-white bg-brand-blue rounded-lg">
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}