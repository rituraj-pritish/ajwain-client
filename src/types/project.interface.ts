import Workspace from './workspace.interface'

export default interface Project {
  id: number
  name: string
  workspaces: Workspace[]
}
