import { useParams } from "react-router-dom"

function FolderPage() {
  const { id } = useParams()

  return (
    <div>
      <h1>Папка {id}</h1>
    </div>
  )
}

export default FolderPage