import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function Folders() {
  const [folders, setFolders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("folders") || "[]")
    } catch {
      return ["папка"]
    }
  })

  const [modules, setModules] = useState(["Название модуля"])
  const [activeMenu, setActiveMenu] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const addModule = () => {
    setModules([...modules, "Название модуля"])
  }

  const deleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  return (
    <div className="dashboard">
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowModal={setShowModal}
        deleteFolder={(index) => {
          const updated = folders.filter((_, i) => i !== index)
          setFolders(updated)
          localStorage.setItem("folders", JSON.stringify(updated))
        }}
        cards={[]}   
      />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h2 className="folder-header">Название папки</h2>

          <div className="folder-actions-top">
            <button onClick={addModule}>+</button>

            <i
              className="fa-solid fa-trash"
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

export default Folders