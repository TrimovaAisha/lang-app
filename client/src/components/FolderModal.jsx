import { useState } from "react"
import API from "../api"

function FolderModal({
  showModal,
  setShowModal = () => {},
  setFolders = () => {},
  reload = () => {}
}) {
  const [name, setName] = useState("")

  if (!showModal) return null

  const createFolder = async () => {
    if (!name.trim()) return

    try {
      // 🔥 создаём через API
      const res = await API.post("/folders", { name })

      // обновляем список
      setFolders(prev => [...prev, res.data])

      setName("")
      setShowModal(false)

      // 🔥 обновляем всё в приложении
      reload()
    } catch (e) {
      console.error(e)
    }
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