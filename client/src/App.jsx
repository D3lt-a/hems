import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login       from './components/Login'
import Register    from './components/Register'
import Layout      from './components/Layout'
import Staff       from './pages/Staff'
import Departments from './pages/dep'
import Posts       from './pages/Posts'
import Recruitment from './pages/Recruitment'
import Users       from './pages/Users'
import NotFound    from './pages/NotFound'

const Protected = ({ children }) =>
  localStorage.getItem('token') ? children : <Navigate to="/" replace />

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<Login />}    />
      <Route path="/register" element={<Register />} />

      {/* Protected — all use Layout */}
      <Route path="/" element={<Protected><Layout /></Protected>}>
        <Route path="staff"       element={<Staff />}       />
        <Route path="departments" element={<Departments />}  />
        <Route path="posts"       element={<Posts />}        />
        <Route path="recruitment" element={<Recruitment />}  />
        <Route path="users"       element={<Users />}        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
