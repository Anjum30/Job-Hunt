import { NavLink, Link } from 'react-router-dom'

const items = [['/dashboard', 'Dashboard'], ['/saved', 'Saved Jobs'], ['/applications', 'Applications'], ['/profile', 'Profile']]

export default function DashLayout({ children }) {
  return (
    <section className="pg">
      <div className="wrap dash">
        <aside className="side card">
          <b className="logo" style={{ padding: '6px 14px' }}>JobHunt</b>
          {items.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          <Link to="/">Logout</Link>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  )
}
