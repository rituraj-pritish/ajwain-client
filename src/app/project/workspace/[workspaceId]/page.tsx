import { getWorkspace } from '../../actions'
import BreadcrumbsHeader from '../../components/breadcrumbs'
import Header from '../../components/header'
import CreateTask from './create-task'
import Task from './task'
import TasksTable from './tasks-table'

interface Props {
  params: {
    workspaceId: string
  }
}

export default async function Page({ params }: Props) {
  const { workspaceId } = await params

  const response = await getWorkspace({ id: Number(workspaceId) })
  const workspace = await response.json()

  return (
    <>
      <Header>
        <BreadcrumbsHeader workspace={workspace} />
      </Header>
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <CreateTask />
        </div>
        <TasksTable tasks={workspace?.tasks} />
        <Task />
      </div>
    </>
  )
}
