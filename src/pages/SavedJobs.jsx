import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../context/JobContext'
import DashLayout from '../components/DashLayout'
import JobCard from '../components/JobCard'

export default function SavedJobs() {
  const { jobs, saved, toggleSave } = useJobs()
  const [leaving, setLeaving] = useState(null)
  const list = saved.map((id) => jobs.find((j) => j.id === id)).filter(Boolean)
  const remove = (id) => { setLeaving(id); setTimeout(() => { toggleSave(id); setLeaving(null) }, 320) }
  return (
    <DashLayout>
      <h2>Saved Jobs ({list.length})</h2>
      {list.length ? (
        <div className="jobs">
          {list.map((j) => <JobCard key={j.id} job={j} compact leaving={leaving === j.id} onRemove={() => remove(j.id)} />)}
        </div>
      ) : (
        <div className="state">
          <div>♡</div><h3>No saved jobs yet</h3>
          <p className="muted">Tap the heart on any job to keep it here.</p>
          <Link className="btn p" to="/jobs">Find Jobs</Link>
        </div>
      )}
    </DashLayout>
  )
}
