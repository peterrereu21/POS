import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ onSwitch }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) =>{
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      // Example API call - adjust endpoint as needed
      const res = await axios.post('/api/auth/login', { email, password })
      // store token, redirect, etc.
      console.log('login', res.data)
      alert('Login successful (demo)')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Sign in</h2>

      <label className="field">
        <span>Email</span>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </label>

      <label className="field">
        <span>Password</span>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      </label>

      {error && <div className="error">{error}</div>}

      <button className="btn primary" disabled={loading}>{loading? 'Signing...' : 'Sign in'}</button>

      <div className="links">
        <button type="button" className="link" onClick={() => onSwitch('forgot')}>Forgot password?</button>
        <button type="button" className="link" onClick={() => onSwitch('register')}>Create account</button>
      </div>
    </form>
  )
}
