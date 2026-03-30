import '../Auth.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CardItem from '../components/CardItem'

function Card() {
  const navigate = useNavigate()

  const [cards, setCards] = useState([
    { term: '', definition: '' }
  ])

  const [title, setTitle] = useState('')

  // добавление карточки
  const addCard = () => {
    setCards([...cards, { term: '', definition: '' }])
  }

  // обновление карточки
  const updateCard = (index, field, value) => {
    const updated = [...cards]
    updated[index][field] = value
    setCards(updated)
  }

  // удаление одной карточки
  const removeCard = (index) => {
    const updated = cards.filter((_, i) => i !== index)
    setCards(updated)
  }

  // очистка всех
  const clearAll = () => {
    setCards([{ term: '', definition: '' }])
  }

  return (
    <div className="dashboard">

      {/* SIDEBAR — 그대로 */}
      <div className="sidebar">
        <h3 className="logo"> </h3>

        <div className="menu">
          <p><i className="fa-solid fa-house"></i> Главная</p>
          <p><i className="fa-solid fa-book"></i> Библиотека</p>
        </div>

        <div className="folders">
          <p className="title">Ваши папки</p>
          <p><i className="fa-solid fa-folder"></i> папка</p>
        </div>

        <div className="cards">
          <p className="title">Карточки</p>
          <p><i className="fa-solid fa-layer-group"></i> Карточки</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <input placeholder="Поиск..." />
          <button className="logout" onClick={() => navigate('/')}>
            Выйти
          </button>
        </div>

        {/* 🔥 CARDS PAGE */}
        <div className="cards-page">

          <input
            className="cards-title"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="cards-actions">
            <button className="import-btn">
              + Импортировать
            </button>

            <i
              className="fa-solid fa-trash delete-icon"
              onClick={clearAll}
            ></i>
          </div>

          {/* список карточек */}
          {cards.map((card, index) => (
            <CardItem
              key={index}
              card={card}
              index={index}
              updateCard={updateCard}
              removeCard={removeCard}
            />
          ))}

          <div className="cards-bottom">
            <button onClick={addCard}>
              Добавить карточку
            </button>

            <button className="create-btn">
              Создать
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Card