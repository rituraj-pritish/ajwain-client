export const enum NotificationStatus {
  UNREAD = 'UNREAD',
  ARCHIVED = 'ARCHIVED',
}

export default interface Notification {
  id: number
  userId: number
  taskId: number
  taskTitle: string
  boardId: number
  boardName: string
  workspaceId: number
  workspaceName: string
  status: NotificationStatus
}
