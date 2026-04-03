import "./Auth.css"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"

function EditCard() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const res = await API.get("/cards")
      const found = res.data.find(c => c._id === id)

      if (!found) return

      setTitle(found.title)
      setCards(found.cards)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const updateCard = (i, field, value) => {
    const copy = [...cards]
    copy[i][field] = value
    setCards(copy)
  }

  const addCard = () => {
    setCards([...cards, { term: "", definition: "" }])
  }

  // 🔥 ВОТ ТУТ ФИКС
  const save = async () => {
    try {
      // удаляем старый набор
      await API.delete(`/cards/${id}`)

      // создаём новый
      await API.post("/cards", { title, cards })

      navigate("/dashboard")
    } catch (e) {
      console.error(e)
      alert("Ошибка при сохранении")
    }
  }

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="cards-page">

          <input
            className="cards-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {cards.map((c, i) => (
            <div key={i} className="card-editor">
              <input
                value={c.term}
                onChange={(e) => updateCard(i, "term", e.target.value)}
                placeholder="Термин"
              />

              <input
                value={c.definition}
                onChange={(e) => updateCard(i, "definition", e.target.value)}
                placeholder="Определение"
              />
            </div>
          ))}

          <div className="cards-bottom">
            <button onClick={addCard}>Добавить</button>

            <button className="create-btn" onClick={save}>
              Сохранить
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditCard