import { useState } from "react"

function FolderModal({ showModal, setShowModal, setFolders }) {
  const [folderName, setFolderName] = useState("")

  const addFolder = () => {
    if (!folderName.trim()) return

    const existing = JSON.parse(localStorage.getItem("folders")) || ["папка"]

    const updated = [...existing, folderName]

    localStorage.setItem("folders", JSON.stringify(updated))
    setFolders(updated)

    setFolderName("")
    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowModal(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <i
          className="fa-solid fa-xmark modal-close"
          onClick={() => setShowModal(false)}
        ></i>

        <i className="fa-solid fa-folder modal-icon"></i>

        <input
          type="text"
          placeholder="Укажите название папки"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        <button disabled={!folderName.trim()} onClick={addFolder}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default FolderModal