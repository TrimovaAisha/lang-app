import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

function FolderPage() {
  const { id } = useParams()
  const [folder, setFolder] = useState(null)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const res = await API.get("/folders")
      const found = res.data.find(f => f._id === id)
      setFolder(found)
    } catch (e) {
      console.error(e)
    }
  }

  if (!folder) return <div>Загрузка...</div>

  return (
    <div className="dashboard">

      <Sidebar folders={[]} cards={[]} />

      <div className="main">
        <Topbar />

        <div className="folder-page">
          <h1>{folder.name}</h1>

          <p>Карточки внутри папки</p>
        </div>
      </div>

    </div>
  )
}

export default FolderPage