import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Workout from './components/Workout'
import Progress from './components/Progress'
import Goals from './components/Goals'
import Profile from './components/Profile'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="app">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="main">
        <section id="dashboard" className="section">
          <Dashboard />
        </section>

        <section id="workout" className="section">
          <Workout />
        </section>

        <section id="progress" className="section">
          <Progress />
        </section>

        <section id="goals" className="section">
          <Goals />
        </section>

        <section id="profile" className="section">
          <Profile />
        </section>
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
