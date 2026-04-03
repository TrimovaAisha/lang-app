import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function FolderPage() {
  const { id } = useParams()

  const [folder, setFolder] = useState(null)
  const [cards, setCards] = useState([])
  const [allCards, setAllCards] = useState([])
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
      setAllCards(cardsRes.data)

    } catch (e) {
      console.error(e)
    }
  }

  const addExistingCard = async (card) => {
    if (cards.find(c => c._id === card._id)) return

    const updated = [...cards, { ...card, folderId: id }]
    setCards(updated)

    try {
      await API.put(`/cards/${card._id}`, {
        folderId: id
      })
    } catch (e) {
      console.error(e)
    }

    setShowModal(false)
  }

  if (!folder) return <div>Загрузка...</div>

  return (
    <div className="dashboard">

      <Sidebar folders={[]} cards={cards} />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h1>{folder.name}</h1>

          <button onClick={() => setShowModal(true)}>+</button>

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

            <h3>Добавить карточку</h3>

            <div className="cards-list">
              {allCards.map(card => (
                <div
                  key={card._id}
                  className="card-item"
                  onClick={() => addExistingCard(card)}
                >
                  {card.title}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default FolderPage