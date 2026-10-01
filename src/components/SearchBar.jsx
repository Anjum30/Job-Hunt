import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const submit = (e) => { e.preventDefault(); onSearch(q.trim(), loc.trim()) }
  return (
    <form className="sbar" onSubmit={submit}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Job title, skills or keywords" aria-label="Job title" />
      <input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="📍 Location" aria-label="Location" />
      <button className="btn p" type="submit">Search Jobs</button>
    </form>
  )
}
