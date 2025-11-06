import { getProjectDetails } from './actions'
import Header from './components/header'

export default async function Page() {
  const projectResponse = await getProjectDetails()
  const projectDetails = await projectResponse.json()
  return (
    <>
      <Header />
      {projectDetails?.workspaces?.length === 0 && (
        <div className='bg-gray-50 dark:bg-gray-900 border rounded m-4 p-4 text-center flex flex-col gap-6'>
          <h3 className='text-xl text-primary'>
            No Workspaces and Boards has been created yet.
          </h3>
          <p>All tasks reside inside Workspace &gt; Board</p>
          <p>Create these from the sidebar menu</p>
        </div>
      )}
      {projectDetails?.workspaces?.length > 0 && (
        <div className='bg-gray-50 dark:bg-gray-900 border rounded m-4 p-4 text-center flex flex-col gap-6'>
          <h3 className='text-xl text-primary'>
            Please select a Board from sidebar menu.
          </h3>
        </div>
      )}
    </>
  )
}
