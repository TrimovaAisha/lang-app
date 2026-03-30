import './Auth.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3 className="logo">
          <i className="fa-solid fa-house"></i>
        </h3>

        <div className="menu">
          <p>Главная</p>
          <p>Библиотека</p>
        </div>

        <div className="folders">
          <p className="title">Ваши папки</p>
          <p>
            <i className="fa-solid fa-folder"></i> папка
          </p>
          <p>
            <i className="fa-solid fa-plus"></i> новая папка
          </p>
        </div>

        <div className="cards">
          <p className="title">Карточки</p>
          <p>
            <i className="fa-solid fa-clone"></i> Карточки
          </p>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <input placeholder="Поиск..." />

          <button
            className="logout"
            onClick={() => navigate('/')}
          >
            Выйти
          </button>
        </div>

        <div className="hero">
          <button className="continue-btn">Продолжить</button>
        </div>

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