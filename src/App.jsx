import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Workout from './components/Workout'
import Progress from './components/Progress'
import Goals from './components/Goals'
import Profile from './components/Profile'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">FitTrack &copy; 2025. Your fitness journey starts here.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
