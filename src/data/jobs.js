export const COMPANIES = ['Google', 'Microsoft', 'Adobe', 'Stripe', 'Shopify', 'Spotify', 'Notion', 'Figma']
export const COLORS = ['#4285F4', '#00A4EF', '#E11D48', '#7C3AED', '#059669', '#EA580C', '#0891B2', '#DB2777']
export const TYPES = ['Full Time', 'Part Time', 'Contract', 'Internship']
export const LEVELS = ['Entry Level', 'Junior Level', 'Mid Level', 'Senior Level']
export const LOCATIONS = ['Lahore', 'Islamabad', 'Karachi', 'Remote']
export const SALARY_RANGES = [[10, 20], [20, 30], [30, 50], [50, 999]]
export const SKILLS = ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'TypeScript']

export const CATEGORIES = [
  ['💻', 'Software Development', 1245], ['🎨', 'UI/UX Design', 684],
  ['📱', 'Mobile Development', 512], ['📊', 'Data Science', 430],
  ['📈', 'Marketing', 698], ['💼', 'Business', 822],
  ['🔐', 'Cyber Security', 305], ['☁️', 'Cloud Computing', 376],
]

const rows = [
  ['Frontend Developer', 'Full Time', 'Senior Level', 25, 40, 14, ['React', 'JavaScript', 'CSS']],
  ['React Developer', 'Full Time', 'Junior Level', 18, 28, 2, ['React', 'TypeScript']],
  ['UI/UX Designer', 'Part Time', 'Mid Level', 20, 32, 5, ['HTML', 'CSS']],
  ['JavaScript Engineer', 'Contract', 'Mid Level', 30, 45, 9, ['JavaScript', 'Node.js']],
  ['Web Developer', 'Full Time', 'Junior Level', 12, 20, 1, ['HTML', 'CSS', 'JavaScript']],
  ['IT Support Specialist', 'Internship', 'Entry Level', 10, 16, 20, ['HTML']],
  ['Full Stack Developer', 'Full Time', 'Mid Level', 35, 55, 3, ['React', 'Node.js', 'TypeScript']],
  ['QA Engineer', 'Contract', 'Junior Level', 15, 25, 7, ['JavaScript']],
  ['Node.js Developer', 'Full Time', 'Senior Level', 40, 60, 12, ['Node.js', 'TypeScript']],
  ['Junior Web Developer', 'Internship', 'Entry Level', 10, 15, 4, ['HTML', 'CSS', 'JavaScript']],
  ['Technical Support Engineer', 'Part Time', 'Entry Level', 12, 18, 6, ['JavaScript']],
  ['TypeScript Developer', 'Full Time', 'Mid Level', 28, 42, 10, ['TypeScript', 'React']],
]

export const jobs = rows.map(([title, type, level, min, max, days, skills], i) => ({
  id: i + 1, company: COMPANIES[i % 8], title, location: LOCATIONS[i % 4],
  type, level, min, max, days, skills,
}))

export const timeAgo = (d) => (d < 7 ? `${d} day${d > 1 ? 's' : ''} ago` : `${Math.round(d / 7)} week${d >= 14 ? 's' : ''} ago`)
