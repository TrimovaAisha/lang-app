import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Topbar({ setSearch }) {
  const navigate = useNavigate()
  const [value, setValue] = useState("")

  const handleSearch = (e) => {
    setValue(e.target.value)
    setSearch && setSearch(e.target.value)
  }

  return (
    <div className="topbar">
      <input placeholder="Поиск..." value={value} onChange={handleSearch} />

      <button className="logout" onClick={() => {
        localStorage.removeItem("token")
        navigate("/")
      }}>
        Выйти
      </button>
    </div>
  )
}

export default Topbar