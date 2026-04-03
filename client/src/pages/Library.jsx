import "./Auth.css"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"
import API from "../api"

function Library() {
  const [folders, setFolders] = useState([])
  const [cards, setCards] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("cards")
  const [menuOpenId, setMenuOpenId] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const c = await API.get("/cards")
      const f = await API.get("/folders")
      setCards(c.data)
      setFolders(f.data)
    } catch (e) {
      console.error("Ошибка загрузки:", e)
    }
  }

  const deleteCard = async (id) => {
    try {
      await API.delete(`/cards/${id}`)
      setCards(prev => prev.filter(c => c._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  const deleteFolder = async (id) => {
    try {
      await API.delete(`/folders/${id}`)
      setFolders(prev => prev.filter(f => f._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="dashboard">

      <Sidebar
        folders={folders}
        cards={cards}
        setShowModal={setShowModal}
        deleteFolder={deleteFolder}
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
              cards.map((card) => (
                <div key={card._id} className="library-card">
                  <div>{card.title}</div>

                  {/* ⋮ меню */}
                  <div
                    className="card-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpenId(menuOpenId === card._id ? null : card._id)
                    }}
                  >
                    ⋮
                  </div>

                  {menuOpenId === card._id && (
                    <div className="card-menu">
                      <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/edit/${card._id}`
                        }}
                        >
                          Редактировать
                        </button>
                      <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteCard(card._id)
                        setMenuOpenId(null)
                        }}
                        >
                          Удалить
                        </button>
                    </div>
                  )}
                </div>
              ))
            )
          )}

          {/* ПАПКИ */}
          {activeTab === "folders" && (
            folders.length === 0 ? (
              <p>Нет папок</p>
            ) : (
              folders.map((folder) => (
                <div key={folder._id} className="library-card">
                  <div>{folder.name}</div>

                  {/* ⋮ меню */}
                  <div
                    className="card-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpenId(menuOpenId === folder._id ? null : folder._id)
                    }}
                  >
                    ⋮
                  </div>

                  {menuOpenId === folder._id && (
                    <div className="card-menu">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteFolder(folder._id)
                          setMenuOpenId(null)
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
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