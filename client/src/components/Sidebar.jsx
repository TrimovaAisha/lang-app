import { useNavigate } from "react-router-dom"

function Sidebar({
  folders = [],
  cards = [],
  setShowModal
}) {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <h3 className="logo">MyApp</h3>

      <div className="menu">
        <p onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-house"></i> Главная
        </p>

        <p onClick={() => navigate("/library")}>
          <i className="fa-solid fa-book"></i> Библиотека
        </p>
      </div>

      {/* FOLDERS */}
      <div className="folders">
        <p className="title">Ваши папки</p>

        {(folders || []).length > 0 ? (
          folders.map((f) => (
            <p
              key={f._id || f.name}
              onClick={() => navigate("/folders")}
            >
              <i className="fa-solid fa-folder"></i> {f.name || f}
            </p>
          ))
        ) : (
          <p className="empty">Нет папок</p>
        )}

        <p
          onClick={() => setShowModal && setShowModal(true)}
          className="add-folder"
        >
          <i className="fa-solid fa-plus"></i> новая папка
        </p>
      </div>

      {/* CARDS */}
      <div className="cards">
        <p className="title">Карточки</p>

        {(cards || []).length > 0 ? (
          cards.map((c) => (
            <p
              key={c._id || c.title}
              onClick={() => c._id && navigate(`/flash/${c._id}`)}
            >
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