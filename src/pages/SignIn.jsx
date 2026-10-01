import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PasswordInput from '../components/PasswordInput'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignIn() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const from = useLocation().state?.from || '/dashboard'
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to={from} replace />

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!EMAIL.test(form.email.trim())) err.email = 'Please enter a valid email.'
    if (!form.password) err.password = 'Please enter your password.'
    setErrors(err)
    if (Object.keys(err).length) return
    setBusy(true)
    try {
      await login(form)
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
          <h1>Sign in</h1>
          <p className="muted">Welcome back. Sign in to see your saved jobs and applications.</p>
          {errors.form && <div className="alert" role="alert">{errors.form}</div>}
          <div className="f"><label htmlFor="email">Email</label>
            <input id="email" className="fld" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className="err">{errors.email}</div></div>
          <div className="f"><label htmlFor="password">Password</label>
            <PasswordInput id="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <div className="err">{errors.password}</div></div>
          <button className="btn p" style={{ width: '100%' }} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
          <p className="muted center">New to JobHunt? <Link className="lnk" to="/signup" state={{ from }}>Create an account</Link></p>
        </form>
      </div>
    </section>
  )
}
