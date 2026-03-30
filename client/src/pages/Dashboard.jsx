import './Auth.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="logo">🏠</h3>

        <div className="menu">
          <p>Главная</p>
          <p>Библиотека</p>
        </div>

        <div className="folders">
          <p className="title">Ваши папки</p>
          <p>📁 папка</p>
          <p>➕ новая папка</p>
        </div>

        <div className="cards">
          <p className="title">Карточки</p>
          <p>🗂 Карточки</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        {/* TOP BAR */}
        <div className="topbar">
          <input placeholder="Поиск..." />

          <button
            className="logout"
            onClick={() => navigate('/')}
          >
            Выйти
          </button>
        </div>

        {/* HERO BLOCK */}
        <div className="hero">
          <button className="continue-btn">Продолжить</button>
        </div>

        {/* CARDS */}
        <div className="card-grid">
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard