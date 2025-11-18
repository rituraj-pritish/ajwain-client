'use client'

import { UserRole } from '@/types/user.interface'
import { createContext, useContext } from 'react'
import useGlobalData from './useGlobalData'

const PermissionsContext = createContext<{
  canAddMember: boolean
}>({
  canAddMember: false,
})

export const PermissionsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user } = useGlobalData()
  const value = {
    canAddMember: Boolean(user && [UserRole.PROJECT_ADMIN].includes(user.role)),
  }

  return <PermissionsContext value={value}>{children}</PermissionsContext>
}

export default function usePermissions() {
  const context = useContext(PermissionsContext)

  return context
}
