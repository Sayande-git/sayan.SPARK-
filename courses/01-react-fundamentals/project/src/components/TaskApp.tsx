import type { Dispatch, SetStateAction } from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import type { Task } from './TaskList'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm,
}: TaskAppProps) {
  const countText = `${tasks.length} Tasks`

  const handleAddTask = (task: Task) => {
    if (!setTasks) return

    setTasks((prev) => [...prev, task])
  }

  return (
    <>
      <div id="task-count">{countText}</div>

      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList tasks={tasks} />
    </>
  )
}