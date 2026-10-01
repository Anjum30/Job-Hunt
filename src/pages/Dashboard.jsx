import { useJobs } from "../context/JobContext";
import DashLayout from "../components/DashLayout";
import { useCountUp } from "../components/Stats";
import { useAuth } from "../context/AuthContext";

function Tile({ label, value }) {
  const n = useCountUp(value, 1000);
  return (
    <div className="card">
      <b style={{ fontSize: 32, color: "var(--primary)" }}>{n}</b>
      <div className="muted">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { saved, apps } = useJobs();
  const { user } = useAuth();
  return (
    <DashLayout>
      <h2>Welcome back, {user.name} 👋</h2>
      <div className="grid4">
        <Tile label="Saved Jobs" value={saved.length} />
        <Tile label="Applications" value={apps.length} />
        <Tile
          label="Interviews"
          value={apps.filter((a) => a.status === "Interview").length}
        />
        <Tile label="Profile Views" value={24} />
      </div>
    </DashLayout>
  );
}
