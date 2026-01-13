import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
  { path: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
  { path: '/workout', label: 'Workout', Icon: DumbbellIcon },
  { path: '/progress', label: 'Progress', Icon: BarChartIcon },
  { path: '/goals', label: 'Goals', Icon: TargetIcon },
  { path: '/profile', label: 'Profile', Icon: UserIcon },
]

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="header">
      <div className="container header-container">
        <NavLink to="/dashboard" className="logo" onClick={closeMobileMenu}>
          <LogoIcon size={28} className="logo-icon" />
          <span className="logo-text">FitTrack</span>
        </NavLink>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map(({ path, label, Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{label}</span>
                </NavLink>
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
