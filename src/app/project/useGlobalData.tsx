'use client'

import User from '@/types/user.interface'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { getUsers } from './workspace/[workspaceId]/actions'

enum ActionTypes {
  Add = 'add',
  Remove = 'remove',
}

interface Action {
  type: ActionTypes
  property: string
  value: unknown
}

interface State {
  user: User | null
  users: User[]
}

function globalDataReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.Add:
      return { ...state, [action.property]: action.value }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

const GlobalDataContext = createContext<{
  user: User | null
  users: User[]
  updateData: (property: string, value: unknown) => void
}>({
  user: null,
  users: [],
  updateData: () => {},
})

export const GlobalDataContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(globalDataReducer, {
    user: null,
    users: [],
  })

  const getAllUsers = async () => {
    try {
      const res = await getUsers()
      const data = await res.json()

      addItem('users', data)
    } catch {}
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  function addItem(property: string, value: unknown) {
    dispatch({
      type: ActionTypes.Add,
      property,
      value,
    })
  }

  return (
    <GlobalDataContext
      value={{
        ...state,
        updateData: addItem,
      }}
    >
      {children}
    </GlobalDataContext>
  )
}

export default function useGlobalData() {
  const context = useContext(GlobalDataContext)

  return context
}
