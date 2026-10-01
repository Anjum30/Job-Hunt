import { useJobs } from '../context/JobContext'
import { TYPES, LEVELS, LOCATIONS, SALARY_RANGES, SKILLS } from '../data/jobs'

function Group({ title, name, options, labels }) {
  const { filters, setFilters } = useJobs()
  const toggle = (v) =>
    setFilters((f) => ({ ...f, [name]: f[name].includes(v) ? f[name].filter((x) => x !== v) : [...f[name], v] }))
  return (
    <>
      <h4>{title}</h4>
      {options.map((v, i) => (
        <label key={i}>
          <input type="checkbox" checked={filters[name].includes(v)} onChange={() => toggle(v)} />
          {labels ? labels[i] : v}
        </label>
      ))}
    </>
  )
}

export default function FilterSidebar({ open, onClose }) {
  const { clearFilters } = useJobs()
  const salLabels = SALARY_RANGES.map(([a, b]) => (b === 999 ? `$${a}+` : `$${a}–$${b}`))
  return (
    <>
      <aside className={`card filters ${open ? 'open' : ''}`}>
        <div className="row"><b>Filters</b><button className="btn sm" onClick={clearFilters}>Clear</button></div>
        <Group title="Job Type" name="type" options={TYPES} />
        <Group title="Experience" name="level" options={LEVELS} />
        <Group title="Location" name="location" options={LOCATIONS} />
        <Group title="Salary / hour" name="sal" options={SALARY_RANGES.map((_, i) => i)} labels={salLabels} />
        <Group title="Skills" name="skills" options={SKILLS} />
      </aside>
      <div className={`drawer-bg ${open ? 'open' : ''}`} onClick={onClose} />
    </>
  )
}
