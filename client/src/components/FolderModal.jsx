import { useState } from "react"

function FolderModal({
  showModal,
  setShowModal = () => {},   // ✅ защита
  setFolders = () => {}      // ✅ защита (ВАЖНО)
}) {
  const [name, setName] = useState("")

  if (!showModal) return null

  const createFolder = () => {
    if (!name.trim()) return

    setFolders(prev => {
      const updated = [...(prev || []), name]   // ✅ защита
      localStorage.setItem("folders", JSON.stringify(updated))
      return updated
    })

    setName("")
    setShowModal(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <span className="close" onClick={() => setShowModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        <div className="modal-icon">
          <i className="fa-solid fa-folder"></i>
        </div>

        <h2>Новая папка</h2>

        <input
          placeholder="Название папки"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={createFolder}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default FolderModal