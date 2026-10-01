import { useJobs } from '../context/JobContext'
import DashLayout from '../components/DashLayout'

export default function Applications() {
  const { apps } = useJobs()
  return (
    <DashLayout>
      <h2>Applications</h2>
      <div className="card tbl">
        <table>
          <thead><tr><th>Job</th><th>Company</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {apps.map((a, i) => (
              <tr key={i}>
                <td>{a.job}</td><td>{a.company}</td>
                <td><span className={`st ${a.status}`}>{a.status}</span></td>
                <td>{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  )
}
