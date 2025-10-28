enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export default interface Task {
  id: number
  title: string
  date: string
  status: TaskStatus
}
