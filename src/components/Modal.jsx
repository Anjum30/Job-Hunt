import { useEffect } from 'react'

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="modal" onClick={onClose}>
      <div className="mb" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="row"><h3 style={{ margin: 0 }}>{title}</h3><button className="btn sm" onClick={onClose}>✕</button></div>
        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>
  )
}
