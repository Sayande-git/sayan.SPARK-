import { useMemo } from 'react'
import type { Task } from './TaskList'

interface StatsPanelProps {
  tasks?: Task[]
}

export default function StatsPanel({
  tasks = [],
}: StatsPanelProps) {
  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.completed ).length

    const active = total - completed
    const overdue = tasks.filter((task) => {
      if (!task.dueDate || task.completed) {
        return false
      }
      return new Date(task.dueDate) < new Date()}).length
    const completedPercentage =total === 0? 0: Math.round((completed / total) * 100)
    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
    }
  }, [tasks])

  return (
    <div id="stats-panel">
      <p>Total Tasks: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Active: {stats.active}</p>
      <p>Overdue: {stats.overdue}</p>

      <div role="progressbar"
        aria-valuenow={stats.completedPercentage}>
        {stats.completedPercentage}%
      </div>
    </div>
  )
}