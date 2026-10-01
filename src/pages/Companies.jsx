export default function Companies() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      industry: "Software & IT",
      jobsCount: 12,
      location: "Lahore, Pakistan",
    },
    {
      id: 2,
      name: "InnoSoft",
      industry: "Design & Creative",
      jobsCount: 5,
      location: "Islamabad, Pakistan",
    },
    {
      id: 3,
      name: "DataPeak",
      industry: "Analytics & AI",
      jobsCount: 8,
      location: "Karachi, Pakistan",
    },
  ];

  return (
    <div className="wrap" style={{ padding: "2rem 0" }}>
      <h1>Top Companies Hiring</h1>
      <p style={{ color: "gray", marginBottom: "2rem" }}>
        Discover great places to work and explore company cultures.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {companies.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0" }}>
              {c.name}
            </h2>
            <p style={{ margin: "0.25rem 0", color: "#64748b" }}>
              {c.industry}
            </p>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
              📍 {c.location}
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "1rem",
                fontWeight: "bold",
              }}
            >
              {c.jobsCount} Open Positions
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
