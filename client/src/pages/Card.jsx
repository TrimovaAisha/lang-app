import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

function Card() {
  const [cards, setCards] = useState([{ term: "", definition: "" }])
  const [title, setTitle] = useState("")
  const [folders, setFolders] = useState([])
  const [allCards, setAllCards] = useState([])
  const navigate = useNavigate()

  const addCard = () => {
    setCards([...cards, { term: "", definition: "" }])
  }

  const updateCard = (i, field, value) => {
    const copy = [...cards]
    copy[i][field] = value
    setCards(copy)
  }

  const save = async () => {
    await API.post("/cards", { title, cards })
    navigate("/dashboard")
  }

  const clearCards = () => {
    setCards([{ term: "", definition: "" }])
    setTitle("")
  }

  return (
    <div className="dashboard">

      <Sidebar
        folders={folders}
        cards={allCards}
        setShowModal={() => {}}
        deleteFolder={() => {}}
        setActiveMenu={() => {}}
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

          {/* КНОПКИ */}
          <div className="card-actions">

            <button onClick={() => navigate("/import")}>
              <FontAwesomeIcon icon={faPlus} /> Import
            </button>

            <button onClick={clearCards}>
              <FontAwesomeIcon icon={faTrash} /> Очистить
            </button>

          </div>

          {/* КАРТОЧКИ */}
          {cards.map((c, i) => (
            <div key={i} className="card-editor">
              <input
                placeholder="Термин"
                value={c.term}
                onChange={(e) => updateCard(i, "term", e.target.value)}
              />

              <input
                placeholder="Определение"
                value={c.definition}
                onChange={(e) => updateCard(i, "definition", e.target.value)}
              />
            </div>
          ))}

          <div className="cards-bottom">
            <button onClick={addCard}>Добавить</button>
            <button className="create-btn" onClick={save}>
              Создать
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Card