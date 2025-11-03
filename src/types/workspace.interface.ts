import Board from './board.interface'

export default interface Workspace {
  id: number
  name: string
  boards: Board[]
}
