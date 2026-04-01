import { useNavigate } from "react-router-dom"

function Sidebar({
  folders = [],
  activeMenu,
  setActiveMenu,
  setShowModal,
  deleteFolder,
  cards = [] // карточки
}) {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <h3 className="logo">MyApp</h3>

      {/* Основное меню */}
      <div className="menu">
        <p onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-house"></i> Главная
        </p>

        <p onClick={() => navigate("/library")}>
          <i className="fa-solid fa-book"></i> Библиотека
        </p>

        <p onClick={() => navigate("/folders")}>
          <i className="fa-solid fa-folder"></i> Папки
        </p>

        <p onClick={() => navigate("/cards")}>
          <i className="fa-solid fa-layer-group"></i> Карточки
        </p>

        <p onClick={() => navigate("/import")}>
          <i className="fa-solid fa-upload"></i> Импорт
        </p>
      </div>

      {/* Пользовательские папки */}
      <div className="folders">
        <p className="title">Ваши папки</p>

        {folders.map((f, index) => (
          <div
            className="folder-item"
            key={index}
            onClick={() => navigate("/folders")} // переходим на страницу папок
          >
            <div className="folder-left">
              <i className="fa-solid fa-folder folder-icon"></i>
              <span className="folder-name">{f}</span>
            </div>

            {f !== "папка" && (
              <div className="folder-actions">
                <i
                  className="fa-solid fa-ellipsis ellipsis-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveMenu(activeMenu === index ? null : index)
                  }}
                ></i>

                {activeMenu === index && (
                  <div className="dropdown">
                    <p onClick={() => deleteFolder(index)}>Удалить</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <p onClick={() => setShowModal(true)} className="add-folder">
          <i className="fa-solid fa-plus"></i> новая папка
        </p>
      </div>

      {/* Карточки */}
      <div className="cards">
        <p className="title">Карточки</p>

        {cards.map((card, i) => (
          <p key={i} onClick={() => navigate("/cards")}>
            <i className="fa-solid fa-layer-group"></i> {card.title || "Без названия"}
          </p>
        ))}

        <p onClick={() => navigate("/cards")}>
          <i className="fa-solid fa-plus"></i> новая карточка
        </p>
      </div>
    </div>
  )
}

export default Sidebar