import { useState } from 'react'
import { useJobs } from '../context/JobContext'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ApplicationForm({ job, onDone }) {
  const { addApplication } = useJobs()
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: 'Fresher', cover: '' })
  const [resume, setResume] = useState(null)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name.'
    if (!EMAIL.test(form.email.trim())) err.email = 'Please enter a valid email.'
    if (!resume) err.resume = 'Please upload your resume.'
    setErrors(err)
    if (Object.keys(err).length) return
    addApplication(job)
    setDone(true)
    setTimeout(onDone, 2200)
  }

  if (done) return <div className="ok">✓ Application submitted successfully!</div>
  return (
    <form onSubmit={submit} noValidate>
      <div className="f"><label>Full Name</label><input className="fld" value={form.name} onChange={set('name')} /><div className="err">{errors.name}</div></div>
      <div className="f"><label>Email</label><input className="fld" value={form.email} onChange={set('email')} /><div className="err">{errors.email}</div></div>
      <div className="f"><label>Phone</label><input className="fld" value={form.phone} onChange={set('phone')} /></div>
      <div className="f"><label>Experience</label>
        <select className="fld" style={{ width: '100%' }} value={form.experience} onChange={set('experience')}>
          <option>Fresher</option><option>1–2 years</option><option>3–5 years</option><option>5+ years</option>
        </select>
      </div>
      <div className="f"><label>Resume</label><input className="fld" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} /><div className="err">{errors.resume}</div></div>
      <div className="f"><label>Cover Letter</label><textarea className="fld" rows="4" value={form.cover} onChange={set('cover')} /></div>
      <button className="btn p" style={{ width: '100%' }} type="submit">Submit Application</button>
    </form>
  )
}
