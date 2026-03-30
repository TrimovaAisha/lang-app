import './Auth.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-icon">🏠</div>

        <h2 style={{ color: 'white' }}>Dashboard</h2>

        <button
          className="auth-button"
          onClick={() => navigate('/')}
        >
          Выйти
        </button>
      </div>
    </div>
  )
}

export default Dashboard