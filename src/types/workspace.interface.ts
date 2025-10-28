import Task from './task.interface'

export default interface Workspace {
  id: number
  name: string
  tasks: Task[]
}
