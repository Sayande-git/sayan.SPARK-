interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
}

export default function TaskCard({
  title,
  description,
  priority,
  completed = false,
  onToggle,
  taskId,
}: TaskCardProps) {
  return (
    <article
      id="task-card"
      data-completed={completed ? 'true' : 'false'}
    >
    <input
  type="checkbox"
  checked={completed}
  onChange={() => onToggle?.(taskId ?? 0)}
/>

      <h2
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {description}
      </p>

      <p>{priority}</p>
    </article>
  )
}