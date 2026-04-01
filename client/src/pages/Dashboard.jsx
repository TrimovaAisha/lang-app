import './Auth.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import FolderModal from '../components/FolderModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function Dashboard() {
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

  return (
    <div className="dashboard">
      <Sidebar folders={folders} cards={cards} setShowModal={setShowModal} />

      <div className="main">
        <Topbar setSearch={setSearch} />

        <div className="card-grid">
          {filtered.map(c => (
            <div key={c._id} className="card" onClick={() => navigate(`/flash/${c._id}`)}>
              {c.title}
            </div>
          ))}
        </div>
      </div>

      <FolderModal showModal={showModal} setShowModal={setShowModal} reload={loadData} />
    </div>
  )
}

export default Dashboard