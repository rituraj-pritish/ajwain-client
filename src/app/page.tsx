import ThemeToggle from './components/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from './components/logo'
import AppSidebar from './project/components/app-sidebar/app-sidebar'
import Header from './project/components/header'
import BreadcrumbsHeader from './project/components/breadcrumbs'
import TasksTable from './project/workspace/[workspaceId]/tasks-table'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

const DATA = {
  project: {
    id: 1,
    name: 'My Project',
    workspaces: [
      {
        id: 1,
        name: 'Frontend',
        isActive: true,
        boards: [
          {
            id: 1,
            name: 'Feature',
          },
        ],
      },
    ],
  },
  user: {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@workemail.com',
  },
  board: {
    id: 1,
    name: 'Feature',
    workspace: {
      id: 1,
      name: 'Frontend',
    },
    tasks: [
      {
        id: 1,
        title: 'Update toggle button',
        status: 'COMPLETED',
      },
      {
        id: 2,
        title: 'Deploy to staging',
        status: 'IN_PROGRESS',
      },
      {
        id: 3,
        title: 'Deploy to production',
        status: 'PENDING',
      },
    ],
  },
}

export default async function Page() {
  return (
    <section className='relative flex flex-col'>
      <header className='fixed top-0 left-0 right-0 w-full flex items-center justify-between p-4 max-w-5xl mx-auto backdrop-blur-sm z-50'>
        <span>
          <Logo />
        </span>
        <span className='flex items-center gap-4'>
          <Link href='/signin'>
            <Button variant='outline'>Sign In</Button>
          </Link>
          <Link href='/signup'>
            <Button>Get Started</Button>
          </Link>
          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:h-4'
          />
          <ThemeToggle />
        </span>
      </header>

      <div className='grow flex flex-col items-center justify-center mx-auto my-40 px-4'>
        <h1 className='text-6xl font-medium leading-[80px] w-fit text-center'>
          One tool to{' '}
          <span className='underline underline-offset-8'>manage</span>
          <br /> project and your team
        </h1>
        <Link href='/signup'>
          <Button size='lg' className='w-60 mt-6 font-bold'>
            Start for Free
          </Button>
        </Link>
      </div>

      <span className='p-4'>
        <div className='container border max-w-4xl mx-auto overflow-hidden rounded mb-20 h-[70vh] pointer-events-none'>
          <SidebarProvider>
            <AppSidebar
              className='data-[slot=sidebar-container]:relative data-[slot=sidebar-container]:max-h-[70vh]'
              project={DATA.project}
              user={DATA.user}
            />
            <SidebarInset>
              <Header>
                <BreadcrumbsHeader board={DATA.board} />
              </Header>
              <div className='container mx-auto p-4'>
                <TasksTable tasks={DATA.board.tasks} />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </span>

      <p className='p-4 text-center text-secondary-foreground'>
        &copy; {new Date().getFullYear()} AJWAIN
      </p>
    </section>
  )
}
