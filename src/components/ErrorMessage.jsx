export default function ErrorMessage({ onRetry }) {
  return (
    <div className="state">
      <div>⚠️</div>
      <h3>Something went wrong</h3>
      <p className="muted">We couldn't load jobs right now.</p>
      <button className="btn p" onClick={onRetry}>Try Again</button>
    </div>
  )
}
