import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Sidebar({
  folders = [],
  cards = [],
  setShowModal,
  deleteFolder
}) {
  const navigate = useNavigate()
  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  return (
    <div className="sidebar">
      <h3 className="logo">HighLang</h3>

      <div className="menu">
        <p onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-house"></i> Главная
        </p>

        <p onClick={() => navigate("/library")}>
          <i className="fa-solid fa-book"></i> Библиотека
        </p>
      </div>

      {/* ПАПКИ */}
      <div className="folders">
        <p className="title">Ваши папки</p>

        {folders.length > 0 ? (
          folders.map((f, index) => (
            <div key={index} className="folder-item">

              <p onClick={() => navigate("/folders")}>
                <i className="fa-solid fa-folder"></i> {f.name || f}
              </p>

              <span
                className="dots"
                onClick={() =>
                  setOpenMenuIndex(openMenuIndex === index ? null : index)
                }
              >
                ⋮
              </span>

              {openMenuIndex === index && (
                <div className="dropdown">
                  <p onClick={() => {
                    deleteFolder(index)
                    setOpenMenuIndex(null)
                  }}>
                    Удалить
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="empty">Нет папок</p>
        )}

        <p onClick={() => setShowModal(true)} className="add-folder">
          <i className="fa-solid fa-plus"></i> новая папка
        </p>
      </div>

      {/* КАРТОЧКИ */}
      <div className="cards">
        <p className="title">Карточки</p>

        {cards.length > 0 ? (
          cards.map((c, index) => (
            <p key={index}>
              <i className="fa-solid fa-layer-group"></i> {typeof c === "string" ? c : c.title}
            </p>
          ))
        ) : (
          <p className="empty">Нет карточек</p>
        )}

        <p onClick={() => navigate("/cards")}>
          <i className="fa-solid fa-plus"></i> новая карточка
        </p>
      </div>
    </div>
  )
}

export default Sidebar