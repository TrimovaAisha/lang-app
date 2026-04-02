import "./Auth.css"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"
import API from "../api"

function Folders({ folderId }) {
  const [folders, setFolders] = useState([])
  const [modules, setModules] = useState([]) // модули в выбранной папке
  const [allModules, setAllModules] = useState([]) // все доступные модули для добавления
  const [activeMenu, setActiveMenu] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)

  useEffect(() => {
    loadFolders()
    loadAllModules()
  }, [])

  useEffect(() => {
    if (folders.length > 0 && folderId) {
      const folder = folders.find(f => f._id === folderId)
      setSelectedFolder(folder)
      setModules(folder?.modules || [])
    }
  }, [folders, folderId])

  // Загрузка папок с сервера
  const loadFolders = async () => {
    try {
      const res = await API.get("/folders")
      setFolders(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  // Загрузка всех модулей с сервера
  const loadAllModules = async () => {
    try {
      const res = await API.get("/cards") // допустим, модули это карточки
      setAllModules(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  // Добавление модуля в папку
  const addModuleToFolder = (mod) => {
    if (!modules.find(m => m._id === mod._id)) {
      const updated = [...modules, mod]
      setModules(updated)

      // Сохраняем на сервер
      API.put(`/folders/${folderId}`, { modules: updated })
        .then(() => loadFolders())
        .catch(console.error)
    }
    setShowModal(false)
  }

  // Удаление конкретного модуля
  const deleteModule = (modId) => {
    const updated = modules.filter(m => m._id !== modId)
    setModules(updated)

    API.put(`/folders/${folderId}`, { modules: updated })
      .then(() => loadFolders())
      .catch(console.error)
  }

  return (
    <div className="dashboard">
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowModal={setShowModal}
        deleteFolder={async (id) => {
          await API.delete(`/folders/${id}`)
          setFolders(prev => prev.filter(f => f._id !== id))
        }}
        cards={[]}
      />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h2 className="folder-header">
            {selectedFolder?.name || "Папка не найдена"}
          </h2>

          <div className="folder-actions-top">
            <button onClick={() => setShowModal(true)}>+</button>
          </div>

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

      <FolderModal
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <h3>Выберите модуль</h3>
        <div className="modules-list">
          {allModules.map(mod => (
            <div
              key={mod._id}
              className="module-select-item"
              onClick={() => addModuleToFolder(mod)}
            >
              {mod.title}
            </div>
          ))}
        </div>
      </FolderModal>
    </div>
  )
}

export default Folders