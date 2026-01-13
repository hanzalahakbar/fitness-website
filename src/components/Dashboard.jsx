import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountUp } from '../hooks/useCountUp'
import {
  FlameIcon,
  ClockIcon,
  FootprintsIcon,
  TargetIcon,
  PlusIcon,
  PlayIcon,
  CheckIcon,
  RefreshIcon,
  XIcon
} from './Icons'
import './Dashboard.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDefaultStats() {
  return {
    calories: 0,
    duration: 0,
    steps: 0,
    streak: 0,
    lastWorkoutDate: null,
    todayWorkout: null,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  }
}

function StatCard({ icon: Icon, value, label, suffix = '', delay = 0, onClick, color }) {
  const [ref, isVisible] = useScrollAnimation()
  const count = useCountUp(value, 1200, 0, isVisible)

  return (
    <div
      ref={ref}
      className={`stat-card animate-on-scroll ${isVisible ? 'visible' : ''} ${onClick ? 'clickable' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="stat-icon-wrapper" style={{ '--accent': color }}>
        <Icon size={20} />
      </div>
      <div className="stat-content">
        <span className="stat-value">{count.toLocaleString()}{suffix}</span>
        <span className="stat-label">{label}</span>
      </div>
      {onClick && <span className="stat-action">Update</span>}
    </div>
  )
}

function ProgressBar({ label, progress, isToday }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div ref={ref} className={`progress-item ${isToday ? 'today' : ''}`}>
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-percent">{progress}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: isVisible ? `${progress}%` : '0%' }}
        />
      </div>
    </div>
  )
}

function Dashboard() {
  const [ref, isVisible] = useScrollAnimation()
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState(getDefaultStats)
  const [showLogModal, setShowLogModal] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const profile = localStorage.getItem('userProfile')
    if (profile) {
      const { name } = JSON.parse(profile)
      setUserName(name)
    }

    const savedStats = localStorage.getItem('userStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  useEffect(() => {
    if (stats.calories > 0 || stats.steps > 0 || stats.duration > 0 || stats.streak > 0) {
      localStorage.setItem('userStats', JSON.stringify(stats))
    }
  }, [stats])

  const today = new Date().getDay()

  const handleLogSubmit = (type) => {
    const value = parseInt(inputValue) || 0
    if (value <= 0) return

    setStats(prev => {
      const newStats = { ...prev }

      switch (type) {
        case 'calories':
          newStats.calories = prev.calories + value
          break
        case 'duration':
          newStats.duration = prev.duration + value
          newStats.weeklyProgress = [...prev.weeklyProgress]
          newStats.weeklyProgress[today] = Math.min(100, newStats.weeklyProgress[today] + Math.round(value / 0.6))
          break
        case 'steps':
          newStats.steps = prev.steps + value
          break
        case 'streak':
          newStats.streak = value
          break
      }

      return newStats
    })

    setShowLogModal(null)
    setInputValue('')
  }

  const handleStartWorkout = () => {
    setStats(prev => ({
      ...prev,
      todayWorkout: {
        name: 'Workout Session',
        startTime: new Date().toISOString(),
        status: 'in_progress'
      }
    }))
  }

  const handleCompleteWorkout = () => {
    const duration = 30
    setStats(prev => {
      const newWeeklyProgress = [...prev.weeklyProgress]
      newWeeklyProgress[today] = 100

      return {
        ...prev,
        duration: prev.duration + duration,
        calories: prev.calories + Math.round(duration * 8),
        streak: prev.streak + 1,
        lastWorkoutDate: new Date().toISOString(),
        todayWorkout: null,
        weeklyProgress: newWeeklyProgress
      }
    })
  }

  const resetDailyStats = () => {
    setStats(prev => ({
      ...prev,
      calories: 0,
      duration: 0,
      steps: 0,
    }))
  }

  const modalLabels = {
    calories: 'Calories Burned',
    duration: 'Workout Minutes',
    steps: 'Steps Walked',
    streak: 'Current Streak'
  }

  return (
    <div className="container">
      <div
        ref={ref}
        className={`dashboard-header animate-on-scroll ${isVisible ? 'visible' : ''}`}
      >
        <div className="dashboard-title-row">
          <div>
            <h1 className="section-title">Dashboard</h1>
            <p className="section-subtitle">
              {userName ? `Welcome back, ${userName}` : 'Track your fitness journey'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={FlameIcon}
          value={stats.calories}
          label="Calories"
          delay={0}
          onClick={() => setShowLogModal('calories')}
          color="var(--primary)"
        />
        <StatCard
          icon={ClockIcon}
          value={stats.duration}
          label="Minutes"
          delay={50}
          onClick={() => setShowLogModal('duration')}
          color="var(--success)"
        />
        <StatCard
          icon={FootprintsIcon}
          value={stats.steps}
          label="Steps"
          delay={100}
          onClick={() => setShowLogModal('steps')}
          color="#3B82F6"
        />
        <StatCard
          icon={TargetIcon}
          value={stats.streak}
          label="Day Streak"
          delay={150}
          onClick={() => setShowLogModal('streak')}
          color="var(--warning)"
        />
      </div>

      {/* Modal */}
      {showLogModal && (
        <div className="modal-overlay" onClick={() => setShowLogModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Log {modalLabels[showLogModal]}</h3>
              <button className="modal-close" onClick={() => setShowLogModal(null)}>
                <XIcon size={18} />
              </button>
            </div>
            <input
              type="number"
              className="modal-input"
              placeholder={`Enter ${showLogModal}`}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleLogSubmit(showLogModal)}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowLogModal(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => handleLogSubmit(showLogModal)}>
                <PlusIcon size={16} />
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        <div className="today-workout card">
          <div className="card-header">
            <h2 className="card-title">Today's Workout</h2>
            {stats.todayWorkout && <span className="badge badge-active">Active</span>}
            {stats.weeklyProgress[today] === 100 && !stats.todayWorkout && (
              <span className="badge badge-complete">Complete</span>
            )}
          </div>

          <div className="workout-content">
            {stats.todayWorkout ? (
              <>
                <p className="workout-status">Session in progress</p>
                <button className="btn btn-primary btn-lg" onClick={handleCompleteWorkout}>
                  <CheckIcon size={18} />
                  Complete Workout
                </button>
              </>
            ) : stats.weeklyProgress[today] === 100 ? (
              <>
                <p className="workout-status">Great work! You've completed today's workout.</p>
                <button className="btn btn-secondary btn-lg" disabled>
                  <CheckIcon size={18} />
                  Completed
                </button>
              </>
            ) : (
              <>
                <p className="workout-status">Ready to start your workout?</p>
                <button className="btn btn-primary btn-lg" onClick={handleStartWorkout}>
                  <PlayIcon size={18} />
                  Start Workout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="weekly-progress card">
          <div className="card-header">
            <h2 className="card-title">Weekly Progress</h2>
          </div>
          <div className="progress-list">
            {DAYS.map((day, index) => (
              <ProgressBar
                key={day}
                label={day}
                progress={stats.weeklyProgress[index]}
                isToday={index === today}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="card-title">Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => setShowLogModal('duration')}>
            <ClockIcon size={20} />
            <span>Log Workout</span>
          </button>
          <button className="action-card" onClick={() => setShowLogModal('calories')}>
            <FlameIcon size={20} />
            <span>Log Calories</span>
          </button>
          <button className="action-card" onClick={() => setShowLogModal('steps')}>
            <FootprintsIcon size={20} />
            <span>Log Steps</span>
          </button>
          <button className="action-card" onClick={resetDailyStats}>
            <RefreshIcon size={20} />
            <span>Reset Daily</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
