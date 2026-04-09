import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-blue p-2 rounded-lg"><GraduationCap className="w-6 h-6 text-white" /></div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SOP</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of leaders by connecting driven students with the right opportunities and expert advisors.
            </p>
          <div className="flex items-center gap-4 mt-2">
  <a href="#" className="text-sm font-semibold text-slate-400 hover:text-brand-blue transition-colors">Twitter</a>
  <a href="#" className="text-sm font-semibold text-slate-400 hover:text-brand-blue transition-colors">LinkedIn</a>
  <a href="#" className="text-sm font-semibold text-slate-400 hover:text-brand-blue transition-colors">GitHub</a>
</div>
</div>
          </div>

          {[
            { title: 'Platform', links: ['For Students', 'For Advisors', 'Browse Opportunities', 'Pricing'] },
            { title: 'Company',  links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal',    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-navy-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Student Opportunity Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}