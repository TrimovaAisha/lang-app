import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function FolderPage() {
  const { id } = useParams()

  const [folder, setFolder] = useState(null)
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    load()
  }, [id])

  const load = async () => {
    try {
      const foldersRes = await API.get("/folders")
      const cardsRes = await API.get("/cards")

      const foundFolder = foldersRes.data.find(f => f._id === id)

      const filteredCards = cardsRes.data.filter(
        c => String(c.folderId) === String(id)
      )

      setFolder(foundFolder)
      setCards(filteredCards)

    } catch (e) {
      console.error(e)
    }
  }

  const createCard = async () => {
    if (!title.trim()) return

    try {
      const res = await API.post("/cards", {
        title,
        folderId: id
      })

      setCards(prev => [...prev, res.data])
      setTitle("")
      setShowModal(false)

    } catch (e) {
      console.error(e)
    }
  }

  if (!folder) return <div>Загрузка...</div>

  return (
    <div className="dashboard">

      <Sidebar folders={[]} cards={cards} />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h1>{folder.name}</h1>

          <button
            onClick={() => setShowModal(true)}
            style={{ fontSize: "24px", padding: "10px 15px" }}
          >
            +
          </button>

          {cards.length === 0 ? (
            <p>В этой папке пока нет карточек</p>
          ) : (
            cards.map(card => (
              <div key={card._id} className="library-card">
                {card.title}
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setShowModal(false)}>
              ✕
            </span>

            <h2>Новая карточка</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название карточки"
            />

            <button onClick={createCard}>Создать</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default FolderPage