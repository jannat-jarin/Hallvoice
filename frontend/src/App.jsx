
import { useState } from 'react'
import './App.css'

function App() {
  
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
 async function handleLogin(event) {
  event.preventDefault()
  if (!identifier.trim() || !password) {
    setMessage("Enter your email or user ID and password.")
    return
  }
setMessage("Checking credentials...")

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifier.trim(),
        password: password,
      }),
    })

    const data = await response.json()

    setMessage(
      data.message ||
      (response.ok ? "Credentials verified." : "Login failed.")
    )
  } catch {
    setMessage("Cannot connect to the server. Check that Django is running.")
  }
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
