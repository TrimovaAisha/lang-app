import { useState } from "react"
import API from "../api"

function FolderModal({ showModal, setShowModal, reload }) {
  const [name, setName] = useState("")

  const create = async () => {
    await API.post("/folders", { name })
    setShowModal(false)
    setName("")
    reload && reload()
  }

  if (!showModal) return null

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={create}>Создать</button>
      </div>
    </div>
  )
}

export default FolderModal