export default function CareerAdvice() {
  const articles = [
    {
      id: 1,
      title: "How to Ace Your Technical Frontend Interview",
      category: "Interview Tips",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Building an ATS-Friendly Resume in 2026",
      category: "Resume Guide",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Salary Negotiation: What You Need to Know",
      category: "Career Growth",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="wrap" style={{ padding: "2rem 0" }}>
      <h1>Career Advice & Resources</h1>
      <p style={{ color: "gray", marginBottom: "2rem" }}>
        Tips, guides, and industry insights to take your career to the next
        level.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {articles.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "#3b82f6",
                fontWeight: "600",
              }}
            >
              {item.category}
            </span>
            <h2 style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
              {item.title}
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              ⏱ {item.readTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
