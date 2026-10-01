import { createContext, useContext, useMemo, useState, useRef, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { jobs, SALARY_RANGES } from '../data/jobs'

const JobContext = createContext()
export const useJobs = () => useContext(JobContext)

export const emptyFilters = { q: '', loc: '', type: [], level: [], location: [], sal: [], skills: [] }
const seedApps = [
  { job: 'Frontend Developer', company: 'Google', status: 'Applied', date: 'Sep 20' },
  { job: 'React Developer', company: 'Microsoft', status: 'Interview', date: 'Sep 18' },
  { job: 'UI Developer', company: 'Adobe', status: 'Rejected', date: 'Sep 15' },
]
const sorters = {
  new: (a, b) => a.days - b.days,
  old: (a, b) => b.days - a.days,
  lo: (a, b) => a.max - b.max,
  hi: (a, b) => b.max - a.max,
}

export function JobProvider({ children }) {
  const [saved, setSaved] = useLocalStorage('jh_saved', [])
  const [apps, setApps] = useLocalStorage('jh_apps', seedApps)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState('new')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const timer = useRef()

  const load = useCallback(() => {
    clearTimeout(timer.current)
    setLoading(true)
    setError(false)
    timer.current = setTimeout(() => setLoading(false), 2000)
  }, [])

  const toggleSave = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const addApplication = (job) =>
    setApps((a) => [
      { job: job.title, company: job.company, status: 'Applied',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
      ...a,
    ])

  const results = useMemo(() => {
    const q = filters.q.toLowerCase()
    const loc = filters.loc.split(',')[0].trim().toLowerCase()
    return jobs
      .filter((j) => !q || `${j.title} ${j.company} ${j.skills.join(' ')}`.toLowerCase().includes(q))
      .filter((j) => !loc || j.location.toLowerCase().includes(loc))
      .filter((j) => !filters.type.length || filters.type.includes(j.type))
      .filter((j) => !filters.level.length || filters.level.includes(j.level))
      .filter((j) => !filters.location.length || filters.location.includes(j.location))
      .filter((j) => !filters.sal.length || filters.sal.some((i) => j.max >= SALARY_RANGES[i][0] && j.max < SALARY_RANGES[i][1]))
      .filter((j) => !filters.skills.length || filters.skills.some((s) => j.skills.includes(s)))
      .sort(sorters[sort])
  }, [filters, sort])

  const value = {
    jobs, results, saved, toggleSave, apps, addApplication,
    filters, setFilters, clearFilters: () => setFilters(emptyFilters),
    sort, setSort, loading, error, load,
    findJob: (id) => jobs.find((j) => j.id === Number(id)),
  }
  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}
