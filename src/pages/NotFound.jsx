import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="pg">
      <div className="wrap state">
        <div>🧭</div>
        <h3>Page not found</h3>
        <p className="muted">The page you opened doesn't exist.</p>
        <Link className="btn p" to="/">Go home</Link>
      </div>
    </section>
  )
}
