import "./Auth.css"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { useParams } from "react-router-dom"

function Study() {
  const { id } = useParams() // id набора
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await API.get("/cards")

        // ищем нужный набор
        const set = res.data.find(c => String(c._id) === id)

        if (set) {
          setCards(set.cards)
          setTitle(set.title)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchCards()
  }, [id])

  const next = () => {
    setIndex((prev) => (prev + 1) % cards.length)
    setFlipped(false)
  }

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    )
    setFlipped(false)
  }

  if (cards.length === 0) {
    return <p>Нет карточек</p>
  }

  const current = cards[index]

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="study-page">

          <h2 className="study-title">{title}</h2>

          <div
            className={`study-card ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="card-inner">

              <div className="card-front">
                {current.term}
              </div>

              <div className="card-back">
                {current.definition}
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
  )
}

export default Study