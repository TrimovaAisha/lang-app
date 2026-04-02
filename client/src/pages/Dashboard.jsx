import './Auth.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import FolderModal from '../components/FolderModal'

function Dashboard() {
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [cards, setCards] = useState([])
  const [folders, setFolders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const c = await API.get('/cards')
    const f = await API.get('/folders')
    setCards(c.data)
    setFolders(f.data)
  }

  const filtered = cards.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  const deleteCard = async (id) => {
    try {
      await API.delete(`/cards/${id}`)
      setCards(prev => prev.filter(c => c._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="dashboard">
      <Sidebar folders={folders} cards={cards} setShowModal={setShowModal} />

      <div className="main">
        <Topbar setSearch={setSearch} />

        <div className="card-grid">
          {filtered.map(c => (
            <div key={c._id} className="card">

              {/* Клик по карточке */}
              <div onClick={() => navigate(`/study/${c._id}`)}>
                {c.title}
              </div>

              {/* Троеточие */}
              <div
                className="card-menu-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpenId(menuOpenId === c._id ? null : c._id)
                }}
              >
                ⋮
              </div>

              {/* Меню */}
              {menuOpenId === c._id && (
                <div className="card-menu">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCard(c._id)
                      setMenuOpenId(null)
                    }}
                  >
                    Удалить
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      <FolderModal showModal={showModal} setShowModal={setShowModal} reload={loadData} />
    </div>
  )
}

export default Dashboard