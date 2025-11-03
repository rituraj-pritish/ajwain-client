import Header from '@/app/project/components/header'
import { getBoard } from './actions'
import BreadcrumbsHeader from '@/app/project/components/breadcrumbs'
import TasksTable from '../../tasks-table'
import Task from '../../task'

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
      <div className='container mx-auto p-4'>
        <TasksTable tasks={board?.tasks} />
        <Task />
      </div>
    </>
  )
}
