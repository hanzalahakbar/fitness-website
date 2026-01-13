import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCountUp } from '../hooks/useCountUp'
import { FootprintsIcon, ClockIcon, DropletIcon, FlameIcon, PlusIcon, CheckIcon } from './Icons'
import './Goals.css'

const initialGoals = [
  { id: 'steps', Icon: FootprintsIcon, name: 'Daily Steps', current: 8542, target: 10000, unit: 'steps', color: 'var(--primary)' },
  { id: 'workout', Icon: ClockIcon, name: 'Workout Time', current: 45, target: 60, unit: 'min', color: 'var(--success)' },
  { id: 'water', Icon: DropletIcon, name: 'Water Intake', current: 6, target: 8, unit: 'glasses', color: '#3B82F6' },
  { id: 'calories', Icon: FlameIcon, name: 'Calories Burned', current: 450, target: 500, unit: 'cal', color: 'var(--warning)' },
]

function GoalCard({ goal, onIncrement }) {
  const [ref, isVisible] = useScrollAnimation()
  const count = useCountUp(goal.current, 1000, 0, isVisible)
  const percentage = Math.min((goal.current / goal.target) * 100, 100)
  const Icon = goal.Icon

  return (
    <div ref={ref} className={`goal-card animate-on-scroll ${isVisible ? 'visible' : ''} ${percentage >= 100 ? 'completed' : ''}`}>
      <div className="goal-header">
        <div className="goal-icon" style={{ background: `color-mix(in srgb, ${goal.color} 12%, transparent)`, color: goal.color }}>
          <Icon size={20} />
        </div>
        {percentage >= 100 && <CheckIcon size={18} className="goal-check" />}
      </div>

      <div className="goal-content">
        <h3 className="goal-name">{goal.name}</h3>
        <div className="goal-progress-text">
          <span className="goal-current" style={{ color: goal.color }}>{count}</span>
          <span className="goal-target">/ {goal.target} {goal.unit}</span>
        </div>
      </div>

      <div className="goal-bar-track">
        <div className="goal-bar-fill" style={{ width: isVisible ? `${percentage}%` : '0%', background: goal.color }} />
      </div>

      <div className="goal-footer">
        <span className="goal-percentage">{Math.round(percentage)}%</span>
        <button className="goal-btn" onClick={() => onIncrement(goal.id)} disabled={percentage >= 100}>
          <PlusIcon size={14} />
          Add
        </button>
      </div>
    </div>
  )
}

function Goals() {
  const [ref, isVisible] = useScrollAnimation()
  const [goals, setGoals] = useState(initialGoals)

  const handleIncrement = (goalId) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id !== goalId) return goal
      const increment = { steps: 500, workout: 5, water: 1, calories: 50 }
      return { ...goal, current: Math.min(goal.current + increment[goalId], goal.target) }
    }))
  }

  const totalProgress = goals.reduce((sum, g) => sum + Math.min((g.current / g.target) * 100, 100), 0) / goals.length

  return (
    <div className="container">
      <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Daily Goals</h2>
        <p className="section-subtitle">Stay on track with your objectives</p>
      </div>

      <div className="overall-card card">
        <div className="overall-header">
          <h3 className="card-title">Today's Progress</h3>
          <span className="overall-percent">{Math.round(totalProgress)}%</span>
        </div>
        <div className="overall-bar-track">
          <div className="overall-bar-fill" style={{ width: `${totalProgress}%` }} />
        </div>
      </div>

      <div className="goals-grid">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onIncrement={handleIncrement} />
        ))}
      </div>
    </div>
  )
}

export default Goals
