import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import CategoryCard from '../components/CategoryCard'
import JobCard from '../components/JobCard'
import { useJobs, emptyFilters } from '../context/JobContext'
import { CATEGORIES } from '../data/jobs'

export default function Home() {
  const { jobs, setFilters } = useJobs()
  const navigate = useNavigate()
  const openCategory = (name) => { setFilters({ ...emptyFilters, q: name.split(' ')[0] }); navigate('/jobs') }
  return (
    <div className="pg">
      <Hero />
      <Stats />
      <section>
        <div className="wrap">
          <h2>Explore Popular Job Categories</h2>
          <div className="grid4">
            {CATEGORIES.map(([icon, name, count]) => (
              <CategoryCard key={name} icon={icon} name={name} count={count} onClick={() => openCategory(name)} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <h2>Featured Job Opportunities</h2>
          <div className="jobs">{jobs.slice(0, 6).map((j) => <JobCard key={j.id} job={j} />)}</div>
        </div>
      </section>
    </div>
  )
}
