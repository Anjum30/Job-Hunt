export default function CategoryCard({ icon, name, count, onClick }) {
  return (
    <button className="card cat" onClick={onClick}>
      <span>{icon}</span>
      <b>{name}</b>
      <small className="muted">{count.toLocaleString()} Jobs</small>
    </button>
  )
}
