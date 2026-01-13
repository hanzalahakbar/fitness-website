import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTheme } from '../context/ThemeContext'
import { UserIcon, ScaleIcon, DumbbellIcon, ZapIcon, SunIcon, MoonIcon, BellIcon, BarChartIcon, CheckIcon } from './Icons'
import './Profile.css'

const fitnessGoals = [
  { id: 'lose', label: 'Lose Weight', Icon: ScaleIcon },
  { id: 'build', label: 'Build Muscle', Icon: DumbbellIcon },
  { id: 'active', label: 'Stay Active', Icon: ZapIcon },
]

function Profile() {
  const [ref, isVisible] = useScrollAnimation()
  const { theme, toggleTheme } = useTheme()

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('userProfile')
    if (saved) return JSON.parse(saved)
    return { name: '', email: '', age: '', weight: '', height: '', fitnessGoal: '' }
  })

  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const isProfileComplete = formData.name && formData.email && formData.age && formData.weight && formData.height

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Required'
    if (!formData.email.trim()) newErrors.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.age) newErrors.age = 'Required'
    if (!formData.weight) newErrors.weight = 'Required'
    if (!formData.height) newErrors.height = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSaved(false)
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      localStorage.setItem('userProfile', JSON.stringify(formData))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const getBMI = () => {
    const w = parseFloat(formData.weight)
    const h = parseFloat(formData.height) / 100
    if (w && h) return (w / (h * h)).toFixed(1)
    return '--'
  }

  const getBMIStatus = (bmi) => {
    const v = parseFloat(bmi)
    if (isNaN(v)) return { label: 'N/A', color: 'var(--text-muted)' }
    if (v < 18.5) return { label: 'Underweight', color: 'var(--warning)' }
    if (v < 25) return { label: 'Normal', color: 'var(--success)' }
    if (v < 30) return { label: 'Overweight', color: 'var(--warning)' }
    return { label: 'Obese', color: 'var(--error)' }
  }

  const bmi = getBMI()
  const bmiStatus = getBMIStatus(bmi)

  return (
    <div className="container">
      <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Profile & Settings</h2>
        <p className="section-subtitle">Manage your account and preferences</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-card card">
            <div className="profile-avatar">
              <UserIcon size={32} />
            </div>
            <h3 className="profile-name">{formData.name || 'Your Name'}</h3>
            <p className="profile-email">{formData.email || 'your@email.com'}</p>

            {!isProfileComplete && (
              <p className="profile-incomplete">Complete your profile</p>
            )}

            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-value">{formData.age || '--'}</span>
                <span className="stat-label">Age</span>
              </div>
              <div className="profile-stat">
                <span className="stat-value">{formData.weight || '--'}</span>
                <span className="stat-label">kg</span>
              </div>
              <div className="profile-stat">
                <span className="stat-value">{formData.height || '--'}</span>
                <span className="stat-label">cm</span>
              </div>
            </div>

            <div className="bmi-display">
              <span className="bmi-label">BMI</span>
              <span className="bmi-value" style={{ color: bmiStatus.color }}>{bmi}</span>
              <span className="bmi-status" style={{ color: bmiStatus.color }}>{bmiStatus.label}</span>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="settings-card card">
            <h3 className="card-title">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="settings-form">
              <div className="form-row">
                <div className={`form-group ${errors.name ? 'error' : ''}`}>
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className={`form-group ${errors.email ? 'error' : ''}`}>
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row form-row-3">
                <div className={`form-group ${errors.age ? 'error' : ''}`}>
                  <label className="form-label">Age</label>
                  <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} placeholder="Years" />
                </div>
                <div className={`form-group ${errors.weight ? 'error' : ''}`}>
                  <label className="form-label">Weight (kg)</label>
                  <input type="number" name="weight" className="form-input" value={formData.weight} onChange={handleChange} placeholder="kg" step="0.1" />
                </div>
                <div className={`form-group ${errors.height ? 'error' : ''}`}>
                  <label className="form-label">Height (cm)</label>
                  <input type="number" name="height" className="form-input" value={formData.height} onChange={handleChange} placeholder="cm" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Fitness Goal</label>
                <div className="goal-options">
                  {fitnessGoals.map(({ id, label, Icon }) => (
                    <label key={id} className={`goal-option ${formData.fitnessGoal === id ? 'selected' : ''}`}>
                      <input type="radio" name="fitnessGoal" value={id} checked={formData.fitnessGoal === id} onChange={handleChange} className="sr-only" />
                      <Icon size={20} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                {saved ? <><CheckIcon size={16} /> Saved</> : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="preferences-card card">
            <h3 className="card-title">Preferences</h3>
            <div className="preference-list">
              <div className="preference-item">
                <div className="preference-info">
                  {theme === 'dark' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
                  <div>
                    <span className="preference-label">Dark Mode</span>
                    <span className="preference-desc">Toggle theme</span>
                  </div>
                </div>
                <button className={`toggle ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme}>
                  <span className="toggle-thumb" />
                </button>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <BellIcon size={18} />
                  <div>
                    <span className="preference-label">Notifications</span>
                    <span className="preference-desc">Workout reminders</span>
                  </div>
                </div>
                <button className="toggle active"><span className="toggle-thumb" /></button>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <BarChartIcon size={18} />
                  <div>
                    <span className="preference-label">Weekly Reports</span>
                    <span className="preference-desc">Progress summaries</span>
                  </div>
                </div>
                <button className="toggle active"><span className="toggle-thumb" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
