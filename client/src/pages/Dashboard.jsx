import './Auth.css'
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
      <div className="sidebar">
        <h3 className="logo">  </h3>

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

              {/* меню только для пользовательских папок */}
              {f !== 'папка' && (
                <div className="folder-actions">
                  <i
                    className="fa-solid fa-ellipsis ellipsis-icon"
                    onClick={() =>
                      setActiveMenu(activeMenu === index ? null : index)
                    }
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

        <div className="cards">
          <p className="title">Карточки</p>
          <p>
            <i className="fa-solid fa-layer-group"></i> Карточки
          </p>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <input placeholder="Поиск..." />
          <button className="logout" onClick={() => navigate('/')}>
            Выйти
          </button>
        </div>

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