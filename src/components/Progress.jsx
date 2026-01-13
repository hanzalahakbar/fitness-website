import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountUp } from '../hooks/useCountUp'
import { FlameIcon, TrendingUpIcon, TargetIcon, AwardIcon, DumbbellIcon, ClockIcon, ActivityIcon } from './Icons'
import './Progress.css'

const weeklyData = [
  { day: 'Mon', calories: 450 },
  { day: 'Tue', calories: 380 },
  { day: 'Wed', calories: 520 },
  { day: 'Thu', calories: 290 },
  { day: 'Fri', calories: 0 },
  { day: 'Sat', calories: 0 },
  { day: 'Sun', calories: 0 },
]

const maxCalories = Math.max(...weeklyData.map(d => d.calories), 1)

function BarChart({ data, maxValue }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div ref={ref} className="bar-chart">
      {data.map((item, index) => (
        <div key={item.day} className="bar-item">
          <div className="bar-container">
            <div
              className="bar"
              style={{
                height: isVisible ? `${(item.calories / maxValue) * 100}%` : '0%',
                transitionDelay: `${index * 80}ms`,
              }}
            />
          </div>
          <span className="bar-label">{item.day}</span>
        </div>
      ))}
    </div>
  )
}

function StatRing({ value, max, label, color = 'var(--primary)' }) {
  const [ref, isVisible] = useScrollAnimation()
  const count = useCountUp(value, 1200, 0, isVisible)
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 42
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className={`stat-ring animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <svg className="ring-svg" viewBox="0 0 100 100">
        <circle className="ring-bg" cx="50" cy="50" r="42" />
        <circle
          className="ring-fill"
          cx="50" cy="50" r="42"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            stroke: color,
          }}
        />
      </svg>
      <div className="ring-content">
        <span className="ring-value">{count}</span>
        <span className="ring-label">{label}</span>
      </div>
    </div>
  )
}

function StreakCard() {
  const [ref, isVisible] = useScrollAnimation()
  const streakCount = useCountUp(7, 1200, 0, isVisible)

  return (
    <div ref={ref} className={`streak-card animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="streak-header">
        <FlameIcon size={24} className="streak-icon" />
        <span className="streak-count">{streakCount}</span>
      </div>
      <span className="streak-label">Day Streak</span>
      <div className="streak-days">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className={`streak-day ${i < 7 ? 'active' : ''}`}>{d}</span>
        ))}
      </div>
    </div>
  )
}

function Progress() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div className="container">
      <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Progress & Stats</h2>
        <p className="section-subtitle">Track your fitness journey</p>
      </div>

      <div className="progress-grid">
        <StreakCard />

        <div className="chart-card card">
          <h3 className="card-title">Calories This Week</h3>
          <BarChart data={weeklyData} maxValue={maxCalories} />
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card-ring card">
          <StatRing value={28} max={30} label="Workouts" color="var(--primary)" />
          <p className="stat-desc">28 of 30 this month</p>
        </div>
        <div className="stat-card-ring card">
          <StatRing value={12500} max={15000} label="Calories" color="var(--success)" />
          <p className="stat-desc">12.5k of 15k goal</p>
        </div>
        <div className="stat-card-ring card">
          <StatRing value={85} max={100} label="Goals" color="var(--warning)" />
          <p className="stat-desc">85% achieved</p>
        </div>
      </div>

      <div className="records-card card">
        <h3 className="card-title">Personal Records</h3>
        <div className="records-grid">
          <div className="record-item">
            <DumbbellIcon size={20} className="record-icon" />
            <span className="record-value">50 kg</span>
            <span className="record-label">Max Bench</span>
          </div>
          <div className="record-item">
            <ActivityIcon size={20} className="record-icon" />
            <span className="record-value">5.2 km</span>
            <span className="record-label">Longest Run</span>
          </div>
          <div className="record-item">
            <ClockIcon size={20} className="record-icon" />
            <span className="record-value">2:30</span>
            <span className="record-label">Longest Plank</span>
          </div>
          <div className="record-item">
            <FlameIcon size={20} className="record-icon" />
            <span className="record-value">750</span>
            <span className="record-label">Max Cal/Day</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
