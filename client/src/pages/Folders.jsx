import { useState } from "react"

function Folders() {
  const [folders, setFolders] = useState(["папка"])
  const [modules, setModules] = useState(["Название модуля"])

  const addModule = () => {
    setModules([...modules, "Название модуля"])
  }

  const deleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  return (
    <div className="dashboard">
      <div className="main">
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