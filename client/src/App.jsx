import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Card from './pages/Card'
import ImportCard from './pages/ImportCard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cards" element={<Card />} />
      <Route path="/import" element={<ImportCard />} />
    </Routes>
  )
}

export default App