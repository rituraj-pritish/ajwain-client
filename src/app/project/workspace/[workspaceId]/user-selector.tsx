'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getInitials } from '@/lib/utils'
import { ChevronsUpDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './user-selector.css'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface User {
  id: number
  name: string
}

const USERS: User[] = [
  {
    id: 1,
    name: 'Khalisee',
  },
  {
    id: 2,
    name: 'John Snow',
  },
  {
    id: 3,
    name: 'Arya Stark',
  },
]

export default function UserSelector({ onChange }) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const handleSelect = (user: User) => {
    setSelectedUsers((prevState) => [...prevState, user])
  }

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement>, id: number) => {
    e.preventDefault()
    setSelectedUsers((prevState) => prevState.filter((user) => id !== user.id))
  }

  useEffect(() => {
    if (typeof onChange !== 'function') return
    onChange(selectedUsers)
  }, [selectedUsers])

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between h-[50px]"
          >
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2">
              {selectedUsers.map(({ id, name }) => {
                return (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <Avatar className="avatar relative overflow-visible">
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="remove-avatar w-4 h-4 rounded-full bg-primary text-primary-foreground absolute -left-1 -top-1 flex items-center justify-center cursor-pointer"
                              onClick={(e) => handleRemove(e, id)}
                            >
                              <X size={12} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove {name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
            Select members...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <Command>
            <CommandInput placeholder="Type member name to search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {USERS.map((user) => (
                  <CommandItem
                    key={user.id}
                    disabled={!!selectedUsers.find(({ id }) => id === user.id)}
                    onSelect={() => handleSelect(user)}
                  >
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
