import { useEffect, useState } from 'react'

export function useCountUp(to, duration = 1400) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return n
}

function Stat({ value, label, format }) {
  const n = useCountUp(value)
  return (
    <div className="stat">
      <b>{format(n)}</b>
      <span className="muted">{label}</span>
    </div>
  )
}

export default function Stats() {
  const k = (n) => `${Math.round(n / 1000)}K+`
  return (
    <section style={{ paddingTop: 24 }}>
      <div className="wrap stats">
        <Stat value={10000} label="Active Jobs" format={k} />
        <Stat value={5000} label="Companies" format={k} />
        <Stat value={25000} label="Job Seekers" format={k} />
        <Stat value={98} label="Success Rate" format={(n) => `${n}%`} />
      </div>
    </section>
  )
}
