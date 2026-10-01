import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["/jobs", "Find Jobs"],
    ["/companies", "Companies"],
    ["/career-advice", "Career Advice"],
  ];
  return (
    <nav className={stuck ? "stuck" : ""}>
      <div className="wrap nav">
        <Link className="logo" to="/">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
          </svg>
          JobHunt
        </Link>
        <div className="links">
          {links.map(([to, label]) => (
            <NavLink key={label} to={to}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="right">
          <button
            className="btn icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          {user ? (
            <>
              <Link className="btn hide" to="/dashboard">
                {user.name.split(" ")[0]}
              </Link>
              <button className="btn p hide" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="btn hide" to="/signin">
                Sign in
              </Link>
              <Link className="btn p hide" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
        <button
          className="btn icon burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>
      <div
        className={`menu ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      >
        {links.map(([to, label]) => (
          <Link key={label} to={to}>
            {label}
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Log out
            </a>
          </>
        ) : (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
