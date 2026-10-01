import { useState } from "react";
import DashLayout from "../components/DashLayout";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../context/AuthContext";

const FIELDS = [
  "name",
  "email",
  "phone",
  "location",
  "experience",
  "education",
];
const defaults = (u) => ({
  name: u.name,
  email: u.email,
  phone: "",
  location: "",
  experience: "",
  education: "",
});

export default function Profile() {
  const { user } = useAuth();
  const [prof, setProf] = useLocalStorage(`jh_prof_${user.id}`, defaults(user));
  const [editing, setEditing] = useState(false);
  return (
    <DashLayout>
      <h2>Profile</h2>
      <div className="card">
        <div className="av">{prof.name[0]}</div>
        <div className="pgrid">
          {FIELDS.map((k) => (
            <div className="f" key={k}>
              <label style={{ textTransform: "capitalize" }}>{k}</label>
              <input
                className="fld"
                disabled={!editing}
                value={prof[k]}
                onChange={(e) => setProf({ ...prof, [k]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <label className="muted">Skills</label>
        <div className="tags" style={{ margin: "6px 0 20px" }}>
          {["React", "JavaScript", "HTML", "CSS", "Git", "Figma"].map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
        <button className="btn p" onClick={() => setEditing(!editing)}>
          {editing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </DashLayout>
  );
}
