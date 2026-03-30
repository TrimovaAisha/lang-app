import './Auth.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-icon user-icon">
          <i className="fa-solid fa-user"></i>
        </div>

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-button"
          onClick={() => navigate('/dashboard')}
        >
          Вход
        </button>

        <p
          className="auth-link"
          onClick={() => navigate('/register')}
        >
          Регистрация
        </p>
      </div>
    </div>
  )
}

export default Login