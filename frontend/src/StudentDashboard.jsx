import './StudentDashboard.css'

function StudentDashboard({ user, onLogout, message }) {
  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h2 className="student-brand">HallVoice</h2>

        <nav className="student-menu" aria-label="Student navigation">
          <button type="button" aria-current="page">
            Dashboard
          </button>
          <button type="button" disabled>My Complaints</button>
          <button type="button" disabled>Hall Issues</button>
          <button type="button" disabled>Profile</button>
        </nav>

        <button
          type="button"
          className="student-logout"
          onClick={onLogout}
        >
          Log out
        </button>
      </aside>

      <div className="student-workspace">
        <header className="student-header">
          <div>
            <p>HALL SERVICES</p>
            <strong>GANATANTRA Hall</strong>
          </div>
          <span>{user.username}</span>
        </header>

        <main className="student-content">
          <p>Student dashboard</p>
          <h1>Welcome back, {user.username}</h1>
          <p>Track your complaints and help improve your hall.</p>
          <p role="status">{message}</p>
        </main>
      </div>
    </div>
  )
}

export default StudentDashboard