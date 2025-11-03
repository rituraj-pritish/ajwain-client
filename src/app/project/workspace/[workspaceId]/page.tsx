import Workspace from '@/types/workspace.interface'
import { getWorkspace } from '../../actions'
import BreadcrumbsHeader from '../../components/breadcrumbs'
import Header from '../../components/header'

interface Props {
  params: {
    workspaceId: string
  }
}

export default async function Page({ params }: Props) {
  const { workspaceId } = await params

  const response = await getWorkspace({ id: Number(workspaceId) })
  const workspace: Workspace = await response.json()

  return (
    <>
      <Header>
        <BreadcrumbsHeader workspace={workspace} />
      </Header>
      <div className="container mx-auto p-4"></div>
    </>
  )
}
