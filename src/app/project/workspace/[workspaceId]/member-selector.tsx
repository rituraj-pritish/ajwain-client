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
import './member-selector.css'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import User from '@/types/user.interface'

interface Props {
  users: User[]
  value: User[]
  onChange: (users: User[]) => void
}

export default function MemberSelector({
  users = [],
  value = [],
  onChange,
}: Props) {
  const handleSelect = (user: User) => {
    onChange([...value, user])
  }

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement>, id: number) => {
    e.preventDefault()
    onChange(value.filter((user) => user.id !== id))
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between h-[50px] w-full"
            data-testid="member-selector"
          >
            {value.length === 0 && (
              <span className="text-muted-foreground">Select members</span>
            )}
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2">
              {value.map(({ id, name }) => {
                return (
                  <Tooltip key={id}>
                    <TooltipTrigger asChild>
                      <Avatar
                        className="avatar relative overflow-visible border border-black dark:border-white"
                        data-testid="member-selector-avatar"
                      >
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
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <Command>
            <CommandInput placeholder="Type member name to search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    disabled={!!value.find(({ id }) => id === user.id)}
                    onSelect={() => handleSelect(user)}
                    data-testid="member-selector-option"
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
