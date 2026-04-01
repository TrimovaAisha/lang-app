import "./Auth.css"
import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import FolderModal from "../components/FolderModal"

function ImportCard() {
  const [text, setText] = useState("")
  const [termSeparator, setTermSeparator] = useState("tab")
  const [cardSeparator, setCardSeparator] = useState("newline")

  const [folders, setFolders] = useState(() => {
    return JSON.parse(localStorage.getItem("folders")) || ["папка"]
  })
  const [activeMenu, setActiveMenu] = useState(null)
  const [showModal, setShowModal] = useState(false)
  
  const deleteFolder = (index) => {
    const updated = folders.filter((_, i) => i !== index)
    setFolders(updated)
  }

  const handleImport = () => {
    console.log("RAW TEXT:", text)

    let cards = text.split("\n").map(line => {
      let parts

      if (termSeparator === "tab") {
        parts = line.split("\t")
      } else {
        parts = line.split(",")
      }

      return {
        term: parts[0] || "",
        definition: parts[1] || ""
      }
    })

    console.log("PARSED:", cards)
  }

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <Sidebar
        folders={folders}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowModal={setShowModal}
        deleteFolder={(index) => {
          const updated = folders.filter((_, i) => i !== index)
          setFolders(updated)
        }}
      />

      {/* MAIN */}
      <div className="main">

        <Topbar />

        {/* IMPORT BLOCK */}
        <div className="cards-page">
          <div>
            <p>Импортировать данные. Скопируйте и вставьте свои данные</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Слово 1\tОпределение 1\nСлово 2\tОпределение 2`}
            />

            <div>
              <div>
                <p>Между термином и определением</p>
                <label>
                  <input
                    type="radio"
                    checked={termSeparator === "tab"}
                    onChange={() => setTermSeparator("tab")}
                  /> Tab
                </label>
                <label>
                  <input
                    type="radio"
                    checked={termSeparator === "comma"}
                    onChange={() => setTermSeparator("comma")}
                  /> Запятая
                </label>
              </div>

              <div>
                <p>Между карточками</p>
                <label>
                  <input
                    type="radio"
                    checked={cardSeparator === "newline"}
                    onChange={() => setCardSeparator("newline")}
                  /> Отступ
                </label>
                <label>
                  <input
                    type="radio"
                    checked={cardSeparator === "semicolon"}
                    onChange={() => setCardSeparator("semicolon")}
                  /> Точка с запятой
                </label>
              </div>
            </div>

            <button onClick={handleImport}>Создать</button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <FolderModal
        showModal={showModal}
        setShowModal={setShowModal}
        setFolders={setFolders}
      />

    </div>
  )
}

export default ImportCard