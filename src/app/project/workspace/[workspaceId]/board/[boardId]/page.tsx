import Header from '@/app/project/components/header'
import { getBoard } from './actions'
import BreadcrumbsHeader from '@/app/project/components/breadcrumbs'
import TasksTable from '../../tasks-table'
import Task from '../../task'
import Loading from './loading'

interface Props {
  params: {
    boardId: string
  }
}

export default async function Page({ params }: Props) {
  const { boardId } = await params

  const response = await getBoard(boardId)
  const board = await response.json()

  return (
    <>
      <Header>
        <BreadcrumbsHeader board={board} />
      </Header>
      <div className='container p-4 mx-auto'>
        <TasksTable tasks={board?.tasks} />
        <Task />
      </div>
    </>
  )
}
