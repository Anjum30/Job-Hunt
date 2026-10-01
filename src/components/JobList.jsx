import JobCard from './JobCard'
export default function JobList({ jobs }) {
  return <div className="jobs">{jobs.map((j) => <JobCard key={j.id} job={j} />)}</div>
}
