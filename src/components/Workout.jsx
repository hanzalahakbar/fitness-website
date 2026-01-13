import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { DumbbellIcon, ClockIcon, CheckIcon, PlayIcon } from './Icons'
import './Workout.css'

const exercises = [
  { id: 1, name: 'Push-ups', reps: '15 reps', sets: '3 sets', difficulty: 'Beginner', muscle: 'Chest, Triceps' },
  { id: 2, name: 'Squats', reps: '20 reps', sets: '3 sets', difficulty: 'Beginner', muscle: 'Legs, Glutes' },
  { id: 3, name: 'Plank', reps: '60 sec', sets: '3 sets', difficulty: 'Intermediate', muscle: 'Core' },
  { id: 4, name: 'Lunges', reps: '12 reps', sets: '3 sets', difficulty: 'Beginner', muscle: 'Legs, Glutes' },
  { id: 5, name: 'Burpees', reps: '10 reps', sets: '3 sets', difficulty: 'Advanced', muscle: 'Full Body' },
  { id: 6, name: 'Mountain Climbers', reps: '30 sec', sets: '3 sets', difficulty: 'Intermediate', muscle: 'Core, Cardio' },
]

function ExerciseCard({ exercise, delay }) {
  const [ref, isVisible] = useScrollAnimation()
  const [isStarted, setIsStarted] = useState(false)

  const difficultyColor = {
    Beginner: 'var(--success)',
    Intermediate: 'var(--warning)',
    Advanced: 'var(--error)',
  }

  return (
    <div
      ref={ref}
      className={`exercise-card animate-on-scroll ${isVisible ? 'visible' : ''} ${isStarted ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="exercise-header">
        <div className="exercise-icon">
          <DumbbellIcon size={20} />
        </div>
        <span className="exercise-difficulty" style={{ color: difficultyColor[exercise.difficulty] }}>
          {exercise.difficulty}
        </span>
      </div>

      <div className="exercise-content">
        <h3 className="exercise-name">{exercise.name}</h3>
        <p className="exercise-muscle">{exercise.muscle}</p>
        <div className="exercise-stats">
          <span>{exercise.reps}</span>
          <span className="dot">·</span>
          <span>{exercise.sets}</span>
        </div>
      </div>

      <button
        className={`exercise-btn ${isStarted ? 'completed' : ''}`}
        onClick={() => setIsStarted(!isStarted)}
      >
        {isStarted ? <><CheckIcon size={16} /> Done</> : <><PlayIcon size={16} /> Start</>}
      </button>
    </div>
  )
}

function Workout() {
  const [ref, isVisible] = useScrollAnimation()
  const [filter, setFilter] = useState('all')

  const filteredExercises = filter === 'all'
    ? exercises
    : exercises.filter(e => e.difficulty.toLowerCase() === filter)

  return (
    <div className="container">
      <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">Workout</h2>
        <p className="section-subtitle">Build your perfect workout routine</p>
      </div>

      <div className="workout-filters">
        {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            className={`filter-btn ${filter === level ? 'active' : ''}`}
            onClick={() => setFilter(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="exercises-grid">
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} delay={index * 50} />
        ))}
      </div>

      <div className="workout-action">
        <button className="btn btn-primary btn-lg">
          <PlayIcon size={18} />
          Start Full Workout
        </button>
      </div>
    </div>
  )
}

export default Workout
