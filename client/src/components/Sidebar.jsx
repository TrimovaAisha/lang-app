import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Sidebar({
  folders = [],
  cards = [],
  setShowModal = () => {},
  deleteFolder = () => {}
}) {
  const navigate = useNavigate()
  const [openMenuId, setOpenMenuId] = useState(null)

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
          folders.map((f) => (
            <div key={f._id} className="folder-item">

              {/* 🔥 ПЕРЕХОД С ID */}
              <p onClick={() => navigate(`/folders/${f._id}`)}>
                <i className="fa-solid fa-folder"></i> {f.name || "Без названия"}
              </p>

              <span
                className="dots"
                onClick={() =>
                  setOpenMenuId(openMenuId === f._id ? null : f._id)
                }
              >
                ⋮
              </span>

              {openMenuId === f._id && (
                <div className="dropdown">
                  <p
                    onClick={() => {
                      deleteFolder(f._id) // ✅ FIX
                      setOpenMenuId(null)
                    }}
                  >
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
          cards.map((c) => (
            <p key={c._id} onClick={() => navigate(`/study/${c._id}`)}>
              <i className="fa-solid fa-layer-group"></i> {c.title}
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