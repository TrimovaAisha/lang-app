import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function Flashcard() {
  const { id } = useParams()
  const [set, setSet] = useState(null)
  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const res = await API.get("/cards")
    const found = res.data.find(s => s._id === id)
    setSet(found)
  }

  if (!set) return null

  const card = set.cards[index]

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="flashcard" onClick={() => setFlip(!flip)}>
          {flip ? card.definition : card.term}
        </div>

        <div>
          <button onClick={() => setIndex(i => Math.max(i - 1, 0))}>Назад</button>
          <button onClick={() => setIndex(i => Math.min(i + 1, set.cards.length - 1))}>Вперёд</button>
        </div>
      </div>
    </div>
  )
}

export default Flashcard