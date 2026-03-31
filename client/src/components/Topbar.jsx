import { useNavigate } from "react-router-dom"

function Topbar() {
  const navigate = useNavigate()

  return (
    <div className="topbar">
      <input placeholder="Поиск..." />

      <button
        className="logout"
        onClick={() => navigate("/")}
      >
        Выйти
      </button>
    </div>
  )
}

export default Topbar