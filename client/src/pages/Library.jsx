import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"

function Library() {
  const [folders, setFolders] = useState(() => {
    return JSON.parse(localStorage.getItem("folders")) || ["папка"]
  })
  const [activeMenu, setActiveMenu] = useState(null)

  const [cards, setCards] = useState([
    "название карточки",
    "название карточки",
    "название карточки",
    "название карточки"
  ])

  const deleteFolder = (index) => {
    const updated = folders.filter((_, i) => i !== index)
    setFolders(updated)
  }

  return (
    <div className="dashboard">
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        deleteFolder={deleteFolder}
      />

      <div className="main">
        <Topbar />

        <div className="library-page">
          <h1 className="library-title">Ваша библиотека</h1>

          <div className="library-tabs">
            <span>Модуль</span>
            <span>Папки</span>
          </div>

          {cards.map((card, index) => (
            <div key={index} className="library-card">
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library