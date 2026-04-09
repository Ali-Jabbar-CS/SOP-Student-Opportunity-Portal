import { motion } from 'framer-motion'

const stats = [
  { label: 'Active Students',  value: '10,000+' },
  { label: 'Opportunities',    value: '5,000+'  },
  { label: 'Expert Advisors',  value: '500+'    },
  { label: 'Success Rate',     value: '95%'     },
]

export function StatsBar() {
  return (
    <section className="py-12 border-y border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-2">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}