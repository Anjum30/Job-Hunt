import { useJobs } from '../context/JobContext'

export default function SortDropdown() {
  const { sort, setSort } = useJobs()
  return (
    <label className="muted">
      Sort by:{' '}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="lo">Salary: Low → High</option>
        <option value="hi">Salary: High → Low</option>
      </select>
    </label>
  )
}
