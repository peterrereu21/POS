import React, { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword({ onSwitch }){
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) =>{
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    try{
      await axios.post('/api/auth/forgot-password', { email })
      setMessage('If an account exists, a password reset link was emailed.')
    }catch(err){
      setMessage('Request failed, please try later.')
    }finally{ setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Reset password</h2>
      <p className="muted">Enter your account email and instructions will be sent.</p>
      <label className="field"><span>Email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
      {message && <div className="info">{message}</div>}
      <button className="btn primary" disabled={loading}>{loading? 'Sending...' : 'Send reset link'}</button>
      <div className="links">
        <button type="button" className="link" onClick={() => onSwitch('login')}>Back to sign in</button>
      </div>
    </form>
  )
}
