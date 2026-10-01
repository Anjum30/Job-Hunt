import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PasswordInput from '../components/PasswordInput'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUp() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const from = useLocation().state?.from || '/dashboard'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to={from} replace />
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name.'
    if (!EMAIL.test(form.email.trim())) err.email = 'Please enter a valid email.'
    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password))
      err.password = 'Use at least 8 characters with a letter and a number.'
    if (form.confirm !== form.password) err.confirm = 'Passwords do not match.'
    setErrors(err)
    if (Object.keys(err).length) return
    setBusy(true)
    try {
      await register(form)
      navigate(from, { replace: true })
    } catch (ex) {
      setErrors({ form: ex.message })
      setBusy(false)
    }
  }

  return (
    <section className="pg">
      <div className="wrap">
        <form className="card authcard" onSubmit={submit} noValidate>
          <h1>Create your account</h1>
          <p className="muted">Save jobs, apply faster and track your applications.</p>
          {errors.form && <div className="alert" role="alert">{errors.form}</div>}
          <div className="f"><label htmlFor="name">Full name</label>
            <input id="name" className="fld" autoComplete="name" value={form.name} onChange={set('name')} /><div className="err">{errors.name}</div></div>
          <div className="f"><label htmlFor="email">Email</label>
            <input id="email" className="fld" type="email" autoComplete="email" value={form.email} onChange={set('email')} /><div className="err">{errors.email}</div></div>
          <div className="f"><label htmlFor="password">Password</label>
            <PasswordInput id="password" autoComplete="new-password" value={form.password} onChange={set('password')} /><div className="err">{errors.password}</div></div>
          <div className="f"><label htmlFor="confirm">Confirm password</label>
            <PasswordInput id="confirm" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} /><div className="err">{errors.confirm}</div></div>
          <button className="btn p" style={{ width: '100%' }} disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
          <p className="muted center">Already have an account? <Link className="lnk" to="/signin" state={{ from }}>Sign in</Link></p>
        </form>
      </div>
    </section>
  )
}
