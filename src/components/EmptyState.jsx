export default function EmptyState({ onClear }) {
  return (
    <div className="state">
      <div>🔍</div>
      <h3>No jobs found</h3>
      <p className="muted">Try changing your search or filters.</p>
      <button className="btn p" onClick={onClear}>Clear Filters</button>
    </div>
  )
}
