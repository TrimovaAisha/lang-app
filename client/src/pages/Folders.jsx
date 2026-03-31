import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function Folders() {
  const [folders, setFolders] = useState(["папка"])
  const [activeMenu, setActiveMenu] = useState(null)
  const [modules, setModules] = useState(["Название модуля"])

  const deleteFolder = (index) => {
    const updated = folders.filter((_, i) => i !== index)
    setFolders(updated)
  }

  const addModule = () => {
    setModules([...modules, "Название модуля"])
  }

  const deleteModule = (index) => {
    const updated = modules.filter((_, i) => i !== index)
    setModules(updated)
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

        <div className="folder-page">
          <h2 className="folder-header">Название папки</h2>

          <div className="folder-actions-top">
            <button className="add-module-btn" onClick={addModule}>
              +
            </button>

            <i
              className="fa-solid fa-trash delete-icon"
              onClick={() => setModules([])}
            ></i>
          </div>

          {modules.map((mod, index) => (
            <div key={index} className="module-item">
              <span>{mod}</span>

              <i
                className="fa-solid fa-trash"
                onClick={() => deleteModule(index)}
              ></i>
            </div>
          ))}

          <div className="add-card-container">
            <button className="create-btn">
              Добавить карточку
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folders