import Task from './task.interface'
import Workspace from './workspace.interface'

export default interface Board {
  id: number
  name: string
  tasks: Task[]
  workspace: Workspace
}