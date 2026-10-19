

import './App.css'

function App() {
  
 
  return (
    <>
      <section id="center">
       
        <div>
          <h1>hallvoice</h1>
        <p>Report a problem. Track it to resolution.</p>
        <div className="login-field">
  <label htmlFor="identifier">Email or User ID</label>
  <input
    id="identifier"
    type="text"
    placeholder="Enter your email or user ID"
  />
</div>
<div className="login-field">
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    placeholder="Enter your password"
  />
</div>
        </div>
        <button type="button" className="login-button">
  Log in
  </button>

</section>
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
