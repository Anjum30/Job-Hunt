export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="jobs">
      {Array.from({ length: count }).map((_, i) => (
        <div className="card" key={i}>
          <div className="sk" style={{ width: '40%' }} />
          <div className="sk" style={{ width: '80%', height: 20 }} />
          <div className="sk" style={{ width: '55%' }} />
          <div className="sk" style={{ width: '35%' }} />
        </div>
      ))}
    </div>
  )
}
