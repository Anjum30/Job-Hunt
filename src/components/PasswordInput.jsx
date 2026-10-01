import { useState } from 'react'

export default function PasswordInput({ value, onChange, autoComplete, id }) {
  const [show, setShow] = useState(false)
  return (
    <div className="pw">
      <input id={id} className="fld" type={show ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} />
      <button type="button" className="pwt" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
