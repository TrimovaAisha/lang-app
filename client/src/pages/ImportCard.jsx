import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { useNavigate } from "react-router-dom"

function ImportCard() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  const handleImport = async () => {
    const cards = text.split("\n").map(line => {
      const [term, definition] = line.split("\t")
      return { term, definition }
    })

    await API.post("/cards", { title, cards })
    navigate("/dashboard")
  }

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="cards-page">
          <input className="cards-title" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea value={text} onChange={(e) => setText(e.target.value)} />

          <button onClick={handleImport}>Создать</button>
        </div>
      </div>
    </div>
  )
}

export default ImportCard