import { useNavigate } from "react-router-dom"

function Sidebar({ folders, cards, setShowModal }) {
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

      <div className="folders">
        <p className="title">Ваши папки</p>

        {folders.map((f) => (
          <p key={f._id} onClick={() => navigate("/folders")}>
            <i className="fa-solid fa-folder"></i> {f.name}
          </p>
        ))}

        <p onClick={() => setShowModal(true)} className="add-folder">
          <i className="fa-solid fa-plus"></i> новая папка
        </p>
      </div>

      <div className="cards">
        <p className="title">Карточки</p>

        {cards.map((c) => (
          <p key={c._id} onClick={() => navigate(`/flash/${c._id}`)}>
            <i className="fa-solid fa-layer-group"></i> {c.title}
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