import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"

function Library() {
  const [folders, setFolders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("folders") || "[]")
    } catch {
      return []
    }
  })

  const [cards, setCards] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cards") || "[]")
    } catch {
      return []
    }
  })

  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("cards")

  // ✅ удаление папки
  const handleDeleteFolder = (index) => {
    setFolders(prev => {
      const updated = prev.filter((_, i) => i !== index)
      localStorage.setItem("folders", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="dashboard">

      <Sidebar
        folders={folders}
        cards={cards}
        setShowModal={setShowModal}
        deleteFolder={handleDeleteFolder}
        setActiveMenu={() => {}}   
        activeMenu={null}        
      />

      <div className="main">
        <Topbar />

        <div className="library-page">
          <h1>Ваша библиотека</h1>

          <div className="library-tabs">
            <span
              className={activeTab === "cards" ? "active" : ""}
              onClick={() => setActiveTab("cards")}
            >
              Модуль
            </span>

            <span
              className={activeTab === "folders" ? "active" : ""}
              onClick={() => setActiveTab("folders")}
            >
              Папки
            </span>
          </div>

          {/* КАРТОЧКИ */}
          {activeTab === "cards" && (
            cards.length === 0 ? (
              <p>Нет карточек</p>
            ) : (
              cards.map((card, index) => (
                <div key={index} className="library-card">
                  {card.title || card}
                </div>
              ))
            )
          )}

          {/* ПАПКИ */}
          {activeTab === "folders" && (
            folders.length === 0 ? (
              <p>Нет папок</p>
            ) : (
              folders.map((folder, index) => (
                <div key={index} className="library-card">
                  {folder.name || folder}
                </div>
              ))
            )
          )}
        </div>
      </div>

      <FolderModal
      showModal={showModal}
      setShowModal={setShowModal}
      setFolders={setFolders}
      />

    </div>
  )
}

export default Library