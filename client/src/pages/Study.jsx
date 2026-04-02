import "./Auth.css"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { useParams } from "react-router-dom"

function Study() {
  const { id } = useParams()

  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await API.get("/cards")
        const set = res.data.find(c => String(c._id) === id)

        if (set) {
          setCards(set.cards || [])
          setTitle(set.title || "Без названия")
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchCards()
  }, [id])

  const next = () => {
    if (cards.length === 0) return
    setFlipped(false)
    setTimeout(() => {
        setIndex(prev => (prev + 1) % cards.length)
    }, 150)
}
  const prev = () => {
    if (cards.length === 0) return
    setFlipped(false)
    setTimeout(() => {
        setIndex(prev =>
            prev === 0 ? cards.length - 1 : prev - 1
        )
    }, 150)
}

  if (cards.length === 0) {
    return (
      <div className="dashboard">
        <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />
        <div className="main">
          <Topbar />
          <p style={{ color: "white", padding: "20px" }}>
            Нет карточек
          </p>
        </div>
      </div>
    )
  }

  const current = cards[index]

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="study-wrapper">
          <div className="study-box">

            <h2 className="study-title">{title}</h2>

            <div
              className={`study-card ${flipped ? "flipped" : ""}`}
              onClick={() => setFlipped(!flipped)}
            >
              <div className="card-inner">

                <div className="card-front">
                  {current?.term}
                </div>

                <div className="card-back">
                  {current?.definition}
                </div>

              </div>
            </div>

            <div className="study-controls">
              <button onClick={prev}>Назад</button>
              <button onClick={next}>Вперёд</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Study