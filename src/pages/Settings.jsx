import DashboardLayout from '../components/DashboardLayout.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  return (
    <DashboardLayout>
      <h2>Settings</h2>
      <div className="card">
        <p>Theme: <b>{theme}</b></p>
        <button className="btn primary" onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</button>
      </div>
    </DashboardLayout>
  )
}
