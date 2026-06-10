import { useState, type FormEvent } from 'react'
import type { Task } from './TaskList'

interface TaskFormProps {
  onAddTask?: (task: Task) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setError('')

    onAddTask?.({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    })

    setTitle('')
    setDescription('')
    setPriority('Low')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <select
        aria-label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}