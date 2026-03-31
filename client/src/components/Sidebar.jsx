import { useNavigate } from "react-router-dom"

function Sidebar({
  folders,
  activeMenu,
  setActiveMenu,
  setShowModal,
  deleteFolder
}) {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <h3 className="logo"></h3>

      <div className="menu">
        <p>
          <i className="fa-solid fa-house"></i> Главная
        </p>
        <p>
          <i className="fa-solid fa-book"></i> Библиотека
        </p>
      </div>

      <div className="folders">
        <p className="title">Ваши папки</p>

        {folders.map((f, index) => (
          <div
            className="folder-item"
            key={index}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="folder-left">
              <i className="fa-solid fa-folder folder-icon"></i>
              <span className="folder-name">{f}</span>
            </div>

            {f !== "папка" && (
              <div className="folder-actions">
                <i
                  className="fa-solid fa-ellipsis ellipsis-icon"
                  onClick={() =>
                    setActiveMenu(activeMenu === index ? null : index)
                  }
                ></i>

                {activeMenu === index && (
                  <div className="dropdown">
                    <p onClick={() => deleteFolder(index)}>
                      Удалить
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <p
          onClick={() => setShowModal(true)}
          className="add-folder"
        >
          <i className="fa-solid fa-plus"></i> новая папка
        </p>
      </div>

      <div className="cards">
        <p className="title">Карточки</p>
        <p onClick={() => navigate("/cards")}>
          <i className="fa-solid fa-layer-group"></i> Карточки
        </p>
      </div>
    </div>
  )
}

export default Sidebar