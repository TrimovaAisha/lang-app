import "./Auth.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CardItem from '../components/CardItem'
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function Card() {
  const navigate = useNavigate()

  const [folders, setFolders] = useState(["папка"])
  const [activeMenu, setActiveMenu] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const deleteFolder = (index) => {
    const updated = folders.filter((_, i) => i !== index)
    setFolders(updated)
  }

  const [cards, setCards] = useState([
    { term: '', definition: '' }
  ])

  const [title, setTitle] = useState('')

  const addCard = () => {
    setCards([...cards, { term: '', definition: '' }])
  }

  const updateCard = (index, field, value) => {
    const updated = [...cards]
    updated[index][field] = value
    setCards(updated)
  }

  const removeCard = (index) => {
    const updated = cards.filter((_, i) => i !== index)
    setCards(updated)
  }

  const clearAll = () => {
    setCards([{ term: '', definition: '' }])
  }

  return (
    <div className="dashboard">
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowModal={setShowModal}
        deleteFolder={deleteFolder}
      />

      <div className="main">
        <Topbar />

        <div className="cards-page">

          <input
            className="cards-title"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="cards-actions">
            <button
              className="import-btn"
              onClick={() => navigate("/import")}
            >
              + Импортировать
            </button>

            <i
              className="fa-solid fa-trash delete-icon"
              onClick={clearAll}
            ></i>
          </div>

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