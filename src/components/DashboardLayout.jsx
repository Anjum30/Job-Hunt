import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const items = [
  ["/dashboard", "Dashboard"],
  ["/saved", "Saved Jobs"],
  ["/applications", "Applications"],
  ["/profile", "Profile"],
];

export default function DashLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="pg">
      <div className="wrap dash">
        <aside className="side card">
          <b className="logo" style={{ padding: "6px 14px" }}>
            JobHunt
          </b>
          {items.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate("/");
            }}
          >
            Logout
          </a>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
