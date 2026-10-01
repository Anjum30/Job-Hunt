import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";
import { Logo } from "../components/JobCard";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";
import NotFound from "./NotFound";
import { timeAgo } from "../data/jobs";

const list = (items, mark) => (
  <ul className="chk">
    {items.map((x) => (
      <li key={x}>
        {mark} {x}
      </li>
    ))}
  </ul>
);

export default function JobDetails() {
  const { id } = useParams();
  const { findJob, saved, toggleSave } = useJobs();
  const [applying, setApplying] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const job = findJob(id);
  if (!job) return <NotFound />;
  const isSaved = saved.includes(job.id);
  const requirements = [
    ...new Set([...job.skills, "HTML5", "Git/GitHub", "Responsive Design"]),
  ];

  return (
    <section className="pg">
      <div className="wrap">
        <Link className="muted" to="/jobs">
          ← Back to jobs
        </Link>
        <div className="card head" style={{ marginTop: 12 }}>
          <div className="co">
            <Logo company={job.company} />
            {job.company}
          </div>
          <h1>{job.title}</h1>
          <div className="muted">
            {job.location}
            {job.location === "Remote" ? "" : ", Pakistan"}
          </div>
          <p>
            <b>
              ${job.min}–${job.max}/hour
            </b>
            <br />
            {job.type} • {job.level}
          </p>
          <button
            className="btn p"
            onClick={() =>
              user
                ? setApplying(true)
                : navigate("/signin", { state: { from: `/jobs/${job.id}` } })
            }
          >
            Apply Now
          </button>{" "}
          <button className="btn" onClick={() => toggleSave(job.id)}>
            {isSaved ? "♥ Saved" : "♡ Save Job"}
          </button>
        </div>
        <div className="cols">
          <div className="card">
            <h3>About this position</h3>
            <p className="muted">
              We are looking for a skilled {job.title} to join our growing
              development team. You will ship features used by thousands of
              people and grow alongside experienced colleagues.
            </p>
            <h3>Responsibilities</h3>
            {list(
              [
                "Build responsive web applications",
                "Create reusable React components",
                "Work with designers",
                "Optimize website performance",
                "Fix frontend bugs",
              ],
              "•",
            )}
            <h3>Requirements</h3>
            {list(requirements, "•")}
          </div>
          <div className="card">
            <h3>Benefits</h3>
            {list(
              [
                "Flexible working hours",
                "Remote work",
                "Health insurance",
                "Learning budget",
                "Paid vacation",
              ],
              "✓",
            )}
            <p className="muted">Posted {timeAgo(job.days)}</p>
          </div>
        </div>
      </div>
      {applying && (
        <Modal
          title={`Apply for ${job.title}`}
          onClose={() => setApplying(false)}
        >
          <ApplicationForm job={job} onDone={() => setApplying(false)} />
        </Modal>
      )}
    </section>
  );
}
