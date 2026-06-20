import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category: string
  tags: string[]
  dueDate?: string
}
interface TaskListProps {
  tasks?: Task[]
  countText?: string
  linkToTaskDetail?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
  
    updates: {
      title: string
      description: string
      priority: string
    }) => void
  editingId?: string | number | null
  setEditingId?: (id: string | number | null) => void
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'First hardcoded task',
    priority: 'High',
    completed: false,
    category: 'Work',
    tags: ['important'],
    dueDate: undefined,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second hardcoded task',
    priority: 'Medium',
    completed: false,
    category: 'Personal',
    tags: ['home'],
    dueDate: undefined,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third hardcoded task',
    priority: 'Low',
    completed: false,
    category: 'General',
    tags: ['misc'],
    dueDate: undefined,
  },
]

export default function TaskList({
  tasks,
  countText,
  linkToTaskDetail,
  onToggle,
  onDelete,
  onUpdateTask,
  editingId,
  setEditingId,
}: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS

  return (
    <>
      <div id="task-count">{countText}</div>

      <section id="task-list">
        {list.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            linkToTaskDetail={linkToTaskDetail}
            description={task.description}
            priority={task.priority}
            completed={task.completed}
            category={task.category}
            tags={task.tags}
            dueDate={task.dueDate}
            onToggle={() => onToggle?.(task.id)}
            onDelete={onDelete}
            onUpdateTask={onUpdateTask}
            editingId={editingId}
            setEditingId={setEditingId}/>
        ))}
      </section>
    </>
  )
}