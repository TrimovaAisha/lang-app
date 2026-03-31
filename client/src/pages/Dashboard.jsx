import './Auth.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Dashboard() {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [folders, setFolders] = useState(['папка'])
  const [activeMenu, setActiveMenu] = useState(null) // для трёхточек

  // закрытие по ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
        setActiveMenu(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // добавление папки
  const addFolder = () => {
    if (!folderName.trim()) return
    setFolders([...folders, folderName])
    setFolderName('')
    setShowModal(false)
  }

  // удаление папки
  const deleteFolder = (index) => {
    const updated = folders.filter((_, i) => i !== index)
    setFolders(updated)
    setActiveMenu(null)
  }

  // клик вне меню закрывает dropdown
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null)
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="dashboard">
      <Sidebar
      folders={folders}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      setShowModal={setShowModal}
      deleteFolder={deleteFolder}/>
      <div className="main">
        <Topbar />
        <div className="hero">
          <button className="continue-btn">Продолжить</button>
        </div>

        <div className="card-grid">
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
          <div className="card">название карточки</div>
        </div>
      </div>

      {/* МОДАЛКА */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Крестик в правом верхнем углу */}
            <i
              className="fa-solid fa-xmark modal-close"
              onClick={() => setShowModal(false)}
            ></i>

            <i className="fa-solid fa-folder modal-icon"></i>
            <input
              type="text"
              placeholder="Укажите название папки"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button disabled={!folderName.trim()} onClick={addFolder}>
              Создать
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard