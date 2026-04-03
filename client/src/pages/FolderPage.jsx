import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function FolderPage() {
  const { id } = useParams()

  const [folder, setFolder] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {
    load()
  }, [id]) // ✅ важно

  const load = async () => {
    try {
      const foldersRes = await API.get("/folders")
      const cardsRes = await API.get("/cards")

      console.log("FOLDER ID:", id)
      console.log("CARDS:", cardsRes.data)

      const foundFolder = foldersRes.data.find(f => f._id === id)

      const filteredCards = cardsRes.data.filter(
        c => String(c.folderId) === String(id) // ✅ фикс
      )

      setFolder(foundFolder)
      setCards(filteredCards)

    } catch (e) {
      console.error(e)
    }
  }

  if (!folder) return <div>Загрузка...</div>

  return (
    <div className="dashboard">

      {/* оставил как у тебя */}
      <Sidebar folders={[]} cards={cards} />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h1>{folder.name}</h1>

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

    </div>
  )
}

export default FolderPage