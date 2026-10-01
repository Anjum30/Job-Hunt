import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useJobs, emptyFilters } from '../context/JobContext'

const POPULAR = ['React Developer', 'Frontend Developer', 'UI/UX', 'JavaScript']

export default function Hero() {
  const { setFilters } = useJobs()
  const navigate = useNavigate()
  const go = (q, loc = '') => { setFilters({ ...emptyFilters, q, loc }); navigate('/jobs') }
  return (
    <section className="hero">
      <div className="wrap">
        <h1>Find Your Dream Job Today</h1>
        <p>Discover thousands of opportunities from leading companies and take the next step in your career.</p>
        <SearchBar onSearch={go} />
        <div className="pop">
          <span>Popular:</span>
          {POPULAR.map((p) => <button key={p} className="chip" onClick={() => go(p)}>{p}</button>)}
        </div>
      </div>
    </section>
  )
}
