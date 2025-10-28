import BreadcrumbsHeader from '../../components/breadcrumbs'
import Header from '../../components/header'
import CreateTask from './create-task'

export default async function Page({ params }) {
  const { workspaceId } = await params

  return (
    <>
      <Header>
        <BreadcrumbsHeader />
      </Header>
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <CreateTask />
        </div>
      </div>
    </>
  )
}
