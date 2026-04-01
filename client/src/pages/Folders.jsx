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
    <div style={{ padding: "20px" }}>
      <h1>Folders Page</h1>

      {/* папки */}
      <h2>Папки:</h2>
      {folders.map((folder, index) => (
        <div key={index}>
          {folder}
          <button onClick={() => deleteFolder(index)}>Удалить</button>
        </div>
      ))}

      {/* модули */}
      <h2>Модули:</h2>
      <button onClick={addModule}>Добавить модуль</button>

      {modules.map((mod, index) => (
        <div key={index}>
          {mod}
          <button onClick={() => deleteModule(index)}>Удалить</button>
        </div>
      ))}

      <button style={{ marginTop: "20px" }}>
        Добавить карточку
      </button>
    </div>
  )
}

export default Folders