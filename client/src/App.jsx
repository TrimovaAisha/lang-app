import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Card from "./pages/Card"
import ImportCard from "./pages/ImportCard"
import Flashcard from "./pages/Flashcard"
import Library from "./pages/Library"
import Folders from "./pages/Folders"
import Study from "./pages/Study"
import EditCard from "./pages/EditCard"
import FolderPage from "./pages/FolderPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cards" element={<Card />} />
      <Route path="/import" element={<ImportCard />} />
      <Route path="/flash/:id" element={<Flashcard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/folders" element={<Folders />} />
      <Route path="/study/:id" element={<Study />} />
      <Route path="/edit/:id" element={<EditCard />} />
      <Route path="/folders/:id" element={<FolderPage />} />
    </Routes>
  )
}

export default App