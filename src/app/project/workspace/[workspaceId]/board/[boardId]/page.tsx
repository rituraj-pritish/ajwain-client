import Header from '@/app/project/components/header'
import { getBoard } from './actions'
import BreadcrumbsHeader from '@/app/project/components/breadcrumbs'
import TasksTable from '../../tasks-table'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    boardId: string
  }
}

const fetchBoard = async (boardId: string) => {
  const response = await getBoard(boardId)

  if (!response.ok) {
    return undefined
  }

  return response.json()
}

export default async function Page({ params }: Props) {
  const { boardId } = await params

  const board = await fetchBoard(boardId)

  if (!board) return notFound()

  return (
    <>
      <Header>
        <BreadcrumbsHeader board={board} />
      </Header>
      <div className='container p-4 mx-auto'>
        <TasksTable tasks={board?.tasks} />
      </div>
    </>
  )
}
