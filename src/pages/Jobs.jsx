import { useEffect, useState } from 'react'
import { useJobs } from '../context/JobContext'
import FilterSidebar from '../components/FilterSidebar'
import SortDropdown from '../components/SortDropdown'
import JobList from '../components/JobList'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

export default function Jobs() {
  const { results, loading, error, load, clearFilters } = useJobs()
  const [drawer, setDrawer] = useState(false)
  useEffect(() => { load() }, [load])

  let body
  if (loading) body = <LoadingSkeleton />
  else if (error) body = <ErrorMessage onRetry={load} />
  else if (!results.length) body = <EmptyState onClear={clearFilters} />
  else body = <JobList jobs={results} />

  return (
    <section className="pg">
      <div className="wrap">
        <h2>Find Jobs</h2>
        <div className="layout">
          <FilterSidebar open={drawer} onClose={() => setDrawer(false)} />
          <div>
            <div className="bar">
              <b>{loading ? 'Loading jobs…' : `${results.length} Job${results.length === 1 ? '' : 's'} Found`}</b>
              <button className="btn sm fbtn" onClick={() => setDrawer(true)}>☰ Filters</button>
              <SortDropdown />
            </div>
            {body}
          </div>
        </div>
      </div>
    </section>
  )
}
