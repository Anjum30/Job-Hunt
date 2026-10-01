import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../context/JobContext'
import { COMPANIES, COLORS, timeAgo } from '../data/jobs'

export function Logo({ company }) {
  return <div className="lg" style={{ background: COLORS[COMPANIES.indexOf(company) % 8] }}>{company[0]}</div>
}

export default function JobCard({ job, compact = false, leaving = false, onRemove }) {
  const { saved, toggleSave } = useJobs()
  const [pulse, setPulse] = useState(false)
  const isSaved = saved.includes(job.id)
  const save = () => { toggleSave(job.id); setPulse(true); setTimeout(() => setPulse(false), 350) }
  return (
    <article className={`card h jc ${leaving ? 'gone' : ''}`}>
      <div className="co">
        <Logo company={job.company} />
        {job.company}
        {!compact && (
          <button className={`heart ${isSaved ? 'on' : ''} ${pulse ? 'pulse' : ''}`} onClick={save} aria-label="Save job">
            {isSaved ? '♥' : '♡'}
          </button>
        )}
      </div>
      <h3>{job.title}</h3>
      <div className="muted">{job.location}{job.location === 'Remote' ? '' : ', Pakistan'}</div>
      {!compact && <div className="tags"><span className="tag">{job.type}</span><span className="tag">{job.level}</span></div>}
      <b>${job.min}–${job.max} / hour</b>
      {compact ? (
        <div className="row">
          <Link className="btn p sm" to={`/jobs/${job.id}`}>Apply</Link>
          <button className="btn sm" onClick={onRemove}>Remove</button>
        </div>
      ) : (
        <div className="row">
          <span className="muted small">Posted {timeAgo(job.days)}</span>
          <Link className="btn sm" to={`/jobs/${job.id}`}>View Details →</Link>
        </div>
      )}
    </article>
  )
}
