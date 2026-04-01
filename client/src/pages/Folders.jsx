import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"

function Folders() {
  const [folders, setFolders] = useState(["папка"])
  const [modules, setModules] = useState(["Название модуля"])
  const [activeMenu, setActiveMenu] = useState(null) // для Sidebar

  const addModule = () => {
    setModules([...modules, "Название модуля"])
  }

  const deleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  return (
    <div className="dashboard">
      {/* Sidebar слева */}
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Основная часть */}
      <div className="main">
        {/* Topbar сверху */}
        <Topbar />

        {/* Контент страницы */}
        <div className="folder-page">
          <h2 className="folder-header">Название папки</h2>

          {/* Верхняя панель: + и корзина */}
          <div className="folder-actions-top">
            <button className="add-module-btn" onClick={addModule}>+</button>
            <i 
              className="fa-solid fa-trash delete-icon" 
              onClick={() => setModules([])}
            ></i>
          </div>

          {/* Список модулей */}
          {modules.map((mod, index) => (
            <div key={index} className="module-item">
              <span>{mod}</span>
              <i 
                className="fa-solid fa-trash" 
                onClick={() => deleteModule(index)}
              ></i>
            </div>
          ))}

          {/* Кнопка «Добавить карточку» убрана */}
        </div>
      </div>
    </div>
  )
}

export default Folders