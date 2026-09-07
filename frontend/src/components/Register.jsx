import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ onSwitch }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) =>{
    e.preventDefault()
    setError(null)
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try{
      const res = await axios.post('/api/auth/register', { name, email, password })
      console.log('registered', res.data)
      alert('Registration successful (demo)')
      onSwitch('login')
    }catch(err){
      setError(err.response?.data?.message || 'Registration failed')
    }finally{ setLoading(false) }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Create account</h2>

      <label className="field"><span>Full name</span><input value={name} onChange={e=>setName(e.target.value)} required /></label>
      <label className="field"><span>Email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
      <label className="field"><span>Password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
      <label className="field"><span>Confirm</span><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required /></label>

      {error && <div className="error">{error}</div>}

      <button className="btn primary" disabled={loading}>{loading? 'Creating...' : 'Create account'}</button>
      <div className="links">
        <button type="button" className="link" onClick={() => onSwitch('login')}>Already have an account? Sign in</button>
      </div>
    </form>
  )
}
