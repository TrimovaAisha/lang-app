import "./Auth.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"

function Folders() {
  const { id } = useParams() // 🔥 ВАЖНО: берем id из URL

  const [folders, setFolders] = useState([])
  const [modules, setModules] = useState([])
  const [allModules, setAllModules] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  // загрузка
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const f = await API.get("/folders")
      const c = await API.get("/cards")

      setFolders(f.data)
      setAllModules(c.data)

      const current = f.data.find(f => f._id === id)
      if (current) {
        setModules(current.modules || [])
      }
    } catch (e) {
      console.error(e)
    }
  }

  // добавление модуля
  const addModule = async (mod) => {
    if (modules.find(m => m._id === mod._id)) return

    const updated = [...modules, mod]
    setModules(updated)

    try {
      await API.put(`/folders/${id}`, { modules: updated })
    } catch (e) {
      console.error(e)
    }

    setShowAddModal(false)
  }

  // удаление
  const deleteModule = async (modId) => {
    const updated = modules.filter(m => m._id !== modId)
    setModules(updated)

    try {
      await API.put(`/folders/${id}`, { modules: updated })
    } catch (e) {
      console.error(e)
    }
  }

  const currentFolder = folders.find(f => f._id === id)

  return (
    <div className="dashboard">
      <Sidebar folders={folders} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h2 className="folder-header">
            {currentFolder ? currentFolder.name : "Загрузка..."}
          </h2>

          {/* ➕ КНОПКА */}
          <div className="folder-actions-top">
            <button onClick={() => setShowAddModal(true)}>+</button>
          </div>

          {/* МОДУЛИ */}
          {modules.map(mod => (
            <div key={mod._id} className="module-item">
              <span>{mod.title}</span>
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteModule(mod._id)}
              ></i>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 НОВАЯ МОДАЛКА (НЕ FolderModal!) */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">

            <h3>Добавить модуль</h3>

            <div className="modules-list">
              {allModules.map(mod => (
                <div
                  key={mod._id}
                  className="module-select-item"
                  onClick={() => addModule(mod)}
                >
                  {mod.title}
                </div>
              ))}
            </div>

            <button onClick={() => setShowAddModal(false)}>
              Закрыть
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default Folders