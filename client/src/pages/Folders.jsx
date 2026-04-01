import { useState } from "react"

function Folders() {
  const [folders, setFolders] = useState(["папка"])
  const [modules, setModules] = useState(["Название модуля"])

  const deleteFolder = (index) => {
    setFolders(folders.filter((_, i) => i !== index))
  }

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

          <div className="folder-actions-top">
            <button className="add-module-btn" onClick={addModule}>+</button>
            <i className="fa-solid fa-trash" onClick={() => setModules([])}></i>
          </div>

          {modules.map((mod, index) => (
            <div key={index} className="module-item">
              <span>{mod}</span>
              <i className="fa-solid fa-trash" onClick={() => deleteModule(index)}></i>
            </div>
          ))}

          <div className="add-card-container">
            <button className="create-btn">Добавить карточку</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folders