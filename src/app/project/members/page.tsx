import Header from '../components/header'
import { getMembers } from './actions'
import Breadcrumbs from './components/breadcrumbs'
import AddMember from './components/add-member'
import MembersTable from './components/members-table'

export default async function Page() {
  const response = await getMembers()
  const data = await response.json()

  return (
    <>
      <Header>
        <Breadcrumbs />
      </Header>
      <div className='container mx-auto p-4'>
        <AddMember />
        <MembersTable data={data} />
      </div>
    </>
  )
}
