
import { useState, useEffect } from 'react'
import './App.css'
import StudentDashboard from './StudentDashboard'

function App() {
  
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

useEffect(() => {
  const controller = new AbortController()

  async function checkSession() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/session/",
        {
          credentials: "include",
          signal: controller.signal,
        }
      )

      if (!response.ok) {
        throw new Error("Session check failed")
      }

      const data = await response.json()

      setUser(data.isAuthenticated ? data.user : null)
      setCheckingSession(false)
    } catch {
      if (controller.signal.aborted) return

      setMessage("Could not check your session. Please refresh.")
      setCheckingSession(false)
    }
  }

  checkSession()

  return () => controller.abort()
}, [])
 async function handleLogin(event) {
  event.preventDefault()
  if (!identifier.trim() || !password) {
    setMessage("Enter your email or user ID and password.")
    return
  }
setMessage("Checking credentials...")

  try {
    const csrfResponse = await fetch("http://127.0.0.1:8000/api/csrf/", {
  credentials: "include",
})

if (!csrfResponse.ok) {
  setMessage("Could not prepare login. Please try again.")
  return
}

const csrfData = await csrfResponse.json()
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
     method: "POST",
credentials: "include",
headers: {
  "Content-Type": "application/json",
  "X-CSRFToken": csrfData.csrfToken,
},
      body: JSON.stringify({
        identifier: identifier.trim(),
        password: password,
      }),
    })

    const data = await response.json()
    if (response.ok) {
  setUser(data.user)
  setPassword("")
  setMessage("")
  return
}

    setMessage(
      data.message ||
      (response.ok ? "Credentials verified." : "Login failed.")
    )
  } catch {
    setMessage("Cannot connect to the server. Check that Django is running.")
  }
}
async function handleLogout() {
  setMessage("")

  try {
    const csrfResponse = await fetch(
      "http://127.0.0.1:8000/api/csrf/",
      { credentials: "include" }
    )

    if (!csrfResponse.ok) {
      throw new Error("Could not prepare logout")
    }

    const csrfData = await csrfResponse.json()

    const response = await fetch(
      "http://127.0.0.1:8000/api/logout/",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfData.csrfToken,
        },
      }
    )

    if (!response.ok) {
      throw new Error("Logout failed")
    }

    setUser(null)
    setPassword("")
    setMessage("Logged out successfully.")
  } catch {
    setMessage("Could not log out. Please try again.")
  }
}
if (checkingSession) {
  return <p role="status">Checking your session...</p>
}
if (user) {
  return (
    <StudentDashboard
      user={user}
      onLogout={handleLogout}
      message={message}
    />
  )
}
  return (
    <>
      
       
        <div className="login-layout">
        <img
  src="/assets/hall.jpeg"
  alt="Pust ganatantra hall"
  className="hall-photo"
/>
<form id="center" onSubmit={handleLogin}>
         <div className="login-content">
        <h1 className="login-title">HallVoice</h1>
        <p>Report a problem. Track it to resolution.</p>
        <div className="login-field">
  <label htmlFor="identifier">Email or User ID</label>
  <input
    id="identifier"
    name="identifier"
autoComplete="username"
    type="text"
    value={identifier}
onChange={(event) => {
  setIdentifier(event.target.value)
  setMessage("")
}}
    placeholder="Enter your email or user ID"
  />
</div>
<div className="login-field">
  <label htmlFor="password">Password</label>
  <input
    id="password"
    name="password"
autoComplete="current-password"
    type={showPassword ? "text" : "password"}
    value={password}
onChange={(event) => {
  setPassword(event.target.value)
  setMessage("")
}}
    placeholder="Enter your password"
  />
  <button
 
  type="button"
  className="password-toggle"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? "Hide password" : "Show password"}
</button>
  
</div>
       </div>
<button type="submit" className="login-button">
  Log in
</button>
<p role="status">{message}</p>
</form>
</div>


<section className="contact-section">
  <h2>Contact Us</h2>
  <p>
    For account or login assistance, contact your hall office.
  </p>
</section>
 </>

  )
}


export default App
