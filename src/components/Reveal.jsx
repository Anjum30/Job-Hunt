import useInView from '../hooks/useInView'
import './Reveal.css'

// Viewport mein aane par fade + slide-up
export default function Reveal({ children, className = '' }) {
  const [ref, inView] = useInView(0.1)
  return <section ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`}>{children}</section>
}
