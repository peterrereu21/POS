import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'

export default function App(){
  const [view, setView] = useState('login')
  return (
    <div className="app-bg">
      <div className="auth-container">
        <div className="brand">MyPOS</div>
        {view === 'login' && <Login onSwitch={setView} />}
        {view === 'register' && <Register onSwitch={setView} />}
        {view === 'forgot' && <ForgotPassword onSwitch={setView} />}
      </div>
    </div>
  )
}
