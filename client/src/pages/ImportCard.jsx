import "./Auth.css"
import { useState } from "react"
import Sidebar from "../components/SideBar"
import Topbar from "../components/Topbar"

function ImportCard() {
  const [text, setText] = useState("")
  const [termSeparator, setTermSeparator] = useState("tab")
  const [cardSeparator, setCardSeparator] = useState("newline")

  const [folders, setFolders] = useState(["папка"])
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
        deleteFolder={deleteFolder}
      />

      {/* MAIN */}
      <div className="main">

        <Topbar />

        {/* IMPORT BLOCK */}
        <div className="cards-page">

          <div style={{
            background: "#1a115c",
            padding: "20px",
            borderRadius: "15px"
          }}>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}>
              <p>
                Импортировать данные. Скопируйте и вставьте свои данные
              </p>

              <i className="fa-solid fa-xmark"></i>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Слово 1\tОпределение 1\nСлово 2\tОпределение 2`}
              style={{
                width: "100%",
                height: "150px",
                borderRadius: "10px",
                border: "none",
                padding: "10px",
                background: "#4b3d91",
                color: "white",
                marginBottom: "15px"
              }}
            />

            <div style={{
              display: "flex",
              gap: "50px",
              marginBottom: "20px"
            }}>

              {/* TERM SEPARATOR */}
              <div>
                <p>Между термином и определением</p>

                <label>
                  <input
                    type="radio"
                    checked={termSeparator === "tab"}
                    onChange={() => setTermSeparator("tab")}
                  /> Tab
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    checked={termSeparator === "comma"}
                    onChange={() => setTermSeparator("comma")}
                  /> Запятая
                </label>
              </div>

              {/* CARD SEPARATOR */}
              <div>
                <p>Между карточками</p>

                <label>
                  <input
                    type="radio"
                    checked={cardSeparator === "newline"}
                    onChange={() => setCardSeparator("newline")}
                  /> Enter
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    checked={cardSeparator === "semicolon"}
                    onChange={() => setCardSeparator("semicolon")}
                  /> Точка с запятой
                </label>
              </div>

            </div>

            <div style={{ textAlign: "right" }}>
              <button
                className="create-btn"
                onClick={handleImport}
              >
                Создать
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ImportCard