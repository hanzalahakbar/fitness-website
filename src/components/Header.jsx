import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import {
  LogoIcon,
  HomeIcon,
  DumbbellIcon,
  BarChartIcon,
  TargetIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon
} from './Icons'
import './Header.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', Icon: HomeIcon },
  { id: 'workout', label: 'Workout', Icon: DumbbellIcon },
  { id: 'progress', label: 'Progress', Icon: BarChartIcon },
  { id: 'goals', label: 'Goals', Icon: TargetIcon },
  { id: 'profile', label: 'Profile', Icon: UserIcon },
]

function Header({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="header">
      <div className="container header-container">
        <a href="#dashboard" className="logo" onClick={() => handleNavClick('dashboard')}>
          <LogoIcon size={28} className="logo-icon" />
          <span className="logo-text">FitTrack</span>
        </a>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map(({ id, label, Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(id)
                  }}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
