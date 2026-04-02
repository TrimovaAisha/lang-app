import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import API from "../api"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function ImportCard() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  // 🔥 универсальный парсер строки
  const parseLine = (line) => {
    const separators = ["\t", ";", ":", "-", "|"]

    for (let sep of separators) {
      if (line.includes(sep)) {
        const parts = line.split(sep)

        if (parts.length >= 2) {
          return {
            term: parts[0].trim(),
            definition: parts.slice(1).join(sep).trim()
          }
        }
      }
    }

    return null
  }

  const handleImport = async () => {
    const cards = text
      .split("\n")
      .map(line => parseLine(line))
      .filter(card => card && card.term && card.definition)

    if (!title.trim()) {
      alert("Введите название")
      return
    }

    if (cards.length === 0) {
      alert("Нет корректных карточек")
      return
    }

    try {
      await API.post("/cards", { title, cards })
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      alert("Ошибка при создании")
    }
  }

  return (
    <div className="dashboard">
      <Sidebar folders={[]} cards={[]} setShowModal={() => {}} />

      <div className="main">
        <Topbar />

        <div className="import-container">
          
          {/* HEADER */}
          <div className="import-header">
            <h2>Импорт карточек</h2>

            <FontAwesomeIcon
              icon={faXmark}
              className="close-btn"
              onClick={() => navigate("/dashboard")}
            />
          </div>

          {/* TITLE */}
          <input
            className="import-title"
            placeholder="Название набора"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* TEXTAREA */}
          <textarea
            className="import-textarea"
            placeholder={`Пример:
hello\tпривет
world;мир
cat:кот`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* HINT */}
          <div className="import-hint">
            Можно использовать разделители: таб, ; : - |
          </div>

          {/* BUTTON */}
          <button className="import-btn" onClick={handleImport}>
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportCard