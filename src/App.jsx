import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'

function App() {
  const [active, setActive] = useState('grocery')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [authVisible, setAuthVisible] = useState(!localStorage.getItem('token'))

  useEffect(()=>{
    if(token){ localStorage.setItem('token', token) }
  },[token])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header active={active} onTabChange={setActive} />
      {!token && (
        <AuthModal onClose={()=>setAuthVisible(false)} onAuthed={setToken} />
      )}
      <Home vertical={active} />
    </div>
  )
}

function AuthModal({ onAuthed }){
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  async function submit(e){
    e.preventDefault()
    const url = mode==='login' ? `${baseUrl}/auth/login` : `${baseUrl}/auth/register`
    const body = mode==='login' ? { email, password } : { name, email, password }
    const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if(!res.ok){ alert('Auth failed'); return }
    const json = await res.json()
    onAuthed(json.token)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-30">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{mode==='login' ? 'Login' : 'Create account'}</h3>
          <button onClick={()=>setMode(mode==='login'?'register':'login')} className="text-blue-600 text-sm">
            {mode==='login' ? 'New here? Register' : 'Have an account? Login'}
          </button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode==='register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border rounded-lg px-3 py-2" required />
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded-lg px-3 py-2" required />
          <button className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold">{mode==='login' ? 'Login' : 'Register'}</button>
        </form>
      </div>
    </div>
  )
}

export default App
